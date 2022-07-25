title: Next.js shared repository component
date: 2022-07-25 11:10:09
tags:
- dev
- next.js
- react
---

These days I’m building several next.js apps and want to share some libraries. In the beginning plain js file without compile just work well. But when it comes to jsx component element with sass component-level module, next.js start to fail.

After several tries, I found a solution:

1. Create shared package somewhere
2. Use `yarn link` to link shared library
3. Use [`next-transpile-module`](https://www.npmjs.com/package/next-transpile-modules) to transpile library
4. Tada!

<!-- more -->

## More detail

```bash
# Shared repo
cd shared
yarn init
yarn link

# Some repo
cd some-good-app
yarn link shared

yard add next-transpile-modules
```

Then edit `next.config.js`

```js
const withTM = require('next-transpile-modules')(['bar'])

module.exports = withTM()
```

Hope this helps you!

## Reference

- [Yarn workspaces example](https://github.com/vercel/next.js/tree/canary/examples/with-yarn-workspaces)
