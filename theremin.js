c=new AudioContext()
o=c.createOscillator()
o.frequency.value = 261.63
g=c.createGain()
g.gain.value = 0.05
g.connect(c.destination)
o.start(0)
o.connect(g)
c=0
n = '\n'
function ln(l) {
  console.log(l);
}
onclick=function(){  
  if (c) {
    c.close()
    c = 0
    return
  }
  Puck.connect(function(k) {
    if (!k) return
    c=k
    b=''
    console.log(c)
    c.on('data', function(d) {
      console.log(d)
      b+=c
      i=b.indexOf(n)
      while (i>=0) {
        ln(b.substr(0,i))
        b=b.substr(i+1)
        i=b.indexOf(n)
      }
    })
  })
}
