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
  const optionNames = new Set(['src', 'w', 'alt', 'mt']);
  let currentName = '';
  let currentValue = '';

  const saveOption = () => {
    if (!currentName) return;
    let value = currentValue.trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    options[currentName] = value;
  };

  for (const arg of args) {
    const separator = arg.indexOf('=');
    const name = separator < 0 ? '' : arg.slice(0, separator);

    if (optionNames.has(name)) {
      saveOption();
      currentName = name;
      currentValue = arg.slice(separator + 1);
    } else if (currentName) {
      currentValue += ` ${arg}`;
    }
  }
  saveOption();

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

  return `<span class="cimg" title="${safeAlt}" style="width:${escapeAttribute(width)};aspect-ratio:${ratio};margin-top:${escapeAttribute(marginTop)}" data-image-alt="${safeAlt}"><img class="cimg-preview" src="${previewUrl}" alt="${safeAlt}" title="${safeAlt}" loading="lazy" decoding="async" width="${displayWidth || ''}" height="${displayHeight || ''}"><img class="cimg-full" data-src="${imageUrl}" alt="" title="${safeAlt}" aria-hidden="true" decoding="async" width="${displayWidth || ''}" height="${displayHeight || ''}"></span>`;
}, { async: true });
