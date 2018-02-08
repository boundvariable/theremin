c=new AudioContext()
o=c.createOscillator()
o.frequency.value = 261.63
g=c.createGain()
g.gain.value = 0.05
g.connect(c.destination)
o.start(0)
o.connect(g)
c=0
n = "\n"
ll = {};
function ln(l) {
  console.log(l)
  ll = l
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
    c.on("data",function(d) {
      b+=d
      i=b.indexOf(n)
      while (i>=0) {
        ln(b.substr(0,i))
        b=b.substr(i+1)
        i=b.indexOf(n)
      }
    })
    c.write("reset();\n")
    setTimeout(function(){
      c.write("Puck.magOn();Puck.on('mag',function(m){Bluetooth.println(m);});NRF.on('disconnect', function() {reset()});\n")
    }, 1500);
  })
}
