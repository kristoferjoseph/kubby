module.exports = function kubby(options) {
  options = options || {}
  var storage = options.storage === 'session'?
    sessionStorage:
    localStorage

  function set(label, data) {
    if (label && typeof label === 'string' && data) {
      if (typeof window !== 'undefined') {
        storage.setItem(label, JSON.stringify(data))
      }
    }
    else {
      throw Error('kubby.set requires a string label and data to store.')
    }
  }

  function get(label) {
    if (label && typeof label === 'string') {
      if (typeof window !== 'undefined') {
        return JSON.parse(storage.getItem(label))
      }
    }
    else {
      throw Error('kubby.get requires a string label to retrieve data from store.')
    }
  }

  function empty() {
    if (typeof window !== 'undefined') {
      storage.clear()
    }
  }

  return {
    get:get,
    set:set,
    empty:empty
  }
}
