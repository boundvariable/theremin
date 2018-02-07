c = new AudioContext()
o = c.createOscillator()
o.frequency.value = 261.63
g = c.createGain()
g.gain.value = 0.05
o.start(0)
o.connect(c.destination)
onclick=function(){
  Puck.write('LED1.set();\n')
}
