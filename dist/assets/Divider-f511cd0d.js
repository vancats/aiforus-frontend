import{O as p,P as f,a6 as c,Q as s,a5 as o,d as u,S as x,T as v,c as b,Z as C,G as d,F as _}from"./index-df9cd863.js";const $=i=>{const{textColor1:t,dividerColor:n,fontWeightStrong:l}=i;return{textColor:t,color:n,fontWeight:l}},w={name:"Divider",common:p,self:$},y=w,z=f("divider",`
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`,[c("vertical",`
 margin-top: 24px;
 margin-bottom: 24px;
 `,[c("no-title",`
 display: flex;
 align-items: center;
 `)]),s("title",`
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `),o("title-position-left",[s("line",[o("left",{width:"28px"})])]),o("title-position-right",[s("line",[o("right",{width:"28px"})])]),o("dashed",[s("line",`
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]),o("vertical",`
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `),s("line",`
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `),c("dashed",[s("line",{backgroundColor:"var(--n-color)"})]),o("dashed",[s("line",{borderColor:"var(--n-color)"})]),o("vertical",{backgroundColor:"var(--n-color)"})]),P=Object.assign(Object.assign({},v.props),{titlePlacement:{type:String,default:"center"},dashed:Boolean,vertical:Boolean}),R=u({name:"Divider",props:P,setup(i){const{mergedClsPrefixRef:t,inlineThemeDisabled:n}=x(i),l=v("Divider","-divider",z,y,i,t),a=b(()=>{const{common:{cubicBezierEaseInOut:e},self:{color:h,textColor:g,fontWeight:m}}=l.value;return{"--n-bezier":e,"--n-color":h,"--n-text-color":g,"--n-font-weight":m}}),r=n?C("divider",void 0,a,i):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:a,themeClass:r==null?void 0:r.themeClass,onRender:r==null?void 0:r.onRender}},render(){var i;const{$slots:t,titlePlacement:n,vertical:l,dashed:a,cssVars:r,mergedClsPrefix:e}=this;return(i=this.onRender)===null||i===void 0||i.call(this),d("div",{role:"separator",class:[`${e}-divider`,this.themeClass,{[`${e}-divider--vertical`]:l,[`${e}-divider--no-title`]:!t.default,[`${e}-divider--dashed`]:a,[`${e}-divider--title-position-${n}`]:t.default&&n}],style:r},l?null:d("div",{class:`${e}-divider__line ${e}-divider__line--left`}),!l&&t.default?d(_,null,d("div",{class:`${e}-divider__title`},this.$slots),d("div",{class:`${e}-divider__line ${e}-divider__line--right`})):null)}});export{R as _};
