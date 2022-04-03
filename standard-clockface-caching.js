const x0 = 100;
const y0 = 100;
const radius = 50

const sincache = new Int16Array(60)
const coscache = new Int16Array(60)
const cached = new Int8Array(60)

function cache(t) {
  const angle = t / 60 * 2 * Math.PI - Math.PI / 2
  const sin = Math.sin(angle) * radius
  const cos = Math.cos(angle) * radius
  sincache[t] = sin
  coscache[t] = cos
  cached[t] = 1
}

function sin60(t) {
  if (!cached[t]) {
    cache(t)
  }
  return sincache[t]
}

function cos60(t) {
  if (!cached[t]) {
    cache(t)
  }
  return coscache[t]
}



function drawArrow(n, len) {
  const x = cos60(n) * len + x0
  const y = sin60(n) * len + y0
  g.drawLine(x0, y0, x, y)
}


function draw() {
  const d = new Date();
  g.setColor(-1)
  g.fillCircle(x0, y0, 50)
  g.setColor(0)
  g.drawCircle(x0, y0, 50)
  for (let i = 0; i < 12; i++) {
    const hour = i * 5
    const x = cos60(hour) + x0
    const x1 = cos60(hour) * 0.9 + x0
    const y = sin60(hour) + y0
    const y1 = sin60(hour) * 0.9 + y0
    g.drawLine(x1, y1, x, y)
  }
  drawArrow(d.getSeconds(), 1)
  drawArrow(d.getMinutes(), 0.8)
  const hhmm = Math.floor((d.getHours() % 12 + d.getMinutes() / 60) * 5);
  drawArrow(hhmm, 0.6)
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