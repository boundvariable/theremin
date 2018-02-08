f0 = -1
v0 = -1
e = 329.628
q = 0.1
c=new AudioContext()
o=c.createOscillator()
o.frequency.value = e 
g=c.createGain()
g.gain.value = q
g.connect(c.destination)
o.start(0)
o.connect(g)
c=0
n = "\n"
function ln(l) {
  if (!l.z) return
  if (e === -1) {
    f0 = l.z
    v0 = l.x
  }
  o.frequency.value = e + f0 - l.z  
  //g.gain.value = v + q0 - l.z
  console.log(l.z, l.x, l.y);
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
      c.write("Puck.magOn();Puck.on('mag',function(m){Bluetooth.println(JSON.stringify(m));});NRF.on('disconnect', function() {reset()});\n")
    }, 1500);
  })
}
