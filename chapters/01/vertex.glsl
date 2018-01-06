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
}
