window.AudioContext = window.AudioContext || window.webkitAudioContext;
c = new AudioContext();
o = ctx.createOscillator();
o.frequency.value = 261.63;
g = ctx.createGain();
g.gain.value = 0.1;
o.start(0);
o.connect(ctx.destination);
