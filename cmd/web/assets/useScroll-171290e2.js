import{r as s,P as t}from"./utils-1d42a8ce.js";function u(){const o=s();return{scrollRef:o,scrollToBottom:async()=>{if(await t(),o.value){const l="$el"in o.value?o.value.$el:o.value;l.scrollTop=l.scrollHeight}},scrollToTop:async()=>{if(await t(),o.value){const l="$el"in o.value?o.value.$el:o.value;l.scrollTop=0}},scrollToBottomIfAtBottom:async()=>{if(await t(),o.value){const l="$el"in o.value?o.value.$el:o.value,e=100;l.scrollHeight-l.scrollTop-l.clientHeight<=e&&(l.scrollTop=l.scrollHeight)}}}}export{u};
