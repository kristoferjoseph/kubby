var assert = require('assert')
var Kubby = require('./')
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

  test('kubby', function() {
    var kubby = Kubby()
    assert(kubby, 'kubby doesn\'t exist')
  })

  test('should store item by label', function() {
    var kubby = Kubby()
    kubby.set('test-thing', {thing:'test'})
    assert.equal(
      JSON.parse(localStorage.getItem('test-thing')).thing,
      'test',
      'kubby did not store an item'
    )
  })

  test('should get item by label', function() {
    var kubby = Kubby()
    assert.equal(
      kubby.get('test-thing').thing,
      'test',
      'kubby did not store an item'
    )
  })

  test('should store item in session by label', function() {
    var kubby = Kubby({storage:'session'})
    kubby.set('test-thing', {thing:'test'})
    assert.equal(
      JSON.parse(sessionStorage.getItem('test-thing')).thing,
      'test',
      'kubby did not store an item'
    )
    kubby.empty()
  })

  test('should empty kubby', function() {
    var kubby = Kubby()
    kubby.empty()
    assert.equal(kubby.get('test-thing'), null, 'kubby did not empty')
  })

  test('should get array of labels', function(t) {
    var kubby = Kubby()
    var lunch
    kubby.set('bag', {sandwich:'grilled cheese'})
    kubby.set('thermos', {soup:'tomato'})
    kubby.set('tupperware', {dip:'hummus'})
    lunchbox = kubby.get(['bag', 'thermos', 'tupperware'])
    assert.deepEqual(lunchbox,{sandwich:'grilled cheese', soup:'tomato', dip:'hummus'})
  })

}()
