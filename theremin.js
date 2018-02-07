c=new AudioContext()
o=c.createOscillator()
o.frequency.value = 261.63
g=c.createGain()
g.gain.value = 0.05
o.start(0)
o.connect(g)
x=0
onclick=function(){
  x=!x
  Puck.write('LED1.write('+x+');\n')
}
