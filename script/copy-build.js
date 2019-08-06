const cpx = require('cpx')
const src = 'src'
const dest = 'dist'

cpx.copy(src + '/bts.css', dest + '/', {update:true})