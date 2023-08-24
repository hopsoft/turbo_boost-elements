var Fe=Object.defineProperty,We=Object.defineProperties,Xe=Object.getOwnPropertyDescriptors,ue=Object.getOwnPropertySymbols,Je=Object.prototype.hasOwnProperty,Ge=Object.prototype.propertyIsEnumerable,ce=(e,t,o)=>t in e?Fe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,l=(e,t)=>{for(var o in t||(t={}))Je.call(t,o)&&ce(e,o,t[o]);if(ue)for(var o of ue(t))Ge.call(t,o)&&ce(e,o,t[o]);return e},p=(e,t)=>We(e,Xe(t)),Ve=class{get element(){return document.querySelector('meta[name="turbo-boost"]')}get token(){return this.element.getAttribute("content")}get busy(){return this.element.dataset.busy==="true"}set busy(e){return this.element.dataset.busy=!!e}},d=new Ve,u={start:"turbo-boost:command:start",success:"turbo-boost:command:success",finish:"turbo-boost:command:finish",abort:"turbo-boost:command:abort",clientError:"turbo-boost:command:client-error",serverError:"turbo-boost:command:server-error"},v={stateLoad:"turbo-boost:state:load",stateChange:"turbo-boost:state:change"},g=l(l({},u),v);function h(e,t,o={}){return new Promise(r=>{o=o||{},o.detail=o.detail||{},t=t||document;let n=new CustomEvent(e,p(l({},o),{bubbles:!0}));t.dispatchEvent(n),r(n)})}var W;function q(e,t=null){if(!e||typeof e!="object")return e;let o=new Proxy(e,{deleteProperty(r,n){return delete r[n],h(v.stateChange,d.element,{detail:{state:W}}),!0},set(r,n,i,s){return r[n]=q(i,this),h(v.stateChange,d.element,{detail:{state:W}}),!0}});if(Array.isArray(e))e.forEach((r,n)=>e[n]=q(r,o));else if(typeof e=="object")for(let[r,n]of Object.entries(e))e[r]=q(n,o);return t||(W=o),o}var Ue=q,U,k,$,he;function pe(){if(!d.element)return T();let e=atob(d.element.dataset.state);$={},k=Ue(JSON.parse(e)),U=l({},k),delete d.element.dataset.clientStateChange,setTimeout(()=>h(v.stateLoad,d.element,{detail:{state:k}}))}function T(){clearTimeout(he),he=setTimeout(pe,10)}U||pe();addEventListener("DOMContentLoaded",T);addEventListener("load",T);addEventListener("turbo:load",T);addEventListener("turbo:frame-load",T);addEventListener(u.success,T);addEventListener(v.stateChange,e=>{$={};for(let[t,o]of Object.entries(k))U[t]!==o&&($[t]=o);d.element.dataset.clientStateChange=!0,d.element.dataset.state=btoa(JSON.stringify(k))});var M={events:v,get current(){return k},get delta(){return $},get payloadChunks(){return btoa(JSON.stringify($)).match(/.{1,2000}/g)}};function Ke(e){let t="<html",o="</html",r=e.indexOf(t),n=e.lastIndexOf(o);if(r>=0&&n>=0){let i=e.slice(e.indexOf(">",r)+1,n);document.documentElement.innerHTML=i}}function Qe(e){document.body.insertAdjacentHTML("beforeend",e)}var O={append:Qe,replaceDocument:Ke},P={};function Ye(e){P[e.id]=e}function Ze(e){delete P[e]}var fe={add:Ye,remove:Ze,get commands(){return[...Object.values(P)]},get length(){return Object.keys(P).length}};function ve(e){e.detail.endedAt=Date.now(),e.detail.milliseconds=e.detail.endedAt-e.detail.startedAt,setTimeout(()=>h(u.finish,e.target,{detail:e.detail}),25)}addEventListener(u.serverError,ve);addEventListener(u.success,ve);addEventListener(u.finish,e=>fe.remove(e.detail.id),!0);var K={events:u},J={};addEventListener("turbo:before-fetch-request",e=>{let t=e.target.closest("turbo-frame"),{fetchOptions:o}=e.detail;if(d.busy){let r=["text/vnd.turbo-boost.html",o.headers.Accept];r=r.filter(n=>n&&n.trim().length>0).join(", "),o.headers.Accept=r,o.headers["TurboBoost-Token"]=d.token}M.payloadChunks.forEach((r,n)=>{o.headers[`TurboBoost-State-${n.toString().padStart(4,"0")}`]=r})});addEventListener("turbo:before-fetch-response",e=>{let t=e.target.closest("turbo-frame"),{fetchResponse:o}=e.detail;if(t&&(J[t.id]=t.src),o.header("TurboBoost")){if(o.statusCode<200||o.statusCode>399){let r=`Server returned a ${o.statusCode} status code! TurboBoost Commands require 2XX-3XX status codes.`;h(K.events.clientError,document,{detail:p(l({},e.detail),{error:r})},!0)}o.header("TurboBoost")==="Append"&&(e.preventDefault(),o.responseText.then(r=>O.append(r)))}});addEventListener("turbo:frame-load",e=>{let t=e.target.closest("turbo-frame");t.dataset.turboBoostSrc=J[t.id]||t.src||t.dataset.turboBoostSrc,delete J[t.id]});var et={frameAttribute:"data-turbo-frame",methodAttribute:"data-turbo-method",commandAttribute:"data-turbo-command",confirmAttribute:"data-turbo-confirm"},c=l({},et),ye={method:e=>Promise.resolve(confirm(e))},tt=e=>e.detail.driver==="method",ot=e=>{if(e.detail.driver!=="form")return!1;let t=e.target,o=t.closest("turbo-frame"),r=t.closest(`[${c.frameAttribute}]`);return!!(o||r)},rt=e=>tt(e)||ot(e);document.addEventListener(u.start,async e=>{let t=e.target.getAttribute(c.confirmAttribute);!t||(e.detail.confirmation=!0,rt(e))||await ye.method(t)||e.preventDefault()});var nt=ye,b=[],G;function it(e,t){let o=b.find(r=>r.name===e);return o&&b.splice(b.indexOf(o),1),b=[{name:e,selectors:t},...b],document.removeEventListener(e,G,!0),document.addEventListener(e,G,!0),l({},b.find(r=>r.name===e))}function st(e){return b.find(t=>t.selectors.find(o=>Array.from(document.querySelectorAll(o)).find(r=>r===e)))}function lt(e,t){let o=st(t);return o&&o.name===e}var f={register:it,isRegisteredForElement:lt,get events(){return[...b]},set handler(e){G=e}};function at(e){return e.closest(`[${c.commandAttribute}]`)}function dt(e){return e.closest("turbo-frame[src]")||e.closest("turbo-frame[data-turbo-frame-src]")||e.closest("turbo-frame")}function ut(e,t={}){if(e.tagName.toLowerCase()!=="select")return t.value=e.value||null;if(!e.multiple)return t.value=e.options[e.selectedIndex].value;t.values=Array.from(e.options).reduce((o,r)=>(r.selected&&o.push(r.value),o),[])}function ct(e){let t=Array.from(e.attributes).reduce((o,r)=>{let n=r.value;return o[r.name]=n,o},{});return t.tag=e.tagName,t.checked=!!e.checked,t.disabled=!!e.disabled,ut(e,t),delete t.class,delete t.action,delete t.href,delete t[c.commandAttribute],delete t[c.frameAttribute],t}var Q={buildAttributePayload:ct,findClosestCommand:at,findClosestFrameWithSource:dt};function ht(e,t={}){t.token=d.token;let o=document.createElement("input");o.type="hidden",o.name="turbo_boost_command",o.value=JSON.stringify(t),e.appendChild(o)}var mt={invokeCommand:ht};function gt(e,t={}){let o=document.createElement("a");o.href=e;let r=new URL(o);return r.searchParams.set("turbo_boost_command",JSON.stringify(t)),r}var Y={build:gt};function bt(e,t){let o=t.src;t=l({},t),delete t.src,e.src=Y.build(o,t)}var me={invokeCommand:bt};function pt(e,t={}){let o=t.src;t=l({},t),delete t.src,delete t.href,e.setAttribute("href",Y.build(o,t))}var ft={invokeCommand:pt};function vt(e){let t=e.target;h(K.events.abort,document,{detail:p(l({},e.detail),{xhr:t})})}function V(e){let t=e.target;t.getResponseHeader("TurboBoost")==="Append"||t.getResponseHeader("Content-Type").startsWith("text/vnd.turbo-boost.html")?O.append(t.responseText):O.replaceDocument(t.responseText);let o=`Server returned a ${t.status} status code! TurboBoost Commands require 2XX-3XX status codes.`;h(K.events.clientError,document,{detail:p(l({},e.detail),{error:o,xhr:t})},!0)}function yt(e){let t=e.target;if(t.status<200||t.status>399)return V(e);let o=t.responseText;t.getResponseHeader("TurboBoost")==="Append"||t.getResponseHeader("Content-Type").startsWith("text/vnd.turbo-boost.html")?O.append(t.responseText):O.replaceDocument(t.responseText)}function Et(e){let t=e.src;e=l({},e),delete e.src;try{let o=new XMLHttpRequest;o.open("GET",Y.build(t,e),!0),o.setRequestHeader("Accept","text/vnd.turbo-boost.html, text/html, application/xhtml+xml"),o.setRequestHeader("TurboBoost-Token",d.token),M.payloadChunks.forEach((r,n)=>o.setRequestHeader(`TurboBoost-State-${n.toString().padStart(4,"0")}`,r)),o.addEventListener("abort",vt),o.addEventListener("error",V),o.addEventListener("load",yt),o.send()}catch(o){let r=`Unexpected error sending HTTP request! ${o.message}`;V(o,{detail:{message:r}})}}var wt={invokeCommand:Et};function X(e,t){return t=t||{dataset:{}},e.href||t.src||t.dataset.turboBoostSrc||location.href}function kt(e){let t=Q.findClosestFrameWithSource(e),{turboFrame:o,turboMethod:r}=e.dataset;return e.tagName.toLowerCase()==="form"?{name:"form",reason:"Element is a form.",frame:t,src:e.action,invokeCommand:mt.invokeCommand}:r&&r.length>0?{name:"method",reason:"Element defines data-turbo-method.",frame:t,src:e.href,invokeCommand:ft.invokeCommand}:o&&o!=="_self"?(t=document.getElementById(o),{name:"frame",reason:"element targets a frame that is not _self",frame:t,src:X(e,t),invokeCommand:me.invokeCommand}):(!o||o==="_self")&&t?{name:"frame",reason:"element does NOT target a frame or targets _self and is contained by a frame",frame:t,src:X(e,t),invokeCommand:me.invokeCommand}:{name:"window",reason:"element matches one or more of the following conditions (targets _top, does NOT target a frame, is NOT contained by a frame)",frame:null,src:X(e),invokeCommand:wt.invokeCommand}}var ge={find:kt},N="unknown",Ee={debug:Object.values(g),info:Object.values(g),warn:[g.abort,g.clientError,g.serverError],error:[g.clientError,g.serverError],unknown:[]};Object.values(g).forEach(e=>{addEventListener(e,t=>{if(Ee[N].includes(t.type)){let{target:o,detail:r}=t;console[N](t.type,{target:o,detail:r})}})});var Tt={get level(){return N},set level(e){return Object.keys(Ee).includes(e)||(e="unknown"),N=e}};function xt(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))}var Lt={v4:xt};function be(e,t){return{id:e,name:t.getAttribute(c.commandAttribute),elementId:t.id.length>0?t.id:null,elementAttributes:Q.buildAttributePayload(t),startedAt:Date.now()}}async function St(e){let t,o={};try{if(t=Q.findClosestCommand(e.target),!t||!f.isRegisteredForElement(e.type,t))return;let r=`turbo-command-${Lt.v4()}`,n=ge.find(t),i=p(l({},be(r,t)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),s=await h(u.start,t,{cancelable:!0,detail:i});if(s.defaultPrevented||s.detail.confirmation&&e.defaultPrevented)return h(u.abort,t,{detail:{message:`An event handler for '${u.start}' prevented default behavior and blocked command invocation!`,source:s}});switch(n=ge.find(t),i=p(l({},be(r,t)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),fe.add(i),["frame","window"].includes(n.name)&&e.preventDefault(),d.busy=!0,setTimeout(()=>d.busy=!1,10),n.name){case"method":return n.invokeCommand(t,i);case"form":return n.invokeCommand(t,i);case"frame":return n.invokeCommand(n.frame,i);case"window":return n.invokeCommand(i)}}catch(r){h(u.clientError,t,{detail:p(l({},o),{error:r})})}}self.TurboBoost=self.TurboBoost||{};self.TurboBoost=p(l({},self.TurboBoost),{stateEvents:v,get state(){return M.current},get stateDelta(){return M.delta}});self.TurboBoost.Commands||(f.handler=St,f.register("click",[`[${c.commandAttribute}]`]),f.register("submit",[`form[${c.commandAttribute}]`]),f.register("change",[`input[${c.commandAttribute}]`,`select[${c.commandAttribute}]`,`textarea[${c.commandAttribute}]`]),self.TurboBoost.Commands={confirmation:nt,logger:Tt,schema:c,events:u,registerEventDelegate:f.register,get eventDelegates(){return f.events}});var Qt=self.TurboBoost.Commands;var Ct=Object.defineProperty,At=Object.defineProperties,$t=Object.getOwnPropertyDescriptors,we=Object.getOwnPropertySymbols,Ot=Object.prototype.hasOwnProperty,Dt=Object.prototype.propertyIsEnumerable,ke=(e,t,o)=>t in e?Ct(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,x=(e,t)=>{for(var o in t||(t={}))Ot.call(t,o)&&ke(e,o,t[o]);if(we)for(var o of we(t))Dt.call(t,o)&&ke(e,o,t[o]);return e},L=(e,t)=>At(e,$t(t)),m=(e,t)=>()=>(e&&(t=e(e=0)),t);function Bt(e){let t=document.createElement("template");return t.innerHTML=e,t}function se(e,t){t=t||document.body;let o=Bt(e).content.cloneNode(!0).querySelector("*");return t.appendChild(o)}function Z(e,t={}){if(!e)return;re(e);let{outline:o,outlineOffset:r}=t;o=o||"dashed 3px red",r=r||"0px",e.originalStyles=e.originalStyles||{display:e.style.display,minHeight:e.style.minHeight,minWidth:e.style.minWidth,outline:e.style.outline,outlineOffset:e.style.outlineOffset},getComputedStyle(e).display.match(/^inline$/i)&&e.offsetWidth===0&&e.offsetHeight===0&&(e.style.display="inline-block",e.style.minHeight="2px",e.style.minWidth="2px"),e.style.outline=o,e.style.outlineOffset=r,e.dataset.turboBoostHighlight=!0}function re(e){if(e){if(e.originalStyles){for(let[t,o]of Object.entries(e.originalStyles))o?e.style[t]=o:e.style[t]="";delete e.originalStyles}delete e.dataset.turboBoostHighlight}}function ee(e){if(!e)return{};let t=e.getBoundingClientRect(),o=e.offsetWidth,r=e.offsetHeight,n=t.top+window.scrollY,i=t.left+window.scrollX,s=i+o,C=n+r;return{top:n,left:i,right:s,bottom:C,width:o,height:r}}function D(e){try{e()}catch(t){}}var le=m(()=>{}),$e,Ht=m(()=>{$e=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.html,this.labelElement.addEventListener("click",e=>{e.preventDefault(),this.toggle()}),this.checkboxElement.addEventListener("change",e=>this.dispatchEvent(new CustomEvent("change",{bubbles:!0})))}toggle(){this.checked?this.uncheck():this.check()}check(){this.checkboxElement.checked=!0,this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}uncheck(){this.checkboxElement.checked=!1,this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}get name(){return this.getAttribute("name")}get checked(){return this.checkboxElement.checked}get checkboxElement(){return this.shadowRoot.querySelector("input")}get labelElement(){return this.shadowRoot.querySelector("label")}get html(){return`
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
    `}}}),Oe,Rt=m(()=>{le(),Oe=class extends HTMLElement{constructor(){super(),this.enabledDevtools={},this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.html,this.shadowRoot.querySelector("button").addEventListener("click",()=>this.dispatchEvent(new CustomEvent("turbo-boost:devtools-close",{bubbles:!0}))),this.addEventListener("change",e=>{let t=e.target,{checked:o,name:r}=t;o?this.enableDevtool(r):this.disableDevtool(r)})}enableDevtool(e){this.enabledDevtools[e]||(this.enabledDevtools[e]=!0,this.dispatchEvent(new CustomEvent("turbo-boost:devtool-enable",{bubbles:!0,detail:{name:e}})))}disableDevtool(e){this.enabledDevtools[e]&&(delete this.enabledDevtools[e],this.dispatchEvent(new CustomEvent("turbo-boost:devtool-disable",{bubbles:!0,detail:{name:e}})))}close(){this.devtoolElements.forEach(e=>{e.checked&&e.uncheck()}),this.remove()}get devtoolElements(){return this.querySelectorAll('[slot="devtool"]')}get closeElement(){return this.querySelector("button")}get html(){return`
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
    `}}}),De,jt=m(()=>{De=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.html}connectedCallback(){let e=localStorage.getItem(`turbo-boost-devtools-${location.href}-${this.id}-transform`);e&&(this.style.transform=e)}disconnectedCallback(){this.id!=="undefined"&&this.id!==""&&localStorage.setItem(`turbo-boost-devtools-${location.href}-${this.id}-transform`,this.style.transform)}get color(){return this.getAttribute("color")||"darkslategray"}get backgroundColor(){return this.getAttribute("background-color")||"gainsboro"}get position(){return this.getAttribute("position")||"top"}get html(){return`
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
    `}}});function qt(e){return e.global&&self[e.global]||document.querySelector(`[src='${e.src}']`)?!0:y.includes(e)}function Mt(e){if(qt(e))return;y.push(e);let{src:t,integrity:o}=e,r=document.createElement("script");r.setAttribute("src",t),r.setAttribute("crossorigin","anonymous"),r.setAttribute("referrerpolicy","no-referrer"),o&&r.setAttribute("integrity",o),document.head.appendChild(r)}function Be(e){if(!y.includes(e))return;y.splice(y.indexOf(e),1);let{src:t}=e,o=document.querySelector(`script[src='${t}']`);o&&o.remove(),e.global&&self[e.global]&&(self[e.global]=null)}function Pt(){[...y].forEach(e=>Be(e))}var y,Te,S,Nt=m(()=>{y=[],Te={LeaderLine:{src:"https://cdnjs.cloudflare.com/ajax/libs/leader-line/1.0.7/leader-line.min.js",integrity:"sha512-0dNdzMjpT6pJdFGF1DwybFCfm3K/lzHhxaMXC/92J9/DZujHlqYFqmhTOAoD0o+LkeEsVK2ar/ESs7/Q2B6wJg==",global:"LeaderLine"},PlainDraggable:{src:"https://cdn.jsdelivr.net/npm/plain-draggable@2.5.14/plain-draggable.min.js",global:"PlainDraggable"}},S=L(x({},Te),{add:Mt,remove:Be,removeAll:Pt})});function He(){if(a)try{new PlainDraggable(a)}catch(e){setTimeout(He,200)}}function ne(){je()||(a.close(),a.dispatchEvent(new CustomEvent("turbo-boost:devtools-stop",{bubbles:!0})),a=null,S.removeAll())}function Re(){_()||(S.add(S.LeaderLine),S.add(S.PlainDraggable),a=se("<turbo-boost-devtool-supervisor></turbo-boost-devtool-supervisor>"),setTimeout(He,200),a.dispatchEvent(new CustomEvent("turbo-boost:devtools-start",{bubbles:!0})))}function It(){let e=a?Object.keys(a.enabledDevtools):[];ne(),Re(),a.devtoolElements.forEach(t=>{e.includes(t.name)&&t.check()})}function _(){return!!a}function je(){return!_()}function qe(){clearTimeout(xe),xe=setTimeout(It,25)}function B(){_()&&qe()}function zt(e,t){if(a)return se(`
      <turbo-boost-devtool name="${e}" slot="devtool">
        <span slot="label">${t}</span>
      </turbo-boost-devtool>
    `,a)}function _t(e){return a?a.enabledDevtools[e]:!1}var a,xe,I,Me=m(()=>{le(),Ht(),Rt(),jt(),Nt(),customElements.define("turbo-boost-devtool",$e),customElements.define("turbo-boost-devtool-supervisor",Oe),customElements.define("turbo-boost-devtool-tooltip",De),addEventListener("turbo:load",B),addEventListener("turbo-frame:load",B),addEventListener("turbo-boost:devtools-connect",B),addEventListener("turbo-boost:devtools-close",ne),window.TurboBoost&&(addEventListener(TurboBoost.Commands.events.success,B),addEventListener(TurboBoost.Commands.events.finish,B)),I={enabled:_t,register:zt,start:Re,stop:ne,restart:qe,get started(){return _()},get stopped(){return je()}}});function te(e,t,o,r={}){let{backgroundColor:n,color:i,position:s,id:C}=r;return i=i||"white",s=s||"top",se(`
    <turbo-boost-devtool-tooltip id="${C}" position="${s}" background-color="${n}" color="${i}">
      <div slot='title'>${e}</div>
      <div slot='subtitle'>${t}</div>
      ${o}
    </turbo-boost-devtool-tooltip>
  `)}var oe,H,Ft=m(()=>{Me(),le(),H=class{constructor(e){this.delegate=e;let t,o=()=>{clearTimeout(t),t=setTimeout(this.hide({active:!1}),25)};this.eventListeners["turbo-boost:devtool-enable"]=r=>{let{name:n}=r.detail;n===this.delegate.name&&(Z(this.delegate.triggerElement,{outline:"3px dashed blueviolet",outlineOffset:"2px"}),this.hide({active:!1}),this.active&&this.show())},this.eventListeners["turbo-boost:devtool-disable"]=r=>{let{name:n}=r.detail;n===this.delegate.name&&re(this.delegate.triggerElement)},this.eventListeners.click=r=>{r.target.closest("turbo-boost-devtool-tooltip")||o()},this.eventListeners["turbo:load"]=o,this.eventListeners["turbo-frame:load"]=o,window.TurboBoost&&(this.eventListeners[TurboBoost.Commands.events.finish]=o),this.registerEventListeners()}registerEventListeners(){Object.entries(this.eventListeners).forEach(([e,t])=>{addEventListener(e,t)})}unregisterEventListeners(){Object.entries(this.eventListeners).forEach(([e,t])=>{removeEventListener(e,t)})}get eventListeners(){return this._eventListeners||(this._eventListeners={})}show(){if(!this.enabled||this.active)return;this.active=!0,this.hide({active:!0}),Z(this.delegate.targetElement,{outline:"3px dashed darkcyan",outlineOffset:"-2px"}),Z(this.delegate.morphElement,{outline:"3px dashed chocolate",outlineOffset:"3px"}),this.renderingTooltip=this.createRenderingTooltip(),this.targetTooltip=this.createTargetTooltip(),this.triggerTooltip=this.createTriggerTooltip(this.targetTooltip,this.renderingTooltip),document.querySelectorAll(".leader-line").forEach(t=>t.style.zIndex=1e5);let e={morph:{partial:this.delegate.triggerElement.renders,id:this.delegate.triggerElement.morphs,status:this.delegate.morphElement?"OK":"Not Found"},trigger:{partial:null,id:null,status:"Not Found"},target:{partial:null,id:null,status:"Not Found"}};this.delegate.triggerElement&&(e.trigger={partial:this.delegate.triggerElement.partial,id:this.delegate.triggerElement.id,status:"OK"},e.target.id=this.delegate.triggerElement.controls),this.delegate.targetElement&&(e.target={partial:this.delegate.targetElement.partial,dom_id:this.delegate.targetElement.id,status:"OK"}),console.table(e)}hide({active:e=!1}){document.querySelectorAll("turbo-boost-devtool-tooltip").forEach(t=>{D(()=>t.line.remove()),D(()=>t.drag.remove()),D(()=>t.lineToRendering.remove()),D(()=>t.lineToTarget.remove()),D(()=>t.remove())}),document.querySelectorAll("[data-turbo-boost-highlight]").forEach(t=>{t.tagName.match(/turbo-boost-toggle-trigger/i)||re(t)}),this.active=e}get active(){return oe===this.delegate}set active(e){e?oe=this.delegate:oe=null}get enabled(){return I.enabled(this.delegate.name)}static register(e,t){I.register(e,t)}createRenderingTooltip(){if(!this.delegate.triggerElement.renders)return console.debug("Unable to create the rendering tooltip! The trigger element must set the 'renders' attribute.");if(!this.delegate.triggerElement.morphs)return console.debug(`Unable to create the rendering tooltip! The trigger element specified the 'morphs' attrbiute but no element matches the DOM id: '${this.triggerElement.morphs}'`);let e=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
      RENDERING - &lt;${this.delegate.triggerElement.tagName.toLowerCase()}&gt;
    `,t=`
      <b>partial</b>: ${this.delegate.triggerElement.renders||"unknown"}<br>
      <b>morphs</b>: ${this.delegate.triggerElement.morphs||"unknown"}<br>
    `,o=te(e,t,`
      <div slot="content-top" style="font-size:85%; font-style:italic; font-weight:100;">
        The <b>TRIGGER</b> toggles the <b>TARGET</b> then renders the partial &amp; morphs the element.<br>
      </div>
    `,{id:`${this.delegate.id}-rendering`,backgroundColor:"lightyellow",color:"chocolate"}),r=ee(this.delegate.morphElement),n=Math.ceil(r.top+r.height/2-o.offsetHeight/2),i=Math.ceil(r.left+r.width+100);return o.style.top=`${n}px`,o.style.left=`${i}px`,o.line=new LeaderLine(o,this.delegate.morphElement,L(x({},this.leaderLineOptions),{color:"chocolate"})),o.drag=new PlainDraggable(o),o}createTargetTooltip(){var e,t;if(!this.delegate.targetElement)return console.debug(`Unable to create the target tooltip! No element matches the DOM id: '${this.delegate.triggerElement.controls}'`);let o=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
      TARGET - &lt;${this.delegate.targetElement.tagName.toLowerCase()}&gt;
    `,r=te(o,((e=this.delegate.targetTooltipData)==null?void 0:e.subtitle)||"",((t=this.delegate.targetTooltipData)==null?void 0:t.content)||"",{id:`${this.delegate.id}-target`,backgroundColor:"lightcyan",color:"darkcyan",position:"bottom"}),n=ee(this.delegate.targetElement),i=Math.ceil(n.top+r.offsetHeight),s=Math.ceil(n.left+n.width+r.offsetWidth/3);return r.style.top=`${i}px`,r.style.left=`${s}px`,r.line=new LeaderLine(r,this.delegate.targetElement,L(x({},this.leaderLineOptions),{color:"darkcyan"})),r.drag=new PlainDraggable(r),r}createTriggerTooltip(e,t){var o,r;if(!this.delegate.triggerElement)return;let n=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      TRIGGER - &lt;${this.delegate.triggerElement.tagName.toLowerCase()}&gt;
    `,i=te(n,((o=this.delegate.triggerTooltipData)==null?void 0:o.subtitle)||"",((r=this.delegate.triggerTooltipData)==null?void 0:r.content)||"",{id:`${this.delegate.id}-trigger`,backgroundColor:"lavender",color:"blueviolet"}),s=ee(this.delegate.triggerElement),C=Math.ceil(s.top-i.offsetHeight*2),_e=Math.ceil(s.left+s.width+i.offsetWidth/3);return i.style.top=`${C}px`,i.style.left=`${_e}px`,i.line=new LeaderLine(this.delegate.triggerElement,i,L(x({},this.leaderLineOptions),{color:"blueviolet"})),e&&(i.lineToTarget=new LeaderLine(i,e,L(x({},this.leaderLineOptions),{color:"blueviolet",middleLabel:this.delegate.targetLineLabel,size:2.1})),e.drag.onMove=()=>{var A,de;e.line.position(),(A=i.lineToTarget)==null||A.position(),(de=i.lineToRendering)==null||de.position()}),t&&(i.lineToRendering=new LeaderLine(i,t,L(x({},this.leaderLineOptions),{color:"blueviolet",middleLabel:this.delegate.renderingLineLabel,size:2.1})),t.drag.onMove=()=>{var A;t.line.position(),i.lineToTarget&&i.lineToTarget.position(),(A=i.lineToRendering)==null||A.position()}),i.drag=new PlainDraggable(i),i.drag.onMove=()=>{i.line.position(),i.lineToTarget&&i.lineToTarget.position(),i.lineToRendering&&i.lineToRendering.position()},i}get leaderLineOptions(){return{dash:{animation:!0},dropShadow:{opacity:.3},endPlug:"arrow3",endPlugSize:1.7,size:3,startPlug:"disc",startPlugSize:1}}}}),Wt={};function Le(e){Object.defineProperties(e,{targetTooltipData:{get(){return{subtitle:`
            <b>identifier</b>: ${e.identifier}<br>
            <b>query</b>: ${e.query}
          `,content:`
            <div slot="content-top">
              <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewbox="0 0 24 24" fill="none" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              <b>element log</b>
            </div>
            ${e.targetElementLog.queue.slice(-10).map(t=>`<div slot="content">${t}</div>`).join("")}
          `}}},triggerTooltipData:{get(){return{subtitle:`
            <b>identifier</b>: ${this.identifier}<br>
            <b>only</b>: ${this.getAttribute("only")||""}<br>
            <b>url</b>: ${this.getAttribute("url")||location.href}<br>
            <b>debounce (client-side)</b>: ${this.debounce}<br>
            <b>ignore-inner-updates</b>: ${this.hasAttribute("ignore-inner-updates")}
          `,content:`
            <div slot="content-top">
              <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewbox="0 0 24 24" fill="none" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              <b>element log</b>
            </div>
            ${e.triggerElementLog.queue.slice(-10).map(t=>`<div slot="content">${t}</div>`).join("")}
          `}}}})}function Xt(){document.addEventListener("turbo-boost:devtools-start",()=>H.register("updates-for","updates-for")),window.CableReady.devtools=F,document.addEventListener("turbo:load",()=>{document.querySelectorAll("updates-for").forEach(e=>{z(e,"updates-for","updates"),Le(e),e.initializeDevtool()}),document.querySelectorAll("cable-ready-updates-for").forEach(e=>{z(e,"updates-for","updates"),Le(e),e.initializeDevtool()}),CableReady.devtools.start()})}var Jt=m(()=>{ie(),ie(),Xt()});function z(e,t,o){Object.assign(e,{initializeDevtool(){let r=()=>this.devtool.show();addEventListener("turbo-boost:devtools-start",()=>{this.devtool=new H(this),this.addEventListener("mouseenter",r)}),addEventListener("turbo-boost:devtools-stop",()=>{this.removeEventListener("mouseenter",r),this.removeDevtool()}),this.dispatchEvent(new CustomEvent("turbo-boost:devtools-connect",{bubbles:!0}))},hideDevtool(){var r;(r=this.devtool)==null||r.hide({active:!1})},removeDevtool(){this.devtool.hide({active:!1}),this.devtool.unregisterEventListeners(),delete this.devtool},name:t,targetLineLabel:o}),["triggerElement","morphElement","targetElement"].filter(r=>e[r]===void 0).forEach(r=>{Object.defineProperty(e,r,{get(){return e}})})}var Se,Ce,Ae,F,ie=m(()=>{Me(),Ft(),{restart:Se,start:Ce,stop:Ae}=I,(async()=>window.CableReady&&await Promise.resolve().then(()=>(Jt(),Wt)))(),F={restart:Se,start:Ce,stop:Ae}});ie();var E=class extends HTMLElement{constructor(t){super(),this.devtool="unknown",this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=t||"<slot></slot>"}connectedCallback(){this.ensureId()}ensureId(){this.id.trim().length||(this.id=`${this.tagName}-${this.uuidv4()}`.toLowerCase())}uuidv4(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}get viewStack(){let t=this.getAttribute("view-stack");return t?JSON.parse(t):[]}get partial(){return this.viewStack[0]}};var Gt=`
  <turbo-boost>
    <slot name="busy" hidden></slot>
    <slot></slot>
  </turbo-boost>
`,Pe=100,ae=400,w=class extends E{constructor(){super(Gt)}showBusyElement(){clearTimeout(this.showBusyElementTimeout),clearTimeout(this.hideBusyElementTimeout),this.busyElement&&(this.busyStartedAt=Date.now()+Pe,this.showBusyElementTimeout=setTimeout(()=>{this.busySlotElement.hidden=!1,this.defaultSlotElement.hidden=!0},Pe))}hideBusyElement(){if(clearTimeout(this.showBusyElementTimeout),clearTimeout(this.hideBusyElementTimeout),!this.busyElement)return;let t=ae-(Date.now()-this.busyStartedAt);t<0&&(t=0),delete this.busyStartedAt,this.hideBusyElementTimeout=setTimeout(()=>{this.busySlotElement.hidden=!0,this.defaultSlotElement.hidden=!1},t)}get busyElement(){return this.querySelector(':scope > [slot="busy"]')}get busySlotElement(){return this.shadowRoot.querySelector('slot[name="busy"]')}get defaultSlotElement(){return this.shadowRoot.querySelector("slot:not([name])")}get busy(){return this.getAttribute("busy")==="true"}set busy(t){t=!!t,this.busy!==t&&(this.setAttribute("busy",t),t?this.showBusyElement():this.hideBusyElement())}get busyStartedAt(){return this.dataset.busyStartedAt?Number(this.dataset.busyStartedAt):0}set busyStartedAt(t){this.dataset.busyStartedAt=t}};var R=class extends w{connectedCallback(){super.connectedCallback(),this.mouseenterHandler=this.onMouseenter.bind(this),this.addEventListener("mouseenter",this.mouseenterHandler),this.collapseHandler=this.collapse.bind(this),this.collapseNowHandler=this.collapseNow.bind(this),this.collapseOn.forEach(t=>{let o=t.split("@"),r=o[0];o.length>1?(o[1].match(/^self|window$/)?self:self[o[1]]).addEventListener(r,this.collapseNowHandler):this.addEventListener(r,this.collapseHandler)})}disconnectedCallback(){this.removeEventListener("mouseenter",this.mouseenterHandler),this.collapseOn.forEach(t=>{let o=t.split("@"),r=o[0];o.length>1?(o[1].match(/^self|window$/)?self:self[o[1]]).removeEventListener(r,this.collapseNowHandler):this.removeEventListener(r,this.collapseHandler)})}cacheHTML(){}renderCachedHTML(){}onMouseenter(){clearTimeout(this.collapseTimeout)}collapse(t=250){if(clearTimeout(this.collapseTimeout),!this.busy){if(typeof t!="number"&&(t=250),t>0)return this.collapseTimeout=setTimeout(()=>this.collapse(0),t);this.innerHTML="";try{this.expanded=!1,this.triggerElement.hideDevtool()}catch(o){}}}collapseNow(t){t.target.closest("turbo-boost-devtool-tooltip")||this.collapse(0)}collapseMatches(){document.querySelectorAll(this.collapseSelector).forEach(t=>{t.id!==this.id&&t.collapse&&t.collapse(0)})}get collapseSelector(){return this.triggerElement.collapseSelector||this.getAttribute("collapse-selector")}get focusSelector(){return this.getAttribute("focus-selector")}get triggerElement(){return document.getElementById(this.labeledBy)}get triggerElements(){return document.querySelectorAll(`[aria-controls="${this.id}"]`)}get labeledBy(){return this.getAttribute("aria-labeledby")}set labeledBy(t){return this.setAttribute("aria-labeledby",t)}get collapseOn(){let t=this.getAttribute("collapse-on");return t?JSON.parse(t):[]}get expanded(){return this.triggerElement?this.triggerElement.expanded:!1}set expanded(t){this.triggerElements.forEach(o=>o.expanded=t)}get busy(){return this.triggerElement&&this.triggerElement.busy}};var Ne;function Vt(e){["bold","bullet","code","heading1","href","italic","number","quote","strike"].forEach(o=>e.deactivateAttribute(o))}function Ut(e){if(e.value.length===0)return;let t=e.editor,o=[];for(;o[0]!==t.getSelectedRange()[0]&&o[1]!==t.getSelectedRange()[1];)o=t.getSelectedRange(),t.moveCursorInDirection("forward");t.insertString(" "),t.moveCursorInDirection("forward"),t.setSelectedRange([o[1],t.getSelectedRange()[1]]),Vt(t),t.setSelectedRange([t.getSelectedRange()[1],t.getSelectedRange()[1]])}function Kt(e){clearTimeout(Ne),Ne=setTimeout(()=>{if(!e)return;e.focus();let t=e.closest("trix-editor");try{t?Ut(t):e.selectionStart=e.selectionEnd=e.value.length}catch(o){}finally{e.scrollIntoView({block:"center",behavior:"smooth"})}},100)}var Ie=e=>Kt(e);document.addEventListener("turbo-boost:devtools-start",()=>H.register("toggle","toggles"));var ze,j=class extends w{constructor(){super(),z(this,"toggle","toggles")}connectedCallback(){super.connectedCallback();let{start:t}=TurboBoost.Commands.events;this.commandStartHandler=this.onCommandStart.bind(this),this.addEventListener(t,this.commandStartHandler);let{before:o}=TurboBoost.Streams.invokeEvents;this.beforeInvokeHandler=this.onBeforeInvoke.bind(this),addEventListener(o,this.beforeInvokeHandler),this.initializeDevtool()}disconnectedCallback(){setTimeout(()=>{let{start:t}=TurboBoost.Commands.events;this.removeEventListener(t,this.commandStartHandler);let{before:o}=TurboBoost.Streams.invokeEvents;removeEventListener(o,this.beforeInvokeHandler),this.removeDevtool()},1e3)}onCommandStart(t){ze=this.focusSelector,this.targetElement.labeledBy=this.id,this.targetElement.collapseMatches(),this.busy=!0}onBeforeInvoke(t){if(t.detail.method!=="morph"||t.target.id!==this.morphs)return;let o=`turbo-boost-toggle-target[aria-labeledby="${this.id}"]`;if(!t.target.querySelector(o))return;let r=Date.now()-this.busyStartedAt,n=ae-r;n<10&&(n=10),t.detail.invoke={delay:n},setTimeout(()=>{this.busy=!1,this.morphToggleTriggerElements.forEach(i=>i.busy=!1)},n-10),setTimeout(()=>Ie(this.targetElement.querySelector(ze)),n+100)}get sharedViews(){if(!this.targetElement)return[];if(!this.targetElement.viewStack)return[];let t=(o,r)=>(this.targetElement.viewStack.includes(r)&&o.push(r),o);return this.viewStack.reduce(t.bind(this),[])}get renders(){return this.getAttribute("renders")}get morphs(){return this.getAttribute("morphs")}get morphToggleTriggerElements(){return Array.from(this.morphElement.querySelectorAll("turbo-boost-toggle-trigger"))}get controls(){return this.getAttribute("aria-controls")}get collapseSelector(){return this.getAttribute("collapse-selector")}get focusSelector(){return this.getAttribute("focus-selector")||this.targetElement.focusSelector}get remember(){return this.getAttribute("remember")==="true"}set remember(t){return this.setAttribute("remember",!!t)}get expanded(){return this.getAttribute("aria-expanded")==="true"}set expanded(t){this.setAttribute("aria-expanded",!!t)}get collapsed(){return!this.expanded}get command(){return this.dataset.turboCommand}get renderingLineLabel(){return"renders & morphs"}get morphElement(){return this.morphs?document.getElementById(this.morphs):null}get targetElement(){return this.controls?document.getElementById(this.controls):null}get triggerTooltipData(){let t=this.triggerElement.viewStack.reverse().map((o,r)=>this.triggerElement.sharedViews.includes(o)?`<div slot="content">${r+1}. ${o}</div>`:`<div slot="content-bottom">${r+1}. ${o}</div>`,this).join("");return{subtitle:`
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
    `}}};customElements.define("turbo-boost",E);customElements.define("turbo-boost-toggle-target",R);customElements.define("turbo-boost-toggle-trigger",j);self.TurboBoost=self.TurboBoost||{};self.TurboBoost.devtools=F;self.TurboBoost.Elements={};var ko=self.TurboBoost.Elements;export{ko as default};
//# sourceMappingURL=elements.js.map
