# Kubby
Simplified browser storage 🗃 

## Install
`npm i kubby --save`

## Usage
#### persistent
```
var kubby = require('kubby')()
kubby.set('lunchbox', {lunch:'pb&j'})
console.log(kubby.get('lunchbox'))// pb&j
kubby.empty()
```
#### session based
```
var kubby = require('kubby')({storage:'session'})
kubby.set('lunchbox', {lunch:'pb&j'})
console.log(kubby.get('lunchbox'))// pb&j
kubby.empty()
```
## Test
`npm test`
