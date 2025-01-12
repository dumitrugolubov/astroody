# Astro + Netlify Routing Debug Log

## Current Issue
- Blog and About links work locally but cause redirect loops on Netlify
- Error: Redirecting from `/blog.html` to `/blog` in infinite loop

## Attempted Solutions

### Attempt 1: File-based with HTML extensions
```toml
# netlify.toml
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/blog"
to = "/blog.html"
status = 200
```
```js
// astro.config.mjs
export default defineConfig({
  build: {
    format: 'file'
  }
})
```
Result: ❌ Still redirecting in loops

### Attempt 2: Directory-based with trailing slashes
```toml
# netlify.toml
[build]
command = "npm run build"
publish = "dist"

[build.processing]
skip_processing = true
```
```js
// astro.config.mjs
export default defineConfig({
  build: {
    format: 'directory'
  },
  trailingSlash: 'always'
})
```
Result: ❌ Still redirecting

### Attempt 3: Minimal config with explicit redirects
```toml
# netlify.toml
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/blog.html"
to = "/blog"
status = 301
force = true
```
Result: ❌ Still redirecting

## Observations
1. Local dev server works fine - suggests issue is Netlify-specific
2. Redirect loop happens between .html and non-.html versions
3. Netlify's processing might be interfering with Astro's output

## Next Attempts to Try:
1. Use Netlify Edge Functions for routing
2. Try without any redirects but with _redirects file
3. Use Netlify's asset optimization settings
4. Check Netlify's deploy logs for clues

## Questions to Answer:
1. What's different between local and Netlify environments?
2. How is Netlify processing the built files?
3. Are there any hidden redirects we're not seeing?
4. What's the exact sequence of redirects happening?
