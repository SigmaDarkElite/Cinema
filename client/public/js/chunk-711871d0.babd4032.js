(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-711871d0"],{"1da1":function(t,n,e){"use strict";e.d(n,"a",(function(){return r}));e("d3b7");function a(t,n,e,a,r,s,i){try{var c=t[s](i),o=c.value}catch(u){return void e(u)}c.done?n(o):Promise.resolve(o).then(a,r)}function r(t){return function(){var n=this,e=arguments;return new Promise((function(r,s){var i=t.apply(n,e);function c(t){a(i,r,s,c,o,"next",t)}function o(t){a(i,r,s,c,o,"throw",t)}c(void 0)}))}}},bb51:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-container",[e("h1",{staticClass:"my-5"},[t._v("Funciones")]),e("v-row",t._l(t.funciones,(function(n){return e("v-card",{key:n.id,staticClass:"mr-3",attrs:{"max-width":"250"}},[e("v-img",{staticClass:"mx-auto",attrs:{height:"300",src:n.imagen}}),e("v-card-title",[t._v(t._s(n.nombre))]),e("v-card-text",[e("v-row",{staticClass:"mx-0",attrs:{align:"center"}},[e("v-rating",{attrs:{value:4.5,color:"amber",dense:"","half-increments":"",readonly:"",size:"14"}}),e("div",{staticClass:"grey--text ml-4"},[t._v("4.5 (413)")])],1),e("div",{staticClass:"my-4 subtitle-1"},[t._v(" $ "+t._s(n.precio)+".00 ")]),e("div",[t._v(t._s(n.descr))])],1),e("v-card-text",[e("v-chip",[t._v(t._s(n.fecha_hora.toString().slice(0,21)))])],1),e("v-card-actions",[e("router-link",{staticClass:"mx-auto",attrs:{to:"/compra/"+n.id}},[e("v-btn",{staticClass:"mx-auto",attrs:{color:"primary"}},[t._v(" Comprar boleto ")])],1)],1)],1)})),1)],1)},r=[],s=e("1da1"),i=(e("96cf"),{name:"Home",components:{},data:function(){return{funciones:[]}},created:function(){this.get_funciones()},methods:{get_funciones:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var e,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.axios.get("/funcion/get-funciones");case 2:for(e=n.sent,t.funciones=e.data,a=0;a<e.data.length;a++)t.funciones[a].fecha_hora=new Date(e.data[a].fecha_hora);case 5:case"end":return n.stop()}}),n)})))()}}}),c=i,o=e("2877"),u=Object(o["a"])(c,a,r,!1,null,null,null);n["default"]=u.exports}}]);
//# sourceMappingURL=chunk-711871d0.babd4032.js.map