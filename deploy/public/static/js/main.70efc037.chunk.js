(this["webpackJsonpto-do-list"]=this["webpackJsonpto-do-list"]||[]).push([[0],{102:function(e,t,n){},107:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(16),l=n.n(r),c=(n(61),n(15)),i=(n(62),n(63),n(12)),s=n(6),u=n(19),d=n.n(u),p=n(110),m=n(111),g=n(108),h=n(43),E=n.n(h),b=(n(102),n(25)),f=n(112),x=n(113),v=n(18),y=function(){var e=Object(a.useContext)(v.a),t=Object(c.a)(e,2),n=t[0],r=t[1],l=n.token;return o.a.createElement(f.a,{fixed:"top",collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark"},o.a.createElement(i.b,{to:"/"},o.a.createElement(f.a.Brand,null,"To-Do-List")),o.a.createElement(f.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),o.a.createElement(f.a.Collapse,{id:"responsive-navbar-nav"},o.a.createElement(x.a,{style:{padding:"10px"},className:"mr-auto"},l?o.a.createElement(i.b,{to:"/create",style:{textDecoration:"none",color:"white"}},"Create"):null),o.a.createElement(x.a,{style:{padding:"10px"}},l?o.a.createElement(i.b,{to:"/login",onClick:function(){r(Object(b.a)(Object(b.a)({},n),{},{isLogIn:!1,token:null})),localStorage.removeItem("userData")},style:{textDecoration:"none",color:"white"}},"logout"):o.a.createElement(o.a.Fragment,null,o.a.createElement(i.b,{to:"/login",style:{textDecoration:"none",color:"white",padding:"5px",marginRight:"10px"}},"Login"),o.a.createElement(i.b,{to:"/signup",style:{textDecoration:"none",color:"white",padding:"5px",marginRight:"10px"}},"SignUp")))))},k=o.a.lazy((function(){return n.e(6).then(n.bind(null,121))})),j=o.a.lazy((function(){return n.e(3).then(n.bind(null,118))})),O=o.a.lazy((function(){return n.e(4).then(n.bind(null,119))})),I=o.a.lazy((function(){return n.e(5).then(n.bind(null,120))}));var S=function(){var e=Object(a.useState)({isLogIn:!1,userId:"",token:null,expiration:null}),t=Object(c.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)([]),u=Object(c.a)(l,2),h=u[0],b=u[1],f=Object(a.useState)(!0),x=Object(c.a)(f,2),S=x[0],w=x[1],C=n.userId,D=n.token,z=function(e){var t;d.a.get("".concat("https://mern--todo--list.herokuapp.com","/list/").concat(e),{headers:{"Content-Type":"application/json",Authorization:"Bearer "+D}}).then((function(e){t=e.data.todos,b(t)}))};return Object(a.useEffect)((function(){var e=JSON.parse(localStorage.getItem("userData"));e&&e.token&&r({isLogIn:!0,userId:e.userId,token:e.token,expiration:new Date(e.expiration)})}),[D]),o.a.createElement(i.a,null,o.a.createElement(v.a.Provider,{value:[n,r]},o.a.createElement(y,null),o.a.createElement(p.a,null,o.a.createElement(m.a,{className:"mr-2"},o.a.createElement(g.a,null,o.a.createElement(a.Suspense,{fallback:o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(E.a,{type:"Bars",color:"#343A40",height:100,width:100,timeout:3e3,style:{textAlign:"center"}}))},o.a.createElement(s.d,null,o.a.createElement(s.b,{path:"/",exact:!0},D?o.a.createElement(k,{loading:S,render:z,todos:h,onRemove:function(e){w(!0),d.a.delete("".concat("https://mern--todo--list.herokuapp.com","/todo/").concat(e),{headers:{"Content-Type":"application/json",Authorization:"Bearer "+D}}).then((function(e){console.log(e),console.log(e.data),z(C),w(!1)}))}}):o.a.createElement(s.a,{to:"/login"})),o.a.createElement(s.b,{path:"/create",exact:!0},D?o.a.createElement(j,{onAdd:function(e){w(!0);var t=n.userId,a={title:e,creator:t};d.a.post("https://mern--todo--list.herokuapp.com/add",a,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+D}}).then((function(e){console.log(e),console.log(e.data),z(t),w(!1)}))}}):o.a.createElement(s.a,{to:"/login"})),o.a.createElement(s.b,{path:"/login",exact:!0},o.a.createElement(O,{render:z})),o.a.createElement(s.b,{path:"/signup",exact:!0},o.a.createElement(I,{render:z})))))))))};l.a.render(o.a.createElement(S,null),document.getElementById("root"))},18:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(0),o=n.n(a).a.createContext()},56:function(e,t,n){e.exports=n(107)},61:function(e,t,n){}},[[56,1,2]]]);
//# sourceMappingURL=main.70efc037.chunk.js.map