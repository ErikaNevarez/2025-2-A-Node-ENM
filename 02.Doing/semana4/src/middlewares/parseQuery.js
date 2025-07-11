export function parseQuery(req, res, next) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  req.query = Object.fromEntries(url.searchParams.entries());
  req.pathname = url.pathname;
  next();
}