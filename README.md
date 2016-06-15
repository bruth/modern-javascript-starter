# Modern JavaScript Starter

This includes a very minimal setup for starting a *modern* JavaScript project. At this time (and my opinion), *modern* involves using [ES2015](https://babeljs.io/docs/learn-es2015/) syntax and language features and [Webpack](https://webpack.github.io/), a very fast and flexible build tool with "no setup" [hot module replacement](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack).

Although most browsers do not support ES2015 (also referred to as ES6), a tool called [Babel](https://babeljs.io) is available to transpile ES6 code back to ES5/4 syntax and features. This enables you the developer to learn and take advantage of the new language and features without needing to wait for browsers to implement everything.

The goal of this repository is to provide only the necessary code and configuration to have a functioning development environment. The emphasis will be on tiny guides below for integrating other popular tools and libraries depending on your stack requirements.

**How minimal is it?**

Look at [main.js](./src/main.js) and [index.html](./src/index.html). It that feels *lame*, it should. Look below for how to customize it to your needs.

## Setup

Since everything is driven by short guides, it is recommended to simply download the [zip file](https://github.com/bruth/modern-javascript-starter/archive/master.zip) of the repository.

The only prerequisites are [Node](https://nodejs.org) and [NPM](https://docs.npmjs.com/getting-started/installing-node#installing-nodejs). Once installed run to get Babel and Webpack installed.

```
npm install
```

Start the webpack server by running:

```
npm start
```

Open a Web browser to [http://localhost:8080](http://localhost:8080). Open the developer tools for the browser as well to see console messages regarding the Hot Module Reload.

## Guide

By default, this starter kit comes which no runtime dependencies, only tooling. Pick and choose from the components below that may be useful depending on the scope and scale or your project. They primary include additional JavaScript features and common libraries.

- [General](#general)
    - [Webpack Loaders](#webpack-loaders)
    - [ES2015 Experimental](#es2015-experimental)
    - [CSS Bundling](#css-bundling)
- [Polyfills](#polyfills)
    - [ES2015 (general)](#es2015-polyfill)
    - [Fetch](#fetch-polyfill)
    - [Promise](#promise-polyfill)
- [Libraries](#libraries)
    - [React](#react)
    - [Redux](#redux)
    - [React Router](#react-router)
    - [Redux Thunk](#redux-thunk)

### General

#### Webpack Loaders

##### Install

```
npm install --save-dev \
    exports-loader \
    imports-loader
```

##### Setup
Add the following code to the `webpack.config.babel.js` file as specified in the comments.

```js
// Ensure webpack is imported.
import webpack from 'webpack'

// Add this plugins option in the configuration object.
plugins: [
    // plugins go here...
]
```

### ES2015 Experimental

Babel provides [two presets](https://babeljs.io/docs/plugins/#presets) with the stable features in ES2015. However there are a variety of other [plugins for experimental features](https://babeljs.io/docs/plugins/). Two recommended syntax plugins are [class properties](http://babeljs.io/docs/plugins/syntax-class-properties/) and the [object rest spread](http://babeljs.io/docs/plugins/syntax-object-rest-spread/) syntax.


#### Install

```
npm install --save-dev \
  babel-plugin-transform-class-properties \
  babel-plugin-transform-object-rest-spread
```

#### Setup

Update the `.babelrc` to include the additional plugins:

```json
{
  "presets": [
    "es2015"
  ],

  "plugins": [
    "transform-class-properties",
    "transform-object-rest-spread"
  ]
}
```

#### CSS Bundling

With Webpack, it's possible to bundle separate stylesheets together into a single
unified sheet that is used by your app, much like it does with separate Javascript files.
This allows you to isolate and more easily manage the styling of each component of your app.
In order to get CSS bundling up and working, we'll need to install a few more libraries.

##### CSS Loader, Style Loader

The Webpack CSS Loader takes all of your separate CSS files and bundles them into a single
CSS file that can style your entire application.  Style Loader takes this file and injects it into
a style tag in the rendered page.  First, install the libraries:

```
npm install --save-dev \
  css-loader \
  style-loader
```

Next, update the loaders section in your Webpack config file:

```js
module: {
  loaders: [
    // The CSS loader allows for webpack to compile CSS stylesheets into a
    // single sheet.  The 'localIdentName=[name]__[local]___[hash:base64:5]'
    // gives each CSS selector a unique name to avoid naming conflicts.
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
    }
    // and other loaders
  ]
}
```

##### Extract Text Plugin
If you're deploying an app to production, you'll want an actual CSS file as output
from a bundler.  This can be accomplished with the Extract Text Plugin.

Install:
```
npm install --save-dev extract-text-webpack-plugin
```

Update Webpack config:

```js
import ExtractTextPlugin from "extract-text-webpack-plugin"

// Add publicPath to serve files on the dev server
output: {
  path: __dirname + "/dist",
  filename: "bundle.js",
  publicPath: "/static/"
},

// add ExtractText to plugins
plugins: [
  new ExtractTextPlugin('bundle.css', { allChunks: true }),
]

// Update your CSS loader in loaders
{
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
}

```

We can create this single CSS file in by running the `npm run build` command.
This file can now be include in your document:

```html
<head>
  <link rel="stylesheet" type="text/css" href="bundle.css">
</head>
```

### Polyfills

#### ES2015 Polyfill

As of version 6, Babel now only does syntax transformations based on the loaders enabled. This enables using ES2015 syntax, but does not actually provide any of the modules in ES2015 itself like Promise, Set, or Map. For this the [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) must be installed.

##### Install

```
npm install --save-dev babel-polyfill
```

##### Setup

This must be included in modules that use these features:

```js
import 'babel-polyfill'
```

#### Fetch Polyfill

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is a [new standard](https://fetch.spec.whatwg.org/) for requests and responses in the browser.

Currently, Chrome and Firefox support the new API, but IE and Safari do not. This is a polyfill that can be implicitly added through a Webpack loader.

##### Dependencies

- [Webpack `imports` Loader](#webpack-loaders)

#### Install

```
npm install --save whatwg-fetch
```

#### Setup

Add this to the `plugins` array in the Webpack config.

```js
new webpack.ProvidePlugin({
   'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
})
```

#### Promise Polyfill

##### Dependencies

- [Webpack `imports` Loader](#webpack-loaders)

#### Install

```
npm install --save es6-promise
```

#### Setup

Make the following changes to the `webpack.config.babel.js` file.

```js
new webpack.ProvidePlugin({
   'promise': 'imports?this=>global!exports?global.Promise!es6-promise'
})
```

### Libraries

#### React

[React](https://facebook.github.io/react/) is a relatively sophisticated library for building user interfaces.

##### Install

```
# Development
npm install --save-dev \
  babel-preset-react

# Runtime
npm install --save \
  react \
  react-dom
```

##### Setup

Add the `react` Babel preset to the `.babelrc` file.

```json
{
  "presets": [
    "es2015",
    "react"
  ]
}
```

##### Example

This could replace `main.js` as the top-level component to render in the `#main` element.

```js
import React from 'react'
import ReactDOM from 'react-dom'

// Stateless, functional component.
const Main = () => (
  <h1>Hey there...</h1>
);

ReactDOM.render(
  <Main />,
  document.getElementById('main')
)
```

##### Add-ons

[React Developer Tools](https://chrome.google.com/webstore/detail/fmkadmapgofadopljbjfkapdkoienihi) is a Chrome Extension that adds a panel to the Developer Tools.

#### Redux

[Redux](http://redux.js.org/) is a "predictable state container for JavaScript apps."

##### Install

```
npm install --save \
  redux \
  react-redux
```

##### Example

There are several parts to Redux, so it is recommended to read through the documentation available here: http://redux.js.org/.

##### Add-ons

[Redux DevTools](https://chrome.google.com/webstore/detail/lmhkpmbekcpmknklioeibfkpmmfibljd) is a Chrome extension that wraps most of the functionality provided in the [native redux-devtools library](https://github.com/gaearon/redux-devtools) without needing to instrument your code directly.

A common oversight when defining actions is implementing a reducer function (or logic) for that action. [Redux Unhandled Action](https://github.com/socialtables/redux-unhandled-action) is a small bit of *middleware* that compares the before and after state after a action is handled to determine if the state changed. If it does not then an error is logged to the console to note which action went unhandled.

```bash
npm install --save redux-unhandled-action
```

The middleware is applied when creating the store.

```javascript
import { createStore, applyMiddleware } from 'redux'
import unhandledAction from 'redux-unhandled-action'
import rootReducer from './reducer'

const store = createStore(rootReducer, applyMiddleware(unhandledAction()))
```

#### React Router

[React Router](https://github.com/reactjs/react-router) is a routing library for React.

##### Install

```
npm install --save \
    react-router \
    react-router-redux
```

##### Example

There are several parts to React Router, so it is recommended to read through the documentation available here: https://github.com/reactjs/react-router/tree/master/docs#table-of-contents

#### Redux Thunk

[Redux Thunk](https://github.com/gaearon/redux-thunk) "allows you to write action creators that return a function instead of an action." Read the [motivation](https://github.com/gaearon/redux-thunk#motivation) for an in-depth example.

#### Install

```
npm install --save redux-thunk
```
