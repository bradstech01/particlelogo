$(document).ready(function() {
  let image = document.getElementById('img');

  let canvasInteractive = document.getElementById('canvas-interactive');
  let canvasReference = document.getElementById('canvas-reference');
  let contextInteractive = document.getElementById('canvas-interactive').getContext('2d');
  let contextReference = document.getElementById('canvas-reference').getContext('2d');

  let width = canvasInteractive.width = canvasReference.width = window.innerWidth;
  let height = canvasInteractive.height = canvasReference.height = window.innerHeight;

  let logoDimensions = {
    x: 768,
    y: 768
  };

  let center = {
    x: width / 2,
    y: height / 2
  };

  let logoLocation = {
    x: center.x - logoDimensions.x / 2,
    y: center.y - logoDimensions.y / 2
  };

  let particleArray = [];
  let particleAttributes = {
    friction: 0.95,
    ease: 0.1,
    spacing: 4,
    size: 2,
    color: "#ffffff"
  };

  function Particle(x, y) {
    this.x = this.startingX = x;
    this.y = this.startingY = y;
    this.vy = 3 * Math.sin((Date.now() / 50 - this.startingX) / 5)
  }

  Particle.prototype.update = function() {
    this.y = this.startingY + 3 * Math.sin((Date.now() / 50 - this.startingX) / 5);
  };

  function init() {
    contextReference.drawImage(image, logoLocation.x, logoLocation.y);
    let pixels = contextReference.getImageData(0, 0, width, height).data;
    let index;
    for (let y = 0; y < height; y += particleAttributes.spacing) {
      for (let x = 0; x < width; x += particleAttributes.spacing) {
        index = (y * width + x) * 4;
        if (pixels[++index] > 0) {
          particleArray.push(new Particle(x, y));
        }
      }
    }
  };

  function update() {
    for (let i = 0; i < particleArray.length; i++) {
      let p = particleArray[i];
      p.update();
    }
  };

  function render() {
    contextInteractive.clearRect(0, 0, width, height);
    for (let i = 0; i < particleArray.length; i++) {
      let p = particleArray[i];
      contextInteractive.fillStyle = particleAttributes.color;
      contextInteractive.fillRect(p.x, p.y, particleAttributes.size, particleAttributes.size);
    }
  };

  function animate() {
    update();
    render();
    requestAnimationFrame(animate);
  }

  image.onload = function() {
    init();
    animate();
  };
});
