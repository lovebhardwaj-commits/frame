"use strict";
/* Shape library at parity with Meta's Shape layer: 8 groups, searchable.
   u(c) builds the path in a unit box (scaled to the layer); px(c,w,h) builds in pixels. */
const _U=pts=>c=>{pts.forEach((p,i)=>c[i?"lineTo":"moveTo"](p[0],p[1]));c.closePath()};
const _reg=(n,rot)=>Array.from({length:n},(_,i)=>{const a=((rot==null?-90:rot)+i*360/n)*Math.PI/180;return[.5+.5*Math.cos(a),.5+.5*Math.sin(a)]});
const _star=(n,inr,rot)=>Array.from({length:n*2},(_,i)=>{const a=((rot==null?-90:rot)+i*180/n)*Math.PI/180,r=i%2?inr:.5;return[.5+r*Math.cos(a),.5+r*Math.sin(a)]});
function _rr(c,x,y,w,h,r){r=Math.max(0,Math.min(r,w/2,h/2));c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function _sp4(c,x,y,w,h,k){const cx=x+w/2,cy=y+h/2;c.moveTo(cx,y);c.quadraticCurveTo(cx+w*k,cy-h*k,x+w,cy);c.quadraticCurveTo(cx+w*k,cy+h*k,cx,y+h);c.quadraticCurveTo(cx-w*k,cy+h*k,x,cy);c.quadraticCurveTo(cx-w*k,cy-h*k,cx,y);c.closePath()}
function _scal(c,cx,cy,R,n){const r=R*Math.sin(Math.PI/n)*1.08,d=R-r*.8;for(let i=0;i<n;i++){const a=i*2*Math.PI/n,x=cx+d*Math.cos(a),y=cy+d*Math.sin(a);c.moveTo(x+r,y);c.arc(x,y,r,0,7)}c.moveTo(cx+d,cy);c.arc(cx,cy,d,0,7)}
const _heart=(t,k)=>c=>{c.moveTo(.5,1);c.bezierCurveTo(-.25*k,.55,.12,-.12,.5,t);c.bezierCurveTo(.88,-.12,1+.25*k,.55,.5,1);c.closePath()};
const _cloud=(a)=>c=>{a.forEach(v=>{c.moveTo(v[0]+v[2],v[1]);c.arc(v[0],v[1],v[2],0,7)})};
const _arrow=[[0,.3],[.6,.3],[.6,0],[1,.5],[.6,1],[.6,.7],[0,.7]];
const _SQ=[[0,0],[1,0],[1,1],[0,1]];
const _SH=[
["rect","Basic shapes","Rectangle",_U(_SQ)],
["round","Basic shapes","Rounded rectangle",null,(c,w,h)=>_rr(c,0,0,w,h,Math.min(w,h)*.18)],
["pill","Basic shapes","Pill",null,(c,w,h)=>_rr(c,0,0,w,h,Math.min(w,h)/2)],
["square","Basic shapes","Square",_U(_SQ)],
["circle","Basic shapes","Circle",c=>{c.moveTo(1,.5);c.arc(.5,.5,.5,0,7)}],
["tri","Basic shapes","Triangle",_U([[.5,0],[1,1],[0,1]])],
["rtri","Basic shapes","Right triangle",_U([[0,0],[1,1],[0,1]])],
["diamond","Basic shapes","Diamond",_U([[.5,0],[1,.5],[.5,1],[0,.5]])],
["para","Basic shapes","Parallelogram",_U([[.25,0],[1,0],[.75,1],[0,1]])],
["trap","Basic shapes","Trapezoid",_U([[.22,0],[.78,0],[1,1],[0,1]])],
["bullet","Basic shapes","Half round",c=>{c.moveTo(0,1);c.lineTo(0,.5);c.bezierCurveTo(0,-.17,1,-.17,1,.5);c.lineTo(1,1);c.closePath()}],
["quarter","Basic shapes","Quarter circle",c=>{c.moveTo(0,0);c.arc(0,1,1,-Math.PI/2,0);c.lineTo(0,1);c.closePath()}],
["arch","Basic shapes","Arch",c=>{c.moveTo(0,1);c.lineTo(0,.5);c.arc(.5,.5,.5,Math.PI,0);c.lineTo(1,1);c.closePath()}],
["line","Basic shapes","Line",_U([[0,.44],[1,.44],[1,.56],[0,.56]])],
["hex","Polygons","Hexagon",_U(_reg(6))],
["pent","Polygons","Pentagon",_U(_reg(5))],
["hexflat","Polygons","Wide hexagon",_U(_reg(6,0))],
["oct","Polygons","Octagon",_U(_reg(8,22.5))],
["star5","Stars","Star",_U(_star(5,.2))],
["star4","Stars","Four-point star",c=>_sp4(c,0,0,1,1,.1)],
["spark2","Stars","Twin sparkle",c=>{_sp4(c,0,.1,.7,.9,.08);_sp4(c,.62,0,.38,.42,.05)}],
["spark3","Stars","Triple sparkle",c=>{_sp4(c,.18,.2,.64,.8,.08);_sp4(c,0,0,.34,.36,.04);_sp4(c,.7,.02,.3,.32,.04)}],
["burst12","Stars","Burst",_U(_star(12,.4))],
["scallop","Stars","Rounded burst",c=>_scal(c,.5,.5,.5,12)],
["starburst","Stars","Starburst",_U(_star(20,.3))],
["arrowr","Arrows","Arrow right",_U(_arrow)],
["pentarrow","Arrows","Pentagon arrow",_U([[0,0],[.7,0],[1,.5],[.7,1],[0,1]])],
["arrowl","Arrows","Arrow left",_U(_arrow.map(p=>[1-p[0],p[1]]).reverse())],
["arrowu","Arrows","Arrow up",_U(_arrow.map(p=>[p[1],1-p[0]]))],
["arrowd","Arrows","Arrow down",_U(_arrow.map(p=>[1-p[1],p[0]]))],
["chevron","Arrows","Chevron",_U([[0,0],[.7,0],[1,.5],[.7,1],[0,1],[.3,.5]])],
["arrowlr","Arrows","Double arrow",_U([[0,.5],[.25,0],[.25,.3],[.75,.3],[.75,0],[1,.5],[.75,1],[.75,.7],[.25,.7],[.25,1]])],
["hexarrow","Arrows","Hexagon label",_U([[.15,0],[.85,0],[1,.5],[.85,1],[.15,1],[0,.5]])],
["curved","Arrows","Curved arrow",c=>{c.moveTo(.05,1);c.quadraticCurveTo(.05,.38,.6,.33);c.lineTo(.6,.08);c.lineTo(1,.46);c.lineTo(.6,.84);c.lineTo(.6,.6);c.quadraticCurveTo(.32,.62,.3,1);c.closePath()}],
["brect","Speech bubbles","Square bubble",_U([[0,0],[1,0],[1,.75],[.42,.75],[.2,1],[.24,.75],[0,.75]])],
["bround","Speech bubbles","Rounded bubble",null,(c,w,h)=>{_rr(c,0,0,w,h*.78,Math.min(w,h)*.16);c.moveTo(w*.22,h*.76);c.lineTo(w*.44,h*.76);c.lineTo(w*.2,h);c.closePath()}],
["boval","Speech bubbles","Oval bubble",c=>{c.moveTo(1,.42);c.ellipse(.5,.42,.5,.42,0,0,7);c.moveTo(.2,.72);c.lineTo(.45,.8);c.lineTo(.14,1);c.closePath()}],
["thought","Speech bubbles","Thought bubble",_cloud([[.3,.42,.22],[.52,.3,.28],[.74,.44,.24],[.5,.52,.26],[.2,.82,.07],[.08,.94,.045]])],
["heart","Hearts","Heart",_heart(.26,1)],
["heart2","Hearts","Soft heart",_heart(.3,.7)],
["heart3","Hearts","Tall heart",_heart(.22,.5)],
["heart4","Hearts","Wide heart",_heart(.34,1.2)],
["ribbon","Banners & ribbons","Ribbon",_U([[0,0],[1,0],[.88,.5],[1,1],[0,1],[.12,.5]])],
["scroll","Banners & ribbons","Scroll banner",_U([[.1,0],[.9,0],[.9,.2],[1,.2],[.94,.6],[1,1],[.78,1],[.78,.8],[.22,.8],[.22,1],[0,1],[.06,.6],[0,.2],[.1,.2]])],
["wave","Banners & ribbons","Wavy flag",c=>{c.moveTo(0,.12);c.bezierCurveTo(.25,-.1,.5,.34,1,.08);c.lineTo(1,.82);c.bezierCurveTo(.5,1.08,.25,.64,0,.9);c.closePath()}],
["bookmark","Banners & ribbons","Bookmark",_U([[0,0],[1,0],[1,1],[.5,.72],[0,1]])],
["play","Banners & ribbons","Pennant",_U([[0,0],[1,.5],[0,1]])],
["frame","Banners & ribbons","Frame",c=>{c.rect(0,0,1,1);c.rect(.12,.12,.76,.76)},null,1],
["crest","Banners & ribbons","Crest",_U([[0,0],[1,0],[1,.68],[.5,1],[0,.68]])],
["tag","Banners & ribbons","Tag",_U([[0,0],[.72,0],[1,.5],[.72,1],[0,1]])],
["chevtag","Banners & ribbons","Chevron tag",_U([[0,0],[.75,0],[1,.5],[.75,1],[0,1],[.22,.5]])],
["hextag","Banners & ribbons","Hexagon tag",_U([[.2,0],[.8,0],[1,.5],[.8,1],[.2,1],[0,.5]])],
["rosette","Banners & ribbons","Award rosette",c=>{_scal(c,.5,.36,.36,14);c.moveTo(.3,.6);c.lineTo(.5,.66);c.lineTo(.4,1);c.lineTo(.3,.86);c.lineTo(.16,.94);c.closePath();c.moveTo(.7,.6);c.lineTo(.84,.94);c.lineTo(.7,.86);c.lineTo(.6,1);c.lineTo(.5,.66);c.closePath()}],
["sash","Banners & ribbons","Diagonal sash",_U([[0,0],[.28,0],[1,.72],[1,1],[.72,1],[0,.28]])],
["dot","Abstract","Dot",c=>{c.moveTo(1,.5);c.arc(.5,.5,.5,0,7)}],
["drop","Abstract","Drop",c=>{c.moveTo(.5,0);c.bezierCurveTo(.5,.3,1,.45,1,.68);c.bezierCurveTo(1,1.1,0,1.1,0,.68);c.bezierCurveTo(0,.45,.5,.3,.5,0);c.closePath()}],
["crescent","Abstract","Crescent",c=>{c.moveTo(.7,.02);c.bezierCurveTo(-.1,.05,-.1,.95,.7,.98);c.bezierCurveTo(.3,.8,.3,.2,.7,.02);c.closePath()}],
["ring","Abstract","Ring",c=>{c.moveTo(1,.5);c.arc(.5,.5,.5,0,7);c.moveTo(.78,.5);c.arc(.5,.5,.28,0,7)},null,1],
["shield","Abstract","Shield",c=>{c.moveTo(.5,0);c.lineTo(1,.15);c.lineTo(1,.5);c.quadraticCurveTo(1,.85,.5,1);c.quadraticCurveTo(0,.85,0,.5);c.lineTo(0,.15);c.closePath()}],
["plus","Abstract","Plus",_U([[.35,0],[.65,0],[.65,.35],[1,.35],[1,.65],[.65,.65],[.65,1],[.35,1],[.35,.65],[0,.65],[0,.35],[.35,.35]])],
["cloud","Abstract","Cloud",_cloud([[.28,.62,.24],[.5,.42,.3],[.74,.6,.26],[.5,.68,.24]])],
["cloud2","Abstract","Wide cloud",_cloud([[.2,.66,.2],[.4,.5,.26],[.62,.46,.28],[.82,.66,.18],[.5,.7,.22]])],
["spark","Abstract","Sparkle",c=>_sp4(c,0,0,1,1,.05)],
["blob","Abstract","Soft square",null,(c,w,h)=>_rr(c,0,0,w,h,Math.min(w,h)*.42)],
["flag","Abstract","Flag",c=>{c.moveTo(0,.06);c.bezierCurveTo(.3,-.08,.6,.26,1,.1);c.lineTo(1,.9);c.bezierCurveTo(.6,1.06,.3,.72,0,.86);c.closePath()}],
["bolt","Abstract","Lightning bolt",_U([[.6,0],[.1,.56],[.45,.56],[.36,1],[.9,.4],[.55,.4]])]
];
const SHAPES={};_SH.forEach(s=>{SHAPES[s[0]]={g:s[1],n:s[2],u:s[3],px:s[4],eo:!!s[5]}});
const SHAPE_GROUPS=["Basic shapes","Polygons","Stars","Arrows","Speech bubbles","Hearts","Banners & ribbons","Abstract"];
function shapePath(c,id,w,h){const s=SHAPES[id]||SHAPES.rect;c.beginPath();if(s.px)s.px(c,w,h);else{c.save();c.scale(w,h);s.u(c);c.restore()}}
function fillShape(c,id,w,h,color){shapePath(c,id,w,h);c.fillStyle=color;c.fill((SHAPES[id]||{}).eo?"evenodd":"nonzero")}
