class Effect {
  constructor(canvas, video) {
    this.canvas = canvas
    this.video = video
    this.ctx = canvas.getContext('2d')

    this.offset = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    }

    // get image data
    // this.mat = getPixelMatrix(imageData)

    // diagonal value
    this.diag = Math.min(canvas.width, canvas.height) / 2

    // rgb(197,204,211) grey
    // rgb(176,67,160) pink
    this.color = {
      r: 176,
      g: 67,
      b: 160,
    }

    this.#animate()
  }
  #animate() {
    const { video, canvas, ctx, offset, color, diag } = this
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newImageData = ctx.createImageData(canvas.width, canvas.height)

    for (let i = 0; i < imageData.data.length; i += 4) {
      const pIndex = i / 4
      const x = (pIndex % canvas.width) - offset.x
      const y = Math.floor(pIndex / canvas.width) - offset.y

      const mag = Math.hypot(x, y)
      const dir = Math.atan2(y, x)
      const newMag = diag * (mag / diag) ** 2
      const newXY = {
        x: Math.round(Math.cos(dir) * newMag + offset.x),
        y: Math.round(Math.sin(dir) * newMag + offset.y),
      }

      const newI = (newXY.y * imageData.width + newXY.x) * 4

      if (newMag < diag && newI < imageData.data.length) {
        // const { r, g, b, a } = mat[newXY.y][newXY.x]

        newImageData.data[i + 0] = Math.floor(
          (imageData.data[newI + 0] + color.r) / 2
        )
        newImageData.data[i + 1] = Math.floor(
          (imageData.data[newI + 1] + color.g) / 2
        )
        newImageData.data[i + 2] = Math.floor(
          (imageData.data[newI + 2] + color.b) / 2
        )
        // newImageData.data[i + 0] = imageData.data[newI + 0]
        newImageData.data[i + 3] = Math.floor(255 * (1 - newMag / diag) ** 2)
      }
    }
    ctx.putImageData(newImageData, 0, 0)
    // console.log('imageData', mat)
    // debugger

    requestAnimationFrame(this.#animate.bind(this))
  }
}
