const x0 = 0;
const x1 = g.getWidth();
const y0 = 24; // Below widget area
const y1 = g.getHeight();
const cx = x0 + (x1 - x0) / 2;
const cy = y0 + (y1 - y0) / 2;
const face = cy - y0 - 30;

// @todo use g.theme

const colorBackground = 0x0000;
const colorHourDigits = 0xF800;
const colorMinDigits = 0xFFFF;
const colorDots = 0xFFFF;
const colorSeconds = 0xFFE0; // yellow
const colorMinutes = 0x07FF; // Cyan
const colorHours = 0xF800; // Red

order = [0, 2, 11, 9, 7, 5, 1, 3, 10, 8, 6, 4];
dotX = [];
dotY = [];
hourX = [];
hourY = [];
minX = [];
minY = [];

for (let i = 0; i < order.length; i++) {
  const hour = order[i];
  const angle = i / 12 * 2 * Math.PI - Math.PI / 2;
  dotX[hour] = Math.cos(angle) * face + cx;
  dotY[hour] = Math.sin(angle) * face + cy;
  minX[hour] = Math.cos(angle) * (face + 11) + cx;
  minY[hour] = Math.sin(angle) * (face + 11) + cy;
  hourX[hour] = Math.cos(angle) * (face + 23) + cx;
  hourY[hour] = Math.sin(angle) * (face + 23) + cy;
}

function drawDot(v, max) {
  const n = v / max * 12;
  const from = Math.floor(n); // 0 - 11
  const to = from === 11 ? 0 : from + 1; // 0 - 11
  const fraction = n - from;
  g.drawLine(dotX[from], dotY[from], dotX[to], dotY[to]);
  const x = dotX[from] - (dotX[from] - dotX[to]) * fraction;
  const y = dotY[from] - (dotY[from] - dotY[to]) * fraction;
  g.fillCircle(x, y, 3);
}

function draw() {
  g.setColor(colorBackground);
  g.fillRect(x0, y0, x1, y1);
  g.setFont("6x8");
  g.setFontAlign(0, 0); // align center center
  const left = cx;

  const d = new Date();
  const pm = d.getHours() > 12;
  for (i = 0; i < 12; i++) {
    g.setColor(colorHourDigits);
    g.drawString(i == 0 ? 12 : (pm ? i + 12 : i), hourX[i], hourY[i]);
    g.setColor(colorMinDigits);
    g.drawString(i * 5, minX[i], minY[i]);
    g.setColor(colorDots);
    g.fillCircle(dotX[i], dotY[i], 3);
  }

  g.setColor(colorSeconds);
  drawDot(d.getSeconds(), 60);
  g.setColor(colorMinutes);
  const mmss = d.getMinutes() + d.getSeconds() / 60;
  drawDot(mmss, 60);
  g.setColor(colorHours);
  const hhmm = (d.getHours() % 12) + d.getMinutes() / 60;
  drawDot(hhmm, 12);
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
Bangle.setUI('clock');
// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();