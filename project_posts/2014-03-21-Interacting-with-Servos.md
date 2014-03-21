A lot of goodies arrived in the post!

Adafruit PWM shield

16x micro servos

5V 10A powersupply

![Parts Arrived](../project_images/IMG_1672_w.jpg?raw=true "Parts Arrived")

I soldered the board together, downloaded the Servo/PWM library from Adafruit, plugged in the power, connected the micro servos.  I had to calibrate the servos which took a little trial and error and ran the test code provided in the library and everything seemed to work reasonably well.

Next I programmed an Arduino sketch to select and rotate a specific servo based on a value received by serial communication. Then I went over to Processing to write a quick sketch which would send the data to the Arduino. Arduino and Processing work very well together so it was the best choice for writing a quick test. The Processing sketch divides the screen horizontally into 8 portions and then sends a value between 0-7 to the Arduino depending on which "sector" the mouse is currently in. The Arduino receives that data and makes whichever servo number is sent to rotate to the "on" position while any others are rotated to the off position. This is a simple test, but I am impressed with how quickly the data is sent and reacted to by the servos, and pleased that it is relatively simple to get running. Clearly it would be possible to expand to make a very large grid of servos interacted with in realtime for an installation. To switch from Processing to Node and an html/smartphone sending the serial data would not be dificult and demonstrated on a previous project post. You can see a video of this test working below:

http://youtu.be/uZXG187qLvY

And here is the Processing code:
```
import processing.serial.*;

Serial myPort;  // Create object from Serial class
int lastSent = -1;

void setup() {
  size(1200,900);
  String portName = Serial.list()[9]; // check on list to match your port
  println(Serial.list());
  myPort = new Serial(this, portName, 9600);
}

void draw() {
  for(int i=0; i<width; i+=width/8) {
    line(i,0,i, 600);
  }
  int x = int( float(mouseX)/float(width) * 8 );
  if(x != lastSent) {
    myPort.write(x);
    lastSent = x;
    println(x);
  }
}
```

And here is the Arduino code:
```
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

#define SERVOMIN  150 // 150 this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX  600 // 600 this is the 'maximum' pulse length count (out of 4096)

uint8_t servonum = 0;
int servototal = 8;

void setup() {
  Serial.begin(9600);
  Serial.println("16 channel Servo test!");

  pwm.begin();
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
}

void loop() {
  // Get serial data
  if(Serial.available()) {
    servonum = Serial.read();
  }
  Serial.println(servonum);
  // loop through servos if one equals serial data then set position to "on"/max
  for(int i=0; i < servototal; i++) {
    if(i == servonum) {
      pwm.setPWM(servonum, 0, SERVOMAX);
    } 
    else {
      pwm.setPWM(i, 0, SERVOMIN);
    }
  }
}
```