
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const blockSize = 8;
  const cols = Math.floor(canvas.width / blockSize);
  const rows = Math.floor(canvas.height / blockSize);

  const flowerShape = [
    [0,0,1,1,1,0,0],
    [0,1,2,2,2,1,0],
    [1,2,2,3,2,2,1],
    [1,2,3,3,3,2,1],
    [1,2,2,3,2,2,1],
    [0,1,2,2,2,1,0],
    [0,0,1,1,1,0,0],
  ];

  class Flower {
    constructor() {
      this.x = Math.floor(Math.random() * (cols - 7));
      this.y = -7;
      this.speed = 0.2 + Math.random() * 0.1;
    }

    update() {
      this.y += this.speed;
      if (this.y > rows) {
        this.y = -7;
        this.x = Math.floor(Math.random() * (cols - 7));
      }
    }

    draw() {
      for (let fy = 0; fy < flowerShape.length; fy++) {
        for (let fx = 0; fx < flowerShape[fy].length; fx++) {
          const px = this.x + fx;
          const py = Math.floor(this.y + fy);
          const val = flowerShape[fy][fx];
          if (val && px >= 0 && px < cols && py >= 0 && py < rows) {
            if (val === 1) ctx.fillStyle = 'pink';
            else if (val === 2) ctx.fillStyle = 'deeppink';
            else if (val === 3) ctx.fillStyle = 'gold';

            ctx.fillRect(px * blockSize, py * blockSize, blockSize - 1, blockSize - 1);
          }
        }
      }
    }
  }

  const flowers = Array.from({ length: 20 }, () => new Flower());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flowers.forEach(flower => {
      flower.update();
      flower.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
