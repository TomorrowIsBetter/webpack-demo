# webpack-demo
webpack + express + ssr,自身实践用


# TODO:
  SSR渲染成功 + 预渲染


//分析
看了大致
首先从package.json分析
    "dev": "webpack-dev-server --mode=development",
    "webpack": "webpack --mode=development", 
    "build": "webpack --mode=production --config webpack.prod.config.js",
    "clean": "rm -rf ./output",
    "node": "NODE_ENV=development node ./node/index.js"

整个项目估计就是  npm run build npm run node 这两句命令吧



