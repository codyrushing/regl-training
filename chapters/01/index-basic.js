import regl from 'regl';
const canvas = regl({
  profile: true
});

const drawTriangle = canvas({
  frag: `
  precision mediump float;
  uniform vec4 color;
  void main() {
    gl_FragColor = color;
  }`,

  vert: `
  attribute vec2 position;
  uniform float pointWidth;
  void main() {
    gl_PointSize = pointWidth;
    gl_Position = vec4(position, 0, 1);
  }`,

  attributes: {
    position: function(context, props){
      return [
        [Math.cos(context.tick/100) * 0.8, 0],
        [Math.sin(context.tick/100) * 0.8, 0.8],
        [Math.sin(context.tick/100) * 0.8, -0.8]
      ];
    }
  },

  uniforms: {
    color: function(context, props){
      return props.color;
    },
    pointWidth: function(context, props){
      return props.pointWidth;
    }
  },

  count: 3,

  primitive: 'points'
})

canvas.frame(
  function(context) {
    drawTriangle({
      color: [0.208, 0.304, 1.000, 1.000],
      pointWidth: 100.0
    })
  }
)
