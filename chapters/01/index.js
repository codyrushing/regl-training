import regl from 'regl';
const canvas = regl({
  profile: true
});

const POINT_SIZE_MIN = 5,
      MAX_POINT_SIZE = 30,
      MAX_VELOCITY = 35,
      POINTS_COUNT = 400;

var points = [];

const drawPoints = canvas({
  frag: `
  precision mediump float;
  uniform vec4 color;
  void main() {
    gl_FragColor = color;
  }`,

  vert: `
  precision mediump float;
  attribute vec2 position;
  uniform float canvasWidth;
  uniform float canvasHeight;
  attribute float pointSize;
  // convert pixels to normalized device coordinates useing the canvasWidth and canvasHeight
  vec2 normalizeCoordinates(vec2 position){
    return vec2(
      (position[0] - canvasWidth * 0.5) / (canvasWidth * 0.5),
      (position[1] - canvasHeight * 0.5) / (canvasWidth * 0.5)
    );
  }
  void main() {
    gl_PointSize = pointSize;
    gl_Position = vec4(normalizeCoordinates(position), 0, 1);
  }`,

  attributes: {
    position: function(context, props){
      const { points } = props;
      return points.map(p => [p.x, p.y]);
    },
    pointSize: function(context, props){
      const { points } = props;
      return points.map(p => p.size);
    }
  },

  uniforms: {
    color: canvas.prop('color'),
    canvasWidth: canvas.context('drawingBufferWidth'),
    canvasHeight: canvas.context('drawingBufferHeight')
  },
  count: function(context, props){
    return props.points.length;
  },
  primitive: 'points'
});

const updatePoints = function(points, maxWidth){
  points = points.map(
    p => {
      p.x = Math.round(p.x + p.velocity);
      if(p.x >= maxWidth){
        p.x = 0;
      }
      return p;
    }
  );
}

canvas.frame(
  function(context) {
    if(!points.length){
      points = [];
      for(var i=0; i<POINTS_COUNT; i++){
        points.push({
          x: Math.round(-Math.random() * context.drawingBufferWidth),
          y: Math.round(Math.random() * context.drawingBufferHeight),
          size: 1 + Math.random() * (MAX_POINT_SIZE - 1),
          velocity: 1 + Math.random() * (MAX_VELOCITY - 1)
        });
      }
    }
    updatePoints(points, context.drawingBufferWidth);
    drawPoints({
      color: [0.208, 0.304, 1.000, 1.000],
      points: points
    });
  }
);
