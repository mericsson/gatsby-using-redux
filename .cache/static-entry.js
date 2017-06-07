"use strict";

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _reactRouterDom = require("react-router-dom");

var _html = require("../src/html");

var _html2 = _interopRequireDefault(_html);

var _lodash = require("lodash");

var _apiRunnerSsr = require("./api-runner-ssr");

var _apiRunnerSsr2 = _interopRequireDefault(_apiRunnerSsr);

var _pages = require("./pages.json");

var _pages2 = _interopRequireDefault(_pages);

var _syncRequires = require("./sync-requires");

var _syncRequires2 = _interopRequireDefault(_syncRequires);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathChunkName = function pathChunkName(path) {
  var name = path === `/` ? `index` : (0, _lodash.kebabCase)(path);
  return `path---${name}`;
};

var $ = _react2.default.createElement;

// Use default layout if one isn't set.
var layout = void 0;
if (_syncRequires2.default.layouts.index) {
  layout = _syncRequires2.default.layouts.index;
} else {
  layout = function layout(props) {
    return _react2.default.createElement(
      "div",
      null,
      props.children()
    );
  };
}

module.exports = function (locals, callback) {
  var linkPrefix = `/`;
  if (__PREFIX_LINKS__) {
    linkPrefix = `${__LINK_PREFIX__}/`;
  }

  var bodyComponent = $(_reactRouterDom.StaticRouter, {
    location: {
      pathname: locals.path
    },
    context: {}
  }, $((0, _reactRouterDom.withRouter)(layout), {
    children: function children(layoutProps) {
      return $(_reactRouterDom.Route, {
        children: function children(routeProps) {
          var props = layoutProps ? layoutProps : routeProps;
          var page = _pages2.default.find(function (page) {
            return page.path === props.location.pathname;
          });
          return $(_syncRequires2.default.components[page.componentChunkName], (0, _extends3.default)({}, props, _syncRequires2.default.json[page.jsonName]));
        }
      });
    }
  }));

  // Let the site or plugin render the page component.
  var results = (0, _apiRunnerSsr2.default)(`replaceServerBodyRender`, { component: bodyComponent, headComponents: [] }, {});
  var _results$ = results[0],
      body = _results$.body,
      headComponents = _results$.headComponents,
      postBodyComponents = _results$.postBodyComponents,
      bodyRenderProps = (0, _objectWithoutProperties3.default)(_results$, ["body", "headComponents", "postBodyComponents"]);

  // If no one stepped up, we'll handle it.

  if (!body) {
    body = (0, _server.renderToString)(bodyComponent);
  }

  // Check if vars were created.
  if (!bodyRenderProps) {
    bodyRenderProps = {};
  }
  if (!headComponents) {
    headComponents = [];
  }
  if (!postBodyComponents) {
    postBodyComponents = [];
  }

  // Add the chunk-manifest as a head component.
  var chunkManifest = require(`!raw!../public/chunk-manifest.json`);

  postBodyComponents.unshift(_react2.default.createElement("script", {
    id: "webpack-manifest",
    dangerouslySetInnerHTML: {
      __html: `
            //<![CDATA[
            window.webpackManifest = ${chunkManifest}
            //]]>
            `
    }
  }));

  var stats = void 0;
  try {
    stats = require(`../public/stats.json`);
  } catch (e) {
    // ignore
  }

  var dascripts = [`commons`, `app`, `layout-component---index`, pathChunkName(locals.path), _pages2.default.find(function (page) {
    return page.path === locals.path;
  }).componentChunkName];
  dascripts.forEach(function (script) {
    var fetchKey = `assetsByChunkName[${script}]`;

    var fetchedScript = (0, _lodash.get)(stats, fetchKey);
    // If sourcemaps are enabled, then the entry will be an array with
    // the script name as the first entry.
    fetchedScript = (0, _lodash.isArray)(fetchedScript) ? fetchedScript[0] : fetchedScript;
    var prefixedScript = `${linkPrefix}${fetchedScript}`;

    // Make sure we found a component.
    if (prefixedScript === `/`) {
      return;
    }

    // Add preload <link>s for scripts.
    headComponents.unshift(_react2.default.createElement("link", { rel: "preload", href: prefixedScript, as: "script" }));

    // Add script tags for the bottom of the page.
    postBodyComponents.push(_react2.default.createElement("script", { key: prefixedScript, src: prefixedScript }));
  });

  // Call plugins to let them add to or modify components/props.
  var pluginHeadComponents = (0, _apiRunnerSsr2.default)(`modifyHeadComponents`, { headComponents }, []);
  headComponents = headComponents.concat(pluginHeadComponents);

  var pluginPostBodyComponents = (0, _apiRunnerSsr2.default)(`modifyPostBodyComponents`, { postBodyComponents }, []);
  postBodyComponents = postBodyComponents.concat(pluginPostBodyComponents);

  var pluginBodyRenderProps = (0, _apiRunnerSsr2.default)(`modifyBodyRenderProps`, { bodyRenderProps }, {});
  bodyRenderProps = (0, _lodash.merge)(bodyRenderProps, pluginBodyRenderProps);

  var html = `<!DOCTYPE html>\n ${(0, _server.renderToStaticMarkup)(_react2.default.createElement(_html2.default, (0, _extends3.default)({}, bodyRenderProps, { headComponents: headComponents, postBodyComponents: postBodyComponents, body: body, path: locals.path })))}`;
  callback(null, html);
};
//# sourceMappingURL=static-entry.js.map