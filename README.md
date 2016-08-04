# Kubby
Simplified browser storage 🗃

## Install
`npm i kubby --save`

## Usage
#### persistent
```
var kubby = require('kubby')()
kubby.set('lunchbox', {lunch:'pb&j'})
console.log(kubby.get('lunchbox').lunch)//Outputs pb&j
kubby.empty()
```
#### session based
```
var kubby = require('kubby')({storage:'session'})
kubby.set('lunchbox', {lunch:'pb&j'})
console.log(kubby.get('lunchbox').lunch)//Outputs pb&j
kubby.empty()
```
#### construct entire data object
```
var kubby = require('kubby')()
var lunch
kubby.set('bag', {sandwich:'grilled cheese'})
kubby.set('thermos', {soup:'tomato'})
kubby.set('tupperware', {dip:'hummus'})
lunchbox = kubby.get(['bag', 'thermos', 'tupperware'])
console.log(lunchbox)//Outputs {sandwich:'grilled cheese', soup:'tomato', dip:'hummus'}
kubby.empty()
```

## Test
`npm test`
