class CropCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.images = [];
    this.crop = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.renderLoop();
  }
  
  loadImages(images) {
    this.images = images;
  }
  
  canvasBackground() {
    // fill background
    this.ctx.fillStyle = "#202020";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // create diagonal lines
    const width = 10 / 2; // width of the lines
    const step = 10 + width; // distance between lines
    this.ctx.strokeStyle = "#282828";
    this.ctx.lineWidth = width;
    this.ctx.lineCap = "round";
    const drawWidth = this.canvas.width + this.canvas.height + width; // draw width
    let x = -width + (Date.now() / 100 % step);
    while (x < drawWidth) {
      this.ctx.beginPath();
      this.ctx.moveTo(x + width, -width);
      this.ctx.lineTo(-width, x + width);
      this.ctx.stroke();
      
      x += step;
    }
  }
  
  renderLoop() {
    script: {
      this.canvasBackground();
      if (this.images.length === 0) {
        // render text "input images"
        const text = "Input Images";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = `${this.canvas.width / 10}px "Open Sans"`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
        break script;
      }
    }
    window.requestAnimationFrame(this.renderLoop.bind(this));
  }
}

export {
  CropCanvas
};