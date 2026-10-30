
'use strict';
const $=id=>document.getElementById(id);
const vehicleDB=[];
function bodyShape(make,model,gen){
 const t=String(gen||'').toLowerCase();
 if(model==='Carnival') return 'mpv';
 if(/cabrio|cabriolet/.test(t)) return 'cabrio';
 if(/gran turismo/.test(t)) return 'gt';
 if(/touring|variant|combi/.test(t)) return 'wagon';
 if(/coupe|(?:coupé)/.test(t)) return 'coupe';
 if(/sportsvan/.test(t)) return 'mpv';
 if(/sedan|saloon|limousine/.test(t)) return 'sedan';
 if(/liftback/.test(t)) return 'liftback';
 if(/hatchback/.test(t)) return 'hatchback';
 if(model==='Passat') return 'sedan';
 if(model==='Octavia'||model==='Superb') return 'liftback';
 if(model==='Polo'||model==='Golf') return 'hatchback';
 return 'hatchback';
}
function bodyLabel(shape){return ({mpv:'минивэн',wagon:'универсал',sedan:'седан',liftback:'лифтбек',cabrio:'кабриолет',coupe:'купе',gt:'Gran Turismo',hatchback:'хетчбек'})[shape]||'кузов';}
function addProfile(id,make,model,gen,pcd,cb,bolt,sets,note,source='справочный fitment',base=0){
 const options=sets.map(([size,j,et,tag='справочный размер'])=>{const m=size.match(/^(\d+)\/(\d+)\s*R(\d+)$/i);return {label:`${size} · ${j}J ET${et}`,w:+m[1],a:+m[2],d:+m[3],j,et,source:tag}});
 const shape=bodyShape(make,model,gen);
 vehicleDB.push({id,make,model,gen,pcd,cb,bolt,base,shape,bodyLabel:bodyLabel(shape),market:'Европа / типовая модификация',confidence:source,note,source,options});
}
const vag='Справочные заводские сочетания для европейских версий. Размеры и крепёж внутри поколения могут отличаться по двигателю, тормозам, комплектации и рынку. Сверяйте VIN, CoC и табличку автомобиля.';
const vwbolt='M14x1.5', oldbolt='M12x1.5';
// ŠKODA OCTAVIA: поколения 1U, 1Z, 5E, NX. Liftback и Combi выделены отдельно.
for(const body of ['Liftback','Combi']) addProfile(`sk-oct-1u-${body.toLowerCase()}`,'Skoda','Octavia',`I · 1U · 1996–2010 · ${body}`,'5x100',57.1,vwbolt,[['195/65 R15',6,38,'TÜV / approval list'],['205/55 R16',6.5,42,'TÜV / approval list']],vag,'Поколение/типовые OE-данные · проверить по VIN');
for(const body of ['Liftback','Combi']) addProfile(`sk-oct-1z-${body.toLowerCase()}`,'Skoda','Octavia',`II · 1Z · 2004–2013 · ${body}`,'5x112',57.1,vwbolt,[['195/65 R15',6,47],['205/55 R16',6.5,50],['225/45 R17',7,54],['225/40 R18',7.5,51]],vag,'Поколение/типовые OE-данные · проверить по VIN');
for(const body of ['Liftback','Combi']) addProfile(`sk-oct-5e-${body.toLowerCase()}`,'Skoda','Octavia',`III · 5E · 2012–2020 · ${body}`,'5x112',57.1,vwbolt,[['195/65 R15',6,43,'TÜV / approval list'],['205/55 R16',6.5,46,'TÜV / approval list'],['225/45 R17',7,49,'TÜV / approval list'],['225/40 R18',7.5,51,'TÜV / approval list']],vag,'Поколение/типовые OE-данные · проверить по VIN');
for(const body of ['Liftback','Combi']) addProfile(`sk-oct-nx-${body.toLowerCase()}`,'Skoda','Octavia',`IV · NX · 2019–н.в. · ${body}`,'5x112',57.1,vwbolt,[['205/60 R16',6.5,46,'TÜV / approval list'],['205/55 R17',7,46,'TÜV / approval list'],['225/45 R18',7.5,48,'TÜV / approval list']],vag,'Поколение/типовые OE-данные · проверить по VIN');
// ŠKODA FABIA: все основные поколения и реальные варианты кузова.
for(const body of ['Hatchback','Combi','Sedan']) addProfile(`sk-fab-6y-${body.toLowerCase()}`,'Skoda','Fabia',`I · 6Y · 1999–2007 · ${body}`,'5x100',57.1,vwbolt,[['165/70 R14',5,35,'типовой OE-размер'],['185/60 R14',6,43,'справочный вариант, сверить CoC']],vag,'BBS application list / поколения и ступица: CarWheelData. Кузов Sedan встречался не на всех рынках.');
for(const body of ['Hatchback','Combi']) addProfile(`sk-fab-5j-${body.toLowerCase()}`,'Skoda','Fabia',`II · 5J · 2007–2014 · ${body}`,'5x100',57.1,vwbolt,[['155/80 R13',5,35,'TÜV / approval list'],['165/70 R14',5,35,'TÜV / approval list'],['185/60 R14',6,37,'TÜV / approval list'],['185/55 R15',6,43,'TÜV / approval list'],['195/55 R15',6,43,'TÜV / approval list'],['205/45 R16',6.5,43,'TÜV / approval list']],vag,'TÜV Hessen / Škoda approval list; кузов отдельно, точный допуск по CoC.');
for(const body of ['Hatchback','Combi']) addProfile(`sk-fab-nj-${body.toLowerCase()}`,'Skoda','Fabia',`III · NJ · 2014–2021 · ${body}`,'5x100',57.1,vwbolt,[['165/70 R14',5,35,'TÜV / approval list'],['175/70 R14',5,35,'TÜV / approval list'],['185/60 R15',6,38,'TÜV / approval list'],['195/55 R15',6,38,'TÜV / approval list'],['215/45 R16',7,46,'TÜV / approval list'],['215/40 R17',7,46,'TÜV / approval list']],vag,'TÜV Hessen / типовые заводские допуски; сверить по CoC.');
addProfile('sk-fab-pj-hatch','Skoda','Fabia','IV · PJ · 2021–н.в. · Hatchback','5x100',57.1,vwbolt,[['185/70 R14',5,38,'Škoda Auto wheel overview'],['185/65 R15',5.5,40,'Škoda Auto wheel overview'],['195/55 R16',6,45,'Škoda Auto wheel overview'],['215/45 R17',7,51,'Škoda Auto wheel overview'],['215/40 R18',7,51,'TÜV / approval list']],vag,'Официальный буклет Škoda Fabia IV + TÜV approval list.');
// ŠKODA SUPERB: liftback и Combi отдельно.
addProfile('sk-sup-3u-lift','Skoda','Superb','I · 3U · 2001–2008 · Liftback','5x112',57.1,vwbolt,[['195/65 R15',6,45],['205/55 R16',6.5,45],['225/45 R17',7,45],['225/40 R18',7.5,46]],vag,'Поколение/типовые OE-данные · проверить по VIN');
for(const body of ['Liftback','Combi']) addProfile(`sk-sup-3t-${body.toLowerCase()}`,'Skoda','Superb',`II · 3T · 2008–2015 · ${body}`,'5x112',57.1,vwbolt,[['205/55 R16',6.5,46],['225/45 R17',7.5,46],['225/40 R18',7.5,46]],vag,'Поколение/типовые OE-данные · проверить по VIN');
for(const body of ['Liftback','Combi']) addProfile(`sk-sup-3v-${body.toLowerCase()}`,'Skoda','Superb',`III · 3V · 2015–2024 · ${body}`,'5x112',57.1,vwbolt,[['215/60 R16',6.5,41],['215/55 R17',7,40],['235/45 R18',8,44],['235/40 R19',8,44]],vag,'Поколение/типовые OE-данные · проверить по VIN');
for(const body of ['Liftback','Combi']) addProfile(`sk-sup-3y-${body.toLowerCase()}`,'Skoda','Superb',`IV · 3Y (тип омологации NZ) · 2023–н.в. · ${body}`,'5x112',57.1,vwbolt,[['215/60 R16',7,43,'TÜV / approval list'],['215/55 R17',7,43,'TÜV / approval list'],['215/55 R17',7.5,41,'TÜV / approval list'],['235/45 R18',8,44,'TÜV / approval list'],['235/40 R19',8,44,'TÜV / approval list']],vag,'TÜV Hessen approval list for Superb IV (type NZ); 3Y is model-generation code. Verify VIN/CoC.');
// VOLKSWAGEN POLO: европейские поколения; седаны и Variant показаны отдельно.
addProfile('vw-polo-86-hatch','Volkswagen','Polo','I · Typ 86 · 1975–1981 · Hatchback','4x100',57.1,oldbolt,[['145/80 R13',4.5,38],['155/70 R13',4.5,38],['175/70 R13',5,35]],vag,'Справочный исторический профиль · подтвердить по маркировке');
for(const body of ['Hatchback','Coupe']) addProfile(`vw-polo-86c-${body.toLowerCase()}`,'Volkswagen','Polo',`II · 86C · 1981–1994 · ${body}`,'4x100',57.1,oldbolt,[['155/70 R13',4.5,38],['165/65 R13',5,38],['175/60 R13',5,35],['185/55 R14',5.5,35]],vag,'Справочный исторический профиль · подтвердить по маркировке');
addProfile('vw-polo-6n-hatch','Volkswagen','Polo','III · 6N/6N2 · 1994–2001 · Hatchback','4x100',57.1,oldbolt,[['155/70 R13',4.5,35],['175/65 R13',5,35],['185/55 R14',6,38]],vag,'Основной профиль 6N/6N2; GTI и отдельные рынки проверять по VIN.');
addProfile('vw-polo-6kv-sedan','Volkswagen','Polo','III · 6KV · 1995–2001 · Classic Sedan (рынок-зависимый)','4x100',57.1,oldbolt,[['155/70 R13',4.5,35],['175/65 R13',5,35],['185/55 R14',6,38]],vag,'6KV — отдельный кузов Classic, не 6N Hatchback. Сверить VIN.');
