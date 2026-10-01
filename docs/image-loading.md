# Article image loading

Every image in a Hexo post asset folder gets a generated WebP preview beside the source image, whether or not the post currently references it with `{% cimg %}`. Preview files use the `.preview.webp` suffix and are ignored by Git. The original image stays unchanged.

Before each generation, the preview script walks Hexo's registered `PostAsset` records and creates previews for image assets whose preview is missing or older than the source. It also removes `.preview.webp` files under `source/_posts` when their matching original file no longer exists. Hexo registers post assets during source processing; the script writes preview files next to those assets, then its generator adds the corresponding routes to the output. This ordering works for `npm run build`, GitHub Pages deployment, and the first build and rebuilds performed by `npm run server`. While the local server is running, adding, updating, or removing a post image is reflected on the next generation.

Previews use a 64-pixel maximum edge and WebP quality 45. The image frame uses the source image's oriented dimensions, so the preview and original occupy the same space while the original loads.

The preview generation is asset-based rather than derived from rendered HTML. Hexo runs `after_post_render` while rendering posts inside `before_generate`, before generators execute, but newly written files do not automatically become `PostAsset` records because source processing has already registered assets. The current generator emits routes from existing `PostAsset` records, so previews are prepared before that generator runs.

## Animation and debug mode

Normal browsing starts loading each original when it is within 1000 pixels of the viewport. Once it loads, the original above the preview fades in while sharpening from a 12-pixel blur over 500 ms. The preview stays below it as a fallback until those transitions finish and a 120 ms buffer passes, then clears its 3-pixel blur and fades out over 500 ms.

To adjust the original image's starting blur, change `filter blur(12px)` in `themes/frame/source/css/post/media.styl` under `.cimg-reveal`. The preview has a separate, subtle 3-pixel blur. The reveal and blur transitions are currently 500 ms; the post-transition safety buffer is 120 ms in `source/js/lazy_images.js`.

To test on demand, run `npm run server` and add `?imageDebug=1`. Automatic original-image loading is paused; click an article image (or focus it and press Enter/Space) to load its original and play the same blur-to-clear animation. Debug controls are disabled in generated deploy builds.
