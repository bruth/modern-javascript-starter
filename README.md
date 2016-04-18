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
npm run serve
```

Open a Web browser to [http://localhost:8080](http://localhost:8080). Open the developer tools for the browser as well to see console messages regarding the Hot Module Reload.

## Customize

By default, this starter kit comes which no runtime dependencies, only tooling. Pick and choose from the components below that may be useful depending on the scope and scale or your project. They primary include additional JavaScript features and common libraries.

### ES2015 Pollyfill

As of version 6, Babel now only does syntax transformations based on the loaders enabled. This enables using ES2015 syntax, but does not actually provide any of the modules in ES2015 itself like Promise, Set, or Map. For this the [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) must be installed.

#### Install

```
npm install --save-dev babel-polyfill
```

#### Setup

This must be included in modules that use these features:

```js
import 'babel-polyfill'
```

### ES2015 Experimental Features

Babel provides [two presets](https://babeljs.io/docs/plugins/#presets) with the stable features in ES2015. However there are a variety of other [plugins for experimental features](https://babeljs.io/docs/plugins/). Two recommended syntax plugins are [class properties](http://babeljs.io/docs/plugins/syntax-class-properties/) and the [object rest spread](http://babeljs.io/docs/plugins/syntax-object-rest-spread/) syntax.

#### Install

```
npm install --save-dev \
  babel-plugin-transform-class-properties \
  babel-plugin-transform-object-rest-spread
```

#### Setup

Update the `.babelrc` to include the additional plugins:

```
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

### React

[React](https://facebook.github.io/react/) is a relatively sophisticated library for building user interfaces.

#### Install

```
# Development
npm install --save-dev \
  babel-preset-react \
  react-hot-loader 

# Runtime
npm install --save \
  react \
  react-dom 
```

#### Setup

Add `react` to the `.babelrc` `presets` array.

Prepend the following to `module.loaders` array of `webpack.config.babel.js`. It must be the first loader so the state of the components can saved prior to recompilation.

```js
{
  text: /\.js$/,
  exclude: /node_modules/,
  loader: "react-hot"
}
```

*For the future, this plugin is being phased out by another, but it is not yet stable: https://github.com/gaearon/babel-plugin-react-transform/.*

Add the `react` Babel preset to the `.babelrc` file.

```
{
  "presets": [
    "es2015",
    "react"
  ]
}
```

#### Example

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

#### Other

[React Developer Tools](https://chrome.google.com/webstore/detail/fmkadmapgofadopljbjfkapdkoienihi) is a Chrome Extension that adds a panel to the Developer Tools.

### Redux

[Redux](http://redux.js.org/) is a "predictable state container for JavaScript apps." 

#### Install

```
npm install --save \
  redux \
  redux-react
```

#### Example

There are several parts to Redux, so it recommended to read through the documentation available at http://redux.js.org/.

#### Other

[Redux DevTools](https://chrome.google.com/webstore/detail/lmhkpmbekcpmknklioeibfkpmmfibljd) is a Chrome extension that wraps most of the functionality provided in the [native redux-devtools library](https://github.com/gaearon/redux-devtools) without needing to instrument your code directly.

### React Router

#### Install

```
npm install --save react-router
```

#### Code

```js

```

#### Example


## Credits

- https://robots.thoughtbot.com/setting-up-webpack-for-react-and-hot-module-replacement
