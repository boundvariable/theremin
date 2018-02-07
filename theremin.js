c = new AudioContext();
o = c.createOscillator();
o.frequency.value = 261.63;
g = c.createGain();
g.gain.value = 0.1;
o.start(0);
o.connect(ctx.destination);
