# Image Stitcher Planning

This image stitcher should primarily be used to stitch chat messages. I'm not quite sure what other use it may have, but it should completely excel with chats. It should be compatible with both PC and mobile, along with providing quality-of-life features (this is a quality-of-life project after all).

## UI

The UI should be quite simplistic in terms of content. It should be in a vertical format, probably taking up about 600 to 800 pixels of horizontal space. It should make file uploading as easy as possible (including pasting, dragging, and plain uploading). It should automatically figure out the order of the images.

### Additional Things

Ok, so turns out I really just to just work on the core functionality. I'll lean more into the UI part and have the user do some stuff while my program will handle the bulk of the effort. Alright, so the first thing I'll do is to create a UI that will allow the user to bulk rescale the images to remove anything that may interfere.

There will be an option to either have it only check for vertical adjustments.

## Algorithm

First, discard anything that may make it difficult to analyze. For example, headers or footers may obscure the image. To do this, use a difference mapping between all of the images. If some parts are pretty much exactly the same, discard them.

To check whether two images line up, perform a convolution on the images to see where they line up the most. Then, perform another convolution to only retrieve answers where it's only a single point that contains the answer.