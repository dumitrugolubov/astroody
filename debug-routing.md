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

### Attempt 4: Using _redirects file
```
# _redirects
/blog  /blog.html  200!
/about /about.html 200!
```
Result: ❌ Still redirecting

### Attempt 5: Using Netlify Edge Functions
```ts
// netlify/edge-functions/routing.ts
export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  if (['/blog', '/about'].includes(url.pathname)) {
    return context.rewrite(`${url.pathname}.html`);
  }

  return context.next();
};
```
```toml
# netlify.toml
[[edge_functions]]
function = "routing"
path = "/*"
```
Result: Testing...

## Observations
1. Local dev server works fine - suggests issue is Netlify-specific
2. Redirect loop happens between .html and non-.html versions
3. Netlify's processing might be interfering with Astro's output
4. Previous attempts with redirects and URL processing didn't work

## Next Attempts if Edge Functions Don't Work:
1. Try using Netlify's asset optimization settings
2. Investigate Netlify's default routing behavior
3. Consider using a custom 404.html approach
