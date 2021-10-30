module.exports = {
  productionSourceMap: false,
  css: {
    extract: false
  },
  pages: {
    index: {
      entry: 'src/simple.ts',
      template: 'public/index.html',
      filename: 'index.html'
    },
    usage: {
      entry: 'src/simple.ts',
      template: 'public/usage.html',
      filename: 'usage.html'
    },
    api: {
      entry: 'src/simple.ts',
      template: 'public/api.html',
      filename: 'api.html'
    },
    simple: {
      entry: 'src/simple.ts',
      template: 'public/simple.html',
      filename: 'simple.html'
    },
    advanced: {
      entry: 'src/advanced.ts',
      template: 'public/advanced.html',
      filename: 'advanced.html'
    }
  }
};