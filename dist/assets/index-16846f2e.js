import{a7 as z,d as F,i as B,r as u,o as a,b as d,e as p,t as A,h as o,f as i,w as f,g as V,A as C,F as b,$ as D,Q as j,R as q,x as R,V as E,u as G,G as I,p as Q,c as H,a4 as J,j as K,l as N,m as h,a5 as O,q as W,a8 as X,a9 as Y,a6 as Z,v as ee}from"./index-a271cc5c.js";const te=async y=>await z.post("/feedback/add",{context:y,type:0,extra:""}),ae={"text-center":"","my-16":""},oe={"text-3-xl":""},ne={"flex-center-center":""},se=F({__name:"Feedback",props:{typeName:null},setup(y){const T=B(),t=u(!1),n=u(""),w=()=>{n.value="",t.value=!0},s=async()=>{if(n.value)try{await te(n.value),t.value=!1,D.message.success("已收到，感谢您的反馈！")}catch(_){console.warn(_)}};return(_,l)=>{const c=j,m=q,g=R,x=E;return a(),d(b,null,[p("div",ae,[p("div",oe," 老板，没有“"+A(o(T).searchVal)+"”相关的"+A(y.typeName)+"，换个关键词试试 ",1),p("div",{"text-3-sm":"","mt-4-10":"",cursor:"",text:"#3A50FF",onClick:w}," 没有找到可用ai应用？点击向我们反馈 ")]),i(x,{show:o(t),"onUpdate:show":l[2]||(l[2]=v=>C(t)?t.value=v:null)},{default:f(()=>[i(g,{style:{background:"#2b2c3d","border-radius":"12px"},"w-66-120":"",title:"问题与反馈",size:"huge",bordered:!1,role:"dialog","aria-modal":"true"},{footer:f(()=>[p("div",ne,[i(m,{"px-7":"","mr-4":"",onClick:l[1]||(l[1]=v=>t.value=!1)},{default:f(()=>[V(" 取消 ")]),_:1}),i(m,{type:"primary","px-7":"",onClick:s},{default:f(()=>[V(" 确定 ")]),_:1})])]),default:f(()=>[i(c,{value:o(n),"onUpdate:value":l[0]||(l[0]=v=>C(n)?n.value=v:null),type:"textarea",placeholder:"请输入你的问题",bg:"#3F415B","rounded-xl":"",autosize:{minRows:6,maxRows:6}},null,8,["value"])]),_:1})]),_:1},8,["show"])],64)}}}),le={"layout-right-bottom":"","overflow-y-scroll":""},ce=p("div",{"title-tags":""}," AI应用 ",-1),re={key:0,flex:"","overflow-x-scroll":"","overflow-y-hidden":"","pb-2":""},ue={"flex-center-center-col":"","h-47-76":""},ie=p("div",null,"更多",-1),_e={key:2,"prompt-layout":""},de=F({name:"SearchPage"}),me=F({...de,setup(y){const T=G(),t=B(),n=u([]),w=async()=>{try{const e=await O();n.value=e||[]}catch(e){console.warn(e)}},s=u(0);t.tagId=0,I(()=>s.value,()=>{m(),t.tagId=s.value});const _=u([]);async function l(){try{const e=await W(0,t.searchVal,1);_.value=e||[]}catch(e){console.warn(e)}}const c=u([]);async function m(){try{const e=await Q(s.value,t.searchVal,1);c.value=e||[]}catch(e){console.warn(e)}}const g=u(!0),x=u([]),v=H(()=>{if(g.value)if(c.value.length&&n.value.length){const e=J(c.value,n.value);return x.value=e,g.value=!1,e}else return[];else return x.value});return I(()=>t.searchVal,async()=>{n.value=[],c.value=[],s.value=0,l(),await w(),await m(),g.value=!0}),K(()=>{w(),l(),m()}),(e,k)=>{const S=X,P=Y,L=R,$=se,M=Z,U=ee;return a(),d("div",le,[o(_).length||o(c).length?(a(),d(b,{key:0},[ce,o(_).length?(a(),d("div",re,[(a(!0),d(b,null,N(o(_).slice(0,20),r=>(a(),h(S,{key:r.id,"tool-info":r},null,8,["tool-info"]))),128)),i(L,{"h-47-76":"","card-more":"","mr-0":"",bordered:!1,onClick:k[0]||(k[0]=r=>o(T).push("/tool"))},{default:f(()=>[p("div",ue,[i(P,{"mb-4":""}),ie])]),_:1})])):(a(),h($,{key:1,"type-name":"AI应用"})),i(M,{"active-tag":o(s),"onUpdate:activeTag":k[1]||(k[1]=r=>C(s)?s.value=r:null),"tag-list":o(v),title:"AI小工具","mt-4-8":""},null,8,["active-tag","tag-list"]),o(c).length?(a(),d("div",_e,[(a(!0),d(b,null,N(o(c),r=>(a(),h(U,{key:r.id,"card-info":r},null,8,["card-info"]))),128))])):(a(),h($,{key:3,"type-name":"AI小工具"}))],64)):(a(),h($,{key:1,"type-name":"AI应用和AI小工具"}))])}}});export{me as default};
