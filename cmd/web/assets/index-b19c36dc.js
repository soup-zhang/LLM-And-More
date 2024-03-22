import{d as A,i as I,r as i,au as S,at as W,x,o as U,U as p,k as Y,Z as K,j as e,m as a,aA as L,_ as b,W as g,$ as u,n as M,aB as Q,F as j,av as y}from"./utils-1d42a8ce.js";import{_ as q}from"./BaseBreadcrumb.vue_vue_type_style_index_0_lang-ba201875.js";import{_ as E}from"./UiParentCard.vue_vue_type_script_setup_true_lang-26d4ddeb.js";import{_ as V}from"./AiAudio.vue_vue_type_style_index_0_lang-7e2163a8.js";import{_ as H}from"./ConfirmByClick.vue_vue_type_style_index_0_lang-39d2e1f5.js";import{V as O}from"./VRow-344d3b15.js";import{V as h}from"./VCol-8f634d17.js";import{a5 as Z,V as z}from"./index-19641142.js";import"./Confirm-43e4aa28.js";const re=A({name:"VoicePrintCompareList",__name:"index",setup(G){const B=I("provideAspectPage"),C=i({title:"声纹比对列表"}),P=i([{text:"智能声纹",disabled:!1,href:"#"},{text:"声纹比对列表",disabled:!0,href:"#"}]);S();const k=W(),m=i(),f=i(),c=i(),s=x({list:[],total:0}),d=x({name:""}),_=()=>{c.value.query({page:1})},D=()=>{d.name=""},v=async(o={})=>{const[l,r]=await y.get({url:"/voice/compare",showLoading:c.value.el,data:{...d,...o}});r?(s.list=r.list||[],s.total=r.total):(s.list=[],s.total=0)},T=()=>{k.push("/voice-print/compare-list/compare")},w=o=>{m.value=o,f.value.show({width:"400px"})},F=async()=>{const[o,l]=await y.delete({showSuccess:!0,url:`/voice/compare/${m.value.id}`});l&&(f.value.hide(),c.value.query())},N=o=>{let l=[];return l.push({text:"删除",color:"error",click(){w(o)}}),l};return B.methods.refreshListPage=()=>{D(),_()},U(()=>{v()}),(o,l)=>{const r=p("ButtonsInForm"),n=p("el-table-column"),R=p("ButtonsInTable"),$=p("TableWithPager");return Y(),K(j,null,[e(q,{title:C.value.title,breadcrumbs:P.value},null,8,["title","breadcrumbs"]),e(E,null,{default:a(()=>[e(O,null,{default:a(()=>[e(h,{cols:"12",lg:"3",md:"4",sm:"6"},{default:a(()=>[e(Z,{density:"compact",modelValue:d.name,"onUpdate:modelValue":l[0]||(l[0]=t=>d.name=t),label:"音频名称","hide-details":"",variant:"outlined",clearable:!0,onKeyup:L(_,["enter"]),"onClick:clear":_},null,8,["modelValue","onKeyup"])]),_:1}),e(h,{cols:"12",lg:"3",md:"4",sm:"6"},{default:a(()=>[e(r,null,{default:a(()=>[e(z,{color:"primary",onClick:T},{default:a(()=>[b("声纹比对")]),_:1})]),_:1})]),_:1}),e(h,{cols:"12"},{default:a(()=>[e($,{onQuery:v,ref_key:"tableWithPagerRef",ref:c,infos:s},{default:a(()=>[e(n,{label:"音频1","min-width":"320px"},{default:a(({row:t})=>[e(V,{src:t==null?void 0:t.input1S3Url},null,8,["src"]),g("div",null,u(t.input1Name),1)]),_:1}),e(n,{label:"音频2","min-width":"320px"},{default:a(({row:t})=>[e(V,{src:t==null?void 0:t.input2S3Url},null,8,["src"]),g("div",null,u(t.input2Name),1)]),_:1}),e(n,{label:"模型",prop:"modelType","min-width":"150px"}),e(n,{label:"比分",prop:"dist","min-width":"180px"}),e(n,{label:"操作人",prop:"operatorEmail","min-width":"200px"}),e(n,{label:"创建时间","min-width":"165px"},{default:a(({row:t})=>[b(u(M(Q).dateFormat(t.createdAt,"YYYY-MM-DD HH:mm:ss")),1)]),_:1}),e(n,{label:"操作","min-width":"80px",fixed:"right"},{default:a(({row:t})=>[e(R,{buttons:N(t),onlyOne:""},null,8,["buttons"])]),_:1})]),_:1},8,["infos"])]),_:1})]),_:1})]),_:1}),e(H,{ref_key:"refConfirmDelete",ref:f,onSubmit:F},{text:a(()=>[b(" 您确定要删除【"+u(m.value.input1Name)+"】与【"+u(m.value.input2Name)+"】的比对结果吗？ ",1)]),_:1},512)],64)}}});export{re as default};
