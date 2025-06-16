const logos = document.querySelectorAll(".floating-logo");

// Keep track of all logo objects
const floatingLogos = [];

const size = 80;
const isMobile = window.innerWidth <= 768;

logos.forEach((logo) => {
  let x = Math.random() * (window.innerWidth - size);
  let y = Math.random() * (window.innerHeight - size);
  let dx = (Math.random() - 0.5) * (isMobile ? 0.5 : 1.0); // Slower on mobile
  let dy = (Math.random() - 0.5) * (isMobile ? 0.5 : 1.0);
  let angle = 0;
  let spin = (Math.random() - 0.5) * (isMobile ? 0.5 : 1.5); // Less spin on mobile

  floatingLogos.push({ logo, x, y, dx, dy, angle, spin });
});

function detectCollision(a, b) {
  const distX = a.x - b.x;
  const distY = a.y - b.y;
  const distance = Math.sqrt(distX * distX + distY * distY);
  return distance < size;
}

function animate() {
  for (let i = 0; i < floatingLogos.length; i++) {
    const a = floatingLogos[i];
    a.x += a.dx;
    a.y += a.dy;
    a.angle += a.spin;

    // Bounce off walls
    if (a.x < 0 || a.x > window.innerWidth - size) a.dx *= -1;
    if (a.y < 0 || a.y > window.innerHeight - size) a.dy *= -1;

    // Check for collisions with other logos
    for (let j = 0; j < floatingLogos.length; j++) {
      if (i !== j) {
        const b = floatingLogos[j];
        if (detectCollision(a, b)) {
          const diffX = a.x - b.x;
          const diffY = a.y - b.y;
          const magnitude = Math.sqrt(diffX * diffX + diffY * diffY) || 1;
          const repelX = (diffX / magnitude) * 0.5;
          const repelY = (diffY / magnitude) * 0.5;

          a.dx += repelX;
          a.dy += repelY;
          b.dx -= repelX;
          b.dy -= repelY;
        }
      }
    }

    // Apply transform
    a.logo.style.transform = `translate(${a.x}px, ${a.y}px) rotate(${a.angle}deg)`;
  }

  requestAnimationFrame(animate);
}

animate();
