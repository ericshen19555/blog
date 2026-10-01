# Article image loading

Article images written with the `{% cimg %}` tag get a generated WebP preview beside the source image. Preview files use the `.preview.webp` suffix and are ignored by Git. The original image stays unchanged.

Hexo generates missing or stale previews before every generation. That same hook runs for `npm run build`, GitHub Pages deployment, and the first build and rebuilds performed by `npm run server`. While the local server is running, adding or updating a referenced source image causes Hexo to rebuild and create its preview automatically.

Previews use a 64-pixel maximum edge and WebP quality 45. The image frame uses the source image's oriented dimensions, so the preview and original occupy the same space while the original loads.

## Animation and debug mode

Normal browsing starts loading each original when it is within 1000 pixels of the viewport. Once it loads, the original above the preview fades in while sharpening from a 12-pixel blur over 500 ms. The preview stays below it as a fallback until those transitions finish and a 120 ms buffer passes, then clears its 3-pixel blur and fades out over 500 ms.

To adjust the original image's starting blur, change `filter blur(12px)` in `themes/frame/source/css/post/media.styl` under `.cimg-reveal`. The preview has a separate, subtle 3-pixel blur. The reveal and blur transitions are currently 500 ms; the post-transition safety buffer is 120 ms in `source/js/lazy_images.js`.

To test on demand, run `npm run server` and add `?imageDebug=1`. Automatic original-image loading is paused; click an article image (or focus it and press Enter/Space) to load its original and play the same blur-to-clear animation. Debug controls are disabled in generated deploy builds.
