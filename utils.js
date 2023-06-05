/**
 * @description converts the image data array to a 2D matrix
 * @param {ImageData} imageData this is the image data
 * @returns {Array} 2d matrix
 */
function getPixelMatrix(imageData) {
  const mat = new Array(imageData.height)
  for (let i = 0; i < imageData.height; i++) {
    mat[i] = new Array(imageData.width)
  }

  for (let i = 0; i < imageData.data.length; i += 4) {
    const pColor = {
      r: imageData.data[i + 0],
      g: imageData.data[i + 1],
      b: imageData.data[i + 2],
      a: imageData.data[i + 3],
    }
    const pIndex = i / 4
    const x = pIndex % imageData.width
    const y = Math.floor(pIndex / imageData.width)

    //if more info about the pixel might be need
    // pInfo = {
    //   color: pColor,
    //   x_pos: x,
    //   y_pos: y,
    //   pIndex,
    // }
    mat[y][x] = pColor
  }
  return mat
}

/**
 * **polarization function**
 * ---------------------------
 * @description converts cartesian co-ordinates x and y to polar co-ordinates (direction , magnitude)
 * @example const value = toPolar(12,4)
 * const dir = value.dir
 * const mag = value.mag
 *
 * @param {object} cartesianCordinates this a object with x and y co-ordinates
 * @returns {object} polarCordinates of dir and mag
 */
function toPolar({ x, y }) {
  return {
    dir: direction({ x, y }),
    mag: magnitude({ x, y }),
  }
}

/**
 *  ** unpolarization function **
 * ----------------------------------------------------------------------------
 * @description This function converts direction and magnitude as a representation of vector
 * to cartesian co-ordinates x and y.
 * This is the reverse of toPolar
 * for more got to https://en.wikipedia.org/wiki/Polar_coordinate_system
 *
 *
 * @param {object} polarCordinates of dir and mag This is the angle between point (x,y) relative to (0,0)
 * This is the distance between point (x,y) relative to (0,0)
 * @returns {object} cartesian co-ordinate x and y
 */
function toXY({ dir, mag }) {
  return {
    x: Math.cos(dir) * mag,
    y: Math.sin(dir) * mag,
  }
}

/**
 *    Magnitude
 * ---------------
 *   @description used by toPolar function
 *
 * @param {object} cartesianCordinates this are the x and y co-ordinates
 * @returns {number} the distance between point (x,y) and (0,0) orgin
 */
function magnitude({ x, y }) {
  return Math.hypot(x, y)
}
/**
 *    Direction
 * ---------------
 *  @description used by toPolar to convert cartesian co-ordinates to an angle between the points x,y and 0,0
 *
 * @param {object} cartesianCordinates this are the x and y co-ordinates
 * @returns {number} the angle between point (x,y) and (0,0) orgin
 */
function direction({ x, y }) {
  return Math.atan2(y, x)
}

/**
 *  Function of adding two vector points values
 * --------------------------------------------
 * @description does the summation of two vectors
 * @param {{
 * x:number,
 * y:number
 * }} p1 a vector point
 * @param {{x:number, y:number}} p2 a vector point
 * @returns a new vector
 */
function addPoints(p1, p2) {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y,
  }
}
/**
 *  Function of subracting two vector points values
 * --------------------------------------------
 * @description does the subraction of two vectors
 * @param {{
 * x:number,
 * y:number
 * }} p1 a vector point
 * @param {{x:number, y:number}} p2 a vector point
 * @returns a new vector
 */
function subractPoints(p1, p2) {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y,
  }
}
