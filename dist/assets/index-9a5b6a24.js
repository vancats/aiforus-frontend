import{d as _,e as h,r as e,a4 as y,m as w,v as k,aU as B,f as A,o as c,c as v,h as C,k as l,aA as F,a as I,F as L,i as N,j as $,a$ as x,aW as S,_ as U}from"./index-bbfd8c3a.js";const V={"layout-right-bottom":"","overflow-y-scroll":""},b={"prompt-layout":""},j=_({name:"ToolPage"}),M=_({...j,setup(D){const r=h(),n=e([]),f=async()=>{try{const a=await x();n.value=a||[]}catch(a){console.warn(a)}},t=e(0);r.tagId=0,y(()=>t.value,()=>{u(),r.tagId=t.value});const s=e([]);async function u(){try{const a=await w(t.value,"",t.value?1:2);s.value=a||[]}catch(a){console.warn(a)}}const i=e(!0),d=e([]),m=k(()=>{if(s.value.length&&n.value.length&&i.value){const a=B(s.value,n.value);return d.value=a,i.value=!1,a}else return d.value});return A(()=>{f(),u()}),(a,g)=>{const p=S,T=U;return c(),v("div",V,[C(p,{"active-tag":l(t),"onUpdate:activeTag":g[0]||(g[0]=o=>F(t)?t.value=o:null),"tag-list":l(m),title:"AI应用"},null,8,["active-tag","tag-list"]),I("div",b,[(c(!0),v(L,null,N(l(s),o=>(c(),$(T,{key:o.id,"card-info":o},null,8,["card-info"]))),128))])])}}});export{M as default};