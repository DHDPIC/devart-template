// file for testing texture deformation for improved sphere mapping
// http://www.java-gaming.org/index.php/topic,24315.0
// http://paulbourke.net/geometry/transformationprojection/
// http://www.blitzbasic.com/Community/posts.php?topic=63686
// http://paulbourke.net/texture_colour/tiling/
// https://github.com/mbostock/d3/wiki/Geo-Projections
// http://bl.ocks.org/mbostock/3757119

var $body = $('body');
var canvasInput = document.createElement('canvas');
var canvasOutput = document.createElement('canvas');
var inputContext = canvasInput.getContext('2d');
var outputContext = canvasOutput.getContext('2d');
var inputPixels, outputPixels;
var img = new Image();
var width, height;

img.addEventListener('load', onLoad);
img.src = '/img/test2.png';

function setCanvasDimensions(canvas, width, height) {
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  canvas.width = width;
  canvas.height = height;
}

function onLoad() {
  width = img.width;
  height = img.height;

  setCanvasDimensions(canvasInput, width, height);
  setCanvasDimensions(canvasOutput, width, height);

  inputContext.drawImage(img, 0, 0, width, height);
  inputPixels = inputContext.getImageData(0, 0, width, height);
  outputPixels = outputContext.getImageData(0, 0, width, height);

  doSphereMap();
}

function doSphereMap() {
  var theta, phi, phi2;
  var i, i2, j;
  var inIndex, outIndex;

  for(j=0; j<height; ++j) {
    theta = Math.PI * (j - (height-1) / 2) / (height-1);

    for(i=0; i<width; ++i) {
      phi = (Math.PI * 2) * (i - width / 2) / width;
      phi2 = phi * Math.cos(theta);
      i2 = Math.round(phi2 * width / (Math.PI * 2) + width / 2);

      outIndex = (j * width + i) * 4;

      if(i2 < 0 || i2 > width-1) {
        inIndex = -1;
      }
      else {
        inIndex = (j * width + i2) * 4;
      }

      if(inIndex > -1) {
        outputPixels.data[outIndex] = inputPixels.data[inIndex];
        outputPixels.data[outIndex + 1] = inputPixels.data[inIndex + 1];
        outputPixels.data[outIndex + 2] = inputPixels.data[inIndex + 2];
        outputPixels.data[outIndex + 3] = inputPixels.data[inIndex + 3];
      }
      else {
        outputPixels.data[outIndex] = 255;
        outputPixels.data[outIndex + 1] = 0;
        outputPixels.data[outIndex + 2] = 0;
        outputPixels.data[outIndex + 3] = 255;
      }
    }
  }

  outputContext.putImageData(outputPixels, 0, 0);
  var dataUrl = canvasOutput.toDataURL("image/png");

  $body.append(canvasInput);
  $body.append(canvasOutput);

  var img = new Image();
  img.src = dataUrl;

  $body.append(img);
}