var johnnyFive = require("johnny-five"),
    dualShock = require('dualshock-controller'),
    controller = dualShock({
        //config: "dualshock4-generic-driver"
        accelerometerSmoothing: true,
        analogStickSmoothing: false
    });

var board = johnnyFive.Board({
        debug: true
    }),
    speed = 255,
    servoX,
    servoY,
    motorRight,
    motorLeft;


function stop() {
    motorRight.stop();
    motorLeft.stop();
};

board.on("ready", function() {
    console.log('Board Ready');
    servoX = new johnnyFive.Servo({
        pin: 9
    });
    servoY = new johnnyFive.Servo({
        pin: 10
    });
    motorRight = new johnnyFive.Motor({
        pins: {
            pwm: 3,
            dir: 12
        }
    });
    motorLeft = new johnnyFive.Motor({
        pins: {
            pwm: 11,
            dir: 13
        }
    });
   
});
controller.on('left:move', function(data) {
    console.log(data);
    //servos move from 0 to 180
    //data comes from 0 to 255 where 125 is the center.]
    if(!servoY || !servoX){
        return;
    }
    servoY.to(data.y * 0.72);
    servoX.to(180 - (data.x * 0.72));
});

    //directional pad of the controller will move the bot.
    controller.on('dpadUp:press', function () {
        motorRight.forward(speed);
        motorLeft.forward(speed);
    });
    controller.on('dpadUp:release', function () {
        stop();
    });
    controller.on('dpadRight:press', function () {
        motorRight.reverse(speed);
        motorLeft.forward(speed);
    });
    controller.on('dpadRight:release', function () {
        stop();
    });
    controller.on('dpadLeft:press', function () {
        motorRight.forward(speed);
        motorLeft.reverse(speed);
    });
    controller.on('dpadLeft:release', function () {
        stop();
    });
    controller.on('dpadDown:press', function () {
        motorRight.reverse(speed);
        motorLeft.reverse(speed);
    });
    controller.on('dpadDown:release', function () {
        stop();
    });

controller.connect();
