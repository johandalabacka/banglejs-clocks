const x0 = 0;
const x1 = g.getWidth();
const y0 = 24;
const y1 = g.getHeight();
const delta = (y1 - y0) / 8;
const ycount = 8
const xcount = Math.floor(x1 / delta)

const bleedX = 1
const bleedY = 2
const r = delta / 2 - 3;

const display = []
for (let y = 0; y < ycount; y++) {
  const row = []
  for (let x = 0; x < xcount; x++) {
    row[x] = 0 // Math.random() > 0.5 ? 1 : 0;
  }
  display.push(row)
}

function shiftLeftZero() {
  for (const row of display) {
    row.shift()
    row.push(0)
  }
}

function shiftLeftIn(arr, col) {
  let y = 0
  for (const row of display) {
    row.shift()
    row.push(arr[y][col])
    y++
  }
}

const chars = {
  '0':
    [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0]],
  '1':
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 1]],
  '2':
    [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 1, 1]],
  '3':
    [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [1, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 1, 1, 0]],
  '4':
    [
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1]],
  '5':
    [
      [1, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [1, 1, 1, 0]],
  '6':
    [
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0]],
  '7':
    [
      [1, 1, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]],
  '8':
    [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0]],
  '9':
    [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ],
  ':':
    [[0, 0],
    [0, 0],
    [1, 1],
    [1, 1],
    [0, 0],
    [1, 1],
    [1, 1],
    [0, 0]]

}

function timeChars() {
  const d = new Date()
  const s = d.getHours().toString().padStart(2, '0') + ':' +
    d.getMinutes().toString().padStart(2, '0') + ':' +
    d.getSeconds().toString().padStart(2, '0')

  return s.split('')
}

function x2px(x) {
  return x0 + Math.floor(x * delta) + r;
}

function y2py(y) {
  return y0 + Math.floor(y * delta) + r;
}

function toBinary(n, digits) {
  return n.toString(2).padStart(digits, '0');
}


let displayStack = []
let current = null
let currentIndex = 0
let empty = 0

function draw() {
  g.setBgColor(0)
  if (!display) {
    return
  }
  g.clear()
  for (let y = 0; y < ycount; y++) {
    const py = y2py(y);
    for (let x = 0; x < xcount; x++) {
      const px = x2px(x)
      if (display[y][x]) {
        g.setColor(1, 0, 0);
        g.fillCircle(px + bleedX, py + bleedY, r)
        g.setColor(1, 0, 1);
        g.fillCircle(px - bleedX, py - bleedY, r)
        g.setColor(1, 1, 0);
        g.fillCircle(px, py, r)
      } else {
        g.setColor(1, 0, 1);
        g.drawCircle(px - bleedX, py - bleedY, r)
        g.drawCircle(px, py, r)
        g.setColor(0, 1, 0);
        g.drawCircle(px, py, r)
      }
    }
  }

  if (current && currentIndex < current[0].length) {
    // Currently shifting in from digit
    shiftLeftIn(current, currentIndex++)
  } else {
    if (displayStack.length > 0) {
      // get the first char and use it for current
      const c = displayStack.shift()
      current = chars[c]
      currentIndex = 0
    } else if (empty > 0) {
      // Displaystack is empty, shift a number of empty cols
      empty--
    } else {
      // Fill displaystack with current time
      displayStack = timeChars()
      // Reset next empty count
      empty = xcount
    }
    shiftLeftZero()
  }
}

// Clear the screen once, at startup
g.clear();
// draw immediately at first
draw();
let secondInterval = setInterval(draw, 300);
// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower', on => {
  if (on && !secondInterval) {
    secondInterval = setInterval(draw, 300);
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