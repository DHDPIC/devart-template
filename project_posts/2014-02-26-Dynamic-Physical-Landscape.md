Dynamic Physical Landscape

So we want to create a physical landscape where we can dynamically change the physical height of the terrain based on data we receive from devices of users at the exhibition.

We need:
a grid of servo motors
a large piece of lycra to cover the grid
an Arduino to receive data from node
a shield to interface between Arduino and array of servos
a projector to project light and colour onto the surface

Arduino
For those unaware, an Arduino is an electronics prototyping platform with many applications for example, sensing the environment, physical interfaces, interactive objects, controlling lights, controlling motors. It is this last aspect we will be using. The Arduino will receive data from the node server and then use that data to control the motors. Connecting one or two motors to an Arduino is ok, but if you want to control many motors then a shield will help manage them.

![Arduino](http://cdn.shopify.com/s/files/1/0192/8922/products/ARDU-03_grande.jpeg?v=1370608120&raw=true "Arduino")


Shield
For servo motors we should need something like the Adafruit 16 channel PWM shield. This will allow us to control 16 servo motors. We could then arrange those motors in a grid such as 4x4, or 2x8. The great thing about this shield is it can be stacked, so more shields and therefore more servos can be added. A total of 62 shields can be stacked allowing up to 992 servo motors to be controlled by one arduino! This may well be an excessive amount, but it does allow as to play with a lot more than 16 servos and therefore increases the 'resolution' of our terrain. At the moment I am imagining a 16x16 grid, which would require 16 shields.

http://www.adafruit.com/images/large/1411_LRG.jpg
![Shield](http://www.adafruit.com/images/large/1411_LRG.jpg?raw=true "Shield")


Servo motors
We will use servo motors as they are ideal for controlling a limited range of motion (180 degrees) which should be prefect for us to control the height of a point. The servo moves in a circular motion, but we need a vertical motion, which can be achieved using a hinged push rod from the servo to a another rod that is confined to move in a vertical orientation. Of course this requires mounting, and depending on eye level of the main projected display and therefore the landscape, I think it would be cool to have the inner (or under) workings of the movable terrain visible to the visitors. This means they would need to be designed and built with as considered aesthetics as the visuals they help to create.

http://cdn.shopify.com/s/files/1/0192/8922/products/SERV-03-MI_grande.jpeg?v=1370607733
![Servo](http://cdn.shopify.com/s/files/1/0192/8922/products/SERV-03-MI_grande.jpeg?v=1370607733&raw=true "Servo")

Power
The arduino runs on a 5V supply either via USB or a wall unit. Servo motors usually require about 5V too. When working with the shield and multiple servos, we separate the power supplies, one for the arduino board, and one for the shield and servos. For a couple servos we can use 5V 1A supply, but for 16 servos we need a 5V 10A supply, according to the adafruit website. So if we have multiple shields we will need a 5V 10A supply for each shield.

//

Costs
For 1 servo test:
22 1x arduino
16 1x shield
5 1x servo motors
6 1x 5V 1A power supply
£49

For full shield test:
22 1x arduino
16 1x shield
80 16x servo motors
24 1x 5V 10A power supply
£142

For 16x16 grid:
22 1x arduino
256 16x shield
1280 256x servo motors
384 16x 5V 10A power supply
£1942

+ a large sheet of lycra!
