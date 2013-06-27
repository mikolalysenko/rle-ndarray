var zeros = require("zeros")
var ndarray = require("ndarray")
var fill = require("ndarray-fill")
var conv = require("../index.js")

require("tape")(function(t) {

  function checkFunc(shape, f) {
    var x = zeros(shape)
    fill(x, f)
    var vol = conv.array2rle([0,0,0], x)
    var y = conv.rle2array(vol, [[0,0,0], shape]).phase
    
    for(var i=0; i<shape[0]; ++i) {
      for(var j=0; j<shape[1]; ++j) {
        for(var k=0; k<shape[2]; ++k) {
          t.equals(x.get(i,j,k), y.get(i,j,k))
        }
      }
    }
  }

  checkFunc([2,2,2], function(x,y,z) {
    return x===0 && y==0 && z==0
  })

  checkFunc([3, 4, 5], function(x, y, z) {
    x -= 2
    y -= 2
    z -= 2
    return x*x+y*y+z*z<3 ? 1 : 0
  })

  t.end()
})
