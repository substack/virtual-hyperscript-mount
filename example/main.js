var vdom = require('virtual-dom')
var getmedia = require('getusermedia')
var h = require('virtual-hyperscript-hook')(vdom.h)
var mount = require('../')()

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
