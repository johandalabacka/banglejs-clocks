const x0 = 100;
const y0 = 100;


function drawArrow(n, max, len) {
  const angle = n / max * 2 * Math.PI - Math.PI / 2
  const x = Math.cos(angle) * len + x0
  const y = Math.sin(angle) * len + y0
  g.drawLine(x0, y0, x, y)
}


function draw() {
  const d = new Date();
  g.setColor(-1)
  g.fillCircle(x0, y0, 50)
  g.setColor(0)
  g.drawCircle(x0, y0, 50)
  drawArrow(d.getSeconds(), 60, 50)
  drawArrow(d.getMinutes(), 60, 45)
  const hhmm = (d.getHours() % 12) + d.getMinutes() / 60;
  drawArrow(hhmm, 12, 30)
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