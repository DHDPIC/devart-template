var $a = $('#acceleration');
var $ag = $('#accelerationGravity');
var $o = $('#orientation');
var $aX, $aY, $aZ;
var $agX, $agY, $agZ;
var $alpha, $beta, $gamma;
var socket = io.connect('http://' + config.server + ':' + config.port);
var alpha = [];
var beta = [];
var gamma = [];
var arrayLength = 20;
var clientId;

socket.on('connected', function (data) {
  clientId = data;
});

$aX = $a.find('.x');
$aY = $a.find('.y');
$aZ = $a.find('.z');

$agX = $ag.find('.x');
$agY = $ag.find('.y');
$agZ = $ag.find('.z');

$alpha = $o.find('.alpha');
$beta = $o.find('.beta');
$gamma = $o.find('.gamma');

window.addEventListener('devicemotion', function (e) {
  var a = e.acceleration;
  var ag = e.accelerationIncludingGravity;

  $aX.text(a.x);
  $aY.text(a.y);
  $aZ.text(a.z);

  $agX.text(ag.x);
  $agY.text(ag.y);
  $agZ.text(ag.z);
});

var isThrottled = false,
  throttleDuration = 1000 / 60; // ms

function throttle(callback) {
  if (isThrottled) { return; }
  isThrottled = true;
  setTimeout(function () { isThrottled = false; }, throttleDuration);

  callback();
}

function getDegrees(list, currentValue) {
  return currentValue;

  if(currentValue < 0) {
    currentValue = currentValue + 360;
  }

  return currentValue;
//  var deg;
//  var lastValue = list.length ? list[list.length-1] : currentValue;
//  var isLastNeg = (lastValue < 0);
//  var isCurrentNeg = (currentValue < 0);
//
//  if(isLastNeg !== isCurrentNeg) {
//    list = [];
//  }
//
//  list.push(currentValue);
//
//  if(list.length > arrayLength) {
//    list.shift();
//  }
//
//  var i = list.length;
//  var sum = 0;
//
//  while(--i > -1) {
//    sum += list[i];
//  }
//
//  deg = sum / list.length;
//
//  if(deg < 0) {
//    deg += 360;
//  }
//
//  return deg;
}

window.addEventListener('deviceorientation', function (e) {
  var alphaDeg;
  var betaDeg;
  var gammaDeg;

  $alpha.text(e.alpha);
  $beta.text(e.beta);
  $gamma.text(e.gamma);

  alphaDeg = getDegrees(alpha, e.alpha);
  betaDeg = getDegrees(beta, e.beta);
  gammaDeg = getDegrees(gamma, e.gamma);

  throttle(function () {
    socket.emit('orientation', {
      alpha: alphaDeg,
      beta: betaDeg,
      gamma: gammaDeg,
      id: clientId
    });
  })
});