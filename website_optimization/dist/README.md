## Website Performance Optimization portfolio project

## Changes Made:
* Compressed pizzeria.jpg and profilepic.jpg and resized pizzeria.jpg
magick convert profilepic.jpg -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace sRGB profilepic_converted.jpg	
magick convert pizzeria.jpg -sampling-factor 4:2:0 -strip -quality 30 -interlace JPEG -colorspace sRGB pizzeria_converted.jpg

* Ran local server: python -m http.server 8080
* Ran ngrok: ngrok http 8080
* Made js async
* Made css media="print"
* Made font load async in index.html
* Changed main.js to resize pizzas
* Changed main.js to move scroll out of loop
* Changed main.js to move select out of loop
* Removed unused/unnecessary css and made css internal to index.html

