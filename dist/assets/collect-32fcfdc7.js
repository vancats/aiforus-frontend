import{a7 as w,bU as f,r as c,aa as v,a5 as p}from"./index-a271cc5c.js";var t=(a=>(a[a.prompt=0]="prompt",a[a.tool=1]="tool",a))(t||{});const g=async a=>await w.post("/user/collect/modify",a),n=async(a,o,i)=>await w.post("/user/collect/query",{userId:a,cardType:o,tagId:i}).then(r=>r==null?void 0:r.data),d=f("collect",()=>{const a=c(null),o=c(null);async function i(l,e=t.prompt){switch(e){case t.prompt:return a.value||(a.value=await n(l,e,0)||[]),a.value;case t.tool:return o.value||(o.value=await n(l,e,0)||[]),o.value}}async function r(l,e=t.prompt){switch(e){case t.prompt:a.value=await n(l,e,0)||[];break;case t.tool:o.value=await n(l,e,0)||[];break}}const s=c(null),u=c(null);async function h(l=t.prompt){switch(l){case t.prompt:return s.value||(s.value=await p()||[]),s.value;case t.tool:return u.value||(u.value=await v()||[]),u.value}}async function m(l,e=t.prompt){switch(e){case t.prompt:s.value=await p()||[];break;case t.tool:u.value=await v()||[];break}}return{wholeCollectedPrompts:a,wholeCollectedTools:o,getWholeCollectedCard:i,refreshWholeCollectedCard:r,getWholeCardsTags:h,refreshWholeCardsTags:m}});export{t as C,g as c,d as u};
