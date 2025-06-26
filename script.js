import {
  stitchImages,
} from "./stitcher.js";

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

function main() {
  const imageInput = document.getElementById("imageInput");
  const stitchButton = document.getElementById("stitchButton");
  const outputContainer = document.getElementById("outputContainer");
  
  stitchButton.addEventListener("click", async () => {
    const fileList = imageInput.files;
    
    if (fileList.length === 0) {
      alert("Please upload at least one image.");
      return;
    }
    
    const images = await getImageArray(fileList);
    const stitched = await stitchImages(images);
    
    // clear previous output
    while (outputContainer.firstChild) {
      outputContainer.removeChild(outputContainer.firstChild);
    }
    
    outputContainer.appendChild(stitched);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}