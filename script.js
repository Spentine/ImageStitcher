import {
  stitchImages,
} from "./stitcher.js";
import {
  CropCanvas,
} from "./crop.js";

/**
 * convert a fileList into an array of image objects
 */
async function getImageArray(fileList) {
  const imageArray = [];
  for (const file of fileList) {
    if (file.type.startsWith("image/")) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      await image.decode(); // ensure the image is loaded
      imageArray.push(image);
    }
  }
  return imageArray;
}

class ImageStitcherUI {
  constructor() {
    this.imageInput = document.getElementById("imageInput");
    this.step1Button = document.getElementById("step1Button");
    this.outputContainer = document.getElementById("outputContainer");
    this.cropCanvas = document.getElementById("cropCanvas");
    
    this.cc = new CropCanvas(this.cropCanvas);
    
    this.addInteractivity();
  }
  
  addInteractivity() {
    this.step1Button.addEventListener("click", this.step1.bind(this));
  }
  
  async step1() {
    const images = this.imageInput.files;
    
    // check images length
    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }
    
    // convert fileList to array of images
    const imageArray = await getImageArray(images);
    
    // crop canvas
    this.cc.loadImages(imageArray);
  }
}

function main() {
  const ui = new ImageStitcherUI();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}