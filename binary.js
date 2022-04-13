const w = 168;
const x0 = 18;
const dx = w / 6;
const h = 84;
const dy = h / 3;
const y0 = 100;
const r = dy / 2 - 2;


function x2px(x) {
  return x0 + Math.floor(x * dx);
}

function y2py(y) {
  return y0 + Math.floor(y * dy);
}

function toBinary(n, digits) {
  return n.toString(2).padStart(digits, '0');
}

function drawLamps(x, y, n, digits) {
  const s = toBinary(n, digits);
  const py = y2py(y);
  for (let i = 0; i < s.length; i++) {
    const px = x2px(x + i);
    if (s[i] === '1') {
      g.setColor(255, 255, 0);
      g.fillCircle(px, py, r);
    } else {
      g.setColor(255, 255, 255);
      g.fillCircle(px, py, r);
    }
    g.setColor(0, 0, 0);
    g.drawCircle(px, py, r);
  }
}


function draw() {
  const d = new Date();
  drawLamps(1, 0, d.getHours(), 4);
  drawLamps(0, 1, d.getMinutes(), 6);
  drawLamps(0, 2, d.getSeconds(), 6);
}

// Clear the screen once, at startup
g.clear();
// draw immediately at first
draw();
let secondInterval = setInterval(draw, 1000);
// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower', on => {
  if (on && !secondInterval) {
    secondInterval = setInterval(draw, 1000);
    draw(); // draw immediately
  } else if (!on && secondInterval) {
    clearInterval(secondInterval);
    secondInterval = undefined;
  }
});
// Show launcher when middle button pressed
Bangle.setUI("clock");
// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();