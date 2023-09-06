var De=Object.defineProperty,Be=Object.defineProperties,He=Object.getOwnPropertyDescriptors,se=Object.getOwnPropertySymbols,Re=Object.prototype.hasOwnProperty,je=Object.prototype.propertyIsEnumerable,ie=(e,t,o)=>t in e?De(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,l=(e,t)=>{for(var o in t||(t={}))Re.call(t,o)&&ie(e,o,t[o]);if(se)for(var o of se(t))je.call(t,o)&&ie(e,o,t[o]);return e},p=(e,t)=>Be(e,He(t)),Me=class{get element(){return document.querySelector('meta[name="turbo-boost"]')}get token(){return this.element.getAttribute("content")}get busy(){return this.element.dataset.busy==="true"}set busy(e){return this.element.dataset.busy=!!e}},u=new Me,c={start:"turbo-boost:command:start",success:"turbo-boost:command:success",finish:"turbo-boost:command:finish",abort:"turbo-boost:command:abort",clientError:"turbo-boost:command:client-error",serverError:"turbo-boost:command:server-error"},f={stateLoad:"turbo-boost:state:load",stateChange:"turbo-boost:state:change"},h=l(l({},c),f);function m(e,t,o={}){return new Promise(r=>{o=o||{},o.detail=o.detail||{},t=t||document;let n=new CustomEvent(e,p(l({},o),{bubbles:!0}));t.dispatchEvent(n),r(n)})}var N;function R(e,t=null){if(!e||typeof e!="object")return e;let o=new Proxy(e,{deleteProperty(r,n){return delete r[n],m(f.stateChange,u.element,{detail:{state:N}}),!0},set(r,n,s,i){return r[n]=R(s,this),m(f.stateChange,u.element,{detail:{state:N}}),!0}});if(Array.isArray(e))e.forEach((r,n)=>e[n]=R(r,o));else if(typeof e=="object")for(let[r,n]of Object.entries(e))e[r]=R(n,o);return t||(N=o),o}var qe=R,W,E,C,le;function ce(){if(!u.element)return w();let e=atob(u.element.dataset.state);C={},E=qe(JSON.parse(e)),W=l({},E),delete u.element.dataset.clientStateChange,setTimeout(()=>m(f.stateLoad,u.element,{detail:{state:E}}))}function w(){clearTimeout(le),le=setTimeout(ce,10)}W||ce();addEventListener("DOMContentLoaded",w);addEventListener("load",w);addEventListener("turbo:load",w);addEventListener("turbo:frame-load",w);addEventListener(c.success,w);addEventListener(f.stateChange,e=>{C={};for(let[t,o]of Object.entries(E))W[t]!==o&&(C[t]=o);u.element.dataset.clientStateChange=!0,u.element.dataset.state=btoa(JSON.stringify(E))});var j={events:f,get current(){return E},get delta(){return C},get payloadChunks(){return btoa(JSON.stringify(C)).match(/.{1,2000}/g)}};function Pe(e){let t="<html",o="</html",r=e.indexOf(t),n=e.lastIndexOf(o);if(r>=0&&n>=0){let s=e.slice(e.indexOf(">",r)+1,n);document.documentElement.innerHTML=s}}function Ne(e){document.body.insertAdjacentHTML("beforeend",e)}var A={append:Ne,replaceDocument:Pe},M={};function Ie(e){M[e.id]=e}function ze(e){delete M[e]}var me={add:Ie,remove:ze,get commands(){return[...Object.values(M)]},get length(){return Object.keys(M).length}};function he(e){e.detail.endedAt=Date.now(),e.detail.milliseconds=e.detail.endedAt-e.detail.startedAt,setTimeout(()=>m(c.finish,e.target,{detail:e.detail}),25)}addEventListener(c.serverError,he);addEventListener(c.success,he);addEventListener(c.finish,e=>me.remove(e.detail.id),!0);var X={events:c},z={};addEventListener("turbo:before-fetch-request",e=>{let t=e.target.closest("turbo-frame"),{fetchOptions:o}=e.detail;if(u.busy){let r=["text/vnd.turbo-boost.html",o.headers.Accept];r=r.filter(n=>n&&n.trim().length>0).join(", "),o.headers.Accept=r,o.headers["TurboBoost-Token"]=u.token}j.payloadChunks.forEach((r,n)=>{o.headers[`TurboBoost-State-${n.toString().padStart(4,"0")}`]=r})});addEventListener("turbo:before-fetch-response",e=>{let t=e.target.closest("turbo-frame"),{fetchResponse:o}=e.detail;if(t&&(z[t.id]=t.src),o.header("TurboBoost")){if(o.statusCode<200||o.statusCode>399){let r=`Server returned a ${o.statusCode} status code! TurboBoost Commands require 2XX-3XX status codes.`;m(X.events.clientError,document,{detail:p(l({},e.detail),{error:r})},!0)}o.header("TurboBoost")==="Append"&&(e.preventDefault(),o.responseText.then(r=>A.append(r)))}});addEventListener("turbo:frame-load",e=>{let t=e.target.closest("turbo-frame");t.dataset.turboBoostSrc=z[t.id]||t.src||t.dataset.turboBoostSrc,delete z[t.id]});var _e={frameAttribute:"data-turbo-frame",methodAttribute:"data-turbo-method",commandAttribute:"data-turbo-command",confirmAttribute:"data-turbo-confirm",turboSubmitStartEvent:"turbo:submit-start"},d=l({},_e),ge={method:e=>Promise.resolve(confirm(e))},Fe=e=>e.detail.driver==="method",We=e=>{if(e.detail.driver!=="form")return!1;let t=e.target,o=t.closest("turbo-frame"),r=t.closest(`[${d.frameAttribute}]`);return!!(o||r)},Xe=e=>Fe(e)||We(e);document.addEventListener(c.start,async e=>{let t=e.target.getAttribute(d.confirmAttribute);!t||(e.detail.confirmation=!0,Xe(e))||await ge.method(t)||e.preventDefault()});var Je=ge,b=[],_;function Ge(e,t){let o=b.find(r=>r.name===e);return o&&b.splice(b.indexOf(o),1),b=[{name:e,selectors:t},...b],document.removeEventListener(e,_,!0),document.addEventListener(e,_,!0),l({},b.find(r=>r.name===e))}function Ue(e){return b.find(t=>t.selectors.find(o=>Array.from(document.querySelectorAll(o)).find(r=>r===e)))}function Ve(e,t){let o=Ue(t);return o&&o.name===e}var g={register:Ge,isRegisteredForElement:Ve,get events(){return[...b]},set handler(e){_=e}};function Ke(e){return e.closest(`[${d.commandAttribute}]`)}function Ye(e){return e.closest("turbo-frame[src]")||e.closest("turbo-frame[data-turbo-frame-src]")||e.closest("turbo-frame")}function Qe(e,t={}){if(e.tagName.toLowerCase()!=="select")return t.value=e.value||null;if(!e.multiple)return t.value=e.options[e.selectedIndex].value;t.values=Array.from(e.options).reduce((o,r)=>(r.selected&&o.push(r.value),o),[])}function Ze(e){let t=Array.from(e.attributes).reduce((o,r)=>{let n=r.value;return o[r.name]=n,o},{});return t.tag=e.tagName,t.checked=!!e.checked,t.disabled=!!e.disabled,Qe(e,t),delete t.class,delete t.action,delete t.href,delete t[d.commandAttribute],delete t[d.frameAttribute],t}var J={buildAttributePayload:Ze,findClosestCommand:Ke,findClosestFrameWithSource:Ye};function et(e){var t;if((e==null?void 0:e.formElement)instanceof HTMLFormElement&&(e==null?void 0:e.body)instanceof URLSearchParams&&((t=e==null?void 0:e.fetchRequest)==null?void 0:t.body)instanceof URLSearchParams){e.formData=new FormData(e.formElement);for(let[o,r]of e.formData.entries())e.fetchRequest.body.set(o,r),e.body.set(o,r);return e}}function tt(e,t={},o={}){t.token=u.token;let r=e.querySelector('input[name="turbo_boost_command"]')||document.createElement("input");r.type="hidden",r.name="turbo_boost_command",r.value=JSON.stringify(t),e.appendChild(r),et(o.detail.formSubmission)}var ot={invokeCommand:tt};function rt(e,t={}){let o=document.createElement("a");o.href=e;let r=new URL(o);return r.searchParams.set("turbo_boost_command",JSON.stringify(t)),r}var G={build:rt};function nt(e,t){let o=t.src;t=l({},t),delete t.src,e.src=G.build(o,t)}var ae={invokeCommand:nt};function st(e,t={}){let o=t.src;t=l({},t),delete t.src,delete t.href,e.setAttribute("href",G.build(o,t))}var it={invokeCommand:st};function lt(e){let t=e.target;m(X.events.abort,document,{detail:p(l({},e.detail),{xhr:t})})}function F(e){let t=e.target;t.getResponseHeader("TurboBoost")==="Append"||t.getResponseHeader("Content-Type").startsWith("text/vnd.turbo-boost.html")?A.append(t.responseText):A.replaceDocument(t.responseText);let o=`Server returned a ${t.status} status code! TurboBoost Commands require 2XX-3XX status codes.`;m(X.events.clientError,document,{detail:p(l({},e.detail),{error:o,xhr:t})},!0)}function at(e){let t=e.target;if(t.status<200||t.status>399)return F(e);let o=t.responseText;t.getResponseHeader("TurboBoost")==="Append"||t.getResponseHeader("Content-Type").startsWith("text/vnd.turbo-boost.html")?A.append(t.responseText):A.replaceDocument(t.responseText)}function dt(e){let t=e.src;e=l({},e),delete e.src;try{let o=new XMLHttpRequest;o.open("GET",G.build(t,e),!0),o.setRequestHeader("Accept","text/vnd.turbo-boost.html, text/html, application/xhtml+xml"),o.setRequestHeader("TurboBoost-Token",u.token),j.payloadChunks.forEach((r,n)=>o.setRequestHeader(`TurboBoost-State-${n.toString().padStart(4,"0")}`,r)),o.addEventListener("abort",lt),o.addEventListener("error",F),o.addEventListener("load",at),o.send()}catch(o){let r=`Unexpected error sending HTTP request! ${o.message}`;F(o,{detail:{message:r}})}}var ut={invokeCommand:dt};function I(e,t){return t=t||{dataset:{}},e.href||t.src||t.dataset.turboBoostSrc||location.href}function ct(e){let t=J.findClosestFrameWithSource(e),{turboFrame:o,turboMethod:r}=e.dataset;return e.tagName.toLowerCase()==="form"?{name:"form",reason:"Element is a form.",frame:t,src:e.action,invokeCommand:ot.invokeCommand}:r&&r.length>0?{name:"method",reason:"Element defines data-turbo-method.",frame:t,src:e.href,invokeCommand:it.invokeCommand}:o&&o!=="_self"?(t=document.getElementById(o),{name:"frame",reason:"element targets a frame that is not _self",frame:t,src:I(e,t),invokeCommand:ae.invokeCommand}):(!o||o==="_self")&&t?{name:"frame",reason:"element does NOT target a frame or targets _self and is contained by a frame",frame:t,src:I(e,t),invokeCommand:ae.invokeCommand}:{name:"window",reason:"element matches one or more of the following conditions (targets _top, does NOT target a frame, is NOT contained by a frame)",frame:null,src:I(e),invokeCommand:ut.invokeCommand}}var de={find:ct},q="unknown",be={debug:Object.values(h),info:Object.values(h),warn:[h.abort,h.clientError,h.serverError],error:[h.clientError,h.serverError],unknown:[]};Object.values(h).forEach(e=>{addEventListener(e,t=>{if(be[q].includes(t.type)){let{target:o,detail:r}=t;console[q](t.type,{target:o,detail:r})}})});var mt={get level(){return q},set level(e){return Object.keys(be).includes(e)||(e="unknown"),q=e}};function ht(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))}var gt={v4:ht};function ue(e,t){return{id:e,name:t.getAttribute(d.commandAttribute),elementId:t.id.length>0?t.id:null,elementAttributes:J.buildAttributePayload(t),startedAt:Date.now()}}async function bt(e){let t,o={};try{if(t=J.findClosestCommand(e.target),!t||!g.isRegisteredForElement(e.type,t))return;let r=`turbo-command-${gt.v4()}`,n=de.find(t),s=p(l({},ue(r,t)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),i=await m(c.start,t,{cancelable:!0,detail:s});if(i.defaultPrevented||i.detail.confirmation&&e.defaultPrevented)return m(c.abort,t,{detail:{message:`An event handler for '${c.start}' prevented default behavior and blocked command invocation!`,source:i}});switch(n=de.find(t),s=p(l({},ue(r,t)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),me.add(s),["frame","window"].includes(n.name)&&e.preventDefault(),u.busy=!0,setTimeout(()=>u.busy=!1,10),n.name){case"method":return n.invokeCommand(t,s);case"form":return n.invokeCommand(t,s,e);case"frame":return n.invokeCommand(n.frame,s);case"window":return n.invokeCommand(s)}}catch(r){m(c.clientError,t,{detail:p(l({},o),{error:r})})}}self.TurboBoost=self.TurboBoost||{};self.TurboBoost=p(l({},self.TurboBoost),{stateEvents:f,get state(){return j.current},get stateDelta(){return j.delta}});self.TurboBoost.Commands||(g.handler=bt,g.register("click",[`[${d.commandAttribute}]`]),g.register("submit",[`form[${d.commandAttribute}]`]),g.register(d.turboSubmitStartEvent,[`form[${d.commandAttribute}]`]),g.register("change",[`input[${d.commandAttribute}]`,`select[${d.commandAttribute}]`,`textarea[${d.commandAttribute}]`]),self.TurboBoost.Commands={confirmation:Je,logger:mt,schema:d,events:c,registerEventDelegate:g.register,get eventDelegates(){return g.events}});var Nt=self.TurboBoost.Commands;var pt=Object.defineProperty,ft=Object.defineProperties,vt=Object.getOwnPropertyDescriptors,pe=Object.getOwnPropertySymbols,yt=Object.prototype.hasOwnProperty,Et=Object.prototype.propertyIsEnumerable,fe=(e,t,o)=>t in e?pt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,T=(e,t)=>{for(var o in t||(t={}))yt.call(t,o)&&fe(e,o,t[o]);if(pe)for(var o of pe(t))Et.call(t,o)&&fe(e,o,t[o]);return e},k=(e,t)=>ft(e,vt(t));function wt(e){let t=document.createElement("template");return t.innerHTML=e,t}function ee(e,t){t=t||document.body;let o=wt(e).content.cloneNode(!0).querySelector("*");return t.appendChild(o)}function U(e,t={}){if(!e)return;Q(e);let{outline:o,outlineOffset:r}=t;o=o||"dashed 3px red",r=r||"0px",e.originalStyles=e.originalStyles||{display:e.style.display,minHeight:e.style.minHeight,minWidth:e.style.minWidth,outline:e.style.outline,outlineOffset:e.style.outlineOffset},getComputedStyle(e).display.match(/^inline$/i)&&e.offsetWidth===0&&e.offsetHeight===0&&(e.style.display="inline-block",e.style.minHeight="2px",e.style.minWidth="2px"),e.style.outline=o,e.style.outlineOffset=r,e.dataset.turboBoostHighlight=!0}function Q(e){if(e){if(e.originalStyles){for(let[t,o]of Object.entries(e.originalStyles))o?e.style[t]=o:e.style[t]="";delete e.originalStyles}delete e.dataset.turboBoostHighlight}}function V(e){if(!e)return{};let t=e.getBoundingClientRect(),o=e.offsetWidth,r=e.offsetHeight,n=t.top+window.scrollY,s=t.left+window.scrollX,i=s+o,L=n+r;return{top:n,left:s,right:i,bottom:L,width:o,height:r}}function $(e){try{e()}catch(t){}}var Tt=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.html,this.labelElement.addEventListener("click",e=>{e.preventDefault(),this.toggle()}),this.checkboxElement.addEventListener("change",e=>this.dispatchEvent(new CustomEvent("change",{bubbles:!0})))}toggle(){this.checked?this.uncheck():this.check()}check(){this.checkboxElement.checked=!0,this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}uncheck(){this.checkboxElement.checked=!1,this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}get name(){return this.getAttribute("name")}get checked(){return this.checkboxElement.checked}get checkboxElement(){return this.shadowRoot.querySelector("input")}get labelElement(){return this.shadowRoot.querySelector("label")}get html(){return`
      <style>${this.stylesheet}</style>
      <div>
        <input name="checkbox" type="checkbox">
        <label for="checkbox"><slot name="label"></slot></label>
      </div>
    `}get stylesheet(){return`
      :host, :host * {
        cursor: pointer;
      }

      div {
        display: flex;
        margin-right: 10px;
      }

      input:checked + label{
        font-weight: bold;
      }

      label {
        color: black;
      }
    `}},kt=class extends HTMLElement{constructor(){super(),this.enabledDevtools={},this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.html,this.shadowRoot.querySelector("button").addEventListener("click",()=>this.dispatchEvent(new CustomEvent("turbo-boost:devtools-close",{bubbles:!0}))),this.addEventListener("change",e=>{let t=e.target,{checked:o,name:r}=t;o?this.enableDevtool(r):this.disableDevtool(r)})}enableDevtool(e){this.enabledDevtools[e]||(this.enabledDevtools[e]=!0,this.dispatchEvent(new CustomEvent("turbo-boost:devtool-enable",{bubbles:!0,detail:{name:e}})))}disableDevtool(e){this.enabledDevtools[e]&&(delete this.enabledDevtools[e],this.dispatchEvent(new CustomEvent("turbo-boost:devtool-disable",{bubbles:!0,detail:{name:e}})))}close(){this.devtoolElements.forEach(e=>{e.checked&&e.uncheck()}),this.remove()}get devtoolElements(){return this.querySelectorAll('[slot="devtool"]')}get closeElement(){return this.querySelector("button")}get html(){return`
      <style>${this.stylesheet}</style>
      <div>
        <img src="https://ik.imagekit.io/hopsoft/turbo-boost-logo_zHiiimlvT.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1671722004342">
        <slot name="devtool"></slot>
        <button>\u2715</button>
      </div>
    `}get stylesheet(){return`
      :host {
        background-color: gainsboro;
        border-radius: 5px;
        bottom: 20px;
        display: block;
        filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.3));
        left: 50%;
        outline-offset: 1px;
        outline: solid 2px black;
        padding: 5px 10px;
        position: fixed;
        transform: translateX(-50%);
        z-index: 8999;
      }

      * {
        -webkit-user-select: none;
        font-family: helvetica, sans-serif;
        font-size: 1rem;
        user-select: none;
      }

      img {
        align-self: center;
        cursor: grab;
        height: 25px;
        margin-left: -5px;
        vertical-align: middle;
      }

      div {
        display: flex;
        gap: 0 5px;
        position: relative;
      }

      [slot="devtool"] {
        align-self: center;
      }

      button {
        align-self: center;
        background-color: darkgray;
        border-radius: 50%;
        border: none;
        color: black;
        cursor: pointer;
        font-size: 10px;
        height: 18px;
        line-height: 18px;
        margin-right: -5px;
        opacity: 0.5;
        outline: solid 1px black;
        padding: 0 2px;
        width: 18px;
      }

      button:hover {
        opacity: 1;
      }
    `}},xt=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.html}connectedCallback(){let e=localStorage.getItem(`turbo-boost-devtools-${location.href}-${this.id}-transform`);e&&(this.style.transform=e)}disconnectedCallback(){this.id!=="undefined"&&this.id!==""&&localStorage.setItem(`turbo-boost-devtools-${location.href}-${this.id}-transform`,this.style.transform)}get color(){return this.getAttribute("color")||"darkslategray"}get backgroundColor(){return this.getAttribute("background-color")||"gainsboro"}get position(){return this.getAttribute("position")||"top"}get html(){return`
      <style>${this.stylesheet}</style>
      <div role="container">
        <div role="title">
          <slot name="title"></slot>
          <img src="https://ik.imagekit.io/hopsoft/turbo-boost-logo_zHiiimlvT.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1671722004342">
        </div>
        <slot name="subtitle"></slot>
        <slot name="content-top"></slot>
        <slot name="content"></slot>
        <slot name="content-bottom"></slot>
      </div>
    `}get stylesheet(){return`
      :host {
        display: block;
        position: absolute;
        z-index: 8999;
      }

      * {
        color: ${this.color}
        font-size: 1rem;
      }

      [role="container"] {
        background-color: ${this.backgroundColor};
        border-radius: 15px;
        filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.3));
        font-family: monospace;
        min-height: 30px;
        min-width: 100px;
        opacity: 0.9;
        outline-offset: 1px;
        outline: dashed 3px ${this.color};
        padding: 12px;
        position: relative;
        white-space: nowrap;
      }

      [role="title"] {
        display: flex;
      }

      [role="title"] slot[name="title"] {
        color: ${this.color};
        display: block;
        flex-grow: 1;
        font-weight: bold;
      }

      [role="title"] img {
        height: 25px;
        vertical-align: middle;
      }

      slot[name="subtitle"] {
        border-bottom: dotted 1px ${this.color};
        border-top: dotted 1px ${this.color};
        color: ${this.color};
        display: block;
        font-size: 0.8rem;
        font-weight: lighter;
        margin-bottom: 12px;
        margin-top: 8px;
        padding-bottom: 4px;
        padding-top: 4px;
        width: 100%;
      }

      slot[name="content-top"],
      slot[name="content"],
      slot[name="content-bottom"] {
        display: block;
        font-weight: normal;
      }

      slot[name="content-top"] {
        color: ${this.color};
        margin-bottom: 8px;
      }

      slot[name="content"],
      slot[name="content-bottom"] {
        opacity: 0.7;
        padding-left: 12px;
      }

      slot[name="content"] {
        color: ${this.color};
      }

      slot[name="content-bottom"] {
        color: red;
      }
    `}},x=[],Lt={LeaderLine:{src:"https://cdnjs.cloudflare.com/ajax/libs/leader-line/1.0.7/leader-line.min.js",integrity:"sha512-0dNdzMjpT6pJdFGF1DwybFCfm3K/lzHhxaMXC/92J9/DZujHlqYFqmhTOAoD0o+LkeEsVK2ar/ESs7/Q2B6wJg==",global:"LeaderLine"},PlainDraggable:{src:"https://cdn.jsdelivr.net/npm/plain-draggable@2.5.14/plain-draggable.min.js",global:"PlainDraggable"}};function St(e){return e.global&&self[e.global]||document.querySelector(`[src='${e.src}']`)?!0:x.includes(e)}function Ct(e){if(St(e))return;x.push(e);let{src:t,integrity:o}=e,r=document.createElement("script");r.setAttribute("src",t),r.setAttribute("crossorigin","anonymous"),r.setAttribute("referrerpolicy","no-referrer"),o&&r.setAttribute("integrity",o),document.head.appendChild(r)}function ye(e){if(!x.includes(e))return;x.splice(x.indexOf(e),1);let{src:t}=e,o=document.querySelector(`script[src='${t}']`);o&&o.remove(),e.global&&self[e.global]&&(self[e.global]=null)}function At(){[...x].forEach(e=>ye(e))}var O=k(T({},Lt),{add:Ct,remove:ye,removeAll:At});customElements.define("turbo-boost-devtool",Tt);customElements.define("turbo-boost-devtool-supervisor",kt);customElements.define("turbo-boost-devtool-tooltip",xt);var a;function Ee(){if(a)try{new PlainDraggable(a)}catch(e){setTimeout(Ee,200)}}function te(){Te()||(a.close(),a.dispatchEvent(new CustomEvent("turbo-boost:devtools-stop",{bubbles:!0})),a=null,O.removeAll())}function we(){P()||(O.add(O.LeaderLine),O.add(O.PlainDraggable),a=ee("<turbo-boost-devtool-supervisor></turbo-boost-devtool-supervisor>"),setTimeout(Ee,200),a.dispatchEvent(new CustomEvent("turbo-boost:devtools-start",{bubbles:!0})))}function $t(){let e=a?Object.keys(a.enabledDevtools):[];te(),we(),a.devtoolElements.forEach(t=>{e.includes(t.name)&&t.check()})}function P(){return!!a}function Te(){return!P()}var ve;function ke(){clearTimeout(ve),ve=setTimeout($t,25)}function D(){P()&&ke()}addEventListener("turbo:load",D);addEventListener("turbo-frame:load",D);addEventListener("turbo-boost:devtools-connect",D);addEventListener("turbo-boost:devtools-close",te);window.TurboBoost&&(addEventListener(TurboBoost.Commands.events.success,D),addEventListener(TurboBoost.Commands.events.finish,D));function Ot(e,t){if(a)return ee(`
      <turbo-boost-devtool name="${e}" slot="devtool">
        <span slot="label">${t}</span>
      </turbo-boost-devtool>
    `,a)}function Dt(e){return a?a.enabledDevtools[e]:!1}var Z={enabled:Dt,register:Ot,start:we,stop:te,restart:ke,get started(){return P()},get stopped(){return Te()}};function K(e,t,o,r={}){let{backgroundColor:n,color:s,position:i,id:L}=r;return s=s||"white",i=i||"top",ee(`
    <turbo-boost-devtool-tooltip id="${L}" position="${i}" background-color="${n}" color="${s}">
      <div slot='title'>${e}</div>
      <div slot='subtitle'>${t}</div>
      ${o}
    </turbo-boost-devtool-tooltip>
  `)}var Y,oe=class{constructor(e){this.delegate=e;let t,o=()=>{clearTimeout(t),t=setTimeout(this.hide({active:!1}),25)};this.eventListeners["turbo-boost:devtool-enable"]=r=>{let{name:n}=r.detail;n===this.delegate.name&&(U(this.delegate.triggerElement,{outline:"3px dashed blueviolet",outlineOffset:"2px"}),this.hide({active:!1}),this.active&&this.show())},this.eventListeners["turbo-boost:devtool-disable"]=r=>{let{name:n}=r.detail;n===this.delegate.name&&Q(this.delegate.triggerElement)},this.eventListeners.click=r=>{r.target.closest("turbo-boost-devtool-tooltip")||o()},this.eventListeners["turbo:load"]=o,this.eventListeners["turbo-frame:load"]=o,window.TurboBoost&&(this.eventListeners[TurboBoost.Commands.events.finish]=o),this.registerEventListeners()}registerEventListeners(){Object.entries(this.eventListeners).forEach(([e,t])=>{addEventListener(e,t)})}unregisterEventListeners(){Object.entries(this.eventListeners).forEach(([e,t])=>{removeEventListener(e,t)})}get eventListeners(){return this._eventListeners||(this._eventListeners={})}show(){if(!this.enabled||this.active)return;this.active=!0,this.hide({active:!0}),U(this.delegate.targetElement,{outline:"3px dashed darkcyan",outlineOffset:"-2px"}),U(this.delegate.morphElement,{outline:"3px dashed chocolate",outlineOffset:"3px"}),this.renderingTooltip=this.createRenderingTooltip(),this.targetTooltip=this.createTargetTooltip(),this.triggerTooltip=this.createTriggerTooltip(this.targetTooltip,this.renderingTooltip),document.querySelectorAll(".leader-line").forEach(t=>t.style.zIndex=1e5);let e={morph:{partial:this.delegate.triggerElement.renders,id:this.delegate.triggerElement.morphs,status:this.delegate.morphElement?"OK":"Not Found"},trigger:{partial:null,id:null,status:"Not Found"},target:{partial:null,id:null,status:"Not Found"}};this.delegate.triggerElement&&(e.trigger={partial:this.delegate.triggerElement.partial,id:this.delegate.triggerElement.id,status:"OK"},e.target.id=this.delegate.triggerElement.controls),this.delegate.targetElement&&(e.target={partial:this.delegate.targetElement.partial,dom_id:this.delegate.targetElement.id,status:"OK"}),console.table(e)}hide({active:e=!1}){document.querySelectorAll("turbo-boost-devtool-tooltip").forEach(t=>{$(()=>t.line.remove()),$(()=>t.drag.remove()),$(()=>t.lineToRendering.remove()),$(()=>t.lineToTarget.remove()),$(()=>t.remove())}),document.querySelectorAll("[data-turbo-boost-highlight]").forEach(t=>{t.tagName.match(/turbo-boost-toggle-trigger/i)||Q(t)}),this.active=e}get active(){return Y===this.delegate}set active(e){e?Y=this.delegate:Y=null}get enabled(){return Z.enabled(this.delegate.name)}static register(e,t){Z.register(e,t)}createRenderingTooltip(){if(!this.delegate.triggerElement.renders)return console.debug("Unable to create the rendering tooltip! The trigger element must set the 'renders' attribute.");if(!this.delegate.triggerElement.morphs)return console.debug(`Unable to create the rendering tooltip! The trigger element specified the 'morphs' attrbiute but no element matches the DOM id: '${this.triggerElement.morphs}'`);let e=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
      RENDERING - &lt;${this.delegate.triggerElement.tagName.toLowerCase()}&gt;
    `,t=`
      <b>partial</b>: ${this.delegate.triggerElement.renders||"unknown"}<br>
      <b>morphs</b>: ${this.delegate.triggerElement.morphs||"unknown"}<br>
    `,o=K(e,t,`
      <div slot="content-top" style="font-size:85%; font-style:italic; font-weight:100;">
        The <b>TRIGGER</b> toggles the <b>TARGET</b> then renders the partial &amp; morphs the element.<br>
      </div>
    `,{id:`${this.delegate.id}-rendering`,backgroundColor:"lightyellow",color:"chocolate"}),r=V(this.delegate.morphElement),n=Math.ceil(r.top+r.height/2-o.offsetHeight/2),s=Math.ceil(r.left+r.width+100);return o.style.top=`${n}px`,o.style.left=`${s}px`,o.line=new LeaderLine(o,this.delegate.morphElement,k(T({},this.leaderLineOptions),{color:"chocolate"})),o.drag=new PlainDraggable(o),o}createTargetTooltip(){var e,t;if(!this.delegate.targetElement)return console.debug(`Unable to create the target tooltip! No element matches the DOM id: '${this.delegate.triggerElement.controls}'`);let o=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
      TARGET - &lt;${this.delegate.targetElement.tagName.toLowerCase()}&gt;
    `,r=K(o,((e=this.delegate.targetTooltipData)==null?void 0:e.subtitle)||"",((t=this.delegate.targetTooltipData)==null?void 0:t.content)||"",{id:`${this.delegate.id}-target`,backgroundColor:"lightcyan",color:"darkcyan",position:"bottom"}),n=V(this.delegate.targetElement),s=Math.ceil(n.top+r.offsetHeight),i=Math.ceil(n.left+n.width+r.offsetWidth/3);return r.style.top=`${s}px`,r.style.left=`${i}px`,r.line=new LeaderLine(r,this.delegate.targetElement,k(T({},this.leaderLineOptions),{color:"darkcyan"})),r.drag=new PlainDraggable(r),r}createTriggerTooltip(e,t){var o,r;if(!this.delegate.triggerElement)return;let n=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      TRIGGER - &lt;${this.delegate.triggerElement.tagName.toLowerCase()}&gt;
    `,s=K(n,((o=this.delegate.triggerTooltipData)==null?void 0:o.subtitle)||"",((r=this.delegate.triggerTooltipData)==null?void 0:r.content)||"",{id:`${this.delegate.id}-trigger`,backgroundColor:"lavender",color:"blueviolet"}),i=V(this.delegate.triggerElement),L=Math.ceil(i.top-s.offsetHeight*2),Oe=Math.ceil(i.left+i.width+s.offsetWidth/3);return s.style.top=`${L}px`,s.style.left=`${Oe}px`,s.line=new LeaderLine(this.delegate.triggerElement,s,k(T({},this.leaderLineOptions),{color:"blueviolet"})),e&&(s.lineToTarget=new LeaderLine(s,e,k(T({},this.leaderLineOptions),{color:"blueviolet",middleLabel:this.delegate.targetLineLabel,size:2.1})),e.drag.onMove=()=>{var S,ne;e.line.position(),(S=s.lineToTarget)==null||S.position(),(ne=s.lineToRendering)==null||ne.position()}),t&&(s.lineToRendering=new LeaderLine(s,t,k(T({},this.leaderLineOptions),{color:"blueviolet",middleLabel:this.delegate.renderingLineLabel,size:2.1})),t.drag.onMove=()=>{var S;t.line.position(),s.lineToTarget&&s.lineToTarget.position(),(S=s.lineToRendering)==null||S.position()}),s.drag=new PlainDraggable(s),s.drag.onMove=()=>{s.line.position(),s.lineToTarget&&s.lineToTarget.position(),s.lineToRendering&&s.lineToRendering.position()},s}get leaderLineOptions(){return{dash:{animation:!0},dropShadow:{opacity:.3},endPlug:"arrow3",endPlugSize:1.7,size:3,startPlug:"disc",startPlugSize:1}}},{restart:Bt,start:Ht,stop:Rt}=Z;function xe(e,t,o){Object.assign(e,{initializeDevtool(){let r=()=>this.devtool.show();addEventListener("turbo-boost:devtools-start",()=>{this.devtool=new oe(this),this.addEventListener("mouseenter",r)}),addEventListener("turbo-boost:devtools-stop",()=>{this.removeEventListener("mouseenter",r),this.removeDevtool()}),this.dispatchEvent(new CustomEvent("turbo-boost:devtools-connect",{bubbles:!0}))},hideDevtool(){var r;(r=this.devtool)==null||r.hide({active:!1})},removeDevtool(){this.devtool.hide({active:!1}),this.devtool.unregisterEventListeners(),delete this.devtool},name:t,targetLineLabel:o}),["triggerElement","morphElement","targetElement"].filter(r=>e[r]===void 0).forEach(r=>{Object.defineProperty(e,r,{get(){return e}})})}var Le={restart:Bt,start:Ht,stop:Rt};var v=class extends HTMLElement{constructor(t){super(),this.devtool="unknown",this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=t||"<slot></slot>"}connectedCallback(){this.ensureId()}ensureId(){this.id.trim().length||(this.id=`${this.tagName}-${this.uuidv4()}`.toLowerCase())}uuidv4(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}get viewStack(){let t=this.getAttribute("view-stack");return t?JSON.parse(t):[]}get partial(){return this.viewStack[0]}};var jt=`
  <turbo-boost>
    <slot name="busy" hidden></slot>
    <slot></slot>
  </turbo-boost>
`,Se=100,re=400,y=class extends v{constructor(){super(jt)}showBusyElement(){clearTimeout(this.showBusyElementTimeout),clearTimeout(this.hideBusyElementTimeout),this.busyElement&&(this.busyStartedAt=Date.now()+Se,this.showBusyElementTimeout=setTimeout(()=>{this.busySlotElement.hidden=!1,this.defaultSlotElement.hidden=!0},Se))}hideBusyElement(){if(clearTimeout(this.showBusyElementTimeout),clearTimeout(this.hideBusyElementTimeout),!this.busyElement)return;let t=re-(Date.now()-this.busyStartedAt);t<0&&(t=0),delete this.busyStartedAt,this.hideBusyElementTimeout=setTimeout(()=>{this.busySlotElement.hidden=!0,this.defaultSlotElement.hidden=!1},t)}get busyElement(){return this.querySelector(':scope > [slot="busy"]')}get busySlotElement(){return this.shadowRoot.querySelector('slot[name="busy"]')}get defaultSlotElement(){return this.shadowRoot.querySelector("slot:not([name])")}get busy(){return this.getAttribute("busy")==="true"}set busy(t){t=!!t,this.busy!==t&&(this.setAttribute("busy",t),t?this.showBusyElement():this.hideBusyElement())}get busyStartedAt(){return this.dataset.busyStartedAt?Number(this.dataset.busyStartedAt):0}set busyStartedAt(t){this.dataset.busyStartedAt=t}};var B=class extends y{connectedCallback(){super.connectedCallback(),this.mouseenterHandler=this.onMouseenter.bind(this),this.addEventListener("mouseenter",this.mouseenterHandler),this.collapseHandler=this.collapse.bind(this),this.collapseNowHandler=this.collapseNow.bind(this),this.collapseOn.forEach(t=>{let o=t.split("@"),r=o[0];o.length>1?(o[1].match(/^self|window$/)?self:self[o[1]]).addEventListener(r,this.collapseNowHandler):this.addEventListener(r,this.collapseHandler)})}disconnectedCallback(){this.removeEventListener("mouseenter",this.mouseenterHandler),this.collapseOn.forEach(t=>{let o=t.split("@"),r=o[0];o.length>1?(o[1].match(/^self|window$/)?self:self[o[1]]).removeEventListener(r,this.collapseNowHandler):this.removeEventListener(r,this.collapseHandler)})}cacheHTML(){}renderCachedHTML(){}onMouseenter(){clearTimeout(this.collapseTimeout)}collapse(t=250){if(clearTimeout(this.collapseTimeout),!this.busy){if(typeof t!="number"&&(t=250),t>0)return this.collapseTimeout=setTimeout(()=>this.collapse(0),t);this.innerHTML="";try{this.expanded=!1,this.triggerElement.hideDevtool()}catch(o){}}}collapseNow(t){t.target.closest("turbo-boost-devtool-tooltip")||this.collapse(0)}collapseMatches(){document.querySelectorAll(this.collapseSelector).forEach(t=>{t.id!==this.id&&t.collapse&&t.collapse(0)})}get collapseSelector(){return this.triggerElement.collapseSelector||this.getAttribute("collapse-selector")}get focusSelector(){return this.getAttribute("focus-selector")}get triggerElement(){return document.getElementById(this.labeledBy)}get triggerElements(){return document.querySelectorAll(`[aria-controls="${this.id}"]`)}get labeledBy(){return this.getAttribute("aria-labeledby")}set labeledBy(t){return this.setAttribute("aria-labeledby",t)}get collapseOn(){let t=this.getAttribute("collapse-on");return t?JSON.parse(t):[]}get expanded(){return this.triggerElement?this.triggerElement.expanded:!1}set expanded(t){this.triggerElements.forEach(o=>o.expanded=t)}get busy(){return this.triggerElement&&this.triggerElement.busy}};var Ce;function Mt(e){["bold","bullet","code","heading1","href","italic","number","quote","strike"].forEach(o=>e.deactivateAttribute(o))}function qt(e){if(e.value.length===0)return;let t=e.editor,o=[];for(;o[0]!==t.getSelectedRange()[0]&&o[1]!==t.getSelectedRange()[1];)o=t.getSelectedRange(),t.moveCursorInDirection("forward");t.insertString(" "),t.moveCursorInDirection("forward"),t.setSelectedRange([o[1],t.getSelectedRange()[1]]),Mt(t),t.setSelectedRange([t.getSelectedRange()[1],t.getSelectedRange()[1]])}function Pt(e){clearTimeout(Ce),Ce=setTimeout(()=>{if(!e)return;e.focus();let t=e.closest("trix-editor");try{t?qt(t):e.selectionStart=e.selectionEnd=e.value.length}catch(o){}finally{e.scrollIntoView({block:"center",behavior:"smooth"})}},100)}var Ae=e=>Pt(e);document.addEventListener("turbo-boost:devtools-start",()=>oe.register("toggle","toggles"));var $e,H=class extends y{constructor(){super(),xe(this,"toggle","toggles")}connectedCallback(){super.connectedCallback();let{start:t}=TurboBoost.Commands.events;this.commandStartHandler=this.onCommandStart.bind(this),this.addEventListener(t,this.commandStartHandler);let{before:o}=TurboBoost.Streams.invokeEvents;this.beforeInvokeHandler=this.onBeforeInvoke.bind(this),addEventListener(o,this.beforeInvokeHandler),this.initializeDevtool()}disconnectedCallback(){setTimeout(()=>{let{start:t}=TurboBoost.Commands.events;this.removeEventListener(t,this.commandStartHandler);let{before:o}=TurboBoost.Streams.invokeEvents;removeEventListener(o,this.beforeInvokeHandler),this.removeDevtool()},1e3)}onCommandStart(t){$e=this.focusSelector,this.targetElement.labeledBy=this.id,this.targetElement.collapseMatches(),this.busy=!0}onBeforeInvoke(t){if(t.detail.method!=="morph"||t.target.id!==this.morphs)return;let o=`turbo-boost-toggle-target[aria-labeledby="${this.id}"]`;if(!t.target.querySelector(o))return;let r=Date.now()-this.busyStartedAt,n=re-r;n<10&&(n=10),t.detail.invoke={delay:n},setTimeout(()=>{this.busy=!1,this.morphToggleTriggerElements.forEach(s=>s.busy=!1)},n-10),setTimeout(()=>Ae(this.targetElement.querySelector($e)),n+100)}get sharedViews(){if(!this.targetElement)return[];if(!this.targetElement.viewStack)return[];let t=(o,r)=>(this.targetElement.viewStack.includes(r)&&o.push(r),o);return this.viewStack.reduce(t.bind(this),[])}get renders(){return this.getAttribute("renders")}get morphs(){return this.getAttribute("morphs")}get morphToggleTriggerElements(){return Array.from(this.morphElement.querySelectorAll("turbo-boost-toggle-trigger"))}get controls(){return this.getAttribute("aria-controls")}get collapseSelector(){return this.getAttribute("collapse-selector")}get focusSelector(){return this.getAttribute("focus-selector")||this.targetElement.focusSelector}get remember(){return this.getAttribute("remember")==="true"}set remember(t){return this.setAttribute("remember",!!t)}get expanded(){return this.getAttribute("aria-expanded")==="true"}set expanded(t){this.setAttribute("aria-expanded",!!t)}get collapsed(){return!this.expanded}get command(){return this.dataset.turboCommand}get renderingLineLabel(){return"renders & morphs"}get morphElement(){return this.morphs?document.getElementById(this.morphs):null}get targetElement(){return this.controls?document.getElementById(this.controls):null}get triggerTooltipData(){let t=this.triggerElement.viewStack.reverse().map((o,r)=>this.triggerElement.sharedViews.includes(o)?`<div slot="content">${r+1}. ${o}</div>`:`<div slot="content-bottom">${r+1}. ${o}</div>`,this).join("");return{subtitle:`
      <b>id</b>: ${this.triggerElement.id}<br>
      <b>aria-controls</b>: ${this.triggerElement.controls}<br>
      <b>aria-expanded</b>: ${this.triggerElement.expanded}<br>
      <b>remember</b>: ${this.triggerElement.remember}<br>
    `,content:`
      <div slot="content-top">
        <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        <b>View Stack</b>
      </div>
      ${t}
    `}}get targetTooltipData(){let t=this.targetElement.viewStack.reverse().map((o,r)=>this.triggerElement.sharedViews.includes(o)?`<div slot="content">${r+1}. ${o}</div>`:`<div slot="content-bottom">${r+1}. ${o}</div>`,this).join("");return{subtitle:`<b>id</b>: ${this.targetElement.id}<br>
      <b>aria-labeled-by</b>: ${this.targetElement.labeledBy}<br>
`,content:`
      <div slot="content-top">
        <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        <b>View Stack</b>
      </div>
      ${t}
    `}}};customElements.define("turbo-boost",v);customElements.define("turbo-boost-toggle-target",B);customElements.define("turbo-boost-toggle-trigger",H);self.TurboBoost=self.TurboBoost||{};self.TurboBoost.devtools=Le;self.TurboBoost.Elements={};var uo=self.TurboBoost.Elements;export{uo as default};
//# sourceMappingURL=elements.js.map
