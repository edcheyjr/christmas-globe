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
