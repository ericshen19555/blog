const path = require('node:path');
const sharp = require('sharp');
const { url_for } = require('hexo-util');

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

hexo.extend.tag.register('cimg', async function(args) {
  const options = {};
  const raw = args.join(' ');
  const optionPattern = /([\w-]+)=(?:"([^"]*)"|'([^']*)'|([^\s]+))/g;
  let match;

  while ((match = optionPattern.exec(raw)) !== null) {
    options[match[1]] = match[2] ?? match[3] ?? match[4] ?? '';
  }

  const { src = '', w: width = '100%', alt = 'image', mt: marginTop = '0' } = options;
  if (!src) {
    console.warn('[Hexo cimg] empty image path, skipped.');
    return '';
  }

  const PostAsset = hexo.model('PostAsset');
  const asset = PostAsset.findOne({ post: this._id, slug: src });
  if (!asset) {
    console.warn(`[Hexo cimg] image asset not found: ${src}`);
    return '';
  }

  const dimensions = await sharp(asset.source).metadata();
  const isRotated = dimensions.orientation >= 5 && dimensions.orientation <= 8;
  const displayWidth = isRotated ? dimensions.height : dimensions.width;
  const displayHeight = isRotated ? dimensions.width : dimensions.height;
  const imageUrl = url_for.call(hexo, asset.path);
  const previewUrl = url_for.call(
    hexo,
    path.posix.join(path.posix.dirname(asset.path), `${src}.preview.webp`)
  );
  const ratio = displayWidth && displayHeight
    ? `${displayWidth} / ${displayHeight}`
    : 'auto';
  const safeAlt = escapeAttribute(alt);

  return `<span class="cimg" style="width:${escapeAttribute(width)};aspect-ratio:${ratio};margin-top:${escapeAttribute(marginTop)}" data-image-alt="${safeAlt}"><img class="cimg-preview" src="${previewUrl}" alt="${safeAlt}" title="${safeAlt}" loading="lazy" decoding="async" width="${displayWidth || ''}" height="${displayHeight || ''}"><img class="cimg-full" data-src="${imageUrl}" alt="" aria-hidden="true" decoding="async" width="${displayWidth || ''}" height="${displayHeight || ''}"></span>`;
}, { async: true });
