(function(e){function t(t){for(var o,s,l=t[0],i=t[1],c=t[2],d=0,b=[];d<l.length;d++)s=l[d],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&b.push(n[s][0]),n[s]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);u&&u(t);while(b.length)b.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var e,t=0;t<r.length;t++){for(var a=r[t],o=!0,l=1;l<a.length;l++){var i=a[l];0!==n[i]&&(o=!1)}o&&(r.splice(t--,1),e=s(s.s=a[0]))}return e}var o={},n={advanced:0},r=[];function s(t){if(o[t])return o[t].exports;var a=o[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=o,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(a,o,function(t){return e[t]}.bind(null,o));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=i;r.push([0,"chunk-vendors","chunk-common"]),a()})({0:function(e,t,a){e.exports=a("3072")},2733:function(e,t,a){var o=a("24fb");t=o(!1),t.push([e.i,".card[data-v-36a04507] .table .thead-dark th{color:#fff;background-color:#42b983;border-color:#42b983}.card[data-v-36a04507] .table td,.card[data-v-36a04507] .table tr{border:none}",""]),e.exports=t},"27c0":function(e,t,a){"use strict";a("63ef")},3072:function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var o=a("7a23");function n(e,t,a,n,r,s){var l=Object(o["w"])("table-lite");return Object(o["p"])(),Object(o["d"])(l,{"has-checkbox":!0,"is-loading":e.table.isLoading,"is-re-search":e.table.isReSearch,columns:e.table.columns,rows:e.table.rows,total:e.table.totalRecordCount,sortable:e.table.sortable,messages:e.table.messages,onDoSearch:e.doSearch,onIsFinished:e.tableLoadingFinish,onReturnCheckedRows:e.updateCheckedRows},null,8,["is-loading","is-re-search","columns","rows","total","sortable","messages","onDoSearch","onIsFinished","onReturnCheckedRows"])}a("b0c0"),a("4e82"),a("d3b7");var r=a("7ca8"),s=function(e,t){e+=1;for(var a=[],o=e;o<=t;o++)a.push({id:o,name:"TEST"+o,email:"test"+o+"@example.com"});return a},l=function(e,t){for(var a=[],o=t;o>e;o--)a.push({id:o,name:"TEST"+o,email:"test"+o+"@example.com"});return a},i=Object(o["j"])({name:"App",components:{TableLite:r["a"]},setup:function(){var e=Object(o["s"])({isLoading:!1,isReSearch:!1,columns:[{label:"ID",field:"id",width:"3%",sortable:!0,isKey:!0},{label:"Name",field:"name",width:"10%",sortable:!0,display:function(e){return'<a href="javascript:void(0)" data-id="'+e.id+'" class="is-rows-el name-btn">'+e.name+"</a>"}},{label:"Email",field:"email",width:"15%",sortable:!0},{label:"",field:"quick",width:"10%",display:function(e){return'<button type="button" data-id="'+e.id+'" class="is-rows-el quick-btn">Button</button>'}}],rows:[],totalRecordCount:0,sortable:{order:"id",sort:"asc"},messages:{pagingInfo:"Showing {0}-{1} of {2}",pageSizeChangeLabel:"Row count:",gotoPageLabel:"Go to page:",noDataAvailable:"No data"}}),t=function(t,a,o,n){e.isLoading=!0,setTimeout((function(){e.isReSearch=void 0==t,(t>=10||a>=20)&&(a=20),e.rows="asc"==n?s(t,a):l(t,a),e.totalRecordCount=20,e.sortable.order=o,e.sortable.sort=n}),600)},a=function(t){e.isLoading=!1,Array.prototype.forEach.call(t,(function(e){e.classList.contains("name-btn")&&e.addEventListener("click",(function(){console.log(this.dataset.id+" name-btn click!!")})),e.classList.contains("quick-btn")&&e.addEventListener("click",(function(){console.log(this.dataset.id+" quick-btn click!!")}))}))},n=function(e){console.log(e)};return t(0,10,"id","asc"),{table:e,doSearch:t,tableLoadingFinish:a,updateCheckedRows:n}}}),c=a("6b0d"),u=a.n(c);const d=u()(i,[["render",n]]);var b=d,f={style:{"text-align":"left"}},m=Object(o["g"])("label",null,"SearchBy:",-1);function h(e,t,a,n,r,s){var l=Object(o["w"])("table-lite");return Object(o["p"])(),Object(o["f"])(o["a"],null,[Object(o["g"])("div",f,[m,Object(o["D"])(Object(o["g"])("input",{"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.searchTerm=t})},null,512),[[o["A"],e.searchTerm]])]),Object(o["i"])(l,{"is-static-mode":!0,columns:e.table.columns,rows:e.table.rows,total:e.table.totalRecordCount,sortable:e.table.sortable},null,8,["columns","rows","total","sortable"])],64)}a("4de4"),a("caad"),a("2532");var p=Object(o["j"])({name:"App",components:{TableLite:r["a"]},setup:function(){for(var e=Object(o["t"])(""),t=Object(o["s"])([]),a=0;a<126;a++)t.push({id:a,name:"TEST"+a,email:"test"+a+"@example.com"});var n=Object(o["s"])({columns:[{label:"ID",field:"id",width:"3%",sortable:!0,isKey:!0},{label:"Name",field:"name",width:"10%",sortable:!0},{label:"Email",field:"email",width:"15%",sortable:!0}],rows:Object(o["b"])((function(){return t.filter((function(t){return t.email.toLowerCase().includes(e.value.toLowerCase())||t.name.toLowerCase().includes(e.value.toLowerCase())}))})),totalRecordCount:Object(o["b"])((function(){return n.rows.length})),sortable:{order:"id",sort:"asc"}});return{searchTerm:e,table:n}}});const g=u()(p,[["render",h]]);var w=g,v={style:{"text-align":"left"}},j=Object(o["g"])("label",null,"SearchBy:",-1);function O(e,t,a,n,r,s){var l=Object(o["w"])("table-lite");return Object(o["p"])(),Object(o["f"])(o["a"],null,[Object(o["g"])("div",v,[j,Object(o["D"])(Object(o["g"])("input",{"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.searchTerm=t})},null,512),[[o["A"],e.searchTerm]])]),Object(o["i"])(l,{"is-static-mode":!0,"is-loading":e.table.isLoading,columns:e.table.columns,rows:e.table.rows,total:e.table.totalRecordCount,sortable:e.table.sortable},null,8,["is-loading","columns","rows","total","sortable"])],64)}var L=a("1da1"),y=(a("96cf"),Object(o["j"])({name:"App",components:{TableLite:r["a"]},setup:function(){var e=Object(o["t"])(""),t=Object(o["s"])({rows:[]}),a=function(){var e=Object(L["a"])(regeneratorRuntime.mark((function e(t){var a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(a=[],o=0;o<126;o++)a.push({id:o,name:"TEST"+o,email:"test"+o+"@example.com"});return e.next=4,new Promise((function(e,o){try{n.isLoading=!0,setTimeout((function(){n.isLoading=!1;var o=a.filter((function(e){return e.email.toLowerCase().includes(t.toLowerCase())||e.name.toLowerCase().includes(t.toLowerCase())}));e(o)}),2e3)}catch(r){console.log("Fetch error",r),o()}}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n=Object(o["s"])({isLoading:!1,columns:[{label:"ID",field:"id",width:"3%",sortable:!0,isKey:!0},{label:"Name",field:"name",width:"10%",sortable:!0},{label:"Email",field:"email",width:"15%",sortable:!0}],rows:Object(o["b"])((function(){return t.rows})),totalRecordCount:Object(o["b"])((function(){return n.rows.length})),sortable:{order:"id",sort:"asc"}});return Object(o["B"])((function(){return e.value}),(function(e){a(e).then((function(e){t.rows=e}))})),a("").then((function(e){t.rows=e})),{searchTerm:e,table:n}}}));const S=u()(y,[["render",O]]);var R=S;function k(e,t,a,n,r,s){var l=Object(o["w"])("table-lite");return Object(o["p"])(),Object(o["d"])(l,{"has-checkbox":!0,"is-loading":e.table.isLoading,"is-re-search":e.table.isReSearch,columns:e.table.columns,rows:e.table.rows,total:e.table.totalRecordCount,sortable:e.table.sortable,messages:e.table.messages,onDoSearch:e.doSearch,onIsFinished:e.tableLoadingFinish,onReturnCheckedRows:e.updateCheckedRows},null,8,["is-loading","is-re-search","columns","rows","total","sortable","messages","onDoSearch","onIsFinished","onReturnCheckedRows"])}var T=function(e,t){e+=1;for(var a=[],o=e;o<=t;o++)a.push({id:o,name:"TEST"+o,email:"test"+o+"@example.com"});return a},C=function(e,t){for(var a=[],o=t;o>e;o--)a.push({id:o,name:"TEST"+o,email:"test"+o+"@example.com"});return a},x=Object(o["j"])({name:"App",components:{TableLite:r["a"]},setup:function(){var e=Object(o["s"])({isLoading:!1,isReSearch:!1,columns:[{label:"ID",field:"id",width:"3%",sortable:!0,isKey:!0},{label:"Name",field:"name",width:"10%",sortable:!0,display:function(e){return'<a href="javascript:void(0)" data-id="'+e.id+'" class="is-rows-el name-btn">'+e.name+"</a>"}},{label:"Email",field:"email",width:"15%",sortable:!0},{label:"",field:"quick",width:"10%",display:function(e){return'<button type="button" data-id="'+e.id+'" class="is-rows-el quick-btn">Button</button>'}}],rows:[],totalRecordCount:0,sortable:{order:"id",sort:"asc"},messages:{pagingInfo:"Showing {0}-{1} of {2}",pageSizeChangeLabel:"Row count:",gotoPageLabel:"Go to page:",noDataAvailable:"No data"}}),t=function(t,a,o,n){e.isLoading=!0,setTimeout((function(){e.isReSearch=void 0==t,(t>=10||a>=20)&&(a=20),e.rows="asc"==n?T(t,a):C(t,a),e.totalRecordCount=20,e.sortable.order=o,e.sortable.sort=n}),600)},a=function(t){e.isLoading=!1,Array.prototype.forEach.call(t,(function(e){e.classList.contains("name-btn")&&e.addEventListener("click",(function(){console.log(this.dataset.id+" name-btn click!!")})),e.classList.contains("quick-btn")&&e.addEventListener("click",(function(){console.log(this.dataset.id+" quick-btn click!!")}))}))},n=function(e){console.log(e)};return t(0,10,"id","asc"),{table:e,doSearch:t,tableLoadingFinish:a,updateCheckedRows:n}}});a("27c0");const E=u()(x,[["render",k],["__scopeId","data-v-36a04507"]]);var D=E;function I(e,t,a,n,r,s){var l=Object(o["w"])("table-lite");return Object(o["p"])(),Object(o["d"])(l,{"is-loading":e.table.isLoading,columns:e.table.columns,rows:e.table.rows,total:e.table.totalRecordCount,sortable:e.table.sortable,messages:e.table.messages,onDoSearch:e.doSearch,onIsFinished:t[0]||(t[0]=function(t){return e.table.isLoading=!1})},null,8,["is-loading","columns","rows","total","sortable","messages","onDoSearch"])}var A=function(e,t){e+=1;for(var a=[],o=e;o<=t;o++)a.push({id:o,name:"TEST"+o,email:"test"+o+"@example.com"});return a},P=function(e,t){for(var a=[],o=t;o>e;o--)a.push({id:o,name:"TEST"+o,email:"test"+o+"@example.com"});return a},F=Object(o["j"])({name:"App",components:{TableLite:r["a"]},setup:function(){var e=Object(o["s"])({isLoading:!1,columns:[{label:"ID",field:"id",width:"3%",sortable:!0,isKey:!0},{label:"使用者名稱",field:"name",width:"10%",sortable:!0},{label:"電子信箱",field:"email",width:"15%",sortable:!0}],rows:[],totalRecordCount:0,sortable:{order:"id",sort:"asc"},messages:{pagingInfo:"現在顯示 {0} 到 {1}筆 共{2}筆",pageSizeChangeLabel:"每頁筆數:",gotoPageLabel:"現在頁數:",noDataAvailable:"沒有資料"}}),t=function(t,a,o,n){e.isLoading=!0,setTimeout((function(){e.isReSearch=void 0==t,(t>=10||a>=20)&&(a=20),e.rows="asc"==n?A(t,a):P(t,a),e.totalRecordCount=20,e.sortable.order=o,e.sortable.sort=n}),600)};return t(0,10,"id","asc"),{table:e,doSearch:t}}});const _=u()(F,[["render",I]]);var q=_;Object(o["c"])(b).mount("#customize-display-table"),Object(o["c"])(w).mount("#filter-table"),Object(o["c"])(R).mount("#filter2-table"),Object(o["c"])(D).mount("#customize-style-table"),Object(o["c"])(q).mount("#customize-message-table")},"63ef":function(e,t,a){var o=a("2733");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=a("499e").default;n("b53e4e78",o,!0,{sourceMap:!1,shadowMode:!1})}});