class CropCanvas {
  constructor(cropArea, canvas) {
    this.cropArea = cropArea;
    
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.cropArea.appendChild(this.canvas);
    
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
  
  renderImage() {
    const image = this.images[0]; // for now, just render the first image
    
    const resizeFactor = Math.min(
      this.canvas.width / image.width,
      this.canvas.height / image.height
    );
    
    const width = image.width * resizeFactor;
    const height = image.height * resizeFactor;
    
    // render image
    this.ctx.drawImage(image, 0, 0, image.width, image.height, 
      (this.canvas.width - width) / 2,
      (this.canvas.height - height) / 2,
      width, height
    );
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
      this.renderImage();
    }
    window.requestAnimationFrame(this.renderLoop.bind(this));
  }
}

export {
  CropCanvas
};