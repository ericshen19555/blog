# Frame Content feature

This is a Frame-specific feature module. It adds the HackMD-style article content panel without changing the menu implementation.

## Files to share

Copy these files into the matching locations in another Frame theme:

- `layout/features/content.ejs`
- `source/js/features/content.js`
- `source/css/post/post_toc.styl`

Then make these two small registrations:

1. In `layout/post.ejs`, add `<%- partial('features/content') %>` inside the article.
2. In `_config.yml`, add `/js/features/content.js` to `scripts`.

The stylesheet is already imported by `source/css/style.styl` in Frame. The module is intentionally Frame-specific: it uses Frame color variables and the Frame wrapper layout contract.
