module.exports = function () {
  var elems = new Set
  return function (fn) {
    return function (elem) {
      if (!elems.has(elem)) {
        elems.add(elem)
        fn(elem)
      }
    }
  }
}
