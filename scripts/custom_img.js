hexo.extend.tag.register('cimg', function(args) {
  const options = Object.fromEntries(args.map(arg => arg.split('=').map(s => s.replace(/['"]/g, '').trim())));

  const { src = '', w: width = '100%', alt = 'image', mt: marginTop = '0' } = options;

  if (!src) {
    console.warn(`[Hexo cimg] empty image path, skipped.`);
    return ''; 
  }

  return `<img src="${src}" style="width: ${width}; height: auto; vertical-align: top; margin-top: ${marginTop};" alt="${alt}">`;
});
