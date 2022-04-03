// Load fonts
require("Font7x11Numeric7Seg").add(Graphics);
// position on screen
const X = 140, Y = 140;

function padZero(x) {
  return `${x < 10 ? '0' : ''}${x}`;
}

let cachedDate = '';
let cachedOnDate = -1;
function getCurrentTime() {
  const now = new Date();
  // Only do this calculation once a day
  if (!cachedDate || cachedOnDate !== now.getDate()) {
    const date = new Date(now.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    const weekNumber = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    cachedOnDate = now.getDate();
    cachedDate = now.getFullYear() + '-' + padZero(now.getMonth() + 1) + '-' + padZero(now.getDate())
      + ' v' + weekNumber;
  }
  const hhmm = padZero(now.getHours()) + ':' + padZero(now.getMinutes());
  const ss = padZero(now.getSeconds());
  return [hhmm, ss, cachedDate];
}

function draw() {
  // work out how to display the current time
  const d = getCurrentTime();
  // Reset the state of the graphics library
  g.reset();
  // draw the current time (4x size 7 segment)
  g.setFont("7x11Numeric7Seg", 4);
  g.setFontAlign(1, 1); // align right bottom
  g.drawString(d[0], X, Y, true /*clear background*/);
  // draw the seconds (2x size 7 segment)
  g.setFont("7x11Numeric7Seg", 2);
  g.drawString(d[1], X + 30, Y, true /*clear background*/);
  // draw the date, in a normal font
  g.setFont("6x8");
  g.setFontAlign(0, 1); // align center bottom
  // pad the date - this clears the background if the date were to change length
  g.drawString(d[2], g.getWidth() / 2, Y + 15, true /*clear background*/);
}

// Clear the screen once, at startup
g.clear();
// draw immediately at first
draw();
var secondInterval = setInterval(draw, 1000);
// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower', on => {
  if (secondInterval) clearInterval(secondInterval);
  secondInterval = undefined;
  if (on) {
    secondInterval = setInterval(draw, 1000);
    draw(); // draw immediately
  }
});
// Show launcher when middle button pressed
Bangle.setUI("clock");
// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();