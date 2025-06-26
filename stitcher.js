/**
 * convert Image object into ImageData
 * @param {Image} image - the image to convert
 * @returns {ImageData} - the ImageData object representing the image
 */
function imageToImageData(image) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  return ctx.getImageData(0, 0, image.width, image.height);
}

/**
 * convert an array of Image objects into an array of ImageData objects
 * @param {Image[]} images - the array of images to convert
 * @returns {ImageData[]} - the array of ImageData objects representing the images
 */
async function imagesToImageDataArray(images) {
  const imageDataArray = [];
  for (const image of images) {
    const imageData = imageToImageData(image);
    imageDataArray.push(imageData);
  }
  return imageDataArray;
}

/**
 * l1 dist of two ImageData objects offsetted by a given offset
 * @param {ImageData} imageData1 - the first ImageData object
 * @param {ImageData} imageData2 - the second ImageData object
 * @param {number} offsetX - the x offset of the second image
 * @param {number} offsetY - the y offset of the second image
 * @returns {number} - the l1 distance between the two ImageData objects
 */
function l1Dist(imageData1, imageData2, offsetX, offsetY) {
  if (
    offsetX <= -imageData2.width || // left
    offsetY <= -imageData2.height || // above
    offsetX >= imageData1.width || // right
    offsetY >= imageData1.height // below
  ) {
    return Infinity; // no overlap
  }
  
  // calculate the overlapping area
  const minX = Math.max(0, offsetX);
  const minY = Math.max(0, offsetY);
  const maxX = Math.min(imageData1.width, offsetX + imageData2.width);
  const maxY = Math.min(imageData1.height, offsetY + imageData2.height);
  // calculate the width and height of the overlapping area
  const oWidth = maxX - minX; // operation width
  const oHeight = maxY - minY; // operation height
  // calculate the offsets in the data array
  const startOffset1 = (minY * imageData1.width + minX) * 4; // offset in the first image
  const startOffset2 = ((minY - offsetY) * imageData2.width + (minX - offsetX)) * 4; // offset in the second image
  // calculate the increment value to go down
  const increment1 = (imageData1.width - oWidth) * 4
  const increment2 = (imageData2.width - oWidth) * 4;
  
  let dist = 0;
  let c1 = startOffset1; // current 1
  let c2 = startOffset2; // current 2
  for (let y = 0; y < oHeight; y++) {
    for (let x = 0; x < oWidth; x++) {
      // calculate the l1 distance for each pixel
      const r1 = imageData1.data[c1];
      const g1 = imageData1.data[c1 + 1];
      const b1 = imageData1.data[c1 + 2];
      const a1 = imageData1.data[c1 + 3];
      
      const r2 = imageData2.data[c2];
      const g2 = imageData2.data[c2 + 1];
      const b2 = imageData2.data[c2 + 2];
      const a2 = imageData2.data[c2 + 3];
      
      dist += (
        Math.abs(r1 - r2) +
        Math.abs(g1 - g2) +
        Math.abs(b1 - b2) +
        Math.abs(a1 - a2)
      );
      
      c1 += 4; // move to the next pixel in the first image
      c2 += 4; // move to the next pixel in the second image
    }
    c1 += increment1; // move down in the first image
    c2 += increment2; // move down in the second image
  }
}

/**
 * stitch an array of images together
 * @param {Image[]} images - the array of images to stitch
 * @returns {Promise<Image>} - a promise that resolves to the stitched Image
 */
async function stitchImages(images) {
  const imageDataArray = await imagesToImageDataArray(images);
  
  if (imageDataArray.length === 0) {
    throw new Error("No images to stitch");
  }
  
  
}

export {
  stitchImages,
};