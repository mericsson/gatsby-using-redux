// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "page-component---src-pages-a-js": require("bundle-loader?lazy&name=page-component---src-pages-a-js!/Users/mericsson/dev/gatsby-using-redux/src/pages/a.js"),
  "page-component---src-pages-b-js": require("bundle-loader?lazy&name=page-component---src-pages-b-js!/Users/mericsson/dev/gatsby-using-redux/src/pages/b.js"),
  "page-component---src-pages-c-js": require("bundle-loader?lazy&name=page-component---src-pages-c-js!/Users/mericsson/dev/gatsby-using-redux/src/pages/c.js"),
  "page-component---src-pages-index-js": require("bundle-loader?lazy&name=page-component---src-pages-index-js!/Users/mericsson/dev/gatsby-using-redux/src/pages/index.js")
}

exports.json = {
  "a.json": require("bundle-loader?lazy&name=path---a!/Users/mericsson/dev/gatsby-using-redux/.cache/json/a.json"),
  "b.json": require("bundle-loader?lazy&name=path---b!/Users/mericsson/dev/gatsby-using-redux/.cache/json/b.json"),
  "c.json": require("bundle-loader?lazy&name=path---c!/Users/mericsson/dev/gatsby-using-redux/.cache/json/c.json"),
  "index.json": require("bundle-loader?lazy&name=path---index!/Users/mericsson/dev/gatsby-using-redux/.cache/json/index.json")
}

exports.layouts = {
  "index": require("bundle-loader?lazy&name=layout-component---index!/Users/mericsson/dev/gatsby-using-redux/src/layouts/index")
}