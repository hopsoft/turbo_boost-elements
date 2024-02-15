var $e=Object.defineProperty,Oe=Object.defineProperties,De=Object.getOwnPropertyDescriptors,ne=Object.getOwnPropertySymbols,Be=Object.prototype.hasOwnProperty,He=Object.prototype.propertyIsEnumerable,ie=(e,t,o)=>t in e?$e(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,l=(e,t)=>{for(var o in t||(t={}))Be.call(t,o)&&ie(e,o,t[o]);if(ne)for(var o of ne(t))He.call(t,o)&&ie(e,o,t[o]);return e},b=(e,t)=>Oe(e,De(t)),c={start:"turbo-boost:command:start",success:"turbo-boost:command:success",finish:"turbo-boost:command:finish",abort:"turbo-boost:command:abort",clientError:"turbo-boost:command:client-error",serverError:"turbo-boost:command:server-error"},v={stateLoad:"turbo-boost:state:load",stateChange:"turbo-boost:state:change"},h=l(l({},c),v);function u(e,t,o={}){return new Promise(r=>{o=o||{},o.detail=o.detail||{},t=t||document;let n=new CustomEvent(e,b(l({},o),{bubbles:!0}));t.dispatchEvent(n),r(n)})}var M;function $(e,t=null){if(!e||typeof e!="object")return e;let o=new Proxy(e,{deleteProperty(r,n){return delete r[n],u(v.stateChange,document,{detail:{state:M}}),!0},set(r,n,i,s){return r[n]=$(i,this),u(v.stateChange,document,{detail:{state:M}}),!0}});if(Array.isArray(e))e.forEach((r,n)=>e[n]=$(r,o));else if(typeof e=="object")for(let[r,n]of Object.entries(e))e[r]=$(n,o);return t||(M=o),o}var Re=$,_,O,F,de;function je(e,t){let o=JSON.parse(e);_=l({},o),de=t,O=Re(o),F={},setTimeout(()=>u(v.stateLoad,document,{detail:{state:O}}))}addEventListener(v.stateChange,e=>{for(let[t,o]of Object.entries(O))_[t]!==o&&(F[t]=o)});var N={initialize:je,events:v,get initial(){return _},get current(){return O},get changed(){return F},get signed(){return de}};function Me(e){let t="<html",o="</html",r=e.indexOf(t),n=e.lastIndexOf(o);if(r>=0&&n>=0){let i=e.slice(e.indexOf(">",r)+1,n);document.documentElement.innerHTML=i}}function Pe(e){document.body.insertAdjacentHTML("beforeend",e)}var D={append:Pe,replaceDocument:Me},B={};function Ne(e){B[e.id]=e}function qe(e){delete B[e]}var ce={add:Ne,remove:qe,get commands(){return[...Object.values(B)]},get length(){return Object.keys(B).length}};function ue(e){e.detail.endedAt=Date.now(),e.detail.milliseconds=e.detail.endedAt-e.detail.startedAt,setTimeout(()=>u(c.finish,e.target,{detail:e.detail}),25)}addEventListener(c.serverError,ue);addEventListener(c.success,ue);addEventListener(c.finish,e=>ce.remove(e.detail.id),!0);var W={events:c},q={};addEventListener("turbo:before-fetch-request",e=>{var t,o;let r=e.target.closest("turbo-frame"),{fetchOptions:n}=e.detail;if((o=(t=self.TurboBoost)==null?void 0:t.Commands)!=null&&o.busy){let i=["text/vnd.turbo-boost.html",n.headers.Accept];i=i.filter(s=>s&&s.trim().length>0).join(", "),n.headers.Accept=i}});addEventListener("turbo:before-fetch-response",e=>{let t=e.target.closest("turbo-frame"),{fetchResponse:o}=e.detail;if(t&&(q[t.id]=t.src),o.header("TurboBoost")){if(o.statusCode<200||o.statusCode>399){let r=`Server returned a ${o.statusCode} status code! TurboBoost Commands require 2XX-3XX status codes.`;u(W.events.clientError,document,{detail:b(l({},e.detail),{error:r})},!0)}o.header("TurboBoost")==="Append"&&(e.preventDefault(),o.responseText.then(r=>D.append(r)))}});addEventListener("turbo:frame-load",e=>{let t=e.target.closest("turbo-frame");t.dataset.turboBoostSrc=q[t.id]||t.src||t.dataset.turboBoostSrc,delete q[t.id]});var Ie={frameAttribute:"data-turbo-frame",methodAttribute:"data-turbo-method",commandAttribute:"data-turbo-command",confirmAttribute:"data-turbo-confirm"},d=l({},Ie),he={method:e=>Promise.resolve(confirm(e))},ze=e=>e.detail.driver==="method",_e=e=>{if(e.detail.driver!=="form")return!1;let t=e.target,o=t.closest("turbo-frame"),r=t.closest(`[${d.frameAttribute}]`);return!!(o||r)},Fe=e=>ze(e)||_e(e);document.addEventListener(c.start,async e=>{let t=e.target.getAttribute(d.confirmAttribute);!t||(e.detail.confirmation=!0,Fe(e))||await he.method(t)||e.preventDefault()});var We=he,m=[],I;function Xe(e,t){let o=m.find(r=>r.name===e);return o&&m.splice(m.indexOf(o),1),m=[{name:e,selectors:t},...m],document.removeEventListener(e,I,!0),document.addEventListener(e,I,!0),l({},m.find(r=>r.name===e))}function Ge(e){return m.find(t=>t.selectors.find(o=>Array.from(document.querySelectorAll(o)).find(r=>r===e)))}function Ve(e,t){let o=Ge(t);return o&&o.name===e}var g={register:Xe,isRegisteredForElement:Ve,get events(){return[...m]},set handler(e){I=e}};function Je(e){return e.closest(`[${d.commandAttribute}]`)}function Ue(e){return e.closest("turbo-frame[src]")||e.closest("turbo-frame[data-turbo-frame-src]")||e.closest("turbo-frame")}function Ke(e,t={}){if(e.tagName.toLowerCase()!=="select")return t.value=e.value||null;if(!e.multiple)return t.value=e.options[e.selectedIndex].value;t.values=Array.from(e.options).reduce((o,r)=>(r.selected&&o.push(r.value),o),[])}function Ye(e){let t=Array.from(e.attributes).reduce((o,r)=>{let n=r.value;return o[r.name]=n,o},{});return t.tag=e.tagName,t.checked=!!e.checked,t.disabled=!!e.disabled,Ke(e,t),delete t.class,delete t.action,delete t.href,delete t[d.commandAttribute],delete t[d.frameAttribute],t}var X={buildAttributePayload:Ye,findClosestCommand:Je,findClosestFrameWithSource:Ue};function Qe(e,t={},o={}){let r=e.querySelector('input[name="turbo_boost_command"]')||document.createElement("input");r.type="hidden",r.name="turbo_boost_command",r.value=JSON.stringify(t),e.appendChild(r)}var Ze={invokeCommand:Qe};function et(e,t={}){let o=document.createElement("a");o.href=e;let r=new URL(o);return r.searchParams.set("tbc",JSON.stringify(t)),r}var G={build:et};function tt(e,t){let o=t.src;t=l({},t),delete t.src,e.src=G.build(o,t)}var se={invokeCommand:tt};function ot(e,t={}){let o=t.src;t=l({},t),delete t.src,delete t.href,e.setAttribute("href",G.build(o,t))}var rt={invokeCommand:ot};function nt(e){let t=e.target;u(W.events.abort,document,{detail:b(l({},e.detail),{xhr:t})})}function z(e){let t=e.target;(t.getResponseHeader("TurboBoost")==="Append"||t.getResponseHeader("Content-Type").startsWith("text/vnd.turbo-boost.html"))&&D.append(t.responseText);let o=`Server returned a ${t.status} status code! TurboBoost Commands require 2XX-3XX status codes.`;u(W.events.clientError,document,{detail:b(l({},e.detail),{error:o,xhr:t})},!0)}function it(e){let t=e.target;if(t.status<200||t.status>399)return z(e);let o=t.responseText;t.getResponseHeader("TurboBoost")==="Append"||t.getResponseHeader("Content-Type").startsWith("text/vnd.turbo-boost.html")?D.append(t.responseText):D.replaceDocument(t.responseText)}function st(e){let t=e.src;e=l({},e),delete e.src;try{let o=new XMLHttpRequest;o.open("GET",G.build(t,e),!0),o.setRequestHeader("Accept","text/vnd.turbo-boost.html, text/html, application/xhtml+xml"),o.addEventListener("abort",nt),o.addEventListener("error",z),o.addEventListener("load",it),o.send()}catch(o){let r=`Unexpected error sending HTTP request! ${o.message}`;z(o,{detail:{message:r}})}}var lt={invokeCommand:st};function P(e,t){return t=t||{dataset:{}},e.href||t.src||t.dataset.turboBoostSrc||location.href}function at(e){let t=X.findClosestFrameWithSource(e),{turboFrame:o,turboMethod:r}=e.dataset;return e.tagName.toLowerCase()==="form"?{name:"form",reason:"Element is a form.",frame:t,src:e.action,invokeCommand:Ze.invokeCommand}:r&&r.length>0?{name:"method",reason:"Element defines data-turbo-method.",frame:t,src:e.href,invokeCommand:rt.invokeCommand}:o&&o!=="_self"?(t=document.getElementById(o),{name:"frame",reason:"element targets a frame that is not _self",frame:t,src:P(e,t),invokeCommand:se.invokeCommand}):(!o||o==="_self")&&t?{name:"frame",reason:"element does NOT target a frame or targets _self and is contained by a frame",frame:t,src:P(e,t),invokeCommand:se.invokeCommand}:{name:"window",reason:"element matches one or more of the following conditions (targets _top, does NOT target a frame, is NOT contained by a frame)",frame:null,src:P(e),invokeCommand:lt.invokeCommand}}var le={find:at},H="unknown",me={debug:Object.values(h),info:Object.values(h),warn:[h.abort,h.clientError,h.serverError],error:[h.clientError,h.serverError],unknown:[]};Object.values(h).forEach(e=>{addEventListener(e,t=>{if(me[H].includes(t.type)){let{target:o,detail:r}=t;console[H](t.type,{target:o,detail:r})}})});var dt={get level(){return H},set level(e){return Object.keys(me).includes(e)||(e="unknown"),H=e}};function ct(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))}var ut={v4:ct},ht="0.1.1",mt=self.TurboBoost||{},R={VERSION:ht,busy:!1,confirmation:We,logger:dt,schema:d,events:c,registerEventDelegate:g.register,get eventDelegates(){return g.events}};function ae(e,t){return{id:e,name:t.getAttribute(d.commandAttribute),elementId:t.id.length>0?t.id:null,elementAttributes:X.buildAttributePayload(t),startedAt:Date.now(),token:R.token,signedState:N.signed,clientState:N.changed}}async function gt(e){let t,o={};try{if(t=X.findClosestCommand(e.target),!t||!g.isRegisteredForElement(e.type,t))return;let r=`turbo-command-${ut.v4()}`,n=le.find(t),i=b(l({},ae(r,t)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),s=await u(c.start,t,{cancelable:!0,detail:i});if(s.defaultPrevented||s.detail.confirmation&&e.defaultPrevented)return u(c.abort,t,{detail:{message:`An event handler for '${c.start}' prevented default behavior and blocked command invocation!`,source:s}});switch(n=le.find(t),i=b(l({},ae(r,t)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),ce.add(i),["frame","window"].includes(n.name)&&e.preventDefault(),R.busy=!0,setTimeout(()=>R.busy=!1,10),n.name){case"method":return n.invokeCommand(t,i);case"form":return n.invokeCommand(t,i,e);case"frame":return n.invokeCommand(n.frame,i);case"window":return n.invokeCommand(i)}}catch(r){u(c.clientError,t,{detail:b(l({},o),{error:r})})}}self.TurboBoost=l({},mt);self.TurboBoost.Commands||(g.handler=gt,g.register("click",[`[${d.commandAttribute}]`]),g.register("submit",[`form[${d.commandAttribute}]`]),g.register("change",[`input[${d.commandAttribute}]`,`select[${d.commandAttribute}]`,`textarea[${d.commandAttribute}]`]),self.TurboBoost.Commands=R,self.TurboBoost.State=N);var bt=Object.defineProperty,pt=Object.defineProperties,ft=Object.getOwnPropertyDescriptors,ge=Object.getOwnPropertySymbols,vt=Object.prototype.hasOwnProperty,yt=Object.prototype.propertyIsEnumerable,be=(e,t,o)=>t in e?bt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,y=(e,t)=>{for(var o in t||(t={}))vt.call(t,o)&&be(e,o,t[o]);if(ge)for(var o of ge(t))yt.call(t,o)&&be(e,o,t[o]);return e},E=(e,t)=>pt(e,ft(t));function Et(e){let t=document.createElement("template");return t.innerHTML=e,t}function Z(e,t){t=t||document.body;let o=Et(e).content.cloneNode(!0).querySelector("*");return t.appendChild(o)}function V(e,t={}){if(!e)return;Y(e);let{outline:o,outlineOffset:r}=t;o=o||"dashed 3px red",r=r||"0px",e.originalStyles=e.originalStyles||{display:e.style.display,minHeight:e.style.minHeight,minWidth:e.style.minWidth,outline:e.style.outline,outlineOffset:e.style.outlineOffset},getComputedStyle(e).display.match(/^inline$/i)&&e.offsetWidth===0&&e.offsetHeight===0&&(e.style.display="inline-block",e.style.minHeight="2px",e.style.minWidth="2px"),e.style.outline=o,e.style.outlineOffset=r,e.dataset.turboBoostHighlight=!0}function Y(e){if(e){if(e.originalStyles){for(let[t,o]of Object.entries(e.originalStyles))o?e.style[t]=o:e.style[t]="";delete e.originalStyles}delete e.dataset.turboBoostHighlight}}function J(e){if(!e)return{};let t=e.getBoundingClientRect(),o=e.offsetWidth,r=e.offsetHeight,n=t.top+window.scrollY,i=t.left+window.scrollX,s=i+o,k=n+r;return{top:n,left:i,right:s,bottom:k,width:o,height:r}}function x(e){try{e()}catch(t){}}var wt=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.html,this.labelElement.addEventListener("click",e=>{e.preventDefault(),this.toggle()}),this.checkboxElement.addEventListener("change",e=>this.dispatchEvent(new CustomEvent("change",{bubbles:!0})))}toggle(){this.checked?this.uncheck():this.check()}check(){this.checkboxElement.checked=!0,this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}uncheck(){this.checkboxElement.checked=!1,this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}get name(){return this.getAttribute("name")}get checked(){return this.checkboxElement.checked}get checkboxElement(){return this.shadowRoot.querySelector("input")}get labelElement(){return this.shadowRoot.querySelector("label")}get html(){return`
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
    `}},Tt=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.html}connectedCallback(){let e=localStorage.getItem(`turbo-boost-devtools-${location.href}-${this.id}-transform`);e&&(this.style.transform=e)}disconnectedCallback(){this.id!=="undefined"&&this.id!==""&&localStorage.setItem(`turbo-boost-devtools-${location.href}-${this.id}-transform`,this.style.transform)}get color(){return this.getAttribute("color")||"darkslategray"}get backgroundColor(){return this.getAttribute("background-color")||"gainsboro"}get position(){return this.getAttribute("position")||"top"}get html(){return`
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
    `}},w=[],xt={LeaderLine:{src:"https://cdnjs.cloudflare.com/ajax/libs/leader-line/1.0.7/leader-line.min.js",integrity:"sha512-0dNdzMjpT6pJdFGF1DwybFCfm3K/lzHhxaMXC/92J9/DZujHlqYFqmhTOAoD0o+LkeEsVK2ar/ESs7/Q2B6wJg==",global:"LeaderLine"},PlainDraggable:{src:"https://cdn.jsdelivr.net/npm/plain-draggable@2.5.14/plain-draggable.min.js",global:"PlainDraggable"}};function Lt(e){return e.global&&self[e.global]||document.querySelector(`[src='${e.src}']`)?!0:w.includes(e)}function St(e){if(Lt(e))return;w.push(e);let{src:t,integrity:o}=e,r=document.createElement("script");r.setAttribute("src",t),r.setAttribute("crossorigin","anonymous"),r.setAttribute("referrerpolicy","no-referrer"),o&&r.setAttribute("integrity",o),document.head.appendChild(r)}function fe(e){if(!w.includes(e))return;w.splice(w.indexOf(e),1);let{src:t}=e,o=document.querySelector(`script[src='${t}']`);o&&o.remove(),e.global&&self[e.global]&&(self[e.global]=null)}function At(){[...w].forEach(e=>fe(e))}var L=E(y({},xt),{add:St,remove:fe,removeAll:At});customElements.define("turbo-boost-devtool",wt);customElements.define("turbo-boost-devtool-supervisor",kt);customElements.define("turbo-boost-devtool-tooltip",Tt);var a;function ve(){if(a)try{new PlainDraggable(a)}catch(e){setTimeout(ve,200)}}function ee(){Ee()||(a.close(),a.dispatchEvent(new CustomEvent("turbo-boost:devtools-stop",{bubbles:!0})),a=null,L.removeAll())}function ye(){j()||(L.add(L.LeaderLine),L.add(L.PlainDraggable),a=Z("<turbo-boost-devtool-supervisor></turbo-boost-devtool-supervisor>"),setTimeout(ve,200),a.dispatchEvent(new CustomEvent("turbo-boost:devtools-start",{bubbles:!0})))}function Ct(){let e=a?Object.keys(a.enabledDevtools):[];ee(),ye(),a.devtoolElements.forEach(t=>{e.includes(t.name)&&t.check()})}function j(){return!!a}function Ee(){return!j()}var pe;function we(){clearTimeout(pe),pe=setTimeout(Ct,25)}function S(){j()&&we()}addEventListener("turbo:load",S);addEventListener("turbo-frame:load",S);addEventListener("turbo-boost:devtools-connect",S);addEventListener("turbo-boost:devtools-close",ee);window.TurboBoost&&(addEventListener(TurboBoost.Commands.events.success,S),addEventListener(TurboBoost.Commands.events.finish,S));function $t(e,t){if(a)return Z(`
      <turbo-boost-devtool name="${e}" slot="devtool">
        <span slot="label">${t}</span>
      </turbo-boost-devtool>
    `,a)}function Ot(e){return a?a.enabledDevtools[e]:!1}var Q={enabled:Ot,register:$t,start:ye,stop:ee,restart:we,get started(){return j()},get stopped(){return Ee()}};function U(e,t,o,r={}){let{backgroundColor:n,color:i,position:s,id:k}=r;return i=i||"white",s=s||"top",Z(`
    <turbo-boost-devtool-tooltip id="${k}" position="${s}" background-color="${n}" color="${i}">
      <div slot='title'>${e}</div>
      <div slot='subtitle'>${t}</div>
      ${o}
    </turbo-boost-devtool-tooltip>
  `)}var K,te=class{constructor(e){this.delegate=e;let t,o=()=>{clearTimeout(t),t=setTimeout(this.hide({active:!1}),25)};this.eventListeners["turbo-boost:devtool-enable"]=r=>{let{name:n}=r.detail;n===this.delegate.name&&(V(this.delegate.triggerElement,{outline:"3px dashed blueviolet",outlineOffset:"2px"}),this.hide({active:!1}),this.active&&this.show())},this.eventListeners["turbo-boost:devtool-disable"]=r=>{let{name:n}=r.detail;n===this.delegate.name&&Y(this.delegate.triggerElement)},this.eventListeners.click=r=>{r.target.closest("turbo-boost-devtool-tooltip")||o()},this.eventListeners["turbo:load"]=o,this.eventListeners["turbo-frame:load"]=o,window.TurboBoost&&(this.eventListeners[TurboBoost.Commands.events.finish]=o),this.registerEventListeners()}registerEventListeners(){Object.entries(this.eventListeners).forEach(([e,t])=>{addEventListener(e,t)})}unregisterEventListeners(){Object.entries(this.eventListeners).forEach(([e,t])=>{removeEventListener(e,t)})}get eventListeners(){return this._eventListeners||(this._eventListeners={})}show(){if(!this.enabled||this.active)return;this.active=!0,this.hide({active:!0}),V(this.delegate.targetElement,{outline:"3px dashed darkcyan",outlineOffset:"-2px"}),V(this.delegate.morphElement,{outline:"3px dashed chocolate",outlineOffset:"3px"}),this.renderingTooltip=this.createRenderingTooltip(),this.targetTooltip=this.createTargetTooltip(),this.triggerTooltip=this.createTriggerTooltip(this.targetTooltip,this.renderingTooltip),document.querySelectorAll(".leader-line").forEach(t=>t.style.zIndex=1e5);let e={morph:{partial:this.delegate.triggerElement.renders,id:this.delegate.triggerElement.morphs,status:this.delegate.morphElement?"OK":"Not Found"},trigger:{partial:null,id:null,status:"Not Found"},target:{partial:null,id:null,status:"Not Found"}};this.delegate.triggerElement&&(e.trigger={partial:this.delegate.triggerElement.partial,id:this.delegate.triggerElement.id,status:"OK"},e.target.id=this.delegate.triggerElement.controls),this.delegate.targetElement&&(e.target={partial:this.delegate.targetElement.partial,dom_id:this.delegate.targetElement.id,status:"OK"}),console.table(e)}hide({active:e=!1}){document.querySelectorAll("turbo-boost-devtool-tooltip").forEach(t=>{x(()=>t.line.remove()),x(()=>t.drag.remove()),x(()=>t.lineToRendering.remove()),x(()=>t.lineToTarget.remove()),x(()=>t.remove())}),document.querySelectorAll("[data-turbo-boost-highlight]").forEach(t=>{t.tagName.match(/turbo-boost-toggle-trigger/i)||Y(t)}),this.active=e}get active(){return K===this.delegate}set active(e){e?K=this.delegate:K=null}get enabled(){return Q.enabled(this.delegate.name)}static register(e,t){Q.register(e,t)}createRenderingTooltip(){if(!this.delegate.triggerElement.renders)return console.debug("Unable to create the rendering tooltip! The trigger element must set the 'renders' attribute.");if(!this.delegate.triggerElement.morphs)return console.debug(`Unable to create the rendering tooltip! The trigger element specified the 'morphs' attrbiute but no element matches the DOM id: '${this.triggerElement.morphs}'`);let e=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
      RENDERING - &lt;${this.delegate.triggerElement.tagName.toLowerCase()}&gt;
    `,t=`
      <b>partial</b>: ${this.delegate.triggerElement.renders||"unknown"}<br>
      <b>morphs</b>: ${this.delegate.triggerElement.morphs||"unknown"}<br>
    `,o=U(e,t,`
      <div slot="content-top" style="font-size:85%; font-style:italic; font-weight:100;">
        The <b>TRIGGER</b> toggles the <b>TARGET</b> then renders the partial &amp; morphs the element.<br>
      </div>
    `,{id:`${this.delegate.id}-rendering`,backgroundColor:"lightyellow",color:"chocolate"}),r=J(this.delegate.morphElement),n=Math.ceil(r.top+r.height/2-o.offsetHeight/2),i=Math.ceil(r.left+r.width+100);return o.style.top=`${n}px`,o.style.left=`${i}px`,o.line=new LeaderLine(o,this.delegate.morphElement,E(y({},this.leaderLineOptions),{color:"chocolate"})),o.drag=new PlainDraggable(o),o}createTargetTooltip(){var e,t;if(!this.delegate.targetElement)return console.debug(`Unable to create the target tooltip! No element matches the DOM id: '${this.delegate.triggerElement.controls}'`);let o=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
      TARGET - &lt;${this.delegate.targetElement.tagName.toLowerCase()}&gt;
    `,r=U(o,((e=this.delegate.targetTooltipData)==null?void 0:e.subtitle)||"",((t=this.delegate.targetTooltipData)==null?void 0:t.content)||"",{id:`${this.delegate.id}-target`,backgroundColor:"lightcyan",color:"darkcyan",position:"bottom"}),n=J(this.delegate.targetElement),i=Math.ceil(n.top+r.offsetHeight),s=Math.ceil(n.left+n.width+r.offsetWidth/3);return r.style.top=`${i}px`,r.style.left=`${s}px`,r.line=new LeaderLine(r,this.delegate.targetElement,E(y({},this.leaderLineOptions),{color:"darkcyan"})),r.drag=new PlainDraggable(r),r}createTriggerTooltip(e,t){var o,r;if(!this.delegate.triggerElement)return;let n=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      TRIGGER - &lt;${this.delegate.triggerElement.tagName.toLowerCase()}&gt;
    `,i=U(n,((o=this.delegate.triggerTooltipData)==null?void 0:o.subtitle)||"",((r=this.delegate.triggerTooltipData)==null?void 0:r.content)||"",{id:`${this.delegate.id}-trigger`,backgroundColor:"lavender",color:"blueviolet"}),s=J(this.delegate.triggerElement),k=Math.ceil(s.top-i.offsetHeight*2),Ce=Math.ceil(s.left+s.width+i.offsetWidth/3);return i.style.top=`${k}px`,i.style.left=`${Ce}px`,i.line=new LeaderLine(this.delegate.triggerElement,i,E(y({},this.leaderLineOptions),{color:"blueviolet"})),e&&(i.lineToTarget=new LeaderLine(i,e,E(y({},this.leaderLineOptions),{color:"blueviolet",middleLabel:this.delegate.targetLineLabel,size:2.1})),e.drag.onMove=()=>{var T,re;e.line.position(),(T=i.lineToTarget)==null||T.position(),(re=i.lineToRendering)==null||re.position()}),t&&(i.lineToRendering=new LeaderLine(i,t,E(y({},this.leaderLineOptions),{color:"blueviolet",middleLabel:this.delegate.renderingLineLabel,size:2.1})),t.drag.onMove=()=>{var T;t.line.position(),i.lineToTarget&&i.lineToTarget.position(),(T=i.lineToRendering)==null||T.position()}),i.drag=new PlainDraggable(i),i.drag.onMove=()=>{i.line.position(),i.lineToTarget&&i.lineToTarget.position(),i.lineToRendering&&i.lineToRendering.position()},i}get leaderLineOptions(){return{dash:{animation:!0},dropShadow:{opacity:.3},endPlug:"arrow3",endPlugSize:1.7,size:3,startPlug:"disc",startPlugSize:1}}},{restart:Dt,start:Bt,stop:Ht}=Q;function ke(e,t,o){Object.assign(e,{initializeDevtool(){let r=()=>this.devtool.show();addEventListener("turbo-boost:devtools-start",()=>{this.devtool=new te(this),this.addEventListener("mouseenter",r)}),addEventListener("turbo-boost:devtools-stop",()=>{this.removeEventListener("mouseenter",r),this.removeDevtool()}),this.dispatchEvent(new CustomEvent("turbo-boost:devtools-connect",{bubbles:!0}))},hideDevtool(){var r;(r=this.devtool)==null||r.hide({active:!1})},removeDevtool(){this.devtool.hide({active:!1}),this.devtool.unregisterEventListeners(),delete this.devtool},name:t,targetLineLabel:o}),["triggerElement","morphElement","targetElement"].filter(r=>e[r]===void 0).forEach(r=>{Object.defineProperty(e,r,{get(){return e}})})}var Te={restart:Dt,start:Bt,stop:Ht};var p=class extends HTMLElement{constructor(t){super(),this.devtool="unknown",this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=t||"<slot></slot>"}connectedCallback(){this.ensureId()}ensureId(){this.id.trim().length||(this.id=`${this.tagName}-${this.uuidv4()}`.toLowerCase())}uuidv4(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}get viewStack(){let t=this.getAttribute("view-stack");return t?JSON.parse(t):[]}get partial(){return this.viewStack[0]}};var Rt=`
  <turbo-boost>
    <slot name="busy" hidden></slot>
    <slot></slot>
  </turbo-boost>
`,xe=100,oe=400,f=class extends p{constructor(){super(Rt)}showBusyElement(){clearTimeout(this.showBusyElementTimeout),clearTimeout(this.hideBusyElementTimeout),this.busyElement&&(this.busyStartedAt=Date.now()+xe,this.showBusyElementTimeout=setTimeout(()=>{this.busySlotElement.hidden=!1,this.defaultSlotElement.hidden=!0},xe))}hideBusyElement(){if(clearTimeout(this.showBusyElementTimeout),clearTimeout(this.hideBusyElementTimeout),!this.busyElement)return;let t=oe-(Date.now()-this.busyStartedAt);t<0&&(t=0),delete this.busyStartedAt,this.hideBusyElementTimeout=setTimeout(()=>{this.busySlotElement.hidden=!0,this.defaultSlotElement.hidden=!1},t)}get busyElement(){return this.querySelector(':scope > [slot="busy"]')}get busySlotElement(){return this.shadowRoot.querySelector('slot[name="busy"]')}get defaultSlotElement(){return this.shadowRoot.querySelector("slot:not([name])")}get busy(){return this.getAttribute("busy")==="true"}set busy(t){t=!!t,this.busy!==t&&(this.setAttribute("busy",t),t?this.showBusyElement():this.hideBusyElement())}get busyStartedAt(){return this.dataset.busyStartedAt?Number(this.dataset.busyStartedAt):0}set busyStartedAt(t){this.dataset.busyStartedAt=t}};var A=class extends f{connectedCallback(){super.connectedCallback(),this.mouseenterHandler=this.onMouseenter.bind(this),this.addEventListener("mouseenter",this.mouseenterHandler),this.collapseHandler=this.collapse.bind(this),this.collapseNowHandler=this.collapseNow.bind(this),this.collapseOn.forEach(t=>{let o=t.split("@"),r=o[0];o.length>1?(o[1].match(/^self|window$/)?self:self[o[1]]).addEventListener(r,this.collapseNowHandler):this.addEventListener(r,this.collapseHandler)})}disconnectedCallback(){this.removeEventListener("mouseenter",this.mouseenterHandler),this.collapseOn.forEach(t=>{let o=t.split("@"),r=o[0];o.length>1?(o[1].match(/^self|window$/)?self:self[o[1]]).removeEventListener(r,this.collapseNowHandler):this.removeEventListener(r,this.collapseHandler)})}cacheHTML(){}renderCachedHTML(){}onMouseenter(){clearTimeout(this.collapseTimeout)}collapse(t=250){if(clearTimeout(this.collapseTimeout),!this.busy){if(typeof t!="number"&&(t=250),t>0)return this.collapseTimeout=setTimeout(()=>this.collapse(0),t);this.innerHTML="";try{this.expanded=!1,this.triggerElement.hideDevtool()}catch(o){}}}collapseNow(t){t.target.closest("turbo-boost-devtool-tooltip")||this.collapse(0)}collapseMatches(){document.querySelectorAll(this.collapseSelector).forEach(t=>{t.id!==this.id&&t.collapse&&t.collapse(0)})}get collapseSelector(){return this.triggerElement.collapseSelector||this.getAttribute("collapse-selector")}get focusSelector(){return this.getAttribute("focus-selector")}get triggerElement(){return document.getElementById(this.labeledBy)}get triggerElements(){return document.querySelectorAll(`[aria-controls="${this.id}"]`)}get labeledBy(){return this.getAttribute("aria-labeledby")}set labeledBy(t){return this.setAttribute("aria-labeledby",t)}get collapseOn(){let t=this.getAttribute("collapse-on");return t?JSON.parse(t):[]}get expanded(){return this.triggerElement?this.triggerElement.expanded:!1}set expanded(t){this.triggerElements.forEach(o=>o.expanded=t)}get busy(){return this.triggerElement&&this.triggerElement.busy}};var Le;function jt(e){["bold","bullet","code","heading1","href","italic","number","quote","strike"].forEach(o=>e.deactivateAttribute(o))}function Mt(e){if(e.value.length===0)return;let t=e.editor,o=[];for(;o[0]!==t.getSelectedRange()[0]&&o[1]!==t.getSelectedRange()[1];)o=t.getSelectedRange(),t.moveCursorInDirection("forward");t.insertString(" "),t.moveCursorInDirection("forward"),t.setSelectedRange([o[1],t.getSelectedRange()[1]]),jt(t),t.setSelectedRange([t.getSelectedRange()[1],t.getSelectedRange()[1]])}function Pt(e){clearTimeout(Le),Le=setTimeout(()=>{if(!e)return;e.focus();let t=e.closest("trix-editor");try{t?Mt(t):e.selectionStart=e.selectionEnd=e.value.length}catch(o){}finally{e.scrollIntoView({block:"center",behavior:"smooth"})}},100)}var Se=e=>Pt(e);document.addEventListener("turbo-boost:devtools-start",()=>te.register("toggle","toggles"));var Ae,C=class extends f{constructor(){super(),ke(this,"toggle","toggles")}connectedCallback(){super.connectedCallback();let{start:t}=TurboBoost.Commands.events;this.commandStartHandler=this.onCommandStart.bind(this),this.addEventListener(t,this.commandStartHandler);let{before:o}=TurboBoost.Streams.invokeEvents;this.beforeInvokeHandler=this.onBeforeInvoke.bind(this),addEventListener(o,this.beforeInvokeHandler),this.initializeDevtool()}disconnectedCallback(){setTimeout(()=>{let{start:t}=TurboBoost.Commands.events;this.removeEventListener(t,this.commandStartHandler);let{before:o}=TurboBoost.Streams.invokeEvents;removeEventListener(o,this.beforeInvokeHandler),this.removeDevtool()},1e3)}onCommandStart(t){Ae=this.focusSelector,this.targetElement.labeledBy=this.id,this.targetElement.collapseMatches(),this.busy=!0}onBeforeInvoke(t){if(t.detail.method!=="morph"||t.target.id!==this.morphs)return;let o=`turbo-boost-toggle-target[aria-labeledby="${this.id}"]`;if(!t.target.querySelector(o))return;let r=Date.now()-this.busyStartedAt,n=oe-r;n<10&&(n=10),t.detail.invoke={delay:n},setTimeout(()=>{this.busy=!1,this.morphToggleTriggerElements.forEach(i=>i.busy=!1)},n-10),setTimeout(()=>Se(this.targetElement.querySelector(Ae)),n+100)}get sharedViews(){if(!this.targetElement)return[];if(!this.targetElement.viewStack)return[];let t=(o,r)=>(this.targetElement.viewStack.includes(r)&&o.push(r),o);return this.viewStack.reduce(t.bind(this),[])}get renders(){return this.getAttribute("renders")}get morphs(){return this.getAttribute("morphs")}get morphToggleTriggerElements(){return Array.from(this.morphElement.querySelectorAll("turbo-boost-toggle-trigger"))}get controls(){return this.getAttribute("aria-controls")}get collapseSelector(){return this.getAttribute("collapse-selector")}get focusSelector(){return this.getAttribute("focus-selector")||this.targetElement.focusSelector}get remember(){return this.getAttribute("remember")==="true"}set remember(t){return this.setAttribute("remember",!!t)}get expanded(){return this.getAttribute("aria-expanded")==="true"}set expanded(t){this.setAttribute("aria-expanded",!!t)}get collapsed(){return!this.expanded}get command(){return this.dataset.turboCommand}get renderingLineLabel(){return"renders & morphs"}get morphElement(){return this.morphs?document.getElementById(this.morphs):null}get targetElement(){return this.controls?document.getElementById(this.controls):null}get triggerTooltipData(){let t=this.triggerElement.viewStack.reverse().map((o,r)=>this.triggerElement.sharedViews.includes(o)?`<div slot="content">${r+1}. ${o}</div>`:`<div slot="content-bottom">${r+1}. ${o}</div>`,this).join("");return{subtitle:`
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
    `}}};customElements.define("turbo-boost",p);customElements.define("turbo-boost-toggle-target",A);customElements.define("turbo-boost-toggle-trigger",C);self.TurboBoost=self.TurboBoost||{};self.TurboBoost.devtools=Te;self.TurboBoost.Elements={};var so=self.TurboBoost.Elements;export{so as default};
//# sourceMappingURL=elements.js.map
