f0 = -1
c=new AudioContext()
o=c.createOscillator()
o.frequency.value = 329.628
g=c.createGain()
g.gain.value = 0
g.connect(c.destination)
o.start(0)
o.connect(g)
c=0
n = "\n"
function ln(_) {
  try { 
    l = JSON.parse(_)
  } catch (e) {
    return
  }
  if (!l.z) return
  if (f0 === -1) f0 = l.z
  o.detune.value = Math.round((f0 - l.z)/10)*100;  
  g.gain.value = 0.1
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

