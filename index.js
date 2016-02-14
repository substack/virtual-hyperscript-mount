module.exports = function () {
  if (typeof Set !== 'undefined') {
    var elems = new Set
    return function (fn) {
      return function (elem) {
        if (!elems.has(elem)) {
          elems.add(elem)
          fn(elem)
        }
      }
    }
  } else {
    var elems = []
    return function (fn) {
      return function (elem) {
        if (elems.indexOf(elem) < 0) {
          elems.push(elem)
          fn(elem)
        }
      }
    }
  }
}
