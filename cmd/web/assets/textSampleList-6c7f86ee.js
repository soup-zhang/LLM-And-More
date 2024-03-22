import{d as O,x as R,z as X,at as ee,r as _,aC as se,a8 as W,U as x,k as h,l as V,m as o,W as i,j as t,n as f,_ as d,$ as m,Y as q,Z as Y,av as C,a1 as ne,al as ie,am as re,au as de,o as ue,aA as pe,aB as H,Q as z,a3 as E,F as K,a5 as ce}from"./utils-1d42a8ce.js";import{_ as me}from"./BaseBreadcrumb.vue_vue_type_style_index_0_lang-ba201875.js";import{_ as fe}from"./UiParentCard.vue_vue_type_script_setup_true_lang-26d4ddeb.js";import{A as G}from"./AlertBlock-894f7980.js";import{_ as _e}from"./UploadFile.vue_vue_type_script_setup_true_lang-070b171d.js";import{ae as be,e as te,V as j,a5 as S,_ as he,ax as ye}from"./index-19641142.js";import{V as xe}from"./VTextarea-a1014230.js";import{V as oe}from"./VForm-5ef8cb3b.js";import{_ as ve}from"./ConfirmByInput.vue_vue_type_style_index_0_lang-c4ee9bbd.js";import{_ as we}from"./ConfirmByClick.vue_vue_type_style_index_0_lang-39d2e1f5.js";import{V as B}from"./VCol-8f634d17.js";import{V as Z}from"./VRow-344d3b15.js";import{I as J}from"./IconInfoCircle-07e4b727.js";import"./VAlert-6e4f8973.js";import"./VFileInput-49a8031d.js";import"./Confirm-43e4aa28.js";const N=v=>(ie("data-v-436cbe65"),v=v(),re(),v),ke={class:"mx-auto mt-10",style:{width:"500px"}},Ie=N(()=>i("label",{class:"required"},"样本文件",-1)),Te=N(()=>i("label",{class:"required"},"别名",-1)),Ve=N(()=>i("label",null,"备注",-1)),Ce={key:1,class:"down-sample"},ge=O({__name:"PaneModel",emits:["submit"],setup(v,{expose:M,emit:l}){const n=R({operateType:"add",disabledField:!1,maxTokens:5e5,formData:{name:"",sampleFileId:"",remark:""},upLoading:!1,uuid:""}),{formData:p}=X(n),w=ee(),k=l,y=_(),g=_(),c=_(null),D=R({name:[u=>se.isName({value:u,required:!0,errorValid:"请输入中文、数字、字母、-、_"})],sampleFileId:[u=>u&&u.length>0?!0:"请上传样本文件"]}),F=async(u={})=>{const[e,a]=await C.post({...u,showSuccess:!0,url:"/api/datasets/create",data:{...n.formData}});a&&(y.value.hide(),k("submit"))},P=({id:u})=>{w.push(`/sample-library/text-sample/detail?jobId=${u}`)},I=async(u={})=>{const[e,a]=await C.put({...u,showSuccess:!0,url:`/api/datasets/${n.uuid}`,data:{...n.formData}});a&&(y.value.hide(),k("submit"),a&&a.traceId.length>0&&P(a.traceId))},T=({valid:u,showLoading:e})=>{u&&(n.operateType=="add"?F({showLoading:e}):n.operateType=="upload"?F({showLoading:e}):I({showLoading:e}))},L=u=>{c.value!=null?C.downloadByUrl({fileUrl:c.s3Url,suffixName:"jsonl"}):ne.warning("请先上传样本文件")};M({show({title:u,infos:e={uuid:"",name:"",remark:""},operateType:a}){y.value.show({title:u,refForm:g}),n.formData=W.pick(W.cloneDeep(e),["name","remark"]),n.operateType=a,n.uuid=e.uuid,a=="add"||n.operateType=="upload"?(c.value=null,n.disabledField=!1):(c.value=null,n.disabledField=!0)}});const U=()=>{p.value.sampleFileId="",c.value=null},$=()=>{};return(u,e)=>{const a=x("Pane");return h(),V(a,{ref_key:"refPane",ref:y,class:"",onSubmit:T},{default:o(()=>[i("div",ke,[t(oe,{ref_key:"refForm",ref:g,class:"my-form"},{default:o(()=>[n.operateType=="upload"?(h(),V(be,{key:0,rules:D.sampleFileId,modelValue:f(p).sampleFileId,"onUpdate:modelValue":e[3]||(e[3]=r=>f(p).sampleFileId=r),"hide-details":"auto",style:{position:"relative",width:"100%"}},{prepend:o(()=>[Ie]),default:o(()=>[c.value?(h(),V(te,{key:0,closable:"",color:"info","onClick:close":U},{default:o(()=>[d(m(c.value.filename),1)]),_:1})):(h(),V(j,{key:1,color:"info",variant:"outlined","prepend-icon":"mdi-tray-arrow-up ",disabled:n.upLoading},{default:o(()=>[d(m(n.upLoading?"上传中...":"上传样本")+" ",1),t(_e,{"show-loading":"",modelValue:f(p).sampleFileId,"onUpdate:modelValue":e[0]||(e[0]=r=>f(p).sampleFileId=r),infos:c.value,"onUpdate:infos":e[1]||(e[1]=r=>c.value=r),purpose:"fine-tune","onUpload:success":$,onLoading:e[2]||(e[2]=r=>n.upLoading=r),style:{width:"146px",position:"absolute",top:"0",left:"-31%",opacity:"0"}},null,8,["modelValue","infos"])]),_:1},8,["disabled"]))]),_:1},8,["rules","modelValue"])):q("",!0),t(S,{density:"compact",variant:"outlined",type:"text",placeholder:"请输入中文、数字、字母、-、_ ","hide-details":"auto",clearable:"",rules:D.name,modelValue:f(p).name,"onUpdate:modelValue":e[4]||(e[4]=r=>f(p).name=r)},{prepend:o(()=>[Te]),_:1},8,["rules","modelValue"]),t(xe,{modelValue:f(p).remark,"onUpdate:modelValue":e[5]||(e[5]=r=>f(p).remark=r),modelModifiers:{trim:!0},placeholder:"请输入"},{prepend:o(()=>[Ve]),_:1},8,["modelValue"]),n.operateType=="upload"?(h(),Y("div",Ce,[d(" 点击 "),i("div",{class:"down",onClick:L},"下载"),d(" 数据集模版 ")])):q("",!0)]),_:1},512)])]),_:1},512)}}});const De=he(ge,[["__scopeId","data-v-436cbe65"]]),Fe={style:{width:"300px"}},$e=["onClick"],Be=["onClick"],Se=i("span",{class:"text-primary font-weight-black"},"删除",-1),Me=i("br",null,null,-1),Pe={class:"text-primary font-weight-black"},Le=i("br",null,null,-1),Ue={style:{display:"flex"}},Ae={class:"toolTip"},Re={class:"iconToolTip"},Ye={style:{display:"flex"}},je={class:"toolTip"},Ne={class:"iconToolTipRole"},at=O({__name:"textSampleList",setup(v){const M=ee();de();const l=R({style:{},formData:{name:""},selectedInfo:{name:""},tableInfos:{list:[],total:""},confirmByClickInfo:{html:"",action:"",row:{}},radioCheck:0,showIcon:!1,showIconRole:!1,subTitle:"",exportList:[{text:"导出jsonl",minTitle:"jsonl",subTitle:"将导出成alpaca的训练格式文件，可在创建微调时上传该文件进行训练。"},{text:"生成微调数据集",minTitle:"data",subTitle:"将直接生成微调数据集，在创建微调时可以直接选择该数据集"}]});X(l);const n=_(),p=_(),w=_(),k=_(),y=_({title:"微调样本列表"}),g=_([{text:"样本库",disabled:!1,href:"#"},{text:"微调样本列表",disabled:!0,href:"#"}]),c=e=>{M.push(`/sample-library/text-sample/detail?uuid=${e}`)},D=e=>[{text:"编辑",color:"info",click(){u(e)}},{text:"删除",color:"error",click(){L(e)}},{text:"导出",color:"info",click(){k.value.show({width:"550px"})}}],F=(e={})=>{l.subTitle=l.exportList[l.radioCheck].subTitle},P=(e={})=>{l.subTitle=l.exportList[l.radioCheck].subTitle},I=async(e={})=>{const[a,r]=await C.get({url:"/api/datasets/list",showLoading:w.value.el,data:{...l.selectedInfo,...e}});r?(l.tableInfos.list=r.list||[],l.tableInfos.total=r.total):(l.tableInfos.list=[],l.tableInfos.total=0)},T=()=>{w.value.query({page:1})},L=e=>{l.formData=e,p.value.show({width:"400px",confirmText:l.formData.uuid})},U=async(e={})=>{const[a,r]=await C.delete({...e,showSuccess:!0,url:`/api/datasets/${l.formData.uuid}`});r&&(p.value.hide(),I())},$=e=>{n.value.show({title:e=="add"?"创建数据集":"上传数据集",operateType:e})},u=e=>{n.value.show({title:"编辑数据集",infos:e,operateType:"edit"})};return ue(()=>{l.subTitle=l.exportList[l.radioCheck].subTitle,I()}),(e,a)=>{const r=x("ButtonsInForm"),Q=x("el-tooltip"),b=x("el-table-column"),le=x("ButtonsInTable"),ae=x("TableWithPager");return h(),Y(K,null,[t(me,{title:y.value.title,breadcrumbs:g.value},null,8,["title","breadcrumbs"]),t(Z,null,{default:o(()=>[t(B,null,{default:o(()=>[t(fe,null,{default:o(()=>[t(Z,null,{default:o(()=>[t(B,{cols:"12",class:"d-flex justify-space-between align-center"},{default:o(()=>[i("div",Fe,[t(S,{density:"compact",modelValue:l.selectedInfo.name,"onUpdate:modelValue":a[0]||(a[0]=s=>l.selectedInfo.name=s),label:"请输入样本名称","hide-details":"",clearable:"",variant:"outlined",color:"red",onKeyup:pe(T,["enter"]),"onClick:clear":T},null,8,["modelValue","onKeyup"])]),t(r,null,{default:o(()=>[t(j,{color:"primary",onClick:a[1]||(a[1]=s=>$("add"))},{default:o(()=>[d("创建样本")]),_:1}),t(j,{color:"primary",onClick:a[2]||(a[2]=s=>$("upload"))},{default:o(()=>[d("上传样本")]),_:1})]),_:1})]),_:1}),t(B,{cols:"12"},{default:o(()=>[t(G,null,{default:o(()=>[d(" 修改之后将实时生效，请谨慎操作！ ")]),_:1})]),_:1}),t(B,{cols:"12"},{default:o(()=>[t(ae,{onQuery:I,ref_key:"refTableWithPager",ref:w,infos:l.tableInfos},{default:o(()=>[t(b,{label:"样本ID",width:"200px",fixed:"left"},{default:o(({row:s})=>[t(Q,{content:"查看详情",placement:"top"},{default:o(()=>[i("span",{class:"link",onClick:A=>c(s.uuid)},m(s.uuid),9,$e)]),_:2},1024)]),_:1}),t(b,{label:"样本名称",width:"200px",fixed:"left"},{default:o(({row:s})=>[t(Q,{content:"查看详情",placement:"top"},{default:o(()=>[i("span",{class:"link",onClick:A=>c(s.uuid)},m(s.name),9,Be)]),_:2},1024)]),_:1}),t(b,{label:"样本数量",width:"110px"},{default:o(({row:s})=>[i("span",null,m(s.samples),1)]),_:1}),t(b,{label:"备注","min-width":"200px","show-overflow-tooltip":""},{default:o(({row:s})=>[d(m(s.remark),1)]),_:1}),t(b,{label:"修改时间","min-width":"200px"},{default:o(({row:s})=>[d(m(f(H).dateFormat(s.updatedAt,"YYYY-MM-DD HH:mm:ss")),1)]),_:1}),t(b,{label:"创建时间","min-width":"200px"},{default:o(({row:s})=>[d(m(f(H).dateFormat(s.createdAt,"YYYY-MM-DD HH:mm:ss")),1)]),_:1}),t(b,{label:"操作人","min-width":"200px"},{default:o(({row:s})=>[d(m(s.creator),1)]),_:1}),t(b,{label:"操作","min-width":"120px",fixed:"right"},{default:o(({row:s})=>[t(le,{buttons:D(s)},null,8,["buttons"])]),_:1})]),_:1},8,["infos"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(De,{ref_key:"refPaneModel",ref:n,onSubmit:T},null,512),t(ve,{ref_key:"refConfirmDelete",ref:p,onSubmit:U},{text:o(()=>[d(" 此操作将会"),Se,d("该样本数据集"),Me,d(" 数据集ID："),i("span",Pe,m(l.formData.uuid),1),Le,d("你还要继续吗？ ")]),_:1},512),t(we,{ref_key:"refConfirmByClick",ref:k,onSubmit:F},{text:o(()=>[i("div",null,[t(G,{class:"mb-6"},{default:o(()=>[d("该操作"+m(l.subTitle)+" ",1)]),_:1}),t(oe,{ref:"refForm",class:"my-form"},{default:o(()=>[t(S,{type:"text",placeholder:"eg: 普泽AI客服","hide-details":"auto",clearable:""},{prepend:o(()=>[i("label",Ue,[d("角色 "),i("div",Ae,[t(f(J),{size:16,color:"#bbb",pointer:"",class:"iconTool",onMouseenter:a[3]||(a[3]=s=>l.showIcon=!0),onMouseleave:a[4]||(a[4]=s=>l.showIcon=!1)}),z(i("div",Re,"AI角色",512),[[E,l.showIcon]])])])]),_:1}),t(S,{type:"text",placeholder:"eg: 普泽基金的研究人员","hide-details":"auto",clearable:""},{prepend:o(()=>[i("label",Ye,[d("作者 "),i("div",je,[t(f(J),{size:16,color:"#bbb",pointer:"",class:"iconTool",onMouseenter:a[5]||(a[5]=s=>l.showIconRole=!0),onMouseleave:a[6]||(a[6]=s=>l.showIconRole=!1)}),z(i("div",Ne,"AI的制作人及使用的数据等",512),[[E,l.showIconRole]])])])]),_:1})]),_:1},512),t(ye,{mandatory:"","selected-class":"text-primary",style:{"margin-left":"20%"},modelValue:l.radioCheck,"onUpdate:modelValue":a[7]||(a[7]=s=>l.radioCheck=s),onClick:P},{default:o(()=>[(h(!0),Y(K,null,ce(l.exportList,(s,A)=>(h(),V(te,{key:A,filter:"",variant:"outlined"},{default:o(()=>[d(m(s.text),1)]),_:2},1024))),128))]),_:1},8,["modelValue"])])]),_:1},512)],64)}}});export{at as default};
