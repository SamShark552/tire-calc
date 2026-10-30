/* ===== app-01.js ===== */

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


/* ===== app-02.js ===== */
addProfile('vw-polo-6kv-variant','Volkswagen','Polo','III · 6KV · 1997–2001 · Variant (рынок-зависимый)','4x100',57.1,oldbolt,[['155/70 R13',4.5,35],['175/65 R13',5,35],['185/55 R14',6,38]],vag,'6KV Variant — отдельный кузов; набор колёс справочный, сверить CoC.');
for(const body of ['Hatchback','Sedan']) addProfile(`vw-polo-9n-${body.toLowerCase()}`,'Volkswagen','Polo',`IV · 9N/9N3 · 2001–2009 · ${body==='Sedan'?'Sedan (экспорт / 9N-derived)':'Hatchback'}`,'5x100',57.1,vwbolt,[['165/70 R14',5,35],['185/60 R14',6,43],['195/55 R15',6,43],['205/45 R16',6.5,43]],vag,'Для экспортных Polo Sedan проверяйте рынок и модификацию');
addProfile('vw-polo-6r-hatch','Volkswagen','Polo','V · 6R/6C · 2009–2017 · Hatchback','5x100',57.1,vwbolt,[['175/70 R14',5,40],['185/60 R15',6,40],['195/55 R15',6,40],['215/45 R16',7,46]],vag,'Поколение/типовые OE-данные · проверить по VIN');
addProfile('vw-polo-6rf-sedan','Volkswagen','Polo','V · 6RF · 2010–2020 · Sedan (Россия/экспорт)','5x100',57.1,vwbolt,[['175/70 R14',5,40],['185/60 R15',6,40],['195/55 R15',6,40],['205/45 R16',6.5,40]],vag,'Рынок/комплектация влияют на заводские размеры');
addProfile('vw-polo-aw-hatch','Volkswagen','Polo','VI · AW/BZ · 2017–2021 · Hatchback','5x100',57.1,vwbolt,[['185/65 R15',5.5,40],['195/55 R16',6,40],['215/45 R17',7,46]],vag,'Поколение/типовые OE-данные · проверить по VIN');
addProfile('vw-polo-aw-fl-hatch','Volkswagen','Polo','VI · AW/BZ facelift · 2021–н.в. · Hatchback','5x100',57.1,vwbolt,[['185/65 R15',5.5,40],['195/55 R16',6,40],['215/45 R17',7,46]],vag,'CarWheelData lists the facelift as a separate period; confirm the exact tyre/ET against the vehicle CoC.');
// VOLKSWAGEN GOLF: Mk1–Mk8, кузова Hatchback / Variant / Cabriolet / Sportsvan.
addProfile('vw-golf-mk1-hatch','Volkswagen','Golf','I · Typ 17 · 1974–1983 · Hatchback','4x100',57.1,oldbolt,[['155/80 R13',5,38],['175/70 R13',5.5,38],['185/60 R14',6,38],['195/50 R15',6,35]],vag,'Типовые исторические размеры · проверить комплектацию');
addProfile('vw-golf-mk1-cab','Volkswagen','Golf','I · Typ 155 · 1979–1993 · Cabriolet','4x100',57.1,oldbolt,[['175/70 R13',5.5,38],['185/60 R14',6,38],['195/50 R15',6,35]],vag,'Кабриолет на базе Golf I · проверить по VIN');
addProfile('vw-golf-mk2-hatch','Volkswagen','Golf','II · 19E/1G · 1983–1992 · Hatchback','4x100',57.1,oldbolt,[['175/70 R13',5.5,38],['185/60 R14',6,38],['195/50 R15',6,35]],vag,'На отдельных G60/Syncro возможны другие параметры');
addProfile('vw-golf-mk3-hatch','Volkswagen','Golf','III · 1H · 1991–1998 · Hatchback (обычные версии)','4x100',57.1,oldbolt,[['175/65 R14',5.5,45],['185/60 R14',6,45],['195/50 R15',6,45],['205/50 R15',6.5,45]],vag,'У некоторых GTI/VR6 применяется 5x100 · проверяйте модификацию');
addProfile('vw-golf-mk3-vr6','Volkswagen','Golf','III · 1H · 1992–1998 · GTI/VR6 (варианты 5 отверстий)','5x100',57.1,vwbolt,[['195/50 R15',6,45],['205/50 R15',6.5,45],['205/45 R16',7,38]],vag,'Спортивные версии: параметры зависят от тормозов');
addProfile('vw-golf-mk3-variant','Volkswagen','Golf','III · 1H · 1993–1999 · Variant','4x100',57.1,oldbolt,[['185/60 R14',6,45],['195/50 R15',6,45],['205/50 R15',6.5,45]],vag,'На отдельных моторах/рынках сверяйте PCD');
addProfile('vw-golf-mk3-cab','Volkswagen','Golf','III · 1E · 1993–2002 · Cabriolet','4x100',57.1,oldbolt,[['185/60 R14',6,45],['195/50 R15',6,45],['205/50 R15',6.5,45]],vag,'Кабриолет Mk3 · возможны отличия по тормозам');
addProfile('vw-golf-mk4-hatch','Volkswagen','Golf','IV · 1J · 1997–2006 · Hatchback','5x100',57.1,vwbolt,[['195/65 R15',6,38],['205/55 R16',6.5,42],['225/45 R17',7,38],['225/40 R18',7.5,38]],vag,'На R32 и отдельных версиях могут быть особые допуски');
addProfile('vw-golf-mk4-variant','Volkswagen','Golf','IV · 1J · 1999–2006 · Variant','5x100',57.1,vwbolt,[['195/65 R15',6,38],['205/55 R16',6.5,42],['225/45 R17',7,38]],vag,'Поколение/типовые OE-данные · проверить по VIN');
addProfile('vw-golf-mk4-cab','Volkswagen','Golf','IV · 1E (на базе Mk3) · 1998–2002 · Cabriolet','4x100',57.1,oldbolt,[['185/60 R14',6,45],['195/50 R15',6,45],['205/50 R15',6.5,45]],vag,'Кузов 1E конструктивно основан на Golf III');
for(const body of ['Hatchback','Variant']) addProfile(`vw-golf-mk5-${body.toLowerCase()}`,'Volkswagen','Golf',`V · 1K · 2003–2009 · ${body}`,'5x112',57.1,vwbolt,[['195/65 R15',6.5,50],['205/55 R16',6.5,50],['225/45 R17',7,54],['225/40 R18',7.5,51]],vag,'Поколение/типовые OE-данные · проверить по VIN');
for(const body of ['Hatchback','Variant']) addProfile(`vw-golf-mk6-${body.toLowerCase()}`,'Volkswagen','Golf',`VI · 5K · 2008–2013 · ${body}`,'5x112',57.1,vwbolt,[['195/65 R15',6.5,50],['205/55 R16',6.5,50],['225/45 R17',7,54],['225/40 R18',7.5,51]],vag,'Поколение/типовые OE-данные · проверить по VIN');
addProfile('vw-golf-mk6-cab','Volkswagen','Golf','VI · 517 · 2011–2016 · Cabriolet','5x112',57.1,vwbolt,[['205/55 R16',6.5,50],['225/45 R17',7,54],['225/40 R18',7.5,51]],vag,'Кабриолет Mk6 · точный допуск по модификации');
for(const body of ['Hatchback','Variant','Sportsvan']) addProfile(`vw-golf-mk7-${body.toLowerCase()}`,'Volkswagen','Golf',`VII · 5G · 2012–2020 · ${body}`,'5x112',57.1,vwbolt,[['205/55 R16',6.5,46],['225/45 R17',7,49],['225/40 R18',7.5,51],['225/35 R19',7.5,51]],vag,'Поколение/типовые OE-данные · проверить по VIN');
for(const body of ['Hatchback','Variant']) addProfile(`vw-golf-mk8-${body.toLowerCase()}`,'Volkswagen','Golf',`VIII · CD1 · 2019–н.в. · ${body}`,'5x112',57.1,vwbolt,[['205/55 R16',6.5,46],['225/45 R17',7,49],['225/40 R18',7.5,51]],vag,'Поколение/типовые OE-данные · проверить по VIN');
// VOLKSWAGEN PASSAT: поколения B1–B9, Sedan / Variant; B9 EU представлен Variant.
for(const body of ['Hatchback','Variant']) addProfile(`vw-passat-b1-${body.toLowerCase()}`,'Volkswagen','Passat',`B1 · Typ 32 · 1973–1980 · ${body}`,'4x100',57.1,oldbolt,[['155/80 R13',5,38],['165/70 R13',5,38],['175/70 R13',5.5,38]],vag,'Исторические значения · обязательна сверка фактической ступицы');
for(const body of ['Hatchback','Variant']) addProfile(`vw-passat-b2-${body.toLowerCase()}`,'Volkswagen','Passat',`B2 · Typ 32B · 1980–1988 · ${body}`,'4x100',57.1,oldbolt,[['165/80 R13',5,38],['175/70 R13',5.5,38],['185/65 R14',6,38]],vag,'Исторические значения · обязательна сверка фактической ступицы');
for(const body of ['Sedan','Variant']) addProfile(`vw-passat-b3-${body.toLowerCase()}`,'Volkswagen','Passat',`B3 · 35i · 1988–1993 · ${body}`,'4x100',57.1,vwbolt,[['185/65 R14',6,45],['195/60 R14',6,45],['195/55 R15',6,45]],vag,'На VR6/Syncro и отдельных исполнениях PCD может отличаться');
for(const body of ['Sedan','Variant']) addProfile(`vw-passat-b4-${body.toLowerCase()}`,'Volkswagen','Passat',`B4 · 3A · 1993–1997 · ${body}`,'4x100',57.1,vwbolt,[['185/65 R14',6,45],['195/60 R14',6,45],['195/55 R15',6,45]],vag,'На VR6 и отдельных исполнениях возможны иные параметры');
for(const body of ['Sedan','Variant']) addProfile(`vw-passat-b5-${body.toLowerCase()}`,'Volkswagen','Passat',`B5 · 3B · 1996–2000 · ${body}`,'5x112',57.1,vwbolt,[['195/65 R15',6,45],['205/55 R16',7,45],['225/45 R17',7,45]],vag,'Поколение/типовые OE-данные · проверить по VIN');
for(const body of ['Sedan','Variant']) addProfile(`vw-passat-b55-${body.toLowerCase()}`,'Volkswagen','Passat',`B5.5 · 3BG · 2000–2005 · ${body}`,'5x112',57.1,vwbolt,[['195/65 R15',6,45],['205/55 R16',7,45],['225/45 R17',7,45]],vag,'Поколение/типовые OE-данные · проверить по VIN');


/* ===== app-03.js ===== */
for(const body of ['Sedan','Variant']) addProfile(`vw-passat-b6-${body.toLowerCase()}`,'Volkswagen','Passat',`B6 · 3C · 2005–2010 · ${body}`,'5x112',57.1,vwbolt,[['215/55 R16',6.5,42,'CarWheelData OE listing'],['235/45 R17',7.5,47,'CarWheelData OE listing'],['205/55 R16',6.5,42,'CarWheelData alternative'],['235/40 R18',8,45,'CarWheelData alternative']],vag,'2008 Passat configuration table; tyre sizes can vary between engines/markets.');
for(const body of ['Sedan','Variant']) addProfile(`vw-passat-b7-${body.toLowerCase()}`,'Volkswagen','Passat',`B7 · 3C · 2010–2015 · ${body}`,'5x112',57.1,vwbolt,[['205/55 R16',6.5,42],['235/45 R17',7.5,47],['235/40 R18',8,44]],vag,'Поколение/типовые OE-данные · проверить по VIN');
for(const body of ['Sedan','Variant']) addProfile(`vw-passat-b8-${body.toLowerCase()}`,'Volkswagen','Passat',`B8 · 3G · 2014–2023 · ${body}`,'5x112',57.1,vwbolt,[['215/60 R16',6.5,41],['215/55 R17',7,40],['235/45 R18',8,44],['235/40 R19',8,44]],vag,'Поколение/типовые OE-данные · проверить по VIN');
addProfile('vw-passat-b9-variant','Volkswagen','Passat','B9 · 3J · 2023–н.в. · Variant','5x112',57.1,vwbolt,[['215/60 R16',7,43,'проверить каталог комплектации'],['215/55 R17',7.5,41,'типовой OEM'],['235/45 R18',8,44,'типовой OEM'],['235/40 R19',8,44,'типовой OEM']],vag,'Европейский B9 представлен Variant; проверяйте рынок и VIN');
// BMW 3 SERIES: starting at E90, all main body derivatives by chassis family.
const bmwE='BMW E90 family: PCD/tyre-wheel combinations cross-checked with BMW Group wheel guide for selected model years. The list below intentionally keeps only square/all-axle combinations; staggered front/rear packages require an axle-specific wheel specification.';
for(const [code,body,years] of [['E90','Sedan','2005–2012'],['E91','Touring','2005–2012'],['E92','Coupe','2006–2013'],['E93','Cabrio','2007–2013']]) addProfile(`bmw-${code.toLowerCase()}`,'BMW','3 Series',`${code} · ${years} · ${body}`,'5x120',72.6,'M12x1.5',[['205/55 R16',7,34,'BMW Group OEM square set'],['225/45 R17',8,34,'BMW Group OEM square set']],bmwE,'BMW Group wheel guide (MY2007–2008) · типовые данные по выбранным модификациям');
const bmwF='BMW F-series reference fitment: common square-size examples only. Factory packages can be staggered; exact ET and wheel width depend on axle, brake package and wheel part number. Confirm against CoC and BMW parts catalogue.';
for(const [code,body,years] of [['F30','Sedan','2011–2019'],['F31','Touring','2012–2019'],['F34','Gran Turismo','2013–2020'],['F35','Long Wheelbase Sedan (China)','2012–2019']]) addProfile(`bmw-${code.toLowerCase()}`,'BMW','3 Series',`${code} · ${years} · ${body}`,'5x120',72.6,'M14x1.25',[['205/60 R16',7,31,'справочный OE / square-size reference'],['225/50 R17',7.5,37,'справочный OE / square-size reference']],bmwF,'BMW fitment reference · проверять по комплектации');
const bmwG='BMW G-series reference fitment: standard 3 Series uses 5x112 and 66.6 mm hub in the common EU specification. This entry lists a square 17-inch reference only; M3, xDrive, brake packages and staggered sets require exact BMW approval data.';
for(const [code,body,years] of [['G20','Sedan','2018–н.в.'],['G21','Touring','2019–н.в.'],['G28','Long Wheelbase Sedan (China)','2019–н.в.']]) addProfile(`bmw-${code.toLowerCase()}`,'BMW','3 Series',`${code} · ${years} · ${body}`,'5x112',66.6,'M14x1.25',[['225/50 R17',7.5,30,'reference square fitment; verify selected BMW wheel part number']],bmwG,'BMW fitment reference · проверять по комплектации');

// KIA CARNIVAL / SEDONA: generations and market-specific VQ heavy-duty hub kept separate.
const kiaNote='Kia Carnival is market- and engine-sensitive. Check the market, VIN, hub bore and actual bolt pattern; do not assume all VQ versions share one hub.';
addProfile('kia-carnival-kvii','Kia','Carnival','I · KV-II · 1998–2006 · MPV · 5-lug version','5x114.3',67.1,'M12x1.5',[['205/70 R15',6,50,'OE listing'],['215/65 R15',6,50,'OE listing'],['225/55 R16',7,45,'OE listing']],kiaNote,'CarWheelData / Monentraxe; match year and market.');
addProfile('kia-carnival-vq-6lug','Kia','Carnival','II · VQ · 2005–2014 · MPV · Europe/Russia 6-lug versions','6x139.7',92.2,'M12x1.5',[['225/70 R16',6.5,46,'OE listing 2006–2010'],['235/60 R17',6.5,46,'listed optional size'],['235/60 R18',7,46,'listed optional size']],kiaNote,'CarWheelData / wheelpcd / TireWheelGuide: VQ heavy-duty version uses 6x139.7, CB92.2; some other markets/engines differ.');
addProfile('kia-carnival-vq-5lug','Kia','Carnival','II · VQ · 2005–2014 · MPV · selected 5-lug markets','5x114.3',67.1,'M12x1.5',[['225/70 R16',6.5,46,'reference tyre size only; verify exact wheel data']],kiaNote,'CarWheelData records a separate 5x114.3/67.1 population; exact trim-specific wheel/tyre pair must be checked by VIN.');
addProfile('kia-carnival-yp','Kia','Carnival','III · YP · 2014–2018 · MPV','5x114.3',67.1,'M12x1.5',[['235/65 R17',6.5,49,'OE'],['235/55 R19',7.5,41,'OE'],['235/60 R18',7,51.5,'listed OE option']],kiaNote,'Kia/Carnival fitment references; check engine, market and CoC.');
addProfile('kia-carnival-yp-fl','Kia','Carnival','III · YP facelift · 2018–2021 · MPV','5x114.3',67.1,'M12x1.5',[['235/65 R17',6.5,49,'OE'],['235/60 R18',7,51.5,'listed OE option'],['235/55 R19',7.5,41,'OE']],kiaNote,'Kia/Carnival fitment references; check engine, market and CoC.');
addProfile('kia-carnival-ka4','Kia','Carnival','IV · KA4 · 2020–2024 · MPV','5x114.3',67.1,'M12x1.5',[['235/65 R17',6.5,49,'Kia manual / OE'],['235/60 R18',7,51.5,'regional OE listing'],['235/55 R19',7.5,54,'regional OE listing']],kiaNote,'Kia owner manual + CarWheelData / regional catalogues; verify wheel offset by market.');
addProfile('kia-carnival-ka4-fl','Kia','Carnival','IV · KA4 facelift · 2024–2026 · MPV','5x114.3',67.1,'M12x1.5',[['235/65 R17',6.5,49,'Kia manual / OE'],['235/60 R18',7,51.5,'Kia manual / regional OE'],['235/55 R19',7.5,54,'Kia manual / regional OE']],kiaNote,'Official Kia manual confirms tyre/wheel widths; offsets are cross-checked against regional fitment records.');

// Сохранённый Toyota Corolla profile из предыдущей версии оставлен для обратной совместимости.
addProfile('toyota-corolla-e150','Toyota','Corolla','X · E150 · 2007–2013 · Sedan / Hatchback (зависит от рынка)','5x114.3',60.1,'M12x1.5',[['195/65 R15',6,39],['205/55 R16',6.5,45],['215/45 R17',7,45]],'У Corolla E150 параметры ступицы и PCD различаются по рынку и модификации. Обязательно проверить VIN и фактическую ступицу.','Справочный профиль с предупреждением');

const userCars=JSON.parse(localStorage.getItem('wheellab_custom_cars')||'[]');
let selectedVehicle=null, currentTab='candidate', wheelTarget='candidate', wheelAngle=-18, zoom=1, wheelColor='#becbd6', wheelStyle='ten', saved=JSON.parse(localStorage.getItem('wheellab_saved_sets')||'[]');
const colors={silver:'#becbd6',graphite:'#343d48',black:'#111820',bronze:'#a66b3f',bright:'#d7d9db',red:'#8d2734'};
function notify(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(notify.timer);notify.timer=setTimeout(()=>t.classList.remove('show'),2100)}
function val(prefix){return {w:+$(prefix+'W').value,a:+$(prefix+'A').value,d:+$(prefix+'D').value,j:+$(prefix+'J').value,et:+$(prefix+'ET').value,pcd:$(prefix+'PCD').value.trim(),cb:+$(prefix+'CB').value,bolt:$(prefix+'Bolt').value.trim()}}
function setVal(prefix,v){$(prefix+'W').value=v.w;$(prefix+'A').value=v.a;$(prefix+'D').value=v.d;$(prefix+'J').value=v.j;$(prefix+'ET').value=v.et;$(prefix+'PCD').value=v.pcd||'';$(prefix+'CB').value=v.cb??'';$(prefix+'Bolt').value=v.bolt||'';render()}


/* ===== app-04.js ===== */
function valid(v){return [v.w,v.a,v.d,v.j,v.et].every(Number.isFinite)&&v.w>=100&&v.w<=400&&v.a>=20&&v.a<=95&&v.d>=10&&v.d<=30&&v.j>=4&&v.j<=15}
function calc(v){const side=v.w*v.a/100,rim=v.d*25.4,dia=rim+2*side,circ=Math.PI*dia,rimW=v.j*25.4;return {...v,side,rim,dia,circ,rimW,outer:rimW/2-v.et,inner:rimW/2+v.et}}
const f=(n,d=1)=>Number(n).toFixed(d),sg=(n,d=1)=>(n>0?'+':n<0?'−':'')+f(Math.abs(n),d),pcdNorm=s=>(s||'').toLowerCase().replace(/\s/g,'').replace('×','x');
function currentVehicle(){return selectedVehicle}
function populateMakes(){const all=[...vehicleDB,...userCars];const makes=[...new Set(all.map(v=>v.make))].sort((a,b)=>a.localeCompare(b));$('make').innerHTML='<option value="">Выберите марку</option>'+makes.map(x=>`<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`).join('');$('make').value=makes.includes('Volkswagen')?'Volkswagen':(makes[0]||'');populateModels()}
function populateModels(preferred){const make=$('make').value;const all=[...vehicleDB,...userCars].filter(v=>v.make===make);const models=[...new Set(all.map(v=>v.model))].sort((a,b)=>a.localeCompare(b));$('model').innerHTML=models.map(x=>`<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`).join('');const wanted=preferred||(make==='Volkswagen'&&models.includes('Golf')?'Golf':models[0]);if(wanted&&models.includes(wanted))$('model').value=wanted;populateGenerations()}
function populateGenerations(preferredId){const make=$('make').value,model=$('model').value;const list=[...vehicleDB,...userCars].filter(v=>v.make===make&&v.model===model);$('generation').innerHTML=list.map(v=>`<option value="${escapeHtml(v.id)}">${escapeHtml(v.gen)}</option>`).join('');const wanted=preferredId||list[0]?.id;if(wanted&&list.some(v=>v.id===wanted))$('generation').value=wanted;chooseGeneration()}
function chooseGeneration(){const id=$('generation').value;selectedVehicle=[...vehicleDB,...userCars].find(v=>v.id===id)||null;loadVehicle()}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function loadVehicle(){const v=selectedVehicle;if(!v)return;const op=v.options[v.base||0];const candidate=v.options[Math.min((v.base||0)+1,v.options.length-1)]||op;setVal('b',{...op,pcd:v.pcd,cb:v.cb,bolt:v.bolt});setVal('n',{...candidate,pcd:v.pcd,cb:v.cb,bolt:v.bolt});$('setName').value=`${v.model} · ${v.gen.split('·').slice(0,2).join(' ').trim()}`;$('vehicleMeta').innerHTML=`<b>${escapeHtml(v.make)} ${escapeHtml(v.model)}</b> · ${escapeHtml(v.gen)}<br>Кузов: ${escapeHtml(v.bodyLabel||bodyLabel(v.shape||'hatchback'))} · PCD ${escapeHtml(v.pcd||'не задан')}, ЦО ${v.cb?f(v.cb,1)+' мм':'не задано'}, ${escapeHtml(v.bolt||'крепёж требует проверки')}<br><small>${escapeHtml(v.note||'Размеры справочные; сверяйте с документами автомобиля.')} Источник: ${escapeHtml(v.source||'не указан')}.</small>`;$('dataStatus').className='status-pill warn';$('dataStatus').innerHTML='<i class="dot"></i> Сверить по VIN / CoC';$('presetList').innerHTML=v.options.map((o,i)=>`<button class="preset-option" data-opt="${i}"><span>${escapeHtml(o.label)}</span><span>${escapeHtml(o.source)}</span></button>`).join('');$('presetList').querySelectorAll('[data-opt]').forEach(btn=>btn.addEventListener('click',()=>{const o=v.options[+btn.dataset.opt];const data={...o,pcd:v.pcd,cb:v.cb,bolt:v.bolt};if(currentTab==='base')setVal('b',data);else setVal('n',data);notify('Размеры применены к '+(currentTab==='base'?'исходному':'новому')+' комплекту')}));render()}
$('make').addEventListener('change',populateModels);$('model').addEventListener('change',()=>populateGenerations());$('generation').addEventListener('change',chooseGeneration);
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{currentTab=b.dataset.tab;document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===b));$('baseFields').classList.toggle('hidden',currentTab!=='base');$('candidateFields').classList.toggle('hidden',currentTab!=='candidate');$('editTag').textContent=currentTab==='base'?'ИСХОДНЫЙ':'НОВЫЙ'}));
function drawWheel(){const c=$('wheelCanvas'),rect=c.getBoundingClientRect();if(!rect.width)return;const dpr=Math.min(devicePixelRatio||1,2);c.width=Math.round(rect.width*dpr);c.height=Math.round(rect.height*dpr);const ctx=c.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);const w=rect.width,h=rect.height;ctx.clearRect(0,0,w,h);const v=wheelTarget==='base'?val('b'):val('n');if(!valid(v))return;const d=calc(v);let faceR=Math.min(h*.36,w*.28)*zoom;let tireW=Math.max(25,Math.min(66,(v.w/250)*58))*zoom;let angle=wheelAngle*Math.PI/180;let squeeze=Math.max(.16,Math.abs(Math.cos(angle)));let depth=Math.sin(angle);let centerX=w*.5+depth*faceR*.22,centerY=h*.49;let sideShift=depth*tireW*.55;let rimR=faceR*(d.rim/d.dia);let beadR=rimR*.97;
// Ground shadow
ctx.save();ctx.fillStyle='#0008';ctx.beginPath();ctx.ellipse(w*.5,h*.86,faceR*.86,12,0,0,Math.PI*2);ctx.fill();ctx.restore();
// Tire barrel and far-side edge
ctx.save();ctx.translate(centerX-sideShift*.25,centerY);ctx.scale(squeeze,1);const tireGrad=ctx.createLinearGradient(-faceR,0,faceR,0);tireGrad.addColorStop(0,'#101820');tireGrad.addColorStop(.25,'#374451');tireGrad.addColorStop(.52,'#171f28');tireGrad.addColorStop(1,'#050a0f');ctx.fillStyle=tireGrad;ctx.strokeStyle='#697987';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,faceR,faceR,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore();
// Tire outer sidewall face with raised rings
ctx.save();ctx.translate(centerX+sideShift*.45,centerY);ctx.scale(squeeze,1);let tg=ctx.createRadialGradient(-faceR*.25,-faceR*.3,faceR*.12,0,0,faceR);tg.addColorStop(0,'#424e5b');tg.addColorStop(.55,'#202b35');tg.addColorStop(1,'#090f15');ctx.fillStyle=tg;ctx.beginPath();ctx.ellipse(0,0,faceR,faceR,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#81909b';ctx.lineWidth=2;ctx.stroke();for(let k=0;k<3;k++){ctx.beginPath();ctx.ellipse(0,0,faceR*(.94-k*.026),faceR*(.94-k*.026),0,0,Math.PI*2);ctx.strokeStyle=`rgba(135,151,164,${.22-k*.045})`;ctx.lineWidth=1;ctx.stroke()}ctx.restore();
// Tread ribs along circumference
ctx.save();ctx.translate(centerX,centerY);ctx.scale(squeeze,1);ctx.strokeStyle='#72808d55';ctx.lineWidth=2;for(let i=0;i<42;i++){let a=i*Math.PI*2/42;let x1=Math.cos(a)*faceR*.965,y1=Math.sin(a)*faceR*.965,x2=Math.cos(a)*faceR*.995,y2=Math.sin(a)*faceR*.995;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}ctx.restore();
// Rim face
ctx.save();ctx.translate(centerX+sideShift*.53,centerY);ctx.scale(squeeze,1);let metal=wheelColor;let rimGrad=ctx.createLinearGradient(-rimR,-rimR,rimR,rimR);rimGrad.addColorStop(0,lighten(metal,45));rimGrad.addColorStop(.35,metal);rimGrad.addColorStop(.7,darken(metal,28));rimGrad.addColorStop(1,lighten(metal,12));ctx.fillStyle=rimGrad;ctx.beginPath();ctx.ellipse(0,0,rimR,rimR,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#d9e3e9';ctx.lineWidth=Math.max(2,faceR*.016);ctx.stroke();ctx.fillStyle='#0c141d';ctx.beginPath();ctx.ellipse(0,0,beadR*.9,beadR*.9,0,0,Math.PI*2);ctx.fill();
// spokes
let count=wheelStyle==='five'?5:wheelStyle==='ten'?10:wheelStyle==='mesh'?20:7;let hub=rimR*.22, outer=rimR*.83;for(let i=0;i<count;i++){let a=i*Math.PI*2/count+(wheelStyle==='turbine'?-.2:0);ctx.save();ctx.rotate(a);let grad=ctx.createLinearGradient(0,-hub,0,-outer);grad.addColorStop(0,lighten(metal,52));grad.addColorStop(.45,metal);grad.addColorStop(1,darken(metal,30));ctx.fillStyle=grad;ctx.strokeStyle='#d8e1e955';ctx.lineWidth=1;


/* ===== app-05.js ===== */
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


/* ===== app-06.js ===== */
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


/* ===== app-07.js ===== */
const hub=+(vehicle.cb||B.cb),bore=+N.cb;let boreState='warn',boreText='Не задано',boreDesc='Проверьте диаметр ступицы и отверстия диска.';if(hub>0&&bore>0){if(Math.abs(hub-bore)<.15){boreState='good';boreText='Совпадает';boreDesc=`Ступица и центральное отверстие: около ${f(hub,1)} мм.`}else if(bore>hub){boreState='warn';boreText='Нужны центровочные кольца';boreDesc=`Отверстие диска больше ступицы на ${f(bore-hub)} мм. Нужны подходящие кольца.`}else{boreState='bad';boreText='Диск не сядет на ступицу';boreDesc=`Отверстие диска меньше ступицы на ${f(hub-bore)} мм.`}}checks.push({title:'Центральное отверстие',value:boreText,state:boreState,desc:boreDesc});
const bolt=(N.bolt||'').toLowerCase(),carBolt=(vehicle.bolt||B.bolt||'').toLowerCase();let boltState=!bolt||!carBolt?'warn':bolt===carBolt?'good':'warn';checks.push({title:'Крепёж / резьба',value:boltState==='good'?'Совпадает':boltState==='warn'?'Проверить':'Не совпадает',state:boltState,desc:`Автомобиль: ${carBolt||'не задано'} · комплект: ${bolt||'не задано'}. Учитывайте тип болта/гайки, длину и посадочное место.`});
const D=calc(B),E=calc(N),outerRim=E.outer-D.outer,innerRim=E.inner-D.inner;checks.push({title:'Положение обода по ET',value:`наружу ${sg(outerRim)} мм`,state:Math.abs(outerRim)>15?'warn':'good',desc:`Внутренняя кромка: ${sg(innerRim)} мм к подвеске относительно исходного диска. Это геометрия обода, не проверка арки.`});
checks.push({title:'Тормозной суппорт',value:'Нужна проверка шаблоном',state:'warn',desc:'PCD, J и ET не описывают форму спиц и внутренний профиль диска. Используйте шаблон тормозов или физическую примерку.'});
$('compatChecks').innerHTML=checks.map(c=>`<div class="check-card"><div class="check-top"><strong>${c.title}</strong><span class="status-pill ${c.state==='good'?'':c.state}"><i class="dot"></i>${c.value}</span></div><p>${c.desc}</p></div>`).join('')}
function clearance(B,N){const b=calc(B),n=calc(N);const dET=N.et-B.et,deltaWidth=(N.w-B.w)+10*(N.j-B.j);const outer=deltaWidth/2-dET,inner=deltaWidth/2+dET,top=(n.dia-b.dia)/2;const items=[['До стойки / подвески',$('gapInner').value,inner],['До кромки крыла',$('gapOuter').value,outer],['До арки сверху',$('gapTop').value,top]];let html='';items.forEach(([label,input,move])=>{if(input==='')return;let remain=+input-move,state=remain<0?'bad':remain<5?'warn':'good',word=remain<0?'Возможен контакт':remain<5?'Малый запас':'Расчётный остаток';html+=`<div class="result-line"><span>${label}: ${f(input)} мм исходно · смещение ${sg(move)} мм</span><b class="${state==='bad'?'negative':state==='good'?'positive':'warning'}">${word}: ${f(remain)} мм</b></div>`});
const brake=$('gapBrake').value;if(brake!=='')html+=`<div class="result-line"><span>До суппорта: введённый замер</span><b class="warning">${f(+brake)} мм · нужна проверка формы диска</b></div>`;if(!html)html='<div class="result-line"><span>Заполните измеренные зазоры</span><b>—</b></div>';$('clearanceResults').innerHTML=html}
function render(){const B=val('b'),N=val('n');if(!valid(B)||!valid(N))return;const b=calc(B),n=calc(N),dd=n.dia-b.dia,dp=dd/b.dia*100,sp=+( $('speedValue')?.value || 100),actual=sp*n.dia/b.dia,outer=n.outer-b.outer,inner=n.inner-b.inner;
$('baseSize').textContent=`${B.w}/${B.a} R${B.d}`;$('newSize').textContent=`${N.w}/${N.a} R${N.d}`;$('baseRim').textContent=`${B.j}J · ET${B.et}`;$('newRim').textContent=`${N.j}J · ET${N.et}`;$('baseDia').textContent=`Ø ${f(b.dia)} мм`;$('newDia').textContent=`Ø ${f(n.dia)} мм`;$('baseSide').textContent=`Боковина ${f(b.side)} мм`;$('newSide').textContent=`Боковина ${f(n.side)} мм`;
$('mDia').textContent=sg(dd)+' мм';$('mDia').className=dd>0?'negative':dd<0?'positive':'neutral';$('mDiaPct').textContent=sg(dp,2)+'%';$('mClear').textContent=sg(dd/2)+' мм';$('mClear').className=dd>0?'negative':dd<0?'positive':'neutral';$('mSpeed').textContent=f(actual,1)+' км/ч';$('mOffset').textContent=sg(outer)+' мм';$('mOffset').className=Math.abs(outer)>10?'negative':'neutral';
const rows=[['tDia',b.dia,n.dia,n.dia-b.dia],['tSide',b.side,n.side,n.side-b.side],['tCirc',b.circ,n.circ,n.circ-b.circ],['tRim',b.rimW,n.rimW,n.rimW-b.rimW],['tOuter',b.outer,n.outer,n.outer-b.outer],['tInner',b.inner,n.inner,b.inner-n.inner]];rows.forEach(([id,x,y,z])=>{$(id+'B').textContent=f(x)+' мм';$(id+'N').textContent=f(y)+' мм';$(id+'D').textContent=sg(z)+' мм'});compatibility(B,N);clearance(B,N);drawWheel();drawTechnical();drawCar()}
['bW','bA','bD','bJ','bET','bPCD','bCB','bBolt','nW','nA','nD','nJ','nET','nPCD','nCB','nBolt','gapInner','gapOuter','gapTop','gapBrake'].forEach(id=>$(id).addEventListener('input',render));
$('copyBase').addEventListener('click',()=>{setVal('n',val('b'));$('setName').value='Копия исходного'});
$('saveSet').addEventListener('click',()=>{const v=val('n');if(!valid(v)){notify('Проверьте размеры');return}const entry={id:Date.now(),name:$('setName').value.trim()||'Новый комплект',...v,created:new Date().toLocaleString('ru-RU')};saved.unshift(entry);saved=saved.slice(0,20);localStorage.setItem('wheellab_saved_sets',JSON.stringify(saved));renderSaved();notify('Комплект сохранён в гараж')});
function renderSaved(){const list=$('savedList');if(!saved.length){list.innerHTML='<div class="empty">Пока нет сохранённых конфигураций. Добавьте текущий комплект в гараж.</div>';$('savedCompare').innerHTML='<div class="empty">Сохранённые варианты появятся здесь.</div>';return}list.innerHTML=saved.map(s=>`<div class="saved-item"><div><strong>${escapeHtml(s.name)}</strong><small>${s.w}/${s.a} R${s.d} · ${s.j}J ET${s.et} · PCD ${escapeHtml(s.pcd||'—')}</small></div><div class="saved-actions"><button class="btn small" data-load="${s.id}">Загрузить</button><button class="btn small danger" data-del="${s.id}">Удалить</button></div></div>`).join('');list.querySelectorAll('[data-load]').forEach(b=>b.addEventListener('click',()=>{const s=saved.find(x=>x.id==b.dataset.load);setVal('n',s);$('setName').value=s.name;currentTab='candidate';document.querySelector('[data-tab="candidate"]').click();notify('Комплект загружен')}));list.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click',()=>{saved=saved.filter(x=>x.id!=b.dataset.del);localStorage.setItem('wheellab_saved_sets',JSON.stringify(saved));renderSaved()}));
const cmp=saved.slice(0,5);let html='<table><thead><tr><th>Параметр</th><th>Исходный</th>'+cmp.map(s=>`<th>${escapeHtml(s.name)}</th>`).join('')+'</tr></thead><tbody>';const base=val('b');const values=[['Шина',v=>`${v.w}/${v.a} R${v.d}`,base],['Диск',v=>`${v.j}J ET${v.et}`,base],['Ø шины',v=>f(calc(v).dia)+' мм',base],['PCD',v=>v.pcd||'—',base],['ЦО',v=>v.cb?f(v.cb)+' мм':'—',base]];values.forEach(([label,fn,b])=>{html+=`<tr><td>${label}</td><td>${fn(b)}</td>${cmp.map(s=>`<td>${fn(s)}</td>`).join('')}</tr>`});html+='</tbody></table>'; $('savedCompare').innerHTML=html}
$('exportJson').addEventListener('click',()=>download('wheellab-garage.json',JSON.stringify({saved,customCars:userCars},null,2),'application/json'));
$('importJson').addEventListener('click',()=>$('importFile').click());


/* ===== app-08.js ===== */
$('importFile').addEventListener('change',async e=>{const file=e.target.files&&e.target.files[0];if(!file)return;try{const data=JSON.parse(await file.text());if(!data||!Array.isArray(data.saved)||!Array.isArray(data.customCars))throw new Error('bad schema');saved=data.saved.filter(x=>x&&Number.isFinite(+x.w)&&Number.isFinite(+x.d)).slice(0,100);const imported=data.customCars.filter(x=>x&&x.id&&x.make&&x.model&&Array.isArray(x.options)).slice(0,200);userCars.splice(0,userCars.length,...imported);localStorage.setItem('wheellab_saved_sets',JSON.stringify(saved));localStorage.setItem('wheellab_custom_cars',JSON.stringify(userCars));populateMakes();renderSaved();notify('Гараж и пользовательские авто импортированы');}catch(err){notify('Не удалось импортировать этот JSON');}finally{e.target.value='';}});
$('exportCsv').addEventListener('click',()=>{const B=calc(val('b')),N=calc(val('n'));const rows=[['Параметр','Исходный','Новый','Разница'],['Шина',`${B.w}/${B.a} R${B.d}`,`${N.w}/${N.a} R${N.d}`,''],['Диск',`${B.j}J ET${B.et}`,`${N.j}J ET${N.et}`,''],['Диаметр, мм',f(B.dia),f(N.dia),f(N.dia-B.dia)],['Боковина, мм',f(B.side),f(N.side),f(N.side-B.side)],['Обод, мм',f(B.rimW),f(N.rimW),f(N.rimW-B.rimW)],['Наружная кромка, мм',f(B.outer),f(N.outer),f(N.outer-B.outer)],['Внутренняя кромка, мм',f(B.inner),f(N.inner),f(N.inner-B.inner)]];download('wheellab-comparison.csv','\ufeff'+rows.map(r=>r.map(x=>'"'+String(x).replace(/"/g,'""')+'"').join(';')).join('\r\n'),'text/csv;charset=utf-8')});
function download(name,data,type){const blob=new Blob([data],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$('print').addEventListener('click',()=>window.print());
$('addCar').addEventListener('click',()=>{const make=$('cMake').value.trim(),model=$('cModel').value.trim(),gen=$('cGen').value.trim(),spec={w:+$('cW').value,a:+$('cA').value,d:+$('cD').value,j:+$('cJ').value,et:+$('cET').value};if(!make||!model||!gen||!valid(spec)){notify('Заполните марку, модель, поколение и корректные размеры');return}const shape=bodyShape(make,model,gen);const v={id:'custom-'+Date.now(),make,model,gen,pcd:$('cPCD').value.trim(),cb:+$('cCB').value||null,bolt:$('cBolt').value.trim(),base:0,shape,bodyLabel:bodyLabel(shape),confidence:'Пользовательский профиль',note:'Данные введены пользователем.',source:'Пользовательская запись',options:[{label:`${spec.w}/${spec.a} R${spec.d} · ${spec.j}J ET${spec.et}`, ...spec,source:'пользователь'}]};userCars.push(v);localStorage.setItem('wheellab_custom_cars',JSON.stringify(userCars));populateMakes();$('make').value=make;populateModels();$('model').value=model;populateGenerations(v.id);notify('Автомобиль добавлен в справочник')});
function init(){$('profileCount').textContent=`${vehicleDB.length} профилей`;populateMakes();renderSaved();window.addEventListener('resize',()=>{drawWheel();drawTechnical();drawCar()});}
init();
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')) navigator.serviceWorker.register('./sw.js').catch(()=>{});
