import{au as m,a3 as p,_ as f}from"./index-19641142.js";import{d as x,r as g,x as y,w as T,o as v,S as k,Q as V,k as a,Z as r,l as b,m as h,W as B,$ as n,_ as D,P as E}from"./utils-1d42a8ce.js";const R={class:"compo-textLog d-flex","element-loading-text":"日志加载中...","element-loading-background":"#333"},w={key:0,class:"mt-10"},N={class:"index pr-2 font-weight-bold"},A=x({__name:"TextLog",props:{modelValue:{default:""},resizeAble:{type:Boolean,default:!0},isDone:{type:Boolean,default:!0}},setup(d){const s=d,o=g(),t=y({items:[],isReady:!1}),l=()=>{let{modelValue:e}=s;if(e){t.isReady=!1;let i=e.replace(/\r|\n/g,"あ");t.items=i.split("あ"),E(()=>{setTimeout(()=>{o.value.scrollToIndex(Number.MAX_SAFE_INTEGER)},100),setTimeout(()=>{p(o.value.$el).scrollTop(Number.MAX_SAFE_INTEGER),t.isReady=!0},300)})}else s.isDone&&(t.isReady=!0)};return T(()=>s.modelValue,e=>{l()}),v(()=>{l()}),(e,i)=>{const c=k("loading");return V((a(),r("div",R,[e.isDone&&!e.modelValue?(a(),r("div",w,"暂无日志 ...")):(a(),b(m,{key:1,ref_key:"refBox",ref:o,items:t.items,class:"scrollbar-auto dark"},{default:h(({item:_,index:u})=>[B("span",N,"["+n(u)+"]",1),D(" "+n(_),1)]),_:1},8,["items"]))])),[[c,!e.isDone&&!t.isReady]])}}});const I=f(A,[["__scopeId","data-v-3cbd0641"]]);export{I as T};
