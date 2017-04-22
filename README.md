## Basic Example of how a page could look:

### Usage:
##### install:
```
git clone https://github.com/JannikWibker/micro-site.git
```
##### starting the server:
```
node index.js
```
##### custom port:
```
node index.js 3000
```
##### adding pages:

simply add a .hbs file to the site folder and create a route in `routes.js`
```js
const page = async (req, res) => {
    sendhbs(res, '/page.hbs', {
      title: 'blog',
      file: 'blog',
      foo: 'bar',
    })
  }
```
**note**: You do not need to add head and body tags since these are automatically included. If you want to change what gets automatically included have a look at `site/_document.hbs`. If you want to turn off this layout for a specific page just add `false` as the last argument to the `sendhbs()` function call (the default error page (`_error.hbs` has this by default).

At last you need to add your new page to the router and add it to the exports of the `routes.js` file and imports of the `index.js` file:
```js
// routes.js
return {
  ...,
  page
}
// index.js
const { ..., page } = routes(send, sendhbs, () => posts)

const server = micro(router(
  ...,
  get('/page', page),
  ...
))
```
**note**: Restarting is required after changing either javascript code or .hbs files

#### this is how the current page looks if you clone this repo:
##### Index Page:

![index](https://puu.sh/vsnil/7587e7d28f.png)

##### Blog Page:

![blog](https://puu.sh/vsni8/869f66cd13.png)

##### Blog Post:

![blog-post](https://puu.sh/vsnpD/7378a1da7e.png)

##### Error Page:

![error](https://puu.sh/vsniy/ebadc36025.png)

