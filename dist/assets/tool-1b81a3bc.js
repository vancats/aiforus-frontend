import{d as k,b as x,r as C,a4 as U,o as I,j as t,e as s,f as l,g as o,k as c,w as n,az as _,i,aA as a,aB as u,aF as B,aG as N,aR as V,aI as L,aJ as F,aK as E,aL as T,aN as j,ai as q}from"./index-1e53eecb.js";const A={key:0,"w-full":"","p-6":"","rounded-2xl":"",bg:"#2B2C3E","overflow-y-scroll":""},R={"flex-center":""},$=["src"],z={"h-40":"","flex-start-between-col":""},D={"text-5.5":""},G={"flex-center":""},J=["src"],K=o("div",{"text-5.5":"","mt-4":"","pt-6":"","pb-3":"",border:"t-1 #1F1E2C"}," 使用教程 ",-1),M={key:0,"title-brief":"","mb-4":""},S=["src"],H={key:2,"w-full":"",controls:""},O=["src"],W=k({__name:"tool",setup(P){const d=x(),e=C(),m=async()=>{const r=B("refresh")!=="false";N("refresh");const p=await V(Number(d.params.id),r);e.value=p};U(()=>d.params,()=>m()),I(()=>m());const h=()=>{var r;return window.open((r=e.value)==null?void 0:r.outsideUrl,"_blank")};return(r,p)=>{const v=L,b=F,f=E,y=T,g=j,w=q;return t(e)?(s(),l("div",A,[o("div",R,[o("img",{src:t(e).iconUrl,"wh-40":"","mr-6":"","rounded-2xl":"",alt:"icon"},null,8,$),o("div",z,[o("div",null,[c(f,{"flex-center":""},{default:n(()=>[o("div",D,_(t(e).name),1),t(e)?(s(),i(v,{key:0,tags:t(e).tagList},null,8,["tags"])):a("",!0),o("div",G,[c(b,{"wh-4":"","mr-1":""}),o("div",null,_(t(e).heat),1)])]),_:1}),c(y,{"title-brief":"",block:"","my-2":"","line-clamp":3,tooltip:!1},{default:n(()=>[u(_(t(e).brief),1)]),_:1})]),c(f,{justify:"space-between"},{default:n(()=>[t(e).outsideUrl?(s(),i(g,{key:0,type:"primary",onClick:h},{default:n(()=>[u(" 去官网使用 ")]),_:1})):a("",!0),t(e).qrcodeUrl?(s(),i(w,{key:1,trigger:"hover",placement:"bottom"},{trigger:n(()=>[c(g,{type:"primary","ml-2":"",rounded:"",bg:"#3A50FF"},{default:n(()=>[u(" 微信扫码使用 ")]),_:1})]),default:n(()=>[o("img",{src:t(e).qrcodeUrl,"wh-10vw":"",alt:""},null,8,J)]),_:1})):a("",!0)]),_:1})])]),K,t(e).usageContext?(s(),l("div",M,_(t(e).usageContext),1)):a("",!0),t(e).usageImageUrl?(s(),l("img",{key:1,src:t(e).usageImageUrl,"w-full":"","mb-4":""},null,8,S)):a("",!0),t(e).usageVideoUrl?(s(),l("video",H,[o("source",{src:t(e).usageVideoUrl,type:"video/mp4"},null,8,O)])):a("",!0)])):a("",!0)}}});export{W as default};
