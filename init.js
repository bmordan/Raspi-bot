var five = require('johnny-five')
var raspi = require('raspi-io')
var board = new five.Board({
  io: new raspi()
})
var dgram = require('dgram')
var listen = dgram.createSocket('udp4')
listen.bind(3000)

board.on('ready', function () {

  this.pinMode('GPIO18', five.Pin.PMW)
  this.pinMode('GPIO17', five.Pin.OUTPUT)

  this.pinMode('GPIO6', five.Pin.OUTPUT)
  var l = new five.Motor(['GPIO18','GPIO17'])
  var r = new five.Motor(['GPIO12','GPIO6'])

  listen.on('message', function (msg, rinfo) {
    var payload = JSON.parse(msg)
    switch (payload.motor+payload.dir) {
      case 'leftforward':
        motor.leftforward()
        break
      case 'leftreverse':
        motor.leftreverse()
        break
      case 'leftstop':
        motor.leftstop()
        break
      case 'rightforward':
        motor.rightforward()
        break
      case 'rightreverse':
        motor.rightreverse()
        break
      case 'rightstop':
        motor.rightstop()
        break
    }
  })

  board.wait(300, function () {
    motor.reverse()
    motor.stop()
  })

  board.repl.inject({
    r: r
  })

  var motor = ({
    stop: function () {
      l.stop()
      r.stop()
    },
    leftstop: function () {
      l.stop()
    },
    rightstop: function () {
      r.stop()
    },
    leftforward: function () {
      l.forward(60)
    },
    rightforward: function () {
      r.forward(60)
    },
    leftreverse: function () {
      l.reverse(160)
    },
    rightreverse: function () {
      r.reverse(160)
    },
    reverse: function () {
      l.reverse(160)
      r.reverse(160)
    }
  })

})
