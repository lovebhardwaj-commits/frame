"use strict";
/* Image Templates Studio — core: Meta constants, state, helpers.
   Canvas units match Meta Commerce Manager: 1024 wide; 1:1 = 1024 high. */
const W=1024,RATIOS={"1:1":1024,"4:5":1280,"9:16":1820},RKEYS=["1:1","4:5","9:16"];
const RLABEL={"1:1":"Square feed","4:5":"Feed","9:16":"Stories and Reels"};
const SAFE={"1:1":[0,0],"4:5":[0,0],"9:16":[.14,.2]};
const FONTS=["Arial","Barlow","Bebas Neue","Cabin","Comfortaa","DM Serif Display","EB Garamond","Fira Sans","Lato","Lora","Merriweather","Montserrat","Noto Sans","Noto Serif","Open Sans","Optimistic","Optimistic Condensed","Optimistic Dark Mode","Oswald","Playfair Display","Poppins","Quicksand","Raleway","Roboto","Verdana","Work Sans"];
const SERIFS=["DM Serif Display","EB Garamond","Lora","Merriweather","Noto Serif","Playfair Display"];
const FSTACK={Arial:"Arial,'Liberation Sans',Helvetica,sans-serif",Verdana:"Verdana,'DejaVu Sans',Geneva,sans-serif",Optimistic:"Inter,'Helvetica Neue',Arial,sans-serif","Optimistic Condensed":"'Barlow Condensed',Oswald,Arial,sans-serif","Optimistic Dark Mode":"Inter,'Helvetica Neue',Arial,sans-serif"};
const FNOTE={Optimistic:1,"Optimistic Condensed":1,"Optimistic Dark Mode":1};
const fontCss=f=>FSTACK[f]||("'"+f+"',"+(SERIFS.includes(f)?"serif":"sans-serif"));
const FIELDS={title:"Title",brand:"Brand",description:"Description",price:"Price",current_price:"Current price",custom_label_0:"Custom label 0",custom_label_1:"Custom label 1",custom_label_2:"Custom label 2",custom_label_3:"Custom label 3",custom_label_4:"Custom label 4"};
const CATTR={brand:"Brand",title:"Title",price:"Price",current_price:"Current price",sale_price:"Sale price",custom_label_0:"Custom label 0",custom_label_1:"Custom label 1",custom_label_2:"Custom label 2",custom_label_3:"Custom label 3",custom_label_4:"Custom label 4"};
const COPS=[["eq","equals"],["neq","does not equal"],["contains","contains"],["gt","is greater than"],["lt","is less than"],["set","is set"],["unset","is not set"]];
const TLABEL={product:"Product",text:"Text",field:"Catalog field",image:"Image",shape:"Shape",bg:"Background",sticker:"Sticker"};

const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
/* E(tag, attrs, ...children) — tiny DOM builder */
function E(t,a){const e=document.createElement(t);if(a)for(const n in a){const v=a[n];if(v==null||v===false)continue;if(n==="class")e.className=v;else if(n==="style")e.style.cssText=v;else if(n==="html")e.innerHTML=v;else if(n.slice(0,2)==="on")e.addEventListener(n.slice(2),v);else if(n==="value")e.value=v;else if(n==="checked")e.checked=!!v;else e.setAttribute(n,v===true?"":v)}
for(let i=2;i<arguments.length;i++){const k=arguments[i];(Array.isArray(k)?k:[k]).forEach(c=>{if(c!=null&&c!==false)e.append(c.nodeType?c:document.createTextNode(String(c)))})}return e}
const uid=()=>Math.random().toString(36).slice(2,9);
const clone=o=>JSON.parse(JSON.stringify(o));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}};
function toast(msg,kind){const t=E("div",{class:"toast"+(kind==="er"?" er":"")},msg);$("#toasts").append(t);setTimeout(()=>t.remove(),3200)}
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

/* colour helpers */
const hx=c=>{c=String(c||"#000").replace("#","");if(c.length===3)c=c.split("").map(x=>x+x).join("");const n=parseInt(c.slice(0,6),16)||0;return[n>>16&255,n>>8&255,n&255]};
const toHex=(r,g,b)=>"#"+[r,g,b].map(v=>clamp(Math.round(v),0,255).toString(16).padStart(2,"0")).join("");
const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return toHex(A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,A[2]+(B[2]-A[2])*t)};
const tint=(c,t)=>mix(c,"#ffffff",t),shade=(c,t)=>mix(c,"#000000",t);
const rgba=(c,a)=>{const v=hx(c);return"rgba("+v[0]+","+v[1]+","+v[2]+","+a+")"};
const lum=c=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};const v=hx(c);return .2126*f(v[0])+.7152*f(v[1])+.0722*f(v[2])};
const contrast=(a,b)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const inkOn=(bg,pref)=>pref&&contrast(pref,bg)>=4.5?pref:(contrast("#ffffff",bg)>=contrast("#16151e",bg)?"#ffffff":"#16151e");
const money=(v,cur)=>{if(v==null||v==="")return"";const n=Number(String(v).replace(/[^0-9.]/g,""));if(!isFinite(n)||String(v).replace(/[^0-9]/g,"")==="")return String(v);const s={INR:"\u20B9",USD:"$",EUR:"\u20AC",GBP:"\u00A3"}[cur||"INR"]||"";return s+n.toLocaleString("en-IN",{maximumFractionDigits:n%1?2:0})};

/* state */
const S={view:"home",doc:null,ratio:"1:1",sel:null,pi:0,products:[],catalog:"",safe:true,tab:"design",hist:[],hi:-1,dirty:false};
const BRAND=Object.assign({logo:null,c1:"#1a1a2e",c2:"#de8274",font:"Montserrat"},store.get("it_brand",{}));
if(!BRAND.logo){const old=store.get("fs_logo",null);if(typeof old==="string"&&old.indexOf("data:")===0)BRAND.logo=old}

/* layer defaults — text, image and background defaults mirror Meta's editor */
const _TXT={x:162,y:437,w:700,h:150,angle:0,color:"#000000",opacity:100,font:"Verdana",size:80,align:"left",bold:false,italic:false,strike:false};
const DEF={
product:{name:"Product",x:0,y:0,w:W,h:W,angle:0,imgNum:0,backup:"main",bgRemove:false,crop:false},
text:Object.assign({name:"Text",text:"Sample text"},_TXT),
field:Object.assign({name:"Title",field:"title"},_TXT,{size:48}),
image:{name:"Image",x:412,y:462,w:200,h:100,angle:0,src:null},
shape:{name:"Shape",shape:"rect",x:412,y:412,w:200,h:200,angle:0,color:"#0866FF",opacity:100},
bg:{name:"Background",color:"#0866FF"},
sticker:{name:"Sticker",sticker:"pctBurst",x:382,y:382,w:260,h:260,angle:0,opacity:100,p:{}}
};
function mk(type,p){const l=Object.assign({id:uid(),type:type,cond:null,hidden:false},clone(DEF[type]),p||{});["x","y","w","h"].forEach(k=>{if(l[k]!=null)l[k]=Math.round(l[k])});return l}
const layers=()=>S.doc?S.doc.ratios[S.ratio].layers:[];
const docH=()=>RATIOS[S.ratio];
const selLayer=()=>layers().find(l=>l.id===S.sel)||null;
/* native = rebuildable as a Meta layer; otherwise it is exported as a PNG image layer */
const isNative=l=>!(l.type==="sticker"||(l.fx&&(l.fx.outline||l.fx.shadow||l.fx.hl))||(l.type==="bg"&&l.grad));
let requestRender=function(){};
/* late modules: settings (variables), then Meta login. Added after the core scripts have run so its overrides apply. */
document.addEventListener("DOMContentLoaded",()=>{const add=(src,next)=>{const s=document.createElement("script");s.src=src;s.onload=s.onerror=()=>{if(next)next()};document.body.append(s)};add("config.js?v=2",()=>add("js/meta.js?v=2"))});
