const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const POSTS_DIR = path.join(hexo.source_dir, '_posts');
const PREVIEW_SUFFIX = '.preview.webp';
const IMAGE_REFERENCE = /\{%\s*cimg\s+([\s\S]*?)%\}/g;
const SRC_OPTION = /(?:^|\s)src=(?:"([^"]+)"|'([^']+)'|([^\s]+))/;

async function listMarkdownFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.md') ? [entryPath] : [];
  }));
  return nested.flat();
}

async function collectImageSources() {
  const markdownFiles = await listMarkdownFiles(POSTS_DIR);
  const imageSources = new Set();

  for (const markdownPath of markdownFiles) {
    const content = await fs.readFile(markdownPath, 'utf8');
    const assetDir = path.join(path.dirname(markdownPath), path.basename(markdownPath, '.md'));
    let tag;

    while ((tag = IMAGE_REFERENCE.exec(content)) !== null) {
      const srcMatch = SRC_OPTION.exec(tag[1]);
      const src = srcMatch && (srcMatch[1] || srcMatch[2] || srcMatch[3]);
      if (!src || path.isAbsolute(src)) continue;

      const sourcePath = path.resolve(assetDir, src);
      if (!sourcePath.startsWith(`${assetDir}${path.sep}`)) continue;
      imageSources.add(sourcePath);
    }
    IMAGE_REFERENCE.lastIndex = 0;
  }

  return [...imageSources];
}

async function ensurePreview(sourcePath) {
  const previewPath = `${sourcePath}${PREVIEW_SUFFIX}`;
  let sourceStat;
  try {
    sourceStat = await fs.stat(sourcePath);
    if (!sourceStat.isFile()) return;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn(`[image previews] source image not found: ${sourcePath}`);
      return;
    }
    throw error;
  }

  try {
    const previewStat = await fs.stat(previewPath);
    if (previewStat.mtimeMs >= sourceStat.mtimeMs) return;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  await sharp(sourcePath)
    .rotate()
    .resize({ width: 64, height: 64, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 45, effort: 4 })
    .toFile(previewPath);
  hexo.log.info(`[image previews] generated ${path.relative(hexo.base_dir, previewPath)}`);
}

hexo.extend.filter.register('before_generate', async () => {
  const sourcePaths = await collectImageSources();
  for (let index = 0; index < sourcePaths.length; index += 3) {
    await Promise.all(sourcePaths.slice(index, index + 3).map(ensurePreview));
  }
});

hexo.extend.generator.register('article_image_previews', async () => {
  const sourcePaths = await collectImageSources();
  const PostAsset = hexo.model('PostAsset');

  return sourcePaths.flatMap(sourcePath => {
    const assetId = path.relative(hexo.base_dir, sourcePath).split(path.sep).join('/');
    const asset = PostAsset.findOne({ _id: assetId });
    if (!asset) return [];

    return [{
      path: `${asset.path}${PREVIEW_SUFFIX}`,
      data: () => fs.readFile(`${sourcePath}${PREVIEW_SUFFIX}`)
    }];
  });
});
