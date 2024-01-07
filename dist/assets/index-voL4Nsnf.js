import{d as r,o,f as u,k as i,h as c,t as S,s as B,_ as v,u as U,e as l,F as $,l as q,m as p,w as t,g as e,n as C,q as g,r as R,v as W,T as X,x as Y,a as M,y as Z,b as z,z as ee,i as N,A as E}from"./index-iq3_YIvd.js";import{u as V}from"./setting-wuIpdkHr.js";const te={class:"logo"},oe=["src"],ne=r({name:"Logo"}),le=r({...ne,setup(h){return(a,s)=>(o(),u("div",te,[i("img",{src:c(B).logoPath,alt:""},null,8,oe),i("p",null,S(c(B).title),1)]))}}),ae=v(le,[["__scopeId","data-v-ecdb89ab"]]),se={class:"menu"},ce=r({name:"Menu"}),re=r({...ce,props:["menuList"],setup(h){let a=U();const s=f=>{a.push(f.index)};return(f,y)=>{const _=l("el-icon"),d=l("el-menu-item"),k=l("Menu"),m=l("el-sub-menu");return o(),u("div",se,[(o(!0),u($,null,q(h.menuList,n=>(o(),u($,{key:n.path},[n.children?g("",!0):(o(),u($,{key:0},[n.meta.hidden?g("",!0):(o(),p(d,{key:0,index:n.path,onClick:s},{title:t(()=>[i("span",null,S(n.meta.title),1)]),default:t(()=>[e(_,null,{default:t(()=>[(o(),p(C(n.meta.icon)))]),_:2},1024)]),_:2},1032,["index"]))],64)),n.children&&n.children.length===1?(o(),u($,{key:1},[n.children[0].hidden?g("",!0):(o(),p(d,{key:0,index:n.children[0].path,onClick:s},{title:t(()=>[i("span",null,S(n.children[0].meta.title),1)]),default:t(()=>[e(_,null,{default:t(()=>[(o(),p(C(n.children[0].meta.icon)))]),_:2},1024)]),_:2},1032,["index"]))],64)):g("",!0),n.children&&n.children.length>1?(o(),p(m,{key:2,index:n.path},{title:t(()=>[e(_,null,{default:t(()=>[(o(),p(C(n.meta.icon)))]),_:2},1024),i("span",null,S(n.meta.title),1)]),default:t(()=>[e(k,{style:{"padding-left":"20px"},menuList:n.children},null,8,["menuList"])]),_:2},1032,["index"])):g("",!0)],64))),128))])}}}),ue=v(re,[["__scopeId","data-v-b7d8645c"]]),_e=r({name:"Main"}),de=r({..._e,setup(h){let a=V(),s=R(!0);return W(()=>a.refresh,()=>{s.value=!1,Y(()=>{s.value=!0})}),(f,y)=>{const _=l("router-view");return o(),u("div",null,[e(_,null,{default:t(({Component:d})=>[e(X,{name:"fade"},{default:t(()=>[c(s)?(o(),p(C(d),{key:0})):g("",!0)]),_:2},1024)]),_:1})])}}}),ie=v(de,[["__scopeId","data-v-1bd6f0cc"]]),me={class:"tabbar-left"},pe=r({name:"Breadcrumb"}),fe=r({...pe,setup(h){let a=M(),s=V(),y=Z(s).fold;const _=()=>{s.changeFold()};return(d,k)=>{const m=l("el-icon"),n=l("el-breadcrumb-item"),I=l("el-breadcrumb");return o(),u("div",me,[e(m,{onClick:_,class:"fold"},{default:t(()=>[(o(),p(C(c(y)?"Fold":"Expand")))]),_:1}),e(I,{"separator-icon":"ArrowRight"},{default:t(()=>[(o(!0),u($,null,q(c(a).matched,b=>(o(),u($,{key:b.path},[b.meta.title?(o(),p(n,{key:0,class:"breadcrumb-item",to:b.path},{default:t(()=>[e(m,{class:"item-icon"},{default:t(()=>[(o(),p(C(b.meta.icon)))]),_:2},1024),i("span",null,S(b.meta.title),1)]),_:2},1032,["to"])):g("",!0)],64))),128))]),_:1})])}}}),he=v(fe,[["__scopeId","data-v-d6afdb6f"]]),be={class:"tabbar-right"},ge=["src"],ve={class:"el-dropdown-link"},ye=r({name:"Setting"}),ke=r({...ye,setup(h){let a=z(),s=V();const f=U();M();const y=()=>{s.changeRefresh()},_=R(""),d=R(!1),k=R(["#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585","rgba(255, 69, 0, 0.68)","rgb(255, 120, 0)","hsv(51, 100, 98)","hsva(120, 40, 94, 0.5)","hsl(181, 100%, 37%)","hsla(209, 100%, 56%, 0.73)","#c7158577"]);let m=R(!1);const n=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()},I=async x=>{x==="logout"&&(await a.userLogout(),f.push({path:"/login"}))},b=()=>{const x=document.documentElement;x.className=m.value?"dark":""},A=()=>{console.log("颜色change事件触发"),document.documentElement.style.setProperty("--el-color-primary",_.value),d.value=!1};return(x,w)=>{const F=l("el-button"),D=l("el-color-picker"),T=l("el-form-item"),P=l("el-switch"),j=l("el-form"),G=l("el-popover"),H=l("arrow-down"),J=l("el-icon"),K=l("el-dropdown-item"),O=l("el-dropdown-menu"),Q=l("el-dropdown");return o(),u("div",be,[e(F,{icon:"Refresh",circle:"",onClick:y}),e(G,{placement:"bottom",title:"主题设置",width:300,trigger:"click",visible:d.value},{default:t(()=>[e(j,null,{default:t(()=>[e(T,{label:"主题颜色"},{default:t(()=>[e(D,{modelValue:_.value,"onUpdate:modelValue":w[0]||(w[0]=L=>_.value=L),"show-alpha":"",predefine:k.value,onChange:A},null,8,["modelValue","predefine"])]),_:1}),e(T,{label:"暗黑模式"},{default:t(()=>[e(P,{modelValue:c(m),"onUpdate:modelValue":w[1]||(w[1]=L=>ee(m)?m.value=L:m=L),onChange:b},null,8,["modelValue"])]),_:1})]),_:1})]),reference:t(()=>[e(F,{icon:"Setting",circle:"",onClick:w[2]||(w[2]=L=>d.value=!d.value)})]),_:1},8,["visible"]),e(F,{icon:"FullScreen",circle:"",onClick:n}),i("img",{src:c(a).avatar,alt:"",class:"avatar"},null,8,ge),e(Q,{trigger:"click",onCommand:I},{dropdown:t(()=>[e(O,null,{default:t(()=>[e(K,{command:"logout"},{default:t(()=>[N("退出登录")]),_:1})]),_:1})]),default:t(()=>[i("span",ve,[N(S(c(a).username)+" ",1),e(J,{class:"el-icon--right"},{default:t(()=>[e(H)]),_:1})])]),_:1})])}}}),xe=v(ke,[["__scopeId","data-v-4fbe05bd"]]),we={class:"tabbar"},$e=r({name:"Tabbar"}),Se=r({...$e,setup(h){return(a,s)=>(o(),u("div",we,[e(he),e(xe)]))}}),Ce=v(Se,[["__scopeId","data-v-734f4678"]]),Le={class:"layout_wrapper"},Re=r({name:"Layout"}),Ve=r({...Re,setup(h){let a=V(),s=z(),f=M();return(y,_)=>{const d=l("el-menu"),k=l("el-scrollbar");return o(),u("div",Le,[i("div",{class:E(["layout_slider",{fold:c(a).fold}])},[e(ae),e(k,{class:"scrollbar"},{default:t(()=>[e(d,{"background-color":"#001529",router:"","text-color":"#fff","default-active":c(f).path,collapse:c(a).fold},{default:t(()=>[e(ue,{menuList:c(s).menuRoutes},null,8,["menuList"])]),_:1},8,["default-active","collapse"])]),_:1})],2),i("div",{class:E(["layout_tabbar",{fold:c(a).fold}])},[e(Ce)],2),i("div",{class:E(["layout_main",{fold:c(a).fold}])},[e(ie)],2)])}}}),Ee=v(Ve,[["__scopeId","data-v-1b626115"]]);export{Ee as default};