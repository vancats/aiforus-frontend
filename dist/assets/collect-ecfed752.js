import{b2 as w,bi as f,r as c,b5 as v,b0 as p}from"./index-07dda414.js";var a=(t=>(t[t.prompt=0]="prompt",t[t.tool=1]="tool",t))(a||{});const g=async t=>await w.post("/user/collect/modify",t),n=async(t,o,i)=>await w.post("/user/collect/query",{userId:t,cardType:o,tagId:i}).then(r=>r==null?void 0:r.data),b=f("collect",()=>{const t=c(null),o=c(null);async function i(l,e=a.prompt){switch(e){case a.prompt:return t.value||(t.value=await n(l,e,0)||[]),t.value;case a.tool:return o.value||(o.value=await n(l,e,0)||[]),o.value}}async function r(l,e=a.prompt){switch(e){case a.prompt:t.value=await n(l,e,0)||[];break;case a.tool:o.value=await n(l,e,0)||[];break}}const s=c(null),u=c(null);async function h(l=a.prompt){switch(l){case a.prompt:return s.value||(s.value=await p()||[]),s.value;case a.tool:return u.value||(u.value=await v()||[]),u.value}}async function m(l,e=a.prompt){switch(e){case a.prompt:s.value=await p()||[];break;case a.tool:u.value=await v()||[];break}}return{wholeCollectedPrompts:t,wholeCollectedTools:o,getWholeCollectedCard:i,refreshWholeCollectedCard:r,getWholeCardsTags:h,refreshWholeCardsTags:m}});export{a as C,g as c,b as u};