import{d as f,i as h,r as e,a9 as y,q as w,c as b,a$ as k,j as B,o as c,b as v,f as C,h as l,aE as F,e as I,F as L,l as N,m as $,b5 as x,b1 as A,v as E}from"./index-07dda414.js";const S={"layout-right-bottom":"","overflow-y-scroll":""},V={"prompt-layout":""},j=f({name:"ToolPage"}),M=f({...j,setup(q){const r=h(),n=e([]),_=async()=>{try{const a=await x();n.value=a||[]}catch(a){console.warn(a)}},t=e(0);r.tagId=0,y(()=>t.value,()=>{u(),r.tagId=t.value});const s=e([]);async function u(){try{const a=await w(t.value,"",t.value?1:2);s.value=a||[]}catch(a){console.warn(a)}}const i=e(!0),d=e([]),m=b(()=>{if(s.value.length&&n.value.length&&i.value){const a=k(s.value,n.value);return d.value=a,i.value=!1,a}else return d.value});return B(()=>{_(),u()}),(a,g)=>{const p=A,T=E;return c(),v("div",S,[C(p,{"active-tag":l(t),"onUpdate:activeTag":g[0]||(g[0]=o=>F(t)?t.value=o:null),"tag-list":l(m),title:"AI应用"},null,8,["active-tag","tag-list"]),I("div",V,[(c(!0),v(L,null,N(l(s),o=>(c(),$(T,{key:o.id,"card-info":o},null,8,["card-info"]))),128))])])}}});export{M as default};