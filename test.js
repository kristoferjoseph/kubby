var assert = require('assert')
var Cubby = require('./')
var display

if (typeof window !== 'undefined') {
  display = document.getElementById('output')
}

function print(out) {
  if (display) {
    display.innerHTML += out
  }
}

function fail(msg) {
  var out = '  ✘ ' + msg
  console.error(out)
  print('<h4 class="test-fail">'+out+'</h4>')
}

function pass(msg) {
  var out = '  ✔︎ ' + msg
  console.info(out)
  print('<h4 class="test-pass">'+out+'</h4>')
}

function test(label, func) {
  var f = false
  label = label || ''
  console.info(label)
  print('<h3 class="test-label">'+label+'</h3>')
  try {
    msg = func()
  }
  catch(e) {
    f = e.message
    fail(f)
  }
  finally {
    if (!f) {
      pass('passed')
    }
  }
}

module.exports = function() {

  test('cubby', function() {
    var cubby = Cubby()
    assert(cubby, 'cubby doesn\'t exist')
  })

  test('should store item by label', function() {
    var cubby = Cubby()
    cubby.set('test-thing', {thing:'test'})
    assert.equal(
      JSON.parse(localStorage.getItem('test-thing')).thing,
      'test',
      'cubby did not store an item'
    )
  })

  test('should get item by label', function() {
    var cubby = Cubby()
    assert.equal(
      cubby.get('test-thing').thing,
      'test',
      'cubby did not store an item'
    )
  })

  test('should store item in session by label', function() {
    var cubby = Cubby({storage:'session'})
    cubby.set('test-thing', {thing:'test'})
    assert.equal(
      JSON.parse(sessionStorage.getItem('test-thing')).thing,
      'test',
      'cubby did not store an item'
    )
    cubby.empty()
  })

  test('should empty cubby', function() {
    var cubby = Cubby()
    cubby.empty()
    assert.equal(cubby.get('test-thing'), null, 'cubby did not empty')
  })

}()
