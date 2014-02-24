Our idea is starting to take form and coming to life with some great tests in code.

![User Colour](../project_images/IMG_1549_w.jpg?raw=true "User Colour")

We made numerous experiments with dynamically creating textures, using algorithms and input sent from a mobile device via nodes, to generate lines and areas of gradients.These textures are all created in HTML5 Canvas using Javascript. Textures can be used to colour any shapes we make in WebGL, but also used to modify the actual form of the shape using a vertex shader. You can see grabs of some of the textures below.

![Texture_1](../project_images/sphere_texture_01.jpg?raw=true "Texture_1")
![Texture_2](../project_images/random_texture.jpg?raw=true "Texture_2")
![Texture_3](../project_images/scrolling_colour_texture.jpg?raw=true "Texture_3")
![Texture_4](../project_images/sphere_texture_trail_01.jpg?raw=true "Texture_4")
![Texture_5](../project_images/sphere_texture_trail_02.jpg?raw=true "Texture_5")

The latest tests take phone accelerometer data to draw a line along a scrolling texture. This leaves a trail where the user has 'been', with multiple users there would be multiple trails across the sphere surface. The generated texture is used by the vertex shader to manipulate the surface of the sphere. Here is a video showing the interaction between phone and sphere: 

http://youtu.be/9OfsLbkoTkM

Our installation is concerned with the contradiction of mobile devices that encourage a user to interact with other people, but so often not with those who they share a space with. How often do we see people sat next to each other not talking as they are checking something on their phones. They provide a screen to look at instead of seeing what is actually around you, a portal to distract you from your current situation. Yet phones and tablets do offer a powerful tool to augment interaction between people in the same space. We want to use this to create expressive and dynamic output. We need to consider carefully how a visitor to the exhibition can use their device as a tool but with the minimum of fuss and doesn't force them to look at their phone too much and distract them from the main display.

The second element to our installation is the idea of confluence and that the more voices that are added to a debate, the less influence one person has. Does a single voice get lost in noise or do we start to see interactions between different people and groups: following, mirroring, flocking, patterns? And do we see any forms of emergent behaviour both from the system itself we design but also in users as elements in the system?

![Giant Sphere Sketch](../project_images/IMG_1550_w.jpg?raw=true "Giant Sphere Sketch")

While it is very cool to have this landscape coming towards you, we thought it would be even cooler, and make for a great installation piece, to have the landscape come out of the screen into the physical space before you! So we would like to build a deformable plane using a grid of points which heights can be modified using motors and controlled by an Arduino using the same data as the main display window. The main display and our physical landscape would be synchronised so that any deformations to the display landscape would then 'transmit' through the physical display as if the features are rushing towards you. The points would be covered by a material layer and this would allow the surface to be projected onto from above, so any colour or lighting information from the main display would also be transferred to the physical landscape. Check the sketches below:

![Physical Terrain](../project_images/IMG_1551_w.jpg?raw=true "Physical Terrain")

Moving forward there is lots to do and plenty of exciting things to explore and experiment with.

We need to work on having multiple devices connected at once so we can send each device a unique colour, but crucially so we can handle the data they send to us and then use it to control and manipulate what is displayed.

Breaking out into the 3rd dimension and filling a space with a moving and deformable plane/terrain is a very exciting prospect. For this we would need an Arduino and an array of servo motors, and this would need a servo motor shield to interface between the Arduino and servos. The electronics, mechanics, and communication needs thorough investigation and planning, but from previous experience it should be possible to control the Arduino from nodejs.

Installations should be as full a sensory experience as possible and it would be great to include an audio element to match our generated landscape. There are some really interesting developments in HTML5 audio and javascript libraries to match such as http://flockingjs.org/ so this could be an interesting route to take. Alternatively a separate computer or application could dial in to the node stream and create the audio in something like Processing and using the Minim library.