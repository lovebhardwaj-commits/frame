"use strict";
/* Catalog preview: sample catalogs with drawn product art, CSV / Shopify import, and the supplementary-feed helper. */
const ART={
bottle(x,c){const g=x.createLinearGradient(210,0,390,0);g.addColorStop(0,shade(c,.18));g.addColorStop(.45,tint(c,.25));g.addColorStop(1,shade(c,.25));x.fillStyle="#2a2a30";x.beginPath();_rr(x,262,96,76,70,10);x.fill();x.fillStyle=shade(c,.3);x.fillRect(272,160,56,34);x.fillStyle=g;x.beginPath();_rr(x,214,188,172,326,34);x.fill();x.fillStyle="rgba(255,255,255,.92)";x.beginPath();_rr(x,236,290,128,150,8);x.fill();x.fillStyle=shade(c,.2);x.fillRect(254,316,92,12);x.fillStyle="rgba(0,0,0,.25)";x.fillRect(254,344,70,7);x.fillRect(254,360,84,7);x.fillRect(254,400,50,7)},
jar(x,c){const g=x.createLinearGradient(180,0,420,0);g.addColorStop(0,shade(c,.2));g.addColorStop(.4,tint(c,.22));g.addColorStop(1,shade(c,.26));x.fillStyle="#c9a24a";x.beginPath();_rr(x,196,168,208,60,12);x.fill();x.fillStyle="rgba(0,0,0,.18)";x.fillRect(196,212,208,10);x.fillStyle=g;x.beginPath();_rr(x,180,222,240,270,42);x.fill();x.fillStyle="rgba(255,255,255,.93)";x.beginPath();_rr(x,208,292,184,124,8);x.fill();x.fillStyle=shade(c,.25);x.fillRect(228,316,110,13);x.fillStyle="rgba(0,0,0,.25)";x.fillRect(228,346,144,7);x.fillRect(228,364,96,7)},
tee(x,c){const g=x.createLinearGradient(0,130,0,490);g.addColorStop(0,tint(c,.12));g.addColorStop(1,shade(c,.18));x.fillStyle=g;x.beginPath();x.moveTo(210,150);x.lineTo(250,130);x.quadraticCurveTo(300,176,350,130);x.lineTo(390,150);x.lineTo(480,220);x.lineTo(430,280);x.lineTo(400,256);x.lineTo(400,490);x.lineTo(200,490);x.lineTo(200,256);x.lineTo(170,280);x.lineTo(120,220);x.closePath();x.fill();x.strokeStyle=shade(c,.32);x.lineWidth=9;x.beginPath();x.moveTo(250,131);x.quadraticCurveTo(300,178,350,131);x.stroke();x.fillStyle="rgba(255,255,255,.85)";x.beginPath();_rr(x,262,250,76,76,10);x.fill()},
shoe(x,c){x.fillStyle="#ffffff";x.beginPath();_rr(x,108,400,396,46,23);x.fill();x.fillStyle="rgba(0,0,0,.12)";x.fillRect(120,428,372,8);const g=x.createLinearGradient(0,250,0,402);g.addColorStop(0,tint(c,.18));g.addColorStop(1,shade(c,.2));x.fillStyle=g;x.beginPath();x.moveTo(120,402);x.bezierCurveTo(120,330,170,300,230,300);x.lineTo(300,250);x.quadraticCurveTo(340,240,350,280);x.quadraticCurveTo(420,350,480,370);x.quadraticCurveTo(505,385,500,402);x.closePath();x.fill();x.fillStyle=tint(c,.5);x.beginPath();x.moveTo(430,358);x.quadraticCurveTo(505,380,500,402);x.lineTo(410,402);x.closePath();x.fill();x.strokeStyle="#ffffff";x.lineWidth=7;x.lineCap="round";[[250,306,300,338],[270,290,322,322],[290,274,340,304]].forEach(v=>{x.beginPath();x.moveTo(v[0],v[1]);x.lineTo(v[2],v[3]);x.stroke()});x.lineCap="butt"},
buds(x,c){x.strokeStyle=shade(c,.35);x.lineWidth=30;x.lineCap="round";x.beginPath();x.arc(300,310,150,Math.PI*1.08,Math.PI*1.92);x.stroke();x.lineCap="butt";const g=x.createLinearGradient(0,280,0,450);g.addColorStop(0,tint(c,.2));g.addColorStop(1,shade(c,.22));[[122,286],[392,286]].forEach(v=>{x.fillStyle=g;x.beginPath();_rr(x,v[0],v[1],86,160,38);x.fill();x.fillStyle="rgba(0,0,0,.28)";x.beginPath();_rr(x,v[0]+(v[0]<300?58:0),v[1]+16,28,128,14);x.fill()})},
mug(x,c){x.strokeStyle=shade(c,.12);x.lineWidth=28;x.beginPath();x.arc(398,336,58,-Math.PI/2.3,Math.PI/2.3);x.stroke();const g=x.createLinearGradient(190,0,390,0);g.addColorStop(0,shade(c,.16));g.addColorStop(.4,tint(c,.2));g.addColorStop(1,shade(c,.24));x.fillStyle=g;x.beginPath();_rr(x,190,222,206,232,28);x.fill();x.fillStyle=shade(c,.45);x.beginPath();x.ellipse(293,226,103,20,0,0,7);x.fill();x.strokeStyle="rgba(120,120,130,.45)";x.lineWidth=8;x.lineCap="round";[250,296,342].forEach((v,i)=>{x.beginPath();x.moveTo(v,190);x.bezierCurveTo(v-16,160,v+16,140,v,110+i*8);x.stroke()});x.lineCap="butt"}
};
function makeArt(p,n,cut){const c=document.createElement("canvas");c.width=c.height=600;const x=c.getContext("2d");const bg=[[tint(p.col,.9),tint(p.col,.76)],[tint(p.col,.62),tint(p.col,.42)],[shade(p.col,.62),shade(p.col,.8)],["#f4f1ec","#e6e0d6"]][n%4];if(!cut){const g=x.createLinearGradient(0,0,0,600);g.addColorStop(0,bg[0]);g.addColorStop(1,bg[1]);x.fillStyle=g;x.fillRect(0,0,600,600)}x.fillStyle="rgba(0,0,0,.13)";x.beginPath();x.ellipse(300,524,160,20,0,0,7);x.fill();const z=[1,1.08,1.25,.92][n%4];x.translate(300,320);x.scale(z,z);if(n%4===1)x.rotate(-.08);x.translate(-300,-320);(ART[p.art]||ART.bottle)(x,p.col);return c}
function ensureArt(p){if(p.art&&!p.images){p.images=[0,1,2,3].map(n=>makeArt(p,n,false));p.cut=[0,1,2,3].map(n=>makeArt(p,n,true))}}
/* title, brand, description, price, sale price, art, colour, label1, label2, label3 */
const CAT_RAW={
beauty:{n:"Beauty and skincare",items:[
["Vitamin C Glow Serum 30 ml","Aurea","Brightening face serum with 10% vitamin C for dull, uneven skin.",899,649,"bottle","#e8963a","10% Vitamin C","Dermat tested","30 ml"],
["Kasturi Turmeric Face Pack - Skin Brightening Ubtan for Tan Removal and Natural Glow","Aurea","Traditional ubtan with wild turmeric and sandalwood.",549,"","jar","#d9a521","100% natural","No parabens","50 g"],
["Rose Hydrating Toner","Petalwork","Alcohol-free toner with rose water and niacinamide.",499,399,"bottle","#d86a8a","Alcohol free","All skin types","120 ml"],
["Overnight Repair Cream","Petalwork","Rich night cream with ceramides and shea butter.",1299,999,"jar","#6a5acd","Ceramides","Night care","50 g"],
["Charcoal Deep Clean Face Wash","Aurea","Gel cleanser that clears oil and pollution without drying.",349,"","bottle","#3a3f4a","Oil control","Daily use","100 ml"],
["SPF 50 Matte Sunscreen","Sunleaf","Lightweight, no white cast, PA++++ protection.",599,479,"bottle","#f0b429","SPF 50","No white cast","50 ml"]]},
fashion:{n:"Fashion and apparel",items:[
["Everyday Cotton Crew Tee","Northloom","Soft 180 GSM combed cotton tee with a relaxed fit.",799,499,"tee","#2e6fd9","100% cotton","Relaxed fit","S to XXL"],
["Street Runner Sneakers","Strideo","Cushioned everyday sneakers with a breathable knit upper.",2999,1999,"shoe","#e04a3f","Cushioned sole","Breathable knit","UK 6 to 11"],
["Oversized Graphic Tee - Limited Drop","Northloom","Heavyweight oversized tee from the monsoon drop.",1199,"","tee","#1f1f24","240 GSM","Oversized","Unisex"],
["Court Classic Low Tops","Strideo","Clean leather-look low tops that go with everything.",2499,1899,"shoe","#f4f4f4","Easy clean","All-day comfort","UK 5 to 11"],
["Linen Blend Summer Tee","Northloom","Breathable linen blend for hot days.",999,749,"tee","#d9b382","Linen blend","Breathable","S to XL"],
["Trail Grip Running Shoes","Strideo","Lugged outsole and rock plate for mixed terrain.",3999,"","shoe","#2f8f5b","Trail grip","Rock plate","UK 6 to 12"]]},
electronics:{n:"Electronics",items:[
["Pulse ANC Wireless Headphones","Voltix","40-hour battery with adaptive noise cancellation.",5999,3999,"buds","#22252d","40 h battery","Adaptive ANC","Fast charge"],
["Pulse Lite On-Ear Headphones","Voltix","Lightweight on-ear headphones with deep bass.",2499,1799,"buds","#3b6fe0","30 h battery","Deep bass","Foldable"],
["Studio Pro Monitor Headphones","Voltix","Flat-response headphones for creators.",8999,"","buds","#c9c9cf","Hi-res audio","Detachable cable","1 year warranty"],
["Kids Safe-Volume Headphones","Voltix","Volume-limited to 85 dB with a durable band.",1499,1199,"buds","#e85d9a","85 dB limit","Durable","Ages 4 to 12"],
["Gaming Headset with Mic","Voltix","7.1 surround sound with a noise-cancelling mic.",3499,2499,"buds","#7c3aed","7.1 surround","Noise-cancelling mic","RGB"]]},
home:{n:"Home and living",items:[
["Stoneware Coffee Mug 350 ml","Hearth & Co","Hand-glazed stoneware mug, microwave safe.",499,349,"mug","#3d7a6a","Hand glazed","Microwave safe","350 ml"],
["Soy Wax Scented Candle - Vanilla","Hearth & Co","40-hour burn time in a reusable glass jar.",799,"","jar","#e9d9b8","40 h burn","Soy wax","200 g"],
["Matte Black Espresso Mug Set","Hearth & Co","Set of two double-wall espresso mugs.",899,699,"mug","#2a2a30","Set of 2","Double wall","90 ml"],
["Terracotta Storage Jar","Hearth & Co","Airtight jar with a bamboo lid for dry storage.",649,499,"jar","#c2643c","Airtight","Bamboo lid","750 ml"],
["Speckled Breakfast Mug","Hearth & Co","Large speckled-glaze mug for long mornings.",599,"","mug","#e7e2d6","Dishwasher safe","Speckled glaze","450 ml"]]},
food:{n:"Food and gourmet",items:[
["Cold Pressed Groundnut Oil 1 L","Mitti Foods","Wood-pressed oil from single-origin groundnuts.",399,349,"bottle","#d9a521","Cold pressed","No additives","1 L"],
["Raw Forest Honey 500 g","Mitti Foods","Unprocessed honey sourced from forest co-operatives.",549,449,"jar","#e0912a","Raw and unfiltered","Lab tested","500 g"],
["Mango Pickle - Homestyle","Mitti Foods","Sun-cured raw mango pickle in mustard oil.",299,"","jar","#c8521e","Homestyle","No preservatives","400 g"],
["Filter Coffee Decoction","Mitti Foods","Ready-to-pour South Indian filter coffee concentrate.",349,279,"bottle","#5a3a22","Ready to pour","Makes 20 cups","250 ml"],
["A2 Cow Ghee 500 ml","Mitti Foods","Bilona-churned ghee from grass-fed A2 cows.",1099,899,"jar","#f0c94a","Bilona method","Grass fed","500 ml"]]},
wellness:{n:"Wellness and ayurveda",items:[
["Ashwagandha Calm Tea","Rootwise","Caffeine-free herbal blend for evenings.",449,349,"jar","#5f8a4a","Caffeine free","25 tea bags","Ayurvedic"],
["Bhringraj Hair Oil 200 ml","Rootwise","Slow-infused oil with bhringraj and amla.",599,449,"bottle","#2f5d3a","Slow infused","No mineral oil","200 ml"],
["Daily Greens Powder","Rootwise","Moringa, spirulina and wheatgrass in one scoop.",1299,"","jar","#3f9a5a","30 servings","No added sugar","Vegan"],
["Immunity Kadha Shots","Rootwise","Tulsi, ginger and giloy in ready-to-drink shots.",399,299,"bottle","#b5651d","Pack of 10","Ready to drink","No preservatives"],
["Sleep Well Gummies","Rootwise","Melatonin-free gummies with chamomile and tagara.",699,549,"jar","#6b5fc4","Melatonin free","30 gummies","Sugar free"]]}
};
function buildCatalog(key){const raw=CAT_RAW[key]||CAT_RAW.beauty;return raw.items.map((r,i)=>{const p={id:key+"_"+(i+1),title:r[0],brand:r[1],description:r[2],price:r[3],sale_price:r[4]||"",currency:"INR",art:r[5],col:r[6],custom_label_1:r[7]||"",custom_label_2:r[8]||"",custom_label_3:r[9]||"",custom_label_4:""};p.custom_label_0=p.sale_price?Math.round((1-p.sale_price/p.price)*100)+"% OFF":"";return p})}
function useCatalog(key){S.catalog=key;S.products=buildCatalog(key);S.pi=0}
function parseCSV(t){const rows=[];let row=[],cur="",q=false;for(let i=0;i<t.length;i++){const ch=t[i];if(q){if(ch==='"'){if(t[i+1]==='"'){cur+='"';i++}else q=false}else cur+=ch}else if(ch==='"')q=true;else if(ch===","){row.push(cur);cur=""}else if(ch==="\n"||ch==="\r"){if(ch==="\r"&&t[i+1]==="\n")i++;row.push(cur);cur="";if(row.some(v=>v!==""))rows.push(row);row=[]}else cur+=ch}row.push(cur);if(row.some(v=>v!==""))rows.push(row);return rows}
/* accepts a Meta catalog feed CSV or a Shopify product export */
function productsFromCSV(t){const rows=parseCSV(t.replace(/^\uFEFF/,""));if(rows.length<2)return[];const hd=rows[0].map(s=>s.trim().toLowerCase().replace(/[\s\/]+/g,"_"));const col=function(){for(let i=0;i<arguments.length;i++){const k=hd.indexOf(arguments[i]);if(k>=0)return k}return-1};
const ix={id:col("id","handle","variant_sku","sku"),title:col("title","name"),brand:col("brand","vendor"),desc:col("description","body_(html)","body_html"),price:col("price"),sale:col("sale_price"),vp:col("variant_price"),vc:col("variant_compare_at_price"),img:col("image_link","image_src","image"),add:col("additional_image_link"),cur:col("currency")};
const num=v=>{const n=parseFloat(String(v||"").replace(/[^0-9.]/g,""));return isFinite(n)?n:""},curOf=v=>{const m=String(v||"").match(/[A-Z]{3}/);return m?m[0]:""};const out=[],by={};
for(let r=1;r<rows.length;r++){const R=rows[r],g=i=>i>=0&&R[i]!=null?String(R[i]).trim():"";const id=g(ix.id)||("row"+r),title=g(ix.title),img=g(ix.img);
if(!title&&by[id]){if(img)by[id].images.push(img);continue}if(!title)continue;
let price=num(g(ix.price)),sale=num(g(ix.sale));if(ix.vp>=0){const vp=num(g(ix.vp)),vc=num(g(ix.vc));if(vc&&vp&&vc>vp){price=vc;sale=vp}else{price=vp||price;sale=""}}
if(sale&&price&&sale>=price)sale="";
const p={id:id,title:title,brand:g(ix.brand),description:g(ix.desc).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,400),price:price,sale_price:sale,currency:g(ix.cur)||curOf(g(ix.price))||"INR",images:[]};
if(img)p.images.push(img);g(ix.add).split(/[,|]/).forEach(u=>{u=u.trim();if(u)p.images.push(u)});
for(let k=0;k<5;k++)p["custom_label_"+k]=g(col("custom_label_"+k));
by[id]=p;out.push(p)}
return out.slice(0,200)}
function csvCell(v){v=String(v==null?"":v);return/[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
/* supplementary feed: computed labels Meta cannot calculate, delivered through custom labels */
function labelsCSV(ps){const tier=n=>n<500?"Under \u20B9500":n<1000?"\u20B9500 to \u20B9999":n<2000?"\u20B91,000 to \u20B91,999":"\u20B92,000 and above";const rows=[["id","custom_label_0","custom_label_1","custom_label_2"]];ps.forEach(p=>{const pr=+p.price||0,sp=+p.sale_price||0,on=sp&&pr&&sp<pr;rows.push([p.id,on?Math.round((1-sp/pr)*100)+"% OFF":"",on?"Save "+money(pr-sp,p.currency):"",tier(sp||pr)])});return rows.map(r=>r.map(csvCell).join(",")).join("\n")}
