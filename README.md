# particlelogo

# What it is
Some code for taking a .png, re-drawing it as particles using HTML5 Canvas rectangles, and using some basic trigonometry to make it a 'wavy' animation.

# How it works
We have two Canvas elements. One houses the original picture, which you will want to be low opacity and the same color as the background (since it technically gets rendered). The second houses the particle re-draw which we'll animate. 

We draw that picture into the first canvas element, and then we use our 2D canvas rendering context to pull the image data from the first canvas element. We loop through all of the image data, and add a particle to draw for a specific set of x/y coordinates based on whether or not we have a pixel in that spot that deviates from the background color of the page. 

You can change the size of the particles and the spacing of the particles, as well as the color, in the particleAttributes object. 

# Demo
You can see a demo of the timed animation with the included .png here:

https://brads.tech/logodemo/

And of the interactive version here: 

https://brads.tech/interactivelogodemo/
