var $o = $('#orientation');
$alpha = $o.find('.alpha');
$beta = $o.find('.beta');
$gamma = $o.find('.gamma');

var socket = io.connect('http://' + config.server + ':' + config.port);
socket.on('orientation', function (data) {
  //console.log(data);
  //
  $alpha.text(data.alpha);
  $beta.text(data.beta);
  $gamma.text(data.gamma);
  //
  sphere.rotation.y = Math.round(data.alpha) * Math.PI / 180;
  sphere.rotation.x = Math.round(data.beta)  * Math.PI / 180;
  sphere.rotation.z = Math.round(-data.gamma) * Math.PI / 180;

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
var texture = THREE.ImageUtils.loadTexture("img/map1.png");

// create the sphere's material
var sphereMaterial = new THREE.MeshLambertMaterial(
  {
    color: 0xFF0066,
    map: texture
  });

// set up the sphere vars
var radius = 50, segments = 64, rings = 64;

// create a new mesh with sphere geometry -
// we will cover the sphereMaterial next!
var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(radius, segments, rings),
  sphereMaterial);

// add the sphere to the scene
scene.add(sphere);

function update() {
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
//
requestAnimFrame(update);