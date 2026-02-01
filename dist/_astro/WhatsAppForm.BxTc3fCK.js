import{r as i}from"./index.CVf8TyFT.js";var h={exports:{}},d={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=i,N=Symbol.for("react.element"),k=Symbol.for("react.fragment"),w=Object.prototype.hasOwnProperty,C=v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,_={key:!0,ref:!0,__self:!0,__source:!0};function f(s,r,n){var t,a={},l=null,c=null;n!==void 0&&(l=""+n),r.key!==void 0&&(l=""+r.key),r.ref!==void 0&&(c=r.ref);for(t in r)w.call(r,t)&&!_.hasOwnProperty(t)&&(a[t]=r[t]);if(s&&s.defaultProps)for(t in r=s.defaultProps,r)a[t]===void 0&&(a[t]=r[t]);return{$$typeof:N,type:s,key:l,ref:c,props:a,_owner:C.current}}d.Fragment=k;d.jsx=f;d.jsxs=f;h.exports=d;var e=h.exports;/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var A={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),o=(s,r)=>{const n=i.forwardRef(({color:t="currentColor",size:a=24,strokeWidth:l=2,absoluteStrokeWidth:c,className:u="",children:p,...b},y)=>i.createElement("svg",{ref:y,...A,width:a,height:a,stroke:t,strokeWidth:c?Number(l)*24/Number(a):l,className:["lucide",`lucide-${$(s)}`,u].join(" "),...b},[...r.map(([g,j])=>i.createElement(g,j)),...Array.isArray(p)?p:[p]]));return n.displayName=`${s}`,n};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=o("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=o("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=o("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=o("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=o("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=o("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);function M(){const[s,r]=i.useState({name:"",phone:"",pickup:"",dropoff:"",date:"",time:""}),n=a=>{a.preventDefault();const l=`👋 Bonjour, je souhaite réserver un taxi :
    
👤 Nom : ${s.name}
📞 Tel : ${s.phone}
📍 Départ : ${s.pickup}
🏁 Arrivée : ${s.dropoff}
📅 Date : ${s.date}
⏰ Heure : ${s.time}

Merci de me confirmer la disponibilité.`,u=`https://wa.me/33698432710?text=${encodeURIComponent(l)}`;window.open(u,"_blank")},t=a=>{r({...s,[a.target.name]:a.target.value})};return e.jsxs("div",{className:"bg-white text-slate-800 p-8 rounded-2xl shadow-2xl",children:[e.jsxs("h2",{className:"text-2xl font-bold font-heading mb-6 text-primary flex items-center gap-2",children:[e.jsx(x,{className:"w-6 h-6 text-accent"}),"Réservation WhatsApp"]}),e.jsxs("form",{onSubmit:n,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-600 mb-1",children:"Nom Complet"}),e.jsxs("div",{className:"relative",children:[e.jsx(S,{className:"absolute left-3 top-3 w-5 h-5 text-slate-400"}),e.jsx("input",{required:!0,type:"text",name:"name",onChange:t,className:"w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all",placeholder:"Votre nom"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-600 mb-1",children:"Téléphone"}),e.jsxs("div",{className:"relative",children:[e.jsx(E,{className:"absolute left-3 top-3 w-5 h-5 text-slate-400"}),e.jsx("input",{required:!0,type:"tel",name:"phone",onChange:t,className:"w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all",placeholder:"06 12 34 56 78"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-600 mb-1",children:"Date"}),e.jsxs("div",{className:"relative",children:[e.jsx(R,{className:"absolute left-3 top-3 w-5 h-5 text-slate-400"}),e.jsx("input",{type:"date",name:"date",onChange:t,className:"w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-600 mb-1",children:"Heure"}),e.jsxs("div",{className:"relative",children:[e.jsx(D,{className:"absolute left-3 top-3 w-5 h-5 text-slate-400"}),e.jsx("input",{type:"time",name:"time",onChange:t,className:"w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"})]})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-slate-600 mb-1",children:"Trajet"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"relative",children:[e.jsx(m,{className:"absolute left-3 top-3 w-5 h-5 text-slate-400"}),e.jsx("input",{type:"text",name:"pickup",onChange:t,className:"w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all",placeholder:"Lieu de départ"})]}),e.jsxs("div",{className:"relative",children:[e.jsx(m,{className:"absolute left-3 top-3 w-5 h-5 text-slate-400"}),e.jsx("input",{type:"text",name:"dropoff",onChange:t,className:"w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all",placeholder:"Destination"})]})]})]}),e.jsxs("button",{type:"submit",className:"w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-4 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2",children:[e.jsx(x,{className:"w-5 h-5"}),"Réserver via WhatsApp"]})]})]})}export{M as default};
