import{_ as h}from"./DetailHeader.vue_vue_type_script_setup_true_lang-68b91a2d.js";import{d as w,a as k,r as v,a9 as U,j as C,h as o,o as s,b as l,f as c,w as t,m as p,g as i,aH as a,e as u,aI as x,t as I,aK as N,aL as V,aU as B,aP as L,an as E,aN as F}from"./index-b5be5b05.js";const $={key:0,"w-full":"","p-3-6":"","rounded-2xl":"",bg:"#2B2C3E","overflow-y-scroll":""},j=["src"],q=u("div",{"text-4-5.5":"","mt-3":"","py-3":"",border:"t-1 #1F1E2C"}," 使用教程 ",-1),D={key:0,"title-brief":"","mb-2":""},H=["src"],T={key:2,"w-full":"",controls:""},A=["src"],S=w({__name:"tool",setup(K){const d=k(),e=v(),m=async()=>{const n=N("refresh")!=="false";V("refresh");const r=await B(Number(d.params.id),n);e.value=r};U(()=>d.params,()=>m()),C(()=>m());const f=()=>{var n;return window.open((n=e.value)==null?void 0:n.outsideUrl,"_blank")};return(n,r)=>{const _=L,g=E,y=F,b=h;return o(e)?(s(),l("div",$,[c(b,{"detail-info":o(e)},{"web-footer":t(()=>[c(y,{justify:"space-between"},{default:t(()=>[o(e).outsideUrl?(s(),p(_,{key:0,type:"primary",onClick:f},{default:t(()=>[i(" 去官网使用 ")]),_:1})):a("",!0),o(e).qrcodeUrl?(s(),p(g,{key:1,trigger:"hover",placement:"bottom"},{trigger:t(()=>[c(_,{type:"primary","ml-2":"",rounded:"",bg:"#3A50FF"},{default:t(()=>[i(" 微信扫码使用 ")]),_:1})]),default:t(()=>[u("img",{src:o(e).qrcodeUrl,"wh-10vw":"",alt:""},null,8,j)]),_:1})):a("",!0)]),_:1})]),"mobile-footer":t(()=>[c(_,{"w-full":"","mt-3":"",type:"primary",onClick:r[0]||(r[0]=M=>o(x)(o(e).outsideUrl))},{default:t(()=>[i(" 复制官网链接 ")]),_:1})]),_:1},8,["detail-info"]),q,o(e).usageContext?(s(),l("div",D,I(o(e).usageContext),1)):a("",!0),o(e).usageImageUrl?(s(),l("img",{key:1,src:o(e).usageImageUrl,"w-full":"","mb-4":""},null,8,H)):a("",!0),o(e).usageVideoUrl?(s(),l("video",T,[u("source",{src:o(e).usageVideoUrl,type:"video/mp4"},null,8,A)])):a("",!0)])):a("",!0)}}});export{S as default};
