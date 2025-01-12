import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  
  // Force HTTPS
  if (url.protocol === 'http:' && process.env.NODE_ENV === 'production') {
    return new Response(null, {
      status: 301,
      headers: {
        Location: `https://${url.host}${url.pathname}${url.search}`
      }
    });
  }

  // Handle trailing slashes consistently
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: `${url.protocol}//${url.host}${url.pathname.slice(0, -1)}${url.search}`
      }
    });
  }

  // Handle legacy routes or common mismatches
  const redirectMap = {
    '/blog.html': '/blog',
    '/about.html': '/about',
    '/index.html': '/',
  };

  const redirectTo = redirectMap[url.pathname];
  if (redirectTo) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: `${url.protocol}//${url.host}${redirectTo}${url.search}`
      }
    });
  }

  return next();
});
