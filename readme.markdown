# virtual-hyperscript-mount

register mount/unmount lifecycle hooks for [virtual-dom][1]

Use this module with [virtual-hyperscript-hook][2] to register a hook that will
only fire when a new DOM node is added or removed from the page.

[1]: https://npmjs.com/package/virtual-dom
[2]: https://npmjs.com/package/virtual-hyperscript-hook

# example

``` js
var vdom = require('virtual-dom')
var getmedia = require('getusermedia')
var h = require('virtual-hyperscript-hook')(vdom.h)
var mount = require('virtual-hyperscript-mount')()

var main = require('main-loop')
var loop = main({}, render, vdom)
document.body.appendChild(loop.target)

setInterval(function () {
  loop.update({
    time: new Date().toISOString(),
    videoLink: loop.state.videoLink
  })
}, 1000)

getmedia({ video: true, audio: false }, function (err, media) {
  loop.update({
    time: loop.state.time,
    videoLink: URL.createObjectURL(media)
  })
})

function render (state) {
  return h('div', [
    h('h1', state.time),
    h('video', {
      width: 400,
      height: 300,
      src: state.videoLink,
      hook: mount(function (video) { video.play() })
    })
  ])
}
```

# api

``` js
var mount = require('virtual-hyperscript-mount')()
var unmount = require('virtual-hyperscript-mount')()
```

## h(tagName, { hook: mount(function (elem) {}) }, children)

Register a hook that will only fire when an element is added to the page.

## h(tagName, { unhook: unmount(function (elem) {}) }, children)

Register a hook that will only fire when an element is removed from the page.

# license

BSD
