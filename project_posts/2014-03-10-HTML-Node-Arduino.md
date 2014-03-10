A successful experiment this weekend connecting an HTML frontend to an Arduino. Sockets.io is used to transfer mouse data to a node server which then sends on the data to the Arduino. The mouse movement controls the rotation of a servo, this would be scaled up to control many servos.

http://youtu.be/IQfkneaThgk

We are using node-serialport library to communicate between the node server and the arduino. We also looked at johnny-five library built on top of node-serialport and allows you to program the board directly from javascript and node, using the firmata protocol. However at this early stage it is best to keep it is a bare bones as possible. So we aren't using johnny-five, however it may prove useful later or for another project. 

![Connection Sketch](../project_images/IMG_1552_w.jpg?raw=true "Connection Sketch")

The motor shield to control the servo in this test is different to the PWM shield we would use when targeting multiple servos. That is simply because I already have this shield purchased and soldered ready to use and should prove no issue to use a different shield.