if(wheelStyle==='mesh'){ctx.beginPath();ctx.moveTo(-rimR*.035,-hub);ctx.lineTo(rimR*.028,-outer);ctx.lineTo(rimR*.065,-outer);ctx.lineTo(rimR*.015,-hub);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(rimR*.04,-hub);ctx.lineTo(rimR*.11,-outer);ctx.stroke()}
else if(wheelStyle==='turbine'){ctx.beginPath();ctx.moveTo(-hub*.26,-hub);ctx.quadraticCurveTo(-rimR*.18,-rimR*.62,rimR*.08,-outer);ctx.lineTo(rimR*.18,-outer*.94);ctx.quadraticCurveTo(-rimR*.12,-rimR*.4,hub*.42,-hub);ctx.closePath();ctx.fill();ctx.stroke()}
else{ctx.beginPath();ctx.moveTo(-hub*.34,-hub*.76);ctx.quadraticCurveTo(-rimR*.08,-rimR*.52,-rimR*.035,-outer*.99);ctx.lineTo(rimR*.035,-outer*.99);ctx.quadraticCurveTo(rimR*.12,-rimR*.45,hub*.34,-hub*.76);ctx.closePath();ctx.fill();ctx.stroke()}
ctx.restore()}
// hub and lug holes
ctx.fillStyle=darken(metal,35);ctx.beginPath();ctx.arc(0,0,hub*1.05,0,Math.PI*2);ctx.fill();ctx.strokeStyle=lighten(metal,30);ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#111c27';for(let i=0;i<5;i++){let a=i*Math.PI*2/5-Math.PI/2;ctx.beginPath();ctx.arc(Math.cos(a)*hub*.64,Math.sin(a)*hub*.64,Math.max(2,rimR*.022),0,Math.PI*2);ctx.fill()}ctx.fillStyle=metal;ctx.beginPath();ctx.arc(0,0,hub*.35,0,Math.PI*2);ctx.fill();ctx.restore();
// Dimension callout
ctx.fillStyle='#c7d6e2';ctx.font='11px system-ui';ctx.textAlign='left';ctx.fillText(`${v.w}/${v.a} R${v.d}`,14, h-18);ctx.textAlign='right';ctx.fillStyle='#8da1b4';ctx.fillText(`${v.j}J · ET${v.et}`,w-14,h-18);
$('wheelBadge').textContent=`${v.w}/${v.a} R${v.d} · ${v.j}J ET${v.et}`;$('angleLabel').textContent=`${Math.round(wheelAngle)}°`}
function lighten(hex,p){return shade(hex,p)}function darken(hex,p){return shade(hex,-p)}function shade(hex,p){let h=hex.replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');let n=parseInt(h,16),r=n>>16,g=n>>8&255,b=n&255;const f=x=>Math.max(0,Math.min(255,p>=0?x+(255-x)*p/100:x*(1+p/100)));return `rgb(${f(r)},${f(g)},${f(b)})`}
function drawCar(){
 const c=$('carCanvas'),rect=c.getBoundingClientRect();if(!rect.width)return;
 const dpr=Math.min(devicePixelRatio||1,2);c.width=rect.width*dpr;c.height=230*dpr;
 const x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);
 const w=rect.width; x.clearRect(0,0,w,230);
 const B=calc(val('b')),N=calc(val('n')),v=currentVehicle()||{};
 const shape=v.shape||bodyShape(v.make||'',v.model||'',v.gen||'');
 const isLong=['Passat','Superb','Carnival'].includes(v.model)||v.model==='3 Series';
 const isCompact=['Polo','Fabia'].includes(v.model);
 const front=(isLong?.265:.285)*w, rear=(isLong?.755:.735)*w, cy=157;
 const rB=Math.min(42,w*.085),rN=rB*N.dia/B.dia;
 const X=p=>p*w;
 // Subtle ground and body shadow.
 x.fillStyle='#0007';x.beginPath();x.ellipse(w*.5,190,w*.45,9,0,0,Math.PI*2);x.fill();
 x.strokeStyle='#506477';x.lineWidth=1;x.beginPath();x.moveTo(12,195);x.lineTo(w-12,195);x.stroke();
 const dims={mpv:{roof:30,hood:111,tail:96,frontGlass:70},wagon:{roof:43,hood:113,tail:83,frontGlass:70},sedan:{roof:49,hood:111,tail:111,frontGlass:72},liftback:{roof:47,hood:111,tail:103,frontGlass:72},cabrio:{roof:93,hood:111,tail:112,frontGlass:96},coupe:{roof:61,hood:110,tail:109,frontGlass:82},gt:{roof:48,hood:111,tail:97,frontGlass:71},hatchback:{roof:49,hood:111,tail:105,frontGlass:70}};
 let d=dims[shape]||dims.hatchback;
 if(isCompact){d={...d,roof:d.roof+8,hood:d.hood+3,tail:d.tail+3};}
 if(v.model==='Carnival'){d={...dims.mpv,roof:25,hood:111,tail:92,frontGlass:66};}
 if(v.make==='BMW'){d={...d,hood:d.hood+2};}
 const frontB=X(.045), nose=X(.06), rearEnd=X(.96), roofStart=shape==='mpv'?X(.24):X(.32);
 const roofEnd=shape==='sedan'?X(.64):shape==='cabrio'?X(.57):shape==='coupe'?X(.64):shape==='wagon'||shape==='mpv'?X(.82):X(.62);
 // Silhouette outline, keyed by body type.
 x.beginPath();
 if(shape==='mpv'){
   x.moveTo(nose,151);x.lineTo(X(.075),126);x.quadraticCurveTo(X(.11),113,X(.19),105);
   x.lineTo(X(.22),d.frontGlass);x.quadraticCurveTo(X(.235),d.roof,X(.29),d.roof);
   x.lineTo(X(.82),d.roof+2);x.quadraticCurveTo(X(.88),d.roof+3,X(.91),d.roof+25);
   x.lineTo(X(.95),121);x.lineTo(X(.965),164);x.lineTo(X(.045),164);x.closePath();
 }else if(shape==='wagon'){
   x.moveTo(nose,151);x.lineTo(X(.085),126);x.quadraticCurveTo(X(.12),112,X(.22),107);
   x.lineTo(X(.31),d.frontGlass);x.quadraticCurveTo(X(.34),d.roof,X(.39),d.roof);
   x.lineTo(X(.79),d.roof);x.quadraticCurveTo(X(.845),d.roof,X(.87),d.roof+18);
   x.lineTo(X(.94),119);x.lineTo(X(.96),164);x.lineTo(X(.045),164);x.closePath();
 }else if(shape==='sedan'){
   x.moveTo(nose,151);x.lineTo(X(.085),126);x.quadraticCurveTo(X(.12),112,X(.24),107);
   x.lineTo(X(.33),d.frontGlass);x.quadraticCurveTo(X(.37),d.roof,X(.43),d.roof);
   x.lineTo(X(.60),d.roof);x.quadraticCurveTo(X(.66),d.roof+1,X(.70),d.roof+20);
   x.lineTo(X(.78),111);x.lineTo(X(.92),d.tail);x.quadraticCurveTo(X(.95),d.tail+3,X(.96),133);
   x.lineTo(X(.965),164);x.lineTo(X(.045),164);x.closePath();
 }else if(shape==='liftback'||shape==='gt'){
   x.moveTo(nose,151);x.lineTo(X(.085),126);x.quadraticCurveTo(X(.12),112,X(.24),107);
   x.lineTo(X(.34),d.frontGlass);x.quadraticCurveTo(X(.37),d.roof,X(.43),d.roof);
   x.lineTo(X(.61),d.roof);x.quadraticCurveTo(X(.67),d.roof+1,X(.71),d.roof+20);
   x.lineTo(X(.85),120);x.quadraticCurveTo(X(.92),125,X(.96),143);x.lineTo(X(.965),164);x.lineTo(X(.045),164);x.closePath();
 }else if(shape==='coupe'){
   x.moveTo(nose,151);x.lineTo(X(.09),124);x.quadraticCurveTo(X(.16),110,X(.29),106);
   x.lineTo(X(.40),d.frontGlass);x.quadraticCurveTo(X(.45),d.roof,X(.51),d.roof);
   x.lineTo(X(.64),d.roof);x.quadraticCurveTo(X(.70),d.roof+2,X(.74),d.roof+23);
   x.lineTo(X(.88),117);x.quadraticCurveTo(X(.94),124,X(.96),143);x.lineTo(X(.965),164);x.lineTo(X(.045),164);x.closePath();
 }else if(shape==='cabrio'){
   x.moveTo(nose,151);x.lineTo(X(.09),124);x.quadraticCurveTo(X(.16),110,X(.30),108);
   x.lineTo(X(.39),d.frontGlass);x.lineTo(X(.46),d.roof);x.lineTo(X(.57),d.roof);
   x.lineTo(X(.66),108);x.lineTo(X(.86),112);x.quadraticCurveTo(X(.94),122,X(.96),143);
   x.lineTo(X(.965),164);x.lineTo(X(.045),164);x.closePath();
 }else{
   x.moveTo(nose,151);x.lineTo(X(.085),126);x.quadraticCurveTo(X(.12),112,X(.23),107);
   x.lineTo(X(.32),d.frontGlass);x.quadraticCurveTo(X(.36),d.roof,X(.42),d.roof);
   x.lineTo(X(.61),d.roof);x.quadraticCurveTo(X(.67),d.roof,X(.71),d.roof+22);
   x.lineTo(X(.83),111);x.quadraticCurveTo(X(.93),117,X(.96),143);
   x.lineTo(X(.965),164);x.lineTo(X(.045),164);x.closePath();
 }
 const bodyGrad=x.createLinearGradient(0,30,0,170);bodyGrad.addColorStop(0,'#64798d');bodyGrad.addColorStop(.38,'#263b4d');bodyGrad.addColorStop(1,'#142331');
 x.fillStyle=bodyGrad;x.strokeStyle='#9cafc0';x.lineWidth=1.8;x.fill();x.stroke();
 // Windows and glazing are customized for the body silhouette.
 x.fillStyle='#102334';x.strokeStyle='#7c93a8';x.lineWidth=1.2;x.beginPath();
 if(shape==='mpv'){
   x.moveTo(X(.255),d.frontGlass+3);x.lineTo(X(.30),d.roof+7);x.lineTo(X(.80),d.roof+7);x.lineTo(X(.85),d.roof+25);x.lineTo(X(.87),105);x.lineTo(X(.23),105);x.closePath();
 }else if(shape==='wagon'){
