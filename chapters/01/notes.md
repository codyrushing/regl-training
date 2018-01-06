[http://vallandingham.me/regl_intro.html](http://vallandingham.me/regl_intro.html)

* Shaders
  * Vertex shaders determine the position of all of the points that are being rendered
  * Fragment shaders determine the color of each pixel being rendered
  * It looks like the point of these shaders is to set the gl_Position and gl_FragColor which I guess are some sort of webGL globals

* Regl allows you to pass data into the shaders:
  * __`uniforms`__ - these are values that are accessible by both shaders. They should be constant during each frame being rendered.
  * __`attributes`__ - these are arrays of values that are passed to the vertex shader, one for each point that it renders.
  * __`varyings`__ - values that the vertex shader can pass to the fragment shader.

* These values can be dynamically set via functions.  Those functions receive a couple of arguments:
  * __`context`__ - a sort of global context, like React's `context`.  It has some important rendering context variables like `tick` (# of frames?) and `time`.
  * __`props`__ - user-defined vars that are passed into the regl draw command

`frame()` - runs the animation on `requestAnimationFrame` - basically a shortcut for running a continuous animation.

### Questions?
How to do the positioning calculations inside the shader instead of the JS wrapper code?  It would seem to require that it keep the previous values in memory somehow.
