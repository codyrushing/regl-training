import regl from 'regl';
const canvas = regl();

const drawTriangle = canvas({
  frag: `
  precision mediump float;
  uniform vec4 color;
  void main() {
    gl_FragColor = color;
  }`,

  vert: `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0, 1);
  }`,

  attributes: {
    position: function(context, props){
      return [
        [-Math.cos(context.tick/100), 0],
        [Math.sin(context.tick/100), 1],
        [Math.sin(context.tick/100), -1]
      ];
    }
  },

  uniforms: {
    color: [1, 0, 0, 1]
  },

  count: 3
})

canvas.frame(
  function(context) {
    drawTriangle()
  }
)
