!function(){function e(e,t,n){Object.defineProperty(e,t,{get:n,enumerable:!0})}var t={get:function(e,t){const n=localStorage.getItem(e);if(null==n)return t;if("true"===n)return!0;if("false"===n)return!1;if(n.startsWith("[")||n.startsWith("{"))return JSON.parse(n);const o=Number(n);if(!Number.isNaN(o))return o;return n},set:function(e,t){try{"string"==typeof t?localStorage.setItem(e,t):localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error("local-storage-json: failed to set",{key:e,value:t,details:n})}},has:function(e){return e in localStorage},remove:function(e){localStorage.removeItem(e)}};function n(e){try{return JSON.parse(e)}catch(e){return null}}var o={createName:function(e,t){return`${e}|${JSON.stringify(t)}`},getName:i,getParams:function(){return n(window.self.name.split("|")[1])||{}},isIframe:function(e=null){return window.self!==parent&&(!e||i()===e)}};function i(){return window.self.name.split("|")[0]||null}async function r(){s()||await new Promise((e=>{document.addEventListener("readystatechange",(function t(){s()&&(document.removeEventListener("readystatechange",t),e())}))}))}function s(){return"interactive"===document.readyState||"complete"===document.readyState}var a=document.documentElement;async function l(e,t=null){let n,o;return"number"==typeof t?(n=t,o=100):t?(n=t.timeout||3e4,o=t.frequency||100):(n=3e4,o=100),new Promise(((t,i)=>{const r=e();if(r)return void t(r);const s=setInterval((()=>{const n=e();n&&(clearInterval(s),t(n))}),o);setTimeout((()=>{clearInterval(s),t(null)}),n)}))}function c(e){return Array.isArray(e)?e:[e]}function d(e,...t){let n=0;return e.join("###").split(",").join("\n,\n").split("{").join("\n{").split("\n").map((e=>{if(!e.includes("###"))return e;const o=c(t[n]).map((t=>e.split("###").join(t))).join(",\n");return n+=1,o})).join("\n").split(";").join(" !important;").replace(/!important\s*!important/g,"!important")}function p(...e){const t=d(...e);document.head.insertAdjacentHTML("afterbegin",t)}function u(...e){const t=d(...e).split("!important").join("");document.head.insertAdjacentHTML("afterbegin",t)}var h=Object.assign((function(e,t=!1){0===g.length&&(f=new MutationObserver((e=>{for(const t of g){f.disconnect();try{t(e)}catch(e){console.error("onDocMutations",e)}if(!f)return;f.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0})}})),f.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0}));g.push(e),t&&e()}),{off:function(e){const t=g.indexOf(e);if(-1===t)return;g.splice(t,1),0===g.length&&(f.disconnect(),f=null)}});const g=[];let f;function m(e,t=document){e=c(e);for(const n of e){const e=t.querySelector(n);if(e)return e}return null}function v(e,t=document){e=c(e);const n=[];for(const o of e){const e=t.querySelectorAll(o);for(const t of e)n.includes(t)||n.push(t)}return n}var b={},y={},x={},w={},_=1;w={nextValue:function(){return(_=(9301*_+49297)%233280)/233280},seed:function(e){_=e}};var P,S,k,C="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function T(){k=!1}function A(e){if(e){if(e!==P){if(e.length!==C.length)throw new Error("Custom alphabet for shortid must be "+C.length+" unique characters. You submitted "+e.length+" characters: "+e);var t=e.split("").filter((function(e,t,n){return t!==n.lastIndexOf(e)}));if(t.length)throw new Error("Custom alphabet for shortid must be "+C.length+" unique characters. These characters were not unique: "+t.join(", "));P=e,T()}}else P!==C&&(P=C,T())}function $(){return k||(k=function(){P||A(C);for(var e,t=P.split(""),n=[],o=w.nextValue();t.length>0;)o=w.nextValue(),e=Math.floor(o*t.length),n.push(t.splice(e,1)[0]);return n.join("")}())}x={get:function(){return P||C},characters:function(e){return A(e),P},seed:function(e){w.seed(e),S!==e&&(T(),S=e)},lookup:function(e){return $()[e]},shuffled:$};var E="object"==typeof window&&(window.crypto||window.msCrypto),R=E&&E.getRandomValues?function(e){return E.getRandomValues(new Uint8Array(e))}:function(e){for(var t=[],n=0;n<e;n++)t.push(Math.floor(256*Math.random()));return t},L=function(e,t,n){for(var o=(2<<Math.log(t.length-1)/Math.LN2)-1,i=-~(1.6*o*n/t.length),r="";;)for(var s=e(i),a=i;a--;)if((r+=t[s[a]&o]||"").length===+n)return r};var M,B,I=function(e){for(var t,n=0,o="";!t;)o+=L(R,x.get(),1),t=e<Math.pow(16,n+1),n++;return o};var F=function(e){var t="",n=Math.floor(.001*(Date.now()-1567752802062));return n===B?M++:(M=0,B=n),t+=I(7),t+=I(e),M>0&&(t+=I(M)),t+=I(n)};var D,z=function(e){return!(!e||"string"!=typeof e||e.length<6)&&!new RegExp("[^"+x.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(e)},O=!1;var H=(O||(O=!0,D={},D=0),D||0);function V(){return F(H)}var j=V;(y=V).generate=j;var N=function(e){return x.seed(e),y};y.seed=N;var U=function(e){return H=e,y};y.worker=U;var W=function(e){return void 0!==e&&x.characters(e),x.shuffled()};y.characters=W;var q=z;y.isValid=q,b=y;var Y={on:function(e,t){K();(X[e]||(X[e]=[])).push(t)},off:function(e,t){const n=X[e];if(!n)return;for(;;){const e=n.findIndex((e=>e===t));if(-1===e)break;n.splice(e,1)}},send:function(e,...t){let n;const o=t[t.length-1];"function"==typeof o?(n=o,t=t.slice(0,-1)):n=null;return new Promise((o=>{chrome.runtime.sendMessage({[Q]:e,[J]:t},(e=>{chrome.runtime.lastError||e!==G&&(n&&n(e),o(e))}))}))}};const G="__chromeBus.EMPTY_RESPONSE",X={},Q="__chromeBus.name",J="__chromeBus.args";function K(){const e=K;e.init||(e.init=!0,chrome.runtime.onMessage.addListener(((e,t,n)=>{const o=e["__chromeBus.name"];if(!o)return!1;const i=e["__chromeBus.args"]||[],r=X[o]||[];return 0===r.length?(n(G),!0):((async()=>{const e=await Promise.all(r.map((e=>e(...i)))),t=e[e.length-1];n(t)})(),!!n)})))}var Z={init:function(){Y.on("iframe-bus",((e,...t)=>ae(e,...t))),ie("chrome-bus",((e,...t)=>Y.send(e,...t)))},on:ie,once:re,off:se,send:ae,wait:async function(e){return await new Promise((t=>{re(e,t)}))}};const ee="__iframeBus.name",te="__iframeBus.args",ne="__iframeBus.callbackId",oe=parent!==window;function ie(e,t){const n=le(e),o=t["__iframeBus.handlers"]||(t["__iframeBus.handlers"]={});o[e]=async o=>{if(o.data["__iframeBus.name"]===n){const n=o.data["__iframeBus.args"]||[],i=o.data["__iframeBus.callbackId"]||null,r=await t(...n);i&&ae(`${e}:response-${i}`,r)}},window.addEventListener("message",o[e])}function re(e,t){ie(e,(function n(...o){return se(e,n),t(...o)}))}function se(e,t){const n=t["__iframeBus.handlers"]||(t["__iframeBus.handlers"]={});window.removeEventListener("message",n[e])}async function ae(e,...t){let n;const o=t[t.length-1];"function"==typeof o?(n=o,t=t.slice(0,-1)):n=null;const i=e.includes(":response-"),r=le(e),s=i?null:b.generate();if(oe?parent.postMessage({[ee]:r,[te]:t,[ne]:s},"*"):v("iframe").forEach((e=>{e.contentWindow.postMessage({[ee]:r,[te]:t,[ne]:s},"*")})),!i)return new Promise((t=>{const o=i=>{n&&n(i),se(`${e}:response-${s}`,o),t(i)};ie(`${e}:response-${s}`,o)}))}function le(e){return`iframe-bus.${e}`}var ce={getConfig:function e(){const t=e;if(!t.config){const e=o.getParams();t.config=e.fusionConfig}return t.config}};function de(e,t){if(e[0]!==t[0])return!1;const n=Math.min(e.length,t.length);if(0===n)return"";const o=e.substr(0,n);return o===t.substr(0,n)?o:de(e.substr(0,n-1),t.substr(0,n-1))}function pe(e){return e.toLowerCase().replace(/[ .,?!\-—–+=_%:;$#@/{}()]/g,"")}var ue=Object.assign((async function(e,t=3e4){await r(),"v2"===window.inssist.igBundleVersion&&await l((()=>m(".BaseView")));he[e]&&await he[e];const n=e.split(":")[0],o=window.inssist.moduleInterceptor,i=await l((()=>o.getModule(n)),t);i||console.error(`ig: failed to require ${n}`);return i}),{lock:function(e){he[e]=function(){let e;const t=new Promise((t=>{e=t}));return Object.defineProperty(t,"resolve",{get:()=>e}),t}()},unlock:ge,unlockOnNextTick:function(e){setTimeout((()=>ge(e)))}});const he={};function ge(e){he[e]&&he[e].resolve()}const fe={init:async function(){this.sel=ce.getConfig().dmSelectors,this.store=await ue("store"),this.store&&(this.popup=null,this.textarea=null,this.preventReplyHover=!1,this.preventHideOnBlur=!1,this.prevState={},this.state={show:!1,replies:[],filterString:null,activeReplyIndex:0},this.keepRepliesInSync(),this.initPopup(),this.initToggler(),this.initTextarea(),this.initStyles(),this.update())},keepRepliesInSync:function(){(async()=>{const e=await Z.send("quick-replies.fetch");this.setState({replies:e})})(),Z.on("quick-replies.update",(e=>{this.setState({replies:e})}))},setState:function(e={}){this.prevState={...this.state},this.state={...this.state,...e},this.update()},onTogglerClick:function(){0===this.state.replies.length?Z.send("quick-replies.toggle"):this.setTextareaValue("/")},onManageMouseDown:function(e){Z.send("quick-replies.toggle"),this.preventHideOnBlur=!0,setTimeout((()=>{this.textarea&&this.textarea.focus()}))},onTextareaInput:function(e){const t=this.onTextareaInput;clearTimeout(t.timeout);const n=this.readFilterStringFromTextarea();null===n?(this.setState({show:!1}),t.timeout=setTimeout((()=>{this.setState({filterString:null,activeReplyIndex:0})}),300)):(this.preventReplyHover=!0,this.setState({show:!0,filterString:n,activeReplyIndex:0}))},onTextareaBlur:function(){this.preventHideOnBlur?this.preventHideOnBlur=!1:this.setState({show:!1})},onTextareaFocus:function(){const e=this.readFilterStringFromTextarea();this.setState({show:null!==e})},onTextareaKeyDown:function(e){if(this.state.show)if("ArrowUp"===e.key){e.preventDefault();let t=this.state.activeReplyIndex-1;const n=this.getFilteredReplies();-1===t&&(t=n.length-1),this.setState({activeReplyIndex:t}),this.scrollToActiveReplyIfNeeded()}else if("ArrowDown"===e.key){e.preventDefault();let t=this.state.activeReplyIndex+1;t===this.getFilteredReplies().length&&(t=0),this.setState({activeReplyIndex:t}),this.scrollToActiveReplyIfNeeded()}else("Enter"===e.key&&!e.shiftKey||"Tab"===e.key)&&(e.preventDefault(),e.stopPropagation(),this.applyActiveReply())},onReplyMouseEnter:function(e){if(this.preventReplyHover)return void(this.preventReplyHover=!1);const t=e.target.closest(".QuickRepliesPopup__reply"),n=Number(t.dataset.index);this.setState({activeReplyIndex:n})},onReplyMouseDown:function(){this.preventHideOnBlur=!0,this.applyActiveReply()},setTextareaValue:function(e){this.textarea&&(this.textarea.value="",this.textarea.focus(),document.execCommand("insertText",!1,e),setTimeout((()=>{this.textarea.focus(),this.textarea.selectionStart=e.length,this.textarea.selectionEnd=e.length})))},select:function(e){return this.popup?m(`.QuickRepliesPopup__${e}`,this.popup):null},selectAll:function(e){return this.popup?v(`.QuickRepliesPopup__${e}`,this.popup):[]},getFilteredReplies:function(){const e=this.state.filterString||"";return""===e?this.state.replies:this.state.replies.filter((t=>{const n=(t.shortcut||"")+(t.content||"");return!!n&&function(e,t,n=1){if(e=pe(e),""===(t=pe(t)))return!0;for(;e.length>0;){const o=de(e,t);if(o.length>=n||o.length>0&&t.length<n){if(e=e.substr(o.length),""===(t=t.substr(o.length)))return!0}else e=e.substr(1)}return!1}(n,e,2)}))},applyActiveReply:function(){const e=this.getFilteredReplies()[this.state.activeReplyIndex];if(!e)return;const t=this.prepareMessage(e.content);this.setTextareaValue(t),Z.send("ga.send-event","user","quick-replies:paste")},prepareMessage:function(e){const t=e.match(/{[^}]*}/g)||[];for(const n of t){const t=n.replace("{","").replace("}","").split("|"),o=this.pickRandom(t);e=e.replace(n,o)}try{const t=this.store.getState(),n=t.navigation.route.split("/t/")[1],o=t.direct.threads.get(n).users[0],i=t.direct.users.get(o);e=e.replaceAll("@name",i.full_name||i.username).replaceAll("@username",i.username)}catch{}return e},pickRandom:function(e=[]){return e[Math.round(Math.random()*(e.length-1))]},readFilterStringFromTextarea:function(){if(!this.textarea)return null;const e=this.textarea.value;return 1===e.split("\n").length&&e.startsWith("/")?e.replace("/","").toLowerCase():null},scrollToActiveReplyIfNeeded:function(){this.preventReplyHover=!0;const e=this.select("replies"),t=this.select("reply_active"),n=e.scrollTop,o=e.offsetHeight,i=t.offsetTop,r=t.offsetHeight;n>i?e.scrollTop=i:i+r>n+o&&(e.scrollTop=i-o+r)},initPopup:function(){document.body.insertAdjacentHTML("beforeend",'\n      <div class="QuickRepliesPopup">\n        <div class="QuickRepliesPopup__body">\n          <div class="QuickRepliesPopup__replies"></div>\n          <div class="QuickRepliesPopup__footer">\n            <button class="QuickRepliesPopup__manageButton">\n              MANAGE QUICK REPLIES\n            </button>\n          </div>\n        </div>\n      </div>\n    '),this.popup=m(".QuickRepliesPopup");this.select("manageButton").addEventListener("mousedown",this.onManageMouseDown.bind(this))},initToggler:function(){let e=null;const t=Symbol("handled");h((()=>{const n=m(this.sel.general.addMediaButton);n?n[t]||(n[t]=!0,n.insertAdjacentHTML("beforebegin",'\n        <div class="QuickRepliesToggler">\n          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18.205 18.5">\n            <path d="M6.481 0h1.711L1.709 18.5H0Zm1.311 16.654a1.325 1.325 0 0 1-1.331-1.355 1.276 1.276 0 0 1 .393-.952 1.3 1.3 0 0 1 .938-.384 1.254 1.254 0 0 1 .923.373 1.3 1.3 0 0 1 .373.962 1.317 1.317 0 0 1-.383.972 1.247 1.247 0 0 1-.913.384Zm4.556 0a1.325 1.325 0 0 1-1.335-1.355 1.276 1.276 0 0 1 .393-.952 1.3 1.3 0 0 1 .943-.383 1.254 1.254 0 0 1 .923.373 1.3 1.3 0 0 1 .373.962 1.317 1.317 0 0 1-.383.972 1.247 1.247 0 0 1-.909.383Zm4.556 0a1.325 1.325 0 0 1-1.335-1.355 1.276 1.276 0 0 1 .393-.952 1.3 1.3 0 0 1 .943-.383 1.254 1.254 0 0 1 .923.373 1.3 1.3 0 0 1 .373.962 1.317 1.317 0 0 1-.383.972 1.247 1.247 0 0 1-.909.383Z" fill="currentColor"/>\n          </svg>\n        </div>\n      '),e=m(".QuickRepliesToggler"),e.addEventListener("click",this.onTogglerClick.bind(this))):e&&(e.remove(),e=null)}))},initTextarea:function(){const e=Symbol("handled");h((()=>{const t=m(this.sel.general.textarea);t&&(t[e]||(t[e]=!0,this.textarea=t,t.addEventListener("input",this.onTextareaInput.bind(this)),t.addEventListener("focus",this.onTextareaFocus.bind(this)),t.addEventListener("blur",this.onTextareaBlur.bind(this)),t.addEventListener("keydown",this.onTextareaKeyDown.bind(this))))}))},initStyles:function(){p`${"\n  <style>\n    .QuickRepliesToggler {\n      padding: 3px;\n      margin-right: 8px;\n      cursor: pointer;\n    }\n\n    .QuickRepliesPopup {\n      font-family: Montserrat;\n      display: flex;\n      flex-direction: column;\n      justify-content: flex-end;\n      position: fixed;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      width: 430px;\n      pointer-events: none;\n    }\n\n    .QuickRepliesPopup__body {\n      background: #FFF;\n      border-radius: 4px;\n      overflow: hidden;\n      position: relative;\n      pointer-events: all;\n      transition: opacity 0.3s, transform 0.3s;\n    }\n    .QuickRepliesPopup:not(.QuickRepliesPopup_show) .QuickRepliesPopup__body {\n      opacity: 0;\n      pointer-events: none;\n      transform: translateY(10px);\n    }\n\n\n    /* border */\n    .QuickRepliesPopup__body::before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      border: 1px solid #DBDBDB;\n      border-radius: inherit;\n      pointer-events: none;\n    }\n\n    .QuickRepliesPopup__replies {\n      max-height: 400px;\n      overflow: auto;\n\n      /* place items above border */\n      position: relative;\n      z-index: 1;\n    }\n\n    .QuickRepliesPopup__noReplies {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      height: 42px;\n      color: #8E8E8E;\n    }\n\n    .QuickRepliesPopup__reply {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      height: 42px;\n      padding: 0 16px;\n      cursor: pointer;\n    }\n    .QuickRepliesPopup__reply_active {\n      background: #1BA2F9;\n      color: #FFF;\n    }\n    html.theme-night .QuickRepliesPopup__reply_active {\n      color: #000 !important;\n    }\n    .QuickRepliesPopup__reply b {\n      font-weight: 700;\n    }\n\n    .QuickRepliesPopup__replyShortcut {\n      font-size: 11px;\n      font-weight: 500;\n      border-radius: 4px;\n      background: #F3F3F3;\n      margin-right: 8px;\n      flex-shrink: 0;\n      padding: 2px 6px;\n    }\n    .QuickRepliesPopup__reply_active .QuickRepliesPopup__replyShortcut {\n      background: rgba(255, 255, 255, 0.25);\n    }\n\n    .QuickRepliesPopup__replyContent {\n      font-size: 14px;\n      line-height: 18px;\n      font-weight: 400;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      white-space: nowrap;\n      display: block;\n      flex-shrink: 1;\n    }\n\n    .QuickRepliesPopup__footer {\n      display: flex;\n      flex-direction: row;\n      justify-content: flex-end;\n      padding: 12px;\n    }\n\n    .QuickRepliesPopup__manageButton {\n      color: #1BA2F9;\n      font-size: 12px;\n      line-height: 15px;\n      font-weight: 600;\n      cursor: pointer;\n      background: transparent;\n      border: none;\n      padding: 0;\n    }\n  </style>\n"}`},update:function(){const e=this.prevState,t=this.state;if(e.show!==t.show){const e="QuickRepliesPopup_show";this.popup.classList.toggle(e,this.state.show)}if(e.filterString!==t.filterString){const e=m(this.sel.general.writeBar);if(e){const t=e.getBoundingClientRect();this.popup.setAttribute("style",`left: ${Math.round(t.left)}px !important;\n           bottom: ${Math.round(window.innerHeight-t.top+16)}px !important;\n           width: ${Math.round(t.width)}px !important;`)}}if(e.replies!==t.replies||e.filterString!==t.filterString){const e=this.getFilteredReplies();0===e.length?this.select("replies").innerHTML='\n          <div class="QuickRepliesPopup__noReplies">\n            No replies found\n          </div>\n        ':(this.select("replies").innerHTML=e.map(((e,t)=>`\n          <div class="QuickRepliesPopup__reply" data-index="${t}">\n            ${e.shortcut?`\n              <div class="QuickRepliesPopup__replyShortcut">\n                /&thinsp;${e.shortcut}\n              </div>\n            `:""}\n            <div class="QuickRepliesPopup__replyContent">\n              ${e.content}\n            </div>\n          </div>\n        `)).join(""),this.selectAll("reply").forEach((e=>{e.addEventListener("mouseenter",this.onReplyMouseEnter.bind(this)),e.addEventListener("mousedown",this.onReplyMouseDown.bind(this))})))}{const e="QuickRepliesPopup__reply",t="QuickRepliesPopup__reply_active";v(`.${t}`).forEach((e=>e.classList.remove(t)));const n=v(`.${e}`)[this.state.activeReplyIndex];n&&n.classList.add(t)}}};function me(e,t=null){try{const n=e();return n instanceof Promise?new Promise(((e,o)=>{n.then(e).catch((n=>{n&&console.error(n),e(t)}))})):n}catch(e){return console.error(e),t}}var ve={init:async function(){(async function(){be=await Z.send("dm.ghost-mode:is-enabled"),Z.on("dm.ghost-mode:toggled",(e=>{be=e}))})(),async function(){const e=await ue("store"),t=await ue("dm-state-proxy",1e4),n=await ue("dm-thread-actions"),o=me((()=>n.markSeen),null);if(!(e&&t&&n&&o))return void Z.send("dm.ghost-mode:failed",{store:!!e,stateProxy:!!t,threadActions:!!n,markSeen:!!o});n.markSeen=(...e)=>{var t;const i=null===(t=e[2])||void 0===t?void 0:t.ignoreGhostMode;return be&&!i?()=>{}:o.call(n,...e)}}()}};let be=!1;var ye={init:async function(){const e=ce.getConfig().dmSelectors,t=await ue("store");if(!t)return;const n=Symbol("handled");h((()=>{const o=v('[id^="message-"]').filter((e=>!e[n]));if(0===o.length)return;const i=JSON.parse(JSON.stringify(t.getState()));o.forEach((t=>{var o,r,s;t[n]=!0;const a=m(e.general.messageBody,t);if(!a)return;const l=t.id.replace("message-",""),c=i.direct.messages[l];if("raven_media"!==c.item_type)return;localStorage.logRavenMessages&&console.warn({ravenMessage:c});const d=(null==c?void 0:c.raven_media)||(null==c||null===(o=c.visual_media)||void 0===o?void 0:o.media);if(!d)return;const p="replayable"===(null===(r=c.visual_media)||void 0===r?void 0:r.view_mode)||"permanent"===(null===(s=c.visual_media)||void 0===s?void 0:s.view_mode);if(p){const e=a.previousElementSibling;e&&(e.style.display="none")}if(d.video_versions){const e=d.video_versions[0].url;a.outerHTML=`\n          <a class="raven-media-link" href="${e}" target="_blank">\n            ${p?"VIEW VIDEO":"PEEK AT VIDEO"}\n          </a>\n        `}else if(d.image_versions2){const e=d.image_versions2.candidates[0].url;a.outerHTML=`\n          <a class="raven-media-link" href="${e}" target="_blank">\n            ${p?"VIEW PHOTO":"PEEK AT PHOTO"}\n          </a>\n        `}else{var u;const e=null==c||null===(u=c.visual_media)||void 0===u?void 0:u.replay_expiring_at_us;e&&new Date(e/1e3).getTime()<Date.now()?a.innerHTML='\n            <div class="raven-media-unavailable">\n              This message has expired or has been viewed already.\n            </div>\n          ':a.innerHTML='\n            <div class="raven-media-unavailable">\n              This message can not be viewed or is no longer available.\n            </div>\n          '}}))})),p`
    <style>
      .raven-media-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 600;
        font-size: 13px;
        color: #1BA2F9 !important;
      }

      .raven-media-link::before {
        content: '';
        width: 0;
        height: 0;
        flex-shrink: 0;
        margin-right: 3px;
        border: 5px solid transparent;
        border-radius: 1px;
        border-left-width: 7px;
        border-left-color: currentColor;
      }

      .raven-media-unavailable {
        line-height: 1.4;
      }
    </style>
  `}};var xe={init:function(){(function(){_e=t.get(we,{});for(const e in _e){for(const t in _e[e])0===_e[e][t].trim().length&&delete _e[e][t];0===Object.keys(_e[e]).length&&delete _e[e]}})(),async function(){const e=ce.getConfig().dmSelectors,n=await ue("store"),o=await ue("add-dispatch-listener");if(!n||!o)return;let i;try{i=n.getState().users.viewerId}catch(e){return void console.error("dm injection input restore controller:","failed to get viewerId")}if(!i)return;const r=_e[i]||(_e[i]={});o((t=>{if("NAVIGATION_LOCATION_CHANGED"!==t.type)return;if(!t.nextPath.startsWith("/direct/t/"))return;const n=t.nextPath.replace("/direct/t/","");if(!n)return;const o=r[n];o&&setTimeout((()=>{const t=m(e.general.textarea);t&&(t.focus(),document.execCommand("insertText",!1,o))}))}));let s=null;h((()=>{const o=m(e.general.textarea);if(!o)return;const i=n.getState().navigation.route.split("/direct/t/")[1];(r[i]||"")!==o.value&&(r[i]=o.value,clearTimeout(s),s=setTimeout((()=>{t.set(we,_e)}),300))}))}()}};const we="inssist.dm.input-restore-texts";let _e={};async function Pe(e,...t){return new Promise((n=>{e(...t,n)}))}var Se={unique:function(e){return Array.from(new Set(e))},gaussian:Ce,gaussianInt:function(e,t){return Math.round(e+Ce()*(t-e))},forceLayout:function(){document.body.getBoundingClientRect()},hashCode:Te,pseudorandom:function(e){return 16807*Math.max(Math.abs(Te(e)),1)%2147483647/2147483646},rotate:function(e,t=1){const n="slashed.io";let o="";return Array.from(e).forEach(((e,i)=>{const r=n[i%n.length].charCodeAt(),s=(e.charCodeAt()+t*r+65536)%65536;o+=String.fromCharCode(s)})),o},getUnixTime:function(){return Math.round(Date.now()/1e3)},saveFile:function(e,t){let n;n=t instanceof Blob?t:new Blob([t]);const o=document.createElement("a");o.setAttribute("download",e),o.setAttribute("href",URL.createObjectURL(n)),document.body.appendChild(o),o.click(),o.remove()},takeBetween:function(e,t,n){const o=e.split(t)[1];if(!o)return null;return o.split(n)[0]||null},takeAllBetween:function(e,t,n){return e.split(t).slice(1).map((e=>e.split(n)[0]))},capitalize:function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()},createWindow:async function(e,{width:t=600,height:n=700,name:o="utils-window"}={}){const i=Math.round(screen.width/2-t/2),r=`status,scrollbars,toolbar,top=${Math.round(screen.height/2-n/2)},left=${i},width=${t},height=${n}`,s=await Pe(chrome.windows.getAll),a=window.open(e,o,r);await Ae(500);const l=(await Pe(chrome.windows.getAll)).find((e=>!s.find((t=>e.id===t.id))));l&&await Pe(chrome.windows.update,l.id,{focused:!0});return ke.push(a),a},waitForWindowClose:async function(e){return new Promise((t=>{const n=setInterval((()=>{e.closed&&(clearInterval(n),t())}),100)}))},closeCreatedWindows:function(){ke.forEach((e=>{e.close()})),ke.length=0},getIntegralNumberPart:function(e){const t=Math.abs(e);return e>0?Math.floor(t):-Math.floor(t)},getFractalNumberPart:function(e){const t=Math.abs(e);return Number((t-Math.floor(t)).toFixed(12))}};const ke=[];function Ce(){let e=0;for(let t=0;t<6;t+=1)e+=Math.random();return e/6}function Te(e){if(!e)return 0;let t,n,o=0;if(0===e.length)return o;for(t=0;t<e.length;t++)n=e.charCodeAt(t),o=(o<<5)-o+n,o|=0;return o}async function Ae(e){if("number"==typeof e&&Number.isFinite(e)){const t=e;await new Promise((e=>setTimeout(e,t)))}else{if(!e||"object"!=typeof e||e.constructor!==Object)throw new Error("unexpected sleep function argument: number or object expected, got",e);{const{min:t,max:n}=e.longBreak&&Math.random()<1-Math.pow(.5,1/e.longBreak.every)?{min:0,max:0,...e.longBreak}:{min:0,max:0,...e},o=n-t,i=t+Se.gaussianInt(0,o);if(0===i)return;await new Promise((e=>setTimeout(e,i)))}}}function $e(e,t){return Ee(t)||(t=JSON.stringify(t)),`${encodeURIComponent(e)}=${encodeURIComponent(t)}`}function Ee(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e}function Re(e,t={}){const n=function(e){return Object.keys(e).map((t=>{const n=e[t];return Ee(n)?$e(t,n):Array.isArray(n)?n.map((e=>$e(t,e))).join("&"):null})).filter(Boolean).join("&").replace(/%5B/g,"[").replace(/%5D/g,"]")}(t);return n?`${e}?${n}`:e}var Le={};const Me=1e3,Be=6e4,Ie=36e5,Fe=864e5;e(Le,"MONTH",(function(){return 26784e5})),e(Le,"WEEK",(function(){return 6048e5})),e(Le,"DAY",(function(){return Fe})),e(Le,"HOUR",(function(){return Ie})),e(Le,"MINUTE",(function(){return Be})),e(Le,"SECOND",(function(){return Me}));var De={fetch:Ne,fetchText:async function(...e){const t=await Ne(...e);return await t.text()},fetchJson:async function(...e){const t=await Ne(...e);return await t.json()},getCache:function(){return ze},cleanCache:function(){Ue("cleaning fetcher cache"),ze=[]},ignoreCache:function(e=1){Oe+=e},isIgnoreCache:function(){return Oe>0}};let ze=[],Oe=0;const He=2e4,Ve=864e5,je=!1;async function Ne(e,t={},n=He){return new Promise(((o,i)=>{(async()=>{let r=setTimeout((()=>{r&&(r=null,i({message:"Timed out"}))}),n);try{const n=await async function(e,t){if(Ue(`fetching ${e}`),(t=t||{}).method=t.method||"GET",t.method&&"GET"!==t.method)return fetch(e,t);if(Oe<=0){const t=Date.now();ze=ze.filter((e=>t-e.on<Ve));const n=ze.find((t=>t.url===e));if(n)return Ue("  fetch cache hit"),n.res.clone()}else Ue("  ignoring fetch cache");Oe>0&&Oe--;const n=await fetch(e,t);return ze.push({url:e,on:Date.now(),res:n.clone()}),n}(e,{credentials:"include",...t});if(!r)return;if(clearTimeout(r),r=null,n.ok)return void o(n);if(400!==n.status)return void i({message:String(n.status)});try{const e=await n.text();i({message:String(n.status),body:e})}catch(e){i({message:String(n.status),body:null})}}catch(e){if(!r)return;clearTimeout(r),r=null,i(e)}})()}))}function Ue(e){je&&console.log(`%c${e}`,"color: #00ec91")}function We(){const e=We;return e.init||(e.init=!0,u`
      <style>
        .spinner-icon {
          width: 32px;
          height: 32px;
          animation: spinner-icon--spin 1.2s steps(12) infinite;
        }

        @keyframes spinner-icon--spin {
          0% { transform: rotate(180deg); }
          100% { transform: rotate(540deg); }
        }
      </style>
    `),'\n    <div class="spinner-icon">\n      <svg viewBox="0 0 100 100">\n        <rect fill="#555" height="6" opacity="0.083" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.166" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.25" rx="3" ry="3" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.33" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.41" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.58" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.66" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.83" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.91" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"/>\n      </svg>\n    </div>\n  '}var qe={init:async function(){Ye=ce.getConfig().dmSelectors,async function(){const e=await ue("store"),t=await ue("dm-thread-actions");if(!e||!t)return;const n=Symbol("handled");h((()=>{v(Ye.leftPanel.conversationUnreadDot).forEach((o=>{if(o[n])return;o[n]=!0;const i=o.closest(Ye.leftPanel.conversationItem);if(!i)return;i.classList.add("mark-seen--unread-thread"),o.insertAdjacentHTML("afterbegin",'\n        <svg class="mark-seen" fresh xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">\n          <path fill="none" d="M0 0h30v30H0z"/>\n          <path d="M14.389 21.257l-1.688-1.725 1.846-2 .793.812 9.878-10.187a.291.291 0 01.226-.1.3.3 0 01.227.1l1.425 1.5a.359.359 0 01.008.473L16.278 21.272h-.008a1.488 1.488 0 01-.939.456 1.42 1.42 0 01-.942-.471zm-6.564 0l-4.536-4.644a.337.337 0 010-.473l1.438-1.475a.308.308 0 01.454 0l3.6 3.681 9.873-10.189a.292.292 0 01.227-.1.3.3 0 01.226.1l1.426 1.5a.362.362 0 01.008.473L9.715 21.272h-.008a1.485 1.485 0 01-.939.456 1.42 1.42 0 01-.948-.471z" fill="currentColor"/>\n        </svg>\n      ');const r=m(".mark-seen[fresh]");r.removeAttribute("fresh"),r.addEventListener("mousedown",(e=>{e.stopPropagation(),e.preventDefault()})),r.addEventListener("click",(async n=>{n.stopPropagation(),n.preventDefault();const o=await Ge(i),r=o.newest_cursor,s=t.markSeen(o.id,r,{ignoreGhostMode:!0});e.dispatch(s)}))}))})),p`
    <style>
      .mark-seen {
        width: 25px;
        position: absolute;
        top: -10px;
        left: -9px;
        color: #738398;
        cursor: pointer;
        transition: color 0.15s;
        display: none;
      }
      .mark-seen:hover {
        color: #1BA2F9;
      }
      .mark-seen--unread-thread:hover .mark-seen {
        display: block;
      }

      .mark-seen--unread-thread:hover ${Ye.leftPanel.conversationUnreadDot} {
        background: transparent;
      }
    </style>
  `}()},getThreadDataByThreadElem:Ge};let Ye;async function Ge(e){const t=await async function(e){const t="A"===e.tagName?e:e.querySelector("a");if(t)return t.href.split("/").pop();const n=(await ue("store")).getState();return(n.navigation.route||n.navigation.displayedRoute).split("/").pop()}(e);if(!t)return null;return(await ue("store")).getState().direct.threads.get(t)||null}var Xe={init:async function(){Qe=ce.getConfig().dmSelectors,Z.on("dm.set-filters",Ke),h((()=>{const e=m(Qe.leftPanel.threadList);if(!e)return;const t=""!==e.innerText;Je.classList.toggle("dm--no-threads",!t)})),function(){const e=Symbol("handled");h((()=>{const t=m(Qe.leftPanel.threadListWrap);t&&(t[e]||(t[e]=!0,t.insertAdjacentHTML("beforeend",'\n      <div class="dm-filters-nothing-found">\n        NOTHING FOUND\n      </div>\n    ')))})),p`
    <style>
      .dm-filters-nothing-found {
        display: none;
        margin-top: 26px;
        margin-bottom: 0;
        color: #8E8E8E;
        font-weight: 400;
        text-align: center;
      }

      .dm--has-filters.dm--no-threads .dm-filters-nothing-found {
        display: block;
      }
    </style>
  `}(),async function(){const e=await ue("store");if(!e)return;const t=()=>{const t=m(".dm-filters-load-more__counter");if(!t)return;const n=e.getState().direct.threads.size;t.innerText=n;const o=m(".dm-filters-load-more__counter-row");o&&(o.style.display=n>1?null:"none")};e.subscribe(t);let n=Promise.resolve();const o=async()=>{Je.classList.add("dm--loading-next-pages"),await n;await Ze()&&(n=Ae(25e3)),Je.classList.remove("dm--loading-next-pages")},i=Symbol("handled");h((()=>{const e=m(".dm-filters-nothing-found");if(!e)return;if(e[i])return;e[i]=!0,e.insertAdjacentHTML("afterend",`\n      <div class="dm-filters-load-more">\n        <div class="dm-filters-load-more__counter-row">\n          searched\n          <span class="dm-filters-load-more__counter"></span>\n          chats\n        </div>\n        <button class="dm-filters-load-more__button">\n          Search older chats\n        </button>\n        <div class="dm-filters-load-more__spinner">\n          ${We()}\n        </div>\n      </div>\n    `);m(".dm-filters-load-more__button").addEventListener("click",o),t()})),p`
    <style>
      .dm-filters-load-more {
        margin-top: 30px;
      }
      html:not(.dm--has-older) .dm-filters-load-more {
        display: none;
      }
      html:not(.dm--has-filters) .dm-filters-load-more {
        display: none;
      }

      .dm-filters-load-more__button {
        display: block;
        height: 30px;
        margin: 0 50px;
        padding: 0 12px;
        font-weight: 600;
        color: #00376B;
        background: transparent;
        border: 1px solid currentColor;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
      }
      .dm-filters-load-more__button:active {
        background: rgba(0, 0, 0, 0.03);
      }
      html.dm--loading-next-pages .dm-filters-load-more__button {
        display: none;
      }

      .dm-filters-load-more__spinner {
        display: flex;
        justify-content: center;
        flex-direction: row;
      }
      html:not(.dm--loading-next-pages) .dm-filters-load-more__spinner {
        display: none;
      }

      .dm-filters-load-more__counter-row {
        display: block;
        text-align: center;
        margin-top: -10px;
        margin-bottom: 26px;
        color: #8E8E8E;
        font-weight: 400;
      }

      .dm-filters-load-more__counter {
        font-weight: 600;
      }

      ${Qe.leftPanel.threadListWrap} {
        padding-bottom: 40px;
      }
      .dm--has-filters ${Qe.leftPanel.threadListWrap} {
        padding-bottom: 70px;
      }

      .dm--has-filters ${Qe.leftPanel.threadListSpinner} {
        display: none;
      }
    </style>
  `}(),function(){const e=Symbol();h((()=>{v(Qe.leftPanel.conversationItem).forEach((async t=>{if(t[e])return;t[e]=!0;const n=await qe.getThreadDataByThreadElem(t);if(!n)return;1===n.thread_label&&t.insertAdjacentHTML("afterend",'<div class="DmThreadFlag"></div>')}))})),p`
    <style>
      .DmThreadFlag {
        position: absolute;
        top: 0;
        right: 0;
        border: 6px solid #FF8837;
        border-left-color: transparent;
        border-bottom-color: transparent;
      }
    </style>
  `}()}};let Qe;const Je=document.documentElement;async function Ke({string:e,unread:t,flagged:n}){const o=Ke,i=await ue("store");if(!i)return;i.dispatch({type:"inssist.dm.apply-filters",string:e,unread:t,flagged:n});const r=!!(e||t||n);Je.classList.toggle("dm--has-filters",r),o.called||(o.called=!0,Je.classList.add("dm--loading-next-pages"),await Ze(),Je.classList.remove("dm--loading-next-pages"))}async function Ze(){let e=await et();return e&&(await Ae(500),e=await et()),e&&(await Ae(500),e=await et()),e&&(await Ae(500),e=await et()),e&&(await Ae(500),e=await et()),e}async function et(){const e=et;e.initialized||(e.initialized=!0,e.hasOlder=!0,e.cursor=null);const t=await ue("store"),n=await ue("constants"),o=await ue("dm-threads-normalizer");if(!t||!n||!o)return!1;const i=n.instagramWebDesktopFBAppId;if(!i)return console.error("failed to get x-ig-app-id"),!1;if(!e.hasOlder)return!1;let r;try{const t=Re("https://i.instagram.com/api/v1/direct_v2/inbox/",{cursor:e.cursor||null});r=await De.fetchJson(t,{headers:{"x-ig-app-id":i},credentials:"include"})}catch(e){return console.error(e),!1}const{entities:s}=o(r.inbox.threads);return t.dispatch({type:"DIRECT_THREAD_LOADED",messages:s.items,threads:s.threads,users:s.users}),e.cursor=r.inbox.oldest_cursor,e.hasOlder=r.inbox.has_older,Je.classList.toggle("dm--has-older",e.hasOlder),e.hasOlder}var tt={init:async function(){nt=ce.getConfig().dmSelectors,Z.on("dm.start-conversation",it),Z.on("dm.go-to-inbox",rt),Z.on("dm.refresh",st),history.pushState=history.replaceState,async function(){const e=await ue("store");if(!e)return;await l((()=>{const t=e.getState().direct.realtimeState;return"subscribed"===t.irisConnectivity.toLowerCase()&&"connected"===t.mqttConnectivity.toLowerCase()&&"message"===t.subscriptionType.toLowerCase()}))||console.error("dm injection controller →","initConversationCreator:","failed to wait for webscoket to be ready");(await l((()=>m(nt.leftPanel.newMessageButton)))).click();const t=await l((()=>m(nt.dialog.window)),{frequency:10});v("button",t)[0].click(),ot=await ue("dm-conversation-creator")}(),function(){const e=Symbol("prevText");h((()=>{const t=m(nt.general.dmTopButton);if(!t)return;const n=t.innerText;t[e]!==n&&(t[e]=n,Z.send("dm.update-badge",n))}))}(),async function(){const e=await ue("nav"),t=await ue("add-dispatch-listener");if(!e||!t)return;(async()=>{if("v1"===window.inssist.igBundleVersion){const t=e.push;return void(e.push=e=>{if(e.startsWith("/direct/"))return t(e);Z.send("dm.ig-go",e)})}const t=await ue("nav-interceptor");t&&t.beforeGo(((e,t)=>{t.startsWith("/direct/")||(e(),Z.send("dm.ig-go",t))}))})();{let e;p`
      <style>
        ${nt.general.postViewerModal} {
          display: none;
        }
      </style>
    `;const n=Symbol("handled");h((()=>{v(nt.general.postPreview).forEach((t=>{t[n]||(t[n]=!0,t.addEventListener("click",(()=>{e=t;const n=t.getAttribute("post-url");n&&Z.send("dm.ig-go",n)})))}))})),t((async t=>{if("POST_PAGE_LOADING"!==t.type)return;const n=`/p/${t.shortcode}`;if(Z.send("dm.ig-go",n),!e)return;e.setAttribute("post-url",n);(await l((()=>v(nt.general.portal)))).forEach((e=>e.style.display="none"))})),t((e=>{"POST_PAGE_LOADED_V2"===e.type&&(e.type="none")}))}}(),async function(){const e=await ue("dm-delta-parser",15e3);if(!e)return;const t=e.parseDeltaItem;e.parseDeltaItem=(...o)=>{const i=n(o[0]);return i&&12e3===i.ttl&&(i.ttl=5e3,o[0]=JSON.stringify(i)),t.call(e,...o)}}(),function(){const e=Symbol("handled");h((()=>{v("a").forEach((t=>{if(t[e])return;t[e]=!0;t.getAttribute("href").includes("instagram.com")||t.setAttribute("target","_blank")}))}))}(),function(){const e=Symbol("handled");h((async()=>{const t=m(nt.general.mediaViewerImage)||m(nt.general.mediaViewerVideo);if(a.classList.toggle("media-viewer--open",!!t),!t)return;const n=t.closest(nt.dialog.root);if(!n)return;if(n[e])return;n[e]=!0;const o=await l((()=>{var e;return t.getAttribute("src")||(null===(e=t.querySelector("source"))||void 0===e?void 0:e.getAttribute("src"))}));n.insertAdjacentHTML("beforeend",`\n      <div class="media-viewer-controls">\n        <a class="media-viewer-controls__button media-viewer-controls__button_open" href="${o}" target="_blank">\n          <svg\n            class="media-viewer-controls__button-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="32"\n            height="32"\n            viewBox="0 0 32 32">\n            <defs>\n              <clipPath id="a">\n                <path fill="none" d="M0 0h32v32H0z"/>\n              </clipPath>\n            </defs>\n            <g clip-path="url(#a)">\n              <path fill="none" d="M0 0h32v32H0z"/>\n              <path d="M10.493 22V12h6l-2 2h-2v6h6v-2l2-2v6zm4.149-5.847L19.793 11h-3.3V9.5h6.508v6.453h-1.508V12.7l-5.151 5.152z" fill="currentColor"/>\n            </g>\n          </svg>\n        </a>\n        <div class="media-viewer-controls__button media-viewer-controls__button_close">\n          <svg\n            class="media-viewer-controls__button-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="34"\n            height="34"\n            viewBox="0 0 40 40">\n            <path d="M0 0h40v40H0z" fill="transparent"/>\n            <path d="M12.626 25.797l6.062-6.061-6.062-6.061 1.313-1.313L20 18.424l6.061-6.062 1.313 1.313-6.06 6.062 6.06 6.06-1.313 1.313-6.062-6.06-6.06 6.06z" fill="currentColor"/>\n          </svg>\n        </div>\n      </div>\n    `);const i=m(".media-viewer-controls__button_open");i.addEventListener("mousedown",(e=>{window.open(i.href)}));m(".media-viewer-controls__button_close").addEventListener("click",(()=>{const e=document.createEvent("MouseEvents");e.initMouseEvent("mousedown",!0),n.dispatchEvent(e)}))})),p`
    <style>
      .media-viewer--open ${nt.dialog.window} {
        max-width: none;
        max-height: none;
        box-shadow: none;
        border-radius: 0;
      }

      .media-viewer--open ${nt.dialog.window} * {
        border-radius: 0;
        background-color: transparent;
      }

      .media-viewer--open ${nt.dialog.mediaViewerCloseButton} {
        display: none;
      }

      ${nt.general.mediaViewerContainer} {
        width: calc(100vw - 100px);
        height: calc(100vh - 100px);
      }

      ${nt.general.mediaViewerImage},
      ${nt.general.mediaViewerVideo} {
        object-fit: contain;
      }

      .media-viewer-controls {
        position: absolute;
        top: 16px;
        right: 16px;
        display: flex;
        flex-direction: row;
        transition: transform 0.3s, opacity 0.3s;
      }
      body:not(:hover) .media-viewer-controls {
        transform: translateX(5px);
        opacity: 0;
        transition-delay: 0.2s;
      }

      .media-viewer-controls__button {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-left: 16px;
        background: #FFF;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        box-sizing: border-box;
      }
      .media-viewer-controls__button:active {
        opacity: 1; /* override ig style */
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
        margin-top: 1px;
      }
      .theme-night .media-viewer-controls__button {
        border: 1px solid #bbb;
        box-shadow: none;
      }

      .media-viewer-controls__button-icon {
        color: #555;
      }
    </style>
  `}(),function(){const e=Symbol("handled"),t=document.documentElement;h((()=>{const t=m(nt.dialog.searchRow);t&&(t[e]||(t.scrollLeft=0))})),h((()=>{v(nt.general.iconButton).forEach((t=>{if(t[e])return;t[e]=!0;"0px"===getComputedStyle(t).padding&&t.classList.add("icon-button-with-hitbox")}))})),h((()=>{const t=m(nt.leftPanel.requestsTabText);if(!t)return;if(t[e])return;t[e]=!0;const n=Number(t.innerText.replace(/\D/g,""));t.innerHTML=`\n      <span class="requests-tab-plus">+</span>\n      ${n||""}\n    `})),h((()=>{const e=!!m(nt.leftPanel.requestsDescription);t.classList.toggle("is-requests-page",e)})),h((()=>{const e=!!m(nt.leftPanel.folderTab);t.classList.toggle("has-folder-tabs",e)})),h((()=>{const t=v(nt.leftPanel.subheaderWhenNoFolders).find((t=>!t[e]));if(!t)return;if(t[e])return;v(nt.leftPanel.subheaderWhenNoFolders).forEach((t=>t[e]&&t.remove())),t[e]=!0;const n=m(nt.general.reactRoot);n&&n.appendChild(t)})),p`
    <style>
      * {
        font-family: montserrat;
        outline: none;
      }

      ::-webkit-scrollbar {
        display: none;
      }

      body {
        /* prevents content jumping on page initialization */
        width: 100%;
        min-width: 730px;
      }

      ${nt.general.page} {
        padding-top: 0;
      }

      ${nt.general.header} {
        display: none;
      }

      ${nt.general.errorReportPixel} {
        display: none;
      }

      .theme-night ${nt.general.blueButton} {
        color: #000;
      }

      ${nt.general.postActionsTooltipMe} {
        transform: translateX(20%) scale(0.65);
        transform-origin: right bottom;
      }

      ${nt.general.postActionsTooltipPeer} {
        transform: translateX(-20%) scale(0.65);
        transform-origin: left bottom;
      }

      ${nt.general.postActionsTooltipTail} {
        display: none;
      }

      html.has-folder-tabs:not(.is-requests-page) ${nt.leftPanel.header} {
        height: 0;
        border-bottom: none;
      }

      ${nt.leftPanel.subheaderWhenNoFolders} {
        display: none;
      }
      ${nt.leftPanel.subheaderWhenNoFolders} * {
        padding: 0;
      }
      html.is-requests-page ${nt.leftPanel.subheaderWhenNoFolders} {
        display: none;
      }

      html.has-folder-tabs ${nt.leftPanel.newMessageButton} {
        top: 31px;
      }

      ${nt.leftPanel.tabsContainer} {
        margin-right: 64px;
      }

      ${nt.leftPanel.folderTab} {
        font-size: 12px;
        padding: 27px 4px 14px 4px;
        position: relative;
        flex-grow: 0;
        margin-right: 12px;
      }
      ${nt.leftPanel.folderTab}:first-child {
        margin-left: 17px;
      }
      ${nt.leftPanel.folderTab}:last-child {
        margin-right: 0;
      }

      /* hitbox for folder tabs */
      ${nt.leftPanel.folderTab}::before {
        content: '';
        position: absolute;
        top: 0;
        left: -6px;
        right: -6px;
        bottom: 0;
      }

      ${nt.leftPanel.folderTabsContainer} {
        width: auto;
        overflow: hidden;
        flex: initial;
      }

      ${nt.leftPanel.folderTabGeneral} {
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
        display: block;
      }

      ${nt.leftPanel.requestsTab} {
        margin-left: 12px;
        padding: 0;
      }

      ${nt.leftPanel.requestsTabText} {
        display: flex;
        font-size: 14px;
        font-weight: 600;
        padding: 26px 4px 15px 4px;
        position: relative;
      }

      /* hitbox for requests tab */
      ${nt.leftPanel.requestsTabText}::before {
        content: '';
        position: absolute;
        top: 0;
        left: -6px;
        right: -6px;
        bottom: 0;
      }

      ${nt.leftPanel.requestsTabContainer} {
        width: auto;
      }

      ${nt.leftPanel.conversationItemWrap} {
        padding: 0;
      }

      ${nt.dialog.root} {
        background: rgba(255, 255, 255, 0.96);
      }

      ${nt.dialog.background} {
        background: transparent;
      }

      ${nt.dialog.window} {
        box-shadow: 0 0px 12px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
      }

      ${nt.dialog.searchRow} {
        overflow-x: hidden;
      }

      ${nt.dialog.searchRowLabel} {
        justify-content: center;
      }

      ${nt.dialog.header} {
        padding-right: 12px;
        padding-left: 12px;
      }

      .theme-night ${nt.general.emojiPicker} {
        filter: url(#theme-reverse-filter);
        background: #000;
      }

      .icon-button-with-hitbox {
        position: relative;
      }
      .icon-button-with-hitbox::before {
        content: '';
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
      }

      .requests-tab-plus {
        font-size: 18px;
        margin-right: 4px;
      }
    </style>
  `}(),Object.defineProperty(Object.prototype,"maxRows",{get:()=>20,set:()=>!0}),document.addEventListener("keydown",(e=>{if("Enter"!==e.key)return;const t=m(nt.dialog.submitButton);t&&t.click()})),p`
    <style>
      ${nt.leftPanel.switchAccountButton} {
        display: none;
      }
    </style>
  `,async function(){const e=await ue("add-dispatch-listener");if(!e)return;e((e=>{"DIRECT_MESSAGE_UPDATED"===e.type&&(e.mutationToken||Z.send("dm.message-sent"))}))}(),ve.init(),ye.init(),xe.init(),Xe.init(),qe.init(),fe.init()}};let nt,ot;async function it(e){if(!ot)return;const t=new Map;t.set(e,!0),ot.forwardAction(t)}async function rt(){(await ue("nav")).push("/direct/inbox/")}function st(){location.reload()}function at(e,t){document.cookie=`${e}=${t}; path=/`}var lt={init:async function(){if((await l((()=>document.documentElement))).classList.contains("touch"))return;if(window.opener&&location.pathname.startsWith("/accounts/login/"))return;(await l((()=>document.body))).insertAdjacentHTML("beforeend",`\n    <button class="open-in-inssist open-in-inssist_below">\n      <div class="open-in-inssist__main">\n        <img class="open-in-inssist__icon" src="${window.inssist.url}img/icon-128.png"/>\n        <span class="open-in-inssist__label">OPEN IN INSSIST</span>\n      </div>\n      <div class="open-in-inssist__smile">\n        <span class="open-in-inssist__smile-icon">🇺🇦</span>\n        <span class="open-in-inssist__smile-text">&nbsp;</span>\n        \x3c!-- <span class="open-in-inssist__smile-icon">${function(){const e=Array.from(ct).filter((e=>e.trim().length>0)),t=Math.floor(Date.now()/Fe)%e.length;return e[t]}()}</span> --\x3e\n        \x3c!-- <span class="open-in-inssist__smile-text">smile of the day</span> --\x3e\n      </div>\n    </button>\n  `);const e=m(".open-in-inssist");setTimeout((()=>{e.classList.remove("open-in-inssist_below")}),300),e.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),at("open-in-inssist",location.pathname)}),!0),h((()=>{e.classList.toggle("open-in-inssist_hidden",!("www.instagram.com"===location.host||"instagram.com"===location.host))})),p`
    <style>
      .open-in-inssist {
        position: fixed;
        right: 26px;
        bottom: 0;
        padding: 0;
        background: #F7F7F9;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 4px 4px 0 0;
        cursor: pointer;
        border: none;
        transform: translateY(128px);
        transition: transform 350ms;
        z-index: 99999;
      }
      .open-in-inssist:hover {
        transform: none;
      }
      .open-in-inssist_below {
        transform: translateY(100%);
      }
      .open-in-inssist_hidden {
        display: none;
      }

      .open-in-inssist__main {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 17px 7px 12px;
      }

      .open-in-inssist__icon {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }

      .open-in-inssist__label {
        font-family: 'Montserrat';
        color: #556180;
        font-size: 12px;
        font-weight: 600;
      }

      .open-in-inssist__smile {
        padding: 16px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .open-in-inssist__smile-icon {
        font-size: 64px;
        line-height: 78px;
        height: 78px;
      }

      .open-in-inssist__smile-text {
        font-family: 'Nunito Sans';
        font-size: 9px;
        color: #000000;
        opacity: 0.6;
      }
    </style>
  `}};const ct="\n  🤯🤗🧐🙃😝🤒🤓😑😊😯🙂🤧🥳\n  😬🥰🤪🤨😘🥴🤣😄😀😶😚😖😋\n  😛😵😜😷😴🤔😐😗😃😁🥶🤑😎\n  😉🤫😳😡😱😤😍🤩🤐🤭😇😅😲\n  😂😏😙😆🙄😌😮🥺😈🤤\n";var dt={init:async function(){if(pt=await ue("store"),ut=await ue("add-dispatch-listener"),!pt||!ut)return;Z.on("tag-assist.save-collections-to-ls",ht),Z.on("tag-assist.read-collections-from-ls",gt),async function(){ut((e=>{"CREATION_CAPTION_CHANGED"===e.type&&Z.send("tag-assist.ig-caption-change",e.caption)}))}()}};let pt,ut;function ht(e){t.set("inssist.tagAssist.collections",e)}function gt(){return t.get("inssist.tagAssist.collections",[])}async function ft(){const e=await l((()=>document.body));return!e.querySelector("#react-root")&&!e.querySelector('body > div[id*="mount"]')}var mt={init:function(){!async function(){if(await ft())return;const e=await ue("config"),t=await ue("cookies-controller");if(!e||!t)return;t.setCookie=(t,n,o={})=>{if(e.needsToConfirmCookies()&&"ig_cb"!==t)return;const i={path:"/",...o};null===n&&(i.maxage=-1);let r=`${vt(t)}=${vt(n)}`;i.maxage&&(i.expires=new Date(Date.now()+i.maxage)),i.path&&(r+=`; path=${i.path}`),i.domain&&(r+=`; domain=${i.domain}`),i.expires&&(r+=`; expires=${i.expires.toUTCString()}`),document.cookie=`${r}; SameSite=none; secure`}}()}};function vt(e){try{return encodeURIComponent(e)}catch(t){throw new Error(`failed to encode ${e}`)}}function bt(e,{isCreatingReels:t=(()=>!1),isSharingToFeed:n=(()=>!1),onSuccess:o=(()=>{})}){const i=e.post;e.post=async(...r)=>{if(!t())return i.call(e,...r);if(r[0].includes("/rupload_igvideo/")){const t=r[2].headers,n=JSON.parse(t["X-Instagram-Rupload-Params"]);return n.is_igtv_video=!1,n.is_clips_video=!0,n.is_unified_video=!1,n.uses_original_audio=!0,n.audio_type="original_sounds",t["X-Instagram-Rupload-Params"]=JSON.stringify(n),i.call(e,...r)}if(r[0].includes("/create/configure/")||r[0].includes("/media/configure/")||r[0].includes("/igtv/configure_to_igtv/")){r[0]="https://i.instagram.com/api/v1/media/configure_to_clips/",r[1].clips_uses_original_audio=1,r[1].uses_original_audio=1,r[1].original_audio=1,r[1].audio=1,r[1].clips_audio=1,r[1].clips_with_audio=1,r[1].with_audio=1,r[1].enable_audio=1,r[1].clips_enable_audio=1,r[1].clips_audio_enable=1,r[1].audio_enable=1,r[1].audio_type="original_sounds",n()&&(r[1].clips_share_preview_to_feed=1);const t=await i.call(e,...r);return"ok"===(null==t?void 0:t.status)&&o(),t}return i.call(e,...r)}}const yt=Symbol("anchor");function xt({class:e,style:t,text:n,anchor:o,atCenter:i=!1}){const r=xt;r.initialized||(r.initialized=!0,h((()=>{v(".tooltip").forEach((e=>{const t=e[yt];document.body.contains(t)||e.remove()}))})),p`
    <style>
      .tooltip {
        display: block;
        position: absolute;
        margin-top: 12px;
        margin-left: 4px;
        padding: 8px 10px;
        color: #FFF;
        background: #1BA2F9;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        font-family: Montserrat;
        opacity: 0;
        pointer-events: none;
        transform: translateY(2px);
        transition: transform 0.2s, opacity 0.2s;
        z-index: 99999;
      }
      .tooltip_shown {
        opacity: 1;
        transform: none;
      }
      .theme-night .tooltip {
        filter: url(#theme-reverse-filter);
        background: #33ABF8;
      }

      /* triangle */
      .tooltip::before {
        content: '';
        position: absolute;
        right: 6px;
        bottom: 100%;
        border: 3px solid transparent;
        border-left-width: 4px;
        border-right-width: 4px;
        border-bottom-color: #1BA2F9;
      }
      .theme-night .tooltip::before {
        border-bottom-color: #1BA2F9;
      }
      .tooltip_at-center::before {
        right: calc(50% - 4px);
      }

      .tooltip b {
        font-weight: 700;
      }
      .tooltip code {
        white-space: nowrap;
        padding: 1px 5px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.25);
      }
    </style>
  `);const s=document.createElement("div");s.innerHTML=`\n    <div\n      class="${e||""} tooltip ${i?"tooltip_at-center":""}"\n      ${t?`style="${t}"`:""}>\n      ${n}\n    </div>\n  `;const a=s.firstElementChild;document.body.insertAdjacentElement("afterend",a),a[yt]=o,o.addEventListener("mouseenter",(()=>{let e,t;const n=o.getBoundingClientRect();i?(e=Math.round(n.left+n.width/2-a.offsetWidth/2-4),t=Math.round(n.top+n.height)):(e=Math.round(n.left+n.width-a.offsetWidth),t=Math.round(n.top+n.height)),a.style.left=`${e}px`,a.style.top=`${t}px`,a.classList.add("tooltip_shown")})),o.addEventListener("mouseleave",(()=>{a.classList.remove("tooltip_shown")}))}var wt={init:async function(){if(_t=ce.getConfig().igSelectors,Pt=await ue("http"),St=await ue("store"),kt=await ue("gatekeeper"),!Pt||!St||!kt)return;bt(Pt,{isCreatingReels:()=>Ct.creatingReels,isSharingToFeed:()=>Ct.shareToFeed,onSuccess:()=>{Z.send("reels.submit-success")}}),function(){const e=Symbol("handled");h((async()=>{if(!Ct.creatingReels)return;const t=m(_t.postCreation.submitPostButton);if(!t)return;if(t[e])return;t[e]=!0;const n=await Z.send("reels.is-pro");t.addEventListener("click",(e=>{n||(e.preventDefault(),e.stopPropagation(),Z.send("reels.open-billing"))}),{capture:!0}),n||(t.style.opacity=.5,xt({style:"width: 100%; max-width: 280px;",anchor:t,text:"\n          Posting Reels is a PRO feature, please consider\n          upgrading to publish Reels from the Desktop.\n        "}))}))}(),function(){const e=Symbol("handled");h((()=>{if(!Ct.creatingReels)return;const t=a.dataset.page;if(!("CreationStylePage"===t||"CreationDetailsPage"===t))return;const n=m(_t.general.headerTitle);n&&(n[e]||(n[e]=!0,n.innerText="New Reel"))})),p`
    <style>
      /* hide "Advanced Posting Options" section */
      .reels--creating-reels .extended-post-creation {
        display: none;
      }
    </style>
  `}(),function(){let e=!1;Z.on("reels.auth-performed",(t=>{if(m(".reels-auth").remove(),!t)return;e=!0;const n=m(_t.postCreation.submitPostButton);n&&n.click()}));const t=Symbol("handled");h((async()=>{if(!Ct.creatingReels)return;const n=m(_t.postCreation.submitPostButton);if(!n)return;if(n[t])return;n[t]=!0;const o=await Z.send("reels.is-pro");e=await Z.send("reels.is-mobile-session"),n.addEventListener("click",(t=>{if(!o)return;if(e)return;t.preventDefault(),t.stopPropagation(),document.body.insertAdjacentHTML("beforeend",'\n        <div class="reels-auth modal">\n          <div class="modal__window">\n            <div class="modal__title reels-auth__title">\n              Authorize Reels API\n              <span class="reels-auth__info-circle info-circle">?</span>\n            </div>\n            <div class="modal__content">\n              <div>\n                Please authorize Inssist App to use Instagram\n                Reels API for posting Reels.\n              </div>\n              <div class="reels-auth__buttons">\n                <button class="reels-auth__button-auth button">\n                  Authorize\n                </button>\n                <button class="reels-auth__button-cancel button button_cancel">\n                  Cancel\n                </button>\n              </div>\n              <div class="reels-auth__warning">\n                You will be asked to relogin as a part of authorization.\n                Once authorized, your Reels will post immediately.\n              </div>\n            </div>\n          </div>\n        </div>\n      '),xt({style:"width: 100%; max-width: 220px;",atCenter:!0,anchor:m(".reels-auth__info-circle"),text:"\n          Login credentials required. Your credentials never\n          sent away from your PC. This action is done once.\n        "});m(".reels-auth__button-auth").addEventListener("click",(()=>{Z.send("reels.authorize")}));m(".reels-auth__button-cancel").addEventListener("click",(()=>{m(".reels-auth").remove()}))}),{capture:!0})})),p`
    <style>
      .reels-auth {}

      .reels-auth__title {}

      .reels-auth__info-circle {
        margin-left: 8px;
      }

      .reels-auth__buttons {
        display: flex;
        flex-direction: row;
        margin-top: 12px;
      }

      .reels-auth__warning {
        margin-top: 24px;
        font-size: 13px;
        color: #A5AAAF;
      }
    </style>
  `}(),function(){const e=Symbol("handled");h((async()=>{if(!Ct.creatingReels)return;const t=m(_t.postCreation.captionContainer);if(!t)return;if(t[e])return;t[e]=!0;const n=await Z.send("reels.get-trial-data");if(n.hasPro)return;t.insertAdjacentHTML("beforebegin",`\n      <div class="ReelsUpgradeToProBar">\n        <div class="ReelsUpgradeToProBar__text">\n          Free Reels Remaining: ${n.freeReels} / ${n.maxFreeReels}\n        </div>\n        <button class="ReelsUpgradeToProBar__button">\n          Get Unlimited Reels\n        </button>\n      </div>\n    `);m(".ReelsUpgradeToProBar__button").addEventListener("click",(()=>{Z.send("reels.open-billing")}))})),p`
    <style>
      .ReelsUpgradeToProBar {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        font-size: 14px;
        border-bottom: 1px solid #ddd;
      }

      .ReelsUpgradeToProBar__text {
        margin-right: 24px;
      }

      .ReelsUpgradeToProBar__button {
        font-size: inherit;
        color: #0095F6;
        border: none;
        cursor: pointer;
        padding: 0;
        font-weight: 500;
        background: transparent;
      }
    </style>
  `}(),function(){const e=Symbol("handled");h((()=>{if(!Ct.creatingReels)return;const t=m(_t.postCreation.body);if(!t)return;if(t[e])return;t[e]=!0,t.insertAdjacentHTML("beforeend",`\n      <div class="reels-share-to-feed ${Ct.shareToFeed?"reels-share-to-feed_on":""}">\n        <button class="reels-share-to-feed__button clickable">\n          <div class="reels-share-to-feed__checkbox">\n            <svg class="reels-share-to-feed__checkbox-icon-empty" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M19 5v14H5V5zm0-2H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2z" fill="#1ba2f9" fill-rule="evenodd"/>\n            </svg>\n            <svg class="reels-share-to-feed__checkbox-icon-checked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M19 3H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2zm-9 14l-5-5 1-1 4 3 8-7 1 1-9 9z" fill="#1ba2f9" fill-rule="evenodd"/>\n            </svg>\n          </div>\n          <div class="reels-share-to-feed__label">\n            Also Share to Feed\n          </div>\n        </button>\n        <div class="reels-share-to-feed__preview">\n          <div class="reels-share-to-feed__preview-image"></div>\n          <div class="reels-share-to-feed__preview-caption">Feed Post Preview</div>\n        </div>\n      </div>\n    `);const n=m(".reels-share-to-feed");m(".reels-share-to-feed__button").addEventListener("click",(()=>{Ct.shareToFeed=!Ct.shareToFeed,n.classList.toggle("reels-share-to-feed_on")}))}));const t=()=>{var e,t;if(!Ct.creatingReels)return;const n=null===(e=St.getState().creation)||void 0===e||null===(t=e.coverPhoto)||void 0===t?void 0:t.dataURL;if(!n)return;const o=m(".reels-share-to-feed__preview-image");o&&(o.style.backgroundImage=`url('${n}')`)};h(t),St.subscribe(t),p`
    <style>
      .reels-share-to-feed {
        margin-top: 12px;
        padding: 5px 0;
        background: #FFF;
        border-top: 1px solid #DBDBDB;
        border-bottom: 1px solid #DBDBDB;
      }

      .reels-share-to-feed__title {
        padding: 12px 16px 0px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;
        font-family: Montserrat;
      }

      .reels-share-to-feed__warning {
        padding: 8px 16px 4px;
        max-width: 380px;
        font-family: Montserrat;
        line-height: 1.4;
      }

      .reels-share-to-feed__button {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 14px;
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        user-select: none;
      }

      .reels-share-to-feed__checkbox {
        margin-right: 12px;
      }

      .reels-share-to-feed_on .reels-share-to-feed__checkbox-icon-empty {
        display: none;
      }

      .reels-share-to-feed:not(.reels-share-to-feed_on) .reels-share-to-feed__checkbox-icon-checked {
        display: none;
      }

      .reels-share-to-feed__label {
        font-family: Montserrat;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
      }

      .reels-share-to-feed__preview {
        display: block;
        margin: 4px 0 4px 17px;
      }
      .reels-share-to-feed:not(.reels-share-to-feed_on) .reels-share-to-feed__preview {
        display: none;
      }

      .reels-share-to-feed__preview-image {
        width: 100px;
        height: 100px;
        background-size: cover;
        background-position: center;
        border-radius: 4px;
      }

      .reels-share-to-feed__preview-caption {
        font-family: Montserrat;
        font-size: 11px;
        font-weight: 500;
        margin-top: 4px;
        color: #8e8e8e;
      }
    </style>
  `}(),function(){const e=Symbol("handled");h((()=>{if(!Ct.creatingReels)return;const t=m(_t.postCreation.imageContainer),n=m(_t.postCreation.videoContainer),o=t||n;o&&(o[e]||(o[e]=!0,o.insertAdjacentHTML("beforeend",'\n      <div class="reels-tik-tok-watermark-info">\n        Find more info about posting Instagram Reels in our\n        <a href="https://inssist.com/knowledge-base" target="_blank">Knowledge Base</a> and\n        <a href="https://inssist.com/knowledge-base/sharing-tiktok-to-instagram-reels" target="_blank">Guide</a>.\n      </div>\n    ')))})),p`
    <style>
      .reels-tik-tok-watermark-info {
        display: block;
        padding: 16px 20px 20px 20px;
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        line-height: 1.6;
      }

      .reels-tik-tok-watermark-info ul {
        margin-top: 7px;
        list-style: disc;
      }

      .reels-tik-tok-watermark-info li {
        margin-left: 16px;
        margin-bottom: 4px;
      }
      .reels-tik-tok-watermark-info li:last-child {
        margin-bottom: 0;
      }

      .reels-tik-tok-watermark-info a {
        color: #1BA2F9 !important;
      }
      .theme-nigh .reels-tik-tok-watermark-info a {
        filter: url(#theme-reverse-filter);
        color: #33ABF8 !important;
      }
    </style>
  `}()},isCreatingReels:function(){return Ct.creatingReels},startReelsCreationSession:function(){const e=St.getState().creation.sessionId;Ct.creatingReels=!0,Ct.shareToFeed=!1,a.classList.add("reels--creating-reels"),Z.send("reels.creation-session-start"),Ct.stopSessionWatcher=St.subscribe((()=>{const t=St.getState();e!==t.creation.sessionId&&Tt()}))},stopReelsCreationSession:Tt};let _t,Pt,St,kt;const Ct={shareToFeed:!1,creatingReels:!1,stopSessionWatcher:null};function Tt(){Ct.creatingReels=!1,a.classList.remove("reels--creating-reels"),Z.send("reels.creation-session-end"),Ct.stopSessionWatcher&&Ct.stopSessionWatcher()}var At={init:function(){$t=ce.getConfig().igSelectors,Z.on("feature-encourage.start-story-creation",Lt),Z.on("feature-encourage.start-post-creation",Mt),Z.on("feature-encourage.start-reels-creation",Bt),function(){const e=Symbol("handled");h((()=>{const t=m($t.general.tabBarCreatePostButton);t&&(t[e]||(t[e]=!0,t.addEventListener("click",(e=>{Rt||(e.preventDefault(),e.stopPropagation(),Et?It():(Et=!0,Z.send("feature-encourage.toggle-creation-card",!0),Z.on("feature-encourage.app-click",It),document.addEventListener("click",It),document.addEventListener("keydown",Ft)))}),{capture:!0})))}))}()}};let $t,Et=!1,Rt=!1;async function Lt(){wt.stopReelsCreationSession();const e=await ue("nav");"feedPage"!==(await ue("store")).getState().navigation.pageIdentifier&&e.push("/"),h((async function e(){const t=m($t.general.createStoryHeaderButton);t&&(h.off(e),await l((()=>window.innerWidth<window.innerHeight)),t.click())}),!0)}function Mt(){wt.stopReelsCreationSession(),Rt=!0;m($t.general.tabBarCreatePostButton).click(),Rt=!1}function Bt(){Rt=!0;const e=m($t.general.tabBarInput),t=e.getAttribute("accept"),n=t.split(", ").filter((e=>e.startsWith("video"))).join(", ");e.setAttribute("accept",n);m($t.general.tabBarCreatePostButton).click(),e.setAttribute("accept",t),wt.startReelsCreationSession(),Rt=!1}function It(){Et=!1,Z.send("feature-encourage.toggle-creation-card",!1),Z.off("feature-encourage.app-click",It),document.removeEventListener("click",It),document.removeEventListener("keydown",Ft)}function Ft(e){"Escape"===e.key&&It()}var Dt={create:function e({show:t=!1,onClick:n=null,removeOnClick:o=!1}={}){const i=e;i.init||(i.init=!0,p`
      <style>
        .spinner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .spinner:not(.spinner_visible) {
          display: none;
        }

        .spinner__inner {
          width: 100px;
          height: 100px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
      </style>
    `);const r=document.createElement("div");r.innerHTML=`\n    <div class="spinner ${t?"spinner_visible":""}">\n      <div class="spinner__inner">\n        ${We()}\n      </div>\n    </div>\n  `;const s=r.firstElementChild;document.body.appendChild(s),o&&!n&&(n=()=>{s.remove()});if(n){m(".spinner__inner",s).addEventListener("click",n)}return s},toggle:function(e,t){e.classList.toggle("spinner_visible",t)}};var zt={init:async function(){if(Ot=ce.getConfig().igSelectors,Ht=await ue("nav"),Vt=await ue("store"),!Vt||!Ht)return;!function(){const e=Symbol("handled");h((()=>{const t=m(Ot.postCreation.imageContainer),n=m(Ot.postCreation.videoContainer),o=t||n;if(!o)return;if(o[e])return;o[e]=!0,o.insertAdjacentHTML("beforeend",'\n      <div class="extended-post-creation">\n        <div class="extended-post-creation__title">\n          Advanced Posting Options\n        </div>\n        <div class="extended-post-creation__content">\n          <button class="extended-post-creation__button" data-action="carousel">\n            <svg class="extended-post-creation__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M10.03 22a4.283 4.283 0 01-2.605-.876 4.363 4.363 0 01-1.539-2.212h2a2.483 2.483 0 002.14 1.235h8.647a2.474 2.474 0 002.471-2.471V9.03a2.483 2.483 0 00-1.235-2.14v-2a4.365 4.365 0 012.212 1.539A4.283 4.283 0 0123 9.03v8.647A4.329 4.329 0 0118.677 22zm-3.706-3.706A4.328 4.328 0 012 13.97V5.324A4.328 4.328 0 016.324 1h8.646a4.328 4.328 0 014.324 4.324v8.646a4.328 4.328 0 01-4.324 4.324zM3.853 5.324v8.646a2.474 2.474 0 002.471 2.471h8.646a2.474 2.474 0 002.471-2.471V5.324a2.474 2.474 0 00-2.471-2.471H6.324a2.474 2.474 0 00-2.471 2.471z" fill="currentColor"/>\n            </svg>\n            <div class="extended-post-creation__label">\n              ADD FILES AND CREATE CAROUSEL\n            </div>\n          </button>\n          <button class="extended-post-creation__button" data-action="schedule">\n            <svg class="extended-post-creation__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M13.841 1.565A9.936 9.936 0 003.906 11.5H.594l4.372 4.449 4.46-4.449H6.114a7.765 7.765 0 112.274 5.453L6.82 18.522a9.933 9.933 0 107.021-16.957zm-1.1 5.52v5.52l4.725 2.8.795-1.336-3.864-2.3V7.085z" fill="currentColor"/>\n            </svg>\n            <div class="extended-post-creation__label">\n              SCHEDULE POST\n            </div>\n          </button>\n        </div>\n      </div>\n    ');m('.extended-post-creation__button[data-action="carousel"]').addEventListener("click",(async()=>{const e=jt();if(!e)return;const t=Dt.create({show:!0,removeOnClick:!0}),n=Nt();await Z.send("feature-encourage.post-creation-carousel-click",{file:e,caption:n}),t.remove(),Ht.push("/")}));m('.extended-post-creation__button[data-action="schedule"]').addEventListener("click",(async()=>{const e=jt();if(!e)return;const t=Dt.create({show:!0,removeOnClick:!0}),n=Nt();await Z.send("feature-encourage.post-creation-schedule-click",{file:e,caption:n}),t.remove(),Ht.push("/")}))})),p`
    <style>
      .extended-post-creation {
        padding-top: 20px;
        padding-bottom: 40px;
        background: #FFF;
      }

      .extended-post-creation__title {
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        line-height: 1.25;
        color: #A5AAAF;
        margin-left: 20px;
      }

      .extended-post-creation__content {
        margin-top: 10px;
      }

      .extended-post-creation__button {
        display: flex;
        align-items: center;
        padding: 5px 16px;
        background: transparent;
        outline: none;
        border: none;
        color: #415B72;
        font-weight: 600;
        cursor: pointer;
        transition: filter 0.3s;
      }
      .extended-post-creation__button:hover {
        filter: brightness(120%);
      }
      .extended-post-creation__button:active {
        filter: brightness(90%);
      }

      .extended-post-creation__icon {}

      .extended-post-creation__label {
        margin-left: 12px;
        font-family: Montserrat;
        font-size: 11px;
        line-height: 14px;
        font-weight: 700;
      }
    </style>
  `}()}};let Ot,Ht,Vt;function jt(){var e,t;const n=Vt.getState(),o=(null===(e=n.creation)||void 0===e?void 0:e.sourceImage.file)||(null===(t=n.creation)||void 0===t?void 0:t.sourceVideo.file);if(!o)return null;const i=b.generate(),r=o.type.split("/").pop();return new File([o],`${i}.${r}`,{type:o.type})}function Nt(){var e,t;return(null===(e=Vt.getState().creation)||void 0===e||null===(t=e.finalizedMedia)||void 0===t?void 0:t.caption)||""}var Ut={init:function(){At.init(),zt.init()}};var Wt=Object.assign((function(e,t={}){document.addEventListener("click",e,t)}),{off:function(e,t={}){document.removeEventListener("click",e,t)}});var qt={init:function(e){if(!e)return;if(e[Yt])return;e[Yt]=!0;let t=!1;e.addEventListener("mouseleave",(()=>{t=!1})),e.addEventListener("mousewheel",(n=>{n.deltaX&&(t=!0),t||(n.preventDefault(),e.scrollLeft+=n.deltaY)}))}};const Yt=Symbol("handled");const Gt=window.storyMentionsContentScript;var Xt={init:async function(){Qt=ce.getConfig().igSelectors,Jt=await ue("http"),Kt=await ue("store"),Gt.onStoryCreationReduce((e=>{"STORY_CREATION_SESSION_STARTED"===e.type&&(Zt={mentions:[],inputSize:{width:0,height:0},activeMention:null})})),function(){const e=Symbol("handled");h((()=>{const t=m(Qt.storyCreation.topRightButtonsContainer);if(!t)return;if(t[e])return;t[e]=!0,"v1"===window.inssist.igBundleVersion?t.insertAdjacentHTML("afterbegin",'\n        <button class="story-add-mention-button">\n          @\n        </button>\n      '):t.insertAdjacentHTML("afterbegin",'\n        <button class="PolarisStoryImageCreationContainer story-add-mention-button">\n          @\n        </button>\n      ');m(".story-add-mention-button").addEventListener("click",(()=>{Kt.dispatch({type:"STORY_CREATION_ENTER_ADD_TEXT"}),Kt.dispatch({type:"STORY_CREATION_CHANGE_TEXT",rawText:"@",width:21.71875,height:22}),Kt.dispatch({type:"SEARCH_QUERY_CLEARED"});const e=m(Qt.storyCreation.textInput);e.textContent="@";const t=document.getSelection(),n=document.createRange();n.setStart(e,1),n.setEnd(e,1),t.removeAllRanges(),t.addRange(n)}))})),p`
    <style>
      .story-add-mention-button {
        height: 44px;
        position: relative;
        top: -1px;
        margin-right: 7px;
        font-size: 27px;
        font-weight: 500;
        font-family: montserrat;
        color: #FFF;
        background: transparent;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
        border: none;
        outline: none;
        cursor: pointer;
        pointer-events: all;
      }
    </style>
  `}(),function(){const e=Symbol("listenerAdded");h((()=>{const t=m(Qt.storyCreation.textInput);t&&(Zt.inputSize.width=t.offsetWidth,Zt.inputSize.height=t.offsetHeight,t[e]||(t[e]=!0,t.addEventListener("input",(()=>{Zt.inputSize.width=t.offsetWidth,Zt.inputSize.height=t.offsetHeight}))))}))}(),function(){const e=Symbol("handled");h((()=>{const t=m(Qt.storyCreation.mentionReel);t&&(t[e]||(t[e]=!0,qt.init(t)))})),Wt((e=>{const t=e.target.closest(Qt.storyCreation.mentionReelItem);if(!t)return;const n=m(Qt.storyCreation.textInput);if(!n)return;const o=`@${t.innerText}`;n.textContent=o;const i=n.getBoundingClientRect();Kt.dispatch({type:"STORY_CREATION_CHANGE_TEXT",width:i.width,height:i.height,rawText:o}),Kt.dispatch({type:"STORY_CREATION_SAVE_TEXT",renderText:[o],timeSpent:5e3})})),p`
    <style>
      ${Qt.storyCreation.mentionReelItem} {
        cursor: pointer;
      }

      ${Qt.storyCreation.textInput} {
        position: relative;
        top: 20px;
      }
    </style>
  `}(),Gt.onStoryCreationReduce(((e,t)=>{if("STORY_CREATION_SAVE_TEXT"!==e.type)return;if(1!==e.renderText.length)return;if(!e.renderText[0].startsWith("@"))return;const n=e.renderText[0].replace("@","");if(Zt.activeMention)Object.assign(Zt.activeMention,{username:n,width:Zt.inputSize.width,height:Zt.inputSize.height});else{const e=t.canvasStickers.find((e=>e.rawText===`@${n}`));if(!e)return;Zt.mentions.push({username:n,x:e.x,y:e.y,width:Zt.inputSize.width,height:Zt.inputSize.height})}})),Gt.onStoryCreationReduce(((e,t)=>{if("STORY_CREATION_CHANGE_STICKER_ORDER"!==e.type)return;const n=e.bumpIndex,o=t.canvasStickers[n];if(o&&o.rawText&&o.rawText.startsWith("@")){const e=o.rawText.replace("@",""),t=Zt.mentions.find((t=>t.username===e));Zt.activeMention=t||null}else Zt.activeMention=null})),Gt.onStoryCreationReduce((e=>{"STORY_CREATION_ENTER_ADD_TEXT"===e.type&&(Zt.activeMention=null)})),Gt.onStoryCreationReduce((e=>{"STORY_CREATION_MOVE_CANVAS_STICKER"===e.type&&Zt.activeMention&&(Zt.activeMention.x+=e.deltaX,Zt.activeMention.y+=e.deltaY)})),Gt.onStoryCreationReduce((e=>{"STORY_CREATION_DELETE_CANVAS_STICKER"===e.type&&Zt.activeMention&&function(e,t){let n;n="function"==typeof t?e.findIndex(t):e.indexOf(t),-1!==n&&e.splice(n,1)}(Zt.mentions,Zt.activeMention)})),function(){if(!Jt)return;const e=Jt.post;Jt.post=(...t)=>{if("/create/configure_to_story/"===t[0]&&Zt.mentions.length>0){const e=JSON.parse(JSON.stringify(Kt.getState()));t[1]={...t[1],reel_mentions:JSON.stringify(Zt.mentions.map((t=>{const n=e.users.usernameToId[t.username];if(!n)return null;const o=m(Qt.storyCreation.root)||document.body;return{user_id:n,x:Math.max(0,t.x/o.offsetWidth),y:Math.max(0,t.y/o.offsetHeight),width:t.width/o.offsetWidth,height:t.height/o.offsetHeight,rotation:0}})).filter(Boolean))}}return e.call(Jt,...t)}}()}};let Qt,Jt,Kt,Zt={mentions:[],inputSize:{width:0,height:0},activeMention:null};var en={init:function(){}};var tn=function(){p`
    <style>
      .theme-night .emoji {
        filter: url(#theme-reverse-filter);
      }
      .theme-night .emoji .emoji {
        filter: none;
      }

      .theme-night input,
      .theme-night textarea,
      .theme-night [contenteditable] {
        filter: url(#theme-filter);
        color: #a0a0a0 !important;
        background: transparent !important;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .theme-night input::placeholder,
      .theme-night textarea::placeholder {
        color: rgba(255, 255, 255, 0.33);
      }
    </style>
  `,function(){const e=ce.getConfig().fcsSelectors,t=ce.getConfig().dmSelectors,n=ce.getConfig().igSelectors;h((function e(t){const n=m("body");if(!n)return;h.off(e);new MutationObserver(i).observe(n,{childList:!0,subtree:!0}),i(t)}));let o=!1;function i(i){if(o)return;const r=i.map((e=>Array.from(e.addedNodes))).flat();if(0===r.length)return;const s=window.inssist.theme.emojiRegex,a=(m("body").innerText.match(s)||[]).filter((e=>!"0123456789#*↪".includes(e)));if(0===a.length)return;const l=[],c=Array.from(new Set(a)),d=["input","textarea","[contenteditable]",t.general.emojiPicker,n.general.postCaption,e.sidePanel.postPreviewCaption].map((e=>v(e))).flat();r.forEach((e=>{let t;if(t=e.nodeType===Node.ELEMENT_NODE?e:e.parentElement,!t)return;const n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT);for(;;){const e=n.nextNode();if(!e)break;const t=e.textContent;if(!c.some((e=>t.includes(e))))continue;if(d.some((t=>t.contains(e))))continue;const o=e.parentElement;o.classList.contains("emoji")||(l.includes(o)||l.push(o))}})),requestAnimationFrame((()=>{o=!0,l.forEach((e=>{if(!document.body.contains(e))return;let t=e.innerHTML;c.forEach((e=>{const n=`<span class="emoji">${e}</span>`;t=t.split(n).join("__$%#^__").split(e).join(n).split("__$%#^__").join(n)})),e.innerHTML=t})),o=!1}))}}()};var nn=function(){!async function(){on(await Z.send("theme.get-theme"))}(),async function(){Z.on("theme.switch-theme",(e=>{on(e)}))}(),tn()};function on(e){e&&(a.classList.remove("theme-day"),a.classList.remove("theme-night"),a.classList.add(`theme-${e}`))}var rn={init:function(){sn=ce.getConfig().igSelectors,async function(){const e=document.documentElement,t=await Z.send("zen.is-enabled");e.classList.toggle("zen--enabled",t),Z.on("zen.toggled",(t=>{e.classList.toggle("zen--enabled",t)}))}(),function(){const e=Symbol("handled");h((()=>{v(sn.feedPage.postHeader).forEach((t=>{if(t[e])return;t[e]=!0;const n=t.closest(sn.feedPage.post);if(!n)return;const o=m(sn.feedPage.postActions,n);if(!o)return;const i=m(sn.feedPage.postThreeDotsButton,n);if(!i)return;const r=()=>{n.classList.add("zen--post-with-hovered-header")},s=()=>{n.classList.remove("zen--post-with-hovered-header")};t.addEventListener("mouseenter",r),o.addEventListener("mouseenter",r),i.addEventListener("mouseenter",r),t.addEventListener("mouseleave",s),o.addEventListener("mouseleave",s),i.addEventListener("mouseleave",s)}))}))}(),async function(){const e=await ue("nav");if(!e)return;Z.on("zen.toggled",(t=>{t&&"/"!==location.pathname&&e.push("/")}))}(),function(){const e=Symbol("handled");h((()=>{v(sn.feedPage.post).forEach((t=>{t[e]||(t[e]=!0,v("[alt]",t).forEach((e=>{e.removeAttribute("alt")})))}))}))}(),p`
    <style>
      .zen--enabled[data-page="feedPage"] ${sn.feedPage.followSuggestions} {
        margin: 10px 14px;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postPhoto},
      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postVideo},
      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postVideoContainer},
      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postPhotoContainer},
      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postMediaContainer},
      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postCarouselContainer} {
        max-height: 70vh;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postMediaContainer} {
        background: #FFF !important;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.post} {
        background: #1b1b1b;
        overflow: hidden;
        margin: 8px 16px 5px 16px;
        border-radius: 8px;
      }
      .zen--enabled[data-page="feedPage"] ${sn.feedPage.post}:first-child {
        margin-top: 0;
      }

      /* semitransparent border */
      .zen--enabled[data-page="feedPage"] ${sn.feedPage.post}::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid rgba(0, 0, 0, 0.1);
        z-index: 1;
        pointer-events: none;
        border-radius: inherit;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postHeader} {
        position: absolute;
        top: 0;
        left: 0;
        height: 56px;
        z-index: 1;
        border-color: transparent;
        background: rgba(0, 0, 0, 0.4);
        padding: 0;
        border-radius: 8px 0 16px 0;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${sn.feedPage.postHeader} {
        background: rgba(255, 255, 255, 0.2);
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${sn.feedPage.postHeader} {
        height: 96px;
        right: 0;
        border-radius: 8px 8px 0 0;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postHeaderContent} {
        padding: 0;
        height: 56px;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postHeaderItem} {
        position: relative;
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${sn.feedPage.postHeaderItem} {
        top: 0;
      }

      /* hitbox when header is hovered */
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${sn.feedPage.postHeader}::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: -20px;
      }

      /* divider between actions */
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${sn.feedPage.postHeader}::after {
        content: "";
        position: absolute;
        top: 56px;
        left: 12px;
        right: 12px;
        height: 1px;
        border-top: 1px solid #fff;
        transform: scaleY(0.5);
        opacity: 0.25;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${sn.feedPage.postHeader}::after {
        filter: url(#theme-reverse-filter);
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postHeader} * {
        color: #FFF !important;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${sn.feedPage.postHeader} * {
        color: #000 !important;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postLocationRow} {
        display: flex;
        flex-direction: row;
        align-items: baseline;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postHashtagLocation} {
        margin-left: 12px;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postHashtagLocation}::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        top: 6px;
        left: -8px;
        background: #fff;
        border-radius: 50%;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${sn.feedPage.postHashtagLocation}::before {
        background: #000;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postThreeDotsButton} {
        z-index: 1;
        opacity: 0;
        pointer-events: none;
        top: -1px;
        right: -16px;
      }

      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${sn.feedPage.postThreeDotsButton} {
        opacity: 1;
        pointer-events: all;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postThreeDotsButton} svg {
        fill: #FFF;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${sn.feedPage.postThreeDotsButton} svg {
        fill: #000;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postFooterWrap1},
      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postFooterWrap2} {
        position: static;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postFooter} {
        position: absolute;
        top: -6px;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postActions} {
        display: none;
        position: absolute;
        top: 57px;
        left: 17px;
        z-index: 1;
        margin: 0 !important;
        transform: scale(0.73);
        transform-origin: left center;
        pointer-events: none;
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${sn.feedPage.postActions} {
        display: inherit;
        pointer-events: all;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postAction} {
        margin-right: 7px;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postAction} svg {
        fill: #FFF;
        stroke: #FFF;
        color: #FFF !important;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${sn.feedPage.postAction} svg {
        fill: #000;
        stroke: #000;
        color: #000 !important;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postAction}:not(:first-child) svg * {
        stroke-width: 2.5px !important;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.postUnderActionsContent} {
        display: none;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.carouselDots} {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.carouselDot} {
        background: #FFF;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${sn.feedPage.carouselDot} {
        filter: url(#theme-reverse-filter);
      }

      .zen--enabled[data-page="feedPage"] ${sn.feedPage.carouselActiveDot} {
        background: #97D6FF;
      }

      @media (max-width: 500px) {
        .zen--enabled[data-page="feedPage"] ${sn.feedPage.post}:first-child {
          margin-top: 16px !important;
        }
      }

      @media (max-width: 350px) {
        .zen--enabled[data-page="feedPage"] ${sn.feedPage.followSuggestions} {
          margin-left: 0;
          margin-right: 0;
        }
      }
    </style>
  `}};let sn;var an={send:function(e,...t){const n=new CustomEvent(`__event-bus.${e}`,{detail:t});window.dispatchEvent(n)},on:ln,once:function(e,t){ln(e,t,{once:!0})}};function ln(e,t,{once:n=!1}={}){window.addEventListener(`__event-bus.${e}`,(e=>{const n=e.detail||[];t(...n)}),{once:n})}var cn={init:function(){dn=ce.getConfig().igSelectors,pn=document.documentElement,function(){const e=Symbol("handled");h((()=>{const t=m(dn.postCreation.captionContainer);t&&(t[e]||(t[e]=!0,t.insertAdjacentHTML("afterend",hn())))}))}(),pn.addEventListener("click",(e=>{const t=e.target.closest(".new-post-extra__button-cancel"),n=e.target.closest(".new-post-extra__button");if(!n)return;const o=n.dataset.option;t?Z.send("new-post-extra.cancel-click",o):Z.send("new-post-extra.option-click",o)})),function(){const e=()=>{const e=m(".new-post-extra");e&&(e.outerHTML=hn())};Z.on("new-post-extra.synch-selected-option",(t=>{un.selectedOption=t,e()})),Z.on("new-post-extra.update-pill-music",(({name:t})=>{un.musicPillData.name=t,e()})),Z.on("new-post-extra.update-pill-cover",(({hasCover:t})=>{un.coverPillData.hasCover=t,e()}))}(),async function(){const e=await ue("store");if(!e)return;let t=null;e.subscribe((()=>{var n;const o=null===(n=e.getState().creation)||void 0===n?void 0:n.sourceVideo,i=o&&o.dataURL||null;t!==i&&(pn.classList.toggle("new-post-extra--video",!!i),t=i,i&&Z.send("new-post-extra.creation-video-change",i))}))}(),async function(){an.on("ig.creation-session-start",(()=>{un.musicPillData={name:null},un.coverPillData={hasCover:!1}}))}(),async function(){const e=await ue("store");if(!e)return;let t=!1;h((()=>{const n=!!m(dn.postCreation.captionTextarea);if(t!==n)if(t=n,t){const t=e.getState(),n=!!m(dn.postCreation.previewPostTypeIcon)?me((()=>t.creation.sourceVideo.uploadMediaDurationMs),0):0;Z.send("new-post-extra.enter-page",{videoDurationMs:n})}else Z.send("new-post-extra.exit-page")}))}(),p`
    <style>
      .new-post-extra {
        background: #FFF;
        border-bottom: 1px solid #DBDBDB;
        padding: 4px 0;
      }

      .new-post-extra__button {
        display: flex;
        align-items: center;
        border: none;
        outline: none;
        background: transparent;
        padding: 3px 18px 3px 8px;
        cursor: pointer;
      }
      /* not video? => hide cover assist and music assist buttons */
      html:not(.new-post-extra--video) .new-post-extra__button[data-option="cover-assist"],
      html:not(.new-post-extra--video) .new-post-extra__button[data-option="music-assist"] {
        display: none;
      }

      .new-post-extra__button-pill {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 3px 6px 3px 6px;
        border-radius: 4px;
        background: transparent;
      }
      .new-post-extra__button_can-cancel .new-post-extra__button-pill {
        background: #EFEFEF;
      }

      .new-post-extra__button-icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
        color: #738398;
        flex-shrink: 0;
      }

      .new-post-extra__button-text {
        font-family: Montserrat;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 190px;
        white-space: nowrap;
      }

      .new-post-extra__button-cancel {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        cursor: pointer;
        margin-left: 8px;
        color: #000;
        flex-shrink: 0;
        position: relative;
        border-radius: 50%;
        transition: background 0.3s;
      }
      .new-post-extra__button-cancel:hover {
        background: #D6D6D6;
      }
      .new-post-extra__button:not(.new-post-extra__button_can-cancel) .new-post-extra__button-cancel {
        display: none;
      }

      .new-post-extra__pro-badge {
        padding: 2px 8px 3px;
        border-radius: 3px;
        background: linear-gradient(183deg, #fd7726 -14%, #ef1834 60%, #c70bc0 128%);
        font-size: 9px;
        line-height: 11px;
        font-weight: 600;
        color: #FFF;
        margin-left: 16px;
      }

      .new-post-extra__button-chevron-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 21px;
        height: 21px;
        border-radius: 50%;
        box-sizing: border-box;
        padding: 4px 6px;
        margin-left: auto;
        color: #A5A7AA;
        position: relative;
        right: -5px;
      }
      .new-post-extra__button_selected .new-post-extra__button-chevron-icon {
        color: #FFF;
        background: #1BA2F9;
      }
    </style>
  `}};let dn,pn;const un={selectedOption:null,musicPillData:{name:null},coverPillData:{hasCover:!1}};function hn(){const e='\n    <svg\n      class="new-post-extra__button-chevron-icon"\n      xmlns="http://www.w3.org/2000/svg"\n      width="7.5"\n      height="12.357"\n      viewBox="0 0 7.5 12.357">\n      <path d="M7.301 6.659l-5.5 5.5a.679.679 0 01-.961 0l-.641-.641a.679.679 0 010-.959l4.358-4.38L.198 1.8a.679.679 0 010-.959L.839.2A.679.679 0 011.8.2l5.5 5.5a.679.679 0 01.001.959z" fill="currentColor"/>\n    </svg>\n  ',t='\n    <div class="new-post-extra__button-cancel">\n      <svg width="8" height="8" viewBox="0 0 8 8">\n        <path d="M6.5-.001 4 2.499l-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5Z" fill="currentColor"/>\n      </svg>\n    </div>\n  ';return`\n    <div class="new-post-extra">\n      \x3c!-- add music --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${un.musicPillData.name?"new-post-extra__button_can-cancel":""}\n          ${"music-assist"===un.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="music-assist">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M18.5 5.438a.937.937 0 0 0-1.22-.893L7.906 7.313a.937.937 0 0 0-.656.893v7.658a4.052 4.052 0 0 0-.937-.115c-1.554 0-2.813.84-2.813 1.875s1.259 1.877 2.812 1.877 2.812-.839 2.812-1.875v-6.847l7.5-2.2v5.41a4.052 4.052 0 0 0-.937-.115c-1.553 0-2.812.839-2.812 1.875s1.259 1.875 2.812 1.875 2.813-.839 2.813-1.875V5.438Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            ${un.musicPillData.name||"Add Music"}\n          </div>\n          ${t}\n        </div>\n        ${e}\n      </button>\n\n      \x3c!-- change cover --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${un.coverPillData.hasCover?"new-post-extra__button_can-cancel":""}\n          ${"cover-assist"===un.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="cover-assist">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M6 19.5A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5h12A1.5 1.5 0 0 1 19.5 6v12a1.5 1.5 0 0 1-1.5 1.5Zm10.055-1.4h2.021v-2.02l-4.037-4.037 2.016-2.021 2.021 2.021V5.986H5.962v6.057l2.021-2.021Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            ${un.coverPillData.hasCover?"Custom Cover":"Change Cover"}\n          </div>\n          ${t}\n        </div>\n        ${e}\n      </button>\n\n      \x3c!-- hashtag assistant --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${"tag-assist"===un.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="tag-assist">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M16.013 13.928h2.934v2.46h-3.228L15.268 20h-2.551l.451-3.611H9.851L9.399 20H6.871l.451-3.611H4.366v-2.461h3.25l.47-3.656H5.133v-2.46h3.253L8.835 4.2h2.528l-.451 3.611h3.318l.456-3.611h2.528l-.451 3.611h2.934l.023 2.46h-3.25Zm-2.551 0 .474-3.656h-3.318l-.474 3.656Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            Hashtag Assistant\n          </div>\n          ${t}\n        </div>\n        ${e}\n      </button>\n    </div>\n  `}var gn={init:function(){fn=ce.getConfig().igSelectors,window.inssist.moduleInterceptor.registerReduxAction("inssist.cover-assist.set-cover",((e,t)=>({...e,creation:{...e.creation,coverPhoto:{...e.creation.coverPhoto,file:t.file,dataURL:t.url}}}))),async function(){let e=null;const t=await ue("store");if(!t)return;Z.on("cover-assist.synch-cover",(n=>{if(!m(fn.postCreation.previewPostImage))return;const o=t.getState();n?(o.creation.sessionId!==e&&(e=o.creation.sessionId,mn={url:o.creation.coverPhoto.dataURL,blob:o.creation.coverPhoto.file}),t.dispatch({type:"inssist.cover-assist.set-cover",url:URL.createObjectURL(n),file:n})):o.creation.sessionId===e&&t.dispatch({type:"inssist.cover-assist.set-cover",url:mn.url,file:mn.blob})}))}(),Z.on("cover-assist.get-default-ig-cover-url",vn)}};let fn,mn=null;async function vn(){var e,t;const n=await ue("store");return n?mn?mn.url:null===(e=n.getState().creation)||void 0===e||null===(t=e.coverPhoto)||void 0===t?void 0:t.dataURL:null}async function bn(e){const t="string"==typeof e?e:URL.createObjectURL(e),n=document.createElement("video");n.src=t,n.muted=!0,n.volume=0,n.preload="metadata",n.play();const o={};return await new Promise(((e,t)=>{n.addEventListener("loadedmetadata",(async()=>{await l((()=>n.webkitAudioDecodedByteCount),100),o.width=n.videoWidth,o.height=n.videoHeight,o.duration=n.duration,o.hasAudio=n.webkitAudioDecodedByteCount>0,e()})),n.addEventListener("error",(()=>{t(n.error)}))})),n.remove(),o}const yn={maxStoryVideoDuration:60900,init:async function(){this._chunks=[],this._patchStoryVideoUpload(),this._patchStoryCoverUpload(),this._patchStoryPublishing()},_requireApi:async function(){const e=await ue("api:story-assist");return ue.unlockOnNextTick("api"),e},_requireHttp:async function(){const e=await ue("http:story-assist");return ue.unlockOnNextTick("http"),e},_isStoryCreationPage:function(){return location.href.includes("/create/story/")},_patchStoryVideoUpload:async function(){const e=await this._requireApi(),t=e.ruploadVideo.bind(e);e.ruploadVideo=async(...e)=>{if(!this._isStoryCreationPage())return t(...e);const n=e[0];if(n.uploadMediaDurationMs<=this.maxStoryVideoDuration)return this._chunks=[],t(...e);this._log("splitting video into chunks...");const o=await Z.send("story-assist.split-story-video",n.file);let i;this._log(`created ${o.length} chunks`),this._chunks=[];for(const e of o){this._log(`uploading chunk #${this._chunks.length+1}`);const o=URL.createObjectURL(e),r=String(Date.now()),s=await bn(o),a={...n,file:e,dataURL:o,uploadId:r,uploadMediaDurationMs:1e3*s.duration,entityName:`story_${r}`};i=await t(a),this._chunks.push(a),this._log("ig response",i)}return i}},_patchStoryCoverUpload:async function(){const e=await this._requireApi(),t=e.ruploadPhoto.bind(e);e.ruploadPhoto=async(...e)=>{if(!this._isStoryCreationPage())return t(...e);if(0===this._chunks.length)return t(...e);let n;for(const o of this._chunks){this._log(`uploading cover for chunk #${this._chunks.indexOf(o)+1}`);const i=await this._takeFirstFrame(o.dataURL);n=await t({...e[0],file:i,dataURL:URL.createObjectURL(i),uploadId:o.uploadId,entityName:o.entityName}),this._log("ig response",n)}return n}},_patchStoryPublishing:async function(){const e=await this._requireHttp(),t=e.post.bind(e);e.post=async(...e)=>{if(!e[0].includes("/create/configure_to_story/"))return t(...e);if(0===this._chunks.length)return t(...e);let n;for(const o of this._chunks)this._log(`publishing chunk #${this._chunks.indexOf(o)+1}`),n=await t(e[0],{...e[1],upload_id:o.uploadId,...o!==this._chunks[0]&&{reel_mentions:null}}),this._log("ig response",n);return n}},_takeFirstFrame:async function(e){const t=document.createElement("video");t.src=e,t.muted=!0,t.preload="metadata",t.currentTime=.01,await new Promise((e=>t.onloadedmetadata=e)),await new Promise((e=>t.ontimeupdate=e));const n=document.createElement("canvas"),o=n.getContext("2d");n.width=t.videoWidth,n.height=t.videoHeight;return await new Promise((e=>{o.drawImage(t,0,0),n.toBlob((t=>e(t)),"image/jpeg")}))},_log:function(...e){console.log(`[story assist splitter] ${e[0]}`,...e.slice(1))}},xn={init:async function(){this._sel=ce.getConfig().igSelectors,this._updateStyles(),this._manageToggleButton(),this._addMentionsToRequest(),this._hideStoryAssistPanelOnSubmit(),this._notifyStoryCover(),this._manageTrial(),yn.init()},_updateStyles:function(){p`
      <style>
        ${this._sel.storyCreation.videoHeader} {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
        }

        ${this._sel.storyCreation.videoCreationExitButton} {
          margin-right: auto;
        }
      </style>
    `},_manageToggleButton:function(){let e;const t=Symbol();h((()=>{const n=m(this._sel.storyCreation.videoHeader);n&&(n[t]||(n[t]=!0,n.insertAdjacentHTML("beforeend",'\n        <div class="StoryAssistToggleButton StoryAssistToggleButton_hidden">\n          <svg class="StoryAssistToggleButton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97">\n            <path d="M12.03 84.212h360.909c6.641 0 12.03-5.39 12.03-12.03 0-6.641-5.39-12.03-12.03-12.03H12.03C5.39 60.152 0 65.541 0 72.182c0 6.641 5.39 12.03 12.03 12.03zM372.939 180.455H12.03c-6.641 0-12.03 5.39-12.03 12.03s5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03s-5.389-12.03-12.03-12.03zM372.939 300.758H12.03c-6.641 0-12.03 5.39-12.03 12.03 0 6.641 5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.03-12.03z" fill="currentColor"/>\n          </svg>\n        </div>\n      '),e=m(".StoryAssistToggleButton"),e.addEventListener("click",(()=>{Z.send("story-assist.toggle")}))))})),Z.on("story-assist.panel-toggled",(t=>{e&&e.classList.toggle("StoryAssistToggleButton_hidden",t)})),p`
      <style>
        .StoryAssistToggleButton {
          width: 22px;
          height: 22px;
          margin-left: 12px;
          margin-right: 14px;
          cursor: pointer;
          filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.5));
          transition: all 0.3s;
        }
        .StoryAssistToggleButton_hidden {
          width: 0;
          margin-left: 0;
          margin-right: 0;
          opacity: 0;
          pointer-events: none;
        }

        /* hitbox  */
        .StoryAssistToggleButton::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
        }

        .StoryAssistToggleButton__icon {
          width: 24px;
          height: 24px;
          color: #FFF;
        }
      </style>
    `},_addMentionsToRequest:async function(){const e=await ue("http");if(!e)return;const t=e.post.bind(e);e.post=async(...e)=>(await(async()=>{if(!e[0].includes("/create/configure_to_story/"))return;const t=await Z.send("story-assist.get-mentions");0!==t.length&&(e[1].reel_mentions=JSON.stringify(t.map((e=>({user_id:e.id})))))})(),t(...e))},_hideStoryAssistPanelOnSubmit:function(){const e=Symbol();h((()=>{const t=m(this._sel.storyCreation.submitButton);t&&(t[e]||(t[e]=!0,t.addEventListener("click",(()=>{Z.send("story-assist.toggle",!1)}))))}))},_notifyStoryCover:async function(){const e=await ue("store");if(!e)return;let t;e.subscribe((()=>{var n,o;const i=null===(n=e.getState().storyCreation)||void 0===n||null===(o=n.coverPhoto)||void 0===o?void 0:o.dataURL;t!==i&&(t=i,Z.send("story-assist.cover-change",i))}))},_manageTrial:async function(){let e;const t=Symbol();h((()=>{const n=m(this._sel.storyCreation.submitButton);n&&(n[t]||(n[t]=!0,n.addEventListener("click",(async t=>{e||(t.preventDefault(),t.stopPropagation(),e=await Z.send("story-assist.has-pro"),e?n.click():Z.send("story-assist.show-upsell"))}),!0)))}))}},wn={init:function(){this.video=null,this.audio=null,this.overlay=null,this.helpers=null,this.musicUrl=null,this.musicStart=0,this.musicVolume=0,this.videoVolume=0,this.onVideoResize=this.onVideoResize.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.videoResizeObserver=null,this.autoRegister(),this.handleDataUpdates()},autoRegister:function(){h((()=>{const e=m("video[music-assist-player]");e&&!this.video?this.register(e):!e&&this.video&&this.unregister()}))},handleDataUpdates:function(){o.isIframe()?Z.on("music-assist.update-player-data",this.applyData.bind(this)):an.on("music-assist.update-player-data",this.applyData.bind(this))},register:function(e){document.head.insertAdjacentHTML("beforeend",`\n      <style class="MusicAssistPlayer__style">\n        ${this.getStyles()}\n      </style>\n    `),document.body.insertAdjacentHTML("afterend",'\n      <div class="MusicAssistPlayer__helpers">\n        <audio class="MusicAssistPlayer__audio"></audio>\n        <div class="MusicAssistPlayer__overlay">\n          <div class="MusicAssistPlayer__spinner"></div>\n          <div class="MusicAssistPlayer__pause"></div>\n        </div>\n      </div>\n    '),this.video=e,this.audio=document.querySelector(".MusicAssistPlayer__audio"),this.style=document.querySelector(".MusicAssistPlayer__style"),this.overlay=document.querySelector(".MusicAssistPlayer__overlay"),this.helpers=document.querySelector(".MusicAssistPlayer__helpers"),this.musicUrl&&(this.audio.src=this.musicUrl),this.audio.volume=this.musicVolume,this.video.volume=this.videoVolume,this.videoResizeObserver=new ResizeObserver(this.onVideoResize),this.videoResizeObserver.observe(this.video),window.addEventListener("resize",this.onWindowResize),this.updateOverlayPosition(),setTimeout((()=>this.updateOverlayPosition()),300),setTimeout((()=>this.updateOverlayPosition()),1e3),this.startMusicAndVideoSync(),this.video.addEventListener("play",(()=>{this.startMusicAndVideoSync()})),this.video.addEventListener("timeupdate",(()=>{this.video&&(o.isIframe()?Z.send("music-assist.set-video-current-time",this.video.currentTime):an.send("music-assist.set-video-current-time",this.video.currentTime))}))},unregister:function(){this.style.remove(),this.helpers.remove(),this.video=null,this.audio=null,this.style=null,this.overlay=null,this.helpers=null,this.videoResizeObserver.disconnect(this.video),this.videoResizeObserver=null,window.removeEventListener("resize",this.onWindowResize),this.stopMusicAndVideoSync()},applyData:function({isStory:e,musicUrl:t,musicStart:n,musicVolume:o,videoVolume:i}){if(!this.video)return this.musicUrl=t,this.musicStart=n,this.musicVolume=o,void(this.videoVolume=i);this.musicVolume=o,this.videoVolume=i,t&&(this.audio.volume=o),!t&&e||(this.video.volume=i),this.musicUrl!==t&&(this.musicUrl=t,t?(this.audio.src=t,this.video.currentTime=0,this.video.play()):(this.audio.pause(),this.audio.removeAttribute("src"),this.video.currentTime=0,this.video.pause())),this.musicStart!==n&&(this.musicStart=n,t&&(this.video.currentTime=0,this.video.play())),t?this.startMusicAndVideoSync():this.stopMusicAndVideoSync()},onVideoResize:function(){this.updateOverlayPosition()},onWindowResize:function(){this.updateOverlayPosition()},updateOverlayPosition:function(){if(!this.video)return;if(!this.overlay)return;const e=this.video.getBoundingClientRect();this.overlay.style.top=`${e.top}px`,this.overlay.style.left=`${e.left}px`,this.overlay.style.width=`${e.width}px`,this.overlay.style.height=`${e.height}px`},startMusicAndVideoSync:function(){if(!this.musicUrl)return;if(this.syncEnabled)return;this.video.paused||setTimeout((()=>{this.video.currentTime=this.video.currentTime,this.video.play()}),100),this.syncEnabled=!0;const e=this.video,t=this.audio;let n,o;this.onPauseClick=()=>{this.playing=!1,document.documentElement.classList.toggle("MusicAssistPlayer--playing",this.playing)},document.querySelector(".MusicAssistPlayer__pause").addEventListener("click",this.onPauseClick),this.playing=!1,this.ignoreSyncOnPlay=!1,this.ignoreSyncOnPause=!1,this.ignoreSyncOnSeeking=!1,this.ignoreAudioPause=!1,this.onVideoPause=()=>{this.ignoreSyncOnPause?this.ignoreSyncOnPause=!1:(this.playing=!1,document.documentElement.classList.toggle("MusicAssistPlayer--playing",this.playing),i("pause"))},e.addEventListener("pause",this.onVideoPause),this.onVideoPlay=()=>{this.ignoreSyncOnPlay?this.ignoreSyncOnPlay=!1:(this.playing=!0,document.documentElement.classList.toggle("MusicAssistPlayer--playing",this.playing),i("play"))},e.addEventListener("play",this.onVideoPlay),this.onVideoSeeking=()=>{this.ignoreSyncOnSeeking?this.ignoreSyncOnSeeking=!1:i("seeking")},e.addEventListener("seeking",this.onVideoSeeking),e.pauseNoSync=()=>{e.paused||(this.ignoreSyncOnPause=!0,e.pause())},e.playNoSync=()=>{e.paused&&(this.ignoreSyncOnPlay=!0,e.play())};const i=i=>{clearTimeout(o),o=setTimeout((async()=>{if(clearTimeout(n),!this.video)return;if(!this.audio)return;if(!this.musicUrl)return;e.pauseNoSync(),t.pauseNoSync();const o=e.currentTime;this.ignoreSyncOnSeeking=!0,e.currentTime=o,t.currentTime=this.musicStart+o,n=setTimeout((()=>{document.documentElement.classList.add("MusicAssistPlayer--loading")}),300);const i=new Promise((e=>t.oncanplay=e)),r=new Promise((t=>e.oncanplay=t));await Promise.all([i,r]),clearTimeout(n),document.documentElement.classList.remove("MusicAssistPlayer--loading"),this.playing&&(e.playNoSync(),(!t.ended||t.currentTime<t.duration)&&t.play())}))};t.pauseNoSync=()=>{t.paused||(this.ignoreAudioPause=!0,t.pause())},this.audioOnPause=()=>{this.ignoreAudioPause?this.ignoreAudioPause=!1:t.ended||e.pauseNoSync()},t.addEventListener("pause",this.audioOnPause)},stopMusicAndVideoSync:function(){this.syncEnabled=!1,document.documentElement.classList.toggle("MusicAssistPlayer--playing",!1),document.documentElement.classList.toggle("MusicAssistPlayer--loading",!1),this.video&&(this.video.removeEventListener("pause",this.onVideoPause),this.video.removeEventListener("play",this.onVideoPlay),this.video.removeEventListener("seeking",this.onVideoSeeking)),this.audio&&this.audio.removeEventListener("pause",this.audioOnPause);const e=document.querySelector(".MusicAssistPlayer__pause");e&&e.removeEventListener("click",this.onPauseClick)},getStyles:function(){return'\n      <style>\n        /* hide native spinner */\n        video[music-assist-player]::-webkit-media-controls {\n          visibility: hidden;\n        }\n        video[music-assist-player]::-webkit-media-controls-enclosure {\n          visibility: visible;\n        }\n\n        .MusicAssistPlayer__overlay {\n          position: fixed;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          pointer-events: none;\n          overflow: hidden;\n        }\n        html.theme-night .MusicAssistPlayer__overlay {\n          filter: url(#theme-reverse-filter); /* for injection */\n        }\n\n        .MusicAssistPlayer__spinner {\n          --size: 40px;\n          --thickness: 3px;\n          --color-bg: transparent;\n          --color-value: #fff;\n          width: var(--size);\n          height: var(--size);\n          border-radius: 50%;\n          border-top: var(--thickness) solid var(--color-bg);\n          border-right: var(--thickness) solid var(--color-value);\n          border-bottom: var(--thickness) solid var(--color-value);\n          border-left: var(--thickness) solid var(--color-value);\n          animation: MusicAssistPlayer__rotate 0.9s infinite linear;\n          filter:  drop-shadow(0 0 1px rgba(0, 0, 0, 0.16));\n          margin-top: -20px;\n        }\n        .MusicAssistPlayer__spinner::after {\n          width: 100%;\n          height: 100%;\n          border-radius: 50%;\n        }\n        html:not(.MusicAssistPlayer--loading) .MusicAssistPlayer__spinner {\n          display: none;\n        }\n        @keyframes MusicAssistPlayer__rotate {\n          0% { transform: rotate(0deg); }\n          100% { transform: rotate(360deg); }\n        }\n\n        .MusicAssistPlayer__pause {\n          width: 36px;\n          height: 36px;\n          position: absolute;\n          left: 6px;\n          bottom: 30px;\n          border-radius: 50%;\n          cursor: pointer;\n          pointer-events: all;\n          background-size: 20px;\n          background-repeat: no-repeat;\n          background-position: center;\n          background-image: url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSJXaW5kb3ciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPHBhdGggZD0iTTYgMTloNFY1SDZ2MTR6bTgtMTR2MTRoNFY1aC00eiIvPgogICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K");\n          transition: background-color 0.3s;\n          display: none;\n        }\n        .MusicAssistPlayer__pause:hover {\n          background-color: #212123;\n        }\n        html.MusicAssistPlayer--loading.MusicAssistPlayer--playing .MusicAssistPlayer__pause {\n          display: block;\n        }\n        /* hide native pause button  */\n        html.MusicAssistPlayer--loading.MusicAssistPlayer--playing video::-webkit-media-controls-play-button {\n          visibility: hidden;\n        }\n      </style>\n    '.replace("<style>","").replace("</style>","")}},_n={init:async function(){this.api=await ue("api"),this.api&&this.addMusicToVideoBeforeUpload()},addMusicToVideoBeforeUpload:function(){const e=this.api.ruploadVideo;this.api.ruploadVideo=async(...t)=>(await(async()=>{if(!await Z.send("music-assist.should-generate-video"))return;const e=await Z.send("music-assist.generate-video",t[0].file);e&&(t[0].file=e,t[0].dataURL=URL.createObjectURL(e))})(),e.call(this.api,...t))}},Pn={init:async function(){this.sel=ce.getConfig().igSelectors,this.state={selectedTrackName:null},this.createPill(),this.insertStyles(),this.handlePillClicks(),this.updateUiWhenNeeded(),this.registerVideoPlayer(),this.resetStateOnCreationSessionStart()},createPill:function(){const e=Symbol("handled");h((()=>{const t=m(".StoryAssistToggleButton");t&&(t[e]||(t[e]=!0,t.insertAdjacentHTML("beforebegin",this.renderPill())))}))},handlePillClicks:function(){a.addEventListener("click",(e=>{if(e.target.closest(".MusicAssistStoryPill__cancel"))return void Z.send("new-post-extra.cancel-click","music-assist");e.target.closest(".MusicAssistStoryPill")&&Z.send("music-assist.open-for-story-creation")}))},updateUiWhenNeeded:function(){Z.on("new-post-extra.update-pill-music",(({name:e})=>{this.state.selectedTrackName=e,this.updateUi()}))},updateUi:function(){const e=m(".MusicAssistStoryPill");e&&(e.outerHTML=this.renderPill()),a.classList.toggle("MusicAssist--hasSelectedTrack",!!this.state.selectedTrackName)},registerVideoPlayer:function(){const e=Symbol("handled");h((()=>{const t=m(this.sel.storyCreation.video);t&&(t[e]||(t[e]=!0,t.setAttribute("music-assist-player","")))}))},resetStateOnCreationSessionStart:function(){an.on("ig.creation-session-start",(()=>{this.state.selectedTrackName=null,this.updateUi()}))},renderPill:function(){return`\n      <div class="\n        MusicAssistStoryPill\n        ${this.state.selectedTrackName?"":"MusicAssistStoryPill_empty"}\n      ">\n        <svg class="MusicAssistStoryPill__icon" viewBox="0 0 24 24">\n          <path d="M0 0h24v24H0Z" fill="none"/>\n          <path d="M18.5 5.438a.937.937 0 0 0-1.22-.893L7.906 7.313a.937.937 0 0 0-.656.893v7.658a4.052 4.052 0 0 0-.937-.115c-1.554 0-2.813.84-2.813 1.875s1.259 1.877 2.812 1.877 2.812-.839 2.812-1.875v-6.847l7.5-2.2v5.41a4.052 4.052 0 0 0-.937-.115c-1.553 0-2.812.839-2.812 1.875s1.259 1.875 2.812 1.875 2.813-.839 2.813-1.875V5.438Z" fill="currentColor"/>\n        </svg>\n        <div class="MusicAssistStoryPill__text">\n          ${this.state.selectedTrackName}\n        </div>\n        <div class="MusicAssistStoryPill__cancel">\n          <svg width="8" height="8" viewBox="0 0 8 8">\n            <path d="M6.5-.001 4 2.499l-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5Z" fill="currentColor"/>\n          </svg>\n        </div>\n      </div>\n    `},insertStyles:function(){p`
      <style>
        .MusicAssistStoryPill {
          display: flex;
          flex-direction: row;
          align-items: center;
          align-self: center;
          height: 34px;
          padding: 0 6px;
          margin-right: 8px;
          color: #FFF;
          border: 1px solid #FFF;
          border-radius: 4px;
          user-select: none;
          filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2));
          backdrop-filter: blur(3px);
          max-width: calc(100vw - 170px);
          cursor: pointer;
          background: rgba(255, 255, 255, 0.1);
          transition: background 0.3s;
        }
        .MusicAssistStoryPill:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .MusicAssistStoryPill_empty {
          opacity: 0;
          pointer-events: none;
        }

        .MusicAssistStoryPill__icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }

        .MusicAssistStoryPill__text {
          font-family: Montserrat;
          font-weight: 500;
          font-size: 14px;
          display: block;
          flex-shrink: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .MusicAssistStoryPill__cancel {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          cursor: pointer;
          margin-left: 8px;
          color: #FFF;
          flex-shrink: 0;
          position: relative;
          border-radius: 50%;
          transition: background 0.3s;
        }
        .MusicAssistStoryPill__cancel:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        /* hide volume control when some track is selected */
        html.MusicAssist--hasSelectedTrack ${this.sel.storyCreation.video}::-webkit-media-controls-volume-control-container {
          display: none;
        }
      </style>
    `}},Sn=function(){wn.init(),_n.init(),Pn.init()};var kn={init:function(){!async function(){const e=ce.getConfig(),t=await ue("gatekeeper");if(!t)return;const n=t.passesGatekeeper.bind(t);t.originalPassesGatekeeper=n,t.passesGatekeeper=(...t)=>{const o=String(t[0]);return e.ig.gatekeeperIds.includes(o)||n(...t)}}()}};var Cn=[".XrOey:nth-child(3)",".PolarisDesktopNav._acut:nth-child(3)"],Tn=[".ctQZg button",".PolarisCreationIcon button"],An=[".Yx5HN h1",".IGDSDialog h1"],$n=[".uYzeu","._ac2r"],En=[".IJeHu > div > div",".PolarisCreationModalBodyV2._ac2v"],Rn=["._C8iK > .YBx95",".Dh40d","._ac2t > .PolarisIGCoreBox"],Ln=["._C8iK > .YBx95 h2",".Yx5HN .Dh40d h2","._ac2t > .PolarisIGCoreBox h2"],Mn=["._C8iK > .YBx95 svg",".Yx5HN .Dh40d svg","._ac2t > .PolarisIGCoreBox svg"],Bn=['._ac2r .PolarisCreationLoadingBar[data-visualcompletion="loading-state"]'],In=[".czW__ > div:first-child .RJJyf > button",".PolarisCreationMediaPreviewV2 > div:first-child div:not([class]) button"],Fn=[".YAPUk button:nth-of-type(3)",".PolarisCreationMediaPopover > button:nth-of-type(3)"],Dn=[".brfp7 div:not([class])","div.PolarisCreationLocationInput"],zn=[".PxObI",".PolarisCreationFilmStrip"],On=[":not(.n6uTB) + .n6uTB",".PolarisCreationModalComposeSettingsContent > div:not([class]) + .PolarisCreationModalComposeExpandInput"],Hn=".n6uTB + .n6uTB",Vn=[".PolarisCreationModalComposeSettingsContent > div:not([class]) ~ .PolarisCreationModalComposeExpandInput"],jn=[".W4P49",".PolarisCreationModalComposeSettingsContent hr"],Nn=[".WaOAr .yWX7d","div.PolarisIGCoreModalHeader:last-child button"],Un=['div[style*="height: 96px"][style*="width: 96px"]'],Wn=['img[src*="creation/spinner"]','div[style*="height: 96px"][style*="width: 96px"] img[src*=".gif"]'],qn=[".czW__ > .Xf6Yq",".PolarisCreationMediaPreviewV2 > ._abck div:not([class])"],Yn=[".BaseDialog form.PolarisImageFileForm"],Gn={init:function(e){Xn=e,function(){if(Xn.isMobileSession)return;const e=Symbol("handled");h((()=>{if(Xn.isMobileSession)return;if(!Xn.creatingReels)return;if(!!!m(zn))return;const t=m(Nn);if(!t)return;if(t[e])return;t[e]=!0,t.textContent="Authorize Reels API →",t.style.marginLeft="-90px",t.style.whiteSpace="nowrap",t.addEventListener("click",(e=>{Xn.isMobileSession||(e.preventDefault(),e.stopPropagation(),async function(){const e=Qn();at("desktop-reels.drop-session"),await Ae(300);const t=600,n=700,o=Math.round(screen.width/2-t/2),i=`status,scrollbars,toolbar,top=${Math.round(screen.height/2-n/2)},left=${o},width=${t},height=${n}`,r="https://www.instagram.com/accounts/login/",s="desktop-reels.auth-window",a=window.open(r,s,i);await new Promise((e=>{const t=setInterval((()=>{a.closed&&(clearInterval(t),e())}),100)}));const l=Qn();if(e!==l)return void location.reload();Xn.isMobileSession=!0;const c=m(Nn);c&&c.click()}())}),{capture:!0});const n=m(En);n&&n.insertAdjacentHTML("afterbegin",'\n      <div class="ReelsAuthDisclaimer">\n        <div class="ReelsAuthDisclaimer__title">\n          Authorize Reels API\n        </div>\n        <div class="ReelsAuthDisclaimer__text">\n          You will be asked to relogin as a part of authorization.\n          Once authorized, you can post Reels.\n        </div>\n      </div>\n    ')})),p`
    <style>
      .ReelsAuthDisclaimer {
        margin-top: 16px;
        margin-bottom: 16px;
        padding-left: 13px;
        border-left: 2px solid #0095f6;
      }

      .ReelsAuthDisclaimer__title {
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 16px;
      }

      .ReelsAuthDisclaimer__text {
        color: #676767;
      }
    </style>
  `}()}};let Xn;function Qn(){return document.cookie.match(/ds_user_id=([^;]+)/)[1]||null}var Jn={init:async function(){if(Kn=await ue("http"),Zn=await ue("gatekeeper"),eo=await ue("add-dispatch-listener"),!Kn||!Zn||!eo)return;const e=await l((()=>window.inssist.desktopReelsData));Object.assign(to,e),function(){const e=Symbol("handled");h((()=>{if(!to.creatingReels)return;if(!m(Yn))return;const t=m(An);if(t){if(t[e])return;t[e]=!0,t.innerText="New Reel / Powered by INSSIST"}const n=m(Ln);if(n){if(n[e])return;n[e]=!0,n.innerText="Drag video for your Reel here."}const o=m(Mn);if(o){if(o[e])return;o.setAttribute("width","77"),o.setAttribute("height","77"),o.setAttribute("viewBox","0 0 24 24"),o.innerHTML='\n        <path\n          d="M15.548 14.007l-.006-.005-.006-.004-4.696-2.73s0 0 0 0a.736.736 0 00-.381-.113.73.73 0 00-.373.108c-.262.11-.407.371-.407.662v5.464c0 .262.155.511.398.658h0l.009.004a.899.899 0 00.352.098.88.88 0 00.314-.069l.063-.022.012-.004.012-.006 4.697-2.732h0l.001-.001a.743.743 0 00.357-.658c0-.259-.152-.505-.346-.65zM20.764 3.85h0l-.003-.004c-.534-.513-1.125-.945-1.943-1.247-.816-.301-1.85-.47-3.264-.47h-6.5c-1.394 0-2.417.169-3.233.476-.818.307-1.42.75-1.974 1.283h0l-.003.004C3.33 4.428 2.9 5.02 2.599 5.834c-.3.812-.469 1.837-.469 3.234v6.514c0 1.396.169 2.432.475 3.255.306.824.748 1.428 1.282 1.964l.002.002c.534.513 1.126.945 1.943 1.246.816.302 1.85.47 3.264.47h6.5c1.394 0 2.428-.168 3.249-.475.823-.307 1.425-.75 1.96-1.285l.001-.002c.513-.535.944-1.128 1.245-1.947.3-.817.469-1.853.469-3.27V9.068c0-1.397-.169-2.422-.475-3.24-.306-.819-.748-1.422-1.28-1.977zm-5.168-.2c1.31 0 2.174.166 2.788.41.612.244.985.567 1.314.896.466.468.897 1.045 1.149 2.216h-3.665L15.19 3.65h.406zm-6.948 0h4.734l1.991 3.522H10.64L8.648 3.65zM4.952 4.957c.435-.436.982-.87 2.065-1.12l1.897 3.336h-5.11c.25-1.17.682-1.748 1.148-2.216zm16.05 10.667c0 1.313-.167 2.178-.41 2.794-.243.613-.565.987-.894 1.316-.328.33-.712.652-1.33.896-.62.244-1.482.411-2.772.411H9.054c-1.31 0-2.174-.167-2.788-.411-.612-.243-.985-.566-1.314-.896a3.699 3.699 0 01-.893-1.332c-.244-.62-.41-1.486-.41-2.778v-6.93h17.353v6.93z"\n          fill="currentColor"\n          stroke="#FFF"\n          stroke-width=".8"\n        />\n      '}})),p`
    <style>
      .reels--creating ${qn},
      .reels--creating ${Dn},
      .reels--creating ${On},
      .reels--creating ${Hn},
      .reels--creating ${Vn},
      .reels--creating ${jn} {
        display: none !important;
      }
    </style>
  `}(),bt(Kn,{isCreatingReels:()=>to.creatingReels,isSharingToFeed:()=>to.shareToFeed,onSuccess:()=>{to.hasPro||(to.freeReels-=1),at("desktop-reels.submit-success",1)}}),function(){const e=Symbol("handled");h((async()=>{if(!to.creatingReels)return;const t=m(In);if(!t)return;if(t[e])return;t[e]=!0,t.click();const n=await l((()=>m(Fn)),{timeout:1e3,frequency:10});n&&(n.click(),t.click())}))}(),function(){const e=Symbol("handled");h((()=>{if(!to.creatingReels)return;const t=m(On);if(!t)return;if(t[e])return;t[e]=!0,t.insertAdjacentHTML("beforebegin",'\n      <div class="ShareToFeed">\n        <div class="ShareToFeed__switch">\n          <div class="ShareToFeed__switchLabel">\n            Also Share to Feed\n          </div>\n          <div class="ShareToFeed__switchControl"></div>\n        </div>\n      </div>\n    ');const n=m(".ShareToFeed");n.addEventListener("click",(()=>{to.shareToFeed=!to.shareToFeed,n.classList.toggle("ShareToFeed_on",to.shareToFeed)}))})),p`
    <style>
      .ShareToFeed {
        padding:  14px 16px 14px 17px;
        border-top: 1px solid #DBDBDB;
      }

      .ShareToFeed__noSupport {
        margin-bottom: 12px;
      }

      .ShareToFeed__noSupportTitle {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .ShareToFeed__noSupportText {
        max-width: 320px;
        color: #676767;
      }

      .ShareToFeed__switch {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        user-select: none;
      }

      .ShareToFeed__switchLabel {
        font-size: 16px;
        color: #262626;
      }

      .ShareToFeed__switchControl {
        width: 44px;
        height: 28px;
        position: relative;
        background: #8E8E8E;
        border-radius: 28px;
      }
      .ShareToFeed__switchControl::before { /* thumb */
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #FFF;
        transition: transform 0.3s;
      }
      .ShareToFeed_on .ShareToFeed__switchControl {
        background: #0095F6;
      }
      .ShareToFeed_on .ShareToFeed__switchControl::before {
        transform: translateX(16px);
      }
    </style>
  `}(),function(){if(to.hasPro)return;const e=Symbol("handled");h((()=>{if(!to.creatingReels)return;if(!m(Nn))return;const t=m($n);if(!t)return;if(t[e])return;t[e]=!0,t.insertAdjacentHTML("beforebegin",`\n      <div class="ReelsUpgradeToProBar">\n        <div class="ReelsUpgradeToProBar__text">\n          Free Reels Remaining: ${to.freeReels} / ${to.maxFreeReels}\n        </div>\n        <button class="ReelsUpgradeToProBar__button">\n          Get Unlimited Reels\n        </button>\n      </div>\n    `);m(".ReelsUpgradeToProBar__button").addEventListener("click",(()=>{at("desktop-reels.open-billing","keep-ig-tab")}))})),p`
    <style>
      .ReelsUpgradeToProBar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 8px 16px;
        border-bottom: 1px solid #ddd;
        font-size: 15px;
      }

      .ReelsUpgradeToProBar__text {
        font-size: 15px;
        margin-right: 24px;
      }

      .ReelsUpgradeToProBar__button {
        color: #0095F6;
        border: none;
        cursor: pointer;
        padding: 0;
        font-weight: 500;
        font-size: inherit;
        background: transparent;
      }
    </style>
  `}(),function(){if(to.hasPro)return;const e=Symbol("handled");h((()=>{if(to.freeReels>0)return;if(!to.creatingReels)return;const t=m(Rn);if(!t)return;if(t[e])return;t[e]=!0,t.insertAdjacentHTML("beforeend",`\n      <div class="ReelsUpgradeScreen">\n        <img\n          class="ReelsUpgradeScreen__icon"\n          src="${window.inssist.url}img/rocket.png"/>\n        <div class="ReelsUpgradeScreen__text">\n          Reels posting is a PRO feature powered by Inssist.<br/>\n          Please consider upgrading to continue posting Reels.\n        </div>\n        <button class="ReelsUpgradeScreen__button">\n          UPGRADE TO PRO\n        </button>\n      </div>\n    `);m(".ReelsUpgradeScreen__button").addEventListener("click",(()=>{at("desktop-reels.open-billing",1)}))})),p`
    <style>
      .ReelsUpgradeScreen {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ReelsUpgradeScreen__icon {
        width: 64px;
        height: 64px;
        margin-bottom: 24px;
      }

      .ReelsUpgradeScreen__text {
        font-size: 16px;
        line-height: 1.5;
        text-align: center;
        margin-bottom: 24px;
      }

      .ReelsUpgradeScreen__button {
        color: #000;
        border: none;
        background: #FFCC24;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 24px;
        cursor: pointer;
        user-select: none;
      }
    </style>
  `}(),function(){if(to.hasPro)return;const e=Symbol("handled");h((()=>{if(!to.creatingReels)return;if(to.freeReels>0)return;if(!m(".ShareToFeed"))return;const t=m(Nn);t&&(t[e]||(t[e]=!0,t.style.opacity=.5,t.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),at("desktop-reels.open-billing","keep-ig-tab")}),{capture:!0})))}))}(),function(){const e=Symbol("handled");h((()=>{if(!to.creatingReels)return;const t=m('[accept*="video/mp4"]');t&&(t[e]||(t[e]=!0,t.setAttribute("accept","video/mp4,video/quicktime")))}))}(),eo((e=>{"NAVIGATION_FEED_CREATION_CLOSE"===e.type&&(a.classList.remove("reels--creating"),to.shareToFeed=!1,to.creatingReels=!1)})),Gn.init(to)},startReelsCreationSession:function(){if(a.classList.add("reels--creating"),to.creatingReels=!0,!window.cookieStore)return;at("desktop-reels.get-initial-data"),window.cookieStore.addEventListener("change",(function e(t){const n=t.changed.find((e=>"desktop-reels.initial-data"===e.name));if(!n)return;window.cookieStore.removeEventListener("change",e);const o=JSON.parse(n.value);Object.assign(to,o)}))}};let Kn,Zn,eo;const to={shareToFeed:!1,creatingReels:!1,hasPro:!0,freeReels:0,maxFreeReels:0,isMobileSession:!1};var no={init:async function(){if(oo=await ue("nav"),io=await ue("http"),ro=await ue("store"),!oo||!io||!ro)return;p`
    <style>
      ${Bn} {
        position: absolute;
        top: 0;
      }
    </style>
  `,function(){const e=Symbol("handled");h((()=>{const t=m(Tn);t&&(t[e]||(t[e]=!0,t.insertAdjacentHTML("afterend",'\n    <div class="CreationPopup">\n      <div class="CreationPopup__option" data-id="post">\n        <svg class="CreationPopup__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n          <path\n            d="M7.164 22.654A5.17 5.17 0 012 17.49V7.164A5.17 5.17 0 017.164 2H17.49a5.17 5.17 0 015.164 5.164V17.49a5.17 5.17 0 01-5.164 5.164zm0-1.757H17.49a3.794 3.794 0 003.41-3.407V14.8l-3.68-3.661-4.394 5.934L8 14.866 3.766 17.7a3.832 3.832 0 003.398 3.2zM3.757 7.164v8.4L7.8 12.785l4.5 2.081 4.681-6.525 3.919 3.922v-5.1a3.794 3.794 0 00-3.41-3.406H7.164a3.794 3.794 0 00-3.407 3.407zm3.943.874a1.709 1.709 0 111.7 1.708 1.709 1.709 0 01-1.7-1.708z"\n            fill="currentColor"\n            stroke="#fff"\n            stroke-width=".4"\n          />\n        </svg>\n        New Post\n      </div>\n      <div class="CreationPopup__option" data-id="reel">\n        <svg class="CreationPopup__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n          <path\n            d="M15.548 14.007l-.006-.005-.006-.004-4.696-2.73s0 0 0 0a.736.736 0 00-.381-.113.73.73 0 00-.373.108c-.262.11-.407.371-.407.662v5.464c0 .262.155.511.398.658h0l.009.004a.899.899 0 00.352.098.88.88 0 00.314-.069l.063-.022.012-.004.012-.006 4.697-2.732h0l.001-.001a.743.743 0 00.357-.658c0-.259-.152-.505-.346-.65zM20.764 3.85h0l-.003-.004c-.534-.513-1.125-.945-1.943-1.247-.816-.301-1.85-.47-3.264-.47h-6.5c-1.394 0-2.417.169-3.233.476-.818.307-1.42.75-1.974 1.283h0l-.003.004C3.33 4.428 2.9 5.02 2.599 5.834c-.3.812-.469 1.837-.469 3.234v6.514c0 1.396.169 2.432.475 3.255.306.824.748 1.428 1.282 1.964l.002.002c.534.513 1.126.945 1.943 1.246.816.302 1.85.47 3.264.47h6.5c1.394 0 2.428-.168 3.249-.475.823-.307 1.425-.75 1.96-1.285l.001-.002c.513-.535.944-1.128 1.245-1.947.3-.817.469-1.853.469-3.27V9.068c0-1.397-.169-2.422-.475-3.24-.306-.819-.748-1.422-1.28-1.977zm-5.168-.2c1.31 0 2.174.166 2.788.41.612.244.985.567 1.314.896.466.468.897 1.045 1.149 2.216h-3.665L15.19 3.65h.406zm-6.948 0h4.734l1.991 3.522H10.64L8.648 3.65zM4.952 4.957c.435-.436.982-.87 2.065-1.12l1.897 3.336h-5.11c.25-1.17.682-1.748 1.148-2.216zm16.05 10.667c0 1.313-.167 2.178-.41 2.794-.243.613-.565.987-.894 1.316-.328.33-.712.652-1.33.896-.62.244-1.482.411-2.772.411H9.054c-1.31 0-2.174-.167-2.788-.411-.612-.243-.985-.566-1.314-.896a3.699 3.699 0 01-.893-1.332c-.244-.62-.41-1.486-.41-2.778v-6.93h17.353v6.93z"\n            fill="currentColor"\n            stroke="#fff"\n            stroke-width=".25"\n          />\n        </svg>\n        New Reel\n      </div>\n      <div class="CreationPopup__poweredBy">\n        Powered by INSSIST\n      </div>\n    </div>\n  '),t.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),so()}))))})),document.addEventListener("click",(()=>{so(!1)})),document.addEventListener("click",(e=>{const t=e.target.closest(".CreationPopup__option");if(!t)return;!function(e){"post"===e?ro.dispatch({type:"NAVIGATION_FEED_CREATION_OPEN"}):"reel"===e&&(Jn.startReelsCreationSession(),ro.dispatch({type:"NAVIGATION_FEED_CREATION_OPEN"}))}(t.dataset.id)}))}(),p`
    <style>
      /* show new post menu item when creation injection is ready */
      ${Cn} {
        display: flex;
      }

      .CreationPopup {
        position: absolute;
        width: 170px;
        top: calc(100% + 15px);
        padding-top: 8px;
        background: #fff;
        transform: translateX(calc(-50% + 11px));
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        transition: transform 0.3s, opacity 0.3s;
        user-select: none;
      }
      .CreationPopup:not(.CreationPopup_show) {
        pointer-events: none;
        transform: translateX(calc(-50% + 11px)) translateY(-8px);
        opacity: 0;
      }

      /* triangle  */
      .CreationPopup::before {
        content: '';
        width: 14px;
        height: 14px;
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        background: inherit;
        box-shadow: inherit;
      }

      .CreationPopup::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: inherit;
        border-radius: inherit;
      }

      .CreationPopup__option {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;
        position: relative;
        z-index: 1;
      }
      .CreationPopup__option:hover {
        background: #fafafa;
      }

      .CreationPopup__icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }

      .CreationPopup__poweredBy {
        position: relative;
        z-index: 1;
        padding-top: 3px;
        padding-bottom: 2px;
        margin-top: 8px;
        font-size: 9px;
        text-align: center;
        color: #415B72;
        background: #F7F7F9;
        border-radius: 0 0 4px 4px;
      }
    </style>
  `,function(){let e;h((()=>{const t=m(Wn);if(t)if(e){if(e!==t.src){const e=m(".PublishingTitle"),t=m(".PublishingDisclaimer");e&&e.remove(),t&&t.remove()}}else e=t.src,t.insertAdjacentHTML("afterend",'\n      <div class="PublishingTitle">\n        Publishing Post...\n      </div>\n      <div class="PublishingDisclaimer">\n        Waiting for Instagram to publish the post, this\n        might take a&nbsp;few minutes. Please keep this\n        tab open until Inssist confirms the publish is complete.\n      </div>\n    '),h((function e(){if(m(Wn))return;h.off(e);const t=m(".PublishingTitle"),n=m(".PublishingDisclaimer");t&&t.remove(),n&&n.remove()}));else e=null})),p`
    <style>
      .PublishingTitle {
        margin-top: 16px;
        margin-bottom: 16px;
        font-size: 22px;
        font-weight: 300;
        line-height: 17px;
        color: #262626;
        text-align: center;
        white-space: nowrap;
      }

      .PublishingDisclaimer {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        width: 400px;
        color: #A0A0A0;
        text-align: center;
        line-height: 1.45;
      }

      ${Un} {
        position: static;
        align-items: center;
        justify-content: center;
      }
    </style>
  `}()}};let oo,io,ro;function so(e){const t=m(".CreationPopup");t&&t.classList.toggle("CreationPopup_show",e)}var ao={init:function(){if(lo=!!window.electron,co=o.isIframe()&&o.getParams().isElectron,!lo&&!co)return;lo&&Z.on("electron-links.open-url",po);document.addEventListener("click",(e=>{const t=e.target.closest("a");if(!t)return;if("_blank"!==t.getAttribute("target"))return;const n=t.getAttribute("href");n.startsWith("/")||(e.preventDefault(),e.stopPropagation(),co?Z.send("electron-links.open-url",n):po(n))}),{capture:!0})}};let lo,co;function po(e){chrome.tabs.create({url:e,active:!0})}var uo={init:function(){Z.on("cdn-proxy.fetch",ho)}};async function ho(e){var t;if(!e)return null;let n;try{n=await fetch(e)}catch(e){}if(null===(t=n)||void 0===t?void 0:t.ok){const e=await n.blob();return URL.createObjectURL(e)}return null}const go={init:async function(){this.api=await ue("api"),this.api&&this._stripMetadataBeforeUpload()},_stripMetadataBeforeUpload:function(){const e=this.api.ruploadVideo;this.api.ruploadVideo=async(...t)=>(await(async()=>{const e=await Z.send("strip-metadata.strip",t[0].file);e&&(t[0].file=e,t[0].dataURL=URL.createObjectURL(e))})(),e.call(this.api,...t))}};function fo(){const e=[];return Object.assign(t,{handle:function(e){if("function"!=typeof e)return void console.error("function is expected");t(e)},clear:function(){e.length=0},off:function(t){const n=e.indexOf(t);-1!==n&&e.splice(n,1)},isEmpty:function(){return 0===e.length}});function t(...t){"function"==typeof t[0]?e.push(t[0]):e.forEach((e=>e(...t)))}}var mo={getState:async function(){const e=await ue("store"),t=await l((()=>e.getState()));return JSON.parse(JSON.stringify(t))},ensureElems:function(e){for(const t of Object.values(e)){if(!t)return null;if(Array.isArray(t)&&0===t.length)return null}return e},requireIgModule:ue,require:ue,docElem:document.documentElement,onDomReady:fo(),onDocClick:fo(),onPathChange:fo(),onBeforePostCreation:fo(),onBeforeStoryCreation:fo(),onMediaProcessingError:fo()};function vo(e){let t="";if(e<0&&(t="-",e=-e),e<1)return t+String(Number.isInteger(e)?e:e.toFixed(3));if(e<10)return t+String(Number.isInteger(e)?e:e.toFixed(2));if(e<100)return t+String(Number.isInteger(e)?e:e.toFixed(1));if(e<1e3)return t+String(Number.isInteger(e)?e:e.toFixed(1));const n=["k","m","b","t"];let o=null,i=null;for(let t=0;t<n.length;t++)if(e<Math.pow(1e3,t+2)){if(i=n[t],o=e/Math.pow(1e3,t+1),o=o<10?Math.round(100*o)/100:o<100?Math.round(10*o)/10:Math.round(o),o>=1e3)continue;break}return o?t+String(o)+i:t+"999t+"}let bo,yo,xo=!1,wo=!1,_o=!1,Po=!1;var So={on:function(e={}){_o=!0,void 0!==e.mouseEventsAllowed&&(Po=e.mouseEventsAllowed);if(wo)return;wo=!0,function(){const e=[window,document.documentElement],t=["ontouchstart","ontouchmove","ontouchcancel","ontouchend"];for(let n=0;n<e.length;n++)for(let o=0;o<t.length;o++)e[n]&&void 0===e[n][t[o]]&&(e[n][t[o]]=null)}(),function(){const e=350;let t=!1,n=null;const o=()=>{n=Date.now()},i=()=>{t=Date.now()-n>e},r=e=>{t&&(t=!1,To(e))};document.addEventListener("touchstart",o,!0),document.addEventListener("touchend",i,!0),document.addEventListener("click",r,!0)}(),window.addEventListener("mousedown",Ao("touchstart"),!0),window.addEventListener("mousemove",Ao("touchmove"),!0),window.addEventListener("mouseup",Ao("touchend"),!0)},off:function(){_o=!1}};function ko(e,t,n,o,i){o=o||0,i=i||0,this.identifier=t,this.target=e,this.clientX=n.clientX+o,this.clientY=n.clientY+i,this.screenX=n.screenX+o,this.screenY=n.screenY+i,this.pageX=n.pageX+o,this.pageY=n.pageY+i}function Co(){const e=[];return e.item=function(e){return this[e]||null},e.identifiedTouch=function(e){return this[e+1]||null},e}function To(e){Po||(e.preventDefault(),e.stopPropagation())}function Ao(e){return function(t){_o&&(t.target.closest("textarea")||t.target.closest("input")||t.target.closest("select")||t.target.closest("video")||To(t),1===t.which&&(("mousedown"===t.type||!yo||yo&&!yo.dispatchEvent)&&(yo=t.target),xo&&!t.shiftKey&&($o("touchend",t),xo=!1),$o(e,t),!xo&&t.shiftKey&&(xo=!0,bo={pageX:t.pageX,pageY:t.pageY,clientX:t.clientX,clientY:t.clientY,screenX:t.screenX,screenY:t.screenY},$o("touchstart",t)),"mouseup"===t.type&&(bo=null,xo=!1,yo=null)))}}function $o(e,t){const n=document.createEvent("Event");n.initEvent(e,!0,!0),n.altKey=t.altKey,n.ctrlKey=t.ctrlKey,n.metaKey=t.metaKey,n.shiftKey=t.shiftKey,n.touches=Ro(t,e),n.targetTouches=Ro(t,e),n.changedTouches=function(e,t){const n=Eo(e);!xo||"mouseup"===e.type||"touchstart"!==t&&"touchend"!==t||n.splice(0,1);return n}(t,e),yo.dispatchEvent(n)}function Eo(e){const t=new Co;if(xo){const n=75,o=bo.pageX-e.pageX,i=bo.pageY-e.pageY;t.push(new ko(yo,1,bo,-1*o-n,-1*i+n)),t.push(new ko(yo,2,bo,o+n,i-n))}else t.push(new ko(yo,1,e,0,0));return t}function Ro(e,t){if("mouseup"===e.type)return new Co;const n=Eo(e);return xo&&"mouseup"!==e.type&&"touchend"===t&&n.splice(1,1),n}var Lo={init:function(){Bo=ce.getConfig(),Mo=Bo.igSelectors,function(){const e=XMLHttpRequest.prototype.open,t=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(t,n){return this.method=t,this.url=n,this.addEventListener("readystatechange",(()=>{if(429!==this.status)return;const[e,t]=n.split("?"),o=(t||"").split("&"),i=o.indexOf("__a=1");-1!==i&&(o.splice(i,1),location.href=`${e}?${o.join("&")}`)})),e.apply(this,arguments)},XMLHttpRequest.prototype.send=function(e){return"POST"===this.method&&"/create/configure/"===this.url&&(e=function(e,t){if(!e||0===e.length)return e;let n=e.split("&");return n=n.map((e=>{if(0!==e.indexOf("caption="))return e;let n="";return e.split("%23").forEach(((e,o)=>{n+=0===o?e:o<=t?"%23"+e:e})),n})),n.join("&")}(e,30)),t.call(this,e)}}(),p`
    <style>
      * {
        outline: none;
      }

      ${Mo.general.main} {
        margin-bottom: 0;
      }

      ${Mo.general.mainContent} {
        margin-bottom: 0;
      }

      ${Mo.general.contentSection} {
        background: #fff;
      }

      ${Mo.general.nextPageLoaderFeed} {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      ${Mo.general.nextPageLoaderProfile},
      ${Mo.general.nextPageLoaderExplore} {
        margin-top: 30px;
        margin-bottom: 30px;
      }

      ${Mo.general.settingsRectangle} {
        margin-top: 25px;
      }

      ${Mo.general.bottomNotification} {
        left: 8px;
        right: 8px;
        margin-bottom: 66px;
        border-radius: 4px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      }
      ${Mo.general.bottomNotification} * {
        color: #333;
        background: #FFF;
      }

      ${Mo.dragPanel.root} {
        user-select: none;
      }

      ${Mo.commentsPage.body} {
        min-height: auto;
      }

      ${Mo.commentsPage.footer} {
        height: 0;
      }

      ${Mo.commentsPage.comment} {
        user-select: initial;
      }

      ${Mo.commentsPage.lastListItem} {
        margin-bottom: 60px;
      }

      ${Mo.general.expandVideoButton} {
        display: none;
      }

      ${Mo.general.continueWatchingOverlay} {
        display: none;
      }

      ${Mo.general.modalWindow} {
        max-width: 400px;
      }

      ${Mo.general.uploadPanelVideoIcon} {
        left: 6px;
      }

      /* instagram hides default (black) icon on action button hover (like/comment/share)
         and shows gray icon, we alter this logic and always show black icon */
      ${Mo.feedPage.postActionIconDefault} {
        display: block;
      }
      ${Mo.feedPage.postActionIconHovered} {
        display: none;
      }

      ${Mo.feedPage.body} {
        background: #fff;
        /* disable annoying instagram's story bar loading transition */
        transform: none;
      }

      ${Mo.feedPage.loadMoreSpinner} {
        margin-bottom: -30px;
      }

      ${Mo.explorePage.header} {
        background: transparent;
      }

      /* expand hitbox for the tab bar links */
      ${Mo.general.tabBarLink} {
        width: 100%;
      }

      ${Mo.profilePage.toggleSuggestionsButton} {
        display: none;
      }

      ${Mo.postPage.postHeader},
      ${Mo.postPage.postFooter} {
        background: #fff;
      }

      ${Mo.general.storiesBarLoadingPanel} {
        display: none;
      }

      ${Mo.general.createStoryHeaderButton} {
        cursor: pointer;
        position: relative;
      }
      ${Mo.general.createStoryHeaderButton}::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
      }

      ${Mo.postCreation.closeButton} {
        transform: scale(0.8);
        position: relative;
        cursor: pointer;
      }
      ${Mo.postCreation.closeButton}::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
      }

      ${Mo.general.uploadPanelText} {
        display: block;
      }

      ${Mo.feedPage.postBody} {
        background: #fff;
      }

      ${Mo.general.toastMessage} {
        margin-bottom: 60px;
      }

      ${Mo.profilePage.tab} {
        color: #8e8e8e;
      }

      ${Mo.profilePage.activeTab} {
        color: #262626;
      }
    </style>
  `,p`
    <style>
      .theme-night {
        background: #fff !important;
      }

      .theme-night [aria-label*="Carousel"],              /* user page post type carousel */
      .theme-night [aria-label*="Video"],                 /* user page post type video */
      .theme-night [aria-label*="IGTV"],                  /* user page post type igtv */
      .theme-night .mediaActions,                         /* post download and go to actions */
      .theme-night div._5cOAs,                            /* igtv video card */
      .theme-night canvas,                                /* new story and post filter canvases */
      .theme-night div.rMz8x,                             /* new story marker controls */
      .theme-night div.C3Vzn,                             /* new story text controls */
      .theme-night button.videoSpritePlayButton,          /* new story play video button */
      .theme-night div#react-root > section > header,     /* new story header */
      .theme-night span.videoSpritePlayButton,            /* post like animation image */
      .theme-night div.coreSpriteRightChevron,            /* carousel post next button */
      .theme-night div.coreSpriteLeftChevron,             /* carousel post previous button */
      .theme-night li.-V_eO,                              /* igtv hover plays and comments count */
      .theme-night header.kj03O div._6ZEdQ,               /* story view header paginator */
      .theme-night header.kj03O div._g3zU,                /* story view header buttons */
      .theme-night header.kj03O a.notranslate,            /* story view header username */
      .theme-night footer.mLi3m,                          /* story view footer */
      .theme-night header.iuGAs,                          /* new story header */
      .theme-night footer._Z29A,                          /* new story footer */
      .theme-night div.m1lpM {                            /* new story marker controls */
        -webkit-filter: url(#theme-reverse-filter) !important;
        filter: url(#theme-reverse-filter) !important;
      }
      .theme-night div.RnEpo.Yx5HN,
      .theme-night div.cDEf6 {                            /* new post edit caption overlay */
        background-color: rgba(255, 255, 255, 0.65) !important;
      }
      .theme-night div.RnEpo.xpORG._9Mt7n {               /* new story stickers overlay */
        background-color: rgba(255, 255, 255, 0.3) !important;
      }
      .theme-night [role="dialog"]:not(.xr65t),           /* remove post dialog (but not story dialog) */
      .theme-night section.IyyUN,                         /* story view background */
      .theme-night div#react-root > section >             /* new story video background */
        div[role="button"][tabindex="0"] {
        background-color: white !important;
      }
      .theme-night header.kj03O {                         /* story view header */
        background: linear-gradient(to bottom,white,transparent) !important;
      }
      .theme-night h1 > a > img {                         /* instagram logo */
        filter: brightness(3) !important;
      }
      .theme-night .y3zKF:not(.yWX7d) {                   /* follow activity buttons */
        color: black !important;
      }
      .theme-night footer.mLi3m img._6q-tv {              /* story footer user avatars */
        filter: brightness(1) !important;
      }


      /* dm badge counter */
      .theme-night .TKi86 {
        filter: url(#theme-reverse-filter);
      }

      /* activity badge counter */
      .theme-night .nHGTw .WKY0a {
        filter: url(#theme-reverse-filter);
      }

      /* activity badge icon */
      .theme-night .nHGTw [class^="glyphsSprite"] {
        filter: url(#theme-reverse-filter);
      }

      /* "follow" button */
      .theme-night .jIbKX {
        color: #000 !important;
      }

      /* dropdown icon */
      .theme-night .coreSpriteDropdownArrowWhite {
        filter: url(#theme-reverse-filter);
      }

      /* modal window */
      .theme-night .RnEpo [role="dialog"] {
        box-shadow: 0 0px 12px rgba(0, 0, 0, 0.1) !important;
      }

      /* media type icons in profile grid */
      .theme-night .u7YqG svg {
        filter: url(#theme-reverse-filter);
      }

      /* explore post type icon */
      .theme-night .BcNgP svg {
        filter: url(#theme-reverse-filter);
      }

      /* story creator's contenteditable */
      .theme-night .m1lpM [contenteditable] {
        filter: none !important;
        color: #FFF !important;
      }

      .theme-night ${Mo.general.storyQuickReactionsBackground} {
        background: linear-gradient(to bottom, transparent, #000);
      }

      .theme-night ${Mo.general.storyFooter} textarea {
        filter: none !important;
      }

      .theme-night ${Mo.general.storyFooter} .emoji {
        filter: none !important;
      }

      .theme-night ${Mo.general.tabBarTopWrap} {
        background: #FFF !important;
      }

      .theme-night ${Mo.general.postVideoContainer} {
        background: #fff;
      }

      .theme-night ${Mo.profilePage.reelPreviewStats} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${Mo.profilePage.postVideoIcon} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${Mo.profilePage.postVideoOverlay} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night video {
        background: #000;
      }


      /* --- for bundle v2 --- */

      .theme-night ${Mo.storyViewer.root},
      .theme-night ${Mo.general.carouselNavButton},
      .theme-night ${Mo.profilePage.reelIcon},
      .theme-night ${Mo.storyCreation.root} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${Mo.storyViewer.avatar},
      .theme-night ${Mo.storyViewer.image},
      .theme-night ${Mo.storyViewer.video},
      .theme-night ${Mo.storyViewer.videoPoster},
      .theme-night ${Mo.storyCreation.canvas},
      .theme-night ${Mo.storyCreation.mentionReelItemAvatar},
      .theme-night ${Mo.storyCreation.video} {
        filter: none;
      }

      .theme-night ${Mo.general.blueButton},
      .theme-night ${Mo.storyCreation.textInput} {
        color: #000;
      }

      .theme-night ${Mo.explorePage.searchInputPlaceholder} {
        opacity: 0;
      }

      .theme-night ${Mo.storyCreation.uploadHeader} {
        filter: url(#theme-filter);
      }

      .theme-night ${Mo.general.postCaption} {
        filter: url(#theme-reverse-filter);
        color: #C6C6C6;
      }

      .theme-night ${Mo.general.postCaptionLink} {
        color: #7FB5E3;
      }

      .theme-night ${Mo.postCreation.videoPlayButton} {
        filter: url(#theme-reverse-filter);
      }
    </style>
  `,p`
    <style>
      ${Mo["general_use-application-bar"]} {
        display: none !important;
      }

      ${Mo.general.useAppGradientBar} {
        display: none !important;
      }
    </style>
  `,function(){const e=Symbol("handled");h((()=>{const t=m(Mo.dragPanel.igIcon);if(!t)return;if(t[e])return;t[e]=!0;v("button",m(Mo.dragPanel.root)).pop().click()}))}(),p`
    <style>
      ::-webkit-scrollbar {
        display: none;
      }
    </style>
  `,async function(){const e=(t,n)=>{0!==t?requestAnimationFrame((()=>{e(t-1,n)})):n()};await r(),e(5,(()=>{mo.docElem.scrollTop=0}))}(),p`
    <style>
      /* spinners for profile tabs */
      ._2z6nI > .jmJva,
      ._2z6nI > .vlh0C {
        margin-bottom: 100vh;
      }
    </style>
  `,p`
    <style>
      /* header top-left button */
      ${Mo["header-top-level-button"]} button {
        cursor: pointer;
      }

      /* hitbox for header top-left button */
      ${Mo["header-top-level-button"]} a,
      ${Mo["header-top-level-button"]} button {
        position: relative;
      }
      ${Mo["header-top-level-button"]} a::before,
      ${Mo["header-top-level-button"]} button::before {
        content: '';
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
      }

      ${Mo.general.tabBarCreatePostButton} {
        cursor: pointer;
      }
    </style>
  `,p`
    <style>
      /* text of "your story" button */
      ${Mo["your-story-button-text"]} {
        width: 64px;
      }
    </style>
  `,p`
    <style>
      ${Mo["profile-send-message-button"]} {
        white-space: nowrap;
        overflow: hidden;
      }
    </style>
  `,function(){const e="_enhanceProfileStats_",t=e=>{e.forEach((e=>{e.style.height=""}));const t=Array.from(e).map((e=>e.offsetHeight)),n=Math.max(...t);e.forEach((e=>{e.style.height=`${n}px`}))};h((()=>{const n=mo.ensureElems({statContainers:v(Mo["profile-page-stat-container"]),statItems:v(Mo["profile-page-stat-item"])});mo.docElem.classList.toggle("enhance-stats",!!n),n&&(n.statItems[0][e]||(n.statItems[0][e]=!0,n.statItems.forEach((e=>{e.innerHTML=e.innerHTML.replace("(","").replace(")",""),e.firstChild.nodeType===Node.TEXT_NODE&&e.appendChild(e.firstChild);const t=e.lastChild;t.textContent=t.textContent.toLowerCase().replace(":","")})),t(n.statContainers)))})),window.addEventListener("resize",(()=>{const e=v(Mo["profile-page-stat-container"]);t(e)})),p`
    <style>
      /* stat container */
      .enhance-stats .LH36I {
        padding: 0 6px;
      }

      /* stat item */
      .enhance-stats ._81NM2 {
        hyphens: auto;
      }
    </style>
  `}(),h((()=>{const e=mo.ensureElems({commentForm:m(Mo["comment-form"]),avatar:m(Mo["comment-form-avatar"]),form:m(Mo["comment-form-form"]),textarea:m(Mo["comment-form-textarea"]),submit:m(Mo["comment-form-submit-button"])});mo.docElem.classList.toggle("enhance-comment-form",!!e)})),p`
    <style>
      /* comment form */
      .enhance-comment-form ${Mo["comment-form"]} {
        align-items: flex-start !important;
      }

      /* avatar */
      .enhance-comment-form ${Mo["comment-form-avatar"]} {
        top: 5px;
      }

      /* form */
      .enhance-comment-form ${Mo["comment-form-form"]} {
        padding: 0;
        border-radius: 11px;
        margin-bottom: 30px;
        position: relative;
      }

      /* textarea */
      .enhance-comment-form ${Mo["comment-form-textarea"]} {
        padding: 12px 16px;
        max-height: 50vh;
        min-height: 42px;
        box-sizing: border-box;
      }

      /* submit */
      .enhance-comment-form ${Mo["comment-form-submit-button"]} {
        position: absolute;
        top: 100%;
        margin-top: 10px;
      }
    </style>
  `,p`
    <style>
      ${Mo["profile-page-grid-stretch-element"]} {
        display: none;
      }
    </style>
  `,h((()=>{m(Mo.dragPanel.handle)?So.on({mouseEventsAllowed:!0}):location.pathname.startsWith("/create/")?So.on({mouseEventsAllowed:!1}):!location.pathname.startsWith("/stories/")||location.pathname.startsWith("/stories/direct/")?So.off():So.on({mouseEventsAllowed:!1})})),function(){const e=150;let t=null,n=!0;const o=async()=>{const o=v(Mo["post-video"]);if(0===o.length)return;const i=o.find((t=>{const n=t.getBoundingClientRect();return n.left>=0&&n.left+n.width<=window.innerWidth&&n.top>-1*e&&n.top+n.height<window.innerHeight+e}));i?t&&i===t||(t&&t.pause(),t=i,n&&(i.muted=!0),await i.play(),i.addEventListener("volumechange",(()=>{n=!1}))):t&&(t.pause(),t=null)};h(o),window.addEventListener("scroll",o)}(),function(){const e=Array.prototype.some;Array.prototype.some=function(...t){let n;return n=2===this.length&&"instagram.com"===this[0]&&"facebook.com"===this[1]?["instagram.com"]:this,e.call(n,...t)}}(),p`
    <style>
      ${Mo["post-tagged-people-button"]} {
        top: 0 !important;
        bottom: auto !important;
      }
    </style>
  `,h((e=>{e.forEach((e=>{e.removedNodes.forEach((e=>{e.nodeType===HTMLElement.ELEMENT_NODE&&("VIDEO"===e.tagName?[e]:e.querySelectorAll("video")).forEach((e=>{e.src="",e.load()}))}))}))})),p`
    <style>
      video::-webkit-media-controls-fullscreen-button {
        display: none;
      }
    </style>
  `,function(){const e="__disablePictureInPictureForVideos",t=t=>{t[e]||(t[e]=!0,t.disablePictureInPicture=!0)};h((()=>{const e=v("video");e.length&&e.forEach(t)}))}(),function(){const e="__managePostVideoClickAndDoubleClick",t=t=>{if(t[e])return;let n;t[e]=!0,t.addEventListener("click",(e=>{if(e.preventDefault(),n)return clearTimeout(n),n=null,Z.send("ig.media-fullscreen-enter",{url:t.src,currentTime:t.currentTime,volume:t.volume,muted:t.muted,paused:t.paused}),void t.pause();n=setTimeout((()=>{n=null,t.paused?t.play():t.pause()}),200)}))};h((()=>{const e=v(Mo["post-video"]);e.length&&e.forEach(t)}))}(),function(){const e="__manageNativeControlsForPostVideos",t=t=>{t[e]||(t[e]=!0,t.setAttribute("controls",""),t.setAttribute("controlslist","nodownload"),t.setAttribute("preload","auto"))};h((()=>{const e=v(Mo["post-video"]);e.length&&e.forEach(t)})),p`
    <style>
      ${Mo["post-video"]} {
        cursor: pointer;
      }

      ${Mo["post-video-poster"]},
      ${Mo["post-video-overlay-play"]},
      ${Mo["post-video-overlay-control"]} {
        display: none;
      }

      /* tricky way to move volume control */
      @media (min-width: 450px) {
        ${Mo["post-video"]}::-webkit-media-controls-panel {
          padding-right: 86px;
        }
        ${Mo["post-video"]}::-webkit-media-controls-timeline {
          margin-right: -86px;
        }
      }
    </style>
  `}(),function(){const e="__syncVolumeAcrossPostVideos";let t,n,o=[];const i=i=>{i[e]||(i[e]=!0,void 0===t?(t=i.volume,n=i.muted):(i.volume=t,i.muted=n),i.addEventListener("volumechange",(()=>{o.forEach((e=>{e.volume=i.volume,e.muted=i.muted})),t=i.volume,n=i.muted})))};h((()=>{o=v(Mo["post-video"]),o.forEach(i)}))}(),p`
    <style>
      video::-webkit-media-controls-panel {
        transition: all 0.25s linear;
      }
    </style>
  `,p`
    <style>
      /* expand timeline hitbox at top */
      video::-webkit-media-controls-timeline {
        margin-top: -5px;
        padding-top: 5px;
      }
    </style>
  `,function(){const e=Symbol();h((()=>{const t=m(Mo.postCreation.captionTextarea);if(!t)return;if(t[e])return;t[e]=!0;const n=getComputedStyle(t),o=Number(n.paddingTop.replace("px","")),i=Number(n.paddingBottom.replace("px",""));t.addEventListener("input",(()=>{t.style.height=null;const e=t.scrollHeight-o-i;t.style.height=`${e}px`}))})),p`
    <style>
      ${Mo.postCreation.mentionsOverlay} {
        top: 225px !important;
      }

      ${Mo.postCreation.captionContainer} {
        height: fit-content !important;
      }

      ${Mo.postCreation.captionTextarea} {
        min-height: 144px !important;
        max-height: 288px !important;
      }
    </style>
  `}(),p`
    <style>
      ${Mo["new-post_tag-people-image-container"]} {
        width: 100%;
      }

      ${Mo["new-post_tag-people-image-container"]} img {
        width: 100%;
      }
    </style>
  `,p`
    <style>
      @media ${["(max-height: 622px)","(min-height: 624px)","(max-width: 313px)","(min-width: 315px)"].join(",")} {
        ${Mo.general.tabBarWrap} {
          height: 58px !important;
        }

        ${Mo.general.tabBar} {
          height: 58px !important;
        }
      }
    </style>
  `,async function(){if(await ft())return;const e=await l((()=>document.body));if(!e)return;e.insertAdjacentHTML("beforeend",`\n    <div class="navigation-spinner">\n      ${We()}\n    </div>\n  `),p`
    <style>
      #react-root:not(:empty) ~ .navigation-spinner,
      body > div[id*="mount"] ~ .navigation-spinner,
      .dialog-404 .navigation-spinner {
        display: none;
      }

      .navigation-spinner {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 32px;
        height: 32px;
        margin-left: -16px;
        margin-top: -16px;
        pointer-events: none;
        z-index: 0;
      }
    </style>
  `}(),p`
    <style>
      ${Mo.general.modal} {
        background: rgba(255, 255, 255, 0.96) !important;
      }

      ${Mo.general.modalWindow} {
        justify-content: flex-start;
        box-shadow: 0 5px 27px rgba(0, 0, 0, 0.13);
        background: #FFF;
      }

      ${Mo.general.modalWindowHashtagContent} {
        margin-top: 6px;
      }
    </style>
  `,function(){let e;h((()=>{const t=location.pathname+location.search;t!==e&&(Z.send("ig.url-change",t),e=t)}))}(),function(){const e=Symbol("handled");h((()=>{const t=m(Mo.general.storiesBar);t&&(t[e]||(t[e]=!0,qt.init(t)))}))}(),p`
    <style>
      ${Mo.profilePage.tab}:empty {
        display: none;
      }
    </style>
  `,p`
    <style>
      ${Mo.general.modalWindow} {
        overflow: scroll;
        border-radius: 8px;
      }
    </style>
  `,function(){const e=Symbol("handled");h((()=>{const t=m(Mo.postCreation.nextButton);t&&(t[e]||(t[e]=!0,t.addEventListener("click",(()=>{const e=Dt.create({show:!0});mo.onPathChange((function t(){mo.onPathChange.off(t),e.remove()}))}),{once:!0})))}))}(),p`
    <style>
      ${Mo.general.blueLinkButton} {
        cursor: pointer;
        position: relative;
      }

      ${Mo.general.blueLinkButton}::before {
        content: '';
        position: absolute;
        top: -7px;
        left: -7px;
        right: -7px;
        bottom: -7px;
      }
    </style>
  `,p`
    <style>
      ${Mo.profilePage.postRow} {
        margin-bottom: 2px;
      }

      ${Mo.profilePage.postContainer} {
        margin-right: 2px;
      }

      ${Mo.profilePage.reelRow} {
        margin-bottom: 2px;
      }

      ${Mo.profilePage.reelContainer} {
        margin-right: 2px;
      }
    </style>
  `,p`
    <style>
      ${Mo.general.actionSheet} {
        width: 96% !important;
      }
    </style>
  `,function(){const e=Symbol("handled");h((()=>{const t=m(Mo.postCreation.filtersReel);t&&(t[e]||(t[e]=!0,qt.init(t)))}))}(),p`
    <style>
      ${Mo.authScreen.username} {
        margin-right: 24px;
      }

      /* hide alt text of missing avatar */
      ${Mo.authScreen.avatar} {
        color: transparent;
        overflow: hidden;
      }

      ${Mo.authScreen.footer} {
        display: none;
      }

      ${Mo.authScreen.fromFacebookBar} {
        display: none;
      }

      @media (max-width: 400px) {
        ${Mo.authScreen.loginContainer} {
          padding-left: 20px;
          padding-right: 20px;
        }

        ${Mo.authScreen.loginContainerParagraph} {
          text-align: center;
        }

        ${Mo.authScreen.loginFormParagraph} {
          text-align: center;
          padding-left: 20px;
          padding-right: 20px;
        }
      }
    </style>
  `,p`
    <style>
      ${Mo.loginBar.root} {
        top: 6px !important;
        padding: 8px;
        border-radius: 5px;
        max-width: 400px;
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.18);
      }

      ${Mo.loginBar.content} {
        height: 100%;
        align-items: center;
      }

      ${Mo.loginBar.openAppButton} {
        display: none !important;
      }

      @media (max-width: 500px) {
        ${Mo.loginBar.root} {
          top: 0 !important;
          padding: 8px;
          border-radius: 0;
          max-width: 100%;
          box-shadow: none;
        }
      }
    </style>
  `,function(){const e=Symbol("handled");h((()=>{if(!!m('[data-page="StoriesPage"]'))return;v("img[srcset]").forEach((t=>{if(t[e])return;t[e]=!0;t.getAttribute("srcset").endsWith("w")&&t.removeAttribute("srcset")}))}))}(),function(){let e=null;h((()=>{e=m(Mo.commentsPage.scrollContainer)})),Z.on("ig.broadcast-scroll",(t=>{e&&(e.scrollTop+=t)}))}(),function(){const e=window.IntersectionObserver;if(!e)return;const t=Symbol("handled");h((()=>{const n=m(Mo.commentsPage.showMoreButton);if(!n)return;if(n[t])return;n[t]=!0;const o=m(Mo.commentsPage.scrollContainer);if(!o)return;const i=new e((e=>{e[0].isIntersecting&&(document.body.contains(n)&&n.click(),setTimeout((()=>i.disconnect())))}),{root:o,rootMargin:"200px",threshold:0});i.observe(n)}))}(),async function(){const e=await ue("store");if(!e)return;const t='\n    <svg width="24" height="24" viewBox="0 0 48 48">\n      <path fill="currentColor" d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"/>\n    </svg>\n  ',n='\n    <svg width="24" height="24" viewBox="0 0 24 24">\n      <path fill="currentColor" stroke="currentColor" d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" stroke-linejoin="round" stroke-width="2"/>\n    </svg>\n  ',o=Symbol("handled");h((()=>{let i;if(i=v(Mo.profilePage.post),i=i.filter((e=>!e[o])),0===i.length)return;const r=e.getState(),s=Object.values(r.posts.byId.toJS());i.forEach((e=>{e[o]=!0;const i=e.getAttribute("href").split("/")[2];if(!i)return;const r=s.find((e=>e.code===i));if(!r)return;const a=-1===r.numPreviewLikes?null:vo(r.numPreviewLikes||0),l=vo(r.numComments||0);e.insertAdjacentHTML("beforeend",`\n        <div class="post-stats">\n          ${null===a?"":`\n            <div class="post-stats__stat">\n              <div class="post-stats__icon">${t}</div>\n              <div class="post-stats__count">${a}</div>\n            </div>\n          `}\n          <div class="post-stats__stat">\n            <div class="post-stats__icon">${n}</div>\n            <div class="post-stats__count">${l}</div>\n          </div>\n        </div>\n      `)}))})),p`
    <style>
      .post-stats {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 5px 10px;
        pointer-events: none;
        transition: opacity 0.1s;
      }
      ${Mo.profilePage.post}:not(:hover) .post-stats {
        opacity: 0;
      }
      .theme-night .post-stats {
        filter: url(#theme-reverse-filter);
      }

      .post-stats::before {
        content: '';
        opacity: 0.5;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          to top,
          hsl(0, 0%, 0%) 0%,
          hsla(0, 0%, 0%, 0.738) 19%,
          hsla(0, 0%, 0%, 0.541) 34%,
          hsla(0, 0%, 0%, 0.382) 47%,
          hsla(0, 0%, 0%, 0.278) 56.5%,
          hsla(0, 0%, 0%, 0.194) 65%,
          hsla(0, 0%, 0%, 0.126) 73%,
          hsla(0, 0%, 0%, 0.075) 80.2%,
          hsla(0, 0%, 0%, 0.042) 86.1%,
          hsla(0, 0%, 0%, 0.021) 91%,
          hsla(0, 0%, 0%, 0.008) 95.2%,
          hsla(0, 0%, 0%, 0.002) 98.2%,
          hsla(0, 0%, 0%, 0) 100%
        );
      }

      .post-stats__stat {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 12px;
      }
      .post-stats__stat:first-child {
        margin-left: 0;
      }

      .post-stats__icon {
        margin-right: 4px;
        transform: scale(0.6);
        color: #fff;
      }

      .post-stats__count {
        color: #FFF;
        font-weight: 600;
        font-size: 12px;
      }

      @media (max-width: 500px) {
        .post-stats {
          padding: 2px 8px;
        }

        .post-stats::before {
          opacity: 0.4;
          top: -100%;
          background: #000;
        }

        .post-stats__stat {
          margin-left: 6px;
        }

        .post-stats__icon {
          top: 0.5px;
          margin-right: 1px;
          transform: scale(0.6);
        }

        .post-stats__count {
          font-size: 10px;
        }
      }
    </style>
  `}(),async function(){const e=await ue("store");if(!e)return;const t=()=>{var t;const n=null===(t=e.getState().navigation)||void 0===t?void 0:t.pageIdentifier;n&&document.documentElement.setAttribute("data-page",n)};t(),e.subscribe(t)}(),p`
    <style>
      ${Mo.postCreation.previewContainer} {
        width: 110px !important;
        height: 110px !important;
      }
      html.reels--creating-reels ${Mo.postCreation.previewContainer} {
        width: 62px !important;
      }

      ${Mo.postCreation.rowButton} {
        cursor: pointer;
      }

      @media (max-width: 440px) {
        ${Mo.postCreation.previewContainer} {
          width: 60px !important;
          height: 60px !important;
        }
        .reels--creating-reels ${Mo.postCreation.previewContainer} {
          width: 45px !important;
          min-width: 45px !important;
          height: 80px !important;
        }
      }

      ${Mo.postCreation.previewPostImage} {
        border-radius: 4px;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover;
        object-position: center;
      }

      /* fix story media being cutted */
      ${Mo.storyViewer.mediaContainer} {
        width: 100%;
        height: 100%;
        background-color: #000;
      }

      ${Mo.storyViewer.videoPoster} {
        object-fit: contain;
      }
    </style>
  `,async function(){document.addEventListener("click",(async e=>{const t=e.target.closest(Mo.general.iconButton);if(!t)return;if(!!!m(Mo.general.planeIcon,t))return;const n=t.closest(Mo.general.post);if(!n)return;const o=m(Mo.general.postThreeDotsButton,n);if(!o)return;e.preventDefault(),e.stopPropagation();const i=new Promise((e=>{h((function t(){m(Mo.general.actionDialog)&&(setTimeout((()=>{h.off(t)})),e())}))}));o.click(),await i;const r=v(Mo.general.actionDialogItem).find((e=>e.innerText.toLowerCase().includes("share")||e.innerText.endsWith("...")||e.innerText.endsWith("…")));r&&r.click()}),!0)}(),async function(){const e=await ue("store");if(!e)return;let t=null;h((()=>{const n=m(Mo.postCreation.expandImageButton);if(!n)return;const o=e.getState().creation.sessionId;o!==t&&(t=o,n.click())}))}(),async function(){const e=(e,t)=>window.innerWidth>320?Math.min(125,t/e*100):Math.min(180,t/e*100);Object.defineProperty(Object.prototype,"getHeightPercent",{get:function(){return({width:t,height:n})=>e(t,n)},set:function(){return!0}}),Object.defineProperty(Object.prototype,"getWrapperHeightStyle",{get:function(){return(t,n)=>({paddingBottom:`calc(${e(n,t)}% - 1px)`})},set:function(){return!0}}),p`
    <style>
      ${Mo.postCreation.video} {
        width: 100%;
        height: 100%;
        background-color: #000;
      }

      ${Mo.postCreation.videoPoster} {
        object-fit: contain;
      }
    </style>
  `}(),p`
    <style>
      ${Mo.postCreation.captionContainer} {
        flex-direction: row-reverse !important;
      }

      ${Mo.postCreation.captionTextarea} {
        margin-left: 8px;
      }

      ${Mo.postCreation.userAvatar} {
        display: none;
      }

      ${Mo.postCreation.mentionsOverlay} {
        background: transparent !important;
      }

      ${Mo.postCreation.tagPeopleButton} {
        padding: 20px;
        cursor: pointer;
        background: transparent;
        border: none;
      }
    </style>
  `,function(){const e=Symbol("handled");h((async()=>{const t=m(Mo.profilePage.avatarStoryRing);if(!t)return;if(t[e])return;t[e]=!0;const n=t.getContext("2d"),o=await l((()=>{if(!document.body.contains(t))return null;const e=n.getImageData(0,0,t.width,t.height).data;for(let t=0;t<e.length;t+=4){const n=[e[t],e[t+1],e[t+2]];if(!(0===n[0]&&0===n[1]&&0===n[2]))return n}return null}),{timeout:5e3});if(!o)return;const i=o[0]===o[1]&&o[0]===o[2];t.insertAdjacentHTML("beforebegin",`<div class="avatar-story-ring ${i?"avatar-story-ring_viewed":""}"></div>`)})),p`
    <style>
      ${Mo.profilePage.avatarStoryRing} {
        opacity: 0;
      }

      .avatar-story-ring {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 50%;
        background: linear-gradient(45deg, #F99D4C, #DD326F, #C42E90);
      }
      .avatar-story-ring_viewed {
        background: #dbdbdb;
      }

      .avatar-story-ring::before {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        right: 3px;
        bottom: 3px;
        background: #FFF;
        border-radius: 50%;
      }
    </style>
  `}(),h((()=>{const e=m(Mo.general.cookieModalContent);if(!e)return;const t=e.closest(Mo.general.modal);t&&t.remove()})),function(){const e=Symbol("handled");h((()=>{const t=m(Mo["highlights-container"]);t&&(t[e]||(t[e]=!0,qt.init(t)))}))}(),window.addEventListener("click",(e=>{if("v2"!==window.inssist.igBundleVersion)return;if(!e.metaKey&&!e.ctrlKey)return;const t=e.target.closest("a[href]");t&&t.href&&(e.preventDefault(),e.stopPropagation(),window.open(t.href))}),!0),async function(){const e=await ue("nav");if(!e)return;const t=/\/reel\/[\w-]+\//;window.addEventListener("click",(n=>{if("v2"!==window.inssist.igBundleVersion)return;const o=n.target.closest("a[href]");if(!o)return;const i=o.getAttribute("href")||"";t.test(i)&&(n.preventDefault(),n.stopPropagation(),e.push(i))}),!0)}(),function(){const e=new Map,t=[Mo.general.tabBarAvatarContainer,Mo.general.storyTrayViewerAvatarContainer];h((()=>{for(const n of t){const t=m(n);t&&(t.innerHTML&&!e.has(n)?e.set(n,t.innerHTML):!t.innerHTML&&e.has(n)&&(t.innerHTML=e.get(n)))}}))}(),function(){const e=Symbol(),n="inssist.exceptionDialogClosedAt";h((()=>{const o=m(Mo.general.exceptionDialogOkButton);if(!o)return;if(o[e])return;o[e]=!0;const i=t.get(n)||0;if(i&&Date.now()-i<6e4)return;t.set(n,Date.now());const r=o.closest(Mo.general.dialogRoot);r&&(r.style.display="none")}))}(),function(){const e="inssist.errorPageReloadedAt";h((()=>{if(!m(Mo.general.errorPageContent))return;const n=t.get(e)||0;n&&Date.now()-n<6e4||(t.set(e,Date.now()),location.reload())}))}(),p`
    <style>
      .clickable {
        cursor: pointer;
        transition: filter 300ms;
      }
      .clickable:hover {
        filter: brightness(110%);
      }
      .clickable:active {
        filter: brightness(90%);
      }
    </style>
  `,p`
    <style>
      .info-circle {
        width: 12px;
        height: 12px;
        color: #FFF;
        background: #1BA2F9;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        position: relative;
        font-size: 9px;
        font-weight: 700;
        font-family: Montserrat !important;
      }
      .info-circle::before { /* hitbox */
        content: '';
        position: absolute;
        top: -7px;
        left: -7px;
        right: -7px;
        bottom: -7px;
      }
      .theme-night .info-circle {
        filter: url(#theme-reverse-filter);
        background: #33ABF8;
      }
    </style>
  `,p`
    <style>
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.96);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }

      .modal__window {
        width: 290px;
        padding: 16px 20px;
        background: #FFF;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        font-size: 14px;
        line-height: 20px;
        border-radius: 12px;
      }

      .modal__title {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 600;
      }

      .modal__content {
        margin-top: 12px;
        display: block;
        color: #3F3E3F;
      }
      .modal__content b {
        font-weight: 600;
      }
      .modal__content a {
        color: #1BA2F9 !important;
      }
      .theme-nigh .modal__content a {
        filter: url(#theme-reverse-filter);
        color: #33ABF8 !important;
      }
      .modal__content ul {
        list-style: disc;
        padding: 8px 0 8px 24px;
        margin: 0;
      }
    </style>
  `,p`
    <style>
      .button {
        color: #FFF;
        background: #1BA2F9;
        border: none;
        margin-right: 12px;
        cursor: pointer;
        padding: 5px 12px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 4px;
        font-weight: 600;
      }
      .button:last-child {
        margin-right: 0;
      }
      .button:disabled {
        opacity: 0.5;
        pointer-events: none;
      }
      .button_cancel {
        color: #262626;
        border: 1px solid #DBDBDB;
        background: transparent;
      }
      .theme-night .button:not(.button_cancel) {
        filter: url(#theme-reverse-filter);
        background: #33ABF8;
      }
    </style>
  `}};let Mo,Bo;var Io={init:function(){document.addEventListener("click",(e=>{mo.onDocClick(e)}),!0),function(){let e=location.pathname;mo.onPathChange(e),h((()=>{const t=location.pathname;e!==t&&(mo.onPathChange(t),e=t)}))}()}};var Fo={init:function(){Z.on("ig.publish-story",Do)}};async function Do({imageUrl:e,mentions:t=[]}){const n=await ue("http"),o=await async function(e){const t=await fetch(e),n=await t.blob();return await async function(e){return new Promise(((t,n)=>{const o=new FileReader;o.onerror=()=>{n()},o.onload=()=>{t(o.result)},o.readAsDataURL(e)}))}(n)}(e),i=document.createElement("img");i.src=o,document.body.appendChild(i),await new Promise((e=>{i.onload=e}));const r=i.clientWidth,s=i.clientHeight,a=document.createElement("canvas");a.width=r,a.height=s;a.getContext("2d").drawImage(i,0,0),i.remove();const l=await new Promise((e=>{a.toBlob(e,"image/jpeg")})),c=Date.now().toString(),d=`fb_uploader_${c}`;let p=null;try{await n.post(`/rupload_igphoto/${d}`,l,{headers:{"X-Instagram-Rupload-Params":JSON.stringify({media_type:1,upload_id:c,upload_media_width:r,upload_media_height:s}),"X-Entity-Name":d,"X-Entity-Length":String(l.size),Offset:"0"},timeout:Number.POSITIVE_INFINITY})}catch(e){p=e}if(!p)try{await n.post("/create/configure_to_story/",{upload_id:c,caption:"",reel_mentions:JSON.stringify(t.map((e=>({user_id:e.userId,x:e.cx,y:e.cy,width:e.width,height:e.height,rotation:0}))))})}catch(e){p=e}return{error:p}}var zo={init:function(){Oo=ce.getConfig().igSelectors,async function(){const e=await ue("store");h((()=>{const t=v(Oo["post-item"]),n=v(Oo["story-container"]);[...t,...n].forEach((t=>{if(t.withActions)return;const o=n.includes(t),i=!!t.querySelector("video");let r=!1,s=!1;const a=t.closest("[data-post-id]");if(a){const t=a.dataset.postId,n=e.getState().posts.byId.get(t);s="clips"===(null==n?void 0:n.productType),r="igtv"===(null==n?void 0:n.productType),r&&a.setAttribute("data-media-actions-post-type","igtv"),s&&a.setAttribute("data-media-actions-post-type","reels")}const l=function({isIgtv:e=!1,isStory:t=!1,isVideo:n=!1,isReels:o=!1}={}){return`\n    <div class="\n      mediaActions\n      ${e?"mediaActions_igtv":""}\n      ${o?"mediaActions_reels":""}\n      ${t?"mediaActions_story":"mediaActions_post"}\n      ${n?"mediaActions_video":"mediaActions_photo"}">\n      <button class="mediaActions__button" data-action="fullscreen" title="fullscreen">\n        <svg style="transform: translateX(-0.5px)" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">\n          <path d="M10,12H7V10h3V7h2v5ZM0,12V7H2v3H5v2ZM10,5V2H7V0h5V5ZM0,5V0H5V2H2V5Z" fill="currentColor"/>\n        </svg>\n      </button>\n      <button class="mediaActions__button" data-action="open" title="open in new tab">\n        <svg xmlns="http://www.w3.org/2000/svg" width="12.507" height="12.501" viewBox="0 0 12.507 12.501">\n          <path d="M179.372-.5V1h3.3l-5.148,5.148,1.7,1.7L184.371,2.7V5.948h1.51V-.5Z" transform="translate(-173.374 0.504)" fill="currentColor"/>\n          <path d="M8,93.55H2v-6H4l2-2H0v10H10v-6l-2,2Z" transform="translate(0 -83.049)" fill="currentColor"/>\n        </svg>\n      </button>\n    </div>\n  `}({isStory:o,isVideo:i,isIgtv:r,isReels:s});t.insertAdjacentHTML("afterbegin",l),t.withActions=!0}))}))}(),Z.on("ig.media-fullscreen-exit",(({url:e,currentTime:t,volume:n,muted:o})=>{let i=m(`video[src="${e}"]`);if(!i){const t=m(`source[src="${e}"]`);t&&(i=t.closest("video"))}i&&(i.currentTime=t,i.volume=n,i.muted=o)})),mo.onDocClick((async e=>{const t=e.target.closest(".mediaActions__button");if(!t)return;e.preventDefault(),e.stopPropagation();const n=t.closest("li")||t.closest(Oo["post-item"])||t.closest(Oo["story-container"]),o=n.querySelector("img"),i=n.querySelector("video");if(!o&&!i)return void Z.send("ig.error","unable to find media for button");const r=(await ue("store")).getState();let s;const a=e.target.closest("[data-post-id]");s=a?a.dataset.postId:r.stories.reels.get(r.stories.currentReelId).itemIds[r.stories.currentReelItemIndex];const l=r.posts.byId.get(s),c=t.getAttribute("data-action");let d;if(i)d=i.getAttribute("src")||i.querySelector("source").getAttribute("src");else if(o){var p,u;!l.isSidecar&&(null===(p=l.displayResources)||void 0===p?void 0:p.length)>0&&(d=l.displayResources.slice().sort(((e,t)=>t.configWidth-e.configWidth))[0].src),d||(d=null===(u=o.getAttribute("srcset"))||void 0===u?void 0:u.split(",").map((e=>({src:e.split(" ")[0],configWidth:e.split(" ")[1]}))).sort(((e,t)=>t.configWidth-e.configWidth))[0].src),d||(d=o.getAttribute("src"))}if("open"===c){const e=i&&i.outerHTML||o&&o.outerHTML;Z.send("ig.media-open",{url:d,html:e})}else"fullscreen"===c&&i&&(Z.send("ig.media-fullscreen-enter",{url:d,currentTime:i.currentTime,volume:i.volume,muted:i.muted,paused:i.paused}),i.pause())})),p`
    <style>
      .mediaActions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s;
      }
      .mediaActions_story {
        padding-right: 5px;
        padding-bottom: 70px;
        height: 150px;
        z-index: 1;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }
      .mediaActions_post.mediaActions_photo {
        padding-right: 2px;
        padding-bottom: 12px;
        align-items: flex-end;
      }
      .mediaActions_post.mediaActions_video {
        right: 5px;
        bottom: 72px;
        transition-duration: 0s;
      }
      @media (min-width: 450px) {
        .mediaActions_post.mediaActions_video {
          bottom: 31px;
        }
      }
      ${Oo["post-item"]}:hover .mediaActions,
      body:hover .mediaActions_story {
        opacity: 1;
      }
      .v1Nh3 .mediaActions, /* preview in profile */
      .PUHRj .mediaActions { /* preview in activity */
        display: none;
      }

      ${Oo["post-item"]} video::-webkit-media-controls-panel {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 140px;
        background: linear-gradient(
          to top,
          hsl(0, 0%, 0%, 0.541) 0%,
          hsla(0, 0%, 0%, 0.382) 19%,
          hsla(0, 0%, 0%, 0.278) 34%,
          hsla(0, 0%, 0%, 0.194) 47%,
          hsla(0, 0%, 0%, 0.126) 56.5%,
          hsla(0, 0%, 0%, 0.075) 65%,
          hsla(0, 0%, 0%, 0.042) 73%,
          hsla(0, 0%, 0%, 0.021) 80.2%,
          hsla(0, 0%, 0%, 0.008) 86.1%,
          hsla(0, 0%, 0%, 0.002) 91%,
          hsla(0, 0%, 0%, 0.001) 95.2%,
          hsla(0, 0%, 0%, 0) 100%
        );
      }

      /* show video controls only when hovering video */
      ${Oo["post-item"]}:not(:hover) video::-webkit-media-controls-panel {
        display: none;
      }

      .mediaActions__button {
        width: 34px;
        height: 34px;
        margin-right: 6px;
        border-radius: 50%;
        padding: 0;
        border: none;
        cursor: pointer;
        position: relative;
        transform-origin: center;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: all;
        color: #FFF;
        background: transparent;
        transition: all 0.16s linear;
      }
      .mediaActions__button:not(:hover) {
        transition-duration: 0s;
      }
      .mediaActions_post.mediaActions_video .mediaActions__button {
        margin-right: 4px;
      }
      .mediaActions_post.mediaActions_photo .mediaActions__button,
      .mediaActions_story .mediaActions__button {
        color: #3F3E3F;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
        width: 27px;
        height: 27px;
        margin-right: 14px;
      }
      .mediaActions_post.mediaActions_video .mediaActions__button:hover {
        background: rgba(36, 36, 40, 0.7);
      }
      /* hitbox */
      .mediaActions__button::before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
      }
      .mediaActions_photo .mediaActions__button[data-action="fullscreen"] {
        display: none;
      }

      .mediaActions_post.mediaActions_video .mediaActions__button svg {
        filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
      }

      .zen--enabled .mediaActions_video {
        bottom: 66px;
      }
    </style>
  `}};let Oo;var Ho={init:function(){(async function(){await r(),Z.send("ig.ready")})(),mo.onPathChange((e=>{Z.send("ig.path-change",e)})),async function(){const e=await ue("http");if(!e)return;const t=e.post.bind(e);e.post=async(...e)=>{const n=e[0];let o=n.includes("/media/configure/")?"photo":n.includes("/create/configure/")||n.includes("/igtv/configure_to_igtv/")?"video":n.includes("/media/configure_to_clips/")?"reel":n.includes("/create/configure_to_story/")?"story":null;if(o){const n=await t(...e);if("ok"===n.status){if("story"===o){var i;o=!!(null===(i=n.media)||void 0===i?void 0:i.video_duration)?"story-video":"story-photo"}Z.send("ig.published",o)}return n}return t(...e)}}(),mo.onDocClick((e=>{e.target.closest(".xWeGp")&&Z.send("ig.open-dm")})),Z.on("ig.back",(async()=>{await ft()?location.href="/":history.state&&history.state.key&&history.back()})),Z.on("ig.refresh",(()=>{location.reload()})),Z.on("ig.broadcast-scroll",(e=>{mo.docElem.scrollTop+=e})),function(){let e;(async()=>{e=await ue("nav")})(),Z.on("ig.ajax-go",(t=>{e?e.push(t):location.href=t}))}(),async function(e){Z.on("ig.hard-go",(e=>{location.href=e}))}(),Z.on("ig.get-url",(()=>location.pathname+location.search)),function(){const e=ce.getConfig().igSelectors;Z.on("ig.clear-and-show-spinner",(()=>{const t=m(e.general.reactRoot);t&&(t.innerHTML="")}))}()}};var Vo={init:async function(){if(No=ce.getConfig().igSelectors,Uo=await ue("store"),!Uo)return;(function(){let e;Object.defineProperty(Object.prototype,"getVideoCoverPhoto",{get:function(){return(...t)=>{const n=t[0];if(Xo.onCall(n),!Xo.prevented){if(Xo.result){const e=Xo.result;return Xo.result=null,e}return e(...t)}Xo.prevented=!1}},set:function(t){return e=t,!0}})})(),async function(){await r(),qo=Dt.create({onClick:Ko})}(),mo.onBeforeStoryCreation((()=>{Wo="story",Qo()})),mo.onBeforePostCreation((()=>{Wo=wt.isCreatingReels()?"reels":"post",Qo()})),mo.onMediaProcessingError((()=>{Jo()})),h((()=>{const e=m(No["post-creation"]),t=m(No["story-creation"]);(e||t)&&Jo()})),function(){const e=Symbol();h((()=>{v('input[accept*="image/jpeg"').forEach((t=>{t[e]||(t[e]=!0,t.setAttribute("accept","image/jpeg, image/png, video/quicktime, video/mp4, video/webm"))}))}))}(),Xo.onCall((e=>{const{error:t,...n}=function(e){const t=e.videoWidth,n=e.videoHeight;if(!t||!n)return{error:"wrong-format"};if(wt.isCreatingReels()&&t===n)return{error:"square-reel-video"};const o=t/n,i=jo[Wo].minRatio,r=jo[Wo].maxRatio;return o<i||o>r?{error:"wrong-ratio",ratio:o}:e.duration<jo[Wo].minVideoDuration?{error:"video-too-short"}:e.duration>jo[Wo].maxVideoDuration?{error:"video-too-long"}:{error:null}}(e);t&&(async()=>{Xo.prevented=!0,Uo.dispatch({type:"inssist.ig.stop-creation-session"});const o=await fetch(e.src),i=await o.blob();await Zo(i.type,t,n),mo.onMediaProcessingError()})()})),Xo.onCall((e=>{"story"===Wo&&(Xo.result=new Promise((t=>{const n=document.createElement("canvas");e.currentTime=0,e.addEventListener("timeupdate",(()=>{n.width=e.videoWidth,n.height=e.videoHeight,n.getContext("2d").drawImage(e,0,0),n.toBlob((n=>{t({file:n,dataURL:URL.createObjectURL(n),uploadMediaWidth:e.videoWidth,uploadMediaHeight:e.videoHeight,videoTransform:null})}),"image/jpeg")}))})))})),p`
    <style>
      ${No.general.uploadPanel} {
        z-index: 1;
      }
    </style>
  `,async function(){const e=await ue("http");if(!e)return;const t=()=>{var e,t;return(null===(e=Uo.getState().creation)||void 0===e||null===(t=e.sourceVideo)||void 0===t?void 0:t.uploadMediaDurationMs)>=6e4},n=e.post.bind(e);e.post=(...e)=>{var o,i;if((null===(o=e[0])||void 0===o||null===(i=o.includes)||void 0===i?void 0:i.call(o,"/rupload_igvideo/"))&&t()){const t=e[2].headers,n=JSON.parse(t["X-Instagram-Rupload-Params"]);n.is_igtv_video=!0,n.is_unified_video=1,t["X-Instagram-Rupload-Params"]=JSON.stringify(n)}else"/create/configure/"===e[0]&&t()&&(e[0]="/igtv/configure_to_igtv/",e[1]={source_type:"library",caption:e[1].caption,upcoming_event:"",upload_id:e[1].upload_id,usertags:e[1].usertags,custom_accessibility_caption:e[1].custom_accessibility_caption,disable_comments:0,like_and_view_counts_disabled:0,igtv_ads_toggled_on:"",igtv_share_preview_to_feed:1,is_unified_video:1,video_subtitles_enabled:0});return n(...e)}}()}};const jo={clickShowErrorTimeout:1e4,forceShowErrorTimeout:3e4,story:{minRatio:.5621,maxRatio:1.91,minRatioPrettyStr:"9:16",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.5625",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:300,minVideoDurationStr:"1 second",maxVideoDurationStr:"5 minutes",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 to 15 seconds long and the size ratio is from 1.91:1 to 9:16."},post:{minRatio:.8,maxRatio:1.91,minRatioPrettyStr:"4:5",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.8",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:900,minVideoDurationStr:"1 second",maxVideoDurationStr:"15 minutes",alertErrorMessage:"Uploading video ca ncelled. Please ensure that the video is 3 seconds to 60 minutes long and the size ratio is from 1.91:1 to 4:5."},reels:{minRatio:.5621,maxRatio:1.91,minRatioPrettyStr:"9:16",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.5625",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:60.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"60 seconds",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 to 30 seconds long and the size ratio is from 1.91:1 to 9:16."}};let No,Uo,Wo,qo,Yo,Go;const Xo={onCall:fo(),result:null,prevented:!1};function Qo(){qo&&(Yo=Date.now(),Dt.toggle(qo,!0),Go=setTimeout((()=>{alert(jo[Wo].alertErrorMessage),Jo()}),jo.forceShowErrorTimeout))}function Jo(){qo&&(Dt.toggle(qo,!1),clearTimeout(Go))}function Ko(){Date.now()-Yo>jo.clickShowErrorTimeout&&alert(jo[Wo].alertErrorMessage),Jo()}async function Zo(e,t,n={}){const o=Zo;if(o.shown)return;o.shown=!0;const i=jo[Wo];if("wrong-ratio"===t){const e=n.ratio.toFixed(3);document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNSUPPORTED ASPECT RATIO\n          </div>\n          <div class="modal__content">\n            ${n.ratio<i.minRatio?`\n              Uploaded Video Aspect Ratio is <b>${e}</b>\n              which is <b>below ${i.minRatioPrettyStr} (${i.minRatioValueStr})</b>.\n            `:`\n              Uploaded Video Aspect Ratio is <b>${e}</b>\n              which is <b>above ${i.maxRatioPrettyStr} (${i.maxRatioValueStr})</b>.\n            `}\n            <div class="video-error__convert-section">\n              You can resize the video with one of these free tools:\n              <ul>\n                <li><a href="https://ezgif.com/resize-video" target="_blank">ezgif.com</a></li>\n                <li><a href="https://clideo.com/resize-video" target="_blank">clideo.com</a></li>\n                <li><a href="https://cloudconvert.com/mp4-converter" target="_blank">cloudconvert.com</a></li>\n              </ul>\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `)}else if("wrong-format"===t){let t;t="video/quicktime"===e?"https://www.zamzar.com/convert/mov-to-webm":"video/mp4"===e?"https://www.zamzar.com/convert/mp4-to-webm":"https://www.zamzar.com",document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNABLE TO UPLOAD VIDEO\n          </div>\n          <div class="modal__content">\n            Instagram server rejected this video for upload.\n            Please ensure uploaded video uses supported format and codec (e.g. MP4/h264 or WEBM).\n            <div class="video-error__convert-section">\n              You can convert video format with one of these tools:\n              <ul>\n                <li><a href="https://video.online-convert.com/convert-to-mp4" target="_blank">video.online-convert.com</a></li>\n                <li><a href="https://cloudconvert.com/mp4-converter" target="_blank">cloudconvert.com</a></li>\n                <li><a href="https://ezgif.com/resize-video" target="_blank">ezgif.com</a></li>\n                <li><a href="${t}" target="_blank">zamzar.com</a></li>\n              </ul>\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `)}else"video-too-short"===t?document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> VIDEO IS TOO SHORT\n          </div>\n          <div class="modal__content">\n            <div style="display: block">\n              Instagram server did not accept this video,\n              because it is less than <b>${i.minVideoDurationStr}</b> long.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `):"video-too-long"===t?document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> VIDEO IS TOO LONG\n          </div>\n          <div class="modal__content">\n            Instagram server did not accept this video,\n            because it is over <b>${i.maxVideoDurationStr}</b>\n            long.\n            <div class="video-error__convert-section">\n              You can cut video short with this free\n              <a href="https://online-video-cutter.com/" target="_blank">online video cutter tool</a>.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `):"square-reel-video"===t&&document.body.insertAdjacentHTML("beforeend",'\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNSUPPORTED ASPECT RATIO\n          </div>\n          <div class="modal__content">\n            <div style="display: block">\n              Instagram API does not support posting square 1:1 videos to Reels.\n            </div>\n            <div style="height: 8px"></div>\n            <div style="display: block">\n              • Supported ratios are 4:5 to 1.91:1.<br>\n              • Optimal is 9:16 or 1080x1920px <span class="emoji">🚀</span>\n            </div>\n            <div style="height: 8px"></div>\n            <div style="display: block">\n              You can crop your video online with a&nbsp;free\n              <a href="https://ezgif.com/crop-video" target="_blank">ezgif video cropper tool</a>.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    ');o.init||(o.init=!0,mo.onDocClick((e=>{if(!e.target.closest(".video-error__got-it-button"))return;m(".video-error").remove(),o.shown=!1})),p`
    <style>
      .video-error__title .emoji {
        margin-right: 8px;
      }

      .video-error__convert-section {
        margin-top: 8px;
        display: block;
      }

      .video-error__got-it-button {
        outline: none;
        border: none;
        padding: 0;
        margin: 16px 0 0 0;
        background: transparent;
        font-size: inherit;
        font-family: inherit;
        text-align: left;
        font-weight: 600;
        color: #1BA2F9;
        cursor: pointer;
      }
    </style>
  `)}var ei={init:function(){ti=ce.getConfig().igSelectors,function({minWidth:e}){p`
    <style>
      @media (min-width: ${e}px) {
        ${ti.general.tabBarWrap} {
          height: 0;
          margin-top: 12px;
        }

        ${ti.general.tabBar} {
          width: 490px;
          height: 58px !important;
          margin: 0 auto;
          box-shadow: 0 0px 12px rgba(0, 0, 0, 0.14);
          border-radius: 15px 15px 0 0;
        }
        .theme-night ${ti.general.tabBar} {
          background: #E7E8EA;
          border: 1px solid #FFF;
          border-bottom: none;
          box-shadow: none;
          box-sizing: content-box;
        }

        ${ti.general.tabBar}::before {
          display: none !important;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:e}){p`
    <style>
      @media (min-width: ${e}px) {
        ${ti.general.header}::before {
          width: 600px;
          margin-left: -300px;
          left: 50% !important;
          right: auto !important;
          background: linear-gradient(
            to right,
            transparent,
            #DBDBDB,
            #DBDBDB,
            transparent
          ) !important;
        }

        ${ti.general.headerContent} {
          width: 490px !important;
          margin-left: auto;
          margin-right: auto;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:e}){const t=document.documentElement;let n=t.scrollTop;const o=()=>{const o=m(ti.general.header);if(!o)return;if(window.innerWidth<e)return void(o.style.transform=null);const i=t.scrollTop,r=i-n,s=r>6;n=i,r<-6||i<=45?o.style.transform=null:s&&(o.style.transform="translateY(-45px)")};window.addEventListener("resize",o),document.addEventListener("scroll",o),p`
    <style>
      @media (min-width: ${e}px) {
        ${ti.general.header} {
          transition: transform 0.3s;
        }
      }
    </style>
  `}({minWidth:460}),function({minWidth:e}){p`
    <style>
      @media (min-width: ${e}px) {
        ${ti.general.storyPreviewContainer} {
          border: 1px solid #EDEDED !important;
          border-radius: 3px;
          margin-top: 18px;
          margin-bottom: 14px;
        }

        html[data-page="feedPage"] ${ti.general.recommendationsContainer} {
          border: 1px solid #EDEDED !important;
          border-radius: 3px;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:e}){p`
    <style>
      @media (min-width: ${e}px) {
        ${ti.explorePage.content} {
          padding-top: 25px !important;
        }

        ${ti.explorePage.contentInner} {
          margin-left: -20px !important;
          margin-right: -48px !important;
        }

        ${ti.explorePage.searchResults} {
          width: 100%;
          max-width: 460px;
          margin: -16px auto 0;
        }

        /* thin border for posts */
        ${ti.explorePage.post} {
          position: relative;
        }
        ${ti.explorePage.post}::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
        }
      }
    </style>
  `}({minWidth:736}),function({minWidth:e}){Wt((async t=>{if(window.innerWidth<e)return;const n=t.target.closest(ti.profilePage.post);if(!n)return;t.preventDefault(),t.stopPropagation();const o=n.getAttribute("href");(await ue("nav")).push(o)}),{capture:!0}),p`
    <style>
      @media (max-width: ${e-1}px) {
        ${ti.profilePage.header} {
          margin-top: 20px !important;
        }
      }

      @media (min-width: ${e}px) {
        ${ti.profilePage.content} {
          padding-top: 0 !important;
        }

        ${ti.profilePage.header} {
          padding-top: 26px;
        }

        ${ti.profilePage.headerFirstRow} {
          min-height: 40px;
        }

        ${ti.profilePage.avatarWithStoryWrap} {
          margin-top: 6px;
        }

        ${ti.profilePage.username} {
          position: relative;
          top: -3px;
        }

        ${ti.profilePage.settingsMenuWrap} {
          background: #FFF !important;
        }

        ${ti.profilePage.settingsMenu} {
          background: #FAFAFA;
          width: 100%;
          max-width: 490px;
          margin: 0 auto;
          border-left: 1px solid #EDEDED;
          border-right: 1px solid #EDEDED;
        }
      }
    </style>
  `}({minWidth:736}),async function({minWidth:e}){if(await ft())return void await Z.send("ig.update-ig-view",{fullscreenWidth:550,withBorder:!0});const t=await ue("store"),n=document.documentElement,o={};let i,r=!1;const s=await ue("scroll-controller"),a=s.restoreScrollPosition;s.restoreScrollPosition=(...t)=>{if(!(window.innerWidth>=e))return a.call(s,...t)};const l=history.pushState.bind(history);async function c(){const e=m(ti.general.root);if(!e)return;if(i===e)return;let s;i=e;const a=location.pathname,l=t.getState().navigation.pageIdentifier,c="/create/story/"!==a&&a.startsWith("/create/");s=a.startsWith("/accounts/signup/")||"loginPage"===l||"unifiedHome"===l?{width:460,borders:!0}:c?{width:490,borders:!0}:"StoriesPage"===l?{width:460,borders:!1}:"exploreLandingPage"===l||"profilePage"===l?{width:900,borders:!1}:{width:550,borders:!1};const d=m(ti.general.tabBar),p=m(ti.general.header),u=m(ti.general.content);if(d&&(d.style.opacity=0),p&&(p.style.opacity=0),u&&(u.style.transition=null,u.style.transform="translateY(3px)",u.style.opacity=0),await Z.send("ig.update-ig-view",{fullscreenWidth:s.width,withBorder:s.borders}),d&&(d.style.opacity=null),p&&(p.style.opacity=null),u&&(u.style.transition="transform 0.2s, opacity 0.2s",u.style.transform=null,u.style.opacity=null),!r)return void(n.scrollTop=0);r=!1;const h=o[location.href];h?(n.scrollTop=h.scrollTop,requestAnimationFrame((()=>{const e=h.anchor;if(!e)return;const t=m(e.selector);if(!t)return;const o=t.getBoundingClientRect().top;n.scrollTop+=o-e.top}))):n.scrollTop=0}history.pushState=(...e)=>(o[location.href]={scrollTop:n.scrollTop,anchor:ni()},l(...e)),window.addEventListener("popstate",(()=>{r=!0})),Z.on("ig.widescreen-toggled",c),h((()=>{window.innerWidth<e||c()}),!0)}({minWidth:460}),async function(){const e=await ue("nav");if(!e)return;const t=Symbol("handled");h((()=>{v(ti.profilePage.followersFollowingsLink).forEach((n=>{n[t]||(n[t]=!0,n.addEventListener("click",(async t=>{if(!(window.innerWidth>=725))return;t.preventDefault(),t.stopPropagation(),await Z.send("ig.force-small-iframe-width",!0);const o=document.body;o.style.opacity=0,o.style.transform="translateY(3px)",await l((()=>window.innerWidth<700)),await Ae(100),e.push(n.getAttribute("href")),await l((()=>m('html[data-page="followList"]'))),o.style.transition="all 0.3s ease",o.style.opacity=null,o.style.transform=null,await Ae(300),o.style.transition=null,Z.send("ig.force-small-iframe-width",!1)}),{capture:!0}))}))}))}()}};let ti;function ni(){try{const e=m(ti.general.content);if(!e)return null;const t=v("*",e);for(const e of t){const t=e.getBoundingClientRect().top;if(t<0)continue;const n=oi(e);if(!n)return;if(!(v(n).length>1))return{top:t,selector:n}}return null}catch(e){return console.error("unable to find scroll anchor",{details:e}),null}}function oi(e){try{const t=e.tagName.toLowerCase(),n=Array.from(e.classList).map((e=>`.${e}`)).join("");return`${t}${n}${e.getAttributeNames().map((t=>"class"===t||"style"===t?"":`[${t}="${e.getAttribute(t)}"]`)).join("")}`}catch(t){return console.error("unable to get selector for an element",{details:t,elem:e}),""}}var ii={init:function(){ri=ce.getConfig().igSelectors,mo.onDocClick((e=>{const t=e.target.closest(".-wt5I");t&&setTimeout((()=>{document.body.contains(t)&&t.click()}),300)})),function(){const e=HTMLElement.prototype.getBoundingClientRect;HTMLElement.prototype.getBoundingClientRect=function(...t){const n=e.call(this,...t);return 0===n.height&&(n.height=1),n}}(),p`
    <style>
      /* story spinner */
      .u6s6p {
        display: none !important;
      }
    </style>
  `,p`
    <style>
      ${ri["story-container"]} {
        width: 100% !important;
        height: 100% !important;
      }

      ${ri["story-image"]},
      ${ri["story-video"]},
      ${ri["story-loading-preview"]} {
        object-fit: contain;
      }
    </style>
  `,p`
    <style>
      .theme-night ${ri.storyViewer.pollContainer} {
        filter: url(#theme-reverse-filter);
        color: transparent;
      }

      ${ri.storyViewer.pollButtons} {
        font-family: inherit !important;
      }

      ${ri.storyViewer.pollAnswerDigitOrEmoji} {
        -webkit-text-fill-color: inherit !important;
      }

      ${ri.storyViewer.pollAnswerDigitOrEmoji} .emoji {
        filter: none !important;
        color: initial !important;
        -webkit-text-fill-color: initial !important;
      }
    </style>
  `,document.addEventListener("keyup",(e=>{if("Escape"===e.key){const e=m(ri.storyViewer.closeButton);if(!e)return;e.click()}else if("ArrowLeft"===e.key){const e=m(ri.storyViewer.prevButton);if(!e)return;e.click()}else if("ArrowRight"===e.key){const e=m(ri.storyViewer.nextButton);if(!e)return;e.click()}})),function(){const e="__manageStoriesAutoplay";let t=null,n=!1;h((()=>{const o=m(ri["stories-viewer"]);t&&!o&&(n=!1,mo.docElem.classList.remove("enable-stories-autoplay")),t=o;const i=m(ri["story-video-play-button"]);n&&i&&!i[e]&&setTimeout((()=>{i[e]=!0,i.click()}),200)})),mo.onDocClick((t=>{const o=t.target.closest(ri["story-video-play-button"]);o&&!n&&(o[e]=!0,n=!0,mo.docElem.classList.add("enable-stories-autoplay"))})),p`
    <style>
      .enable-stories-autoplay ${ri["story-video-play-button"]} {
        opacity: 0;
      }
    </style>
  `}(),function(){const e=window.addEventListener;window.addEventListener=(...t)=>{if("blur"!==t[0])return e.call(window,...t)}}()}};let ri;var si={storySharingPost:!1},ai={init:function(){li=ce.getConfig().igSelectors,p`
    <style>
      ${li.storyCreation.topRightButton} {
        cursor: pointer;
      }
    </style>
  `,async function(){const e=await ue("store");if(!e)return;const t=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(...n){if(!(9===n.length&&n[0]instanceof HTMLImageElement&&"/create/story/"===location.pathname))return t.call(this,...n);const o=m(li.storyCreation.root);if(!o)return t.call(this,...n);const i=JSON.parse(JSON.stringify(e.getState())).displayProperties.pixelRatio;let r,s;o.offsetWidth/o.offsetHeight>9/16?(r=o.offsetHeight*(9/16),s=o.offsetHeight):(r=o.offsetWidth,s=o.offsetWidth/(9/16)),o.style.width=`${r}px`,o.style.height=`${s}px`,v("canvas").forEach((e=>{e.style.width=`${r}px`,e.style.height=`${s}px`,e.setAttribute("width",r*i),e.setAttribute("height",s*i)}));const a=n[0],l=.04,c=a.width/a.height,d=c>9/16*(1-l)&&c<(1+l)*(9/16)?"cover":"contain";this.restore();const p=r*i,u=s*i;"contain"===d&&(this.filter="blur(170px)",t.call(this,a,-300,-300,p+600,u+600),this.filter="none");const h=function({type:e,width:t,height:n,containerWidth:o,containerHeight:i,offset:r=0}){const s=t/n,a=o/i;return s>a&&"contain"===e||s<a&&"cover"===e?{dx:0+r,dy:(i-o/s)/2+r,width:o-2*r,height:o/s-2*r}:{dx:(o-i*s)/2+r,dy:0+r,width:i*s-2*r,height:i-2*r}}({type:d,width:a.width,height:a.height,containerWidth:p,containerHeight:u,offset:si.storySharingPost?60:0});if(t.call(this,a,h.dx,h.dy,h.width,h.height),si.storySharingPost){const t=m("canvas").getContext("2d"),n=e.getState().displayProperties.pixelRatio,o=si.storySharingPost.owner.username,i=60/n,r=(h.dy+h.height+40)/n;t.save(),t.scale(n,n),t.fillStyle="white",t.shadowColor="rgba(150, 150, 150, 0.3)",t.shadowOffsetX=0,t.shadowOffsetY=1,t.shadowBlur=2,t.font="600 22px sans-serif",t.textAlign="left",t.textBaseline="top",t.fillText(`@${o}`,i,r),t.restore()}}}(),function(){const e=Symbol("handled");h((async()=>{const t=m(li.storyCreation.root);if(!t)return;if(t[e])return;t[e]=!0;if(await Z.send("ig.is-fullscreen"))return;const n=document.documentElement;n.classList.add("story-creation-dark-background"),h((function e(){m(li.storyCreation.root)||(h.off(e),n.classList.remove("story-creation-dark-background"))}))})),p`
    <style>
      .story-creation-dark-background body {
        background: #0d0d0d;
      }
      .theme-night.story-creation-dark-background body {
        background: #fdfdfd;
      }
    </style>
  `}(),async function(){const e=await ue("http:retry-story-post");if(!e)return;ue.unlockOnNextTick("http:story-assist");const t=e.post.bind(e),n=async(e,o=1)=>{console.log(`trying to post a story, attempt no.${o}`);const i=await t(...e);return"fail"===i.status&&"Transcode not finished yet."===i.message&&o<5?(await Ae(3e3),n(e,o+1)):i};e.post=(...e)=>"/create/configure_to_story/"!==e[0]?t(...e):n(e)}(),function(){const e=Symbol("handled");h((()=>{const t=m(li.storyCreation.downloadButton);t&&(t.parentNode[e]||(t.parentNode[e]=!0,t.remove()))}))}(),p`
    <style>
      ${li.storyCreation.mentionBarContainer} {
        width: calc(100% - 100px) !important;
        height: 94px !important;
        top: 0 !important;
        margin-left: -100px !important;
      }

      ${li.storyCreation.mentionBar} {
        height: 100% !important;
        border-radius: 0 0 8px 0;
        position: static;
      }

      ${li.storyCreation.mentionReel} {
        height: 100% !important;
        position: static;
      }

      ${li.storyCreation.mentionReelRow} {
        height: 100% !important;
        align-items: center !important;
        position: static;
      }
      ${li.storyCreation.mentionReelRow}:not(:empty)::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0 8px 8px 0 !important;
        background: rgba(0 , 0 , 0 , 0.2) !important;
      }

      ${li.storyCreation.mentionReelItem} {
        margin: 0 10px 0 0 !important;
      }
      ${li.storyCreation.mentionReelItem}:last-child {
        margin-right: 0 !important;
      }
    </style>
  `,function(){const e=Symbol("handled");h((()=>{const t=m(li.storyCreation.video);t&&(t[e]||(t[e]=!0,t.muted=!1,t.controls=!0,t.controlsList="nodownload noremoteplayback noplaybackrate",t.disablePictureInPicture=!0,setTimeout((()=>t.volume=1),100)))})),p`
    <style>
      ${li.storyCreation.root} {
        background: #000;
      }

      ${li.storyCreation.video} {
        max-width: 100%;
        max-height: 100%;
      }

      ${li.storyCreation.videoPoster} {
        display: none;
      }

      ${li.storyCreation.footer} {
        height: 70px;
        background: transparent;
        position: relative;
      }

      ${li.storyCreation.videoPlayButton} {
        display: none;
      }
    </style>
  `}(),function(){const e=Symbol();h((()=>{const t=m(li.storyCreation.submitButton);t&&(t[e]||(t[e]=!0,t.addEventListener("click",(()=>{v("video").forEach((e=>e.pause()))}),!0)))}))}(),function(){const e=Event.prototype.preventDefault;Event.prototype.preventDefault=function(...t){var n,o;if(!this.type.startsWith("touch")||!(null===(n=(o=this.target).matches)||void 0===n?void 0:n.call(o,li.storyCreation.canvas)))return e.call(this,...t)}}(),async function(){const e=await ue("http");if(!e)return;const t=e.post.bind(e);e.post=(...e)=>((()=>{var t;if(!(null===(t=e[0])||void 0===t?void 0:t.includes("/configure_to_story/")))return;const n=m(li.storyCreation.uploadText);n&&(n.innerText="Publishing...")})(),t(...e));const n=Symbol();h((()=>{const e=m(li.storyCreation.uploadText);e&&(e[n]||(e[n]=!0,e.innerText="Uploading...",e.insertAdjacentHTML("afterend",'\n      <div class="StoryUploadText">\n        This might take a minute. Please keep this tab open.\n      </div>\n    ')))})),p`
    <style>
      ${li.storyCreation.uploadBar} {
        display: block;
        padding-top: 8px;
        height: 52px;
      }

      ${li.storyCreation.uploadText} {
        font-size: 14px;
        font-weight: 500;
        text-align: left;
      }

      .StoryUploadText {
        font-size: 14px;
        font-weight: 400;
        margin-top: 2px;
        color: #A0A0A0;
      }

      @media (max-width: 400px) {
        ${li.storyCreation.uploadBar} {
          padding-top: 9px;
        }
        ${li.storyCreation.uploadText} {
          font-size: 12px;
        }
        .StoryUploadText {
          font-size: 12px;
          margin-top: 0;
        }
      }
    </style>
  `}()}};let li;var ci={init:async function(){if(di=ce.getConfig().igSelectors,pi=await ue("store"),!pi)return;Wt((function(e){e.target.closest('[href="/direct/inbox/"]')&&(e.preventDefault(),e.stopPropagation(),Z.send("ig.open-sidebar-dm"))}),{capture:!0}),function(){const e=Symbol("handled");h((async()=>{const o=m(di.profilePage.moreButton);if(!o)return;const i=pi.getState(),r=i.users.viewerId,s=i.users.users.get(r);if(location.pathname.split("/")[1]===s.username)return;let a=m(".write-button");if(a&&a!==o.previousElementSibling)return a.remove(),void(o[e]=!1);if(o[e])return;o[e]=!0;await n()&&(o.insertAdjacentHTML("beforebegin",'\n      <button class="write-button">\n        <svg xmlns="http://www.w3.org/2000/svg" width="19.998" height="17.224" viewBox="0 0 19.998 17.224">\n          <path d="M2.079.75h16.57L9.818 15.071l-1.3-9zm6.508 5.315l9.68-5.127" fill="none" stroke="currentColor" stroke-width="1.5"/>\n        </svg>\n      </button>\n    '),a=m(".write-button"),a.addEventListener("click",t))})),p`
    <style>
      .write-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 17px;
        margin-left: 8px;
        border: none;
        border-radius: 4px;
        color: #000;
        background: transparent;
        cursor: pointer;
        user-select: none;
        transform: scale(1.15);
      }

      ${di.profilePage.writeButton} {
        display: none !important;
      }

      ${di.profilePage.followButton} {
        width: auto !important;
        margin-left: 0 !important;
      }

      ${di.profilePage.buttonsRow} {
        flex-grow: 0;
        flex-direction: row;
      }

      ${di.profilePage.blueButtonsWrap} {
        flex-grow: 0;
        flex-shrink: 0;
      }

      ${di.profilePage.subscribeButtonWrap} {
        flex-shrink: 1 !important;
        overflow: hidden !important;
      }
    </style>
  `;const t=async()=>{const e=await n();e&&Z.send("ig.start-conversation-in-sidebar-dm",e.id)},n=async()=>{const e=location.pathname.split("/")[1];return await l((()=>{const t=pi.getState(),n=t.users.usernameToId.get(e);return t.users.users.get(n)||null}))}}()}};let di,pi;var ui={init:async function(){if(gi=await ue("store"),!gi)return;hi=ce.getConfig().igSelectors,function(){const e=Symbol("handled");h((()=>{const t=m(hi.profilePage.content);if(!t)return;if(t[e])return;t[e]=!0;const n=mi({empty:!0});t.insertAdjacentHTML("afterbegin",n),(async()=>{try{var e;const n=location.pathname.split("/")[1],o=await l((()=>{const e=gi.getState(),t=e.users.usernameToId.get(n);if(t)return e.users.users.get(t)}));if(!document.body.contains(t))return;const i=Object.values(gi.getState().posts.byId.toJS()).filter((e=>{var t;return String(null===(t=e.owner)||void 0===t?void 0:t.id)===String(o.id)})),r={userId:o.id,username:o.username,bio:o.bio,postsCount:o.counts.media,followersCount:o.counts.followedBy,followingsCount:o.counts.follows,isPrivate:o.isPrivate,isVerified:o.isVerified,hasAvatar:o.profilePictureUrl.includes("150x150"),hasHighlights:o.highlightReelCount>0,lastPosts:i.map((e=>({ts:1e3*e.postedAt})))};if(fi.grade=await Z.send("chrome-bus","insights.get-credibility-grade",r),!document.body.contains(t))return;fi.engagement=function({user:e,posts:t}){const n=gi.getState().users.viewerId===e.id;if(e.isPrivate&&!n||0===t.length)return{value:"N/A",color:"#D8DADD",label:""};const o=t.map((e=>e.comments+e.likes)).reduce(((e,t)=>e+t),0),i=t.length>0?o/t.length:0,r=e.followerCount>0?i/e.followerCount*100:0,s=`${r<5?(Math.round(10*r)/10).toFixed(1):Math.round(r).toString()}%`,a={value:s,color:"#797979",label:"average"},l={value:s,color:"#74BE86",label:"above avg"},c={value:s,color:"#74BE86",label:"high"},d={value:s,color:"#74BE86",label:"v. high"},p={value:s,color:"#74BE86",label:"extreme"},u=r/(64.18845*Math.pow(e.followerCount,-.2251755));if(u<.4)return a;if(u<.8)return l;if(u<1.2)return c;if(u<1.8)return d;return p}({user:{id:o.id,isPrivate:o.isPrivate,followerCount:(null===(e=o.counts)||void 0===e?void 0:e.followedBy)||0},posts:i.map((e=>({likes:e.numPreviewLikes||0,comments:e.numComments||0})))});const s=gi.getState().users.viewerId;fi.followStatus={show:String(s)!==String(o.id),value:o.followsViewer};m(".profile-bar").outerHTML=mi();xt({anchor:m(".profile-bar__info-circle"),class:"profile-bar__info-tooltip",text:"\n            <b>Account Grade</b>\n            <br/>\n            This estimates if Instagram account is<br/>\n            spam / inactive or a real person / business.\n            Inssist relies on Machine Learning to identify\n            the grade.\n            <br/><br/>\n\n            <b>Engagement Rate</b>\n            <br/>\n            Profile engagement rate is calculated as\n            <code>(likes + comments) / followers</code>, for the last<br/>\n            12 posts. The higher account engagement,<br/>\n            the more active the followers are.\n            <br/><br/>\n\n            <b>Follow Status</b>\n            <br/>\n            Shows if this account is following you or not.\n            <br/><br/>\n\n            Account Grade and Engagement Rate are<br/>\n            not available for private accounts.\n          "})}catch(e){console.error("ig profile bar controller → manageBarCreation:",e);const t=m(".profile-bar");t&&t.remove()}})()}))}(),p`
    <style>
      .profile-bar {
        height: 48px;
        border-bottom: 1px solid #DBDBDB;
        background: #FCFCFD;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 12px;
      }
      .profile-bar::before,
      .profile-bar::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: -1px;
        width: calc(calc(100% - 400px) / 2);
      }
      .profile-bar::before {
        left: 0;
        background: linear-gradient(to right, white 40%, transparent);
      }
      .profile-bar::after {
        right: 0;
        background: linear-gradient(to left, white 40%, transparent);
      }

      .profile-bar__items {
        display: flex;
        flex-direction: row;
      }

      .profile-bar__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 40px;
      }
      .profile-bar__item:last-child {
        margin-right: 0;
      }

      .profile-bar__value {
        color: #262626;
        font-weight: 600;
        flex-direction: row;
      }

      .profile-bar__label {
        color: #999;
        font-weight: 500;
      }

      .profile-bar__info-circle.info-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -6px;
        margin-left: 200px;
        z-index: 1;
        transition: opacity 0.2s;
      }
      .profile-bar:not(:hover) .profile-bar__info-circle {
        opacity: 0;
      }

      .profile-bar__info-tooltip {
        width: 306px;
      }

      @media (max-width: 400px) {
        .profile-bar::before,
        .profile-bar::after {
          display: none;
        }

        .profile-bar__item {
          margin-right: 24px;
        }
      }

      @media (max-width: 440px) {
        .profile-bar__info-circle {
          top: 5px;
          left: auto;
          right: 8px;
          margin-left: auto;
          margin-top: auto;
        }
      }
    </style>
  `}};let hi,gi;const fi={grade:null,engagement:null,followStatus:null};function mi({empty:e=!1}={}){return e?'\n      <div class="profile-bar"></div>\n    ':`\n    <div class="profile-bar">\n      <div class="profile-bar__items">\n        <div class="profile-bar__item">\n          <div class="profile-bar__value">\n            ${fi.grade?`\n              <span style="color: ${fi.grade.color}">${fi.grade.value}</span>,\n              ${fi.grade.label}\n            `:""}\n          </div>\n          <div class="profile-bar__label">\n            Account grade\n          </div>\n        </div>\n        <div class="profile-bar__item">\n          <div class="profile-bar__value">\n            <span style="color: ${fi.engagement.color}">${fi.engagement.value}</span>\n            ${fi.engagement.label?`, ${fi.engagement.label}`:""}\n          </div>\n          <div class="profile-bar__label">\n            Engagement\n          </div>\n        </div>\n        ${fi.followStatus.show?`\n          <div class="profile-bar__item">\n            <div class="profile-bar__value">\n              ${fi.followStatus.value?"Yes":"No"}\n            </div>\n            <div class="profile-bar__label">\n              Follows me\n            </div>\n          </div>\n        `:""}\n      </div>\n      <div class="profile-bar__info-circle info-circle">?</div>\n    </div>\n  `}var vi={init:async function(){if(bi=ce.getConfig().igSelectors,yi=await ue("nav"),xi=await ue("http"),wi=await ue("store"),_i=await ue("add-dispatch-listener"),!(yi&&xi&&wi&&_i))return;_i((e=>{"STORY_CREATION_EXIT"===e.type&&(si.storySharingPost=null)})),function(){let e;_i((t=>{"POST_SHARE_IDS_LOADED"===t.type&&(e=t.postId)}));const t=Symbol("handled");h((()=>{if(!m(bi.dragPanel.sendEmailLink))return;const n=m(bi.dragPanel.shareMenuItem);if(!n)return;if(n[t])return;n[t]=!0,n.insertAdjacentHTML("beforebegin",'\n      <div class="share-to-story">\n        <div class="share-to-story__icon">\n          <svg class="share-to-story__icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.474 22.779a11.28 11.28 0 01-5.294-1.32.777.777 0 11.732-1.37 9.741 9.741 0 006.775.884.777.777 0 01.353 1.513 11.326 11.326 0 01-2.566.293zm-7.205-2.871a.773.773 0 01-.534-.213 11.218 11.218 0 01-3.2-5.509.777.777 0 011.51-.366 9.667 9.667 0 002.757 4.748.777.777 0 01-.534 1.34zm-3.221-8.651h-.077a.776.776 0 01-.7-.849 11.174 11.174 0 01.995-3.632.777.777 0 011.408.656 9.618 9.618 0 00-.854 3.122.777.777 0 01-.772.703zm3.258-6.58a.777.777 0 01-.6-1.269q.1-.127.211-.25a.777.777 0 111.171 1.02c-.062.071-.122.143-.182.215a.776.776 0 01-.6.284zm12.543 16.62a.777.777 0 01-.4-1.443 9.7 9.7 0 00-4.975-18.03.777.777 0 110-1.554 11.255 11.255 0 015.773 20.917.77.77 0 01-.398.11z" fill="currentColor"/><path d="M17.723 10.788h-4.45v-4.45H11.72v4.45H7.27v1.553h4.45v4.45h1.553v-4.45h4.45z" fill="currentColor"/></svg>\n        </div>\n        <div class="share-to-story__text">\n          Share to Story\n        </div>\n      </div>\n    ');m(".share-to-story").addEventListener("click",(t=>{t.stopPropagation(),async function(e){const t=wi.getState().posts.byId.get(e);if(!t)return;const n=await fetch(t.src,{credentials:"omit"}),o=await n.blob(),i=URL.createObjectURL(o),{width:r,height:s}=await new Promise((e=>{const t=new Image;t.src=i,t.addEventListener("load",(()=>{e({width:t.width,height:t.height})}))}));si.storySharingPost=t,wi.dispatch({type:"STORY_CREATION_SESSION_STARTED",entryPoint:"quick_cam_button",sessionId:Math.random().toString().slice(2),startTime:Date.now()}),wi.dispatch({type:"STORY_CREATION_IMAGE_PROCESSED",flash:!1,location:null,orientation:0,sourceImage:o,sourceDataURL:i,width:r,height:s}),yi.push("/create/story/")}(e),Z.send("ga.send-event","user","ig:share-to-story-click")}))})),p`
    <style>
      .share-to-story {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;
      }
      .share-to-story:hover {
        background: #FAFAFA;
      }

      .share-to-story__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        margin-right: 12px;
      }

      .share-to-story__icon-svg {
        width: 24px;
        height: 24px;
        position: relative;
        left: 1px;
      }

      .share-to-story__text {
        font-weight: 600;
      }
    </style>
  `}(),function(){const e=xi.post.bind(xi);xi.post=(...t)=>("/create/configure_to_story/"===t[0]&&si.storySharingPost&&(t[1]={...t[1],reshared_media_id:si.storySharingPost.id,story_sticker_ids:`media_simple_${si.storySharingPost.id}`,attached_media:JSON.stringify([{x:.5,y:.5,width:.5,height:.5,rotation:0,media_id:si.storySharingPost.id,media_owner_id:si.storySharingPost.owner.id,is_sticker:!0}])}),e(...t))}()}};let bi,yi,xi,wi,_i;var Pi={init:function(){!async function(){const e=await ue("store");if(!e)return;const t=Symbol("handled");h((()=>{const n=m(".get-insights-button-row");if(!n)return;if(n[t])return;n[t]=!0;const o=e.getState(),i=o.navigation.displayedRoute.split("/")[1],r=o.users.usernameToId.get(i);if(!r)return;const s=o.users.users.get(r);if(!s)return;const a=s.businessEmail;a&&n.insertAdjacentHTML("afterbegin",`\n      <a class="profile-email-button" href="mailto:${a}">\n        Email\n      </a>\n    `)})),p`
    <style>
      .profile-email-button {
        display: block;
        margin-right: 8px;
        margin-bottom: 12px;
        height: 30px;
        line-height: 28px;
        padding: 0 9px;
        font-weight: 600;
        color: #262626;
        background: transparent;
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
        box-sizing: border-box;
      }
    </style>
  `}()}};var Si={init:function(){ki=ce.getConfig().igSelectors,async function(){const e=await ue("store"),t=await ue("http");if(!e||!t)return;const n=Symbol("handled");h((()=>{const o=m(ki.general.actionDialogWithoutHeader);if(!o)return;if(o[n])return;o[n]=!0;const i=e.getState();if("postPage"!==i.navigation.pageIdentifier)return;const r=location.pathname.split("/")[2],s=i.posts.byId.toJS(),a=Object.values(s).find((e=>e.code===r));if(!a)return;if(a.owner.id!==i.users.viewerId)return;const l=m(ki.general.modalWindow);if(!l)return;o.firstChild.insertAdjacentHTML("afterend",'\n      <button class="edit-post-action-button">\n        Edit Caption\n      </button>\n    ');m(".edit-post-action-button").addEventListener("click",(()=>{l.classList.add("post-editor"),o.innerHTML=`\n        <form class="post-editor__form">\n          <div class="post-editor__title">\n            Edit Caption\n          </div>\n          <textarea\n            class="post-editor__textarea"\n            placeholder="Write a caption..."\n            maxlength="2200"\n            spellcheck="false"\n            required\n          >${a.caption||""}</textarea>\n          <div class="post-editor__buttons">\n            <button class="post-editor__button-save button" type="submit">\n              Save Caption\n            </button>\n            <button class="post-editor__button-cancel button button_cancel">\n              Cancel\n            </button>\n          </div>\n          <div class="post-editor__error"></div>\n        </form>\n      `;const e=m(".post-editor"),n=m(".post-editor__textarea"),i=m(".post-editor__button-save"),r=m(".post-editor__button-cancel"),s=m(".post-editor__error");setTimeout((()=>{n.focus(),n.setSelectionRange(n.value.length,n.value.length)}),300),n.addEventListener("input",(()=>{e.classList.remove("post-editor_with-error")})),e.addEventListener("submit",(async o=>{var l;let c;o.preventDefault(),n.disabled=!0,i.disabled=!0,r.disabled=!0,i.innerText="Saving...";try{c=await t.post(`https://i.instagram.com/api/v1/media/${a.id}/edit_media/`,{media_id:a.id,_csrftoken:window._sharedData.config.csrf_token,_uid:window._sharedData.config.viewerId,_uuid:window._sharedData.config.viewerId,caption_text:m(".post-editor__textarea").value})}catch(o){c={error:o}}var d,p,u,h,g,f,v;"ok"===(null===(l=c)||void 0===l?void 0:l.status)?location.reload():(n.disabled=!1,i.disabled=!1,r.disabled=!1,i.innerText="Save Caption",e.classList.add("post-editor_with-error"),"igtv"===a.productType?s.innerHTML="\n              Instagram refused to edit caption.\n              Please use Instagram Mobile App to edit caption of this post.\n            ":s.innerText=(null===(d=c)||void 0===d||null===(p=d.error)||void 0===p?void 0:p.message)||(null===(u=c)||void 0===u||null===(h=u.error)||void 0===h||null===(g=h.responseObject)||void 0===g?void 0:g.message)||(null===(f=c)||void 0===f||null===(v=f.error)||void 0===v?void 0:v.responseText)||"Unknown error")})),r.addEventListener("click",(()=>{const e=m(ki.general.modal);if(!e)return;const t=new MouseEvent("mousedown",{bubbles:!0});e.dispatchEvent(t)}))}))})),p`
    <style>
      .edit-post-action-button {
        height: 48px;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        background: transparent;
        border: none;
        border-top: 1px solid #dbdbdb;
        cursor: pointer;
      }
      .edit-post-action-button:active {
        background: rgba(0, 0, 0, 0.1);
      }

      .post-editor {
        width: 380px !important;
        max-width: calc(100% - 26px) !important;
      }

      .post-editor__form {
        display: flex;
        flex-direction: column;
        margin: 16px;
        height: 330px;
        max-height: calc(100vh - 26px);
      }

      .post-editor__title {
        font-weight: 500;
        margin-left: 9px;
        margin-bottom: 12px;
      }

      .post-editor__textarea {
        color: #3F3E3F;
        border: 1px solid #EFEFEF;
        background: #F7F7F9;
        border-radius: 4px;
        resize: none;
        padding: 6px 8px;
        flex-grow: 1;
      }
      .post-editor__textarea::placeholder {
        color: #3F3E3F;
        opacity: 0.5;
      }
      .post-editor__textarea:disabled {
        opacity: 0.5;
      }
      .theme-night .post-editor__textarea {
        border-color: #101010;
        background: #060606 !important;
      }

      .post-editor__buttons {
        display: flex;
        flex-direction: row;
        margin-top: 12px;
      }

      .post-editor__error {
        display: none;
        color: #E34E21;
        margin-top: 12px;
        line-height: 19px;
      }
      .post-editor_with-error .post-editor__error {
        display: block;
      }
    </style>
  `}()}};let ki;var Ci={init:async function(){if(Ti=ce.getConfig().igSelectors,Ai=await ue("add-dispatch-listener"),!Ai)return;(function(){const e=Symbol("handled");h((()=>{const t=m(Ti.postCreation.captionContainer);t&&(t[e]||(t[e]=!0,t.insertAdjacentHTML("beforeend",`\n      <div class="post-caption-limits">\n        <svg class="post-caption-limits__icon" xmlns="http://www.w3.org/2000/svg" width="28.824" height="26.006" viewBox="0 0 28.824 26.006">\n          <path d="M10.948 1.999a4 4 0 016.926 0l10.407 18.007a4 4 0 01-3.463 6H4.006a4 4 0 01-3.463-6z" fill="currentColor"/>\n          <path class="exclamation" d="M13.622 17.079l-.748-9.537 2.972.019-.753 9.518zm-.613 1.428h2.7v2.663h-2.7z" fill="#fff"/>\n        </svg>\n        <div class="post-caption-limits__text">${$i}</div>\n      </div>\n    `)))}))})(),p`
    <style>
      .post-caption-limits--show ${Ti.postCreation.captionContainer} {
        padding-bottom: 32px;
      }

      .post-caption-limits--show ${Ti.postCreation.submitPostButton} {
        opacity: 0.3;
        pointer-events: none;
      }

      .post-caption-limits {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0 18px 8px;
        color: #E34E21;
      }
      html:not(.post-caption-limits--show) .post-caption-limits {
        display: none;
      }
      .theme-night .post-caption-limits {
        filter: url(#theme-reverse-filter);
        color: #E94351;
      }

      .post-caption-limits__icon {
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }

      .post-caption-limits__text {
        font-size: 14px;
      }
    </style>
  `,Ai((e=>{if("CREATION_CAPTION_CHANGED"!==e.type)return;const t=e.caption,n=(t.match(/@[\p{L}\d_]+/gu)||[]).length,o=(t.match(/#[\p{L}\d_]+/gu)||[]).length;$i=t.length>Ei?`Caption length exceeded: ${t.length} / ${Ei}`:n>Ri?`Mention limit exceeded: ${n} / ${Ri}`:o>Li?`Hashtag limit exceeded: ${o} / ${Li}`:"",a.classList.toggle("post-caption-limits--show",!!$i);const i=m(".post-caption-limits__text");i&&(i.innerText=$i)}))}};let Ti,Ai,$i="";const Ei=2200,Ri=30,Li=30;var Mi={init:async function(){if(Bi=ce.getConfig().igSelectors,Ii=await ue("http"),Fi=await ue("store"),Di=await ue("add-dispatch-listener"),!Ii||!Fi||!Di)return;!function(){let e=0;const t=Ii.post;Ii.post=async(...i)=>{const r=i[0],s=r.includes("/create/configure/")||r.includes("/igtv/configure_to_igtv/"),a=r.includes("/media/configure_to_clips/"),l=r.includes("/edit_media/"),c=s||a;let d;try{d=await t.call(Ii,...i)}catch(e){if(l&&"AjaxError"===e.name&&""===e.message&&500===e.statusCode&&""===e.networkError)return{status:"ok"};if(!a||"AjaxError"!==e.name||""!==e.message||0!==e.statusCode||""!==e.networkError)throw e;d={status:"fail"}}if(!c)return d;return"fail"===d.status?e<20?(e+=1,requestAnimationFrame((()=>{Fi.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Publishing Post..."}),n()})),setTimeout((()=>{Ii.post(...i)}),5e3),d):(e=0,requestAnimationFrame((()=>{Fi.dispatch({type:"UPDATE_UPLOAD_TEXT",text:d.message?`Error: ${d.message}`:"Unknown error."}),o();const e=m(Bi.general.uploadPanel);if(!e)return;e.insertAdjacentHTML("beforeend",'\n        <button class="retry-upload-button clickable">\n          Retry\n        </button>\n      ');const t=m(".retry-upload-button");t.addEventListener("click",(()=>{Fi.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Publishing Post..."}),n(),Ii.post(...i),t.remove()}))})),d):(e=0,requestAnimationFrame((()=>{Fi.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Done."}),o()})),d)};const n=()=>{if(m(".PublishingDisclaimer"))return;const e=m(Bi.general.publishingBarText);e&&e.insertAdjacentHTML("beforeend",'\n      <div class="PublishingDisclaimer">\n        This might take a minute.\n        Please keep this tab open.\n      </div>\n    ')},o=()=>{const e=m(".PublishingDisclaimer");e&&e.remove()};p`
    <style>
      .PublishingDisclaimer {
        color: #A0A0A0;
        font-weight: 400;
        margin-top: 3px;
      }

      .retry-upload-button {
        font-weight: 600;
        color: #0095f6;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
      }
    </style>
  `}()}};let Bi,Ii,Fi,Di;const zi={init:async function(){this.sel=ce.getConfig().igSelectors,this.store=await ue("store"),this.store&&(Z.on("ig.creation-get-caption",this.getCaption.bind(this)),Z.on("ig.creation-set-caption",this.setCaption.bind(this)),this.watchCreationSession(),this.notifyVideoChange())},getCaption:function(){var e,t;return(null===(e=this.store.getState().creation)||void 0===e||null===(t=e.finalizedMedia)||void 0===t?void 0:t.caption)||""},setCaption:function(e){this.store.dispatch({type:"CREATION_CAPTION_CHANGED",caption:e});const t=m(this.sel.postCreation.captionTextarea);t&&(t.scrollTop=t.scrollHeight)},watchCreationSession:function(){let e=!1,t=!1,n=!1;this.store.subscribe((()=>{var o,i,r,s;const a=this.store.getState(),l=null===(o=a.creation.sourceImage)||void 0===o?void 0:o.file,c=null===(i=a.creation.sourceVideo)||void 0===i?void 0:i.file,d=null===(r=a.storyCreation.sourceImage)||void 0===r?void 0:r.file,p=null===(s=a.storyCreation.sourceVideo)||void 0===s?void 0:s.file,u=!!(l||c||d||p);n!==u&&(n=u,n?(e=!(!d&&!p),t=!(!c&&!p),Z.send("ig.creation-session-start",{isStory:e,isVideo:t})):Z.send("ig.creation-session-end",{isStory:e,isVideo:t}))}))},notifyVideoChange:async function(){let e=null;this.store.subscribe((()=>{var t,n;const o=this.store.getState(),i=null===(t=o.creation)||void 0===t?void 0:t.sourceVideo,r=null===(n=o.storyCreation)||void 0===n?void 0:n.sourceVideo,s=null==i?void 0:i.dataURL,a=null==r?void 0:r.dataURL,l=s||a||null;l!==e&&(e=l,Z.send("ig.creation-video-change",{url:l}))}))}};var Oi={init:async function(){window.ig=mo,ao.init(),o.isIframe()&&async function(){if(!t.get("inssist.isDevelopment"))return;window.store=await mo.require("store"),Object.defineProperty(window,"state",{get:function(){const e=window.store.getState();return JSON.parse(JSON.stringify(e))}});const e=await mo.require("add-dispatch-listener");let n=!1;window.showActions=()=>{n=!0},window.hideActions=()=>{n=!1},e((e=>{n&&console.warn(e)}))}();if(!o.isIframe())return lt.init(),no.init(),void Jn.init();const e=o.isIframe("inssist-ig"),n=o.isIframe("inssist-dm");(e||n)&&(nn(),en.init());if(e)return ue.lock("api"),ue.lock("http"),ue.lock("http:story-assist"),dt.init(),mt.init(),Ut.init(),Xt.init(),Lo.init(),Fo.init(),zo.init(),Ho.init(),Vo.init(),ei.init(),ii.init(),ai.init(),ci.init(),ui.init(),vi.init(),rn.init(),cn.init(),gn.init(),xn.init(),Sn(),go.init(),Pi.init(),Si.init(),Ci.init(),Mi.init(),wt.init(),kn.init(),uo.init(),zi.init(),void Io.init();n&&(await r(),tt.init())}};({init:function(){Oi.init()}}).init()}();