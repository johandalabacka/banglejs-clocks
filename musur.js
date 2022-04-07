const x0 = 100;
const y0 = 100;

var hand2 = require("heatshrink").decompress(atob("kslwkEogAFoEBBI4AHoE/+YSOCIP/+IRQ/8UCRsfCIPwCJtCCIP/JJ0vEiZuPEgUwCJtBEiJuCmEiiCTMEgQ6BVBkPCQMyAQISLEgX/L4ZNKgYOB+QVCkcgbpkzJoX/CRIkCAAYVBepBJDAAiZEoESRYRuCAArjDIgUygi4CAAwkCKwfzgB9CEhARDAAMTEhZDIAAswEg5qFNw1AkYSIj4DCkiPDgEiE4giBeITyHoAdDEQPzl/xUooADCQYOBmXzA4LKICQcf+U/KgJtCHBIkBj/wZIgSJI4JKCCJASBgajHABEDiMzQwMzkARKXwMzkURiUjUYgSIGwZIKaIxILaIcBiEADow="))

// 4 bit mac
var mouse = require("heatshrink").decompress(atob("smSwkBiIA/ABUQKYQwwAAKDqGAoyrdhBivMlIwIMlAxKMkqUJGOaWlGBYxyS0gx/GP4x/AA8QGP4x/ZEJVaJhRkLQzYyKSkBOQMhLpdMiboeSk6CJD4r3KYqwxOAwP/AAIwcQZSWDGAgyFGC4xNOAMPGInwSkgxDAYIxFS4oxiBgQwFMjYxMMAPwGIxkaGBRgIGJBkUGBbDGSxJkUMSxkaGP6QFGJKWTiAxQZoLPEZApkSGJT4GAwwxn+phDSwgxFSyYxNh4tEMwgxmFooxdSxIxG+oxITQYxgYggnBGIjNEfSSWKGInzLooAHGKYyJEo5jFAAqWTS4wFCEAX8/8gh/wGJfwGKZlDPgIxFKgSYBSpYxWNIwhD54xCAIIxnFIaSDAQIzJGMKSCGAIKGGMxkCGJbgBADInCfQoxvMQgxofQgxIAYf+GLbICMgYxFLwY/EGDQxEEgT4I+AxkfI4HEGIaUbZAbvFF4hrCGMYqEAAyiFGDiWBMQoAFMQPMBwRidAAIxKGAMM5nP//9GNIwBMQPMSkAxKF4IwCGIUAGL8TF5AwDGIIHCGL0QMRDEBAAPPTQUAZEwqBMQgxDMk/wMYXPTogyggD7HNIgAES74yJGAxkgTAMAZgQsHMkg1FAA7OB4BkhGJQvBAAZkkGBYABS1EMF4vAhiWnGA3Mh/w4AxiSwZeD//8GIX/4CWlMQfD//wGIcMGNPO///GIf8GMaWBeggxBHAIxB+D6jGJDIBAgIxx/nAGMcQGIfMGIfM94xreoQEC+Axs/4FChgxq4oxEZQIxp5nPSoQxtAAox/GP4x/GP4AejgxL5kBGP4AUhgx6BIbIjGI/AgD6nMI/AHQgxiiAxIM4kAGNpmCfMUcGJMAGAJiiGI6PBSIQwBMUURd4gsBgoCBAAQwjGIZcCGogwliKPCGIgwoiCMDM4I2DGNYAGGEkReAw4EGNQGFSkoqHY1yUGGOLGwGP7G/MR0BAogxlLYgAB9wxoF4sA53sAwnACQ5ha93AEAcMhxjF9xkBBYPuAAI/CDoZyTFI/gAIIGDBoIvDAAYOBGJgcC5nu5gqEGIg3BGIIAFGA4yFGJAhCAAwxCQAXeD4QmGDJALCF4IxHGBJaIHQa+EGBITCdhBHLBYwHBgHORAYwLMgUQMQwVMGQhbBF4LPDGoQALSwxiLGQbrBZISeFDJqWDiAyDiAWO8ovBGgIABLxzIHGQZIPAAwWTfQcQKAIxue4QxwiCwTGKz2DfCIxa8AxGMavsGKYwEGILHV8DGYAAIxVgCUYAAMMMSkAJCJiHfSodBVqEAMQ7IUQAcATBowJDQTjWiEAWBPAGBZkSDw5mBGgguBAAIwLDAXOGBvAQBYAEFxiXRKQIgQACCxBSRYwiGQbLHWJ4AZV4qyTABYA=="))

function drawLine(x1, y1, x2, y2, thickness) {
  var p = [];
  var angle = Math.atan2(y2 - y1, x2 - x1);
  cosP = Math.cos(angle + Math.PI / 2);
  cosM = Math.cos(angle - Math.PI / 2);
  sinP = Math.sin(angle + Math.PI / 2);
  sinM = Math.sin(angle - Math.PI / 2);
  p[0] = (x1 + thickness * cosP + 0.5) | 0;
  p[1] = (y1 + thickness * sinP + 0.5) | 0;
  p[2] = (x1 + thickness * cosM + 0.5) | 0;
  p[3] = (y1 + thickness * sinM + 0.5) | 0;
  p[4] = (x2 + thickness * cosM + 0.5) | 0;
  p[5] = (y2 + thickness * sinM + 0.5) | 0;
  p[6] = (x2 + thickness * cosP + 0.5) | 0;
  p[7] = (y2 + thickness * sinP + 0.5) | 0;
  g.fillPoly(p, true);
}


function drawArm(n, max, len) {
  const angle = n / max * 2 * Math.PI - Math.PI / 2
  const x = Math.cos(angle) * len + x0
  const y = Math.sin(angle) * len + y0

  drawLine(x0, y0, x, y, 4)
}

function drawImage(n, max, len, img) {
  const angle = n / max * 2 * Math.PI
  const x = Math.cos(angle - Math.PI / 2) * len + x0
  const y = Math.sin(angle - Math.PI / 2) * len + y0
  g.drawImage(img, x, y, { rotate: angle })
}

let lastHhmm = -1
function draw(force) {
  const d = new Date();
  const mm = d.getMinutes()
  const hhmm = (d.getHours() % 12) + d.getMinutes() / 60;
  if (!force && lastHhmm == hhmm) {
    // Only redraw then needed
    return
  }
  lastHhmm = hhmm
  g.setColor(255, 0, 0)
  g.fillRect(x0 - 80, y0 - 80, x0 + 80, y0 + 80);
  // const mm = d.getSeconds()

  g.drawImage(mouse, 40, 30)
  g.setColor(0)

  drawArm(mm, 60, 50)
  drawArm(hhmm, 12, 50)
  drawImage(mm, 60, 50, hand2);
  drawImage(hhmm, 12, 50, hand2);
}

// Clear the screen once, at startup
g.clear();
// draw immediately at first
draw(true);
let secondInterval = setInterval(draw, 1000);
// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower', on => {
  if (on && !secondInterval) {
    secondInterval = setInterval(draw, 1000);
    draw(true); // draw immediately
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