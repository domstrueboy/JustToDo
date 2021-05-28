var t,e,s=Object.defineProperty,i=Object.prototype.hasOwnProperty,n=Object.getOwnPropertySymbols,o=Object.prototype.propertyIsEnumerable,r=(t,e,i)=>e in t?s(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,a=(t,e)=>{for(var s in e||(e={}))i.call(e,s)&&r(t,s,e[s]);if(n)for(var s of n(e))o.call(e,s)&&r(t,s,e[s]);return t};import{d,r as c,u as l,c as m,w as u,v as p,a as I,b,e as g,p as v,f as L,o as T,g as f,h,t as y,i as w,F as D,j as _,k as O,l as C,m as k,n as j,q as S,s as R}from"./vendor.3ecf2acd.js";!function(t=".",e="__import__"){try{self[e]=new Function("u","return import(u)")}catch(s){const i=new URL(t,location),n=t=>{URL.revokeObjectURL(t.src),t.remove()};self[e]=t=>new Promise(((s,o)=>{const r=new URL(t,i);if(self[e].moduleMap[r])return s(self[e].moduleMap[r]);const a=new Blob([`import * as m from '${r}';`,`${e}.moduleMap['${r}']=m;`],{type:"text/javascript"}),d=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(a),onerror(){o(new Error(`Failed to import: ${t}`)),n(d)},onload(){s(self[e].moduleMap[r]),n(d)}});document.head.appendChild(d)})),self[e].moduleMap={}}}("/JustToDo/assets/");var $={mutations:{toggleDone(t,e){const s=t.lists[t.currentListId].items.find((t=>t.id===e));s&&(s.done=!s.done)},editTitle(t,{id:e,newTitle:s}){const i=t.lists[t.currentListId].items.find((t=>t.id===e));i&&(i.title=s)},editDescription(t,{id:e,newDesc:s}){const i=t.lists[t.currentListId].items.find((t=>t.id===e));i&&(i.description=s)}}};class x{constructor({title:t,description:e}){this.id=`id${Date.now()}`,this.title=null!=t?t:"Empty title",this.description=null!=e?e:"",this.done=!1,this.repeat=!1,this.createTime=Date.now(),this.editTime=Date.now()}}var E={mutations:{addTodoItem(t,{title:e}){const s=new x({title:e});t.lists[t.currentListId].items.push(s)},removeTodoItem(t,{id:e}){const{items:s}=t.lists[t.currentListId],i=s.findIndex((t=>t.id===e));s.splice(i,1)},editListDescription(t,e){const s=t.lists[t.currentListId];s&&(s.description=e)}}};const N=t=>{const e=localStorage.getItem("currentListId");e?t.commit("setCurrentListId",e):localStorage.setItem("currentListId",t.state.currentListId),Object.keys(t.state.lists).forEach((e=>{const s=localStorage.getItem(`list_${e}`);s?t.commit("setList",{id:e,list:JSON.parse(s)}):localStorage.setItem(`list_${e}`,JSON.stringify(t.state.lists[e]))})),t.subscribe(((t,e)=>{switch(console.log(t),t.type){case"setCurrentListId":localStorage.setItem("currentListId",t.payload);break;case"addTodoItem":case"toggleDone":case"removeTodoItem":case"editTitle":case"editDescription":case"editListDescription":localStorage.setItem(`list_${e.currentListId}`,JSON.stringify(e.lists[e.currentListId]));break;default:console.log("unknown mutation")}}))},U={currentListId:"list1",lists:{list1:{title:"List 1",description:"List description 1",items:[{id:"todo1",title:"Todo 1",description:"Todo description 1",done:!1,repeat:!1,createTime:0,editTime:0},{id:"todo2",title:"Todo 2",description:"",done:!0,repeat:!1,createTime:0,editTime:0}]},list2:{title:"List 2",description:"",items:[]}}},M=localStorage.getItem("state"),J=M?JSON.parse(M):{},P={currentListId:null!=(t=J.currentListId)?t:U.currentListId,lists:null!=(e=J.lists)?e:U.lists};var F={state:()=>P,getters:{getTabs:t=>Object.keys(t.lists).map((e=>({id:e,title:t.lists[e].title,description:t.lists[e].description})))},mutations:a(a({setCurrentListId(t,e){t.currentListId=e},setList(t,{id:e,list:s}){t.lists[e]=s}},E.mutations),$.mutations),plugins:[N]},H=d({name:"Input",setup(){const t=c(""),e=l();return{input:t,addTodoItem:()=>{e.commit("addTodoItem",{title:t.value}),t.value=""}}}});const K=g();v("data-v-5f42600c");const q=I("button",null,"➜",-1);L();const V=K(((t,e,s,i,n,o)=>(T(),m("form",{onSubmit:e[2]||(e[2]=b(((...e)=>t.addTodoItem&&t.addTodoItem(...e)),["prevent"]))},[u(I("input",{"onUpdate:modelValue":e[1]||(e[1]=e=>t.input=e),type:"text"},null,512),[[p,t.input]]),q],32))));H.render=V,H.__scopeId="data-v-5f42600c";var A=d({name:"Tab",props:{tab:{type:Object,required:!0}}});const B=g(),z=B(((t,e,s,i,n,o)=>{const r=f("RouterLink");return T(),m("li",{class:"tab",title:t.tab.description},[I(r,{to:`/list/${t.tab.id}`,class:"tab__link"},{default:B((()=>[h(y(t.tab.title),1)])),_:1},8,["to"])],8,["title"])}));A.render=z,A.__scopeId="data-v-558805c1";var G=d({name:"Nav",components:{Tab:A},setup(){const t=l();return{tabs:w((()=>t.getters.getTabs))}}});const Q=g()(((t,e,s,i,n,o)=>{const r=f("Tab");return T(),m("nav",null,[I("ul",null,[(T(!0),m(D,null,_(t.tabs,(t=>(T(),m(r,{key:t.id,tab:t},null,8,["tab"])))),128))])])}));G.render=Q,G.__scopeId="data-v-4dcb4856";var W=d({name:"Header",components:{Input:H,Nav:G}});const X=g()(((t,e,s,i,n,o)=>{const r=f("Input"),a=f("Nav");return T(),m("header",null,[I(r),I(a)])}));W.render=X,W.__scopeId="data-v-57125d52";var Y=d({name:"App",components:{Header:W}});Y.render=function(t,e,s,i,n,o){const r=f("Header"),a=f("RouterView");return T(),m(D,null,[I(r),I(a)],64)};var Z=d({name:"TodoItem",props:{item:{type:Object,default:new x({})}},emits:["remove-todo-item"],setup(t){const e=l();return{toggleDone:()=>e.commit("toggleDone",t.item.id),onTitleChange:s=>{const i=null==s?void 0:s.target;e.commit("editTitle",{id:t.item.id,newTitle:i.innerText})},onDescriptionChange:s=>{const i=null==s?void 0:s.target;e.commit("editDescription",{id:t.item.id,newDesc:i.innerText})}}}});const tt=g();v("data-v-7335dc9c");const et=I("div",{class:"action-button"},"✔️",-1);L();const st=tt(((t,e,s,i,n,o)=>(T(),m("li",null,[I("main",{class:t.item.done?"done":""},[I("h3",{contenteditable:!t.item.done,onKeydown:e[1]||(e[1]=O(b(((...e)=>t.onTitleChange&&t.onTitleChange(...e)),["prevent"]),["enter"]))},y(t.item.title),41,["contenteditable"]),t.item.description?(T(),m("p",{key:0,contenteditable:!t.item.done,onKeydown:e[2]||(e[2]=O(b(((...e)=>t.onDescriptionChange&&t.onDescriptionChange(...e)),["prevent"]),["enter"]))},y(t.item.description),41,["contenteditable"])):C("",!0)],2),I("label",null,[et,I("input",{type:"checkbox",onChange:e[3]||(e[3]=(...e)=>t.toggleDone&&t.toggleDone(...e))},null,32)]),I("button",{class:"action-button",onClick:e[4]||(e[4]=e=>t.$emit("remove-todo-item"))}," ❌ ")]))));Z.render=st,Z.__scopeId="data-v-7335dc9c";var it=d({name:"List",components:{TodoItem:Z},setup(){const t=l();return{list:w((()=>t.state.lists[t.state.currentListId])),onRemoveTodoItem:e=>{t.commit("removeTodoItem",{id:e})},onDescriptionChange:e=>{const s=null==e?void 0:e.target;t.commit("editListDescription",s.innerText)}}}});const nt=g()(((t,e,s,i,n,o)=>{const r=f("TodoItem");return T(),m("main",null,[t.list.description?(T(),m("p",{key:0,contenteditable:"",onKeydown:e[1]||(e[1]=O(b(((...e)=>t.onDescriptionChange&&t.onDescriptionChange(...e)),["prevent"]),["enter"]))},y(t.list.description),33)):C("",!0),I("ul",null,[(T(!0),m(D,null,_(t.list.items,(e=>(T(),m(r,{key:e.id,item:e,onRemoveTodoItem:s=>t.onRemoveTodoItem(e.id)},null,8,["item","onRemoveTodoItem"])))),128))])])}));it.render=nt,it.__scopeId="data-v-120122f2";const ot=k(F),rt=[{name:"Main",path:"/",component:it,redirect(){const t=ot.state.currentListId;if(!ot.state.lists[t]){const t=Object.keys(ot.state.lists)[0];ot.commit("setCurrentListId",t)}return{path:`/list/${t}`}}},{name:"List",path:"/list/:listId",component:it,beforeEnter(t,e,s){const i="string"==typeof t.params.listId?t.params.listId:t.params.listId[0],n=ot.state.lists[i]?i:ot.state.currentListId;if(!ot.state.lists[n]){const t=Object.keys(ot.state.lists)[0];ot.commit("setCurrentListId",t)}s()}}],at=j({history:S(),routes:rt});at.beforeEach((t=>{"List"===t.name&&ot.commit("setCurrentListId",t.params.listId)})),R(Y).use(ot).use(at).mount("#app");
