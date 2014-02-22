/**
 * @class {FBOUtilities}
 * @param {THREE.WebGLRenderer} renderer
 * @constructor
 */
var FBOUtilities = function (renderer) {
  if(!renderer.context.getExtension("OES_texture_float")) {
    throw("Requires OES_texture_float extension");
  }
  if(renderer.context.getParameter(renderer.context.MAX_VERTEX_TEXTURE_IMAGE_UNITS) == 0) {
    throw("No support for vertex shader textures!");
  }

  this.renderer = renderer;

  this.scene = new THREE.Scene();

  this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  this.material = new THREE.ShaderMaterial({
    uniforms: {
      tDataTexture: {
        type: 't',
        value: null
      }
    },
    vertexShader:[

      "varying vec2 vUv;",

      "void main() {",

      "vUv = vec2(uv.s, uv.t);",
      "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",

      "}"

    ].join("\n"),

    fragmentShader:[

      "uniform sampler2D tDataTexture;",

      "varying vec2 vUv;",

      "void main() {",

      "gl_FragColor = texture2D(tDataTexture, vUv);",

      "}"

    ].join("\n"),

    depthTest: false,
    depthWrite: false
  });

  this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), null);
  this.quad.material = this.material;

  this.scene.add(this.camera);
  this.scene.add(this.quad);
}

/**
 * @param {number} width
 * @param {number=} height
 * @param {number=} format
 * @returns {THREE.WebGLRenderTarget}
 */
FBOUtilities.prototype.getFloatingPointFBO = function (width, height, format) {
  var FBO;

  height = typeof height != 'undefined' ? height : width;
  format = typeof format != 'undefined' ? format : THREE.RGBFormat;

  FBO = new THREE.WebGLRenderTarget(width, height, {
    wrapS:THREE.ClampToEdgeWrapping,
    wrapT:THREE.ClampToEdgeWrapping,
    minFilter:THREE.NearestFilter,
    magFilter:THREE.NearestFilter,
    format: format,
    type:THREE.FloatType,
    stencilBuffer: false,
    depthBuffer: false
  });

  FBO.generateMipmaps = false;

  return FBO;
};

/**
 * @param {Array.<number>|Float32Array} data
 * @param {number} width
 * @param {number=} height
 * @param {number=} format
 * @returns {THREE.DataTexture}
 */
FBOUtilities.prototype.generateFloatingPointTexture = function (data, width, height, format) {
  var texture;

  data = data instanceof Float32Array ? data : new Float32Array(data);
  height = typeof height != 'undefined' ? height : width;
  format = typeof format != 'undefined' ? format : THREE.RGBFormat;

  texture = new THREE.DataTexture(data, width, height, format, THREE.FloatType, null, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, THREE.NearestFilter, THREE.NearestFilter, 0);
  texture.needsUpdate = true;

  return texture;
};

/**
 * @param {Array.<number>|Float32Array} data
 * @param {number} width
 * @param {number=} height
 * @param {number=} format
 * @returns {THREE.WebGLRenderTarget}
 */
FBOUtilities.prototype.generateFloatingPointFBO = function (data, width, height, format) {
  var texture = this.generateFloatingPointTexture(data, width, height, format);
  var FBO = this.getFloatingPointFBO(width, height, format);

  this.renderDataTextureToFBO(FBO, texture);

  return FBO;
};

/**
 * @param {THREE.WebGLRenderTarget} FBO
 * @param {Array.<number>|Float32Array} data
 * @param {number} width
 * @param {number=} height
 * @param {number=} format
 */
FBOUtilities.prototype.renderDataToFBO = function (FBO, data, width, height, format) {
  var texture = this.generateFloatingPointTexture(data, width, height, format);
  this.renderDataTextureToFBO(FBO, texture);
};

/**
 * @param {THREE.WebGLRenderTarget} FBO
 * @param {THREE.DataTexture} texture
 */
FBOUtilities.prototype.renderDataTextureToFBO = function (FBO, texture) {
  this.quad.material = this.material;
  this.quad.material.uniforms.tDataTexture.value = texture;
  this.renderer.render(this.scene, this.camera, FBO, false);
};

/**
 * @param {THREE.WebGLRenderTarget} FBO
 * @param {THREE.ShaderMaterial} material
 */
FBOUtilities.prototype.renderShaderToFBO = function (FBO, material) {
  this.quad.material = material;
  this.renderer.render(this.scene, this.camera, FBO, false);
};

/**
 * @param {THREE.DataTexture} texture
 */
FBOUtilities.prototype.renderDataTextureToScreen = function (texture) {
  this.quad.material = this.material;
  this.quad.material.uniforms.tDataTexture.value = texture;
  this.renderer.render(this.scene, this.camera, null, false);
};