import{_ as h}from"./DetailHeader.vue_vue_type_script_setup_true_lang-9d6ef0b9.js";import{d as w,b as k,r as v,a4 as x,f as C,k as t,o as s,c as l,h as c,w as o,j as p,aD as i,aE as a,a as u,aF as U,az as I,aH as V,aI as B,aR as N,aM as E,ai as F,aK as D}from"./index-7dbc2363.js";const L={key:0,"w-full":"","p-3":"","sm:p-6":"","rounded-2xl":"",bg:"#2B2C3E","overflow-y-scroll":""},$=["src"],j=u("div",{"text-4":"","sm:text-5.5":"","mt-3":"","py-3":"",border:"t-1 #1F1E2C"}," 使用教程 ",-1),q={key:0,"title-brief":"","mb-2":""},H=["src"],M={key:2,"w-full":"",controls:""},R=["src"],S=w({__name:"tool",setup(T){const d=k(),e=v(),m=async()=>{const n=V("refresh")!=="false";B("refresh");const r=await N(Number(d.params.id),n);e.value=r};x(()=>d.params,()=>m()),C(()=>m());const f=()=>{var n;return window.open((n=e.value)==null?void 0:n.outsideUrl,"_blank")};return(n,r)=>{const _=E,g=F,y=D,b=h;return t(e)?(s(),l("div",L,[c(b,{"detail-info":t(e)},{"web-footer":o(()=>[c(y,{justify:"space-between"},{default:o(()=>[t(e).outsideUrl?(s(),p(_,{key:0,type:"primary",onClick:f},{default:o(()=>[i(" 去官网使用 ")]),_:1})):a("",!0),t(e).qrcodeUrl?(s(),p(g,{key:1,trigger:"hover",placement:"bottom"},{trigger:o(()=>[c(_,{type:"primary","ml-2":"",rounded:"",bg:"#3A50FF"},{default:o(()=>[i(" 微信扫码使用 ")]),_:1})]),default:o(()=>[u("img",{src:t(e).qrcodeUrl,"wh-10vw":"",alt:""},null,8,$)]),_:1})):a("",!0)]),_:1})]),"mobile-footer":o(()=>[c(_,{"w-full":"","mt-3":"",type:"primary",onClick:r[0]||(r[0]=z=>t(U)(t(e).outsideUrl))},{default:o(()=>[i(" 复制官网链接 ")]),_:1})]),_:1},8,["detail-info"]),j,t(e).usageContext?(s(),l("div",q,I(t(e).usageContext),1)):a("",!0),t(e).usageImageUrl?(s(),l("img",{key:1,src:t(e).usageImageUrl,"w-full":"","mb-4":""},null,8,H)):a("",!0),t(e).usageVideoUrl?(s(),l("video",M,[u("source",{src:t(e).usageVideoUrl,type:"video/mp4"},null,8,R)])):a("",!0)])):a("",!0)}}});export{S as default};