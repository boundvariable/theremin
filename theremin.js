f0 = -1
c=new AudioContext()
o=c.createOscillator()
o.frequency.value = 329.628
g=c.createGain()
xx=c.createWaveShaper();
function mxx(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
}
xx.curve = mxx(400);
xx.oversample = '4x';
g.gain.value = 0
g.connect(c.destination)
o.start(0)
o.connect(xx)
xx.connect(g)
c=0
n = "\n"
function ln(_) {
  try { 
    l = JSON.parse(_)
  } catch (e) {
    return
  }
  console.log(l)
  if (!l.z && !l.v) return
  if (l.z) {
    if (f0 === -1) f0 = l.z
    console.log(Math.round((f0 - l.z)/100)*100)
    o.detune.value = Math.round((f0 - l.z)/100)*100
  }
  if (l.v === 1) {
    g.gain.value = 0.1 
  } else if (l.v === 0) {
    g.gain.value = 0
  }
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
      c.write("Puck.magOn();Bluetooth.println(JSON.stringify(Puck.mag()));Puck.on('mag',function(m){Bluetooth.println(JSON.stringify(m));});setWatch(function(){Bluetooth.println(JSON.stringify({v:1}))},BTN,{edge:'rising',repeat:true});setWatch(function(){Bluetooth.println(JSON.stringify({v:0}))},BTN,{edge:'falling',repeat:true});NRF.on('disconnect',function(){reset()});\n")
    }, 1500);
  })
}

