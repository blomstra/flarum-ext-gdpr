(()=>{var t={n:r=>{var e=r&&r.__esModule?()=>r.default:()=>r;return t.d(e,{a:e}),e},d:(r,e)=>{for(var o in e)t.o(e,o)&&!t.o(r,o)&&Object.defineProperty(r,o,{enumerable:!0,get:e[o]})},o:(t,r)=>Object.prototype.hasOwnProperty.call(t,r),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},r={};(()=>{"use strict";t.r(r),t.d(r,{extend:()=>ft});const e=flarum.core.compat["forum/app"];var o=t.n(e),n=function(){function t(){this.loading=!1,this.requestsLoaded=!1}return t.prototype.load=function(){var t=this;this.requestsLoaded||(this.loading=!0,m.redraw(),o().store.find("user-erasure-requests").then((function(){return t.requestsLoaded=!0}),(function(){})).then((function(){t.loading=!1,m.redraw()})))},t}();function a(t,r){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,r){return t.__proto__=r,t},a(t,r)}function s(t,r){t.prototype=Object.create(r.prototype),t.prototype.constructor=t,a(t,r)}const i=flarum.core.compat["forum/components/Notification"];var u=t.n(i);const l=flarum.core.compat["common/helpers/username"];var c=t.n(l),d=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.icon=function(){return"fas fa-file-export"},e.href=function(){var t=this.attrs.notification.subject();return o().forum.attribute("baseUrl")+"/gdpr/export/"+t.file()},e.content=function(){var t=this.attrs.notification;return o().translator.trans("blomstra-gdpr.forum.notification.export-ready",{username:c()(t.fromUser())})},e.excerpt=function(){return null},r}(u());const p=flarum.core.compat["common/extend"],f=flarum.core.compat["common/utils/ItemList"];var h=t.n(f);const g=flarum.core.compat["forum/components/SettingsPage"];var b=t.n(g);const v=flarum.core.compat["common/components/FieldSet"];var y=t.n(v);const N=flarum.core.compat["common/components/Button"];var q=t.n(N);const _=flarum.core.compat["common/components/Modal"];var x=t.n(_);const w=flarum.core.compat["common/utils/extractText"];var A=t.n(w);const B=flarum.core.compat["common/utils/Stream"];var C=t.n(B),z=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),this.reason=C()(""),this.password=C()("")},e.className=function(){return"RequestErasureModal Modal--small"},e.title=function(){return o().translator.trans("blomstra-gdpr.forum.request_erasure.title")},e.content=function(){return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},this.fields().toArray()))},e.fields=function(){var t=this,r=new(h()),e=o().session.user.erasureRequest();return e?(r.add("status",m("div",{className:"Form-group"},m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.request_erasure.status."+e.status())))),e.reason()&&r.add("reason",m("div",{className:"Form-group"},m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.request_erasure.reason",{reason:e.reason()})))),r.add("cancel",m("div",{className:"Form-group"},q().component({className:"Button Button--primary Button--block",onclick:this.oncancel.bind(this),loading:this.loading},o().translator.trans("blomstra-gdpr.forum.request_erasure.cancel_button"))))):(r.add("text",m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.request_erasure.text"))),o().forum.attribute("passwordlessSignUp")||r.add("password",m("div",{className:"Form-group"},m("input",{type:"password",className:"FormControl",bidi:this.password,placeholder:A()(o().translator.trans("blomstra-gdpr.forum.request_erasure.password_label"))}))),r.add("reason",m("div",{className:"Form-group"},m("textarea",{className:"FormControl",value:this.reason(),oninput:function(r){return t.reason(r.target.value)},placeholder:A()(o().translator.trans("blomstra-gdpr.forum.request_erasure.reason_label"))}))),r.add("submit",m("div",{className:"Form-group"},q().component({className:"Button Button--primary Button--block",type:"submit",loading:this.loading},o().translator.trans("blomstra-gdpr.forum.request_erasure.request_button"))))),r},e.oncancel=function(t){var r=this;this.loading=!0,m.redraw(),o().session.user.erasureRequest().delete().then((function(){r.loading=!1,m.redraw()}))},e.data=function(){return{reason:this.reason(),status:"user_confirmed",relationships:{user:o().session.user}}},e.onsubmit=function(t){var r=this;t.preventDefault(),this.loading=!0,o().store.createRecord("user-erasure-requests").save(this.data(),{meta:{password:this.password()}}).then((function(t){o().session.user.pushData({relationships:{erasureRequest:t}}),r.loading=!1,m.redraw()})).catch((function(){r.loading=!1,m.redraw()}))},r}(x());const D=flarum.core.compat["common/app"];var F=t.n(D);const M=flarum.core.compat["common/helpers/avatar"];var E=t.n(M),k=function(t){function r(){for(var r,e=arguments.length,o=new Array(e),n=0;n<e;n++)o[n]=arguments[n];return(r=t.call.apply(t,[this].concat(o))||this).user=void 0,r}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),this.user=this.attrs.user},e.className=function(){return"RequestDataModal Modal--small"},e.title=function(){return F().translator.trans("blomstra-gdpr.lib.request_data.title",{username:c()(this.user)})},e.content=function(){var t=this;return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("div",{className:"User"},E()(this.user)),m("p",{className:"helpText"},F().translator.trans("blomstra-gdpr.lib.request_data.text")),m("div",{className:"Form-group"},m(q(),{className:"Button Button--primary Button--block",onclick:function(){return t.requestExport()},loading:this.loading,disabled:this.loading},F().translator.trans("blomstra-gdpr.lib.request_data.request_button")))))},e.requestExport=function(){this.loading=!0,F().request({method:"POST",url:F().forum.attribute("apiUrl")+"/gdpr/export",body:{data:{attributes:{userId:this.user.id()}}}}).then(this.hide.bind(this),this.loaded.bind(this))},r}(x());const R=flarum.core.compat["forum/components/HeaderSecondary"];var O=t.n(R);const T=flarum.core.compat["forum/components/NotificationsDropdown"];var U=t.n(T);const L=flarum.core.compat["common/Component"];var S=t.n(L);const P=flarum.core.compat["common/components/LoadingIndicator"];var j=t.n(P);const I=flarum.core.compat["common/helpers/icon"];var G=t.n(I);const H=flarum.core.compat["common/helpers/humanTime"];var J=t.n(H);const K=flarum.core.compat["forum/components/UserCard"];var Q=t.n(K),V=function(t){function r(){for(var r,e=arguments.length,o=new Array(e),n=0;n<e;n++)o[n]=arguments[n];return(r=t.call.apply(t,[this].concat(o))||this).comments=void 0,r.loadingAnonymization=!1,r.loadingDeletion=!1,r.request=void 0,r}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),this.request=this.attrs.request,this.comments=C()("")},e.className=function(){return"ProcessErasureRequestModal Modal--medium"},e.title=function(){return o().translator.trans("blomstra-gdpr.forum.process_erasure.title")},e.content=function(){return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},this.fields().toArray()))},e.fields=function(){var t=this,r=new(h()),e=this.attrs.request;return r.add("text",m("div",null,m(Q(),{className:"UserCard--popover UserCard--gdpr",user:this.request.user()}),m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.process_erasure.text",{name:c()(this.request.user())})))),(null==e?void 0:e.reason())&&r.add("reason",m("p",{className:"helpText"},m("code",null,e.reason()))),r.add("comments",m("div",{className:"Form-group"},m("textarea",{className:"FormControl",value:this.comments(),bidi:this.comments,placeholder:A()(o().translator.trans("blomstra-gdpr.forum.process_erasure.comments_label"))}))),o().forum.attribute("erasureAnonymizationAllowed")&&r.add("anonymize",m("div",{className:"Form-group"},q().component({className:"Button Button--primary Button--block",loading:this.loadingAnonymization,onclick:function(){return t.process("anonymization")}},o().translator.trans("blomstra-gdpr.forum.process_erasure.anonymization_button")))),o().forum.attribute("erasureDeletionAllowed")&&r.add("delete",m("div",{className:"Form-group"},q().component({className:"Button Button--danger Button--block",loading:this.loadingDeletion,onclick:function(){return t.process("deletion")}},o().translator.trans("blomstra-gdpr.forum.process_erasure.deletion_button")))),r},e.process=function(t){var r=this;confirm(o().translator.trans("blomstra-gdpr.forum.process_erasure.confirm",{name:A()(c()(this.request.user())),mode:t}))&&("anonymization"===t?this.loadingAnonymization=!0:this.loadingDeletion=!0,m.redraw(),this.request.save({processor_comment:this.comments(),meta:{mode:t}}).then((function(t){o().store.remove(t),r.loadingAnonymization=!1,r.loadingDeletion=!1,m.redraw(),r.hide()})).catch((function(){r.loadingAnonymization=!1,r.loadingDeletion=!1,m.redraw()})))},r}(x()),W=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.view=function(){var t=this,r=o().store.all("user-erasure-requests"),e=this.attrs.state;return m("div",{className:"NotificationList ErasureRequestsList"},m("div",{className:"NotificationList-header"},m("h4",{className:"App-titleControl App-titleControl--text"},o().translator.trans("blomstra-gdpr.forum.erasure_requests.title"))),m("div",{className:"NotificationList-content"},m("ul",{className:"NotificationGroup-content"},r.length?r.map((function(r){return m("li",null,m("a",{onclick:t.showModal.bind(t,r),className:"Notification Request"},E()(r.user()),G()("fas fa-user-edit",{className:"Notification-icon"}),m("span",{className:"Notification-content"},o().translator.trans("blomstra-gdpr.forum.erasure_requests.item_text",{name:c()(r.user())})),J()(r.createdAt())))})):e.loading?j().component({className:"LoadingIndicator--block"}):m("div",{className:"NotificationList-empty"},o().translator.trans("blomstra-gdpr.forum.erasure_requests.empty_text")))))},e.showModal=function(t){o().modal.show(V,{request:t})},r}(S()),X=function(t){function r(){return t.apply(this,arguments)||this}s(r,t),r.initAttrs=function(r){r.label=r.label||o().translator.trans("blomstra-gdpr.forum.erasure_requests.tooltip"),r.icon=r.icon||"fas fa-user-minus",t.initAttrs.call(this,r)};var e=r.prototype;return e.getMenu=function(){return m("div",{className:"Dropdown-menu "+this.attrs.menuClassName,onclick:this.menuClick.bind(this)},this.showing?W.component({state:this.attrs.state}):"")},e.goToRoute=function(){m.route.set(o().route("erasure-requests"))},e.getUnreadCount=function(){return this.attrs.state.requestsLoaded?o().store.all("erasure-requests").length:o().forum.attribute("erasureRequestCount")},e.getNewCount=function(){return this.getUnreadCount()},r}(U());const Y=flarum.core.compat["common/components/Page"];var Z=t.n(Y);const $=flarum.core.compat["forum/utils/UserControls"];var tt=t.n($),rt=function(t){function r(){for(var r,e=arguments.length,o=new Array(e),n=0;n<e;n++)o[n]=arguments[n];return(r=t.call.apply(t,[this].concat(o))||this).user=void 0,r.loadingAnonymization=!1,r.loadingDeletion=!1,r}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),this.user=this.attrs.user},e.className=function(){return"DeleteUserModal Modal--small"},e.title=function(){return o().translator.trans("blomstra-gdpr.forum.delete_user.title",{username:c()(this.user)})},e.content=function(){var t=this;return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.delete_user.text",{username:c()(this.user)})),m("div",{className:"Form-group"},m(q(),{className:"Button Button--primary Button--block",onclick:function(){return t.defaultErasure()},loading:this.loading,disabled:this.loading},o().translator.trans("blomstra-gdpr.forum.delete_user.modal_delete_button"))),o().forum.attribute("erasureAnonymizationAllowed")&&o().forum.attribute("erasureDeletionAllowed")&&m("div",null,m("div",{className:"Form-group"},m(q(),{className:"Button Button--block",onclick:function(){return t.specificErasure("anonymization")},loading:this.loadingAnonymization,disabled:this.loadingAnonymization},o().translator.trans("blomstra-gdpr.forum.process_erasure.anonymization_button"))),m("div",{className:"Form-group"},m(q(),{className:"Button Button--danger Button--block",onclick:function(){return t.specificErasure("deletion")},loading:this.loadingDeletion,disabled:this.loadingDeletion},o().translator.trans("blomstra-gdpr.forum.process_erasure.deletion_button"))))))},e.defaultErasure=function(){var t=this;this.loading=!0,this.user.delete().then((function(){t.hide(),t.loading=!1,m.redraw()}),(function(){}))},e.specificErasure=function(t){var r=this;"anonymization"===t?this.loadingAnonymization=!0:this.loadingDeletion=!0,o().request({method:"DELETE",url:o().forum.attribute("apiUrl")+"/users/"+this.user.id()+"/gdpr/"+t}).then((function(){r.hide(),r.loadingAnonymization=!1,r.loadingDeletion=!1,m.redraw()}),(function(){return[]}))},r}(x());const et=flarum.core.compat["common/models/User"];var ot=t.n(et);const nt=flarum.core.compat["common/components/Badge"];var at=t.n(nt);const st=flarum.core.compat["common/extenders"];var it=t.n(st),ut=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),o().history.push("erasure-requests"),o().erasureRequests.load(),this.bodyClass="App--ErasureRequests"},e.view=function(){return m("div",{className:"ErasureRequestsPage"},m(W,{state:o().erasureRequests}))},r}(Z());const lt=flarum.core.compat["common/Model"];var mt=t.n(lt),ct=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.status=function(){return mt().attribute("status").call(this)},e.reason=function(){return mt().attribute("reason").call(this)},e.createdAt=function(){return mt().attribute("createdAt",mt().transformDate).call(this)},e.userConfirmedAt=function(){return mt().attribute("userConfirmedAt",mt().transformDate).call(this)},e.processedAt=function(){return mt().attribute("processedAt",mt().transformDate).call(this)},e.processorComment=function(){return mt().attribute("processorComment").call(this)},e.processedMode=function(){return mt().attribute("processedMode").call(this)},e.user=function(){return mt().hasOne("user").call(this)},e.processedBy=function(){return mt().hasOne("processedBy").call(this)},r}(mt()),dt=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.file=function(){return mt().attribute("file").call(this)},e.createdAt=function(){return mt().attribute("createdAt",mt().transformDate)},e.destroysAt=function(){return mt().attribute("destroysAt",mt().transformDate)},e.user=function(){return mt().hasOne("user")},e.actor=function(){return mt().hasOne("actor")},r}(mt());const pt=[(new(it().Store)).add("user-erasure-requests",ct).add("exports",dt),new(it().Model)(ot()).attribute("canModerateExports").attribute("anonymized").hasOne("erasureRequest")],ft=[].concat(pt,[(new(it().Routes)).add("erasure-requests","/erasure-requests",ut)]);o().initializers.add("blomstra-gdpr",(function(){o().erasureRequests=new n,o().notificationComponents.gdprExportAvailable=d,(0,p.extend)(b().prototype,"settingsItems",(function(t){this.user&&t.add("dataItems",m(y(),{className:"Settings-gdpr",label:o().translator.trans("blomstra-gdpr.forum.settings.data.heading")},this.dataItems().toArray()),90)})),b().prototype.dataItems=function(){var t=this,r=new(h());return r.add("gdprErasure",m("div",{className:"gdprErasure-container"},m(q(),{className:"Button Button-gdprErasure",icon:"fas fa-user-minus",onclick:function(){return o().modal.show(z)}},o().translator.trans("blomstra-gdpr.forum.settings.request_erasure_button")),m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.settings.request_erasure_help"))),50),r.add("gdprExport",m("div",{className:"gdprExport-container"},m(q(),{className:"Button Button-gdprExport",icon:"fas fa-file-export",onclick:function(){return o().modal.show(k,{user:t.user})}},o().translator.trans("blomstra-gdpr.forum.settings.export_data_button")),m("p",{className:"helpText"},o().translator.trans("blomstra-gdpr.forum.settings.export_data_help"))),40),r},(0,p.extend)(O().prototype,"items",(function(t){o().forum.attribute("erasureRequestCount")&&t.add("erasureRequests",m(X,{state:o().erasureRequests}),20)})),(0,p.extend)(Z().prototype,"oninit",(function(){m.route.param("erasureRequestConfirmed")&&o().alerts.show({type:"success"},o().translator.trans("blomstra-gdpr.forum.erasure_request_confirmed"))})),(0,p.extend)(tt(),"moderationControls",(function(t,r){r.canModerateExports()&&t.add("gdpr-export",m(q(),{icon:"fas fa-file-export",onclick:function(){return o().modal.show(k,{user:r})}},o().translator.trans("blomstra-gdpr.forum.settings.export_data_button")))})),(0,p.extend)(tt(),"destructiveControls",(function(t,r){t.remove("delete"),r.canDelete()&&t.add("gdpr-erase",m(q(),{icon:"fas fa-eraser",onclick:function(){return o().modal.show(rt,{user:r})}},o().translator.trans("blomstra-gdpr.forum.delete_user.delete_button")))})),(0,p.extend)(ot().prototype,"badges",(function(t){this.anonymized()&&t.add("anonymized",m(at(),{label:o().translator.trans("blomstra-gdpr.forum.badges.anonymized_user"),icon:"fas fa-user-secret",type:"anonymized"}))}))}))})(),module.exports=r})();
//# sourceMappingURL=forum.js.map