import regl from 'regl';
// glsl has to be imported this way for some reason
const glsl = require('glslify');

const canvas = regl({
  profile: true
});

const POINT_SIZE_MIN = 5,
      POINT_SIZE_MAX = 30,
      MAX_VELOCITY = 35,
      POINTS_COUNT = 400;

var points = [];

// main draw command
const drawPoints = canvas({
  frag: glsl.file('./fragment.glsl'),
  vert: glsl.file('./vertex.glsl'),
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
    // shortcut for (context, props) => props.color
    color: canvas.prop('color'),
    canvasWidth: canvas.context('drawingBufferWidth'),
    canvasHeight: canvas.context('drawingBufferHeight')
  },
  count: function(context, props){
    return props.points.length;
  },
  // tell webGL which primitive type to use
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
    // create points if the do not exist yet
    if(!points.length){
      points = [];
      for(var i=0; i<POINTS_COUNT; i++){
        points.push({
          x: Math.round(-Math.random() * context.drawingBufferWidth),
          y: Math.round(Math.random() * context.drawingBufferHeight),
          size: 1 + Math.random() * (POINT_SIZE_MAX - 1),
          velocity: 1 + Math.random() * (MAX_VELOCITY - 1)
        });
      }
    }
    updatePoints(points, context.drawingBufferWidth);
    drawPoints({
      color: [
        // let the amount of red oscillate over time
        Math.sin(context.tick / 1000),
        0.304,
        1.000,
        1.000
      ],
      points: points
    });
  }
);
