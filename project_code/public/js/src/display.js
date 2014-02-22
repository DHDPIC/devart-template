var $o = $('#orientation');
var $alpha = $o.find('.alpha');
var $beta = $o.find('.beta');
var $gamma = $o.find('.gamma');
var $window = $(window);

var socket = io.connect('http://' + config.server + ':' + config.port);
socket.on('orientation', function (data) {
  //console.log(data);
  //
  $alpha.text(data.alpha);
  $beta.text(data.beta);
  $gamma.text(data.gamma);
  //
  phoneA = data.alpha / 360 * 255;
  phoneB = data.beta / 360 * 255;
  phoneG = data.gamma / 360 * 255;

});


var TEX_WIDTH = 64;//256;
var TEX_HEIGHT = 64;//256;

var phoneA = 0;
var phoneB = 0;
var phoneG = 0;

function createTexture() {

  // create Canvas
  var canvas = document.createElement('canvas');
  canvas.width = TEX_WIDTH;
  canvas.height = TEX_HEIGHT; // CHANGE
  var context = canvas.getContext('2d')
  for(var i=0; i<3; i++) {
    // line
    var randX1 = Math.random()*TEX_WIDTH;
    var randY1 = Math.random()*TEX_HEIGHT;
    var randX2 = Math.random()*TEX_WIDTH;
    var randY2 = Math.random()*TEX_HEIGHT;
    console.log(randX1);

    context.beginPath();
    context.moveTo(randX1,randY1);
    context.lineTo(randX2,randY2);
    context.lineJoin = "round";
    context.lineWidth = 10;
    context.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
    context.stroke();
  }


  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
}

function addToTexture() {

  // create Canvas
  var canvas = document.createElement('canvas');
  canvas.width = TEX_WIDTH;
  canvas.height = TEX_HEIGHT; // CHANGE
  var context = canvas.getContext('2d')

  //
  var tx = bumpTexture;
  context.drawImage(tx.image, 0,0,TEX_WIDTH,TEX_HEIGHT);
  //

  for(var i=0; i<1; i++) {
    // line
    var randX1 = Math.random()*TEX_WIDTH;
    var randY1 = Math.random()*TEX_HEIGHT;
    var randX2 = Math.random()*TEX_WIDTH;
    var randY2 = Math.random()*TEX_HEIGHT;
    //console.log(randX1);

    context.beginPath();
    context.moveTo(randX1,randY1);
    context.lineTo(randX2,randY2);
    context.lineJoin = "round";
    context.lineWidth = 10;
    context.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
    context.stroke();
  }


  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
}

function createGradTexture() {
  //
  console.log("grad tex");
  //
  var canvas = document.createElement('canvas');
  canvas.width = TEX_WIDTH;
  canvas.height = TEX_HEIGHT; // CHANGE
  var context = canvas.getContext('2d');
  //
  context.globalCompositeOperation = 'screen';
  //
  for(var i=0; i<1; i++) {
    var rx1 = Math.random()*TEX_WIDTH;
    var ry1 = Math.random()*TEX_HEIGHT;
    var rr1 = Math.random()*8;
    //
    var rr2 = rr1 + Math.random()*64;
    var rx2 = rx1 + rr2/2 - rr2/2*Math.random();//Math.random()*32-16;
    var ry2 = ry1 + rr2/2 - rr2/2*Math.random();//Math.random()*32-16;

    //context.createRadialGradient(x0,y0,r0,x1,y1,r1);
    var grd=context.createRadialGradient(rx1,ry1,rr1,rx2,ry2,rr2);
    grd.addColorStop(0,"white");
    grd.addColorStop(1,"black");

    context.fillStyle=grd;
    context.fillRect(0,0,TEX_WIDTH,TEX_HEIGHT);
  }

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
}

function addGradTexture() {
  //
  var canvas = document.createElement('canvas');
  canvas.width = TEX_WIDTH;
  canvas.height = TEX_HEIGHT; // CHANGE
  var context = canvas.getContext('2d');
  //
  context.globalCompositeOperation = 'screen';

  //
  var tx = bumpTexture;
  context.drawImage(tx.image, 0,0,TEX_WIDTH,TEX_HEIGHT);
  //
  for(var i=0; i<1; i++) {
    var rx1 = Math.random()*TEX_WIDTH;
    var ry1 = Math.random()*TEX_HEIGHT;
    var rr1 = Math.random()*8;
    //
    var rr2 = rr1 + Math.random()*64;
    var rx2 = rx1 + rr2/2 - rr2/2*Math.random();//Math.random()*32-16;
    var ry2 = ry1 + rr2/2 - rr2/2*Math.random();//Math.random()*32-16;

    //context.createRadialGradient(x0,y0,r0,x1,y1,r1);
    var grd=context.createRadialGradient(rx1,ry1,rr1,rx2,ry2,rr2);
    grd.addColorStop(0,"white");
    grd.addColorStop(1,"black");

    context.fillStyle=grd;
    context.fillRect(0,0,TEX_WIDTH,TEX_HEIGHT);
  }

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
}

function createRandomTexture() {
  //
  var canvas = document.createElement('canvas');
  canvas.width = TEX_WIDTH;
  canvas.height = TEX_HEIGHT; // CHANGE
  var context = canvas.getContext('2d');
  //
  context.globalCompositeOperation = 'screen';
  //
  for(var i=0; i<5; i++) {
    var rx1 = Math.random()*TEX_WIDTH;
    var ry1 = Math.random()*TEX_HEIGHT;
    var rr1 = Math.random()*8;
    var rr2 = rr1 + Math.random()*64;
    var rx2 = rx1 + rr2/2 - rr2/2*Math.random();
    var ry2 = ry1 + rr2/2 - rr2/2*Math.random();
    var grd=context.createRadialGradient(rx1,ry1,rr1,rx2,ry2,rr2);
    grd.addColorStop(0,"white");
    grd.addColorStop(1,"black");
    context.fillStyle=grd;
    context.fillRect(0,0,TEX_WIDTH,TEX_HEIGHT);
  }
  for(var j=0; j<10; j++) {
    var randX1 = Math.random()*TEX_WIDTH;
    var randY1 = Math.random()*TEX_HEIGHT;
    var randX2 = Math.random()*TEX_WIDTH;
    var randY2 = Math.random()*TEX_HEIGHT;
    context.beginPath();
    context.moveTo(randX1,randY1);
    context.lineTo(randX2,randY2);
    context.lineJoin = "round";
    context.lineWidth = 3;
    context.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
    context.stroke();
  }
  //
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function scrollTexture() {
  //
  var canvas = document.createElement('canvas');
  canvas.width = TEX_WIDTH;
  canvas.height = TEX_HEIGHT; // CHANGE
  var context = canvas.getContext('2d');
  //
  var tx = bumpTexture;
  context.drawImage(tx.image, 0,0,TEX_WIDTH,TEX_HEIGHT);
  var grabLast = context.getImageData(0,TEX_HEIGHT-1,TEX_WIDTH,1);
  var grabRest = context.getImageData(0,0,TEX_WIDTH,TEX_HEIGHT-1);
  // TO GENERATE 1 TEXTURE WIDE COLOR
  /*
   var gen = grabLast.data;
   var len = gen.length;
   for (var i = 0; i < len; i += 4){
   gen[i] = currentMousePos.x/WIDTH*255;//Math.random()*255;
   gen[i + 1] = currentMousePos.y/HEIGHT*255;
   gen[i + 2] = 0;
   gen[i + 3] = 255;
   }
   */
  // TO DRAW WHERE MOUSE POSITION IS
  //console.log(phoneB);
  var gen = grabLast.data;
  var len = gen.length;
  var yp =  4*Math.round(phoneB/TEX_HEIGHT*TEX_WIDTH); //currentMousePos.y/HEIGHT*TEX_WIDTH
  console.log(yp);
  for (var i = 0; i < len; i += 4){
    gen[i] = 0;
    gen[i + 1] = 153;
    gen[i + 2] = 255;
    gen[i + 3] = 255;
  }
  gen[yp] = 255;
  gen[yp+1] = 255;
  gen[yp+2] = 255;
  gen[yp+3] = 255;
  //
  gen[4+yp] = 255;
  gen[4+yp+1] = 255;
  gen[4+yp+2] = 255;
  gen[4+yp+3] = 255;
  //
  gen[8+yp] = 255;
  gen[8+yp+1] = 255;
  gen[8+yp+2] = 255;
  gen[8+yp+3] = 255;
  //
  context.putImageData(grabLast,0,0);
  context.putImageData(grabRest,0,1);
  //
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

var currentMousePos = new Object();

$(document).mousemove(function(e) {
  currentMousePos.x = e.pageX;
  currentMousePos.y = e.pageY;
});


// @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(/* function */ callback, /* DOMElement */ element){
      window.setTimeout(callback, 1000 / 60);
    };
})();

var $container = $('#container');

// set the scene size
var WIDTH = $container.width(),
  HEIGHT = $container.height();

// set some camera attributes
var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('#container');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
  ASPECT,
  NEAR,
  FAR  );
var scene = new THREE.Scene();

// the camera starts at 0,0,0 so pull it back
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

// ambient lighting
var ambientLight = new THREE.AmbientLight(0x000044);
camera.add(ambientLight);

// create a point light
var pointLight = new THREE.PointLight( 0xFFFFFF );

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 100;

// add to the scene
camera.add(pointLight);

// and the camera
scene.add(camera);

// texture the sphere
var bumpTexture = createRandomTexture();//THREE.ImageUtils.loadTexture("img/map3.png");
bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping;

var counter = 20.0;


var uniforms = {
  bumpTexture: { type: 't', value: bumpTexture },
  bumpScale: { type: 'f', value: counter }
};


var shaderMaterial = new THREE.ShaderMaterial({
  uniforms:     	uniforms,
  vertexShader:   $('#vertexshader').text(),
  fragmentShader: $('#fragmentshader').text()
});



// create the sphere's material
var sphereMaterial = new THREE.MeshLambertMaterial(
  {
    //color: 0xFF0066,
    map: bumpTexture
  });

// set up the sphere vars
var radius = 80, segments = 128, rings = 128;

// create a new mesh with sphere geometry -
// we will cover the sphereMaterial next!
var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(radius, segments, rings),
  shaderMaterial);



// add the sphere to the scene
scene.add(sphere);

//sphere.rotation.x = 90.0*Math.PI/180;
//sphere.rotation.z = 90.0*Math.PI/180; // COMMENT THIS OUT FOR PSYCHEDELIC EFFECTS!!!

var frame = 0; // keep track of frames

var plane = new THREE.Mesh(new THREE.PlaneGeometry(256,256), sphereMaterial);
scene.add(plane);


function update() {
  //
  if(frame % 20 == 0) {
    //bumpTexture = addGradTexture();
    //uniforms.bumpTexture.value = bumpTexture;
    //sphereMaterial.map = bumpTexture;
  }

  //uniforms.bumpScale.value = 20.0 * Math.sin(counter);
  //
  //counter += 0.05;
  //
  frame += 1;
  //
  bumpTexture = scrollTexture();
  uniforms.bumpTexture.value = bumpTexture;
  sphereMaterial.map = bumpTexture;
  //
  /*
   sphere.rotation.x += 0.01;
   sphere.rotation.y += 0.01;
   sphere.rotation.z += 0.01;
   */
  //
  renderer.render(scene, camera);
  //
  requestAnimFrame(update);
}

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight, true);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

$window.resize(onResize);

requestAnimFrame(update);