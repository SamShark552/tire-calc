   x.moveTo(X(.40),d.frontGlass+4);x.lineTo(X(.46),d.roof+5);x.lineTo(X(.58),d.roof+5);x.lineTo(X(.64),104);x.lineTo(X(.31),104);x.closePath();
 }else if(shape==='coupe'){
   x.moveTo(X(.42),d.frontGlass+4);x.lineTo(X(.51),d.roof+6);x.lineTo(X(.63),d.roof+6);x.quadraticCurveTo(X(.69),d.roof+7,X(.72),d.roof+25);x.lineTo(X(.79),104);x.lineTo(X(.31),104);x.closePath();
 }else{
   x.moveTo(X(.34),d.frontGlass+4);x.lineTo(X(.42),d.roof+6);x.lineTo(X(.60),d.roof+6);x.quadraticCurveTo(X(.66),d.roof+8,X(.70),d.roof+24);x.lineTo(X(.82),104);x.lineTo(X(.25),104);x.closePath();
 }
 x.fill();x.stroke();
 // Pillars, door seams and belt line.
 x.strokeStyle='#8298aa';x.lineWidth=1.1;x.beginPath();
 x.moveTo(X(.25),108);x.lineTo(X(.90),108);
 if(shape!=='cabrio')x.moveTo(X(.52),Math.max(48,d.roof+5)),x.lineTo(X(.52),108);
 if(shape==='mpv'){x.moveTo(X(.68),d.roof+6);x.lineTo(X(.68),157);x.moveTo(X(.83),107);x.lineTo(X(.83),158);}
 else if(shape==='coupe'||shape==='cabrio'){x.moveTo(X(.62),106);x.lineTo(X(.62),158);}
 else {x.moveTo(X(.44),108);x.lineTo(X(.44),158);x.moveTo(X(.68),108);x.lineTo(X(.68),158);}
 x.stroke();
 // Brand cues: grille and lamps; all kept schematic, not a photorealistic or CAD body mesh.
 x.fillStyle='#a9bac8';x.strokeStyle='#c5d2dc';x.lineWidth=1;
 if(v.make==='BMW'){
   x.fillStyle='#14212d';x.strokeStyle='#9fb2c2';x.beginPath();x.roundRect(X(.065),135,X(.038),13,3);x.stroke();x.beginPath();x.roundRect(X(.105),135,X(.038),13,3);x.stroke();
 }else if(v.make==='Kia'){
   x.fillStyle='#122333';x.strokeStyle='#9fb2c2';x.beginPath();x.roundRect(X(.055),133,X(.09),14,4);x.fill();x.stroke();
 }else{
   x.fillStyle='#14212d';x.strokeStyle='#9fb2c2';x.beginPath();x.roundRect(X(.06),135,X(.075),10,3);x.stroke();
 }
 x.fillStyle='#d9e8f4';x.fillRect(X(.09),119,X(.055),4);x.fillStyle='#ffbe78';x.fillRect(X(.92),128,X(.025),7);
 function wheel(cx,r,color,dash,fill=false){x.save();if(fill){x.fillStyle='#0a1119';x.beginPath();x.arc(cx,cy,r+5,0,Math.PI*2);x.fill();x.fillStyle='#172534';x.beginPath();x.arc(cx,cy,r*.78,0,Math.PI*2);x.fill();}x.strokeStyle=color;x.lineWidth=3;x.setLineDash(dash?[5,4]:[]);x.beginPath();x.arc(cx,cy,r,0,Math.PI*2);x.stroke();x.setLineDash([]);x.strokeStyle=color+'99';x.lineWidth=1.2;x.beginPath();x.arc(cx,cy,r*.54,0,Math.PI*2);x.stroke();x.fillStyle=color;x.beginPath();x.arc(cx,cy,4,0,Math.PI*2);x.fill();x.restore();}
 wheel(front,rB,'#61b9ff',false,true);wheel(front,rN,'#ffb85c',true,false);wheel(rear,rB,'#61b9ff',false,true);wheel(rear,rN,'#ffb85c',true,false);
 // Visible wheel arches drawn above the tyre circles.
 x.strokeStyle='#b1c2d0';x.lineWidth=3;x.beginPath();[front,rear].forEach(cx=>{x.moveTo(cx-rB-10,166);x.quadraticCurveTo(cx-rB-6,cy-rB-15,cx,cy-rB-15);x.quadraticCurveTo(cx+rB+6,cy-rB-15,cx+rB+10,166)});x.stroke();
 const caption=`${v.make||''} ${v.model||''} · ${v.bodyLabel||bodyLabel(shape)} · ${v.gen||''}`;
 $('carModelCaption').textContent=`${v.model||'Автомобиль'} · ${v.bodyLabel||bodyLabel(shape)}`;
 x.fillStyle='#d7e5f0';x.font='10px system-ui';x.fillText(`${v.make||'Авто'} ${v.model||''} · ${v.gen||'кузов не выбран'}`,12,16);
 x.fillStyle='#61b9ff';x.fillText(`Исходный Ø ${f(B.dia)} мм`,12,215);
 x.fillStyle='#ffbf70';x.fillText(`Новый Ø ${f(N.dia)} мм`,Math.max(110,w-135),215);
}
function drawTechnical(){const c=$('techCanvas'),rect=c.getBoundingClientRect();if(!rect.width)return;const dpr=Math.min(devicePixelRatio||1,2);c.width=rect.width*dpr;c.height=220*dpr;const x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);let w=rect.width,h=220;x.clearRect(0,0,w,h);const B=calc(val('b')),N=calc(val('n'));const max=Math.max(B.dia,N.dia);let sc=Math.min(90/max,100/Math.max(B.rimW,N.rimW));let cx=Math.min(w*.24,200),cy=111;
function circle(d,color,dash){let r=d.dia*sc/2,rr=d.rim*sc/2;x.save();x.strokeStyle=color;x.lineWidth=2.5;x.setLineDash(dash?[5,4]:[]);x.beginPath();x.arc(cx,cy,r,0,Math.PI*2);x.stroke();x.lineWidth=2;x.beginPath();x.arc(cx,cy,rr,0,Math.PI*2);x.stroke();x.setLineDash([]);x.restore()};circle(B,'#61b9ff',false);circle(N,'#ffb85c',true);
// diameter ruler
x.strokeStyle='#6e879c';x.lineWidth=1;x.beginPath();x.moveTo(cx+108,cy-100);x.lineTo(cx+108,cy+100);x.stroke();x.fillStyle='#c9d7e3';x.font='10px system-ui';x.fillText(`Ø ${f(B.dia)} / ${f(N.dia)} мм`,cx+118,cy-4);
// wheel section view
let sx=Math.min(w*.58,490), top=45, base=180, maxW=Math.max(B.w,N.w,Math.max(B.rimW,N.rimW));let secScale=100/maxW;
function section(d,color,offset){let tyreW=d.w*secScale, rimW=d.rimW*secScale, tireH=d.side*secScale*.8;let mid=sx+offset;x.fillStyle=color+'28';x.strokeStyle=color;x.lineWidth=2;x.beginPath();x.roundRect(mid-tyreW/2,base-tireH,tyreW,tireH*2,8);x.fill();x.stroke();x.lineWidth=3;x.beginPath();x.moveTo(mid-rimW/2,base-tireH*.55);x.lineTo(mid-rimW/2,base+tireH*.55);x.lineTo(mid+rimW/2,base+tireH*.55);x.lineTo(mid+rimW/2,base-tireH*.55);x.stroke();x.fillStyle=color;x.font='10px system-ui';x.fillText(`${d.w}/${d.a} R${d.d} · ${d.j}J`,mid-45,25)}
section(B,'#61b9ff',0);section(N,'#ffb85c',Math.min(160,w*.22));x.fillStyle='#8da1b4';x.font='10px system-ui';x.fillText('Профиль / ширина шины',Math.max(15,w*.58-70),207);
// labels
x.fillStyle='#c9d7e3';x.font='10px system-ui';x.fillText('Внешний диаметр',14,14);x.fillText('Сечение шины и обода',Math.max(15,w*.58-70),14)}
let dragX=null;const wc=$('wheelCanvas');wc.addEventListener('pointerdown',e=>{dragX=e.clientX;wc.setPointerCapture(e.pointerId)});wc.addEventListener('pointermove',e=>{if(dragX===null)return;let dx=e.clientX-dragX;dragX=e.clientX;wheelAngle=Math.max(-80,Math.min(80,wheelAngle+dx*.55));$('angle').value=wheelAngle;drawWheel()});wc.addEventListener('pointerup',()=>dragX=null);wc.addEventListener('pointercancel',()=>dragX=null);wc.addEventListener('wheel',e=>{e.preventDefault();wheelAngle=Math.max(-80,Math.min(80,wheelAngle+(e.deltaY>0?4:-4)));$('angle').value=wheelAngle;drawWheel()},{passive:false});
$('angle').addEventListener('input',e=>{wheelAngle=+e.target.value;drawWheel()});$('zoom').addEventListener('input',e=>{zoom=+e.target.value/100;$('zoomLabel').textContent=e.target.value+'%';drawWheel()});$('wheelStyle').addEventListener('change',e=>{wheelStyle=e.target.value;drawWheel()});$('frontView').addEventListener('click',()=>{wheelAngle=0;$('angle').value=0;drawWheel()});$('sideView').addEventListener('click',()=>{wheelAngle=78;$('angle').value=78;drawWheel()});document.querySelectorAll('[data-wheel]').forEach(b=>b.addEventListener('click',()=>{wheelTarget=b.dataset.wheel;document.querySelectorAll('[data-wheel]').forEach(x=>x.classList.toggle('active',x===b));drawWheel()}));$('swatches').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{wheelColor=b.dataset.color;$('swatches').querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));drawWheel()}));
function compatibility(B,N){const vehicle=currentVehicle()||{};const checks=[];let bpcd=pcdNorm(vehicle.pcd||B.pcd),npcd=pcdNorm(N.pcd||'');checks.push({title:'Сверловка PCD',value:!npcd?'Не задана':npcd===bpcd?'Совпадает':'Не совпадает',state:!npcd?'warn':npcd===bpcd?'good':'bad',desc:`Автомобиль: ${vehicle.pcd||B.pcd||'не задано'} · диск: ${N.pcd||'не задано'}. PCD должен совпадать точно.`});
