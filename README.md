# Modern JavaScript Starter

This includes a very minimal setup for starting a *modern* JavaScript project. At this time (and based on my opinion), *modern* means [Webpack](https://webpack.github.io/) and [Babel](https://babeljs.io/docs/learn-es2015/) for ES2015 syntax.

The motivation for this repository is to remove the bloat and keep things as simple as they can. This repository provides the minimal bit of boilerplate configuration necessary and focuses on documenting how to integrate other tools and libraries.

**How minimal is it?**

Look at [main.js](./src/main.js) and [index.html](./src/index.html). It that feels *lame*, it should. Look below for how to customize it to your needs.

## Setup

The only prerequisites are [Node](https://nodejs.org) and [NPM](https://docs.npmjs.com/getting-started/installing-node#installing-nodejs).

Download the zip file and unpack it. Then install the dependencies:

```
npm install
```

Start the webpack server by running:

```
npm run serve
```

Open a Web browser to [http://localhost:8080](http://localhost:8080). Open the developer tools for the browser as well to see console messages regarding the Hot Module Reload.

## Customize

Below are additional components that may be useful depending on the scope and scale or your project. They primary include additional JavaScript features and common libraries.

### ES2015 Pollyfill

As of version 6, Babel now only does syntax transformations based on the loaders enabled. This enables using ES2015 syntax, but does not actually provide any of the modules in ES2015 itself like Promise, Set, or Map. For this the [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) must be installed.

```
npm install --save-dev babel-polyfill
```

### Setup

This must be included in modules that use these features:

```js
import 'babel-polyfill'
```

### ES2015 Experimental Features

Babel provides two presets with the stable features in ES2015. However there are a variety of other plugins for experimental features. Two recommended ones are class properties and the object spread syntax.

```
npm install --save-dev babel-plugin-transform-class-properties \
                       babel-plugin-transform-object-rest-spread
```

### Setup

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

## React

[React](https://facebook.github.io/react/) is a relatively sophisticated library for building user interfaces.

```
npm install --save-dev \
  babel-preset-react \
  react-hot-loader 

npm install --save \
  react \
  react-dom 
```

### Setup

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

### Developer Tools

This is a Chrome Extension that adds a panel to the Developer Tools. [Download here](https://chrome.google.com/webstore/detail/fmkadmapgofadopljbjfkapdkoienihi).

### Redux

Install:

```
npm install --save redux redux-react
```

- [Redux DevTools](https://chrome.google.com/webstore/detail/lmhkpmbekcpmknklioeibfkpmmfibljd) is a Chrome extension that enables action history, undo and replay using Redux.

### React Router

```
npm install --save react-router
```


## Credits

- https://robots.thoughtbot.com/setting-up-webpack-for-react-and-hot-module-replacement
