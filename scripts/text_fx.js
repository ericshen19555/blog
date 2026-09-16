const FX_CONFIG = {
  flame: { emoji: '🔥', x: 16, y: 4 },
  holy: { emoji: '🛐', x: 0, y: 0 }
};

function parseOptions(args) {
  return Object.fromEntries(
    args
      .map(arg => arg.split('=').map(value => value.replace(/["']/g, '').trim()))
      .filter(([key, value]) => key && value)
  );
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getEmojiCursor(emoji, x = 0, y = 0) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' style='font-size:24px'><text y='24'>${emoji}</text></svg>`;
  const b64 = Buffer.from(svg, 'utf-8').toString('base64');
  return `url('data:image/svg+xml;base64,${b64}') ${x} ${y}, pointer`;
}

hexo.extend.tag.register('fx', function(args, content) {
  const options = parseOptions(args);
  const type = options.type || '';
  const text = content !== undefined ? content.trim() : options.text || '';
  const size = options.size || '';

  if (!type || !text) {
    console.warn('[Hexo fx] effect type and display text are required, skipped.');
    return '';
  }

  const config = FX_CONFIG[type];
  if (!config) {
    console.warn(`[Hexo fx] unknown effect type "${type}", skipped.`);
    return '';
  }

  const escapedType = escapeHtml(type);
  const escapedText = escapeHtml(text);
  const cursor = getEmojiCursor(config.emoji, config.x, config.y);
  const sizeStyle = size ? ` font-size: ${escapeHtml(size)};` : '';

  return `<p class="fx-text fx-${escapedType}" data-text="${escapedText}" style="--fx-cursor: ${cursor};${sizeStyle}">${escapedText}</p>`;
}, { ends: true });
