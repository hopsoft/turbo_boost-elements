import"@turbo-boost/commands";var K=Object.defineProperty,U=Object.defineProperties,X=Object.getOwnPropertyDescriptors,O=Object.getOwnPropertySymbols,Y=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable,H=(t,e,o)=>e in t?K(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,c=(t,e)=>{for(var o in e||(e={}))Y.call(e,o)&&H(t,o,e[o]);if(O)for(var o of O(e))Q.call(e,o)&&H(t,o,e[o]);return t},h=(t,e)=>U(t,X(e)),Z="0.0.6";function ee(t){let e=document.createElement("template");return e.innerHTML=t,e}function $(t,e){e=e||document.body;let o=ee(t).content.cloneNode(!0).querySelector("*");return e.appendChild(o)}function w(t,e={}){if(!t)return;L(t);let{outline:o,outlineOffset:r}=e;o=o||"dashed 3px red",r=r||"0px",t.originalStyles=t.originalStyles||{display:t.style.display,minHeight:t.style.minHeight,minWidth:t.style.minWidth,outline:t.style.outline,outlineOffset:t.style.outlineOffset},getComputedStyle(t).display.match(/^inline$/i)&&t.offsetWidth===0&&t.offsetHeight===0&&(t.style.display="inline-block",t.style.minHeight="2px",t.style.minWidth="2px"),t.style.outline=o,t.style.outlineOffset=r,t.dataset.turboBoostHighlight=!0}function L(t){if(t){if(t.originalStyles){for(let[e,o]of Object.entries(t.originalStyles))o?t.style[e]=o:t.style[e]="";delete t.originalStyles}delete t.dataset.turboBoostHighlight}}function k(t){if(!t)return{};let e=t.getBoundingClientRect(),o=t.offsetWidth,r=t.offsetHeight,s=e.top+window.scrollY,i=e.left+window.scrollX,n=i+o,g=s+r;return{top:s,left:i,right:n,bottom:g,width:o,height:r}}function b(t){try{t()}catch(e){}}var te=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.html,this.labelElement.addEventListener("click",t=>{t.preventDefault(),this.toggle()}),this.checkboxElement.addEventListener("change",t=>this.dispatchEvent(new CustomEvent("change",{bubbles:!0})))}toggle(){this.checked?this.uncheck():this.check()}check(){this.checkboxElement.checked=!0,this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}uncheck(){this.checkboxElement.checked=!1,this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}get name(){return this.getAttribute("name")}get checked(){return this.checkboxElement.checked}get checkboxElement(){return this.shadowRoot.querySelector("input")}get labelElement(){return this.shadowRoot.querySelector("label")}get html(){return`
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
    `}},oe=class extends HTMLElement{constructor(){super(),this.enabledDevtools={},this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.html,this.shadowRoot.querySelector("button").addEventListener("click",()=>this.dispatchEvent(new CustomEvent("turbo-boost:devtools-close",{bubbles:!0}))),this.addEventListener("change",t=>{let e=t.target,{checked:o,name:r}=e;o?this.enableDevtool(r):this.disableDevtool(r)})}enableDevtool(t){this.enabledDevtools[t]||(this.enabledDevtools[t]=!0,this.dispatchEvent(new CustomEvent("turbo-boost:devtool-enable",{bubbles:!0,detail:{name:t}})))}disableDevtool(t){this.enabledDevtools[t]&&(delete this.enabledDevtools[t],this.dispatchEvent(new CustomEvent("turbo-boost:devtool-disable",{bubbles:!0,detail:{name:t}})))}close(){this.devtoolElements.forEach(t=>{t.checked&&t.uncheck()}),this.remove()}get devtoolElements(){return this.querySelectorAll('[slot="devtool"]')}get closeElement(){return this.querySelector("button")}get html(){return`
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
    `}},re=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.html}connectedCallback(){let t=localStorage.getItem(`turbo-boost-devtools-${location.href}-${this.id}-transform`);t&&(this.style.transform=t)}disconnectedCallback(){this.id!=="undefined"&&this.id!==""&&localStorage.setItem(`turbo-boost-devtools-${location.href}-${this.id}-transform`,this.style.transform)}get color(){return this.getAttribute("color")||"darkslategray"}get backgroundColor(){return this.getAttribute("background-color")||"gainsboro"}get position(){return this.getAttribute("position")||"top"}get html(){return`
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
    `}},u=[],ie={LeaderLine:{src:"https://cdnjs.cloudflare.com/ajax/libs/leader-line/1.0.7/leader-line.min.js",integrity:"sha512-0dNdzMjpT6pJdFGF1DwybFCfm3K/lzHhxaMXC/92J9/DZujHlqYFqmhTOAoD0o+LkeEsVK2ar/ESs7/Q2B6wJg==",global:"LeaderLine"},PlainDraggable:{src:"https://cdn.jsdelivr.net/npm/plain-draggable@2.5.14/plain-draggable.min.js",global:"PlainDraggable"}};function se(t){return t.global&&self[t.global]||document.querySelector(`[src='${t.src}']`)?!0:u.includes(t)}function le(t){if(se(t))return;u.push(t);let{src:e,integrity:o}=t,r=document.createElement("script");r.setAttribute("src",e),r.setAttribute("crossorigin","anonymous"),r.setAttribute("referrerpolicy","no-referrer"),o&&r.setAttribute("integrity",o),document.head.appendChild(r)}function M(t){if(!u.includes(t))return;u.splice(u.indexOf(t),1);let{src:e}=t,o=document.querySelector(`script[src='${e}']`);o&&o.remove(),t.global&&self[t.global]&&(self[t.global]=null)}function ne(){[...u].forEach(t=>M(t))}var p=h(c({},ie),{add:le,remove:M,removeAll:ne});customElements.define("turbo-boost-devtool",te);customElements.define("turbo-boost-devtool-supervisor",oe);customElements.define("turbo-boost-devtool-tooltip",re);var l;function j(){if(l)try{new PlainDraggable(l)}catch(t){setTimeout(j,200)}}function A(){N()||(l.close(),l.dispatchEvent(new CustomEvent("turbo-boost:devtools-stop",{bubbles:!0})),l=null,p.removeAll())}function I(){y()||(p.add(p.LeaderLine),p.add(p.PlainDraggable),l=$("<turbo-boost-devtool-supervisor></turbo-boost-devtool-supervisor>"),setTimeout(j,200),l.dispatchEvent(new CustomEvent("turbo-boost:devtools-start",{bubbles:!0})))}function ae(){let t=l?Object.keys(l.enabledDevtools):[];A(),I(),l.devtoolElements.forEach(e=>{t.includes(e.name)&&e.check()})}function y(){return!!l}function N(){return!y()}var R;function q(){clearTimeout(R),R=setTimeout(ae,25)}function v(){y()&&q()}addEventListener("turbo:load",v);addEventListener("turbo-frame:load",v);addEventListener("turbo-boost:devtools-connect",v);addEventListener("turbo-boost:devtools-close",A);window.TurboBoost&&(addEventListener(TurboBoost.Commands.events.success,v),addEventListener(TurboBoost.Commands.events.finish,v));function de(t,e){if(l)return $(`
      <turbo-boost-devtool name="${t}" slot="devtool">
        <span slot="label">${e}</span>
      </turbo-boost-devtool>
    `,l)}function ce(t){return l?l.enabledDevtools[t]:!1}var S={enabled:ce,register:de,start:I,stop:A,restart:q,get started(){return y()},get stopped(){return N()}};function x(t,e,o,r={}){let{backgroundColor:s,color:i,position:n,id:g}=r;return i=i||"white",n=n||"top",$(`
    <turbo-boost-devtool-tooltip id="${g}" position="${n}" background-color="${s}" color="${i}">
      <div slot='title'>${t}</div>
      <div slot='subtitle'>${e}</div>
      ${o}
    </turbo-boost-devtool-tooltip>
  `)}var T,D=class{constructor(t){this.delegate=t;let e,o=()=>{clearTimeout(e),e=setTimeout(this.hide({active:!1}),25)};this.eventListeners["turbo-boost:devtool-enable"]=r=>{let{name:s}=r.detail;s===this.delegate.name&&(w(this.delegate.triggerElement,{outline:"3px dashed blueviolet",outlineOffset:"2px"}),this.hide({active:!1}),this.active&&this.show())},this.eventListeners["turbo-boost:devtool-disable"]=r=>{let{name:s}=r.detail;s===this.delegate.name&&L(this.delegate.triggerElement)},this.eventListeners.click=r=>{r.target.closest("turbo-boost-devtool-tooltip")||o()},this.eventListeners["turbo:load"]=o,this.eventListeners["turbo-frame:load"]=o,window.TurboBoost&&(this.eventListeners[TurboBoost.Commands.events.finish]=o),this.registerEventListeners()}registerEventListeners(){Object.entries(this.eventListeners).forEach(([t,e])=>{addEventListener(t,e)})}unregisterEventListeners(){Object.entries(this.eventListeners).forEach(([t,e])=>{removeEventListener(t,e)})}get eventListeners(){return this._eventListeners||(this._eventListeners={})}show(){if(!this.enabled||this.active)return;this.active=!0,this.hide({active:!0}),w(this.delegate.targetElement,{outline:"3px dashed darkcyan",outlineOffset:"-2px"}),w(this.delegate.morphElement,{outline:"3px dashed chocolate",outlineOffset:"3px"}),this.renderingTooltip=this.createRenderingTooltip(),this.targetTooltip=this.createTargetTooltip(),this.triggerTooltip=this.createTriggerTooltip(this.targetTooltip,this.renderingTooltip),document.querySelectorAll(".leader-line").forEach(e=>e.style.zIndex=1e5);let t={morph:{partial:this.delegate.triggerElement.renders,id:this.delegate.triggerElement.morphs,status:this.delegate.morphElement?"OK":"Not Found"},trigger:{partial:null,id:null,status:"Not Found"},target:{partial:null,id:null,status:"Not Found"}};this.delegate.triggerElement&&(t.trigger={partial:this.delegate.triggerElement.partial,id:this.delegate.triggerElement.id,status:"OK"},t.target.id=this.delegate.triggerElement.controls),this.delegate.targetElement&&(t.target={partial:this.delegate.targetElement.partial,dom_id:this.delegate.targetElement.id,status:"OK"}),console.table(t)}hide({active:t=!1}){document.querySelectorAll("turbo-boost-devtool-tooltip").forEach(e=>{b(()=>e.line.remove()),b(()=>e.drag.remove()),b(()=>e.lineToRendering.remove()),b(()=>e.lineToTarget.remove()),b(()=>e.remove())}),document.querySelectorAll("[data-turbo-boost-highlight]").forEach(e=>{e.tagName.match(/turbo-boost-toggle-trigger/i)||L(e)}),this.active=t}get active(){return T===this.delegate}set active(t){t?T=this.delegate:T=null}get enabled(){return S.enabled(this.delegate.name)}static register(t,e){S.register(t,e)}createRenderingTooltip(){if(!this.delegate.triggerElement.renders)return console.debug("Unable to create the rendering tooltip! The trigger element must set the 'renders' attribute.");if(!this.delegate.triggerElement.morphs)return console.debug(`Unable to create the rendering tooltip! The trigger element specified the 'morphs' attrbiute but no element matches the DOM id: '${this.triggerElement.morphs}'`);let t=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
      RENDERING - &lt;${this.delegate.triggerElement.tagName.toLowerCase()}&gt;
    `,e=`
      <b>partial</b>: ${this.delegate.triggerElement.renders||"unknown"}<br>
      <b>morphs</b>: ${this.delegate.triggerElement.morphs||"unknown"}<br>
    `,o=x(t,e,`
      <div slot="content-top" style="font-size:85%; font-style:italic; font-weight:100;">
        The <b>TRIGGER</b> toggles the <b>TARGET</b> then renders the partial &amp; morphs the element.<br>
      </div>
    `,{id:`${this.delegate.id}-rendering`,backgroundColor:"lightyellow",color:"chocolate"}),r=k(this.delegate.morphElement),s=Math.ceil(r.top+r.height/2-o.offsetHeight/2),i=Math.ceil(r.left+r.width+100);return o.style.top=`${s}px`,o.style.left=`${i}px`,o.line=new LeaderLine(o,this.delegate.morphElement,h(c({},this.leaderLineOptions),{color:"chocolate"})),o.drag=new PlainDraggable(o),o}createTargetTooltip(){var t,e;if(!this.delegate.targetElement)return console.debug(`Unable to create the target tooltip! No element matches the DOM id: '${this.delegate.triggerElement.controls}'`);let o=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
      TARGET - &lt;${this.delegate.targetElement.tagName.toLowerCase()}&gt;
    `,r=x(o,((t=this.delegate.targetTooltipData)==null?void 0:t.subtitle)||"",((e=this.delegate.targetTooltipData)==null?void 0:e.content)||"",{id:`${this.delegate.id}-target`,backgroundColor:"lightcyan",color:"darkcyan",position:"bottom"}),s=k(this.delegate.targetElement),i=Math.ceil(s.top+r.offsetHeight),n=Math.ceil(s.left+s.width+r.offsetWidth/3);return r.style.top=`${i}px`,r.style.left=`${n}px`,r.line=new LeaderLine(r,this.delegate.targetElement,h(c({},this.leaderLineOptions),{color:"darkcyan"})),r.drag=new PlainDraggable(r),r}createTriggerTooltip(t,e){var o,r;if(!this.delegate.triggerElement)return;let s=`
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      TRIGGER - &lt;${this.delegate.triggerElement.tagName.toLowerCase()}&gt;
    `,i=x(s,((o=this.delegate.triggerTooltipData)==null?void 0:o.subtitle)||"",((r=this.delegate.triggerTooltipData)==null?void 0:r.content)||"",{id:`${this.delegate.id}-trigger`,backgroundColor:"lavender",color:"blueviolet"}),n=k(this.delegate.triggerElement),g=Math.ceil(n.top-i.offsetHeight*2),J=Math.ceil(n.left+n.width+i.offsetWidth/3);return i.style.top=`${g}px`,i.style.left=`${J}px`,i.line=new LeaderLine(this.delegate.triggerElement,i,h(c({},this.leaderLineOptions),{color:"blueviolet"})),t&&(i.lineToTarget=new LeaderLine(i,t,h(c({},this.leaderLineOptions),{color:"blueviolet",middleLabel:this.delegate.targetLineLabel,size:2.1})),t.drag.onMove=()=>{var m,B;t.line.position(),(m=i.lineToTarget)==null||m.position(),(B=i.lineToRendering)==null||B.position()}),e&&(i.lineToRendering=new LeaderLine(i,e,h(c({},this.leaderLineOptions),{color:"blueviolet",middleLabel:this.delegate.renderingLineLabel,size:2.1})),e.drag.onMove=()=>{var m;e.line.position(),i.lineToTarget&&i.lineToTarget.position(),(m=i.lineToRendering)==null||m.position()}),i.drag=new PlainDraggable(i),i.drag.onMove=()=>{i.line.position(),i.lineToTarget&&i.lineToTarget.position(),i.lineToRendering&&i.lineToRendering.position()},i}get leaderLineOptions(){return{dash:{animation:!0},dropShadow:{opacity:.3},endPlug:"arrow3",endPlugSize:1.7,size:3,startPlug:"disc",startPlugSize:1}}},{restart:he,start:ue,stop:ge}=S;function z(t,e,o){Object.assign(t,{initializeDevtool(){let r=()=>this.devtool.show();addEventListener("turbo-boost:devtools-start",()=>{this.devtool=new D(this),this.addEventListener("mouseenter",r)}),addEventListener("turbo-boost:devtools-stop",()=>{this.removeEventListener("mouseenter",r),this.removeDevtool()}),this.dispatchEvent(new CustomEvent("turbo-boost:devtools-connect",{bubbles:!0}))},hideDevtool(){var r;(r=this.devtool)==null||r.hide({active:!1})},removeDevtool(){var r,s;(r=this.devtool)!=null&&r.hide&&this.devtool.hide({active:!1}),(s=this.devtool)!=null&&s.unregisterEventListeners&&this.devtool.unregisterEventListeners(),delete this.devtool},name:e,targetLineLabel:o}),["triggerElement","morphElement","targetElement"].filter(r=>t[r]===void 0).forEach(r=>{Object.defineProperty(t,r,{get(){return t}})})}var P={restart:he,start:ue,stop:ge,VERSION:Z};var V="0.0.19";var a=class extends HTMLElement{constructor(e){super(),this.devtool="unknown",this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=e||"<slot></slot>"}connectedCallback(){this.ensureId()}ensureId(){this.id.trim().length||(this.id=`${this.tagName}-${this.uuidv4()}`.toLowerCase())}uuidv4(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))}get viewStack(){let e=this.getAttribute("view-stack");return e?JSON.parse(e):[]}get partial(){return this.viewStack[0]}};var me=`
  <turbo-boost>
    <slot name="busy" hidden></slot>
    <slot></slot>
  </turbo-boost>
`,F=100,C=400,d=class extends a{constructor(){super(me)}showBusyElement(){clearTimeout(this.showBusyElementTimeout),clearTimeout(this.hideBusyElementTimeout),this.busyElement&&(this.busyStartedAt=Date.now()+F,this.showBusyElementTimeout=setTimeout(()=>{this.busySlotElement.hidden=!1,this.defaultSlotElement.hidden=!0},F))}hideBusyElement(){if(clearTimeout(this.showBusyElementTimeout),clearTimeout(this.hideBusyElementTimeout),!this.busyElement)return;let e=C-(Date.now()-this.busyStartedAt);e<0&&(e=0),delete this.busyStartedAt,this.hideBusyElementTimeout=setTimeout(()=>{this.busySlotElement.hidden=!0,this.defaultSlotElement.hidden=!1},e)}get busyElement(){return this.querySelector(':scope > [slot="busy"]')}get busySlotElement(){return this.shadowRoot.querySelector('slot[name="busy"]')}get defaultSlotElement(){return this.shadowRoot.querySelector("slot:not([name])")}get busy(){return this.getAttribute("busy")==="true"}set busy(e){e=!!e,this.busy!==e&&(this.setAttribute("busy",e),e?this.showBusyElement():this.hideBusyElement())}get busyStartedAt(){return this.dataset.busyStartedAt?Number(this.dataset.busyStartedAt):0}set busyStartedAt(e){this.dataset.busyStartedAt=e}};var f=class extends d{connectedCallback(){super.connectedCallback(),this.mouseenterHandler=this.onMouseenter.bind(this),this.addEventListener("mouseenter",this.mouseenterHandler),this.collapseHandler=this.collapse.bind(this),this.collapseNowHandler=this.collapseNow.bind(this),this.collapseOn.forEach(e=>{let o=e.split("@"),r=o[0];o.length>1?(o[1].match(/^self|window$/)?self:self[o[1]]).addEventListener(r,this.collapseNowHandler):this.addEventListener(r,this.collapseHandler)})}disconnectedCallback(){this.removeEventListener("mouseenter",this.mouseenterHandler),this.collapseOn.forEach(e=>{let o=e.split("@"),r=o[0];o.length>1?(o[1].match(/^self|window$/)?self:self[o[1]]).removeEventListener(r,this.collapseNowHandler):this.removeEventListener(r,this.collapseHandler)})}cacheHTML(){}renderCachedHTML(){}onMouseenter(){clearTimeout(this.collapseTimeout)}collapse(e=250){if(clearTimeout(this.collapseTimeout),!this.busy){if(typeof e!="number"&&(e=250),e>0)return this.collapseTimeout=setTimeout(()=>this.collapse(0),e);this.innerHTML="";try{this.expanded=!1,this.triggerElement.hideDevtool()}catch(o){}}}collapseNow(e){e.target.closest("turbo-boost-devtool-tooltip")||this.collapse(0)}collapseMatches(){document.querySelectorAll(this.collapseSelector).forEach(e=>{e.id!==this.id&&e.collapse&&e.collapse(0)})}get collapseSelector(){return this.triggerElement.collapseSelector||this.getAttribute("collapse-selector")}get focusSelector(){return this.getAttribute("focus-selector")}get triggerElement(){return document.getElementById(this.labeledBy)}get triggerElements(){return document.querySelectorAll(`[aria-controls="${this.id}"]`)}get labeledBy(){return this.getAttribute("aria-labeledby")}set labeledBy(e){return this.setAttribute("aria-labeledby",e)}get collapseOn(){let e=this.getAttribute("collapse-on");return e?JSON.parse(e):[]}get expanded(){return this.triggerElement?this.triggerElement.expanded:!1}set expanded(e){this.triggerElements.forEach(o=>o.expanded=e)}get busy(){return this.triggerElement&&this.triggerElement.busy}};var W;function be(t){["bold","bullet","code","heading1","href","italic","number","quote","strike"].forEach(o=>t.deactivateAttribute(o))}function pe(t){if(t.value.length===0)return;let e=t.editor,o=[];for(;o[0]!==e.getSelectedRange()[0]&&o[1]!==e.getSelectedRange()[1];)o=e.getSelectedRange(),e.moveCursorInDirection("forward");e.insertString(" "),e.moveCursorInDirection("forward"),e.setSelectedRange([o[1],e.getSelectedRange()[1]]),be(e),e.setSelectedRange([e.getSelectedRange()[1],e.getSelectedRange()[1]])}function ve(t){clearTimeout(W),W=setTimeout(()=>{if(!t)return;t.focus();let e=t.closest("trix-editor");try{e?pe(e):t.selectionStart=t.selectionEnd=t.value.length}catch(o){}finally{t.scrollIntoView({block:"center",behavior:"smooth"})}},100)}var G=t=>ve(t);document.addEventListener("turbo-boost:devtools-start",()=>D.register("toggle","toggles"));var _,E=class extends d{constructor(){super(),z(this,"toggle","toggles")}connectedCallback(){super.connectedCallback();let{start:e}=TurboBoost.Commands.events;this.commandStartHandler=this.onCommandStart.bind(this),this.addEventListener(e,this.commandStartHandler);let{before:o}=TurboBoost.Streams.invokeEvents;this.beforeInvokeHandler=this.onBeforeInvoke.bind(this),addEventListener(o,this.beforeInvokeHandler),this.initializeDevtool()}disconnectedCallback(){setTimeout(()=>{let{start:e}=TurboBoost.Commands.events;this.removeEventListener(e,this.commandStartHandler);let{before:o}=TurboBoost.Streams.invokeEvents;removeEventListener(o,this.beforeInvokeHandler),this.removeDevtool()},1e3)}onCommandStart(e){_=this.focusSelector,this.targetElement.labeledBy=this.id,this.targetElement.collapseMatches(),this.busy=!0}onBeforeInvoke(e){if(e.detail.method!=="morph"||e.target.id!==this.morphs)return;let o=`turbo-boost-toggle-target[aria-labeledby="${this.id}"]`;if(!e.target.querySelector(o))return;let r=Date.now()-this.busyStartedAt,s=C-r;s<10&&(s=10),e.detail.invoke={delay:s},setTimeout(()=>{this.busy=!1,this.morphToggleTriggerElements.forEach(i=>i.busy=!1)},s-10),setTimeout(()=>G(this.targetElement.querySelector(_)),s+100)}get sharedViews(){if(!this.targetElement)return[];if(!this.targetElement.viewStack)return[];let e=(o,r)=>(this.targetElement.viewStack.includes(r)&&o.push(r),o);return this.viewStack.reduce(e.bind(this),[])}get renders(){return this.getAttribute("renders")}get morphs(){return this.getAttribute("morphs")}get morphToggleTriggerElements(){return Array.from(this.morphElement.querySelectorAll("turbo-boost-toggle-trigger"))}get controls(){return this.getAttribute("aria-controls")}get collapseSelector(){return this.getAttribute("collapse-selector")}get focusSelector(){return this.getAttribute("focus-selector")||this.targetElement.focusSelector}get remember(){return this.getAttribute("remember")==="true"}set remember(e){return this.setAttribute("remember",!!e)}get expanded(){return this.getAttribute("aria-expanded")==="true"}set expanded(e){this.setAttribute("aria-expanded",!!e)}get collapsed(){return!this.expanded}get command(){return this.dataset.turboCommand}get renderingLineLabel(){return"renders & morphs"}get morphElement(){return this.morphs?document.getElementById(this.morphs):null}get targetElement(){return this.controls?document.getElementById(this.controls):null}get triggerTooltipData(){let e=this.triggerElement.viewStack.reverse().map((o,r)=>this.triggerElement.sharedViews.includes(o)?`<div slot="content">${r+1}. ${o}</div>`:`<div slot="content-bottom">${r+1}. ${o}</div>`,this).join("");return{subtitle:`
      <b>id</b>: ${this.triggerElement.id}<br>
      <b>aria-controls</b>: ${this.triggerElement.controls}<br>
      <b>aria-expanded</b>: ${this.triggerElement.expanded}<br>
      <b>remember</b>: ${this.triggerElement.remember}<br>
    `,content:`
      <div slot="content-top">
        <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        <b>View Stack</b>
      </div>
      ${e}
    `}}get targetTooltipData(){let e=this.targetElement.viewStack.reverse().map((o,r)=>this.triggerElement.sharedViews.includes(o)?`<div slot="content">${r+1}. ${o}</div>`:`<div slot="content-bottom">${r+1}. ${o}</div>`,this).join("");return{subtitle:`<b>id</b>: ${this.targetElement.id}<br>
      <b>aria-labeled-by</b>: ${this.targetElement.labeledBy}<br>
`,content:`
      <div slot="content-top">
        <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        <b>View Stack</b>
      </div>
      ${e}
    `}}};customElements.define("turbo-boost",a);customElements.define("turbo-boost-toggle-target",f);customElements.define("turbo-boost-toggle-trigger",E);self.TurboBoost=self.TurboBoost||{};self.TurboBoost.devtools=P;self.TurboBoost.Elements={VERSION:V};var Pe=self.TurboBoost.Elements;export{Pe as default};
//# sourceMappingURL=elements.js.map
