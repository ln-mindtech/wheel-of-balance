"use strict";(self.webpackChunkmindtech_frontend=self.webpackChunkmindtech_frontend||[]).push([[622],{8622:(e,s,n)=>{n.r(s),n.d(s,{default:()=>u});var t=n(2791),r=n(7689),i=n(3722),a=n(3389),c=n(3099),o=n(7691),l=n(7467),d=(n(6161),n(1807)),h=n.n(d),f=n(184);const u=()=>{const{id:e}=(0,r.UO)();let s=(0,r.s0)();const[d,u]=(0,t.useState)(null),[p,x]=(0,t.useState)(null),[_,g]=(0,t.useState)(null),[m,w]=(0,t.useState)(0),[j,v]=(0,t.useState)(0),[N,q]=(0,t.useState)(e),[k,S]=(0,t.useState)(!1),I={answer1:"",answer2:"",answer3:"",answer4:"",answer5:""},[R,E]=(0,t.useState)(I);function C(){let e=0;return _[p.questions[m].id_reflection_question].map((function(s){s.caption_reflections_answers&&(e+=1)})),e}function Z(e){h().track(e,{Sphere:p.questions[m].name_life_sphere,Question:m+1,Reflections:C()})}(0,t.useEffect)((()=>{a.Z.getReflectionQuestions(sessionStorage.getItem("id_participant"),N).then((e=>{x(e.data),w(j)})).catch((e=>{s("*"),console.error("Error fetching data:",e)}))}),[N]),(0,t.useEffect)((()=>{a.Z.getReflections(sessionStorage.getItem("id_participant")).then((e=>{u(e.data.reflections)})).catch((e=>{s("*"),console.error("Error fetching data:",e)}))}),[]),(0,t.useEffect)((()=>{p&&(E(I),a.Z.getReflectionQuestionsAnswers(sessionStorage.getItem("id_participant")).then((e=>{g({...e.data.questions,..._});const s=e.data.questions[p.questions[m].id_reflection_question];E((e=>({...e,...s.reduce(((e,s,n)=>(e["answer".concat(n+1)]=s.caption_reflections_answers,e)),{})})))})).catch((e=>{s("*"),console.error("Error fetching data:",e)})))}),[p]),(0,t.useEffect)((()=>{if(_){const e=_[p.questions[m].id_reflection_question];E((s=>({...s,...e.reduce(((e,s,n)=>(e["answer".concat(n+1)]=s.caption_reflections_answers,e)),{})})))}}),[m,_]);const b=e=>{let s=function(){let e=0;for(const s in _)for(const n in _[s])_[s][n].caption_reflections_answers&&_[s][n].id_life_sphere==p.questions[m].id_life_sphere&&(e+=1);return e}();q(e),E(I),v(0),h().track("Go to Sphere",{From:p.questions[m].name_life_sphere,To:d[e-1].name_life_sphere,Reflections:s}),A(),Z("Reflection Next Button press")},A=()=>{k&&a.Z.saveReflections(sessionStorage.getItem("id_participant"),_).then((e=>{S(!1)})).catch((e=>{console.error("Error fetching data:",e)}))},T=(e,s)=>n=>{const{value:t}=n.target;E((s=>({...s,[e]:t})));const r=p.questions[m].id_reflection_question;_[r][s-1]={caption_reflections_answers:t,id_reflection_question:r},g(_),S(!0)};return(0,f.jsx)("div",{children:p?(0,f.jsxs)("div",{children:[(0,f.jsxs)("h1",{children:[p.questions[m].name_life_sphere,(0,f.jsx)("span",{children:p.questions[m].balance_wheels_mark})]}),(0,f.jsx)("p",{children:p.questions[m].caption_reflection_question}),(0,f.jsxs)("div",{className:"answer-div",children:[(0,f.jsx)("span",{children:"1."}),(0,f.jsx)(c.I,{onchange:T("answer1",1),placeholder:"Your answer",value:R.answer1})]}),(0,f.jsxs)("div",{className:"answer-div",children:[(0,f.jsx)("span",{children:"2."}),(0,f.jsx)(c.I,{onchange:T("answer2",2),placeholder:"Your answer",value:R.answer2,disabled:!R.answer1})]}),(0,f.jsxs)("div",{className:"answer-div",children:[(0,f.jsx)("span",{children:"3."}),(0,f.jsx)(c.I,{onchange:T("answer3",3),placeholder:"Your answer",value:R.answer3,disabled:!R.answer2})]}),(0,f.jsxs)("div",{className:"answer-div",children:[(0,f.jsx)("span",{children:"4."}),(0,f.jsx)(c.I,{onchange:T("answer4",4),placeholder:"Your answer",value:R.answer4,disabled:!R.answer3})]}),(0,f.jsxs)("div",{className:"answer-div",children:[(0,f.jsx)("span",{children:"5."}),(0,f.jsx)(c.I,{onchange:T("answer5",5),placeholder:"Your answer",value:R.answer5,disabled:!R.answer4})]}),(0,f.jsx)("div",{children:m+1<p.questions.length&&e?(0,f.jsx)(i.z,{text:"Next",onclick:()=>{E(I),w(m+1),A(),Z("Reflection Next Button press")}}):(0,f.jsx)(i.z,{text:"Next",onclick:()=>{N>=d.length?q(1):q(parseInt(N)+1),A(),E(I),v(0),Z("Reflection Next Button press")}})}),(0,f.jsxs)("div",{className:"dots-div",children:[(0,f.jsx)("div",{className:"left-div",children:m>0?(0,f.jsx)("img",{className:"left",src:o.Z,onClick:()=>{E(I),w(m-1),A(),Z("Arrow LEFT tracked")}}):(0,f.jsx)("img",{className:"left",src:o.Z,onClick:()=>{q(1==N?d.length:parseInt(N)-1),E(I),v(3),A(),Z("Arrow LEFT tracked")}})}),Array.from({length:p.questions.length},((e,s)=>(0,f.jsx)("div",{className:"dot-div",children:s>m?(0,f.jsx)("span",{className:"dot-empty"},s):(0,f.jsx)("span",{className:s==m?"dot-selected":"dot",onClick:()=>w(s)},s)}))),(0,f.jsx)("div",{className:"right-div",children:m+1==p.questions.length?(0,f.jsx)("img",{className:"right",src:l.Z,onClick:()=>{N>=d.length?q(1):q(parseInt(N)+1),A(),E(I),v(0),Z("Arrow RIGHT tracked")}}):(0,f.jsx)("img",{className:"right",src:l.Z,onClick:()=>{E(I),w(m+1),A(),Z("Arrow RIGHT tracked")}})})]}),(0,f.jsx)("p",{className:"save-for-now-p",children:(0,f.jsx)("a",{onClick:()=>{sessionStorage.setItem("exported",""),Z("Save and Finish"),a.Z.saveReflections(sessionStorage.getItem("id_participant"),_).then((e=>{s("/reflections/")})).catch((e=>{console.error("Error fetching data:",e)}))},children:"Save and finish for now"})}),(0,f.jsx)("div",{children:d?(0,f.jsx)("div",{id:"reflections",className:"reflection-progress-icons",children:d.map(((e,s)=>(0,f.jsxs)("div",{className:"reflection-progress-icon-div",children:[(0,f.jsx)("p",{children:e.name_life_sphere}),N==s+1?(0,f.jsx)("div",{className:"img-container-selected",children:(0,f.jsx)("img",{className:"reflection-progress-icon-w",src:n(5298)("./"+e.icon_name_life_sphere+".png")})}):(0,f.jsx)("div",{className:"img-container",children:(0,f.jsx)("img",{className:"reflection-progress-icon-w",onClick:()=>b(e.id_life_sphere),src:n(5298)("./"+e.icon_name_life_sphere+".png")})})]})))}):(0,f.jsx)("p",{children:"Loading data..."})})]}):(0,f.jsx)("p",{children:"Loading data..."})})}}}]);
//# sourceMappingURL=622.1b0545a3.chunk.js.map