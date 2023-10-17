(()=>{var t={n:r=>{var e=r&&r.__esModule?()=>r.default:()=>r;return t.d(e,{a:e}),e},d:(r,e)=>{for(var o in e)t.o(e,o)&&!t.o(r,o)&&Object.defineProperty(r,o,{enumerable:!0,get:e[o]})},o:(t,r)=>Object.prototype.hasOwnProperty.call(t,r),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},r={};(()=>{"use strict";t.r(r),t.d(r,{extend:()=>ct});const e=flarum.core.compat["forum/app"];var o=t.n(e),s=function(){function t(){this.loading=!1,this.requestsLoaded=!1}return t.prototype.load=function(){var t=this;this.requestsLoaded||(this.loading=!0,m.redraw(),o().store.find("user-erasure-requests").then((function(){return t.requestsLoaded=!0}),(function(){})).then((function(){t.loading=!1,m.redraw()})))},t}();function n(t,r){return n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,r){return t.__proto__=r,t},n(t,r)}function a(t,r){t.prototype=Object.create(r.prototype),t.prototype.constructor=t,n(t,r)}const i=flarum.core.compat["forum/components/Notification"];var u=t.n(i);const c=flarum.core.compat["common/helpers/username"];var l=t.n(c),d=function(t){function r(){return t.apply(this,arguments)||this}a(r,t);var e=r.prototype;return e.icon=function(){return"fas fa-file-export"},e.href=function(){var t=this.attrs.notification.subject();return o().forum.attribute("baseUrl")+o().route("gdpr.export",{file:t.file()})},e.content=function(){var t=this.attrs.notification;return o().translator.trans("blomstra-gdpr.forum.notification.export-ready",{username:l()(t.fromUser())})},e.excerpt=function(){return null},r}(u());const p=flarum.core.compat["common/extend"],f=flarum.core.compat["common/utils/ItemList"];var h=t.n(f);const g=flarum.core.compat["forum/components/SettingsPage"];var b=t.n(g);const v=flarum.core.compat["common/components/FieldSet"];var y=t.n(v);const q=flarum.core.compat["common/components/Button"];var N=t.n(q);const _=flarum.core.compat["common/components/Modal"];var x=t.n(_);const w=flarum.core.compat["common/utils/extractText"];var A=t.n(w);const C=flarum.core.compat["common/utils/Stream"];var R=t.n(C),B=function(t){function r(){return t.apply(this,arguments)||this}a(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),this.reason=R()(""),this.password=R()("")},e.className=function(){return"RequestErasureModal Modal--small"},e.title=function(){return o().translator.trans("blomstra-gdpr.forum.request_erasure.title")},e.content=function(){return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},this.fields().toArray()))},e.fields=function(){var t=this,r=new(h()),e=o().session.user.erasureRequest();return e?(r.add("status",m("div",{className:"Form-group"},m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.request_erasure.status."+e.status())))),e.reason()&&r.add("reason",m("div",{className:"Form-group"},m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.request_erasure.reason",{reason:e.reason()})))),r.add("cancel",m("div",{className:"Form-group"},N().component({className:"Button Button--primary Button--block",onclick:this.oncancel.bind(this),loading:this.loading},o().translator.trans("blomstra-gdpr.forum.request_erasure.cancel_button"))))):(r.add("text",m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.request_erasure.text"))),o().forum.attribute("passwordlessSignUp")||r.add("password",m("div",{className:"Form-group"},m("input",{type:"password",className:"FormControl",bidi:this.password,placeholder:A()(o().translator.trans("blomstra-gdpr.forum.request_erasure.password_label"))}))),r.add("reason",m("div",{className:"Form-group"},m("textarea",{className:"FormControl",value:this.reason(),oninput:function(r){return t.reason(r.target.value)},placeholder:A()(o().translator.trans("blomstra-gdpr.forum.request_erasure.reason_label"))}))),r.add("submit",m("div",{className:"Form-group"},N().component({className:"Button Button--primary Button--block",type:"submit",loading:this.loading},o().translator.trans("blomstra-gdpr.forum.request_erasure.request_button"))))),r},e.oncancel=function(t){var r=this;this.loading=!0,m.redraw(),o().session.user.erasureRequest().delete().then((function(){r.loading=!1,m.redraw()}))},e.data=function(){return{reason:this.reason(),status:"user_confirmed",relationships:{user:o().session.user}}},e.onsubmit=function(t){var r=this;t.preventDefault(),this.loading=!0,o().store.createRecord("user-erasure-requests").save(this.data(),{meta:{password:this.password()}}).then((function(t){o().session.user.pushData({relationships:{erasureRequest:t}}),r.loading=!1,m.redraw()})).catch((function(){r.loading=!1,m.redraw()}))},r}(x());const M=flarum.core.compat["common/app"];var F=t.n(M),k=function(t){function r(){for(var r,e=arguments.length,o=new Array(e),s=0;s<e;s++)o[s]=arguments[s];return(r=t.call.apply(t,[this].concat(o))||this).user=void 0,r}a(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),this.user=this.attrs.user},e.className=function(){return"RequestDataModal Modal--small"},e.title=function(){return F().translator.trans("blomstra-gdpr.lib.request_data.title",{username:l()(this.user)})},e.content=function(){var t=this;return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("p",{className:"helpText"},F().translator.trans("blomstra-gdpr.lib.request_data.text")),m("div",{className:"Form-group"},m(N(),{className:"Button Button--primary Button--block",onclick:function(){return t.requestExport()},loading:this.loading,disabled:this.loading},F().translator.trans("blomstra-gdpr.lib.request_data.request_button")))))},e.requestExport=function(){this.loading=!0,F().request({method:"POST",url:F().forum.attribute("apiUrl")+"/gdpr/export",body:{data:{attributes:{userId:this.user.id()}}}}).then(this.hide.bind(this),this.loaded.bind(this))},r}(x());const D=flarum.core.compat["forum/components/HeaderSecondary"];var E=t.n(D);const O=flarum.core.compat["forum/components/NotificationsDropdown"];var T=t.n(O);const S=flarum.core.compat["common/Component"];var L=t.n(S);const z=flarum.core.compat["common/components/LoadingIndicator"];var P=t.n(z);const j=flarum.core.compat["common/helpers/avatar"];var I=t.n(j);const U=flarum.core.compat["common/helpers/icon"];var G=t.n(U);const H=flarum.core.compat["common/helpers/humanTime"];var J=t.n(H),K=function(t){function r(){for(var r,e=arguments.length,o=new Array(e),s=0;s<e;s++)o[s]=arguments[s];return(r=t.call.apply(t,[this].concat(o))||this).comments=void 0,r.loadingAnonymization=!1,r.loadingDeletion=!1,r.request=void 0,r}a(r,t);var e=r.prototype;return e.oninit=function(r){var e;t.prototype.oninit.call(this,r),this.request=this.attrs.request||o().store.createRecord("user-erasure-requests",{relationships:{user:null==(e=this.attrs.user)?void 0:e.id()}}),this.comments=R()("")},e.className=function(){return"ProcessErasureRequestModal Modal--small"},e.title=function(){return o().translator.trans("blomstra-gdpr.forum.process_erasure.title")},e.content=function(){return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},this.fields().toArray()))},e.fields=function(){var t=this,r=new(h()),e=this.attrs.request;return r.add("text",m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.process_erasure.text",{name:l()(this.request.user())}))),(null==e?void 0:e.reason())&&r.add("reason",m("p",{className:"helpText"},m("code",null,e.reason()))),r.add("comments",m("div",{className:"Form-group"},m("textarea",{className:"FormControl",value:this.comments(),bidi:this.comments,placeholder:A()(o().translator.trans("blomstra-gdpr.forum.process_erasure.comments_label"))}))),o().forum.attribute("erasureAnonymizationAllowed")&&r.add("anonymize",m("div",{className:"Form-group"},N().component({className:"Button Button--primary Button--block",loading:this.loadingAnonymization,onclick:function(){return t.process("anonymization")}},o().translator.trans("blomstra-gdpr.forum.process_erasure.anonymization_button")))),o().forum.attribute("erasureDeletionAllowed")&&r.add("delete",m("div",{className:"Form-group"},N().component({className:"Button Button--danger Button--block",loading:this.loadingDeletion,onclick:function(){return t.process("deletion")}},o().translator.trans("blomstra-gdpr.forum.process_erasure.deletion_button")))),r},e.process=function(t){var r=this;confirm(o().translator.trans("blomstra-gdpr.forum.process_erasure.confirm",{name:A()(l()(this.request.user())),mode:t}))&&("anonymization"===t?this.loadingAnonymization=!0:this.loadingDeletion=!0,m.redraw(),this.request.save({processor_comment:this.comments(),meta:{mode:t}}).then((function(t){o().store.remove(t),r.loadingAnonymization=!1,r.loadingDeletion=!1,m.redraw(),r.hide()})).catch((function(){r.loadingAnonymization=!1,r.loadingDeletion=!1,m.redraw()})))},r}(x()),Q=function(t){function r(){return t.apply(this,arguments)||this}a(r,t);var e=r.prototype;return e.view=function(){var t=this,r=o().store.all("user-erasure-requests"),e=this.attrs.state;return m("div",{className:"NotificationList ErasureRequestsList"},m("div",{className:"NotificationList-header"},m("h4",{className:"App-titleControl App-titleControl--text"},o().translator.trans("blomstra-gdpr.forum.erasure_requests.title"))),m("div",{className:"NotificationList-content"},m("ul",{className:"NotificationGroup-content"},r.length?r.map((function(r){return m("li",null,m("a",{onclick:t.showModal.bind(t,r),className:"Notification Request"},I()(r.user()),G()("fas fa-user-edit",{className:"Notification-icon"}),m("span",{className:"Notification-content"},o().translator.trans("blomstra-gdpr.forum.erasure_requests.item_text",{name:l()(r.user())})),J()(r.createdAt())))})):e.loading?P().component({className:"LoadingIndicator--block"}):m("div",{className:"NotificationList-empty"},o().translator.trans("blomstra-gdpr.forum.erasure_requests.empty_text")))))},e.showModal=function(t){o().modal.show(K,{request:t})},r}(L()),V=function(t){function r(){return t.apply(this,arguments)||this}a(r,t),r.initAttrs=function(r){r.label=r.label||o().translator.trans("blomstra-gdpr.forum.erasure_requests.tooltip"),r.icon=r.icon||"fas fa-user-minus",t.initAttrs.call(this,r)};var e=r.prototype;return e.getMenu=function(){return m("div",{className:"Dropdown-menu "+this.attrs.menuClassName,onclick:this.menuClick.bind(this)},this.showing?Q.component({state:this.attrs.state}):"")},e.goToRoute=function(){m.route.set(o().route("erasure-requests"))},e.getUnreadCount=function(){return this.attrs.state.requestsLoaded?o().store.all("erasure-requests").length:o().forum.attribute("erasureRequestCount")},e.getNewCount=function(){return this.getUnreadCount()},r}(T());const W=flarum.core.compat["common/components/Page"];var X=t.n(W);const Y=flarum.core.compat["forum/utils/UserControls"];var Z=t.n(Y);const $=flarum.core.compat["common/extenders"];var tt=t.n($),rt=function(t){function r(){return t.apply(this,arguments)||this}a(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),o().history.push("erasure-requests"),o().erasureRequests.load(),this.bodyClass="App--ErasureRequests"},e.view=function(){return m("div",{className:"ErasureRequestsPage"},m(Q,{state:o().erasureRequests}))},r}(X());const et=flarum.core.compat["common/models/User"];var ot=t.n(et);const st=flarum.core.compat["common/Model"];var nt=t.n(st),at=function(t){function r(){return t.apply(this,arguments)||this}a(r,t);var e=r.prototype;return e.status=function(){return nt().attribute("status").call(this)},e.reason=function(){return nt().attribute("reason").call(this)},e.createdAt=function(){return nt().attribute("createdAt",nt().transformDate).call(this)},e.userConfirmedAt=function(){return nt().attribute("userConfirmedAt",nt().transformDate).call(this)},e.processedAt=function(){return nt().attribute("processedAt",nt().transformDate).call(this)},e.processorComment=function(){return nt().attribute("processorComment").call(this)},e.processedMode=function(){return nt().attribute("processedMode").call(this)},e.user=function(){return nt().hasOne("user").call(this)},e.processedBy=function(){return nt().hasOne("processedBy").call(this)},r}(nt()),it=function(t){function r(){return t.apply(this,arguments)||this}a(r,t);var e=r.prototype;return e.file=function(){return nt().attribute("file").call(this)},e.createdAt=function(){return nt().attribute("createdAt",nt().transformDate)},e.destroysAt=function(){return nt().attribute("destroysAt",nt().transformDate)},e.user=function(){return nt().hasOne("user")},e.actor=function(){return nt().hasOne("actor")},r}(nt());const ut=[(new(tt().Store)).add("user-erasure-requests",at).add("exports",it),new(tt().Model)(ot()).attribute("canModerateExports").hasOne("erasureRequest")],ct=[].concat(ut,[(new(tt().Routes)).add("erasure-requests","/erasure-requests",rt).add("gdpr.export","/gdpr/export/:file","")]);o().initializers.add("blomstra-gdpr",(function(){o().erasureRequests=new s,o().notificationComponents.gdprExportAvailable=d,(0,p.extend)(b().prototype,"settingsItems",(function(t){this.user&&t.add("dataItems",m(y(),{className:"Settings-gdpr",label:o().translator.trans("blomstra-gdpr.forum.settings.data.heading")},this.dataItems().toArray()),90)})),b().prototype.dataItems=function(){var t=this,r=new(h());return r.add("gdprErasure",m("div",{className:"gdprErasure-container"},m(N(),{className:"Button Button-gdprErasure",icon:"fas fa-user-minus",onclick:function(){return o().modal.show(B)}},o().translator.trans("blomstra-gdpr.forum.settings.request_erasure_button")),m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.settings.request_erasure_help"))),50),r.add("gdprExport",m("div",{className:"gdprExport-container"},m(N(),{className:"Button Button-gdprExport",icon:"fas fa-file-export",onclick:function(){return o().modal.show(k,{user:t.user})}},o().translator.trans("blomstra-gdpr.forum.settings.export_data_button")),m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.settings.export_data_help"))),40),r},(0,p.extend)(E().prototype,"items",(function(t){o().forum.attribute("erasureRequestCount")&&t.add("erasureRequests",m(V,{state:o().erasureRequests}),20)})),(0,p.extend)(X().prototype,"oninit",(function(){m.route.param("erasureRequestConfirmed")&&o().alerts.show({type:"success"},o().translator.trans("blomstra-gdpr.forum.erasure_request_confirmed"))})),(0,p.extend)(Z(),"moderationControls",(function(t,r){var e;null!=(e=o().session.user)&&e.canModerateExports()&&t.add("gdpr-export",m(N(),{icon:"fas fa-file-export",onclick:function(){return o().modal.show(k,{user:r})}},o().translator.trans("blomstra-gdpr.forum.settings.export_data_button")))})),(0,p.extend)(Z(),"destructiveControls",(function(t,r){t.remove("delete"),r.canDelete()&&t.add("gdpr-erase",m(N(),{icon:"fas fa-times",onclick:function(){return o().modal.show(K,{user:r})}},o().translator.trans("core.forum.user_controls.delete_button")))}))}))})(),module.exports=r})();
//# sourceMappingURL=forum.js.map