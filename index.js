module.exports = function kubby(options) {
  options = options || {}
  var noop = function(){}
  var storage
  if (typeof window === 'undefined') {
    storage = {setItem:noop,getItem:noop,clear:noop}
  }
  else {
   storage = options.storage === 'session'?
    window.sessionStorage:
    window.localStorage
  }

  function set(label, data) {
    if (label && typeof label === 'string' && data) {
      storage.setItem(label, JSON.stringify(data))
    }
    else {
      throw Error('kubby.set requires a string label and data to store.')
    }
  }

  function get(labels) {
    var result
    if (Array.isArray(labels)) {
      result = {}
      labels.forEach(function(l) {
        Object.assign(result, actualGet(l))
      })
    }
    else if (typeof labels === 'string') {
      result = actualGet(labels)
    }
    else {
      throw Error('kubby.get requires a string label to retrieve data from store.')
    }

    return result
  }

  function actualGet(label) {
    return JSON.parse(storage.getItem(label))
  }

  function empty() {
    storage.clear()
  }

  return {
    get:get,
    set:set,
    empty:empty
  }
}
