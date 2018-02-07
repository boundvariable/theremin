c=new AudioContext()
o=c.createOscillator()
o.frequency.value = 261.63
g=c.createGain()
g.gain.value = 0.05
g.connect(c.destination)
o.start(0)
o.connect(g)
a=0
onclick=function(){
  a = !a;
  a ? Puck.magOn() : Puck.magOff()
  Puck.on('mag', function(m) {
    console.log(mag);
  })
}
