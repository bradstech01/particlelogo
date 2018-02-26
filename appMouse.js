$(document).ready(function(){

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

  let mouse = {
      radius: Math.pow(100, 2),
      x: 0,
      y: 0
  };

  let particleArray = [];
  let particleAttributes = {
      friction: 0.95,
      ease: 0.2,
      spacing: 3,
      size: 2,
      color: "#ffffff"
  };

  function Particle(x, y) {
      this.x = this.startingX = x;
      this.y = this.startingY = y;
      this.rx = 0;
      this.ry = 0;
      this.vx = 0;
      this.vy = 0;
      this.force = 0;
      this.angle = 0;
      this.distance = 0;
  }

  Particle.prototype.update = function() {
      this.rx = mouse.x - this.x;
      this.ry = mouse.y - this.y;
      this.distance = this.rx * this.rx + this.ry * this.ry;
      this.force = -mouse.radius / this.distance;
      if(this.distance < mouse.radius) {
           this.angle = Math.atan2(this.ry, this.rx);
           this.vx += this.force * Math.cos(this.angle);
           this.vy += this.force * Math.sin(this.angle);
      }
      this.x += (this.vx *= particleAttributes.friction) + (this.startingX - this.x) * particleAttributes.ease;
      this.y += (this.vy *= particleAttributes.friction) + (this.startingY - this.y) * particleAttributes.ease;
  };

  function init() {
      contextReference.drawImage(image,logoLocation.x, logoLocation.y);
      let pixels = contextReference.getImageData(0, 0, width, height).data;
      let index;
      for(let y = 0; y < height; y += particleAttributes.spacing) {
          for(let x = 0; x < width; x += particleAttributes.spacing) {
              index = (y * width + x) * 4;

              if(pixels[++index] > 0) {
                  particleArray.push(new Particle(x, y));
              }
          }
      }
  }

  function update() {
       for(let i = 0; i < particleArray.length; i++) {
           let p = particleArray[i];
           p.update();
       }
  }

  function render() {
       contextInteractive.clearRect(0, 0, width, height);
       for(let i = 0; i < particleArray.length; i++) {
           let p = particleArray[i];
           contextInteractive.fillStyle = particleAttributes.color;
           contextInteractive.fillRect(p.x, p.y, particleAttributes.size, particleAttributes.size);
       }
  }

  function animate() {
      update();
      render();
      requestAnimationFrame(animate);
  }

image.onload = function(){
  init();

  animate();
};

  document.body.addEventListener("mousemove", function(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
  });

  document.body.addEventListener("touchstart", function(event) {
      mouse.x = event.changedTouches[0].clientX;
      mouse.y = event.changedTouches[0].clientY;
  }, false);

  document.body.addEventListener("touchmove", function(event) {
      event.preventDefault();
      mouse.x = event.targetTouches[0].clientX;
      mouse.y = event.targetTouches[0].clientY;
  }, false);

  document.body.addEventListener("touchend", function(event) {
      event.preventDefault();
      mouse.x = 0;
      mouse.y = 0;
  }, false);
});
