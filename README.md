# 🌟Cubby🌟
🗃 Simplified browser storage

## Install
`npm i cubby --save`

## Usage
#### persistent
```
var cubby = require('cubby')()
cubby.set('lunchbox', {lunch:'pb&j'})
console.log(cubby.get('lunchbox'))// pb&j
```
#### session based
```
var cubby = require('cubby')({storage:'session'})
cubby.set('lunchbox', {lunch:'pb&j'})
console.log(cubby.get('lunchbox'))// pb&j
```
## Test
`npm test`
