import { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  // Remove .html extension if present
  if (url.pathname.endsWith('.html')) {
    const newPath = url.pathname.slice(0, -5);
    return Response.redirect(new URL(newPath, request.url), 301);
  }

  // Add .html for specific paths
  if (['/blog', '/about'].includes(url.pathname)) {
    const response = await context.next();
    if (response.status === 404) {
      return context.rewrite(`${url.pathname}.html`);
    }
    return response;
  }

  return context.next();
};
