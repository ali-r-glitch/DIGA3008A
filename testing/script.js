document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("background");
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const blockSize = 20;
    const cols = Math.floor(canvas.width / blockSize);
    const rows = Math.floor(canvas.height / blockSize);
  
    let hue = 0;
    let grid = [];
    let mode = 1; // Start in Vivid Mode
  
    // Initialize grid
    for (let y = 0; y < rows; y++) {
      grid[y] = [];
      for (let x = 0; x < cols; x++) {
        grid[y][x] = {
          active: false,
          alpha: 0
        };
      }
    }
  
    // Toggle between Vivid and Dimmer modes
    document.getElementById('toggle').addEventListener('click', () => {
      mode = mode === 1 ? 2 : 1;
      document.getElementById('toggle').textContent = mode === 1 ? 'Switch to Dimmer Mode' : 'Switch to Vivid Mode';
    });
  
    // Draw grid for Vivid or Dimmer modes
    function drawGrid() {
      hue += 0.5; // Slower hue shift for Vivid mode
      if (hue > 360) hue = 0;
  
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let block = grid[y][x];
          
          // Vivid Mode: More vibrant colors and quicker fades
          if (mode === 1) {
            if (block.alpha > 0) {
              block.alpha -= 0.01; // faster fade out in Vivid mode
            }
          }
  
          // Dimmer Mode: Softer colors and slower fades
          if (mode === 2) {
            if (block.alpha > 0) {
              block.alpha -= 0.005; // slower fade out in Dimmer mode
            }
          }
  
          const color = `hsla(${(hue + (x + y) * 2) % 360}, 100%, 50%, ${block.alpha})`;
  
          ctx.fillStyle = color;
          ctx.fillRect(x * blockSize, y * blockSize, blockSize - 1, blockSize - 1);
        }
      }
    }
  
    // Update brightness based on mouse movement
    canvas.addEventListener("mousemove", (e) => {
      const x = Math.floor(e.clientX / blockSize);
      const y = Math.floor(e.clientY / blockSize);
  
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            if (mode === 1) {
              // Vivid Mode: Set maximum alpha for blocks
              grid[ny][nx].alpha = 1;
            }
            if (mode === 2) {
              // Dimmer Mode: Center block at higher alpha, surrounding blocks dimmer
              if (dx === 0 && dy === 0) {
                grid[ny][nx].alpha = 0.4;
              } else {
                grid[ny][nx].alpha = 0.15;
              }
            }
          }
        }
      }
    });
  
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      requestAnimationFrame(animate);
    }
  
    animate();
  });
  