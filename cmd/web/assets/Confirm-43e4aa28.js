import{aw as k,$ as w,a1 as x,Q as y,V as m,a0 as v,a2 as $}from"./index-19641142.js";import{x as B,z as S,a9 as g,k as o,l as u,m as t,j as s,n as l,X as i,Y as z,Z as D,_ as f,F as N}from"./utils-1d42a8ce.js";const T={__name:"Confirm",emits:["close","submit"],setup(F,{expose:V,emit:p}){const e=B({style:{width:"auto"},formData:{},visible:!1}),{style:b,formData:j}=S(e),r=g(),n=p,c=()=>{e.visible=!1},C=()=>{c(),n("close")},_=()=>{n("submit")};return V({show({width:a="auto"}={}){e.style.width=a,e.visible=!0},hide(){c()}}),(a,d)=>(o(),u($,{modelValue:e.visible,"onUpdate:modelValue":d[0]||(d[0]=h=>e.visible=h),"max-width":"800",width:l(b).width},{default:t(()=>[s(v,{class:"px-2 pt-3"},{default:t(()=>[l(r).title?(o(),u(k,{key:0,class:"text-subtitle-1 color-font"},{default:t(()=>[i(a.$slots,"title")]),_:3})):z("",!0),s(w,{class:"text-body-1 color-font-light"},{default:t(()=>[i(a.$slots,"text")]),_:3}),s(x,null,{default:t(()=>[s(y),l(r).buttons?i(a.$slots,"buttons",{key:0}):(o(),D(N,{key:1},[s(m,{size:"small",color:"secondary",variant:"outlined",onClick:C},{default:t(()=>[f("取消")]),_:1}),s(m,{size:"small",color:"primary",variant:"flat",onClick:_},{default:t(()=>[f("确定")]),_:1})],64))]),_:3})]),_:3})]),_:3},8,["modelValue","width"]))}},P=T;export{P as C};
