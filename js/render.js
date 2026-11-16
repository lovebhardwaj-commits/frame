"use strict";
/* Rendering: one function draws a layer exactly as the export does, so preview = output. */
const _ic=new Map();
function IMG(src){if(!src)return null;if(typeof src!=="string")return src;let e=_ic.get(src);if(!e){e={im:new Image(),ok:false};if(src.indexOf("data:")!==0)e.im.crossOrigin="anonymous";e.im.onload=()=>{e.ok=true;requestRender()};e.im.onerror=()=>{if(!e.retry){e.retry=true;const im=new Image();im.onload=()=>{e.im=im;e.ok=true;e.taint=true;requestRender()};im.src=src}};e.im.src=src;_ic.set(src,e)}return e.ok?e.im:null}
const _ko=new WeakMap();
/* simulated background removal for uploaded photos: keys out the corner colour */
function keyOut(im){if(_ko.has(im))return _ko.get(im);let out=im;try{const iw=im.naturalWidth||im.width,ih=im.naturalHeight||im.height,w=Math.min(700,iw),hh=Math.round(w*ih/iw),cv=document.createElement("canvas");cv.width=w;cv.height=hh;const x=cv.getContext("2d");x.drawImage(im,0,0,w,hh);const d=x.getImageData(0,0,w,hh),p=d.data;const cs=[[2,2],[w-3,2],[2,hh-3],[w-3,hh-3]].map(v=>{const i=(v[1]*w+v[0])*4;return[p[i],p[i+1],p[i+2]]});const k=[0,1,2].map(i=>cs.reduce((s,v)=>s+v[i],0)/4);for(let i=0;i<p.length;i+=4){const dd=Math.abs(p[i]-k[0])+Math.abs(p[i+1]-k[1])+Math.abs(p[i+2]-k[2]);if(dd<36)p[i+3]=0;else if(dd<90)p[i+3]=Math.round(p[i+3]*(dd-36)/54)}x.putImageData(d,0,0);out=cv}catch(e){}_ko.set(im,out);return out}
function prodImg(p,l){if(!p)return null;if(typeof ensureArt==="function")ensureArt(p);const n=l.imgNum|0;let s=p.images&&p.images[n],cut=p.cut&&p.cut[n];if(!s&&l.backup!=="none"){s=p.images&&p.images[0];cut=p.cut&&p.cut[0]}if(!s)return null;if(l.bgRemove&&cut)return cut;const im=IMG(s);if(!im)return null;return l.bgRemove?keyOut(im):im}
function drawFit(c,im,x,y,w,h,cover){const iw=im.naturalWidth||im.width,ih=im.naturalHeight||im.height;if(!iw||!ih)return;const s=cover?Math.max(w/iw,h/ih):Math.min(w/iw,h/ih),dw=iw*s,dh=ih*s;c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.drawImage(im,x+(w-dw)/2,y+(h-dh)/2,dw,dh);c.restore()}
function fieldVal(p,f){if(!p)return"";if(f==="price")return money(p.price,p.currency);if(f==="current_price")return money(p.sale_price||p.price,p.currency);return p[f]==null?"":String(p[f])}
function layerText(l,p){return l.type==="field"?fieldVal(p,l.field):(l.text||"")}
/* conditional display, evaluated against the preview product */
function visible(l,p){const c=l.cond;if(!c||!p)return true;const raw=c.attr==="current_price"?(p.sale_price||p.price):p[c.attr];const v=raw==null?"":String(raw),t=String(c.value==null?"":c.value),num=x=>parseFloat(String(x).replace(/[^0-9.\-]/g,""));switch(c.op){case"eq":return v.toLowerCase()===t.toLowerCase();case"neq":return v.toLowerCase()!==t.toLowerCase();case"contains":return v.toLowerCase().indexOf(t.toLowerCase())>=0;case"gt":return num(v)>num(t);case"lt":return num(v)<num(t);case"set":return v!=="";case"unset":return v===""}return true}
function setFont(c,l){c.font=(l.italic?"italic ":"")+(l.bold?700:400)+" "+l.size+"px "+fontCss(l.font)}
function wrapLines(c,text,maxW){const out=[];String(text).split("\n").forEach(par=>{let line="";par.split(/\s+/).forEach(wd=>{if(!wd)return;const t=line?line+" "+wd:wd;if(!line||c.measureText(t).width<=maxW)line=t;else{out.push(line);line=wd}});out.push(line)});return out}
function drawText(c,l,str,w,h){setFont(c,l);const lh=l.size*1.2,lines=wrapLines(c,str,w),fx=l.fx||{},al=l.align||"left",ax=al==="center"?w/2:al==="right"?w:0;c.textBaseline="alphabetic";c.textAlign=al;let maxw=0;
lines.forEach((t,i)=>{const y=i*lh+l.size*.98,tw=c.measureText(t).width,x0=ax-(al==="center"?tw/2:al==="right"?tw:0);maxw=Math.max(maxw,tw);
if(fx.hl&&t){c.fillStyle=fx.hl;c.fillRect(x0-l.size*.14,y-l.size*.86,tw+l.size*.28,l.size*1.12)}
if(fx.shadow){c.shadowColor="rgba(0,0,0,.38)";c.shadowBlur=l.size*.14;c.shadowOffsetY=l.size*.05}
if(fx.outline){c.lineJoin="round";c.lineWidth=l.size*.12;c.strokeStyle=fx.outline;c.strokeText(t,ax,y)}
c.fillStyle=l.color;c.fillText(t,ax,y);c.shadowColor="transparent";c.shadowBlur=0;c.shadowOffsetY=0;
if(l.strike&&t)c.fillRect(x0,y-l.size*.32,tw,Math.max(2,l.size*.07))});
l._ov=!!str&&(lines.length*lh>h+l.size*.3||maxw>w+2)}
function _ph(c,w,h,t){c.save();c.fillStyle="rgba(120,120,135,.12)";c.fillRect(0,0,w,h);c.setLineDash([10,8]);c.strokeStyle="rgba(120,120,135,.6)";c.lineWidth=2;c.strokeRect(1,1,w-2,h-2);c.fillStyle="rgba(90,90,105,.9)";c.font="600 "+Math.max(14,Math.min(28,w*.07))+"px Inter,sans-serif";c.textAlign="center";c.textBaseline="middle";c.fillText(t,w/2,h/2);c.restore()}
function drawLayer(c,l,p,H,o){o=o||{};
if(l.type==="bg"){if(l.grad){const g=c.createLinearGradient(0,0,l.gdir==="h"?W:0,l.gdir==="h"?0:H);g.addColorStop(0,l.grad[0]);g.addColorStop(1,l.grad[1]);c.fillStyle=g}else c.fillStyle=l.color;c.fillRect(0,0,W,H);return}
c.save();c.translate(l.x+l.w/2,l.y+l.h/2);if(l.angle)c.rotate(l.angle*Math.PI/180);c.translate(-l.w/2,-l.h/2);c.globalAlpha*=(l.opacity==null?100:l.opacity)/100;
if(l.type==="product"){const im=prodImg(p,l);if(im)drawFit(c,im,0,0,l.w,l.h,l.crop);else if(!o.exporting)_ph(c,l.w,l.h,"Product image "+(l.imgNum|0))}
else if(l.type==="image"){const im=IMG(l.src);if(im)c.drawImage(im,0,0,l.w,l.h);else if(!o.exporting)_ph(c,l.w,l.h,l.src?"Loading\u2026":"Add an image")}
else if(l.type==="shape"){fillShape(c,l.shape,l.w,l.h,l.color)}
else if(l.type==="sticker"){const s=STK[l.sticker];if(s)s.d(c,l.w,l.h,Object.assign({},s.p,l.p))}
else drawText(c,l,layerText(l,p),l.w,l.h);
c.restore()}
/* o: scale, transparent, only (layer id), showAll (ignore conditions), exporting */
function renderDoc(c,ls,H,p,o){o=o||{};c.save();if(o.scale)c.scale(o.scale,o.scale);if(!o.transparent){c.fillStyle="#ffffff";c.fillRect(0,0,W,H)}for(const l of ls){if(l.hidden)continue;if(o.only&&l.id!==o.only)continue;if(!o.showAll&&!visible(l,p))continue;drawLayer(c,l,p,H,o)}c.restore()}
/* fit and legibility checks Meta's editor does not run */
function checks(ls,H,p,r){const out=[],sz=SAFE[r]||[0,0];for(const l of ls){if(l.hidden||l.type==="bg")continue;const nm=l.name;
if(l.type==="image"&&!l.src)out.push({id:l.id,m:nm+": add an image to this layer"});
if((l.type==="text"||l.type==="field")&&l._ov&&visible(l,p))out.push({id:l.id,m:nm+": text is larger than its box for this product"});
if(l.type==="field"&&p&&!fieldVal(p,l.field)&&!l.cond)out.push({id:l.id,m:nm+": this product has no "+FIELDS[l.field].toLowerCase()+". Add a condition, or it shows empty"});
if(l.x+l.w<8||l.y+l.h<8||l.x>W-8||l.y>H-8)out.push({id:l.id,m:nm+": sits outside the canvas"});
if(sz[0]&&l.type!=="product"&&l.type!=="shape"&&!(l.w>=W*.9&&l.h>=H*.5)&&(l.y<H*sz[0]-2||l.y+l.h>H*(1-sz[1])+2))out.push({id:l.id,m:nm+": overlaps the Stories and Reels interface zone"});
if(FNOTE[l.font])out.push({id:l.id,m:nm+": "+l.font+" is a Meta-only font, previewed here with a stand-in"})}
return out}
function ensureFonts(ls){if(!document.fonts||!document.fonts.load)return;const seen={};ls.forEach(l=>{if(l.font&&!seen[l.font+l.bold+l.italic]){seen[l.font+l.bold+l.italic]=1;try{document.fonts.load((l.italic?"italic ":"")+(l.bold?700:400)+" 20px "+fontCss(l.font)).then(()=>requestRender())}catch(e){}}})}
