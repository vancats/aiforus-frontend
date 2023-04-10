import{_ as L}from"./PromptCard.vue_vue_type_script_setup_true_lang-1bd39b66.js";import{aV as j,d as V,u as B,r as i,e as t,f as d,g as r,az as $,j as a,k as p,w as g,aB as A,aC as F,F as b,aW as D,aM as E,aN as Q,n as S,aQ as W,a as X,a4 as I,l as Y,v as q,aS as G,o as H,h as N,i as f,aA as J,aT as K,m as O,aX as Z,aY as ee,aU as te}from"./index-92804418.js";const ae=async y=>await j.post("/feedback/add",{context:y,type:0,extra:""}),oe={"text-center":"","my-16":""},ne={"text-xl":""},se={"flex-center-center":""},le=V({__name:"Feedback",props:{typeName:null},setup(y){const T=B(),o=i(!1),n=i(""),w=()=>{n.value="",o.value=!0},l=async()=>{try{await ae(n.value),o.value=!1,D.message.success("已收到，感谢您的反馈！")}catch(_){console.warn(_)}};return(_,c)=>{const s=E,m=Q,h=S,k=W;return t(),d(b,null,[r("div",oe,[r("div",ne," 老板，没有“"+$(a(T).searchVal)+"”相关的"+$(y.typeName)+"，换个关键词试试 ",1),r("div",{"mt-10":"",cursor:"",text:"#3A50FF",onClick:w}," 没有找到可用ai应用？点击向我们反馈 ")]),p(k,{show:a(o),"onUpdate:show":c[2]||(c[2]=v=>F(o)?o.value=v:null)},{default:g(()=>[p(h,{style:{width:"480px",background:"#2b2c3d","border-radius":"12px"},title:"问题与反馈",size:"huge",bordered:!1,role:"dialog","aria-modal":"true"},{footer:g(()=>[r("div",se,[p(m,{"px-7":"","mr-4":"",onClick:c[1]||(c[1]=v=>o.value=!1)},{default:g(()=>[A(" 取消 ")]),_:1}),p(m,{type:"primary","px-7":"",onClick:l},{default:g(()=>[A(" 确定 ")]),_:1})])]),default:g(()=>[p(s,{value:a(n),"onUpdate:value":c[0]||(c[0]=v=>F(n)?n.value=v:null),type:"textarea",placeholder:"请输入你的问题",bg:"#3F415B","rounded-xl":"",autosize:{minRows:8,maxRows:8}},null,8,["value"])]),_:1})]),_:1},8,["show"])],64)}}}),ce={"pr-14":"","overflow-y-scroll":""},re=r("div",{"title-tags":""}," AI应用 ",-1),ue={key:0,flex:"","overflow-x-scroll":"","overflow-y-hidden":""},ie={"h-75":"","flex-center-center-col":""},_e=r("div",null,"更多",-1),de={"title-tags":"","pt-8":""},pe=r("span",{"mr-6":""},"AI小工具",-1),me={key:2,"prompt-layout":""},ve=V({name:"SearchPage"}),he=V({...ve,setup(y){const T=X(),o=B(),n=i([]),w=async()=>{try{const e=await K();n.value=e||[]}catch(e){console.warn(e)}},l=i(0);o.tagId=0,I(()=>l.value,()=>{m(),o.tagId=l.value});const _=i([]);async function c(){try{const e=await O(0,o.searchVal);_.value=e||[]}catch(e){console.warn(e)}}const s=i([]);async function m(){try{const e=await Y(l.value,o.searchVal);s.value=e||[]}catch(e){console.warn(e)}}const h=i(!0),k=i([]),v=q(()=>{if(s.value.length&&n.value.length&&h.value){const e=G(s.value,n.value);return k.value=e,h.value=!1,e}else return k.value});return I(()=>o.searchVal,async()=>{n.value=[],s.value=[],l.value=0,c(),await w(),await m(),h.value=!0}),H(()=>{w(),c(),m()}),(e,x)=>{const P=Z,M=ee,R=S,C=le,U=te,z=L;return t(),d("div",ce,[a(_).length||a(s).length?(t(),d(b,{key:0},[re,a(_).length?(t(),d("div",ue,[(t(!0),d(b,null,N(a(_).slice(0,20),u=>(t(),f(P,{key:u.id,"tool-info":u},null,8,["tool-info"]))),128)),p(R,{"card-more":"","mr-0":"",bordered:!1,onClick:x[0]||(x[0]=u=>a(T).push("/tool"))},{default:g(()=>[r("div",ie,[p(M,{"mb-4":""}),_e])]),_:1})])):(t(),f(C,{key:1,"type-name":"AI应用"})),r("div",de,[pe,a(s).length?(t(),f(U,{key:0,"active-tag":a(l),"onUpdate:activeTag":x[1]||(x[1]=u=>F(l)?l.value=u:null),"tag-list":a(v)},null,8,["active-tag","tag-list"])):J("",!0)]),a(s).length?(t(),d("div",me,[(t(!0),d(b,null,N(a(s),u=>(t(),f(z,{key:u.id,"prompt-info":u},null,8,["prompt-info"]))),128))])):(t(),f(C,{key:3,"type-name":"AI小工具"}))],64)):(t(),f(C,{key:1,"type-name":"AI应用和AI小工具"}))])}}});export{he as default};
