var five = require('johnny-five')
var raspi = require('raspi-io')
var board = new five.Board({
  io: new raspi()
})

board.on('ready', function () {

  this.pinMode('GPIO17', five.Pin.OUTPUT)
  this.pinMode('GPIO6', five.Pin.OUTPUT)
  var l = new five.Motor(['GPIO18','GPIO17'])
  var r = new five.Motor(['GPIO12','GPIO6'])

  var m = ({
    f: function () {
      l.forward(100)
      r.forward(100)
    },
    r: function () {
      l.reverse(100)
      r.reverse(100)
    },
    s: function () {
      l.stop()
      r.stop()
    }
  })

  board.wait(200, function () {
    m.s()
  })
  m.r()

  board.repl.inject({
    m: m
  })

})
