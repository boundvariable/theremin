c=new AudioContext()
o=c.createOscillator()
o.frequency.value = 329.628
g=c.createGain()
w=c.createWaveShaper()
db=document.body
function mx(k){
var n_=44100,curve=new Float32Array(n_),deg=Math.PI/180,i=0,x;
for(;i<n_;++i){
x=i*2/n_-1
curve[i]=(3+k)*x*20*deg/(Math.PI+k*Math.abs(x))
}
return curve
}
w.curve = mx(400);
w.oversample = '4x';
g.gain.value = 0
g.connect(c.destination)
o.start(0)
o.connect(w)
w.connect(g)
c=0
n="\n"
function q(_){
l={}
try { 
l=JSON.parse(_)
}catch(e) {
return
}
if(!l.z && !l.v) return
if(l.z) o.detune.value=Math.round(l.z/100)*300
if(l.v==='on') g.gain.value=0.1 
if(l.v==='off') g.gain.value=0
}
onclick=function(){
if(c){
db.style.background='red'
c.write("Puck.magOff();\n")
c.close()
c=0
return
}
db.style.background='green'
Puck.connect(function(k){
if(!k) return
c=k
b=''
c.on("data",function(d){
b+=d
i=b.indexOf(n)
while(i>=0){
q(b.substr(0,i))
b=b.substr(i+1)
i=b.indexOf(n)
}
})
c.write("reset();\n")
setTimeout(function(){
c.write("Puck.magOn(20);Bluetooth.println(JSON.stringify(Puck.mag()));Puck.on('mag',function(m){Bluetooth.println(JSON.stringify(m));});setWatch(function(){Bluetooth.println(JSON.stringify({v:'on'}))},BTN,{edge:'rising',repeat:true});setWatch(function(){Bluetooth.println(JSON.stringify({v:'off'}))},BTN,{edge:'falling',repeat:true});NRF.on('disconnect',function(){reset()});\n")
}, 1500)
})
}
