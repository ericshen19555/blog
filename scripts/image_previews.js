const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const PREVIEW_SUFFIX = '.preview.webp';
const CONCURRENCY = 3;
const POSTS_DIR = path.join(hexo.source_dir, '_posts');
let generatedImageAssets = [];

async function isImage(sourcePath) {
  if (sourcePath.endsWith(PREVIEW_SUFFIX)) return false;

  try {
    const metadata = await sharp(sourcePath).metadata();
    return Boolean(metadata.format);
  } catch (error) {
    // Post assets also include non-image files. Ignore those without masking
    // unexpected filesystem or Sharp errors.
    if (error.message?.includes('Input file contains unsupported image format')) return false;
    throw error;
  }
}

async function ensurePreview(asset) {
  const sourcePath = asset.source;
  const previewPath = `${sourcePath}${PREVIEW_SUFFIX}`;
  const sourceStat = await fs.stat(sourcePath);

  try {
    const previewStat = await fs.stat(previewPath);
    if (previewStat.mtimeMs >= sourceStat.mtimeMs) return true;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  await sharp(sourcePath)
    .rotate()
    .resize({ width: 64, height: 64, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 45, effort: 6 })
    .toFile(previewPath);
  hexo.log.info(`[image previews] generated ${path.relative(hexo.base_dir, previewPath)}`);
  return true;
}

async function mapLimit(items, limit, callback) {
  for (let index = 0; index < items.length; index += limit) {
    await Promise.all(items.slice(index, index + limit).map(callback));
  }
}

async function imageAssets() {
  const assets = hexo.model('PostAsset').toArray();
  const images = [];

  for (const asset of assets) {
    if (await isImage(asset.source)) images.push(asset);
  }

  return images;
}

async function removeOrphanedPreviews(directory) {
  let entries;
  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }

  await Promise.all(entries.map(async entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await removeOrphanedPreviews(entryPath);
      return;
    }

    if (!entry.isFile() || !entry.name.endsWith(PREVIEW_SUFFIX)) return;

    const sourcePath = entryPath.slice(0, -PREVIEW_SUFFIX.length);
    try {
      await fs.access(sourcePath);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      await fs.unlink(entryPath);
      hexo.log.info(`[image previews] removed orphaned ${path.relative(hexo.base_dir, entryPath)}`);
    }
  }));
}

hexo.extend.filter.register('before_generate', async () => {
  generatedImageAssets = await imageAssets();
  await mapLimit(generatedImageAssets, CONCURRENCY, ensurePreview);
  await removeOrphanedPreviews(POSTS_DIR);
});

hexo.extend.generator.register('article_image_previews', async () => {
  return generatedImageAssets.map(asset => ({
    path: `${asset.path}${PREVIEW_SUFFIX}`,
    data: () => fs.readFile(`${asset.source}${PREVIEW_SUFFIX}`)
  }));
});
