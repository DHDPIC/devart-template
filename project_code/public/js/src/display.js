var Display = function () {

  this.$container = $('#container');
  this.$o = $('#orientation');
  this.$alpha = this.$o.find('.alpha');
  this.$beta = this.$o.find('.beta');
  this.$gamma = this.$o.find('.gamma');

  this.renderer = null;
  this.camera = null;
  this.scene = null;
  this.ambientLight = null;
  this.pointLight = null;

  this.phoneA = 0;
  this.phoneB = 0;
  this.phoneG = 0;

  this.frame = 0;
  this.counter = 20.0;

  this.texWidth = 64;
  this.texHeight = 64;
  this.viewAngle = 45;
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.aspect = this.width / this.height;
  this.near = 0.1;
  this.far = 10000;

  this.currentMousePosition = {
    x:0,
    y:0
  };

  this.socket = null;

  this.setupListeners();
  this.setupScene();
  this.initializeSocket();
  this.update();
}

Display.prototype.setupListeners = function () {
  $(document).on('mousemove', this.onMouseMove.bind(this));
  $(window).on('resize', this.onResize.bind(this));
}

Display.prototype.setupScene = function () {
  this.renderer = new THREE.WebGLRenderer();
  this.camera = new THREE.PerspectiveCamera(this.viewAngle, this.aspect, this.near, this.far);
  this.scene = new THREE.Scene();

  this.camera.position.z = 300;

  this.renderer.setSize(this.width, this.height);
  this.$container.append(this.renderer.domElement);

  this.ambientLight = new THREE.AmbientLight(0x000044);
  this.camera.add(this.ambientLight);

  this.pointLight = new THREE.PointLight( 0xFFFFFF );
  this.pointLight.position.x = 10;
  this.pointLight.position.y = 50;
  this.pointLight.position.z = 100;
  this.camera.add(this.pointLight);

  this.scene.add(this.camera);

  // texture the sphere
  this.bumpTexture = this.createRandomTexture();//THREE.ImageUtils.loadTexture("img/map3.png");
  this.bumpTexture.wrapS = this.bumpTexture.wrapT = THREE.RepeatWrapping;

  this.sphereMaterial = new THREE.MeshLambertMaterial({
    //color: 0xFF0066,
    map: this.bumpTexture
  });

  this.uniforms = {
    bumpTexture: { type: 't', value: this.bumpTexture },
    bumpScale: { type: 'f', value: this.counter }
  };

  this.shaderMaterial = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: $('#vertexshader').text(),
    fragmentShader: $('#fragmentshader').text()
  });

  var radius = 80, segments = 128, rings = 128;
  var geometry = new THREE.SphereGeometry(radius, segments, rings);

  this.sphere = new THREE.Mesh(geometry, this.shaderMaterial);
  this.scene.add(this.sphere);

  //this.sphere.rotation.x = 90.0*Math.PI/180;
  //this.sphere.rotation.z = 90.0*Math.PI/180; // COMMENT THIS OUT FOR PSYCHEDELIC EFFECTS!!!

  var plane = new THREE.Mesh(new THREE.PlaneGeometry(256,256), this.sphereMaterial);
  this.scene.add(plane);
}

Display.prototype.initializeSocket = function () {
  this.socket = io.connect('http://' + config.server + ':' + config.port);
  this.socket.on('orientation', this.onSocketOrientation.bind(this));
}

Display.prototype.onSocketOrientation = function (data) {
  this.$alpha.text(data.alpha);
  this.$beta.text(data.beta);
  this.$gamma.text(data.gamma);

  this.phoneA = data.alpha / 360 * 255;
  this.phoneB = data.beta / 360 * 255;
  this.phoneG = data.gamma / 360 * 255;
}

Display.prototype.onMouseMove = function (e) {
  this.currentMousePosition.x = e.pageX;
  this.currentMousePosition.y = e.pageY;
}

Display.prototype.onResize = function (e) {
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.aspect = this.width / this.height;
  
  this.renderer.setSize(this.width, this.height, true);
  this.camera.aspect = this.aspect;
  this.camera.updateProjectionMatrix();
}

Display.prototype.update = function () {
  //
  if(this.frame % 20 == 0) {
    //this.bumpTexture = addGradTexture();
    //this.uniforms.bumpTexture.value = this.bumpTexture;
    //this.sphereMaterial.map = this.bumpTexture;
  }

  //this.uniforms.bumpScale.value = 20.0 * Math.sin(this.counter);
  //
  //this.counter += 0.05;
  //
  ++this.frame;
  //
  this.bumpTexture = this.scrollTexture();
  this.uniforms.bumpTexture.value = this.bumpTexture;
  this.sphereMaterial.map = this.bumpTexture;
  //
  /*
   this.sphere.rotation.x += 0.01;
   this.sphere.rotation.y += 0.01;
   this.sphere.rotation.z += 0.01;
   */
  //
  this.renderer.render(this.scene, this.camera);

  requestAnimationFrame(this.update.bind(this));
}

Display.prototype.createTexture = function () {

  // create Canvas
  var canvas = document.createElement('canvas');
  canvas.width = this.texWidth;
  canvas.height = this.texHeight; // CHANGE
  var context = canvas.getContext('2d')
  for(var i=0; i<3; i++) {
    // line
    var randX1 = Math.random()*this.texWidth;
    var randY1 = Math.random()*this.texHeight;
    var randX2 = Math.random()*this.texWidth;
    var randY2 = Math.random()*this.texHeight;
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

Display.prototype.addToTexture = function () {

  // create Canvas
  var canvas = document.createElement('canvas');
  canvas.width = this.texWidth;
  canvas.height = this.texHeight; // CHANGE
  var context = canvas.getContext('2d')

  //
  var tx = bumpTexture;
  context.drawImage(tx.image, 0,0,this.texWidth,this.texHeight);
  //

  for(var i=0; i<1; i++) {
    // line
    var randX1 = Math.random()*this.texWidth;
    var randY1 = Math.random()*this.texHeight;
    var randX2 = Math.random()*this.texWidth;
    var randY2 = Math.random()*this.texHeight;
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

Display.prototype.createGradTexture = function () {
  //
  console.log("grad tex");
  //
  var canvas = document.createElement('canvas');
  canvas.width = this.texWidth;
  canvas.height = this.texHeight; // CHANGE
  var context = canvas.getContext('2d');
  //
  context.globalCompositeOperation = 'screen';
  //
  for(var i=0; i<1; i++) {
    var rx1 = Math.random()*this.texWidth;
    var ry1 = Math.random()*this.texHeight;
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
    context.fillRect(0,0,this.texWidth,this.texHeight);
  }

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
}

Display.prototype.addGradTexture = function () {
  //
  var canvas = document.createElement('canvas');
  canvas.width = this.texWidth;
  canvas.height = this.texHeight; // CHANGE
  var context = canvas.getContext('2d');
  //
  context.globalCompositeOperation = 'screen';

  //
  var tx = bumpTexture;
  context.drawImage(tx.image, 0,0,this.texWidth,this.texHeight);
  //
  for(var i=0; i<1; i++) {
    var rx1 = Math.random()*this.texWidth;
    var ry1 = Math.random()*this.texHeight;
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
    context.fillRect(0,0,this.texWidth,this.texHeight);
  }

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
}

Display.prototype.createRandomTexture = function () {
  //
  var canvas = document.createElement('canvas');
  canvas.width = this.texWidth;
  canvas.height = this.texHeight; // CHANGE
  var context = canvas.getContext('2d');
  //
  context.globalCompositeOperation = 'screen';
  //
  for(var i=0; i<5; i++) {
    var rx1 = Math.random()*this.texWidth;
    var ry1 = Math.random()*this.texHeight;
    var rr1 = Math.random()*8;
    var rr2 = rr1 + Math.random()*64;
    var rx2 = rx1 + rr2/2 - rr2/2*Math.random();
    var ry2 = ry1 + rr2/2 - rr2/2*Math.random();
    var grd=context.createRadialGradient(rx1,ry1,rr1,rx2,ry2,rr2);
    grd.addColorStop(0,"white");
    grd.addColorStop(1,"black");
    context.fillStyle=grd;
    context.fillRect(0,0,this.texWidth,this.texHeight);
  }
  for(var j=0; j<10; j++) {
    var randX1 = Math.random()*this.texWidth;
    var randY1 = Math.random()*this.texHeight;
    var randX2 = Math.random()*this.texWidth;
    var randY2 = Math.random()*this.texHeight;
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

Display.prototype.scrollTexture = function () {
  //
  var canvas = document.createElement('canvas');
  canvas.width = this.texWidth;
  canvas.height = this.texHeight; // CHANGE
  var context = canvas.getContext('2d');
  //
  var tx = this.bumpTexture;
  context.drawImage(tx.image, 0,0,this.texWidth,this.texHeight);
  var grabLast = context.getImageData(0,this.texHeight-1,this.texWidth,1);
  var grabRest = context.getImageData(0,0,this.texWidth,this.texHeight-1);
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
  var yp =  4*Math.round(this.phoneB/this.texHeight*this.texWidth); //currentMousePos.y/HEIGHT*this.texWidth
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

var display = new Display();