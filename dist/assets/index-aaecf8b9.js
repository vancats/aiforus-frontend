import{d as _,b as T,r as e,a4 as y,l as w,v as k,aU as P,o as B,e as c,f as v,k as A,j as r,aA as C,g as F,F as I,h as L,i as N,aV as V,aW as x,_ as S}from"./index-af9f8b40.js";const U={"overflow-y-scroll":"","pr-14":""},$={"prompt-layout":""},b=_({name:"PromptPage"}),E=_({...b,setup(j){const l=T(),n=e([]),f=async()=>{try{const a=await V();n.value=a||[]}catch(a){console.warn(a)}},t=e(0);l.tagId=0,y(()=>t.value,()=>{u(),l.tagId=t.value});const s=e([]);async function u(){try{const a=await w(t.value);s.value=a||[]}catch(a){console.warn(a)}}const i=e(!0),d=e([]),m=k(()=>{if(s.value.length&&n.value.length&&i.value){const a=P(s.value,n.value);return d.value=a,i.value=!1,a}else return d.value});return B(()=>{f(),u()}),(a,g)=>{const p=x,h=S;return c(),v("div",U,[A(p,{"active-tag":r(t),"onUpdate:activeTag":g[0]||(g[0]=o=>C(t)?t.value=o:null),"tag-list":r(m),title:"AI小工具"},null,8,["active-tag","tag-list"]),F("div",$,[(c(!0),v(I,null,L(r(s),o=>(c(),N(h,{key:o.id,"card-info":o},null,8,["card-info"]))),128))])])}}});export{E as default};