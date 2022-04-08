const w = 140;
const x0 = 10;
const dx = w / 60;
const dy = 6;
const h = dy * 6 + 3;
const y0 = 100;


function x2px(x) {
  return x0 + Math.floor(x * dx);
}

function y2py(y) {
  return y0 + Math.floor(y * dy);
}


function draw() {
  const d = new Date();
  // d.setHours(6, 30, 30, 0) // All upper row
  // d.setHours(0, 0, 0) // All lower row
  // console.log(d.getHours(), d.getMinutes(), d.getSeconds())
  // Reset the state of the graphics library
  g.reset();
  g.setColor('#ffffff');
  g.fillRect(x0, y0, x0 + w, y0 + h);

  const hour = d.getHours() % 12;
  g.setColor('#ff0000');
  const hx = x2px((hour === 0 ? 12 : hour) * 5);
  const hy1 = y2py(0) + 1;
  const hy2 = hy1 + dy - 1;
  g.fillRect(x0 + 1, hy1, hx, hy2);

  const minute = d.getMinutes();
  g.setColor('#0000ff');
  const mx = x2px(minute === 0 ? 30 : minute);
  const my1 = y2py(1);
  const my2 = my1 + dy - 1;
  g.fillRect(x0 + 1, my1, mx, my2);

  g.setColor('#00ff00');
  const sec = d.getSeconds();
  const sx = x2px(sec === 0 ? 60 : sec);
  const sy1 = y2py(2);
  const sy2 = sy1 + dy;
  g.fillRect(x0 + 1, sy1, sx, sy2);

  g.setFont("4x6");
  g.setFontAlign(0, 1);
  g.setColor('#101010');
  const y1 = y2py(0);
  const y2 = y2py(3);
  for (let x = 0; x < 12; x += 1) {
    const x1 = x2px(x * 5);
    const x2 = x2px((x + 1) * 5);
    g.drawString((x + 1).toString(), (x1 + x2) / 2, y1, true /*clear background*/);
    g.drawRect(x1, y1, x2, y2);
  }
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