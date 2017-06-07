// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "page-component---src-pages-a-js": preferDefault(require("/Users/mericsson/dev/gatsby-using-redux/src/pages/a.js")),
  "page-component---src-pages-b-js": preferDefault(require("/Users/mericsson/dev/gatsby-using-redux/src/pages/b.js")),
  "page-component---src-pages-c-js": preferDefault(require("/Users/mericsson/dev/gatsby-using-redux/src/pages/c.js")),
  "page-component---src-pages-index-js": preferDefault(require("/Users/mericsson/dev/gatsby-using-redux/src/pages/index.js"))
}

exports.json = {
  "a.json": require("/Users/mericsson/dev/gatsby-using-redux/.cache/json/a.json"),
  "b.json": require("/Users/mericsson/dev/gatsby-using-redux/.cache/json/b.json"),
  "c.json": require("/Users/mericsson/dev/gatsby-using-redux/.cache/json/c.json"),
  "index.json": require("/Users/mericsson/dev/gatsby-using-redux/.cache/json/index.json")
}

exports.layouts = {
  "index": preferDefault(require("/Users/mericsson/dev/gatsby-using-redux/src/layouts/index"))
}