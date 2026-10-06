const kf=()=>{};var fc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b=function(n,e){if(!n)throw vn(e)},vn=function(n){return new Error("Firebase Database ("+eh.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Rf=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[i++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(u>>10)),e[i++]=String.fromCharCode(56320+(u&1023))}else{const o=n[t++],a=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},io={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,y=o>>2,_=(o&3)<<4|l>>4;let v=(l&15)<<2|d>>6,A=d&63;u||(A=64,a||(v=64)),i.push(t[y],t[_],t[v],t[A])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(th(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Rf(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const _=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||l==null||d==null||_==null)throw new Nf;const v=o<<2|l>>4;if(i.push(v),d!==64){const A=l<<4&240|d>>2;if(i.push(A),_!==64){const R=d<<6&192|_;i.push(R)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Nf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const nh=function(n){const e=th(n);return io.encodeByteArray(e,!0)},Xi=function(n){return nh(n).replace(/\./g,"")},Qi=function(n){try{return io.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pf(n){return ih(void 0,n)}function ih(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Of(t)||(n[t]=ih(n[t],e[t]));return n}function Of(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Df(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mf=()=>Df().__FIREBASE_DEFAULTS__,Lf=()=>{if(typeof process>"u"||typeof fc>"u")return;const n=fc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},xf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Qi(n[1]);return e&&JSON.parse(e)},so=()=>{try{return kf()||Mf()||Lf()||xf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},sh=n=>{var e,t;return(t=(e=so())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},rh=n=>{const e=sh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},oh=()=>{var n;return(n=so())==null?void 0:n.config},ah=n=>{var e;return(e=so())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ro(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ch(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Xi(JSON.stringify(t)),Xi(JSON.stringify(a)),""].join(".")}const Gn={};function Ff(){const n={prod:[],emulator:[]};for(const e of Object.keys(Gn))Gn[e]?n.emulator.push(e):n.prod.push(e);return n}function Uf(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let pc=!1;function oo(n,e){if(typeof window>"u"||typeof document>"u"||!Kt(window.location.host)||Gn[n]===e||Gn[n]||pc)return;Gn[n]=e;function t(v){return`__firebase__banner__${v}`}const i="__firebase__banner",o=Ff().prod.length>0;function a(){const v=document.getElementById(i);v&&v.remove()}function l(v){v.style.display="flex",v.style.background="#7faaf0",v.style.position="fixed",v.style.bottom="5px",v.style.left="5px",v.style.padding=".5em",v.style.borderRadius="5px",v.style.alignItems="center"}function u(v,A){v.setAttribute("width","24"),v.setAttribute("id",A),v.setAttribute("height","24"),v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.style.marginLeft="-6px"}function d(){const v=document.createElement("span");return v.style.cursor="pointer",v.style.marginLeft="16px",v.style.fontSize="24px",v.innerHTML=" &times;",v.onclick=()=>{pc=!0,a()},v}function y(v,A){v.setAttribute("id",A),v.innerText="Learn more",v.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",v.setAttribute("target","__blank"),v.style.paddingLeft="5px",v.style.textDecoration="underline"}function _(){const v=Uf(i),A=t("text"),R=document.getElementById(A)||document.createElement("span"),P=t("learnmore"),D=document.getElementById(P)||document.createElement("a"),J=t("preprendIcon"),te=document.getElementById(J)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(v.created){const ae=v.element;l(ae),y(D,P);const xe=d();u(te,J),ae.append(te,R,D,xe),document.body.appendChild(ae)}o?(R.innerText="Preview backend disconnected.",te.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(te.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,R.innerText="Preview backend running in this workspace."),R.setAttribute("id",A)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",_):_()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ao(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(me())}function Vf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function lh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function hh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Bf(){const n=me();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function jf(){return eh.NODE_ADMIN===!0}function co(){try{return typeof indexedDB=="object"}catch{return!1}}function lo(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)==null?void 0:o.message)||"")}}catch(t){e(t)}})}function uh(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf="FirebaseError";class Le extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Wf,Object.setPrototypeOf(this,Le.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,St.prototype.create)}}class St{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?Hf(o,i):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Le(s,l,i)}}function Hf(n,e){return n.replace($f,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const $f=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ti(n){return JSON.parse(n)}function Z(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh=function(n){let e={},t={},i={},s="";try{const o=n.split(".");e=ti(Qi(o[0])||""),t=ti(Qi(o[1])||""),s=o[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Gf=function(n){const e=dh(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},qf=function(n){const e=dh(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function dn(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Lr(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Zi(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Ze(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const o=n[s],a=e[s];if(gc(o)&&gc(a)){if(!Ze(o,a))return!1}else if(o!==a)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function gc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let _=0;_<16;_++)i[_]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let _=0;_<16;_++)i[_]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let _=16;_<80;_++){const v=i[_-3]^i[_-8]^i[_-14]^i[_-16];i[_]=(v<<1|v>>>31)&4294967295}let s=this.chain_[0],o=this.chain_[1],a=this.chain_[2],l=this.chain_[3],u=this.chain_[4],d,y;for(let _=0;_<80;_++){_<40?_<20?(d=l^o&(a^l),y=1518500249):(d=o^a^l,y=1859775393):_<60?(d=o&a|l&(o|a),y=2400959708):(d=o^a^l,y=3395469782);const v=(s<<5|s>>>27)+d+u+y+i[_]&4294967295;u=l,l=a,a=(o<<30|o>>>2)&4294967295,o=s,s=v}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const o=this.buf_;let a=this.inbuf_;for(;s<t;){if(a===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(o[a]=e.charCodeAt(s),++a,++s,a===this.blockSize){this.compress_(o),a=0;break}}else for(;s<t;)if(o[a]=e[s],++a,++s,a===this.blockSize){this.compress_(o),a=0;break}}this.inbuf_=a,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let o=24;o>=0;o-=8)e[i]=this.chain_[s]>>o&255,++i;return e}}function Kf(n,e){const t=new Yf(n,e);return t.subscribe.bind(t)}class Yf{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Jf(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=dr),s.error===void 0&&(s.error=dr),s.complete===void 0&&(s.complete=dr);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Jf(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function dr(){}function ho(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xf=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const o=s-55296;i++,b(i<n.length,"Surrogate pair missing trail surrogate.");const a=n.charCodeAt(i)-56320;s=65536+(o<<10)+a}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Ss=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qf=1e3,Zf=2,ep=14400*1e3,tp=.5;function _c(n,e=Qf,t=Zf){const i=e*Math.pow(t,n),s=Math.round(tp*i*(Math.random()-.5)*2);return Math.min(ep,i+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(n){return n&&n._delegate?n._delegate:n}class Ie{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new Cs;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(sp(e))try{this.getOrInitializeService({instanceIdentifier:Pt})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:s});i.resolve(o)}catch{}}}}clearInstance(e=Pt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Pt){return this.instances.has(e)}getOptions(e=Pt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);i===l&&a.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:ip(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Pt){return this.component?this.component.multipleInstances?e:Pt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ip(n){return n===Pt?void 0:n}function sp(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new np(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(W||(W={}));const op={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},ap=W.INFO,cp={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},lp=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=cp[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class pi{constructor(e){this.name=e,this._logLevel=ap,this._logHandler=lp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?op[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}}const hp=(n,e)=>e.some(t=>n instanceof t);let mc,yc;function up(){return mc||(mc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function dp(){return yc||(yc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const fh=new WeakMap,xr=new WeakMap,ph=new WeakMap,fr=new WeakMap,uo=new WeakMap;function fp(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(Xe(n.result)),s()},a=()=>{i(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&fh.set(t,n)}).catch(()=>{}),uo.set(e,n),e}function pp(n){if(xr.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),s()},a=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});xr.set(n,e)}let Fr={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return xr.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ph.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Xe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function gp(n){Fr=n(Fr)}function _p(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(pr(this),e,...t);return ph.set(i,e.sort?e.sort():[e]),Xe(i)}:dp().includes(n)?function(...e){return n.apply(pr(this),e),Xe(fh.get(this))}:function(...e){return Xe(n.apply(pr(this),e))}}function mp(n){return typeof n=="function"?_p(n):(n instanceof IDBTransaction&&pp(n),hp(n,up())?new Proxy(n,Fr):n)}function Xe(n){if(n instanceof IDBRequest)return fp(n);if(fr.has(n))return fr.get(n);const e=mp(n);return e!==n&&(fr.set(n,e),uo.set(e,n)),e}const pr=n=>uo.get(n);function bs(n,e,{blocked:t,upgrade:i,blocking:s,terminated:o}={}){const a=indexedDB.open(n,e),l=Xe(a);return i&&a.addEventListener("upgradeneeded",u=>{i(Xe(a.result),u.oldVersion,u.newVersion,Xe(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{o&&u.addEventListener("close",()=>o()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}function gr(n,{blocked:e}={}){const t=indexedDB.deleteDatabase(n);return e&&t.addEventListener("blocked",i=>e(i.oldVersion,i)),Xe(t).then(()=>{})}const yp=["get","getKey","getAll","getAllKeys","count"],vp=["put","add","delete","clear"],_r=new Map;function vc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(_r.get(e))return _r.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=vp.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||yp.includes(t)))return;const o=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return i&&(d=d.index(l.shift())),(await Promise.all([d[t](...l),s&&u.done]))[0]};return _r.set(e,o),o}gp(n=>({...n,get:(e,t,i)=>vc(e,t)||n.get(e,t,i),has:(e,t)=>!!vc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ip(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Ip(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ur="@firebase/app",wc="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et=new pi("@firebase/app"),Ep="@firebase/app-compat",Tp="@firebase/analytics-compat",Cp="@firebase/analytics",Sp="@firebase/app-check-compat",bp="@firebase/app-check",Ap="@firebase/auth",kp="@firebase/auth-compat",Rp="@firebase/database",Np="@firebase/data-connect",Pp="@firebase/database-compat",Op="@firebase/functions",Dp="@firebase/functions-compat",Mp="@firebase/installations",Lp="@firebase/installations-compat",xp="@firebase/messaging",Fp="@firebase/messaging-compat",Up="@firebase/performance",Vp="@firebase/performance-compat",Bp="@firebase/remote-config",jp="@firebase/remote-config-compat",Wp="@firebase/storage",Hp="@firebase/storage-compat",$p="@firebase/firestore",Gp="@firebase/ai",qp="@firebase/firestore-compat",zp="firebase",Kp="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr="[DEFAULT]",Yp={[Ur]:"fire-core",[Ep]:"fire-core-compat",[Cp]:"fire-analytics",[Tp]:"fire-analytics-compat",[bp]:"fire-app-check",[Sp]:"fire-app-check-compat",[Ap]:"fire-auth",[kp]:"fire-auth-compat",[Rp]:"fire-rtdb",[Np]:"fire-data-connect",[Pp]:"fire-rtdb-compat",[Op]:"fire-fn",[Dp]:"fire-fn-compat",[Mp]:"fire-iid",[Lp]:"fire-iid-compat",[xp]:"fire-fcm",[Fp]:"fire-fcm-compat",[Up]:"fire-perf",[Vp]:"fire-perf-compat",[Bp]:"fire-rc",[jp]:"fire-rc-compat",[Wp]:"fire-gcs",[Hp]:"fire-gcs-compat",[$p]:"fire-fst",[qp]:"fire-fst-compat",[Gp]:"fire-vertex","fire-js":"fire-js",[zp]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es=new Map,Jp=new Map,Br=new Map;function Ic(n,e){try{n.container.addComponent(e)}catch(t){et.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ce(n){const e=n.name;if(Br.has(e))return et.debug(`There were multiple attempts to register component ${e}.`),!1;Br.set(e,n);for(const t of es.values())Ic(t,n);for(const t of Jp.values())Ic(t,n);return!0}function rt(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ke(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},yt=new St("app","Firebase",Xp);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Ie("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw yt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt=Kp;function Zp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:Vr,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw yt.create("bad-app-name",{appName:String(s)});if(t||(t=oh()),!t)throw yt.create("no-options");const o=es.get(s);if(o){if(Ze(t,o.options)&&Ze(i,o.config))return o;throw yt.create("duplicate-app",{appName:s})}const a=new rp(s);for(const u of Br.values())a.addComponent(u);const l=new Qp(t,i,a);return es.set(s,l),l}function gi(n=Vr){const e=es.get(n);if(!e&&n===Vr&&oh())return Zp();if(!e)throw yt.create("no-app",{appName:n});return e}function he(n,e,t){let i=Yp[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),et.warn(a.join(" "));return}Ce(new Ie(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eg="firebase-heartbeat-database",tg=1,ni="firebase-heartbeat-store";let mr=null;function gh(){return mr||(mr=bs(eg,tg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ni)}catch(t){console.warn(t)}}}}).catch(n=>{throw yt.create("idb-open",{originalErrorMessage:n.message})})),mr}async function ng(n){try{const t=(await gh()).transaction(ni),i=await t.objectStore(ni).get(_h(n));return await t.done,i}catch(e){if(e instanceof Le)et.warn(e.message);else{const t=yt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});et.warn(t.message)}}}async function Ec(n,e){try{const i=(await gh()).transaction(ni,"readwrite");await i.objectStore(ni).put(e,_h(n)),await i.done}catch(t){if(t instanceof Le)et.warn(t.message);else{const i=yt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});et.warn(i.message)}}}function _h(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ig=1024,sg=30;class rg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ag(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Tc();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>sg){const a=cg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){et.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Tc(),{heartbeatsToSend:i,unsentEntries:s}=og(this._heartbeatsCache.heartbeats),o=Xi(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return et.warn(t),""}}}function Tc(){return new Date().toISOString().substring(0,10)}function og(n,e=ig){const t=[];let i=n.slice();for(const s of n){const o=t.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),Cc(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Cc(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class ag{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return co()?lo().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ng(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Ec(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Ec(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Cc(n){return Xi(JSON.stringify({version:2,heartbeats:n})).length}function cg(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lg(n){Ce(new Ie("platform-logger",e=>new wp(e),"PRIVATE")),Ce(new Ie("heartbeat",e=>new rg(e),"PRIVATE")),he(Ur,wc,n),he(Ur,wc,"esm2020"),he("fire-js","")}lg("");var hg="firebase",ug="12.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */he(hg,ug,"app");const mh="@firebase/installations",fo="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yh=1e4,vh=`w:${fo}`,wh="FIS_v2",dg="https://firebaseinstallations.googleapis.com/v1",fg=3600*1e3,pg="installations",gg="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _g={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},jt=new St(pg,gg,_g);function Ih(n){return n instanceof Le&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eh({projectId:n}){return`${dg}/projects/${n}/installations`}function Th(n){return{token:n.token,requestStatus:2,expiresIn:yg(n.expiresIn),creationTime:Date.now()}}async function Ch(n,e){const i=(await e.json()).error;return jt.create("request-failed",{requestName:n,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function Sh({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function mg(n,{refreshToken:e}){const t=Sh(n);return t.append("Authorization",vg(e)),t}async function bh(n){const e=await n();return e.status>=500&&e.status<600?n():e}function yg(n){return Number(n.replace("s","000"))}function vg(n){return`${wh} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wg({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const i=Eh(n),s=Sh(n),o=e.getImmediate({optional:!0});if(o){const d=await o.getHeartbeatsHeader();d&&s.append("x-firebase-client",d)}const a={fid:t,authVersion:wh,appId:n.appId,sdkVersion:vh},l={method:"POST",headers:s,body:JSON.stringify(a)},u=await bh(()=>fetch(i,l));if(u.ok){const d=await u.json();return{fid:d.fid||t,registrationStatus:2,refreshToken:d.refreshToken,authToken:Th(d.authToken)}}else throw await Ch("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ah(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ig(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eg=/^[cdef][\w-]{21}$/,jr="";function Tg(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=Cg(n);return Eg.test(t)?t:jr}catch{return jr}}function Cg(n){return Ig(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function As(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kh=new Map;function Rh(n,e){const t=As(n);Nh(t,e),Sg(t,e)}function Nh(n,e){const t=kh.get(n);if(t)for(const i of t)i(e)}function Sg(n,e){const t=bg();t&&t.postMessage({key:n,fid:e}),Ag()}let Mt=null;function bg(){return!Mt&&"BroadcastChannel"in self&&(Mt=new BroadcastChannel("[Firebase] FID Change"),Mt.onmessage=n=>{Nh(n.data.key,n.data.fid)}),Mt}function Ag(){kh.size===0&&Mt&&(Mt.close(),Mt=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kg="firebase-installations-database",Rg=1,Wt="firebase-installations-store";let yr=null;function po(){return yr||(yr=bs(kg,Rg,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Wt)}}})),yr}async function ts(n,e){const t=As(n),s=(await po()).transaction(Wt,"readwrite"),o=s.objectStore(Wt),a=await o.get(t);return await o.put(e,t),await s.done,(!a||a.fid!==e.fid)&&Rh(n,e.fid),e}async function Ph(n){const e=As(n),i=(await po()).transaction(Wt,"readwrite");await i.objectStore(Wt).delete(e),await i.done}async function ks(n,e){const t=As(n),s=(await po()).transaction(Wt,"readwrite"),o=s.objectStore(Wt),a=await o.get(t),l=e(a);return l===void 0?await o.delete(t):await o.put(l,t),await s.done,l&&(!a||a.fid!==l.fid)&&Rh(n,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function go(n){let e;const t=await ks(n.appConfig,i=>{const s=Ng(i),o=Pg(n,s);return e=o.registrationPromise,o.installationEntry});return t.fid===jr?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function Ng(n){const e=n||{fid:Tg(),registrationStatus:0};return Oh(e)}function Pg(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(jt.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=Og(n,t);return{installationEntry:t,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Dg(n)}:{installationEntry:e}}async function Og(n,e){try{const t=await wg(n,e);return ts(n.appConfig,t)}catch(t){throw Ih(t)&&t.customData.serverCode===409?await Ph(n.appConfig):await ts(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function Dg(n){let e=await Sc(n.appConfig);for(;e.registrationStatus===1;)await Ah(100),e=await Sc(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:i}=await go(n);return i||t}return e}function Sc(n){return ks(n,e=>{if(!e)throw jt.create("installation-not-found");return Oh(e)})}function Oh(n){return Mg(n)?{fid:n.fid,registrationStatus:0}:n}function Mg(n){return n.registrationStatus===1&&n.registrationTime+yh<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lg({appConfig:n,heartbeatServiceProvider:e},t){const i=xg(n,t),s=mg(n,t),o=e.getImmediate({optional:!0});if(o){const d=await o.getHeartbeatsHeader();d&&s.append("x-firebase-client",d)}const a={installation:{sdkVersion:vh,appId:n.appId}},l={method:"POST",headers:s,body:JSON.stringify(a)},u=await bh(()=>fetch(i,l));if(u.ok){const d=await u.json();return Th(d)}else throw await Ch("Generate Auth Token",u)}function xg(n,{fid:e}){return`${Eh(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _o(n,e=!1){let t;const i=await ks(n.appConfig,o=>{if(!Dh(o))throw jt.create("not-registered");const a=o.authToken;if(!e&&Vg(a))return o;if(a.requestStatus===1)return t=Fg(n,e),o;{if(!navigator.onLine)throw jt.create("app-offline");const l=jg(o);return t=Ug(n,l),l}});return t?await t:i.authToken}async function Fg(n,e){let t=await bc(n.appConfig);for(;t.authToken.requestStatus===1;)await Ah(100),t=await bc(n.appConfig);const i=t.authToken;return i.requestStatus===0?_o(n,e):i}function bc(n){return ks(n,e=>{if(!Dh(e))throw jt.create("not-registered");const t=e.authToken;return Wg(t)?{...e,authToken:{requestStatus:0}}:e})}async function Ug(n,e){try{const t=await Lg(n,e),i={...e,authToken:t};return await ts(n.appConfig,i),t}catch(t){if(Ih(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await Ph(n.appConfig);else{const i={...e,authToken:{requestStatus:0}};await ts(n.appConfig,i)}throw t}}function Dh(n){return n!==void 0&&n.registrationStatus===2}function Vg(n){return n.requestStatus===2&&!Bg(n)}function Bg(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+fg}function jg(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function Wg(n){return n.requestStatus===1&&n.requestTime+yh<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hg(n){const e=n,{installationEntry:t,registrationPromise:i}=await go(e);return i?i.catch(console.error):_o(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $g(n,e=!1){const t=n;return await Gg(t),(await _o(t,e)).token}async function Gg(n){const{registrationPromise:e}=await go(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qg(n){if(!n||!n.options)throw vr("App Configuration");if(!n.name)throw vr("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw vr(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function vr(n){return jt.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh="installations",zg="installations-internal",Kg=n=>{const e=n.getProvider("app").getImmediate(),t=qg(e),i=rt(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},Yg=n=>{const e=n.getProvider("app").getImmediate(),t=rt(e,Mh).getImmediate();return{getId:()=>Hg(t),getToken:s=>$g(t,s)}};function Jg(){Ce(new Ie(Mh,Kg,"PUBLIC")),Ce(new Ie(zg,Yg,"PRIVATE"))}Jg();he(mh,fo);he(mh,fo,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ns="analytics",Xg="firebase_id",Qg="origin",Zg=60*1e3,e_="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",mo="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _e=new pi("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t_={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Te=new St("analytics","Analytics",t_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n_(n){if(!n.startsWith(mo)){const e=Te.create("invalid-gtag-resource",{gtagURL:n});return _e.warn(e.message),""}return n}function Lh(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function i_(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function s_(n,e){const t=i_("firebase-js-sdk-policy",{createScriptURL:n_}),i=document.createElement("script"),s=`${mo}?l=${n}&id=${e}`;i.src=t?t==null?void 0:t.createScriptURL(s):s,i.async=!0,document.head.appendChild(i)}function r_(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function o_(n,e,t,i,s,o){const a=i[s];try{if(a)await e[a];else{const u=(await Lh(t)).find(d=>d.measurementId===s);u&&await e[u.appId]}}catch(l){_e.error(l)}n("config",s,o)}async function a_(n,e,t,i,s){try{let o=[];if(s&&s.send_to){let a=s.send_to;Array.isArray(a)||(a=[a]);const l=await Lh(t);for(const u of a){const d=l.find(_=>_.measurementId===u),y=d&&e[d.appId];if(y)o.push(y);else{o=[];break}}}o.length===0&&(o=Object.values(e)),await Promise.all(o),n("event",i,s||{})}catch(o){_e.error(o)}}function c_(n,e,t,i){async function s(o,...a){try{if(o==="event"){const[l,u]=a;await a_(n,e,t,l,u)}else if(o==="config"){const[l,u]=a;await o_(n,e,t,i,l,u)}else if(o==="consent"){const[l,u]=a;n("consent",l,u)}else if(o==="get"){const[l,u,d]=a;n("get",l,u,d)}else if(o==="set"){const[l]=a;n("set",l)}else n(o,...a)}catch(l){_e.error(l)}}return s}function l_(n,e,t,i,s){let o=function(...a){window[i].push(arguments)};return window[s]&&typeof window[s]=="function"&&(o=window[s]),window[s]=c_(o,n,e,t),{gtagCore:o,wrappedGtag:window[s]}}function h_(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(mo)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_=30,d_=1e3;class f_{constructor(e={},t=d_){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const xh=new f_;function p_(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function g_(n){var a;const{appId:e,apiKey:t}=n,i={method:"GET",headers:p_(t)},s=e_.replace("{app-id}",e),o=await fetch(s,i);if(o.status!==200&&o.status!==304){let l="";try{const u=await o.json();(a=u.error)!=null&&a.message&&(l=u.error.message)}catch{}throw Te.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()}async function __(n,e=xh,t){const{appId:i,apiKey:s,measurementId:o}=n.options;if(!i)throw Te.create("no-app-id");if(!s){if(o)return{measurementId:o,appId:i};throw Te.create("no-api-key")}const a=e.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new v_;return setTimeout(async()=>{l.abort()},Zg),Fh({appId:i,apiKey:s,measurementId:o},a,l,e)}async function Fh(n,{throttleEndTimeMillis:e,backoffCount:t},i,s=xh){var l;const{appId:o,measurementId:a}=n;try{await m_(i,e)}catch(u){if(a)return _e.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:o,measurementId:a};throw u}try{const u=await g_(n);return s.deleteThrottleMetadata(o),u}catch(u){const d=u;if(!y_(d)){if(s.deleteThrottleMetadata(o),a)return _e.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:o,measurementId:a};throw u}const y=Number((l=d==null?void 0:d.customData)==null?void 0:l.httpStatus)===503?_c(t,s.intervalMillis,u_):_c(t,s.intervalMillis),_={throttleEndTimeMillis:Date.now()+y,backoffCount:t+1};return s.setThrottleMetadata(o,_),_e.debug(`Calling attemptFetch again in ${y} millis`),Fh(n,_,i,s)}}function m_(n,e){return new Promise((t,i)=>{const s=Math.max(e-Date.now(),0),o=setTimeout(t,s);n.addEventListener(()=>{clearTimeout(o),i(Te.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function y_(n){if(!(n instanceof Le)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class v_{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function w_(n,e,t,i,s){if(s&&s.global){n("event",t,i);return}else{const o=await e,a={...i,send_to:o};n("event",t,a)}}async function I_(n,e,t,i){if(i&&i.global){const s={};for(const o of Object.keys(t))s[`user_properties.${o}`]=t[o];return n("set",s),Promise.resolve()}else{const s=await e;n("config",s,{update:!0,user_properties:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function E_(){if(co())try{await lo()}catch(n){return _e.warn(Te.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return _e.warn(Te.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function T_(n,e,t,i,s,o,a){const l=__(n);l.then(v=>{t[v.measurementId]=v.appId,n.options.measurementId&&v.measurementId!==n.options.measurementId&&_e.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${v.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(v=>_e.error(v)),e.push(l);const u=E_().then(v=>{if(v)return i.getId()}),[d,y]=await Promise.all([l,u]);h_(o)||s_(o,d.measurementId),s("js",new Date);const _=(a==null?void 0:a.config)??{};return _[Qg]="firebase",_.update=!0,y!=null&&(_[Xg]=y),s("config",d.measurementId,_),d.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{constructor(e){this.app=e}_delete(){return delete rn[this.app.options.appId],Promise.resolve()}}let rn={},Ac=[];const kc={};let wr="dataLayer",S_="gtag",Rc,yo,Nc=!1;function b_(){const n=[];if(lh()&&n.push("This is a browser extension environment."),uh()||n.push("Cookies are not available."),n.length>0){const e=n.map((i,s)=>`(${s+1}) ${i}`).join(" "),t=Te.create("invalid-analytics-context",{errorInfo:e});_e.warn(t.message)}}function A_(n,e,t){b_();const i=n.options.appId;if(!i)throw Te.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)_e.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Te.create("no-api-key");if(rn[i]!=null)throw Te.create("already-exists",{id:i});if(!Nc){r_(wr);const{wrappedGtag:o,gtagCore:a}=l_(rn,Ac,kc,wr,S_);yo=o,Rc=a,Nc=!0}return rn[i]=T_(n,Ac,kc,e,Rc,wr,t),new C_(n)}function QE(n=gi()){n=oe(n);const e=rt(n,ns);return e.isInitialized()?e.getImmediate():k_(n)}function k_(n,e={}){const t=rt(n,ns);if(t.isInitialized()){const s=t.getImmediate();if(Ze(e,t.getOptions()))return s;throw Te.create("already-initialized")}return t.initialize({options:e})}function R_(n,e,t){n=oe(n),I_(yo,rn[n.app.options.appId],e,t).catch(i=>_e.error(i))}function N_(n,e,t,i){n=oe(n),w_(yo,rn[n.app.options.appId],e,t,i).catch(s=>_e.error(s))}const Pc="@firebase/analytics",Oc="0.10.19";function P_(){Ce(new Ie(ns,(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return A_(i,s,t)},"PUBLIC")),Ce(new Ie("analytics-internal",n,"PRIVATE")),he(Pc,Oc),he(Pc,Oc,"esm2020");function n(e){try{const t=e.getProvider(ns).getImmediate();return{logEvent:(i,s,o)=>N_(t,i,s,o),setUserProperties:(i,s)=>R_(t,i,s)}}catch(t){throw Te.create("interop-component-reg-failed",{reason:t})}}}P_();function Uh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const O_=Uh,Vh=new St("auth","Firebase",Uh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const is=new pi("@firebase/auth");function D_(n,...e){is.logLevel<=W.WARN&&is.warn(`Auth (${Yt}): ${n}`,...e)}function Gi(n,...e){is.logLevel<=W.ERROR&&is.error(`Auth (${Yt}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(n,...e){throw vo(n,...e)}function We(n,...e){return vo(n,...e)}function Bh(n,e,t){const i={...O_(),[e]:t};return new St("auth","Firebase",i).create(e,{appName:n.name})}function Ut(n){return Bh(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function vo(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Vh.create(n,...e)}function O(n,e,...t){if(!n)throw vo(e,...t)}function Ke(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Gi(e),new Error(e)}function nt(n,e){n||Ke(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wr(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function M_(){return Dc()==="http:"||Dc()==="https:"}function Dc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(M_()||lh()||"connection"in navigator)?navigator.onLine:!0}function x_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(e,t){this.shortDelay=e,this.longDelay=t,nt(t>e,"Short delay should be less than long delay!"),this.isMobile=ao()||hh()}get(){return L_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wo(n,e){nt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ke("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ke("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ke("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],V_=new _i(3e4,6e4);function Io(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function In(n,e,t,i,s={}){return Wh(n,s,async()=>{let o={},a={};i&&(e==="GET"?a=i:o={body:JSON.stringify(i)});const l=wn({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...o};return Vf()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&Kt(n.emulatorConfig.host)&&(d.credentials="include"),jh.fetch()(await Hh(n,n.config.apiHost,t,l),d)})}async function Wh(n,e,t){n._canInitEmulator=!1;const i={...F_,...e};try{const s=new j_(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw Bi(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const l=o.ok?a.errorMessage:a.error.message,[u,d]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Bi(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Bi(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Bi(n,"user-disabled",a);const y=i[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Bh(n,y,d);tt(n,y)}}catch(s){if(s instanceof Le)throw s;tt(n,"network-request-failed",{message:String(s)})}}async function B_(n,e,t,i,s={}){const o=await In(n,e,t,i,s);return"mfaPendingCredential"in o&&tt(n,"multi-factor-auth-required",{_serverResponse:o}),o}async function Hh(n,e,t,i){const s=`${e}${t}?${i}`,o=n,a=o.config.emulator?wo(n.config,s):`${n.config.apiScheme}://${s}`;return U_.includes(t)&&(await o._persistenceManagerAvailable,o._getPersistenceType()==="COOKIE")?o._getPersistence()._getFinalTarget(a).toString():a}class j_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(We(this.auth,"network-request-failed")),V_.get())})}}function Bi(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=We(n,e,i);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function W_(n,e){return In(n,"POST","/v1/accounts:delete",e)}async function ss(n,e){return In(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function H_(n,e=!1){const t=oe(n),i=await t.getIdToken(e),s=Eo(i);O(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:s,token:i,authTime:qn(Ir(s.auth_time)),issuedAtTime:qn(Ir(s.iat)),expirationTime:qn(Ir(s.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Ir(n){return Number(n)*1e3}function Eo(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Gi("JWT malformed, contained fewer than 3 sections"),null;try{const s=Qi(t);return s?JSON.parse(s):(Gi("Failed to decode base64 JWT payload"),null)}catch(s){return Gi("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Mc(n){const e=Eo(n);return O(e,"internal-error"),O(typeof e.exp<"u","internal-error"),O(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ii(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Le&&$_(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function $_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=qn(this.lastLoginAt),this.creationTime=qn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rs(n){var _;const e=n.auth,t=await n.getIdToken(),i=await ii(n,ss(e,{idToken:t}));O(i==null?void 0:i.users.length,e,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=(_=s.providerUserInfo)!=null&&_.length?$h(s.providerUserInfo):[],a=z_(n.providerData,o),l=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),d=l?u:!1,y={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Hr(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,y)}async function q_(n){const e=oe(n);await rs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function z_(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function $h(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K_(n,e){const t=await Wh(n,{},async()=>{const i=wn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,a=await Hh(n,s,"/v1/token",`key=${o}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:i};return n.emulatorConfig&&Kt(n.emulatorConfig.host)&&(u.credentials="include"),jh.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Y_(n,e){return In(n,"POST","/v2/accounts:revokeToken",Io(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){O(e.idToken,"internal-error"),O(typeof e.idToken<"u","internal-error"),O(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Mc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){O(e.length!==0,"internal-error");const t=Mc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(O(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:o}=await K_(e,t);this.updateTokensAndExpiration(i,s,Number(o))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:o}=t,a=new on;return i&&(O(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),s&&(O(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),o&&(O(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new on,this.toJSON())}_performRefresh(){return Ke("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(n,e){O(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ne{constructor({uid:e,auth:t,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new G_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Hr(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ii(this,this.stsTokenManager.getToken(this.auth,e));return O(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return H_(this,e)}reload(){return q_(this)}_assign(e){this!==e&&(O(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ne({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){O(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await rs(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ke(this.auth.app))return Promise.reject(Ut(this.auth));const e=await this.getIdToken();return await ii(this,W_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,s=t.email??void 0,o=t.phoneNumber??void 0,a=t.photoURL??void 0,l=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,y=t.lastLoginAt??void 0,{uid:_,emailVerified:v,isAnonymous:A,providerData:R,stsTokenManager:P}=t;O(_&&P,e,"internal-error");const D=on.fromJSON(this.name,P);O(typeof _=="string",e,"internal-error"),ft(i,e.name),ft(s,e.name),O(typeof v=="boolean",e,"internal-error"),O(typeof A=="boolean",e,"internal-error"),ft(o,e.name),ft(a,e.name),ft(l,e.name),ft(u,e.name),ft(d,e.name),ft(y,e.name);const J=new Ne({uid:_,auth:e,email:s,emailVerified:v,displayName:i,isAnonymous:A,photoURL:a,phoneNumber:o,tenantId:l,stsTokenManager:D,createdAt:d,lastLoginAt:y});return R&&Array.isArray(R)&&(J.providerData=R.map(te=>({...te}))),u&&(J._redirectEventId=u),J}static async _fromIdTokenResponse(e,t,i=!1){const s=new on;s.updateFromServerResponse(t);const o=new Ne({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await rs(o),o}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];O(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?$h(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(o!=null&&o.length),l=new on;l.updateFromIdToken(i);const u=new Ne({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Hr(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(o!=null&&o.length)};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lc=new Map;function Ye(n){nt(n instanceof Function,"Expected a class definition");let e=Lc.get(n);return e?(nt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Lc.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Gh.type="NONE";const xc=Gh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qi(n,e,t){return`firebase:${n}:${e}:${t}`}class an{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:o}=this.auth;this.fullUserKey=qi(this.userKey,s.apiKey,o),this.fullPersistenceKey=qi("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ss(this.auth,{idToken:e}).catch(()=>{});return t?Ne._fromGetAccountInfoResponse(this.auth,t,e):null}return Ne._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new an(Ye(xc),e,i);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=s[0]||Ye(xc);const a=qi(i,e.config.apiKey,e.name);let l=null;for(const d of t)try{const y=await d._get(a);if(y){let _;if(typeof y=="string"){const v=await ss(e,{idToken:y}).catch(()=>{});if(!v)break;_=await Ne._fromGetAccountInfoResponse(e,v,y)}else _=Ne._fromJSON(e,y);d!==o&&(l=_),o=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!u.length?new an(o,e,i):(o=u[0],l&&await o._set(a,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new an(o,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Yh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(qh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Xh(e))return"Blackberry";if(Qh(e))return"Webos";if(zh(e))return"Safari";if((e.includes("chrome/")||Kh(e))&&!e.includes("edge/"))return"Chrome";if(Jh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function qh(n=me()){return/firefox\//i.test(n)}function zh(n=me()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Kh(n=me()){return/crios\//i.test(n)}function Yh(n=me()){return/iemobile/i.test(n)}function Jh(n=me()){return/android/i.test(n)}function Xh(n=me()){return/blackberry/i.test(n)}function Qh(n=me()){return/webos/i.test(n)}function To(n=me()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function J_(n=me()){var e;return To(n)&&!!((e=window.navigator)!=null&&e.standalone)}function X_(){return Bf()&&document.documentMode===10}function Zh(n=me()){return To(n)||Jh(n)||Qh(n)||Xh(n)||/windows phone/i.test(n)||Yh(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(n,e=[]){let t;switch(n){case"Browser":t=Fc(me());break;case"Worker":t=`${Fc(me())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Yt}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=o=>new Promise((a,l)=>{try{const u=e(o);a(u)}catch(u){l(u)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Z_(n,e={}){return In(n,"GET","/v2/passwordPolicy",Io(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const em=6;class tm{constructor(e){var i;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??em,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((i=e.allowedNonAlphanumericCharacters)==null?void 0:i.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Uc(this),this.idTokenSubscription=new Uc(this),this.beforeStateQueue=new Q_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Vh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(o=>this._resolvePersistenceManagerAvailable=o)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ye(t)),this._initializationPromise=this.queue(async()=>{var i,s,o;if(!this._deleted&&(this.persistenceManager=await an.create(this,e),(i=this._resolvePersistenceManagerAvailable)==null||i.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((o=this.currentUser)==null?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ss(this,{idToken:e}),i=await Ne._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var o;if(ke(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(o=this.redirectUser)==null?void 0:o._redirectEventId,l=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return O(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await rs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=x_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ke(this.app))return Promise.reject(Ut(this));const t=e?oe(e):null;return t&&O(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&O(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ke(this.app)?Promise.reject(Ut(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ke(this.app)?Promise.reject(Ut(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ye(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Z_(this),t=new tm(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new St("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Y_(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ye(e)||this._popupRedirectResolver;O(t,this,"argument-error"),this.redirectPersistenceManager=await an.create(this,[Ye(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)==null?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(O(l,this,"internal-error"),l.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,i,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return O(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=eu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){var t;if(ke(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&D_(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Co(n){return oe(n)}class Uc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Kf(t=>this.observer=t)}get next(){return O(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let So={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function im(n){So=n}function sm(n){return So.loadJS(n)}function rm(){return So.gapiScript}function om(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function am(n,e){const t=rt(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),o=t.getOptions();if(Ze(o,e??{}))return s;tt(s,"already-initialized")}return t.initialize({options:e})}function cm(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(Ye);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function lm(n,e,t){const i=Co(n);O(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,o=tu(e),{host:a,port:l}=hm(e),u=l===null?"":`:${l}`,d={url:`${o}//${a}${u}/`},y=Object.freeze({host:a,port:l,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){O(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),O(Ze(d,i.config.emulator)&&Ze(y,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=d,i.emulatorConfig=y,i.settings.appVerificationDisabledForTesting=!0,Kt(a)?(ro(`${o}//${a}${u}`),oo("Auth",!0)):um()}function tu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function hm(n){const e=tu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const o=s[1];return{host:o,port:Vc(i.substr(o.length+1))}}else{const[o,a]=i.split(":");return{host:o,port:Vc(a)}}}function Vc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function um(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ke("not implemented")}_getIdTokenResponse(e){return Ke("not implemented")}_linkToIdToken(e,t){return Ke("not implemented")}_getReauthenticationResolver(e){return Ke("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cn(n,e){return B_(n,"POST","/v1/accounts:signInWithIdp",Io(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dm="http://localhost";class Ht extends nu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ht(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):tt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...o}=t;if(!i||!s)return null;const a=new Ht(i,s);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return cn(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,cn(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,cn(e,t)}buildRequest(){const e={requestUri:dm,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=wn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi extends iu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt extends mi{constructor(){super("facebook.com")}static credential(e){return Ht._fromParams({providerId:pt.PROVIDER_ID,signInMethod:pt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return pt.credentialFromTaggedObject(e)}static credentialFromError(e){return pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return pt.credential(e.oauthAccessToken)}catch{return null}}}pt.FACEBOOK_SIGN_IN_METHOD="facebook.com";pt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt extends mi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ht._fromParams({providerId:gt.PROVIDER_ID,signInMethod:gt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return gt.credentialFromTaggedObject(e)}static credentialFromError(e){return gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return gt.credential(t,i)}catch{return null}}}gt.GOOGLE_SIGN_IN_METHOD="google.com";gt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends mi{constructor(){super("github.com")}static credential(e){return Ht._fromParams({providerId:_t.PROVIDER_ID,signInMethod:_t.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _t.credentialFromTaggedObject(e)}static credentialFromError(e){return _t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _t.credential(e.oauthAccessToken)}catch{return null}}}_t.GITHUB_SIGN_IN_METHOD="github.com";_t.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt extends mi{constructor(){super("twitter.com")}static credential(e,t){return Ht._fromParams({providerId:mt.PROVIDER_ID,signInMethod:mt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return mt.credentialFromTaggedObject(e)}static credentialFromError(e){return mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return mt.credential(t,i)}catch{return null}}}mt.TWITTER_SIGN_IN_METHOD="twitter.com";mt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const o=await Ne._fromIdTokenResponse(e,i,s),a=Bc(i);return new fn({user:o,providerId:a,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Bc(i);return new fn({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Bc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os extends Le{constructor(e,t,i,s){super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,os.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new os(e,t,i,s)}}function su(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?os._fromErrorAndOperation(n,o,e,i):o})}async function fm(n,e,t=!1){const i=await ii(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return fn._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pm(n,e,t=!1){const{auth:i}=n;if(ke(i.app))return Promise.reject(Ut(i));const s="reauthenticate";try{const o=await ii(n,su(i,s,e,n),t);O(o.idToken,i,"internal-error");const a=Eo(o.idToken);O(a,i,"internal-error");const{sub:l}=a;return O(n.uid===l,i,"user-mismatch"),fn._forOperation(n,s,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&tt(i,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gm(n,e,t=!1){if(ke(n.app))return Promise.reject(Ut(n));const i="signIn",s=await su(n,i,e),o=await fn._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(o.user),o}function _m(n,e,t,i){return oe(n).onIdTokenChanged(e,t,i)}function mm(n,e,t){return oe(n).beforeAuthStateChanged(e,t)}const as="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(as,"1"),this.storage.removeItem(as),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ym=1e3,vm=10;class ou extends ru{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Zh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(i);!t&&this.localCache[i]===a||this.notifyListeners(i,a)},o=this.storage.getItem(i);X_()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,vm):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},ym)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ou.type="LOCAL";const wm=ou;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au extends ru{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}au.type="SESSION";const cu=au;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Im(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new Rs(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:o}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const l=Array.from(a).map(async d=>d(t.origin,o)),u=await Im(l);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Rs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bo(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,a;return new Promise((l,u)=>{const d=bo("",20);s.port1.start();const y=setTimeout(()=>{u(new Error("unsupported_event"))},i);a={messageChannel:s,onMessage(_){const v=_;if(v.data.eventId===d)switch(v.data.status){case"ack":clearTimeout(y),o=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),l(v.data.response);break;default:clearTimeout(y),clearTimeout(o),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(){return window}function Tm(n){He().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lu(){return typeof He().WorkerGlobalScope<"u"&&typeof He().importScripts=="function"}async function Cm(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Sm(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function bm(){return lu()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hu="firebaseLocalStorageDb",Am=1,cs="firebaseLocalStorage",uu="fbase_key";class yi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ns(n,e){return n.transaction([cs],e?"readwrite":"readonly").objectStore(cs)}function km(){const n=indexedDB.deleteDatabase(hu);return new yi(n).toPromise()}function $r(){const n=indexedDB.open(hu,Am);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(cs,{keyPath:uu})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(cs)?e(i):(i.close(),await km(),e(await $r()))})})}async function jc(n,e,t){const i=Ns(n,!0).put({[uu]:e,value:t});return new yi(i).toPromise()}async function Rm(n,e){const t=Ns(n,!1).get(e),i=await new yi(t).toPromise();return i===void 0?null:i.value}function Wc(n,e){const t=Ns(n,!0).delete(e);return new yi(t).toPromise()}const Nm=800,Pm=3;class du{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await $r(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>Pm)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return lu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Rs._getInstance(bm()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,i;if(this.activeServiceWorker=await Cm(),!this.activeServiceWorker)return;this.sender=new Em(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(i=e[0])!=null&&i.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Sm()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await $r();return await jc(e,as,"1"),await Wc(e,as),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>jc(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>Rm(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Wc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=Ns(s,!1).getAll();return new yi(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Nm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}du.type="LOCAL";const Om=du;new _i(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dm(n,e){return e?Ye(e):(O(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao extends nu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return cn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return cn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return cn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Mm(n){return gm(n.auth,new Ao(n),n.bypassAuthState)}function Lm(n){const{auth:e,user:t}=n;return O(t,e,"internal-error"),pm(t,new Ao(n),n.bypassAuthState)}async function xm(n){const{auth:e,user:t}=n;return O(t,e,"internal-error"),fm(t,new Ao(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e,t,i,s,o=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:o,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:i,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Mm;case"linkViaPopup":case"linkViaRedirect":return xm;case"reauthViaPopup":case"reauthViaRedirect":return Lm;default:tt(this.auth,"internal-error")}}resolve(e){nt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){nt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fm=new _i(2e3,1e4);class nn extends fu{constructor(e,t,i,s,o){super(e,t,s,o),this.provider=i,this.authWindow=null,this.pollId=null,nn.currentPopupAction&&nn.currentPopupAction.cancel(),nn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return O(e,this.auth,"internal-error"),e}async onExecution(){nt(this.filter.length===1,"Popup operations only handle one event");const e=bo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(We(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(We(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,nn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if((i=(t=this.authWindow)==null?void 0:t.window)!=null&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(We(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Fm.get())};e()}}nn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Um="pendingRedirect",zi=new Map;class Vm extends fu{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=zi.get(this.auth._key());if(!e){try{const i=await Bm(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}zi.set(this.auth._key(),e)}return this.bypassAuthState||zi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Bm(n,e){const t=Hm(e),i=Wm(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function jm(n,e){zi.set(n._key(),e)}function Wm(n){return Ye(n._redirectPersistence)}function Hm(n){return qi(Um,n.config.apiKey,n.name)}async function $m(n,e,t=!1){if(ke(n.app))return Promise.reject(Ut(n));const i=Co(n),s=Dm(i,e),a=await new Vm(i,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gm=600*1e3;class qm{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!zm(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!pu(e)){const s=((i=e.error.code)==null?void 0:i.split("auth/")[1])||"internal-error";t.onError(We(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Gm&&this.cachedEventUids.clear(),this.cachedEventUids.has(Hc(e))}saveEventToCache(e){this.cachedEventUids.add(Hc(e)),this.lastProcessedEventTime=Date.now()}}function Hc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function pu({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function zm(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return pu(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Km(n,e={}){return In(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ym=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Jm=/^https?/;async function Xm(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Km(n);for(const t of e)try{if(Qm(t))return}catch{}tt(n,"unauthorized-domain")}function Qm(n){const e=Wr(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===i}if(!Jm.test(t))return!1;if(Ym.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm=new _i(3e4,6e4);function $c(){const n=He().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function ey(n){return new Promise((e,t)=>{var s,o,a;function i(){$c(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{$c(),t(We(n,"network-request-failed"))},timeout:Zm.get()})}if((o=(s=He().gapi)==null?void 0:s.iframes)!=null&&o.Iframe)e(gapi.iframes.getContext());else if((a=He().gapi)!=null&&a.load)i();else{const l=om("iframefcb");return He()[l]=()=>{gapi.load?i():t(We(n,"network-request-failed"))},sm(`${rm()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw Ki=null,e})}let Ki=null;function ty(n){return Ki=Ki||ey(n),Ki}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ny=new _i(5e3,15e3),iy="__/auth/iframe",sy="emulator/auth/iframe",ry={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},oy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ay(n){const e=n.config;O(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?wo(e,sy):`https://${n.config.authDomain}/${iy}`,i={apiKey:e.apiKey,appName:n.name,v:Yt},s=oy.get(n.config.apiHost);s&&(i.eid=s);const o=n._getFrameworks();return o.length&&(i.fw=o.join(",")),`${t}?${wn(i).slice(1)}`}async function cy(n){const e=await ty(n),t=He().gapi;return O(t,n,"internal-error"),e.open({where:document.body,url:ay(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ry,dontclear:!0},i=>new Promise(async(s,o)=>{await i.restyle({setHideOnLeave:!1});const a=We(n,"network-request-failed"),l=He().setTimeout(()=>{o(a)},ny.get());function u(){He().clearTimeout(l),s(i)}i.ping(u).then(u,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ly={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},hy=500,uy=600,dy="_blank",fy="http://localhost";class Gc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function py(n,e,t,i=hy,s=uy){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let l="";const u={...ly,width:i.toString(),height:s.toString(),top:o,left:a},d=me().toLowerCase();t&&(l=Kh(d)?dy:t),qh(d)&&(e=e||fy,u.scrollbars="yes");const y=Object.entries(u).reduce((v,[A,R])=>`${v}${A}=${R},`,"");if(J_(d)&&l!=="_self")return gy(e||"",l),new Gc(null);const _=window.open(e||"",l,y);O(_,n,"popup-blocked");try{_.focus()}catch{}return new Gc(_)}function gy(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _y="__/auth/handler",my="emulator/auth/handler",yy=encodeURIComponent("fac");async function qc(n,e,t,i,s,o){O(n.config.authDomain,n,"auth-domain-config-required"),O(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:Yt,eventId:s};if(e instanceof iu){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Lr(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[y,_]of Object.entries({}))a[y]=_}if(e instanceof mi){const y=e.getScopes().filter(_=>_!=="");y.length>0&&(a.scopes=y.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const y of Object.keys(l))l[y]===void 0&&delete l[y];const u=await n._getAppCheckToken(),d=u?`#${yy}=${encodeURIComponent(u)}`:"";return`${vy(n)}?${wn(l).slice(1)}${d}`}function vy({config:n}){return n.emulator?wo(n,my):`https://${n.authDomain}/${_y}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Er="webStorageSupport";class wy{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=cu,this._completeRedirectFn=$m,this._overrideRedirectResult=jm}async _openPopup(e,t,i,s){var a;nt((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const o=await qc(e,t,i,Wr(),s);return py(e,o,bo())}async _openRedirect(e,t,i,s){await this._originValidation(e);const o=await qc(e,t,i,Wr(),s);return Tm(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):(nt(o,"If manager is not set, promise should be"),o)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await cy(e),i=new qm(e);return t.register("authEvent",s=>(O(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Er,{type:Er},s=>{var a;const o=(a=s==null?void 0:s[0])==null?void 0:a[Er];o!==void 0&&t(!!o),tt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Xm(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Zh()||zh()||To()}}const Iy=wy;var zc="@firebase/auth",Kc="1.11.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ey{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){O(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ty(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Cy(n){Ce(new Ie("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=i.options;O(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:eu(n)},d=new nm(i,s,o,u);return cm(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),Ce(new Ie("auth-internal",e=>{const t=Co(e.getProvider("auth").getImmediate());return(i=>new Ey(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),he(zc,Kc,Ty(n)),he(zc,Kc,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sy=300,by=ah("authIdTokenMaxAge")||Sy;let Yc=null;const Ay=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>by)return;const s=t==null?void 0:t.token;Yc!==s&&(Yc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function ZE(n=gi()){const e=rt(n,"auth");if(e.isInitialized())return e.getImmediate();const t=am(n,{popupRedirectResolver:Iy,persistence:[Om,wm,cu]}),i=ah("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(i,location.origin);if(location.origin===o.origin){const a=Ay(o.toString());mm(t,a,()=>a(t.currentUser)),_m(t,l=>a(l))}}const s=sh("auth");return s&&lm(t,`http://${s}`),t}function ky(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}im({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const o=We("internal-error");o.customData=s,t(o)},i.type="text/javascript",i.charset="UTF-8",ky().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Cy("Browser");var Jc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ko;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,p){function m(){}m.prototype=p.prototype,I.F=p.prototype,I.prototype=new m,I.prototype.constructor=I,I.D=function(E,w,C){for(var g=Array(arguments.length-2),ye=2;ye<arguments.length;ye++)g[ye-2]=arguments[ye];return p.prototype[w].apply(E,g)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(i,t),i.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,p,m){m||(m=0);const E=Array(16);if(typeof p=="string")for(var w=0;w<16;++w)E[w]=p.charCodeAt(m++)|p.charCodeAt(m++)<<8|p.charCodeAt(m++)<<16|p.charCodeAt(m++)<<24;else for(w=0;w<16;++w)E[w]=p[m++]|p[m++]<<8|p[m++]<<16|p[m++]<<24;p=I.g[0],m=I.g[1],w=I.g[2];let C=I.g[3],g;g=p+(C^m&(w^C))+E[0]+3614090360&4294967295,p=m+(g<<7&4294967295|g>>>25),g=C+(w^p&(m^w))+E[1]+3905402710&4294967295,C=p+(g<<12&4294967295|g>>>20),g=w+(m^C&(p^m))+E[2]+606105819&4294967295,w=C+(g<<17&4294967295|g>>>15),g=m+(p^w&(C^p))+E[3]+3250441966&4294967295,m=w+(g<<22&4294967295|g>>>10),g=p+(C^m&(w^C))+E[4]+4118548399&4294967295,p=m+(g<<7&4294967295|g>>>25),g=C+(w^p&(m^w))+E[5]+1200080426&4294967295,C=p+(g<<12&4294967295|g>>>20),g=w+(m^C&(p^m))+E[6]+2821735955&4294967295,w=C+(g<<17&4294967295|g>>>15),g=m+(p^w&(C^p))+E[7]+4249261313&4294967295,m=w+(g<<22&4294967295|g>>>10),g=p+(C^m&(w^C))+E[8]+1770035416&4294967295,p=m+(g<<7&4294967295|g>>>25),g=C+(w^p&(m^w))+E[9]+2336552879&4294967295,C=p+(g<<12&4294967295|g>>>20),g=w+(m^C&(p^m))+E[10]+4294925233&4294967295,w=C+(g<<17&4294967295|g>>>15),g=m+(p^w&(C^p))+E[11]+2304563134&4294967295,m=w+(g<<22&4294967295|g>>>10),g=p+(C^m&(w^C))+E[12]+1804603682&4294967295,p=m+(g<<7&4294967295|g>>>25),g=C+(w^p&(m^w))+E[13]+4254626195&4294967295,C=p+(g<<12&4294967295|g>>>20),g=w+(m^C&(p^m))+E[14]+2792965006&4294967295,w=C+(g<<17&4294967295|g>>>15),g=m+(p^w&(C^p))+E[15]+1236535329&4294967295,m=w+(g<<22&4294967295|g>>>10),g=p+(w^C&(m^w))+E[1]+4129170786&4294967295,p=m+(g<<5&4294967295|g>>>27),g=C+(m^w&(p^m))+E[6]+3225465664&4294967295,C=p+(g<<9&4294967295|g>>>23),g=w+(p^m&(C^p))+E[11]+643717713&4294967295,w=C+(g<<14&4294967295|g>>>18),g=m+(C^p&(w^C))+E[0]+3921069994&4294967295,m=w+(g<<20&4294967295|g>>>12),g=p+(w^C&(m^w))+E[5]+3593408605&4294967295,p=m+(g<<5&4294967295|g>>>27),g=C+(m^w&(p^m))+E[10]+38016083&4294967295,C=p+(g<<9&4294967295|g>>>23),g=w+(p^m&(C^p))+E[15]+3634488961&4294967295,w=C+(g<<14&4294967295|g>>>18),g=m+(C^p&(w^C))+E[4]+3889429448&4294967295,m=w+(g<<20&4294967295|g>>>12),g=p+(w^C&(m^w))+E[9]+568446438&4294967295,p=m+(g<<5&4294967295|g>>>27),g=C+(m^w&(p^m))+E[14]+3275163606&4294967295,C=p+(g<<9&4294967295|g>>>23),g=w+(p^m&(C^p))+E[3]+4107603335&4294967295,w=C+(g<<14&4294967295|g>>>18),g=m+(C^p&(w^C))+E[8]+1163531501&4294967295,m=w+(g<<20&4294967295|g>>>12),g=p+(w^C&(m^w))+E[13]+2850285829&4294967295,p=m+(g<<5&4294967295|g>>>27),g=C+(m^w&(p^m))+E[2]+4243563512&4294967295,C=p+(g<<9&4294967295|g>>>23),g=w+(p^m&(C^p))+E[7]+1735328473&4294967295,w=C+(g<<14&4294967295|g>>>18),g=m+(C^p&(w^C))+E[12]+2368359562&4294967295,m=w+(g<<20&4294967295|g>>>12),g=p+(m^w^C)+E[5]+4294588738&4294967295,p=m+(g<<4&4294967295|g>>>28),g=C+(p^m^w)+E[8]+2272392833&4294967295,C=p+(g<<11&4294967295|g>>>21),g=w+(C^p^m)+E[11]+1839030562&4294967295,w=C+(g<<16&4294967295|g>>>16),g=m+(w^C^p)+E[14]+4259657740&4294967295,m=w+(g<<23&4294967295|g>>>9),g=p+(m^w^C)+E[1]+2763975236&4294967295,p=m+(g<<4&4294967295|g>>>28),g=C+(p^m^w)+E[4]+1272893353&4294967295,C=p+(g<<11&4294967295|g>>>21),g=w+(C^p^m)+E[7]+4139469664&4294967295,w=C+(g<<16&4294967295|g>>>16),g=m+(w^C^p)+E[10]+3200236656&4294967295,m=w+(g<<23&4294967295|g>>>9),g=p+(m^w^C)+E[13]+681279174&4294967295,p=m+(g<<4&4294967295|g>>>28),g=C+(p^m^w)+E[0]+3936430074&4294967295,C=p+(g<<11&4294967295|g>>>21),g=w+(C^p^m)+E[3]+3572445317&4294967295,w=C+(g<<16&4294967295|g>>>16),g=m+(w^C^p)+E[6]+76029189&4294967295,m=w+(g<<23&4294967295|g>>>9),g=p+(m^w^C)+E[9]+3654602809&4294967295,p=m+(g<<4&4294967295|g>>>28),g=C+(p^m^w)+E[12]+3873151461&4294967295,C=p+(g<<11&4294967295|g>>>21),g=w+(C^p^m)+E[15]+530742520&4294967295,w=C+(g<<16&4294967295|g>>>16),g=m+(w^C^p)+E[2]+3299628645&4294967295,m=w+(g<<23&4294967295|g>>>9),g=p+(w^(m|~C))+E[0]+4096336452&4294967295,p=m+(g<<6&4294967295|g>>>26),g=C+(m^(p|~w))+E[7]+1126891415&4294967295,C=p+(g<<10&4294967295|g>>>22),g=w+(p^(C|~m))+E[14]+2878612391&4294967295,w=C+(g<<15&4294967295|g>>>17),g=m+(C^(w|~p))+E[5]+4237533241&4294967295,m=w+(g<<21&4294967295|g>>>11),g=p+(w^(m|~C))+E[12]+1700485571&4294967295,p=m+(g<<6&4294967295|g>>>26),g=C+(m^(p|~w))+E[3]+2399980690&4294967295,C=p+(g<<10&4294967295|g>>>22),g=w+(p^(C|~m))+E[10]+4293915773&4294967295,w=C+(g<<15&4294967295|g>>>17),g=m+(C^(w|~p))+E[1]+2240044497&4294967295,m=w+(g<<21&4294967295|g>>>11),g=p+(w^(m|~C))+E[8]+1873313359&4294967295,p=m+(g<<6&4294967295|g>>>26),g=C+(m^(p|~w))+E[15]+4264355552&4294967295,C=p+(g<<10&4294967295|g>>>22),g=w+(p^(C|~m))+E[6]+2734768916&4294967295,w=C+(g<<15&4294967295|g>>>17),g=m+(C^(w|~p))+E[13]+1309151649&4294967295,m=w+(g<<21&4294967295|g>>>11),g=p+(w^(m|~C))+E[4]+4149444226&4294967295,p=m+(g<<6&4294967295|g>>>26),g=C+(m^(p|~w))+E[11]+3174756917&4294967295,C=p+(g<<10&4294967295|g>>>22),g=w+(p^(C|~m))+E[2]+718787259&4294967295,w=C+(g<<15&4294967295|g>>>17),g=m+(C^(w|~p))+E[9]+3951481745&4294967295,I.g[0]=I.g[0]+p&4294967295,I.g[1]=I.g[1]+(w+(g<<21&4294967295|g>>>11))&4294967295,I.g[2]=I.g[2]+w&4294967295,I.g[3]=I.g[3]+C&4294967295}i.prototype.v=function(I,p){p===void 0&&(p=I.length);const m=p-this.blockSize,E=this.C;let w=this.h,C=0;for(;C<p;){if(w==0)for(;C<=m;)s(this,I,C),C+=this.blockSize;if(typeof I=="string"){for(;C<p;)if(E[w++]=I.charCodeAt(C++),w==this.blockSize){s(this,E),w=0;break}}else for(;C<p;)if(E[w++]=I[C++],w==this.blockSize){s(this,E),w=0;break}}this.h=w,this.o+=p},i.prototype.A=function(){var I=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);I[0]=128;for(var p=1;p<I.length-8;++p)I[p]=0;p=this.o*8;for(var m=I.length-8;m<I.length;++m)I[m]=p&255,p/=256;for(this.v(I),I=Array(16),p=0,m=0;m<4;++m)for(let E=0;E<32;E+=8)I[p++]=this.g[m]>>>E&255;return I};function o(I,p){var m=l;return Object.prototype.hasOwnProperty.call(m,I)?m[I]:m[I]=p(I)}function a(I,p){this.h=p;const m=[];let E=!0;for(let w=I.length-1;w>=0;w--){const C=I[w]|0;E&&C==p||(m[w]=C,E=!1)}this.g=m}var l={};function u(I){return-128<=I&&I<128?o(I,function(p){return new a([p|0],p<0?-1:0)}):new a([I|0],I<0?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return _;if(I<0)return D(d(-I));const p=[];let m=1;for(let E=0;I>=m;E++)p[E]=I/m|0,m*=4294967296;return new a(p,0)}function y(I,p){if(I.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(I.charAt(0)=="-")return D(y(I.substring(1),p));if(I.indexOf("-")>=0)throw Error('number format error: interior "-" character');const m=d(Math.pow(p,8));let E=_;for(let C=0;C<I.length;C+=8){var w=Math.min(8,I.length-C);const g=parseInt(I.substring(C,C+w),p);w<8?(w=d(Math.pow(p,w)),E=E.j(w).add(d(g))):(E=E.j(m),E=E.add(d(g)))}return E}var _=u(0),v=u(1),A=u(16777216);n=a.prototype,n.m=function(){if(P(this))return-D(this).m();let I=0,p=1;for(let m=0;m<this.g.length;m++){const E=this.i(m);I+=(E>=0?E:4294967296+E)*p,p*=4294967296}return I},n.toString=function(I){if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(R(this))return"0";if(P(this))return"-"+D(this).toString(I);const p=d(Math.pow(I,6));var m=this;let E="";for(;;){const w=xe(m,p).g;m=J(m,w.j(p));let C=((m.g.length>0?m.g[0]:m.h)>>>0).toString(I);if(m=w,R(m))return C+E;for(;C.length<6;)C="0"+C;E=C+E}},n.i=function(I){return I<0?0:I<this.g.length?this.g[I]:this.h};function R(I){if(I.h!=0)return!1;for(let p=0;p<I.g.length;p++)if(I.g[p]!=0)return!1;return!0}function P(I){return I.h==-1}n.l=function(I){return I=J(this,I),P(I)?-1:R(I)?0:1};function D(I){const p=I.g.length,m=[];for(let E=0;E<p;E++)m[E]=~I.g[E];return new a(m,~I.h).add(v)}n.abs=function(){return P(this)?D(this):this},n.add=function(I){const p=Math.max(this.g.length,I.g.length),m=[];let E=0;for(let w=0;w<=p;w++){let C=E+(this.i(w)&65535)+(I.i(w)&65535),g=(C>>>16)+(this.i(w)>>>16)+(I.i(w)>>>16);E=g>>>16,C&=65535,g&=65535,m[w]=g<<16|C}return new a(m,m[m.length-1]&-2147483648?-1:0)};function J(I,p){return I.add(D(p))}n.j=function(I){if(R(this)||R(I))return _;if(P(this))return P(I)?D(this).j(D(I)):D(D(this).j(I));if(P(I))return D(this.j(D(I)));if(this.l(A)<0&&I.l(A)<0)return d(this.m()*I.m());const p=this.g.length+I.g.length,m=[];for(var E=0;E<2*p;E++)m[E]=0;for(E=0;E<this.g.length;E++)for(let w=0;w<I.g.length;w++){const C=this.i(E)>>>16,g=this.i(E)&65535,ye=I.i(w)>>>16,bt=I.i(w)&65535;m[2*E+2*w]+=g*bt,te(m,2*E+2*w),m[2*E+2*w+1]+=C*bt,te(m,2*E+2*w+1),m[2*E+2*w+1]+=g*ye,te(m,2*E+2*w+1),m[2*E+2*w+2]+=C*ye,te(m,2*E+2*w+2)}for(I=0;I<p;I++)m[I]=m[2*I+1]<<16|m[2*I];for(I=p;I<2*p;I++)m[I]=0;return new a(m,0)};function te(I,p){for(;(I[p]&65535)!=I[p];)I[p+1]+=I[p]>>>16,I[p]&=65535,p++}function ae(I,p){this.g=I,this.h=p}function xe(I,p){if(R(p))throw Error("division by zero");if(R(I))return new ae(_,_);if(P(I))return p=xe(D(I),p),new ae(D(p.g),D(p.h));if(P(p))return p=xe(I,D(p)),new ae(D(p.g),p.h);if(I.g.length>30){if(P(I)||P(p))throw Error("slowDivide_ only works with positive integers.");for(var m=v,E=p;E.l(I)<=0;)m=ot(m),E=ot(E);var w=Se(m,1),C=Se(E,1);for(E=Se(E,2),m=Se(m,2);!R(E);){var g=C.add(E);g.l(I)<=0&&(w=w.add(m),C=g),E=Se(E,1),m=Se(m,1)}return p=J(I,w.j(p)),new ae(w,p)}for(w=_;I.l(p)>=0;){for(m=Math.max(1,Math.floor(I.m()/p.m())),E=Math.ceil(Math.log(m)/Math.LN2),E=E<=48?1:Math.pow(2,E-48),C=d(m),g=C.j(p);P(g)||g.l(I)>0;)m-=E,C=d(m),g=C.j(p);R(C)&&(C=v),w=w.add(C),I=J(I,g)}return new ae(w,I)}n.B=function(I){return xe(this,I).h},n.and=function(I){const p=Math.max(this.g.length,I.g.length),m=[];for(let E=0;E<p;E++)m[E]=this.i(E)&I.i(E);return new a(m,this.h&I.h)},n.or=function(I){const p=Math.max(this.g.length,I.g.length),m=[];for(let E=0;E<p;E++)m[E]=this.i(E)|I.i(E);return new a(m,this.h|I.h)},n.xor=function(I){const p=Math.max(this.g.length,I.g.length),m=[];for(let E=0;E<p;E++)m[E]=this.i(E)^I.i(E);return new a(m,this.h^I.h)};function ot(I){const p=I.g.length+1,m=[];for(let E=0;E<p;E++)m[E]=I.i(E)<<1|I.i(E-1)>>>31;return new a(m,I.h)}function Se(I,p){const m=p>>5;p%=32;const E=I.g.length-m,w=[];for(let C=0;C<E;C++)w[C]=p>0?I.i(C+m)>>>p|I.i(C+m+1)<<32-p:I.i(C+m);return new a(w,I.h)}i.prototype.digest=i.prototype.A,i.prototype.reset=i.prototype.u,i.prototype.update=i.prototype.v,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=y,ko=a}).apply(typeof Jc<"u"?Jc:typeof self<"u"?self:typeof window<"u"?window:{});var ji=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var n,e=Object.defineProperty;function t(r){r=[typeof globalThis=="object"&&globalThis,r,typeof window=="object"&&window,typeof self=="object"&&self,typeof ji=="object"&&ji];for(var c=0;c<r.length;++c){var h=r[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var i=t(this);function s(r,c){if(c)e:{var h=i;r=r.split(".");for(var f=0;f<r.length-1;f++){var T=r[f];if(!(T in h))break e;h=h[T]}r=r[r.length-1],f=h[r],c=c(f),c!=f&&c!=null&&e(h,r,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(r){return r||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(r){return r||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(r){return r||function(c){var h=[],f;for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&h.push([f,c[f]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(r){var c=typeof r;return c=="object"&&r!=null||c=="function"}function u(r,c,h){return r.call.apply(r.bind,arguments)}function d(r,c,h){return d=u,d.apply(null,arguments)}function y(r,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),r.apply(this,f)}}function _(r,c){function h(){}h.prototype=c.prototype,r.Z=c.prototype,r.prototype=new h,r.prototype.constructor=r,r.Ob=function(f,T,S){for(var k=Array(arguments.length-2),M=2;M<arguments.length;M++)k[M-2]=arguments[M];return c.prototype[T].apply(f,k)}}var v=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?r=>r&&AsyncContext.Snapshot.wrap(r):r=>r;function A(r){const c=r.length;if(c>0){const h=Array(c);for(let f=0;f<c;f++)h[f]=r[f];return h}return[]}function R(r,c){for(let f=1;f<arguments.length;f++){const T=arguments[f];var h=typeof T;if(h=h!="object"?h:T?Array.isArray(T)?"array":h:"null",h=="array"||h=="object"&&typeof T.length=="number"){h=r.length||0;const S=T.length||0;r.length=h+S;for(let k=0;k<S;k++)r[h+k]=T[k]}else r.push(T)}}class P{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function D(r){a.setTimeout(()=>{throw r},0)}function J(){var r=I;let c=null;return r.g&&(c=r.g,r.g=r.g.next,r.g||(r.h=null),c.next=null),c}class te{constructor(){this.h=this.g=null}add(c,h){const f=ae.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var ae=new P(()=>new xe,r=>r.reset());class xe{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let ot,Se=!1,I=new te,p=()=>{const r=Promise.resolve(void 0);ot=()=>{r.then(m)}};function m(){for(var r;r=J();){try{r.h.call(r.g)}catch(h){D(h)}var c=ae;c.j(r),c.h<100&&(c.h++,r.next=c.g,c.g=r)}Se=!1}function E(){this.u=this.u,this.C=this.C}E.prototype.u=!1,E.prototype.dispose=function(){this.u||(this.u=!0,this.N())},E.prototype[Symbol.dispose]=function(){this.dispose()},E.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(r,c){this.type=r,this.g=this.target=c,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var C=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var r=!1,c=Object.defineProperty({},"passive",{get:function(){r=!0}});try{const h=()=>{};a.addEventListener("test",h,c),a.removeEventListener("test",h,c)}catch{}return r})();function g(r){return/^[\s\xa0]*$/.test(r)}function ye(r,c){w.call(this,r?r.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,r&&this.init(r,c)}_(ye,w),ye.prototype.init=function(r,c){const h=this.type=r.type,f=r.changedTouches&&r.changedTouches.length?r.changedTouches[0]:null;this.target=r.target||r.srcElement,this.g=c,c=r.relatedTarget,c||(h=="mouseover"?c=r.fromElement:h=="mouseout"&&(c=r.toElement)),this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0),this.button=r.button,this.key=r.key||"",this.ctrlKey=r.ctrlKey,this.altKey=r.altKey,this.shiftKey=r.shiftKey,this.metaKey=r.metaKey,this.pointerId=r.pointerId||0,this.pointerType=r.pointerType,this.state=r.state,this.i=r,r.defaultPrevented&&ye.Z.h.call(this)},ye.prototype.h=function(){ye.Z.h.call(this);const r=this.i;r.preventDefault?r.preventDefault():r.returnValue=!1};var bt="closure_listenable_"+(Math.random()*1e6|0),zd=0;function Kd(r,c,h,f,T){this.listener=r,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=T,this.key=++zd,this.da=this.fa=!1}function ki(r){r.da=!0,r.listener=null,r.proxy=null,r.src=null,r.ha=null}function Ri(r,c,h){for(const f in r)c.call(h,r[f],f,r)}function Yd(r,c){for(const h in r)c.call(void 0,r[h],h,r)}function pa(r){const c={};for(const h in r)c[h]=r[h];return c}const ga="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _a(r,c){let h,f;for(let T=1;T<arguments.length;T++){f=arguments[T];for(h in f)r[h]=f[h];for(let S=0;S<ga.length;S++)h=ga[S],Object.prototype.hasOwnProperty.call(f,h)&&(r[h]=f[h])}}function Ni(r){this.src=r,this.g={},this.h=0}Ni.prototype.add=function(r,c,h,f,T){const S=r.toString();r=this.g[S],r||(r=this.g[S]=[],this.h++);const k=js(r,c,f,T);return k>-1?(c=r[k],h||(c.fa=!1)):(c=new Kd(c,this.src,S,!!f,T),c.fa=h,r.push(c)),c};function Bs(r,c){const h=c.type;if(h in r.g){var f=r.g[h],T=Array.prototype.indexOf.call(f,c,void 0),S;(S=T>=0)&&Array.prototype.splice.call(f,T,1),S&&(ki(c),r.g[h].length==0&&(delete r.g[h],r.h--))}}function js(r,c,h,f){for(let T=0;T<r.length;++T){const S=r[T];if(!S.da&&S.listener==c&&S.capture==!!h&&S.ha==f)return T}return-1}var Ws="closure_lm_"+(Math.random()*1e6|0),Hs={};function ma(r,c,h,f,T){if(Array.isArray(c)){for(let S=0;S<c.length;S++)ma(r,c[S],h,f,T);return null}return h=wa(h),r&&r[bt]?r.J(c,h,l(f)?!!f.capture:!1,T):Jd(r,c,h,!1,f,T)}function Jd(r,c,h,f,T,S){if(!c)throw Error("Invalid event type");const k=l(T)?!!T.capture:!!T;let M=Gs(r);if(M||(r[Ws]=M=new Ni(r)),h=M.add(c,h,f,k,S),h.proxy)return h;if(f=Xd(),h.proxy=f,f.src=r,f.listener=h,r.addEventListener)C||(T=k),T===void 0&&(T=!1),r.addEventListener(c.toString(),f,T);else if(r.attachEvent)r.attachEvent(va(c.toString()),f);else if(r.addListener&&r.removeListener)r.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Xd(){function r(h){return c.call(r.src,r.listener,h)}const c=Qd;return r}function ya(r,c,h,f,T){if(Array.isArray(c))for(var S=0;S<c.length;S++)ya(r,c[S],h,f,T);else f=l(f)?!!f.capture:!!f,h=wa(h),r&&r[bt]?(r=r.i,S=String(c).toString(),S in r.g&&(c=r.g[S],h=js(c,h,f,T),h>-1&&(ki(c[h]),Array.prototype.splice.call(c,h,1),c.length==0&&(delete r.g[S],r.h--)))):r&&(r=Gs(r))&&(c=r.g[c.toString()],r=-1,c&&(r=js(c,h,f,T)),(h=r>-1?c[r]:null)&&$s(h))}function $s(r){if(typeof r!="number"&&r&&!r.da){var c=r.src;if(c&&c[bt])Bs(c.i,r);else{var h=r.type,f=r.proxy;c.removeEventListener?c.removeEventListener(h,f,r.capture):c.detachEvent?c.detachEvent(va(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=Gs(c))?(Bs(h,r),h.h==0&&(h.src=null,c[Ws]=null)):ki(r)}}}function va(r){return r in Hs?Hs[r]:Hs[r]="on"+r}function Qd(r,c){if(r.da)r=!0;else{c=new ye(c,this);const h=r.listener,f=r.ha||r.src;r.fa&&$s(r),r=h.call(f,c)}return r}function Gs(r){return r=r[Ws],r instanceof Ni?r:null}var qs="__closure_events_fn_"+(Math.random()*1e9>>>0);function wa(r){return typeof r=="function"?r:(r[qs]||(r[qs]=function(c){return r.handleEvent(c)}),r[qs])}function ce(){E.call(this),this.i=new Ni(this),this.M=this,this.G=null}_(ce,E),ce.prototype[bt]=!0,ce.prototype.removeEventListener=function(r,c,h,f){ya(this,r,c,h,f)};function de(r,c){var h,f=r.G;if(f)for(h=[];f;f=f.G)h.push(f);if(r=r.M,f=c.type||c,typeof c=="string")c=new w(c,r);else if(c instanceof w)c.target=c.target||r;else{var T=c;c=new w(f,r),_a(c,T)}T=!0;let S,k;if(h)for(k=h.length-1;k>=0;k--)S=c.g=h[k],T=Pi(S,f,!0,c)&&T;if(S=c.g=r,T=Pi(S,f,!0,c)&&T,T=Pi(S,f,!1,c)&&T,h)for(k=0;k<h.length;k++)S=c.g=h[k],T=Pi(S,f,!1,c)&&T}ce.prototype.N=function(){if(ce.Z.N.call(this),this.i){var r=this.i;for(const c in r.g){const h=r.g[c];for(let f=0;f<h.length;f++)ki(h[f]);delete r.g[c],r.h--}}this.G=null},ce.prototype.J=function(r,c,h,f){return this.i.add(String(r),c,!1,h,f)},ce.prototype.K=function(r,c,h,f){return this.i.add(String(r),c,!0,h,f)};function Pi(r,c,h,f){if(c=r.i.g[String(c)],!c)return!0;c=c.concat();let T=!0;for(let S=0;S<c.length;++S){const k=c[S];if(k&&!k.da&&k.capture==h){const M=k.listener,Q=k.ha||k.src;k.fa&&Bs(r.i,k),T=M.call(Q,f)!==!1&&T}}return T&&!f.defaultPrevented}function Zd(r,c){if(typeof r!="function")if(r&&typeof r.handleEvent=="function")r=d(r.handleEvent,r);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(r,c||0)}function Ia(r){r.g=Zd(()=>{r.g=null,r.i&&(r.i=!1,Ia(r))},r.l);const c=r.h;r.h=null,r.m.apply(null,c)}class ef extends E{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Ia(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Sn(r){E.call(this),this.h=r,this.g={}}_(Sn,E);var Ea=[];function Ta(r){Ri(r.g,function(c,h){this.g.hasOwnProperty(h)&&$s(c)},r),r.g={}}Sn.prototype.N=function(){Sn.Z.N.call(this),Ta(this)},Sn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var zs=a.JSON.stringify,tf=a.JSON.parse,nf=class{stringify(r){return a.JSON.stringify(r,void 0)}parse(r){return a.JSON.parse(r,void 0)}};function Ca(){}function sf(){}var bn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ks(){w.call(this,"d")}_(Ks,w);function Ys(){w.call(this,"c")}_(Ys,w);var Xt={},Sa=null;function Js(){return Sa=Sa||new ce}Xt.Ia="serverreachability";function ba(r){w.call(this,Xt.Ia,r)}_(ba,w);function An(r){const c=Js();de(c,new ba(c))}Xt.STAT_EVENT="statevent";function Aa(r,c){w.call(this,Xt.STAT_EVENT,r),this.stat=c}_(Aa,w);function fe(r){const c=Js();de(c,new Aa(c,r))}Xt.Ja="timingevent";function ka(r,c){w.call(this,Xt.Ja,r),this.size=c}_(ka,w);function kn(r,c){if(typeof r!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){r()},c)}function Rn(){this.g=!0}Rn.prototype.ua=function(){this.g=!1};function rf(r,c,h,f,T,S){r.info(function(){if(r.g)if(S){var k="",M=S.split("&");for(let H=0;H<M.length;H++){var Q=M[H].split("=");if(Q.length>1){const ne=Q[0];Q=Q[1];const Ue=ne.split("_");k=Ue.length>=2&&Ue[1]=="type"?k+(ne+"="+Q+"&"):k+(ne+"=redacted&")}}}else k=null;else k=S;return"XMLHTTP REQ ("+f+") [attempt "+T+"]: "+c+`
`+h+`
`+k})}function of(r,c,h,f,T,S,k){r.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+T+"]: "+c+`
`+h+`
`+S+" "+k})}function Qt(r,c,h,f){r.info(function(){return"XMLHTTP TEXT ("+c+"): "+cf(r,h)+(f?" "+f:"")})}function af(r,c){r.info(function(){return"TIMEOUT: "+c})}Rn.prototype.info=function(){};function cf(r,c){if(!r.g)return c;if(!c)return null;try{const S=JSON.parse(c);if(S){for(r=0;r<S.length;r++)if(Array.isArray(S[r])){var h=S[r];if(!(h.length<2)){var f=h[1];if(Array.isArray(f)&&!(f.length<1)){var T=f[0];if(T!="noop"&&T!="stop"&&T!="close")for(let k=1;k<f.length;k++)f[k]=""}}}}return zs(S)}catch{return c}}var Xs={NO_ERROR:0,TIMEOUT:8},lf={},Ra;function Qs(){}_(Qs,Ca),Qs.prototype.g=function(){return new XMLHttpRequest},Ra=new Qs;function Nn(r){return encodeURIComponent(String(r))}function hf(r){var c=1;r=r.split(":");const h=[];for(;c>0&&r.length;)h.push(r.shift()),c--;return r.length&&h.push(r.join(":")),h}function at(r,c,h,f){this.j=r,this.i=c,this.l=h,this.S=f||1,this.V=new Sn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Na}function Na(){this.i=null,this.g="",this.h=!1}var Pa={},Zs={};function er(r,c,h){r.M=1,r.A=Di(Fe(c)),r.u=h,r.R=!0,Oa(r,null)}function Oa(r,c){r.F=Date.now(),Oi(r),r.B=Fe(r.A);var h=r.B,f=r.S;Array.isArray(f)||(f=[String(f)]),Ga(h.i,"t",f),r.C=0,h=r.j.L,r.h=new Na,r.g=lc(r.j,h?c:null,!r.u),r.P>0&&(r.O=new ef(d(r.Y,r,r.g),r.P)),c=r.V,h=r.g,f=r.ba;var T="readystatechange";Array.isArray(T)||(T&&(Ea[0]=T.toString()),T=Ea);for(let S=0;S<T.length;S++){const k=ma(h,T[S],f||c.handleEvent,!1,c.h||c);if(!k)break;c.g[k.key]=k}c=r.J?pa(r.J):{},r.u?(r.v||(r.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",r.g.ea(r.B,r.v,r.u,c)):(r.v="GET",r.g.ea(r.B,r.v,null,c)),An(),rf(r.i,r.v,r.B,r.l,r.S,r.u)}at.prototype.ba=function(r){r=r.target;const c=this.O;c&&ht(r)==3?c.j():this.Y(r)},at.prototype.Y=function(r){try{if(r==this.g)e:{const M=ht(this.g),Q=this.g.ya(),H=this.g.ca();if(!(M<3)&&(M!=3||this.g&&(this.h.h||this.g.la()||Qa(this.g)))){this.K||M!=4||Q==7||(Q==8||H<=0?An(3):An(2)),tr(this);var c=this.g.ca();this.X=c;var h=uf(this);if(this.o=c==200,of(this.i,this.v,this.B,this.l,this.S,M,c),this.o){if(this.U&&!this.L){t:{if(this.g){var f,T=this.g;if((f=T.g?T.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(f)){var S=f;break t}}S=null}if(r=S)Qt(this.i,this.l,r,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,nr(this,r);else{this.o=!1,this.m=3,fe(12),At(this),Pn(this);break e}}if(this.R){r=!0;let ne;for(;!this.K&&this.C<h.length;)if(ne=df(this,h),ne==Zs){M==4&&(this.m=4,fe(14),r=!1),Qt(this.i,this.l,null,"[Incomplete Response]");break}else if(ne==Pa){this.m=4,fe(15),Qt(this.i,this.l,h,"[Invalid Chunk]"),r=!1;break}else Qt(this.i,this.l,ne,null),nr(this,ne);if(Da(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),M!=4||h.length!=0||this.h.h||(this.m=1,fe(16),r=!1),this.o=this.o&&r,!r)Qt(this.i,this.l,h,"[Invalid Chunked Response]"),At(this),Pn(this);else if(h.length>0&&!this.W){this.W=!0;var k=this.j;k.g==this&&k.aa&&!k.P&&(k.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),hr(k),k.P=!0,fe(11))}}else Qt(this.i,this.l,h,null),nr(this,h);M==4&&At(this),this.o&&!this.K&&(M==4?rc(this.j,this):(this.o=!1,Oi(this)))}else bf(this.g),c==400&&h.indexOf("Unknown SID")>0?(this.m=3,fe(12)):(this.m=0,fe(13)),At(this),Pn(this)}}}catch{}finally{}};function uf(r){if(!Da(r))return r.g.la();const c=Qa(r.g);if(c==="")return"";let h="";const f=c.length,T=ht(r.g)==4;if(!r.h.i){if(typeof TextDecoder>"u")return At(r),Pn(r),"";r.h.i=new a.TextDecoder}for(let S=0;S<f;S++)r.h.h=!0,h+=r.h.i.decode(c[S],{stream:!(T&&S==f-1)});return c.length=0,r.h.g+=h,r.C=0,r.h.g}function Da(r){return r.g?r.v=="GET"&&r.M!=2&&r.j.Aa:!1}function df(r,c){var h=r.C,f=c.indexOf(`
`,h);return f==-1?Zs:(h=Number(c.substring(h,f)),isNaN(h)?Pa:(f+=1,f+h>c.length?Zs:(c=c.slice(f,f+h),r.C=f+h,c)))}at.prototype.cancel=function(){this.K=!0,At(this)};function Oi(r){r.T=Date.now()+r.H,Ma(r,r.H)}function Ma(r,c){if(r.D!=null)throw Error("WatchDog timer not null");r.D=kn(d(r.aa,r),c)}function tr(r){r.D&&(a.clearTimeout(r.D),r.D=null)}at.prototype.aa=function(){this.D=null;const r=Date.now();r-this.T>=0?(af(this.i,this.B),this.M!=2&&(An(),fe(17)),At(this),this.m=2,Pn(this)):Ma(this,this.T-r)};function Pn(r){r.j.I==0||r.K||rc(r.j,r)}function At(r){tr(r);var c=r.O;c&&typeof c.dispose=="function"&&c.dispose(),r.O=null,Ta(r.V),r.g&&(c=r.g,r.g=null,c.abort(),c.dispose())}function nr(r,c){try{var h=r.j;if(h.I!=0&&(h.g==r||ir(h.h,r))){if(!r.L&&ir(h.h,r)&&h.I==3){try{var f=h.Ba.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var T=f;if(T[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<r.F)Ui(h),xi(h);else break e;lr(h),fe(18)}}else h.xa=T[1],0<h.xa-h.K&&T[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=kn(d(h.Va,h),6e3));Fa(h.h)<=1&&h.ta&&(h.ta=void 0)}else Rt(h,11)}else if((r.L||h.g==r)&&Ui(h),!g(c))for(T=h.Ba.g.parse(c),c=0;c<T.length;c++){let H=T[c];const ne=H[0];if(!(ne<=h.K))if(h.K=ne,H=H[1],h.I==2)if(H[0]=="c"){h.M=H[1],h.ba=H[2];const Ue=H[3];Ue!=null&&(h.ka=Ue,h.j.info("VER="+h.ka));const Nt=H[4];Nt!=null&&(h.za=Nt,h.j.info("SVER="+h.za));const ut=H[5];ut!=null&&typeof ut=="number"&&ut>0&&(f=1.5*ut,h.O=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const dt=r.g;if(dt){const Vi=dt.g?dt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Vi){var S=f.h;S.g||Vi.indexOf("spdy")==-1&&Vi.indexOf("quic")==-1&&Vi.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(sr(S,S.h),S.h=null))}if(f.G){const ur=dt.g?dt.g.getResponseHeader("X-HTTP-Session-Id"):null;ur&&(f.wa=ur,q(f.J,f.G,ur))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-r.F,h.j.info("Handshake RTT: "+h.T+"ms")),f=h;var k=r;if(f.na=cc(f,f.L?f.ba:null,f.W),k.L){Ua(f.h,k);var M=k,Q=f.O;Q&&(M.H=Q),M.D&&(tr(M),Oi(M)),f.g=k}else ic(f);h.i.length>0&&Fi(h)}else H[0]!="stop"&&H[0]!="close"||Rt(h,7);else h.I==3&&(H[0]=="stop"||H[0]=="close"?H[0]=="stop"?Rt(h,7):cr(h):H[0]!="noop"&&h.l&&h.l.qa(H),h.A=0)}}An(4)}catch{}}var ff=class{constructor(r,c){this.g=r,this.map=c}};function La(r){this.l=r||10,a.PerformanceNavigationTiming?(r=a.performance.getEntriesByType("navigation"),r=r.length>0&&(r[0].nextHopProtocol=="hq"||r[0].nextHopProtocol=="h2")):r=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=r?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function xa(r){return r.h?!0:r.g?r.g.size>=r.j:!1}function Fa(r){return r.h?1:r.g?r.g.size:0}function ir(r,c){return r.h?r.h==c:r.g?r.g.has(c):!1}function sr(r,c){r.g?r.g.add(c):r.h=c}function Ua(r,c){r.h&&r.h==c?r.h=null:r.g&&r.g.has(c)&&r.g.delete(c)}La.prototype.cancel=function(){if(this.i=Va(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const r of this.g.values())r.cancel();this.g.clear()}};function Va(r){if(r.h!=null)return r.i.concat(r.h.G);if(r.g!=null&&r.g.size!==0){let c=r.i;for(const h of r.g.values())c=c.concat(h.G);return c}return A(r.i)}var Ba=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function pf(r,c){if(r){r=r.split("&");for(let h=0;h<r.length;h++){const f=r[h].indexOf("=");let T,S=null;f>=0?(T=r[h].substring(0,f),S=r[h].substring(f+1)):T=r[h],c(T,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function ct(r){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;r instanceof ct?(this.l=r.l,On(this,r.j),this.o=r.o,this.g=r.g,Dn(this,r.u),this.h=r.h,rr(this,qa(r.i)),this.m=r.m):r&&(c=String(r).match(Ba))?(this.l=!1,On(this,c[1]||"",!0),this.o=Mn(c[2]||""),this.g=Mn(c[3]||"",!0),Dn(this,c[4]),this.h=Mn(c[5]||"",!0),rr(this,c[6]||"",!0),this.m=Mn(c[7]||"")):(this.l=!1,this.i=new xn(null,this.l))}ct.prototype.toString=function(){const r=[];var c=this.j;c&&r.push(Ln(c,ja,!0),":");var h=this.g;return(h||c=="file")&&(r.push("//"),(c=this.o)&&r.push(Ln(c,ja,!0),"@"),r.push(Nn(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&r.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&r.push("/"),r.push(Ln(h,h.charAt(0)=="/"?mf:_f,!0))),(h=this.i.toString())&&r.push("?",h),(h=this.m)&&r.push("#",Ln(h,vf)),r.join("")},ct.prototype.resolve=function(r){const c=Fe(this);let h=!!r.j;h?On(c,r.j):h=!!r.o,h?c.o=r.o:h=!!r.g,h?c.g=r.g:h=r.u!=null;var f=r.h;if(h)Dn(c,r.u);else if(h=!!r.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var T=c.h.lastIndexOf("/");T!=-1&&(f=c.h.slice(0,T+1)+f)}if(T=f,T==".."||T==".")f="";else if(T.indexOf("./")!=-1||T.indexOf("/.")!=-1){f=T.lastIndexOf("/",0)==0,T=T.split("/");const S=[];for(let k=0;k<T.length;){const M=T[k++];M=="."?f&&k==T.length&&S.push(""):M==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),f&&k==T.length&&S.push("")):(S.push(M),f=!0)}f=S.join("/")}else f=T}return h?c.h=f:h=r.i.toString()!=="",h?rr(c,qa(r.i)):h=!!r.m,h&&(c.m=r.m),c};function Fe(r){return new ct(r)}function On(r,c,h){r.j=h?Mn(c,!0):c,r.j&&(r.j=r.j.replace(/:$/,""))}function Dn(r,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);r.u=c}else r.u=null}function rr(r,c,h){c instanceof xn?(r.i=c,wf(r.i,r.l)):(h||(c=Ln(c,yf)),r.i=new xn(c,r.l))}function q(r,c,h){r.i.set(c,h)}function Di(r){return q(r,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),r}function Mn(r,c){return r?c?decodeURI(r.replace(/%25/g,"%2525")):decodeURIComponent(r):""}function Ln(r,c,h){return typeof r=="string"?(r=encodeURI(r).replace(c,gf),h&&(r=r.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),r):null}function gf(r){return r=r.charCodeAt(0),"%"+(r>>4&15).toString(16)+(r&15).toString(16)}var ja=/[#\/\?@]/g,_f=/[#\?:]/g,mf=/[#\?]/g,yf=/[#\?@]/g,vf=/#/g;function xn(r,c){this.h=this.g=null,this.i=r||null,this.j=!!c}function kt(r){r.g||(r.g=new Map,r.h=0,r.i&&pf(r.i,function(c,h){r.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=xn.prototype,n.add=function(r,c){kt(this),this.i=null,r=Zt(this,r);let h=this.g.get(r);return h||this.g.set(r,h=[]),h.push(c),this.h+=1,this};function Wa(r,c){kt(r),c=Zt(r,c),r.g.has(c)&&(r.i=null,r.h-=r.g.get(c).length,r.g.delete(c))}function Ha(r,c){return kt(r),c=Zt(r,c),r.g.has(c)}n.forEach=function(r,c){kt(this),this.g.forEach(function(h,f){h.forEach(function(T){r.call(c,T,f,this)},this)},this)};function $a(r,c){kt(r);let h=[];if(typeof c=="string")Ha(r,c)&&(h=h.concat(r.g.get(Zt(r,c))));else for(r=Array.from(r.g.values()),c=0;c<r.length;c++)h=h.concat(r[c]);return h}n.set=function(r,c){return kt(this),this.i=null,r=Zt(this,r),Ha(this,r)&&(this.h-=this.g.get(r).length),this.g.set(r,[c]),this.h+=1,this},n.get=function(r,c){return r?(r=$a(this,r),r.length>0?String(r[0]):c):c};function Ga(r,c,h){Wa(r,c),h.length>0&&(r.i=null,r.g.set(Zt(r,c),A(h)),r.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const r=[],c=Array.from(this.g.keys());for(let f=0;f<c.length;f++){var h=c[f];const T=Nn(h);h=$a(this,h);for(let S=0;S<h.length;S++){let k=T;h[S]!==""&&(k+="="+Nn(h[S])),r.push(k)}}return this.i=r.join("&")};function qa(r){const c=new xn;return c.i=r.i,r.g&&(c.g=new Map(r.g),c.h=r.h),c}function Zt(r,c){return c=String(c),r.j&&(c=c.toLowerCase()),c}function wf(r,c){c&&!r.j&&(kt(r),r.i=null,r.g.forEach(function(h,f){const T=f.toLowerCase();f!=T&&(Wa(this,f),Ga(this,T,h))},r)),r.j=c}function If(r,c){const h=new Rn;if(a.Image){const f=new Image;f.onload=y(lt,h,"TestLoadImage: loaded",!0,c,f),f.onerror=y(lt,h,"TestLoadImage: error",!1,c,f),f.onabort=y(lt,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=y(lt,h,"TestLoadImage: timeout",!1,c,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=r}else c(!1)}function Ef(r,c){const h=new Rn,f=new AbortController,T=setTimeout(()=>{f.abort(),lt(h,"TestPingServer: timeout",!1,c)},1e4);fetch(r,{signal:f.signal}).then(S=>{clearTimeout(T),S.ok?lt(h,"TestPingServer: ok",!0,c):lt(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(T),lt(h,"TestPingServer: error",!1,c)})}function lt(r,c,h,f,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),f(h)}catch{}}function Tf(){this.g=new nf}function or(r){this.i=r.Sb||null,this.h=r.ab||!1}_(or,Ca),or.prototype.g=function(){return new Mi(this.i,this.h)};function Mi(r,c){ce.call(this),this.H=r,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}_(Mi,ce),n=Mi.prototype,n.open=function(r,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=r,this.D=c,this.readyState=1,Un(this)},n.send=function(r){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};r&&(c.body=r),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Fn(this)),this.readyState=0},n.Pa=function(r){if(this.g&&(this.l=r,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=r.headers,this.readyState=2,Un(this)),this.g&&(this.readyState=3,Un(this),this.g)))if(this.responseType==="arraybuffer")r.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in r){if(this.j=r.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;za(this)}else r.text().then(this.Oa.bind(this),this.ga.bind(this))};function za(r){r.j.read().then(r.Ma.bind(r)).catch(r.ga.bind(r))}n.Ma=function(r){if(this.g){if(this.o&&r.value)this.response.push(r.value);else if(!this.o){var c=r.value?r.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!r.done}))&&(this.response=this.responseText+=c)}r.done?Fn(this):Un(this),this.readyState==3&&za(this)}},n.Oa=function(r){this.g&&(this.response=this.responseText=r,Fn(this))},n.Na=function(r){this.g&&(this.response=r,Fn(this))},n.ga=function(){this.g&&Fn(this)};function Fn(r){r.readyState=4,r.l=null,r.j=null,r.B=null,Un(r)}n.setRequestHeader=function(r,c){this.A.append(r,c)},n.getResponseHeader=function(r){return this.h&&this.h.get(r.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const r=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,r.push(h[0]+": "+h[1]),h=c.next();return r.join(`\r
`)};function Un(r){r.onreadystatechange&&r.onreadystatechange.call(r)}Object.defineProperty(Mi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(r){this.m=r?"include":"same-origin"}});function Ka(r){let c="";return Ri(r,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function ar(r,c,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=Ka(h),typeof r=="string"?h!=null&&Nn(h):q(r,c,h))}function Y(r){ce.call(this),this.headers=new Map,this.L=r||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}_(Y,ce);var Cf=/^https?$/i,Sf=["POST","PUT"];n=Y.prototype,n.Fa=function(r){this.H=r},n.ea=function(r,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+r);c=c?c.toUpperCase():"GET",this.D=r,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ra.g(),this.g.onreadystatechange=v(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(r),!0),this.B=!1}catch(S){Ya(this,S);return}if(r=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var T in f)h.set(T,f[T]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const S of f.keys())h.set(S,f.get(S));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(S=>S.toLowerCase()=="content-type"),T=a.FormData&&r instanceof a.FormData,!(Array.prototype.indexOf.call(Sf,c,void 0)>=0)||f||T||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,k]of h)this.g.setRequestHeader(S,k);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(r),this.v=!1}catch(S){Ya(this,S)}};function Ya(r,c){r.h=!1,r.g&&(r.j=!0,r.g.abort(),r.j=!1),r.l=c,r.o=5,Ja(r),Li(r)}function Ja(r){r.A||(r.A=!0,de(r,"complete"),de(r,"error"))}n.abort=function(r){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=r||7,de(this,"complete"),de(this,"abort"),Li(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Li(this,!0)),Y.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Xa(this):this.Xa())},n.Xa=function(){Xa(this)};function Xa(r){if(r.h&&typeof o<"u"){if(r.v&&ht(r)==4)setTimeout(r.Ca.bind(r),0);else if(de(r,"readystatechange"),ht(r)==4){r.h=!1;try{const S=r.ca();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var f;if(f=S===0){let k=String(r.D).match(Ba)[1]||null;!k&&a.self&&a.self.location&&(k=a.self.location.protocol.slice(0,-1)),f=!Cf.test(k?k.toLowerCase():"")}h=f}if(h)de(r,"complete"),de(r,"success");else{r.o=6;try{var T=ht(r)>2?r.g.statusText:""}catch{T=""}r.l=T+" ["+r.ca()+"]",Ja(r)}}finally{Li(r)}}}}function Li(r,c){if(r.g){r.m&&(clearTimeout(r.m),r.m=null);const h=r.g;r.g=null,c||de(r,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function ht(r){return r.g?r.g.readyState:0}n.ca=function(){try{return ht(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(r){if(this.g){var c=this.g.responseText;return r&&c.indexOf(r)==0&&(c=c.substring(r.length)),tf(c)}};function Qa(r){try{if(!r.g)return null;if("response"in r.g)return r.g.response;switch(r.F){case"":case"text":return r.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in r.g)return r.g.mozResponseArrayBuffer}return null}catch{return null}}function bf(r){const c={};r=(r.g&&ht(r)>=2&&r.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<r.length;f++){if(g(r[f]))continue;var h=hf(r[f]);const T=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const S=c[T]||[];c[T]=S,S.push(h)}Yd(c,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Vn(r,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[r]||c}function Za(r){this.za=0,this.i=[],this.j=new Rn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Vn("failFast",!1,r),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Vn("baseRetryDelayMs",5e3,r),this.Za=Vn("retryDelaySeedMs",1e4,r),this.Ta=Vn("forwardChannelMaxRetries",2,r),this.va=Vn("forwardChannelRequestTimeoutMs",2e4,r),this.ma=r&&r.xmlHttpFactory||void 0,this.Ua=r&&r.Rb||void 0,this.Aa=r&&r.useFetchStreams||!1,this.O=void 0,this.L=r&&r.supportsCrossDomainXhr||!1,this.M="",this.h=new La(r&&r.concurrentRequestLimit),this.Ba=new Tf,this.S=r&&r.fastHandshake||!1,this.R=r&&r.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=r&&r.Pb||!1,r&&r.ua&&this.j.ua(),r&&r.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&r&&r.detectBufferingProxy||!1,this.ia=void 0,r&&r.longPollingTimeout&&r.longPollingTimeout>0&&(this.ia=r.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Za.prototype,n.ka=8,n.I=1,n.connect=function(r,c,h,f){fe(0),this.W=r,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.J=cc(this,null,this.W),Fi(this)};function cr(r){if(ec(r),r.I==3){var c=r.V++,h=Fe(r.J);if(q(h,"SID",r.M),q(h,"RID",c),q(h,"TYPE","terminate"),Bn(r,h),c=new at(r,r.j,c),c.M=2,c.A=Di(Fe(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=c.A,h=!0),h||(c.g=lc(c.j,null),c.g.ea(c.A)),c.F=Date.now(),Oi(c)}ac(r)}function xi(r){r.g&&(hr(r),r.g.cancel(),r.g=null)}function ec(r){xi(r),r.v&&(a.clearTimeout(r.v),r.v=null),Ui(r),r.h.cancel(),r.m&&(typeof r.m=="number"&&a.clearTimeout(r.m),r.m=null)}function Fi(r){if(!xa(r.h)&&!r.m){r.m=!0;var c=r.Ea;ot||p(),Se||(ot(),Se=!0),I.add(c,r),r.D=0}}function Af(r,c){return Fa(r.h)>=r.h.j-(r.m?1:0)?!1:r.m?(r.i=c.G.concat(r.i),!0):r.I==1||r.I==2||r.D>=(r.Sa?0:r.Ta)?!1:(r.m=kn(d(r.Ea,r,c),oc(r,r.D)),r.D++,!0)}n.Ea=function(r){if(this.m)if(this.m=null,this.I==1){if(!r){this.V=Math.floor(Math.random()*1e5),r=this.V++;const T=new at(this,this.j,r);let S=this.o;if(this.U&&(S?(S=pa(S),_a(S,this.U)):S=this.U),this.u!==null||this.R||(T.J=S,S=null),this.S)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,c>4096){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=nc(this,T,c),h=Fe(this.J),q(h,"RID",r),q(h,"CVER",22),this.G&&q(h,"X-HTTP-Session-Id",this.G),Bn(this,h),S&&(this.R?c="headers="+Nn(Ka(S))+"&"+c:this.u&&ar(h,this.u,S)),sr(this.h,T),this.Ra&&q(h,"TYPE","init"),this.S?(q(h,"$req",c),q(h,"SID","null"),T.U=!0,er(T,h,null)):er(T,h,c),this.I=2}}else this.I==3&&(r?tc(this,r):this.i.length==0||xa(this.h)||tc(this))};function tc(r,c){var h;c?h=c.l:h=r.V++;const f=Fe(r.J);q(f,"SID",r.M),q(f,"RID",h),q(f,"AID",r.K),Bn(r,f),r.u&&r.o&&ar(f,r.u,r.o),h=new at(r,r.j,h,r.D+1),r.u===null&&(h.J=r.o),c&&(r.i=c.G.concat(r.i)),c=nc(r,h,1e3),h.H=Math.round(r.va*.5)+Math.round(r.va*.5*Math.random()),sr(r.h,h),er(h,f,c)}function Bn(r,c){r.H&&Ri(r.H,function(h,f){q(c,f,h)}),r.l&&Ri({},function(h,f){q(c,f,h)})}function nc(r,c,h){h=Math.min(r.i.length,h);const f=r.l?d(r.l.Ka,r.l,r):null;e:{var T=r.i;let M=-1;for(;;){const Q=["count="+h];M==-1?h>0?(M=T[0].g,Q.push("ofs="+M)):M=0:Q.push("ofs="+M);let H=!0;for(let ne=0;ne<h;ne++){var S=T[ne].g;const Ue=T[ne].map;if(S-=M,S<0)M=Math.max(0,T[ne].g-100),H=!1;else try{S="req"+S+"_"||"";try{var k=Ue instanceof Map?Ue:Object.entries(Ue);for(const[Nt,ut]of k){let dt=ut;l(ut)&&(dt=zs(ut)),Q.push(S+Nt+"="+encodeURIComponent(dt))}}catch(Nt){throw Q.push(S+"type="+encodeURIComponent("_badmap")),Nt}}catch{f&&f(Ue)}}if(H){k=Q.join("&");break e}}k=void 0}return r=r.i.splice(0,h),c.G=r,k}function ic(r){if(!r.g&&!r.v){r.Y=1;var c=r.Da;ot||p(),Se||(ot(),Se=!0),I.add(c,r),r.A=0}}function lr(r){return r.g||r.v||r.A>=3?!1:(r.Y++,r.v=kn(d(r.Da,r),oc(r,r.A)),r.A++,!0)}n.Da=function(){if(this.v=null,sc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var r=4*this.T;this.j.info("BP detection timer enabled: "+r),this.B=kn(d(this.Wa,this),r)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,fe(10),xi(this),sc(this))};function hr(r){r.B!=null&&(a.clearTimeout(r.B),r.B=null)}function sc(r){r.g=new at(r,r.j,"rpc",r.Y),r.u===null&&(r.g.J=r.o),r.g.P=0;var c=Fe(r.na);q(c,"RID","rpc"),q(c,"SID",r.M),q(c,"AID",r.K),q(c,"CI",r.F?"0":"1"),!r.F&&r.ia&&q(c,"TO",r.ia),q(c,"TYPE","xmlhttp"),Bn(r,c),r.u&&r.o&&ar(c,r.u,r.o),r.O&&(r.g.H=r.O);var h=r.g;r=r.ba,h.M=1,h.A=Di(Fe(c)),h.u=null,h.R=!0,Oa(h,r)}n.Va=function(){this.C!=null&&(this.C=null,xi(this),lr(this),fe(19))};function Ui(r){r.C!=null&&(a.clearTimeout(r.C),r.C=null)}function rc(r,c){var h=null;if(r.g==c){Ui(r),hr(r),r.g=null;var f=2}else if(ir(r.h,c))h=c.G,Ua(r.h,c),f=1;else return;if(r.I!=0){if(c.o)if(f==1){h=c.u?c.u.length:0,c=Date.now()-c.F;var T=r.D;f=Js(),de(f,new ka(f,h)),Fi(r)}else ic(r);else if(T=c.m,T==3||T==0&&c.X>0||!(f==1&&Af(r,c)||f==2&&lr(r)))switch(h&&h.length>0&&(c=r.h,c.i=c.i.concat(h)),T){case 1:Rt(r,5);break;case 4:Rt(r,10);break;case 3:Rt(r,6);break;default:Rt(r,2)}}}function oc(r,c){let h=r.Qa+Math.floor(Math.random()*r.Za);return r.isActive()||(h*=2),h*c}function Rt(r,c){if(r.j.info("Error code "+c),c==2){var h=d(r.bb,r),f=r.Ua;const T=!f;f=new ct(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||On(f,"https"),Di(f),T?If(f.toString(),h):Ef(f.toString(),h)}else fe(2);r.I=0,r.l&&r.l.pa(c),ac(r),ec(r)}n.bb=function(r){r?(this.j.info("Successfully pinged google.com"),fe(2)):(this.j.info("Failed to ping google.com"),fe(1))};function ac(r){if(r.I=0,r.ja=[],r.l){const c=Va(r.h);(c.length!=0||r.i.length!=0)&&(R(r.ja,c),R(r.ja,r.i),r.h.i.length=0,A(r.i),r.i.length=0),r.l.oa()}}function cc(r,c,h){var f=h instanceof ct?Fe(h):new ct(h);if(f.g!="")c&&(f.g=c+"."+f.g),Dn(f,f.u);else{var T=a.location;f=T.protocol,c=c?c+"."+T.hostname:T.hostname,T=+T.port;const S=new ct(null);f&&On(S,f),c&&(S.g=c),T&&Dn(S,T),h&&(S.h=h),f=S}return h=r.G,c=r.wa,h&&c&&q(f,h,c),q(f,"VER",r.ka),Bn(r,f),f}function lc(r,c,h){if(c&&!r.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=r.Aa&&!r.ma?new Y(new or({ab:h})):new Y(r.ma),c.Fa(r.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function hc(){}n=hc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function be(r,c){ce.call(this),this.g=new Za(c),this.l=r,this.h=c&&c.messageUrlParams||null,r=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(r?r["X-Client-Protocol"]="webchannel":r={"X-Client-Protocol":"webchannel"}),this.g.o=r,r=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(r?r["X-WebChannel-Content-Type"]=c.messageContentType:r={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(r?r["X-WebChannel-Client-Profile"]=c.sa:r={"X-WebChannel-Client-Profile":c.sa}),this.g.U=r,(r=c&&c.Qb)&&!g(r)&&(this.g.u=r),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!g(c)&&(this.g.G=c,r=this.h,r!==null&&c in r&&(r=this.h,c in r&&delete r[c])),this.j=new en(this)}_(be,ce),be.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},be.prototype.close=function(){cr(this.g)},be.prototype.o=function(r){var c=this.g;if(typeof r=="string"){var h={};h.__data__=r,r=h}else this.v&&(h={},h.__data__=zs(r),r=h);c.i.push(new ff(c.Ya++,r)),c.I==3&&Fi(c)},be.prototype.N=function(){this.g.l=null,delete this.j,cr(this.g),delete this.g,be.Z.N.call(this)};function uc(r){Ks.call(this),r.__headers__&&(this.headers=r.__headers__,this.statusCode=r.__status__,delete r.__headers__,delete r.__status__);var c=r.__sm__;if(c){e:{for(const h in c){r=h;break e}r=void 0}(this.i=r)&&(r=this.i,c=c!==null&&r in c?c[r]:void 0),this.data=c}else this.data=r}_(uc,Ks);function dc(){Ys.call(this),this.status=1}_(dc,Ys);function en(r){this.g=r}_(en,hc),en.prototype.ra=function(){de(this.g,"a")},en.prototype.qa=function(r){de(this.g,new uc(r))},en.prototype.pa=function(r){de(this.g,new dc)},en.prototype.oa=function(){de(this.g,"b")},be.prototype.send=be.prototype.o,be.prototype.open=be.prototype.m,be.prototype.close=be.prototype.close,Xs.NO_ERROR=0,Xs.TIMEOUT=8,Xs.HTTP_ERROR=6,lf.COMPLETE="complete",sf.EventType=bn,bn.OPEN="a",bn.CLOSE="b",bn.ERROR="c",bn.MESSAGE="d",ce.prototype.listen=ce.prototype.J,Y.prototype.listenOnce=Y.prototype.K,Y.prototype.getLastError=Y.prototype.Ha,Y.prototype.getLastErrorCode=Y.prototype.ya,Y.prototype.getStatus=Y.prototype.ca,Y.prototype.getResponseJson=Y.prototype.La,Y.prototype.getResponseText=Y.prototype.la,Y.prototype.send=Y.prototype.ea,Y.prototype.setWithCredentials=Y.prototype.Fa}).apply(typeof ji<"u"?ji:typeof self<"u"?self:typeof window<"u"?window:{});const Xc="@firebase/firestore",Qc="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}pe.UNAUTHENTICATED=new pe(null),pe.GOOGLE_CREDENTIALS=new pe("google-credentials-uid"),pe.FIRST_PARTY=new pe("first-party-uid"),pe.MOCK_USER=new pe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vi="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn=new pi("@firebase/firestore");function Pe(n,...e){if(pn.logLevel<=W.DEBUG){const t=e.map(Ro);pn.debug(`Firestore (${vi}): ${n}`,...t)}}function gu(n,...e){if(pn.logLevel<=W.ERROR){const t=e.map(Ro);pn.error(`Firestore (${vi}): ${n}`,...t)}}function Ry(n,...e){if(pn.logLevel<=W.WARN){const t=e.map(Ro);pn.warn(`Firestore (${vi}): ${n}`,...t)}}function Ro(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function si(n,e,t){let i="Unexpected state";typeof e=="string"?i=e:t=e,_u(n,i,t)}function _u(n,e,t){let i=`FIRESTORE (${vi}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{i+=" CONTEXT: "+JSON.stringify(t)}catch{i+=" CONTEXT: "+t}throw gu(i),new Error(i)}function zn(n,e,t,i){let s="Unexpected state";typeof t=="string"?s=t:i=t,n||_u(e,s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class B extends Le{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Ny{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(pe.UNAUTHENTICATED)))}shutdown(){}}class Py{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Oy{constructor(e){this.t=e,this.currentUser=pe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){zn(this.o===void 0,42304);let i=this.i;const s=u=>this.i!==i?(i=this.i,t(u)):Promise.resolve();let o=new Kn;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Kn,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const u=o;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},l=u=>{Pe("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>l(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(Pe("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Kn)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((i=>this.i!==e?(Pe("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(zn(typeof i.accessToken=="string",31837,{l:i}),new mu(i.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return zn(e===null||typeof e=="string",2055,{h:e}),new pe(e)}}class Dy{constructor(e,t,i){this.P=e,this.T=t,this.I=i,this.type="FirstParty",this.user=pe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class My{constructor(e,t,i){this.P=e,this.T=t,this.I=i}getToken(){return Promise.resolve(new Dy(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(pe.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Zc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ly{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ke(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){zn(this.o===void 0,3512);const i=o=>{o.error!=null&&Pe("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,Pe("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable((()=>i(o)))};const s=o=>{Pe("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>s(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):Pe("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Zc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(zn(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Zc(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xy(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fy{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const s=xy(40);for(let o=0;o<s.length;++o)i.length<20&&s[o]<t&&(i+=e.charAt(s[o]%62))}return i}}function It(n,e){return n<e?-1:n>e?1:0}function Uy(n,e){const t=Math.min(n.length,e.length);for(let i=0;i<t;i++){const s=n.charAt(i),o=e.charAt(i);if(s!==o)return Tr(s)===Tr(o)?It(s,o):Tr(s)?1:-1}return It(n.length,e.length)}const Vy=55296,By=57343;function Tr(n){const e=n.charCodeAt(0);return e>=Vy&&e<=By}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el="__name__";class Ve{constructor(e,t,i){t===void 0?t=0:t>e.length&&si(637,{offset:t,range:e.length}),i===void 0?i=e.length-t:i>e.length-t&&si(1746,{length:i,range:e.length-t}),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return Ve.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ve?e.forEach((i=>{t.push(i)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let s=0;s<i;s++){const o=Ve.compareSegments(e.get(s),t.get(s));if(o!==0)return o}return It(e.length,t.length)}static compareSegments(e,t){const i=Ve.isNumericId(e),s=Ve.isNumericId(t);return i&&!s?-1:!i&&s?1:i&&s?Ve.extractNumericId(e).compare(Ve.extractNumericId(t)):Uy(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return ko.fromString(e.substring(4,e.length-2))}}class Ae extends Ve{construct(e,t,i){return new Ae(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new B(V.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter((s=>s.length>0)))}return new Ae(t)}static emptyPath(){return new Ae([])}}const jy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Dt extends Ve{construct(e,t,i){return new Dt(e,t,i)}static isValidIdentifier(e){return jy.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Dt.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===el}static keyField(){return new Dt([el])}static fromServerFormat(e){const t=[];let i="",s=0;const o=()=>{if(i.length===0)throw new B(V.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new B(V.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new B(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(i+=l,s++):(o(),s++)}if(o(),a)throw new B(V.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Dt(t)}static emptyPath(){return new Dt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this.path=e}static fromPath(e){return new Lt(Ae.fromString(e))}static fromName(e){return new Lt(Ae.fromString(e).popFirst(5))}static empty(){return new Lt(Ae.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ae.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ae.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Lt(new Ae(e.slice()))}}function Wy(n,e,t,i){if(e===!0&&i===!0)throw new B(V.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Hy(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function $y(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(i){return i.constructor?i.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":si(12329,{type:typeof n})}function Gy(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new B(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=$y(n);throw new B(V.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(n,e){const t={typeString:n};return e&&(t.value=e),t}function wi(n,e){if(!Hy(n))throw new B(V.INVALID_ARGUMENT,"JSON must be an object");let t;for(const i in e)if(e[i]){const s=e[i].typeString,o="value"in e[i]?{value:e[i].value}:void 0;if(!(i in n)){t=`JSON missing required field: '${i}'`;break}const a=n[i];if(s&&typeof a!==s){t=`JSON field '${i}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){t=`Expected '${i}' field to equal '${o.value}'`;break}}if(t)throw new B(V.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl=-62135596800,nl=1e6;class Be{static now(){return Be.fromMillis(Date.now())}static fromDate(e){return Be.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor((e-1e3*t)*nl);return new Be(t,i)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new B(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new B(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<tl)throw new B(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new B(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/nl}_compareTo(e){return this.seconds===e.seconds?It(this.nanoseconds,e.nanoseconds):It(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Be._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(wi(e,Be._jsonSchema))return new Be(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-tl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Be._jsonSchemaVersion="firestore/timestamp/1.0",Be._jsonSchema={type:X("string",Be._jsonSchemaVersion),seconds:X("number"),nanoseconds:X("number")};function qy(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zy extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new zy("Invalid base64 string: "+o):o}})(e);return new $t(t)}static fromUint8Array(e){const t=(function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o})(e);return new $t(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return It(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}$t.EMPTY_BYTE_STRING=new $t("");const Gr="(default)";class ls{constructor(e,t){this.projectId=e,this.database=t||Gr}static empty(){return new ls("","")}get isDefaultDatabase(){return this.database===Gr}isEqual(e){return e instanceof ls&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ky{constructor(e,t=null,i=[],s=[],o=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Yy(n){return new Ky(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var il,U;(U=il||(il={}))[U.OK=0]="OK",U[U.CANCELLED=1]="CANCELLED",U[U.UNKNOWN=2]="UNKNOWN",U[U.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",U[U.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",U[U.NOT_FOUND=5]="NOT_FOUND",U[U.ALREADY_EXISTS=6]="ALREADY_EXISTS",U[U.PERMISSION_DENIED=7]="PERMISSION_DENIED",U[U.UNAUTHENTICATED=16]="UNAUTHENTICATED",U[U.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",U[U.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",U[U.ABORTED=10]="ABORTED",U[U.OUT_OF_RANGE=11]="OUT_OF_RANGE",U[U.UNIMPLEMENTED=12]="UNIMPLEMENTED",U[U.INTERNAL=13]="INTERNAL",U[U.UNAVAILABLE=14]="UNAVAILABLE",U[U.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new ko([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xy=1048576;function Cr(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(e,t,i=1e3,s=1.5,o=6e4){this.Mi=e,this.timerId=t,this.d_=i,this.A_=s,this.R_=o,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),i=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-i);s>0&&Pe("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(e,t,i,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=s,this.removalCallback=o,this.deferred=new Kn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,s,o){const a=Date.now()+i,l=new No(e,t,a,s,o);return l.start(i),l}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new B(V.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var sl,rl;(rl=sl||(sl={})).Ma="default",rl.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zy(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yu="firestore.googleapis.com",al=!0;class cl{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new B(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=yu,this.ssl=al}else this.host=e.host,this.ssl=e.ssl??al;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Jy;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Xy)throw new B(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Wy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Zy(e.experimentalLongPollingOptions??{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new B(V.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new B(V.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new B(V.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(i,s){return i.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class vu{constructor(e,t,i,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new cl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new B(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new B(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new cl(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(i){if(!i)return new Ny;switch(i.type){case"firstParty":return new My(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new B(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const i=ol.get(t);i&&(Pe("ComponentProvider","Removing Datastore"),ol.delete(t),i.terminate())})(this),Promise.resolve()}}function ev(n,e,t,i={}){var d;n=Gy(n,vu);const s=Kt(e),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;s&&(ro(`https://${l}`),oo("Firestore",!0)),o.host!==yu&&o.host!==l&&Ry("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...o,host:l,ssl:s,emulatorOptions:i};if(!Ze(u,a)&&(n._setSettings(u),i.mockUserToken)){let y,_;if(typeof i.mockUserToken=="string")y=i.mockUserToken,_=pe.MOCK_USER;else{y=ch(i.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const v=i.mockUserToken.sub||i.mockUserToken.user_id;if(!v)throw new B(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");_=new pe(v)}n._authCredentials=new Py(new mu(y,_))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new Po(this.firestore,e,this._query)}}class je{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Oo(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new je(this.firestore,e,this._key)}toJSON(){return{type:je._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,i){if(wi(t,je._jsonSchema))return new je(e,i||null,new Lt(Ae.fromString(t.referencePath)))}}je._jsonSchemaVersion="firestore/documentReference/1.0",je._jsonSchema={type:X("string",je._jsonSchemaVersion),referencePath:X("string")};class Oo extends Po{constructor(e,t,i){super(e,t,Yy(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new je(this.firestore,null,new Lt(e))}withConverter(e){return new Oo(this.firestore,e,this._path)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll="AsyncQueue";class hl{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Qy(this,"async_queue_retry"),this._c=()=>{const i=Cr();i&&Pe(ll,"Visibility state changed to "+i.visibilityState),this.M_.w_()},this.ac=e;const t=Cr();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Cr();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new Kn;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!qy(e))throw e;Pe(ll,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((i=>{throw this.nc=i,this.rc=!1,gu("INTERNAL UNHANDLED ERROR: ",ul(i)),i})).then((i=>(this.rc=!1,i))))));return this.ac=t,t}enqueueAfterDelay(e,t,i){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=No.createAndSchedule(this,e,t,i,(o=>this.hc(o)));return this.tc.push(s),s}uc(){this.nc&&si(47125,{Pc:ul(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,i)=>t.targetTimeMs-i.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function ul(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class tv extends vu{constructor(e,t,i,s){super(e,t,i,s),this.type="firestore",this._queue=new hl,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new hl(e),this._firestoreClient=void 0,await e}}}function eT(n,e){const t=typeof n=="object"?n:gi(),i=typeof n=="string"?n:Gr,s=rt(t,"firestore").getImmediate({identifier:i});if(!s._initialized){const o=rh("firestore");o&&ev(s,...o)}return s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ze($t.fromBase64String(e))}catch(t){throw new B(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ze($t.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ze._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(wi(e,ze._jsonSchema))return ze.fromBase64String(e.bytes)}}ze._jsonSchemaVersion="firestore/bytes/1.0",ze._jsonSchema={type:X("string",ze._jsonSchemaVersion),bytes:X("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new B(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Dt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new B(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new B(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return It(this._lat,e._lat)||It(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Vt._jsonSchemaVersion}}static fromJSON(e){if(wi(e,Vt._jsonSchema))return new Vt(e.latitude,e.longitude)}}Vt._jsonSchemaVersion="firestore/geoPoint/1.0",Vt._jsonSchema={type:X("string",Vt._jsonSchemaVersion),latitude:X("number"),longitude:X("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(i,s){if(i.length!==s.length)return!1;for(let o=0;o<i.length;++o)if(i[o]!==s[o])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Bt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(wi(e,Bt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Bt(e.vectorValues);throw new B(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Bt._jsonSchemaVersion="firestore/vectorValue/1.0",Bt._jsonSchema={type:X("string",Bt._jsonSchemaVersion),vectorValues:X("object")};const nv=new RegExp("[~\\*/\\[\\]]");function iv(n,e,t){if(e.search(nv)>=0)throw dl(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new wu(...e.split("."))._internalPath}catch{throw dl(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function dl(n,e,t,i,s){let o=`Function ${e}() called with invalid data`;o+=". ";let a="";return new B(V.INVALID_ARGUMENT,o+n+a)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e,t,i,s,o){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new je(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new sv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Eu("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class sv extends Iu{data(){return super.data()}}function Eu(n,e){return typeof e=="string"?iv(n,e):e instanceof wu?e._internalPath:e._delegate._internalPath}class Wi{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ln extends Iu{constructor(e,t,i,s,o,a){super(e,t,i,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Yi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(Eu("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new B(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ln._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}ln._jsonSchemaVersion="firestore/documentSnapshot/1.0",ln._jsonSchema={type:X("string",ln._jsonSchemaVersion),bundleSource:X("string","DocumentSnapshot"),bundleName:X("string"),bundle:X("string")};class Yi extends ln{data(e={}){return super.data(e)}}class Yn{constructor(e,t,i,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Wi(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((i=>{e.call(t,new Yi(this._firestore,this._userDataWriter,i.key,i,new Wi(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new B(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((l=>{const u=new Yi(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Wi(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((l=>o||l.type!==3)).map((l=>{const u=new Yi(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Wi(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,y=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),y=a.indexOf(l.doc.key)),{type:rv(l.type),doc:u,oldIndex:d,newIndex:y}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new B(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Yn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Fy.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],i=[],s=[];return this.docs.forEach((o=>{o._document!==null&&(t.push(o._document),i.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function rv(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return si(61501,{type:n})}}Yn._jsonSchemaVersion="firestore/querySnapshot/1.0",Yn._jsonSchema={type:X("string",Yn._jsonSchemaVersion),bundleSource:X("string","QuerySnapshot"),bundleName:X("string"),bundle:X("string")};(function(e,t=!0){(function(s){vi=s})(Yt),Ce(new Ie("firestore",((i,{instanceIdentifier:s,options:o})=>{const a=i.getProvider("app").getImmediate(),l=new tv(new Oy(i.getProvider("auth-internal")),new Ly(a,i.getProvider("app-check-internal")),(function(d,y){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new B(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ls(d.options.projectId,y)})(a,s),a);return o={useFetchStreams:t,...o},l._setSettings(o),l}),"PUBLIC").setMultipleInstances(!0)),he(Xc,Qc,e),he(Xc,Qc,"esm2020")})();var fl={};const pl="@firebase/database",gl="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tu="";function ov(n){Tu=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class av{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Z(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:ti(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return st(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cu=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new av(e)}}catch{}return new cv},xt=Cu("localStorage"),lv=Cu("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn=new pi("@firebase/database"),hv=(function(){let n=1;return function(){return n++}})(),Su=function(n){const e=Xf(n),t=new zf;t.update(e);const i=t.digest();return io.encodeByteArray(i)},Ii=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Ii.apply(null,i):typeof i=="object"?e+=Z(i):e+=i,e+=" "}return e};let Jn=null,_l=!0;const uv=function(n,e){b(!0,"Can't turn on custom loggers persistently."),hn.logLevel=W.VERBOSE,Jn=hn.log.bind(hn)},le=function(...n){if(_l===!0&&(_l=!1,Jn===null&&lv.get("logging_enabled")===!0&&uv()),Jn){const e=Ii.apply(null,n);Jn(e)}},Ei=function(n){return function(...e){le(n,...e)}},qr=function(...n){const e="FIREBASE INTERNAL ERROR: "+Ii(...n);hn.error(e)},it=function(...n){const e=`FIREBASE FATAL ERROR: ${Ii(...n)}`;throw hn.error(e),new Error(e)},we=function(...n){const e="FIREBASE WARNING: "+Ii(...n);hn.warn(e)},dv=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&we("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},bu=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},fv=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},gn="[MIN_NAME]",Gt="[MAX_NAME]",En=function(n,e){if(n===e)return 0;if(n===gn||e===Gt)return-1;if(e===gn||n===Gt)return 1;{const t=ml(n),i=ml(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},pv=function(n,e){return n===e?0:n<e?-1:1},jn=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+Z(e))},Do=function(n){if(typeof n!="object"||n===null)return Z(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=Z(e[i]),t+=":",t+=Do(n[e[i]]);return t+="}",t},Au=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function Ee(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const ku=function(n){b(!bu(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,o,a,l,u;n===0?(o=0,a=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(l=Math.min(Math.floor(Math.log(n)/Math.LN2),i),o=l+i,a=Math.round(n*Math.pow(2,t-l)-Math.pow(2,t))):(o=0,a=Math.round(n/Math.pow(2,1-i-t))));const d=[];for(u=t;u;u-=1)d.push(a%2?1:0),a=Math.floor(a/2);for(u=e;u;u-=1)d.push(o%2?1:0),o=Math.floor(o/2);d.push(s?1:0),d.reverse();const y=d.join("");let _="";for(u=0;u<64;u+=8){let v=parseInt(y.substr(u,8),2).toString(16);v.length===1&&(v="0"+v),_=_+v}return _.toLowerCase()},gv=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},_v=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function mv(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const yv=new RegExp("^-?(0*)\\d{1,10}$"),vv=-2147483648,wv=2147483647,ml=function(n){if(yv.test(n)){const e=Number(n);if(e>=vv&&e<=wv)return e}return null},Tn=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw we("Exception was thrown by user callback.",t),e},Math.floor(0))}},Iv=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Xn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ev{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,ke(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){we(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tv{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(le("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',we(e)}}class Ji{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ji.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mo="5",Ru="v",Nu="s",Pu="r",Ou="f",Du=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Mu="ls",Lu="p",zr="ac",xu="websocket",Fu="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(e,t,i,s,o=!1,a="",l=!1,u=!1,d=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=o,this.persistenceKey=a,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=u,this.emulatorOptions=d,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=xt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&xt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Cv(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Vu(n,e,t){b(typeof e=="string","typeof type must == string"),b(typeof t=="object","typeof params must == object");let i;if(e===xu)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Fu)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Cv(n)&&(t.ns=n.namespace);const s=[];return Ee(t,(o,a)=>{s.push(o+"="+a)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sv{constructor(){this.counters_={}}incrementCounter(e,t=1){st(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Pf(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr={},br={};function Lo(n){const e=n.toString();return Sr[e]||(Sr[e]=new Sv),Sr[e]}function bv(n,e){const t=n.toString();return br[t]||(br[t]=e()),br[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Tn(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl="start",kv="close",Rv="pLPCommand",Nv="pRTLPCB",Bu="id",ju="pw",Wu="ser",Pv="cb",Ov="seg",Dv="ts",Mv="d",Lv="dframe",Hu=1870,$u=30,xv=Hu-$u,Fv=25e3,Uv=3e4;class sn{constructor(e,t,i,s,o,a,l){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=o,this.transportSessionId=a,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ei(e),this.stats_=Lo(t),this.urlFn=u=>(this.appCheckToken&&(u[zr]=this.appCheckToken),Vu(t,Fu,u))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Av(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Uv)),fv(()=>{if(this.isClosed_)return;this.scriptTagHolder=new xo((...o)=>{const[a,l,u,d,y]=o;if(this.incrementIncomingBytes_(o),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,a===yl)this.id=l,this.password=u;else if(a===kv)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+a)},(...o)=>{const[a,l]=o;this.incrementIncomingBytes_(o),this.myPacketOrderer.handleResponse(a,l)},()=>{this.onClosed_()},this.urlFn);const i={};i[yl]="t",i[Wu]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Pv]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Ru]=Mo,this.transportSessionId&&(i[Nu]=this.transportSessionId),this.lastSessionId&&(i[Mu]=this.lastSessionId),this.applicationId&&(i[Lu]=this.applicationId),this.appCheckToken&&(i[zr]=this.appCheckToken),typeof location<"u"&&location.hostname&&Du.test(location.hostname)&&(i[Pu]=Ou);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){sn.forceAllow_=!0}static forceDisallow(){sn.forceDisallow_=!0}static isAvailable(){return sn.forceAllow_?!0:!sn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!gv()&&!_v()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Z(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=nh(t),s=Au(i,xv);for(let o=0;o<s.length;o++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[o]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Lv]="t",i[Bu]=e,i[ju]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Z(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class xo{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=hv(),window[Rv+this.uniqueCallbackIdentifier]=e,window[Nv+this.uniqueCallbackIdentifier]=t,this.myIFrame=xo.createIFrame_();let o="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(o='<script>document.domain="'+document.domain+'";<\/script>');const a="<html><body>"+o+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(a),this.myIFrame.doc.close()}catch(l){le("frame writing exception"),l.stack&&le(l.stack),le(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||le("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Bu]=this.myID,e[ju]=this.myPW,e[Wu]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+$u+i.length<=Hu;){const a=this.pendingSegs.shift();i=i+"&"+Ov+s+"="+a.seg+"&"+Dv+s+"="+a.ts+"&"+Mv+s+"="+a.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(Fv)),o=()=>{clearTimeout(s),i()};this.addTag(e,o)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{le("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vv=16384,Bv=45e3;let hs=null;typeof MozWebSocket<"u"?hs=MozWebSocket:typeof WebSocket<"u"&&(hs=WebSocket);class Re{constructor(e,t,i,s,o,a,l){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=o,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ei(this.connId),this.stats_=Lo(t),this.connURL=Re.connectionURL_(t,a,l,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,o){const a={};return a[Ru]=Mo,typeof location<"u"&&location.hostname&&Du.test(location.hostname)&&(a[Pu]=Ou),t&&(a[Nu]=t),i&&(a[Mu]=i),s&&(a[zr]=s),o&&(a[Lu]=o),Vu(e,xu,a)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,xt.set("previous_websocket_failure",!0);try{let i;jf(),this.mySock=new hs(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Re.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&hs!==null&&!Re.forceDisallow_}static previouslyFailed(){return xt.isInMemoryStorage||xt.get("previous_websocket_failure")===!0}markConnectionHealthy(){xt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=ti(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(b(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=Z(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Au(t,Vv);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Bv))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Re.responsesRequiredToBeHealthy=2;Re.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{static get ALL_TRANSPORTS(){return[sn,Re]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Re&&Re.isAvailable();let i=t&&!Re.previouslyFailed();if(e.webSocketOnly&&(t||we("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Re];else{const s=this.transports_=[];for(const o of ri.ALL_TRANSPORTS)o&&o.isAvailable()&&s.push(o);ri.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ri.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jv=6e4,Wv=5e3,Hv=10*1024,$v=100*1024,Ar="t",vl="d",Gv="s",wl="r",qv="e",Il="o",El="a",Tl="n",Cl="p",zv="h";class Kv{constructor(e,t,i,s,o,a,l,u,d,y){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=o,this.onMessage_=a,this.onReady_=l,this.onDisconnect_=u,this.onKill_=d,this.lastSessionId=y,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ei("c:"+this.id+":"),this.transportManager_=new ri(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Xn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>$v?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Hv?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ar in e){const t=e[Ar];t===El?this.upgradeIfSecondaryHealthy_():t===wl?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Il&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=jn("t",e),i=jn("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Cl,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:El,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Tl,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=jn("t",e),i=jn("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=jn(Ar,e);if(vl in e){const i=e[vl];if(t===zv){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Tl){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Gv?this.onConnectionShutdown_(i):t===wl?this.onReset_(i):t===qv?qr("Server Error: "+i):t===Il?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):qr("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Mo!==i&&we("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Xn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(jv))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Xn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Wv))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Cl,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(xt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e){this.allowedEvents_=e,this.listeners_={},b(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let o=0;o<s.length;o++)if(s[o].callback===t&&(!i||i===s[o].context)){s.splice(o,1);return}}validateEventType_(e){b(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us extends qu{static getInstance(){return new us}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!ao()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return b(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl=32,bl=768;class ${constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function j(){return new $("")}function L(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Et(n){return n.pieces_.length-n.pieceNum_}function G(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new $(n.pieces_,e)}function zu(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Yv(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Ku(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Yu(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new $(e,0)}function ee(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof $)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new $(t,0)}function F(n){return n.pieceNum_>=n.pieces_.length}function ge(n,e){const t=L(n),i=L(e);if(t===null)return e;if(t===i)return ge(G(n),G(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Fo(n,e){if(Et(n)!==Et(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function Oe(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Et(n)>Et(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Jv{constructor(e,t){this.errorPrefix_=t,this.parts_=Ku(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Ss(this.parts_[i]);Ju(this)}}function Xv(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Ss(e),Ju(n)}function Qv(n){const e=n.parts_.pop();n.byteLength_-=Ss(e),n.parts_.length>0&&(n.byteLength_-=1)}function Ju(n){if(n.byteLength_>bl)throw new Error(n.errorPrefix_+"has a key path longer than "+bl+" bytes ("+n.byteLength_+").");if(n.parts_.length>Sl)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Sl+") or object contains a cycle "+Ot(n))}function Ot(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo extends qu{static getInstance(){return new Uo}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return b(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wn=1e3,Zv=300*1e3,Al=30*1e3,ew=1.3,tw=3e4,nw="server_kill",kl=3;class Qe extends Gu{constructor(e,t,i,s,o,a,l,u){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=o,this.authTokenProvider_=a,this.appCheckTokenProvider_=l,this.authOverride_=u,this.id=Qe.nextPersistentConnectionId_++,this.log_=Ei("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Wn,this.maxReconnectDelay_=Zv,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Uo.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&us.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,o={r:s,a:e,b:t};this.log_(Z(o)),b(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(o),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new Cs,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:a=>{const l=a.d;a.s==="ok"?t.resolve(l):t.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const o=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(o),t.promise}listen(e,t,i,s){this.initConnection_();const o=e._queryIdentifier,a=e._path.toString();this.log_("Listen called for "+a+" "+o),this.listens.has(a)||this.listens.set(a,new Map),b(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),b(!this.listens.get(a).has(o),"listen() called twice for same path/queryId.");const l={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(a).set(o,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const o={p:i},a="q";e.tag&&(o.q=t._queryObject,o.t=e.tag),o.h=e.hashFn(),this.sendRequest(a,o,l=>{const u=l.d,d=l.s;Qe.warnOnListenWarnings_(u,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",l),d!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(d,u))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&st(e,"w")){const i=dn(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',o=t._path.toString();we(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${o} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||qf(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Al)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Gf(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const o=s.s,a=s.d||"error";this.authToken_===e&&(o==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(o,a))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),b(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const o={p:e},a="n";s&&(o.q=i,o.t=s),this.sendRequest(a,o)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const o={p:t,d:i};this.log_("onDisconnect "+e,o),this.sendRequest(e,o,a=>{s&&setTimeout(()=>{s(a.s,a.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,o){this.initConnection_();const a={p:t,d:i};o!==void 0&&(a.h=o),this.outstandingPuts_.push({action:e,request:a,onComplete:s}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,o=>{this.log_(t+" response",o),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(o.s,o.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const o=i.d;this.log_("reportStats","Error sending stats: "+o)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Z(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):qr("Unrecognized action received from server: "+Z(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){b(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Wn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Wn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>tw&&(this.reconnectDelay_=Wn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*ew)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Qe.nextConnectionId_++,o=this.lastSessionId;let a=!1,l=null;const u=function(){l?l.close():(a=!0,i())},d=function(_){b(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(_)};this.realtime_={close:u,sendRequest:d};const y=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[_,v]=await Promise.all([this.authTokenProvider_.getToken(y),this.appCheckTokenProvider_.getToken(y)]);a?le("getToken() completed but was canceled"):(le("getToken() completed. Creating connection."),this.authToken_=_&&_.accessToken,this.appCheckToken_=v&&v.token,l=new Kv(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,A=>{we(A+" ("+this.repoInfo_.toString()+")"),this.interrupt(nw)},o))}catch(_){this.log_("Failed to get token: "+_),a||(this.repoInfo_.nodeAdmin&&we(_),u())}}}interrupt(e){le("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){le("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Lr(this.interruptReasons_)&&(this.reconnectDelay_=Wn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(o=>Do(o)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new $(e).toString();let s;if(this.listens.has(i)){const o=this.listens.get(i);s=o.get(t),o.delete(t),o.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){le("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=kl&&(this.reconnectDelay_=Al,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){le("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=kl&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Tu.replace(/\./g,"-")]=1,ao()?e["framework.cordova"]=1:hh()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=us.getInstance().currentlyOnline();return Lr(this.interruptReasons_)&&e}}Qe.nextPersistentConnectionId_=0;Qe.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new x(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new x(gn,e),s=new x(gn,t);return this.compare(i,s)!==0}minPost(){return x.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hi;class Xu extends Ps{static get __EMPTY_NODE(){return Hi}static set __EMPTY_NODE(e){Hi=e}compare(e,t){return En(e.name,t.name)}isDefinedOn(e){throw vn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return x.MIN}maxPost(){return new x(Gt,Hi)}makePost(e,t){return b(typeof e=="string","KeyIndex indexValue must always be a string."),new x(e,Hi)}toString(){return".key"}}const un=new Xu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e,t,i,s,o=null){this.isReverse_=s,this.resultGenerator_=o,this.nodeStack_=[];let a=1;for(;!e.isEmpty();)if(e=e,a=t?i(e.key,t):1,s&&(a*=-1),a<0)this.isReverse_?e=e.left:e=e.right;else if(a===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class se{constructor(e,t,i,s,o){this.key=e,this.value=t,this.color=i??se.RED,this.left=s??ve.EMPTY_NODE,this.right=o??ve.EMPTY_NODE}copy(e,t,i,s,o){return new se(e??this.key,t??this.value,i??this.color,s??this.left,o??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const o=i(e,s.key);return o<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):o===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return ve.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return ve.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,se.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}se.RED=!0;se.BLACK=!1;class iw{copy(e,t,i,s,o){return this}insert(e,t,i){return new se(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ve{constructor(e,t=ve.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new ve(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,se.BLACK,null,null))}remove(e){return new ve(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,se.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new $i(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new $i(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new $i(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new $i(this.root_,null,this.comparator_,!0,e)}}ve.EMPTY_NODE=new iw;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sw(n,e){return En(n.name,e.name)}function Vo(n,e){return En(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Kr;function rw(n){Kr=n}const Qu=function(n){return typeof n=="number"?"number:"+ku(n):"string:"+n},Zu=function(n){if(n.isLeafNode()){const e=n.val();b(typeof e=="string"||typeof e=="number"||typeof e=="object"&&st(e,".sv"),"Priority must be a string or number.")}else b(n===Kr||n.isEmpty(),"priority of unexpected type.");b(n===Kr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rl;class ie{static set __childrenNodeConstructor(e){Rl=e}static get __childrenNodeConstructor(){return Rl}constructor(e,t=ie.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,b(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Zu(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ie(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ie.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return F(e)?this:L(e)===".priority"?this.priorityNode_:ie.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:ie.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=L(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(b(i!==".priority"||Et(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,ie.__childrenNodeConstructor.EMPTY_NODE.updateChild(G(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Qu(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=ku(this.value_):e+=this.value_,this.lazyHash_=Su(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ie.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ie.__childrenNodeConstructor?-1:(b(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=ie.VALUE_TYPE_ORDER.indexOf(t),o=ie.VALUE_TYPE_ORDER.indexOf(i);return b(s>=0,"Unknown leaf type: "+t),b(o>=0,"Unknown leaf type: "+i),s===o?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:o-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}ie.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ed,td;function ow(n){ed=n}function aw(n){td=n}class cw extends Ps{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),o=i.compareTo(s);return o===0?En(e.name,t.name):o}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return x.MIN}maxPost(){return new x(Gt,new ie("[PRIORITY-POST]",td))}makePost(e,t){const i=ed(e);return new x(t,new ie("[PRIORITY-POST]",i))}toString(){return".priority"}}const K=new cw;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lw=Math.log(2);class hw{constructor(e){const t=o=>parseInt(Math.log(o)/lw,10),i=o=>parseInt(Array(o+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const ds=function(n,e,t,i){n.sort(e);const s=function(u,d){const y=d-u;let _,v;if(y===0)return null;if(y===1)return _=n[u],v=t?t(_):_,new se(v,_.node,se.BLACK,null,null);{const A=parseInt(y/2,10)+u,R=s(u,A),P=s(A+1,d);return _=n[A],v=t?t(_):_,new se(v,_.node,se.BLACK,R,P)}},o=function(u){let d=null,y=null,_=n.length;const v=function(R,P){const D=_-R,J=_;_-=R;const te=s(D+1,J),ae=n[D],xe=t?t(ae):ae;A(new se(xe,ae.node,P,null,te))},A=function(R){d?(d.left=R,d=R):(y=R,d=R)};for(let R=0;R<u.count;++R){const P=u.nextBitIsOne(),D=Math.pow(2,u.count-(R+1));P?v(D,se.BLACK):(v(D,se.BLACK),v(D,se.RED))}return y},a=new hw(n.length),l=o(a);return new ve(i||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kr;const tn={};class Je{static get Default(){return b(tn&&K,"ChildrenNode.ts has not been loaded"),kr=kr||new Je({".priority":tn},{".priority":K}),kr}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=dn(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof ve?t:null}hasIndex(e){return st(this.indexSet_,e.toString())}addIndex(e,t){b(e!==un,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const o=t.getIterator(x.Wrap);let a=o.getNext();for(;a;)s=s||e.isDefinedOn(a.node),i.push(a),a=o.getNext();let l;s?l=ds(i,e.getCompare()):l=tn;const u=e.toString(),d={...this.indexSet_};d[u]=e;const y={...this.indexes_};return y[u]=l,new Je(y,d)}addToIndexes(e,t){const i=Zi(this.indexes_,(s,o)=>{const a=dn(this.indexSet_,o);if(b(a,"Missing index implementation for "+o),s===tn)if(a.isDefinedOn(e.node)){const l=[],u=t.getIterator(x.Wrap);let d=u.getNext();for(;d;)d.name!==e.name&&l.push(d),d=u.getNext();return l.push(e),ds(l,a.getCompare())}else return tn;else{const l=t.get(e.name);let u=s;return l&&(u=u.remove(new x(e.name,l))),u.insert(e,e.node)}});return new Je(i,this.indexSet_)}removeFromIndexes(e,t){const i=Zi(this.indexes_,s=>{if(s===tn)return s;{const o=t.get(e.name);return o?s.remove(new x(e.name,o)):s}});return new Je(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hn;class N{static get EMPTY_NODE(){return Hn||(Hn=new N(new ve(Vo),null,Je.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Zu(this.priorityNode_),this.children_.isEmpty()&&b(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Hn}updatePriority(e){return this.children_.isEmpty()?this:new N(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Hn:t}}getChild(e){const t=L(e);return t===null?this:this.getImmediateChild(t).getChild(G(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(b(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new x(e,t);let s,o;t.isEmpty()?(s=this.children_.remove(e),o=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),o=this.indexMap_.addToIndexes(i,this.children_));const a=s.isEmpty()?Hn:this.priorityNode_;return new N(s,a,o)}}updateChild(e,t){const i=L(e);if(i===null)return t;{b(L(e)!==".priority"||Et(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(G(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,o=!0;if(this.forEachChild(K,(a,l)=>{t[a]=l.val(e),i++,o&&N.INTEGER_REGEXP_.test(a)?s=Math.max(s,Number(a)):o=!1}),!e&&o&&s<2*i){const a=[];for(const l in t)a[l]=t[l];return a}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Qu(this.getPriority().val())+":"),this.forEachChild(K,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":Su(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const o=s.getPredecessorKey(new x(e,t));return o?o.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new x(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new x(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,x.Wrap);let o=s.peek();for(;o!=null&&t.compare(o,e)<0;)s.getNext(),o=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,x.Wrap);let o=s.peek();for(;o!=null&&t.compare(o,e)>0;)s.getNext(),o=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Ti?-1:0}withIndex(e){if(e===un||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new N(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===un||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(K),s=t.getIterator(K);let o=i.getNext(),a=s.getNext();for(;o&&a;){if(o.name!==a.name||!o.node.equals(a.node))return!1;o=i.getNext(),a=s.getNext()}return o===null&&a===null}else return!1;else return!1}}resolveIndex_(e){return e===un?null:this.indexMap_.get(e.toString())}}N.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class uw extends N{constructor(){super(new ve(Vo),N.EMPTY_NODE,Je.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return N.EMPTY_NODE}isEmpty(){return!1}}const Ti=new uw;Object.defineProperties(x,{MIN:{value:new x(gn,N.EMPTY_NODE)},MAX:{value:new x(Gt,Ti)}});Xu.__EMPTY_NODE=N.EMPTY_NODE;ie.__childrenNodeConstructor=N;rw(Ti);aw(Ti);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dw=!0;function re(n,e=null){if(n===null)return N.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),b(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new ie(t,re(e))}if(!(n instanceof Array)&&dw){const t=[];let i=!1;if(Ee(n,(a,l)=>{if(a.substring(0,1)!=="."){const u=re(l);u.isEmpty()||(i=i||!u.getPriority().isEmpty(),t.push(new x(a,u)))}}),t.length===0)return N.EMPTY_NODE;const o=ds(t,sw,a=>a.name,Vo);if(i){const a=ds(t,K.getCompare());return new N(o,re(e),new Je({".priority":a},{".priority":K}))}else return new N(o,re(e),Je.Default)}else{let t=N.EMPTY_NODE;return Ee(n,(i,s)=>{if(st(n,i)&&i.substring(0,1)!=="."){const o=re(s);(o.isLeafNode()||!o.isEmpty())&&(t=t.updateImmediateChild(i,o))}}),t.updatePriority(re(e))}}ow(re);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw extends Ps{constructor(e){super(),this.indexPath_=e,b(!F(e)&&L(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),o=i.compareTo(s);return o===0?En(e.name,t.name):o}makePost(e,t){const i=re(e),s=N.EMPTY_NODE.updateChild(this.indexPath_,i);return new x(t,s)}maxPost(){const e=N.EMPTY_NODE.updateChild(this.indexPath_,Ti);return new x(Gt,e)}toString(){return Ku(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pw extends Ps{compare(e,t){const i=e.node.compareTo(t.node);return i===0?En(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return x.MIN}maxPost(){return x.MAX}makePost(e,t){const i=re(e);return new x(t,i)}toString(){return".value"}}const gw=new pw;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nd(n){return{type:"value",snapshotNode:n}}function _n(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function oi(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function ai(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function _w(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{constructor(e){this.index_=e}updateChild(e,t,i,s,o,a){b(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(t);return l.getChild(s).equals(i.getChild(s))&&l.isEmpty()===i.isEmpty()||(a!=null&&(i.isEmpty()?e.hasChild(t)?a.trackChildChange(oi(t,l)):b(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?a.trackChildChange(_n(t,i)):a.trackChildChange(ai(t,i,l))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(K,(s,o)=>{t.hasChild(s)||i.trackChildChange(oi(s,o))}),t.isLeafNode()||t.forEachChild(K,(s,o)=>{if(e.hasChild(s)){const a=e.getImmediateChild(s);a.equals(o)||i.trackChildChange(ai(s,o,a))}else i.trackChildChange(_n(s,o))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?N.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(e){this.indexedFilter_=new Bo(e.getIndex()),this.index_=e.getIndex(),this.startPost_=ci.getStartPost_(e),this.endPost_=ci.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,o,a){return this.matches(new x(t,i))||(i=N.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,o,a)}updateFullNode(e,t,i){t.isLeafNode()&&(t=N.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(N.EMPTY_NODE);const o=this;return t.forEachChild(K,(a,l)=>{o.matches(new x(a,l))||(s=s.updateImmediateChild(a,N.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mw{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new ci(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,o,a){return this.rangedFilter_.matches(new x(t,i))||(i=N.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,o,a):this.fullLimitUpdateChild_(e,t,i,o,a)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=N.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=N.EMPTY_NODE.withIndex(this.index_);let o;this.reverse_?o=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):o=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let a=0;for(;o.hasNext()&&a<this.limit_;){const l=o.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))s=s.updateImmediateChild(l.name,l.node),a++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(N.EMPTY_NODE);let o;this.reverse_?o=s.getReverseIterator(this.index_):o=s.getIterator(this.index_);let a=0;for(;o.hasNext();){const l=o.getNext();a<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?a++:s=s.updateImmediateChild(l.name,N.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,o){let a;if(this.reverse_){const _=this.index_.getCompare();a=(v,A)=>_(A,v)}else a=this.index_.getCompare();const l=e;b(l.numChildren()===this.limit_,"");const u=new x(t,i),d=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),y=this.rangedFilter_.matches(u);if(l.hasChild(t)){const _=l.getImmediateChild(t);let v=s.getChildAfterChild(this.index_,d,this.reverse_);for(;v!=null&&(v.name===t||l.hasChild(v.name));)v=s.getChildAfterChild(this.index_,v,this.reverse_);const A=v==null?1:a(v,u);if(y&&!i.isEmpty()&&A>=0)return o!=null&&o.trackChildChange(ai(t,i,_)),l.updateImmediateChild(t,i);{o!=null&&o.trackChildChange(oi(t,_));const P=l.updateImmediateChild(t,N.EMPTY_NODE);return v!=null&&this.rangedFilter_.matches(v)?(o!=null&&o.trackChildChange(_n(v.name,v.node)),P.updateImmediateChild(v.name,v.node)):P}}else return i.isEmpty()?e:y&&a(d,u)>=0?(o!=null&&(o.trackChildChange(oi(d.name,d.node)),o.trackChildChange(_n(t,i))),l.updateImmediateChild(t,i).updateImmediateChild(d.name,N.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=K}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return b(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return b(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:gn}hasEnd(){return this.endSet_}getIndexEndValue(){return b(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return b(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Gt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return b(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===K}copy(){const e=new jo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function yw(n){return n.loadsAllData()?new Bo(n.getIndex()):n.hasLimit()?new mw(n):new ci(n)}function Nl(n){const e={};if(n.isDefault())return e;let t;if(n.index_===K?t="$priority":n.index_===gw?t="$value":n.index_===un?t="$key":(b(n.index_ instanceof fw,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=Z(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=Z(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+Z(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=Z(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+Z(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Pl(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==K&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs extends Gu{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(b(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Ei("p:rest:"),this.listens_={}}listen(e,t,i,s){const o=e._path.toString();this.log_("Listen called for "+o+" "+e._queryIdentifier);const a=fs.getListenId_(e,i),l={};this.listens_[a]=l;const u=Nl(e._queryParams);this.restRequest_(o+".json",u,(d,y)=>{let _=y;if(d===404&&(_=null,d=null),d===null&&this.onDataUpdate_(o,_,!1,i),dn(this.listens_,a)===l){let v;d?d===401?v="permission_denied":v="rest_error:"+d:v="ok",s(v,null)}})}unlisten(e,t){const i=fs.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Nl(e._queryParams),i=e._path.toString(),s=new Cs;return this.restRequest_(i+".json",t,(o,a)=>{let l=a;o===404&&(l=null,o=null),o===null?(this.onDataUpdate_(i,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,o])=>{s&&s.accessToken&&(t.auth=s.accessToken),o&&o.token&&(t.ac=o.token);const a=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+wn(t);this.log_("Sending REST request for "+a);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(i&&l.readyState===4){this.log_("REST Response for "+a+" received. status:",l.status,"response:",l.responseText);let u=null;if(l.status>=200&&l.status<300){try{u=ti(l.responseText)}catch{we("Failed to parse JSON response for "+a+": "+l.responseText)}i(null,u)}else l.status!==401&&l.status!==404&&we("Got unsuccessful REST response for "+a+" Status: "+l.status),i(l.status);i=null}},l.open("GET",a,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{constructor(){this.rootNode_=N.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ps(){return{value:null,children:new Map}}function id(n,e,t){if(F(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=L(e);n.children.has(i)||n.children.set(i,ps());const s=n.children.get(i);e=G(e),id(s,e,t)}}function Yr(n,e,t){n.value!==null?t(e,n.value):ww(n,(i,s)=>{const o=new $(e.toString()+"/"+i);Yr(s,o,t)})}function ww(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iw{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&Ee(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ol=10*1e3,Ew=30*1e3,Tw=300*1e3;class Cw{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Iw(e);const i=Ol+(Ew-Ol)*Math.random();Xn(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;Ee(e,(s,o)=>{o>0&&st(this.statsToReport_,s)&&(t[s]=o,i=!0)}),i&&this.server_.reportStats(t),Xn(this.reportStats_.bind(this),Math.floor(Math.random()*2*Tw))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var De;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(De||(De={}));function sd(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Wo(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ho(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=De.ACK_USER_WRITE,this.source=sd()}operationForChild(e){if(F(this.path)){if(this.affectedTree.value!=null)return b(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new $(e));return new gs(j(),t,this.revert)}}else return b(L(this.path)===e,"operationForChild called for unrelated child."),new gs(G(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,t){this.source=e,this.path=t,this.type=De.LISTEN_COMPLETE}operationForChild(e){return F(this.path)?new li(this.source,j()):new li(this.source,G(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=De.OVERWRITE}operationForChild(e){return F(this.path)?new qt(this.source,j(),this.snap.getImmediateChild(e)):new qt(this.source,G(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=De.MERGE}operationForChild(e){if(F(this.path)){const t=this.children.subtree(new $(e));return t.isEmpty()?null:t.value?new qt(this.source,j(),t.value):new hi(this.source,j(),t)}else return b(L(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new hi(this.source,G(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(F(e))return this.isFullyInitialized()&&!this.filtered_;const t=L(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sw{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function bw(n,e,t,i){const s=[],o=[];return e.forEach(a=>{a.type==="child_changed"&&n.index_.indexedValueChanged(a.oldSnap,a.snapshotNode)&&o.push(_w(a.childName,a.snapshotNode))}),$n(n,s,"child_removed",e,i,t),$n(n,s,"child_added",e,i,t),$n(n,s,"child_moved",o,i,t),$n(n,s,"child_changed",e,i,t),$n(n,s,"value",e,i,t),s}function $n(n,e,t,i,s,o){const a=i.filter(l=>l.type===t);a.sort((l,u)=>kw(n,l,u)),a.forEach(l=>{const u=Aw(n,l,o);s.forEach(d=>{d.respondsTo(l.type)&&e.push(d.createEvent(u,n.query_))})})}function Aw(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function kw(n,e,t){if(e.childName==null||t.childName==null)throw vn("Should only compare child_ events.");const i=new x(e.childName,e.snapshotNode),s=new x(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(n,e){return{eventCache:n,serverCache:e}}function Qn(n,e,t,i){return Os(new Tt(e,t,i),n.serverCache)}function rd(n,e,t,i){return Os(n.eventCache,new Tt(e,t,i))}function _s(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function zt(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rr;const Rw=()=>(Rr||(Rr=new ve(pv)),Rr);class z{static fromObject(e){let t=new z(null);return Ee(e,(i,s)=>{t=t.set(new $(i),s)}),t}constructor(e,t=Rw()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:j(),value:this.value};if(F(e))return null;{const i=L(e),s=this.children.get(i);if(s!==null){const o=s.findRootMostMatchingPathAndValue(G(e),t);return o!=null?{path:ee(new $(i),o.path),value:o.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(F(e))return this;{const t=L(e),i=this.children.get(t);return i!==null?i.subtree(G(e)):new z(null)}}set(e,t){if(F(e))return new z(t,this.children);{const i=L(e),o=(this.children.get(i)||new z(null)).set(G(e),t),a=this.children.insert(i,o);return new z(this.value,a)}}remove(e){if(F(e))return this.children.isEmpty()?new z(null):new z(null,this.children);{const t=L(e),i=this.children.get(t);if(i){const s=i.remove(G(e));let o;return s.isEmpty()?o=this.children.remove(t):o=this.children.insert(t,s),this.value===null&&o.isEmpty()?new z(null):new z(this.value,o)}else return this}}get(e){if(F(e))return this.value;{const t=L(e),i=this.children.get(t);return i?i.get(G(e)):null}}setTree(e,t){if(F(e))return t;{const i=L(e),o=(this.children.get(i)||new z(null)).setTree(G(e),t);let a;return o.isEmpty()?a=this.children.remove(i):a=this.children.insert(i,o),new z(this.value,a)}}fold(e){return this.fold_(j(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,o)=>{i[s]=o.fold_(ee(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,j(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(F(e))return null;{const o=L(e),a=this.children.get(o);return a?a.findOnPath_(G(e),ee(t,o),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,j(),t)}foreachOnPath_(e,t,i){if(F(e))return this;{this.value&&i(t,this.value);const s=L(e),o=this.children.get(s);return o?o.foreachOnPath_(G(e),ee(t,s),i):new z(null)}}foreach(e){this.foreach_(j(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(ee(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e){this.writeTree_=e}static empty(){return new Me(new z(null))}}function Zn(n,e,t){if(F(e))return new Me(new z(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let o=i.value;const a=ge(s,e);return o=o.updateChild(a,t),new Me(n.writeTree_.set(s,o))}else{const s=new z(t),o=n.writeTree_.setTree(e,s);return new Me(o)}}}function Dl(n,e,t){let i=n;return Ee(t,(s,o)=>{i=Zn(i,ee(e,s),o)}),i}function Ml(n,e){if(F(e))return Me.empty();{const t=n.writeTree_.setTree(e,new z(null));return new Me(t)}}function Jr(n,e){return Jt(n,e)!=null}function Jt(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(ge(t.path,e)):null}function Ll(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(K,(i,s)=>{e.push(new x(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new x(i,s.value))}),e}function vt(n,e){if(F(e))return n;{const t=Jt(n,e);return t!=null?new Me(new z(t)):new Me(n.writeTree_.subtree(e))}}function Xr(n){return n.writeTree_.isEmpty()}function mn(n,e){return od(j(),n.writeTree_,e)}function od(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,o)=>{s===".priority"?(b(o.value!==null,"Priority writes must always be leaf nodes"),i=o.value):t=od(ee(n,s),o,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(ee(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ds(n,e){return hd(e,n)}function Nw(n,e,t,i,s){b(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Zn(n.visibleWrites,e,t)),n.lastWriteId=i}function Pw(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Ow(n,e){const t=n.allWrites.findIndex(l=>l.writeId===e);b(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,o=!1,a=n.allWrites.length-1;for(;s&&a>=0;){const l=n.allWrites[a];l.visible&&(a>=t&&Dw(l,i.path)?s=!1:Oe(i.path,l.path)&&(o=!0)),a--}if(s){if(o)return Mw(n),!0;if(i.snap)n.visibleWrites=Ml(n.visibleWrites,i.path);else{const l=i.children;Ee(l,u=>{n.visibleWrites=Ml(n.visibleWrites,ee(i.path,u))})}return!0}else return!1}function Dw(n,e){if(n.snap)return Oe(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Oe(ee(n.path,t),e))return!0;return!1}function Mw(n){n.visibleWrites=ad(n.allWrites,Lw,j()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Lw(n){return n.visible}function ad(n,e,t){let i=Me.empty();for(let s=0;s<n.length;++s){const o=n[s];if(e(o)){const a=o.path;let l;if(o.snap)Oe(t,a)?(l=ge(t,a),i=Zn(i,l,o.snap)):Oe(a,t)&&(l=ge(a,t),i=Zn(i,j(),o.snap.getChild(l)));else if(o.children){if(Oe(t,a))l=ge(t,a),i=Dl(i,l,o.children);else if(Oe(a,t))if(l=ge(a,t),F(l))i=Dl(i,j(),o.children);else{const u=dn(o.children,L(l));if(u){const d=u.getChild(G(l));i=Zn(i,j(),d)}}}else throw vn("WriteRecord should have .snap or .children")}}return i}function cd(n,e,t,i,s){if(!i&&!s){const o=Jt(n.visibleWrites,e);if(o!=null)return o;{const a=vt(n.visibleWrites,e);if(Xr(a))return t;if(t==null&&!Jr(a,j()))return null;{const l=t||N.EMPTY_NODE;return mn(a,l)}}}else{const o=vt(n.visibleWrites,e);if(!s&&Xr(o))return t;if(!s&&t==null&&!Jr(o,j()))return null;{const a=function(d){return(d.visible||s)&&(!i||!~i.indexOf(d.writeId))&&(Oe(d.path,e)||Oe(e,d.path))},l=ad(n.allWrites,a,e),u=t||N.EMPTY_NODE;return mn(l,u)}}}function xw(n,e,t){let i=N.EMPTY_NODE;const s=Jt(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(K,(o,a)=>{i=i.updateImmediateChild(o,a)}),i;if(t){const o=vt(n.visibleWrites,e);return t.forEachChild(K,(a,l)=>{const u=mn(vt(o,new $(a)),l);i=i.updateImmediateChild(a,u)}),Ll(o).forEach(a=>{i=i.updateImmediateChild(a.name,a.node)}),i}else{const o=vt(n.visibleWrites,e);return Ll(o).forEach(a=>{i=i.updateImmediateChild(a.name,a.node)}),i}}function Fw(n,e,t,i,s){b(i||s,"Either existingEventSnap or existingServerSnap must exist");const o=ee(e,t);if(Jr(n.visibleWrites,o))return null;{const a=vt(n.visibleWrites,o);return Xr(a)?s.getChild(t):mn(a,s.getChild(t))}}function Uw(n,e,t,i){const s=ee(e,t),o=Jt(n.visibleWrites,s);if(o!=null)return o;if(i.isCompleteForChild(t)){const a=vt(n.visibleWrites,s);return mn(a,i.getNode().getImmediateChild(t))}else return null}function Vw(n,e){return Jt(n.visibleWrites,e)}function Bw(n,e,t,i,s,o,a){let l;const u=vt(n.visibleWrites,e),d=Jt(u,j());if(d!=null)l=d;else if(t!=null)l=mn(u,t);else return[];if(l=l.withIndex(a),!l.isEmpty()&&!l.isLeafNode()){const y=[],_=a.getCompare(),v=o?l.getReverseIteratorFrom(i,a):l.getIteratorFrom(i,a);let A=v.getNext();for(;A&&y.length<s;)_(A,i)!==0&&y.push(A),A=v.getNext();return y}else return[]}function jw(){return{visibleWrites:Me.empty(),allWrites:[],lastWriteId:-1}}function ms(n,e,t,i){return cd(n.writeTree,n.treePath,e,t,i)}function $o(n,e){return xw(n.writeTree,n.treePath,e)}function xl(n,e,t,i){return Fw(n.writeTree,n.treePath,e,t,i)}function ys(n,e){return Vw(n.writeTree,ee(n.treePath,e))}function Ww(n,e,t,i,s,o){return Bw(n.writeTree,n.treePath,e,t,i,s,o)}function Go(n,e,t){return Uw(n.writeTree,n.treePath,e,t)}function ld(n,e){return hd(ee(n.treePath,e),n.writeTree)}function hd(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;b(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),b(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const o=s.type;if(t==="child_added"&&o==="child_removed")this.changeMap.set(i,ai(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&o==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&o==="child_changed")this.changeMap.set(i,oi(i,s.oldSnap));else if(t==="child_changed"&&o==="child_added")this.changeMap.set(i,_n(i,e.snapshotNode));else if(t==="child_changed"&&o==="child_changed")this.changeMap.set(i,ai(i,e.snapshotNode,s.oldSnap));else throw vn("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $w{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const ud=new $w;class qo{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Tt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Go(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:zt(this.viewCache_),o=Ww(this.writes_,s,t,1,i,e);return o.length===0?null:o[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gw(n){return{filter:n}}function qw(n,e){b(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),b(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function zw(n,e,t,i,s){const o=new Hw;let a,l;if(t.type===De.OVERWRITE){const d=t;d.source.fromUser?a=Qr(n,e,d.path,d.snap,i,s,o):(b(d.source.fromServer,"Unknown source."),l=d.source.tagged||e.serverCache.isFiltered()&&!F(d.path),a=vs(n,e,d.path,d.snap,i,s,l,o))}else if(t.type===De.MERGE){const d=t;d.source.fromUser?a=Yw(n,e,d.path,d.children,i,s,o):(b(d.source.fromServer,"Unknown source."),l=d.source.tagged||e.serverCache.isFiltered(),a=Zr(n,e,d.path,d.children,i,s,l,o))}else if(t.type===De.ACK_USER_WRITE){const d=t;d.revert?a=Qw(n,e,d.path,i,s,o):a=Jw(n,e,d.path,d.affectedTree,i,s,o)}else if(t.type===De.LISTEN_COMPLETE)a=Xw(n,e,t.path,i,o);else throw vn("Unknown operation type: "+t.type);const u=o.getChanges();return Kw(e,a,u),{viewCache:a,changes:u}}function Kw(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),o=_s(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(o)||!i.getNode().getPriority().equals(o.getPriority()))&&t.push(nd(_s(e)))}}function dd(n,e,t,i,s,o){const a=e.eventCache;if(ys(i,t)!=null)return e;{let l,u;if(F(t))if(b(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const d=zt(e),y=d instanceof N?d:N.EMPTY_NODE,_=$o(i,y);l=n.filter.updateFullNode(e.eventCache.getNode(),_,o)}else{const d=ms(i,zt(e));l=n.filter.updateFullNode(e.eventCache.getNode(),d,o)}else{const d=L(t);if(d===".priority"){b(Et(t)===1,"Can't have a priority with additional path components");const y=a.getNode();u=e.serverCache.getNode();const _=xl(i,t,y,u);_!=null?l=n.filter.updatePriority(y,_):l=a.getNode()}else{const y=G(t);let _;if(a.isCompleteForChild(d)){u=e.serverCache.getNode();const v=xl(i,t,a.getNode(),u);v!=null?_=a.getNode().getImmediateChild(d).updateChild(y,v):_=a.getNode().getImmediateChild(d)}else _=Go(i,d,e.serverCache);_!=null?l=n.filter.updateChild(a.getNode(),d,_,y,s,o):l=a.getNode()}}return Qn(e,l,a.isFullyInitialized()||F(t),n.filter.filtersNodes())}}function vs(n,e,t,i,s,o,a,l){const u=e.serverCache;let d;const y=a?n.filter:n.filter.getIndexedFilter();if(F(t))d=y.updateFullNode(u.getNode(),i,null);else if(y.filtersNodes()&&!u.isFiltered()){const A=u.getNode().updateChild(t,i);d=y.updateFullNode(u.getNode(),A,null)}else{const A=L(t);if(!u.isCompleteForPath(t)&&Et(t)>1)return e;const R=G(t),D=u.getNode().getImmediateChild(A).updateChild(R,i);A===".priority"?d=y.updatePriority(u.getNode(),D):d=y.updateChild(u.getNode(),A,D,R,ud,null)}const _=rd(e,d,u.isFullyInitialized()||F(t),y.filtersNodes()),v=new qo(s,_,o);return dd(n,_,t,s,v,l)}function Qr(n,e,t,i,s,o,a){const l=e.eventCache;let u,d;const y=new qo(s,e,o);if(F(t))d=n.filter.updateFullNode(e.eventCache.getNode(),i,a),u=Qn(e,d,!0,n.filter.filtersNodes());else{const _=L(t);if(_===".priority")d=n.filter.updatePriority(e.eventCache.getNode(),i),u=Qn(e,d,l.isFullyInitialized(),l.isFiltered());else{const v=G(t),A=l.getNode().getImmediateChild(_);let R;if(F(v))R=i;else{const P=y.getCompleteChild(_);P!=null?zu(v)===".priority"&&P.getChild(Yu(v)).isEmpty()?R=P:R=P.updateChild(v,i):R=N.EMPTY_NODE}if(A.equals(R))u=e;else{const P=n.filter.updateChild(l.getNode(),_,R,v,y,a);u=Qn(e,P,l.isFullyInitialized(),n.filter.filtersNodes())}}}return u}function Fl(n,e){return n.eventCache.isCompleteForChild(e)}function Yw(n,e,t,i,s,o,a){let l=e;return i.foreach((u,d)=>{const y=ee(t,u);Fl(e,L(y))&&(l=Qr(n,l,y,d,s,o,a))}),i.foreach((u,d)=>{const y=ee(t,u);Fl(e,L(y))||(l=Qr(n,l,y,d,s,o,a))}),l}function Ul(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Zr(n,e,t,i,s,o,a,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let u=e,d;F(t)?d=i:d=new z(null).setTree(t,i);const y=e.serverCache.getNode();return d.children.inorderTraversal((_,v)=>{if(y.hasChild(_)){const A=e.serverCache.getNode().getImmediateChild(_),R=Ul(n,A,v);u=vs(n,u,new $(_),R,s,o,a,l)}}),d.children.inorderTraversal((_,v)=>{const A=!e.serverCache.isCompleteForChild(_)&&v.value===null;if(!y.hasChild(_)&&!A){const R=e.serverCache.getNode().getImmediateChild(_),P=Ul(n,R,v);u=vs(n,u,new $(_),P,s,o,a,l)}}),u}function Jw(n,e,t,i,s,o,a){if(ys(s,t)!=null)return e;const l=e.serverCache.isFiltered(),u=e.serverCache;if(i.value!=null){if(F(t)&&u.isFullyInitialized()||u.isCompleteForPath(t))return vs(n,e,t,u.getNode().getChild(t),s,o,l,a);if(F(t)){let d=new z(null);return u.getNode().forEachChild(un,(y,_)=>{d=d.set(new $(y),_)}),Zr(n,e,t,d,s,o,l,a)}else return e}else{let d=new z(null);return i.foreach((y,_)=>{const v=ee(t,y);u.isCompleteForPath(v)&&(d=d.set(y,u.getNode().getChild(v)))}),Zr(n,e,t,d,s,o,l,a)}}function Xw(n,e,t,i,s){const o=e.serverCache,a=rd(e,o.getNode(),o.isFullyInitialized()||F(t),o.isFiltered());return dd(n,a,t,i,ud,s)}function Qw(n,e,t,i,s,o){let a;if(ys(i,t)!=null)return e;{const l=new qo(i,e,s),u=e.eventCache.getNode();let d;if(F(t)||L(t)===".priority"){let y;if(e.serverCache.isFullyInitialized())y=ms(i,zt(e));else{const _=e.serverCache.getNode();b(_ instanceof N,"serverChildren would be complete if leaf node"),y=$o(i,_)}y=y,d=n.filter.updateFullNode(u,y,o)}else{const y=L(t);let _=Go(i,y,e.serverCache);_==null&&e.serverCache.isCompleteForChild(y)&&(_=u.getImmediateChild(y)),_!=null?d=n.filter.updateChild(u,y,_,G(t),l,o):e.eventCache.getNode().hasChild(y)?d=n.filter.updateChild(u,y,N.EMPTY_NODE,G(t),l,o):d=u,d.isEmpty()&&e.serverCache.isFullyInitialized()&&(a=ms(i,zt(e)),a.isLeafNode()&&(d=n.filter.updateFullNode(d,a,o)))}return a=e.serverCache.isFullyInitialized()||ys(i,j())!=null,Qn(e,d,a,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zw{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Bo(i.getIndex()),o=yw(i);this.processor_=Gw(o);const a=t.serverCache,l=t.eventCache,u=s.updateFullNode(N.EMPTY_NODE,a.getNode(),null),d=o.updateFullNode(N.EMPTY_NODE,l.getNode(),null),y=new Tt(u,a.isFullyInitialized(),s.filtersNodes()),_=new Tt(d,l.isFullyInitialized(),o.filtersNodes());this.viewCache_=Os(_,y),this.eventGenerator_=new Sw(this.query_)}get query(){return this.query_}}function eI(n){return n.viewCache_.serverCache.getNode()}function tI(n){return _s(n.viewCache_)}function nI(n,e){const t=zt(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!F(e)&&!t.getImmediateChild(L(e)).isEmpty())?t.getChild(e):null}function Vl(n){return n.eventRegistrations_.length===0}function iI(n,e){n.eventRegistrations_.push(e)}function Bl(n,e,t){const i=[];if(t){b(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(o=>{const a=o.createCancelEvent(t,s);a&&i.push(a)})}if(e){let s=[];for(let o=0;o<n.eventRegistrations_.length;++o){const a=n.eventRegistrations_[o];if(!a.matches(e))s.push(a);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(o+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function jl(n,e,t,i){e.type===De.MERGE&&e.source.queryId!==null&&(b(zt(n.viewCache_),"We should always have a full cache before handling merges"),b(_s(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,o=zw(n.processor_,s,e,t,i);return qw(n.processor_,o.viewCache),b(o.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=o.viewCache,fd(n,o.changes,o.viewCache.eventCache.getNode(),null)}function sI(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(K,(o,a)=>{i.push(_n(o,a))}),t.isFullyInitialized()&&i.push(nd(t.getNode())),fd(n,i,t.getNode(),e)}function fd(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return bw(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ws;class pd{constructor(){this.views=new Map}}function rI(n){b(!ws,"__referenceConstructor has already been defined"),ws=n}function oI(){return b(ws,"Reference.ts has not been loaded"),ws}function aI(n){return n.views.size===0}function zo(n,e,t,i){const s=e.source.queryId;if(s!==null){const o=n.views.get(s);return b(o!=null,"SyncTree gave us an op for an invalid query."),jl(o,e,t,i)}else{let o=[];for(const a of n.views.values())o=o.concat(jl(a,e,t,i));return o}}function gd(n,e,t,i,s){const o=e._queryIdentifier,a=n.views.get(o);if(!a){let l=ms(t,s?i:null),u=!1;l?u=!0:i instanceof N?(l=$o(t,i),u=!1):(l=N.EMPTY_NODE,u=!1);const d=Os(new Tt(l,u,!1),new Tt(i,s,!1));return new Zw(e,d)}return a}function cI(n,e,t,i,s,o){const a=gd(n,e,i,s,o);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,a),iI(a,t),sI(a,t)}function lI(n,e,t,i){const s=e._queryIdentifier,o=[];let a=[];const l=Ct(n);if(s==="default")for(const[u,d]of n.views.entries())a=a.concat(Bl(d,t,i)),Vl(d)&&(n.views.delete(u),d.query._queryParams.loadsAllData()||o.push(d.query));else{const u=n.views.get(s);u&&(a=a.concat(Bl(u,t,i)),Vl(u)&&(n.views.delete(s),u.query._queryParams.loadsAllData()||o.push(u.query)))}return l&&!Ct(n)&&o.push(new(oI())(e._repo,e._path)),{removed:o,events:a}}function _d(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function wt(n,e){let t=null;for(const i of n.views.values())t=t||nI(i,e);return t}function md(n,e){if(e._queryParams.loadsAllData())return Ms(n);{const i=e._queryIdentifier;return n.views.get(i)}}function yd(n,e){return md(n,e)!=null}function Ct(n){return Ms(n)!=null}function Ms(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Is;function hI(n){b(!Is,"__referenceConstructor has already been defined"),Is=n}function uI(){return b(Is,"Reference.ts has not been loaded"),Is}let dI=1;class Wl{constructor(e){this.listenProvider_=e,this.syncPointTree_=new z(null),this.pendingWriteTree_=jw(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function vd(n,e,t,i,s){return Nw(n.pendingWriteTree_,e,t,i,s),s?Si(n,new qt(sd(),e,t)):[]}function Ft(n,e,t=!1){const i=Pw(n.pendingWriteTree_,e);if(Ow(n.pendingWriteTree_,e)){let o=new z(null);return i.snap!=null?o=o.set(j(),!0):Ee(i.children,a=>{o=o.set(new $(a),!0)}),Si(n,new gs(i.path,o,t))}else return[]}function Ci(n,e,t){return Si(n,new qt(Wo(),e,t))}function fI(n,e,t){const i=z.fromObject(t);return Si(n,new hi(Wo(),e,i))}function pI(n,e){return Si(n,new li(Wo(),e))}function gI(n,e,t){const i=Yo(n,t);if(i){const s=Jo(i),o=s.path,a=s.queryId,l=ge(o,e),u=new li(Ho(a),l);return Xo(n,o,u)}else return[]}function Es(n,e,t,i,s=!1){const o=e._path,a=n.syncPointTree_.get(o);let l=[];if(a&&(e._queryIdentifier==="default"||yd(a,e))){const u=lI(a,e,t,i);aI(a)&&(n.syncPointTree_=n.syncPointTree_.remove(o));const d=u.removed;if(l=u.events,!s){const y=d.findIndex(v=>v._queryParams.loadsAllData())!==-1,_=n.syncPointTree_.findOnPath(o,(v,A)=>Ct(A));if(y&&!_){const v=n.syncPointTree_.subtree(o);if(!v.isEmpty()){const A=yI(v);for(let R=0;R<A.length;++R){const P=A[R],D=P.query,J=Td(n,P);n.listenProvider_.startListening(ei(D),ui(n,D),J.hashFn,J.onComplete)}}}!_&&d.length>0&&!i&&(y?n.listenProvider_.stopListening(ei(e),null):d.forEach(v=>{const A=n.queryToTagMap.get(Ls(v));n.listenProvider_.stopListening(ei(v),A)}))}vI(n,d)}return l}function wd(n,e,t,i){const s=Yo(n,i);if(s!=null){const o=Jo(s),a=o.path,l=o.queryId,u=ge(a,e),d=new qt(Ho(l),u,t);return Xo(n,a,d)}else return[]}function _I(n,e,t,i){const s=Yo(n,i);if(s){const o=Jo(s),a=o.path,l=o.queryId,u=ge(a,e),d=z.fromObject(t),y=new hi(Ho(l),u,d);return Xo(n,a,y)}else return[]}function eo(n,e,t,i=!1){const s=e._path;let o=null,a=!1;n.syncPointTree_.foreachOnPath(s,(v,A)=>{const R=ge(v,s);o=o||wt(A,R),a=a||Ct(A)});let l=n.syncPointTree_.get(s);l?(a=a||Ct(l),o=o||wt(l,j())):(l=new pd,n.syncPointTree_=n.syncPointTree_.set(s,l));let u;o!=null?u=!0:(u=!1,o=N.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((A,R)=>{const P=wt(R,j());P&&(o=o.updateImmediateChild(A,P))}));const d=yd(l,e);if(!d&&!e._queryParams.loadsAllData()){const v=Ls(e);b(!n.queryToTagMap.has(v),"View does not exist, but we have a tag");const A=wI();n.queryToTagMap.set(v,A),n.tagToQueryMap.set(A,v)}const y=Ds(n.pendingWriteTree_,s);let _=cI(l,e,t,y,o,u);if(!d&&!a&&!i){const v=md(l,e);_=_.concat(II(n,e,v))}return _}function Ko(n,e,t){const s=n.pendingWriteTree_,o=n.syncPointTree_.findOnPath(e,(a,l)=>{const u=ge(a,e),d=wt(l,u);if(d)return d});return cd(s,e,o,t,!0)}function mI(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(d,y)=>{const _=ge(d,t);i=i||wt(y,_)});let s=n.syncPointTree_.get(t);s?i=i||wt(s,j()):(s=new pd,n.syncPointTree_=n.syncPointTree_.set(t,s));const o=i!=null,a=o?new Tt(i,!0,!1):null,l=Ds(n.pendingWriteTree_,e._path),u=gd(s,e,l,o?a.getNode():N.EMPTY_NODE,o);return tI(u)}function Si(n,e){return Id(e,n.syncPointTree_,null,Ds(n.pendingWriteTree_,j()))}function Id(n,e,t,i){if(F(n.path))return Ed(n,e,t,i);{const s=e.get(j());t==null&&s!=null&&(t=wt(s,j()));let o=[];const a=L(n.path),l=n.operationForChild(a),u=e.children.get(a);if(u&&l){const d=t?t.getImmediateChild(a):null,y=ld(i,a);o=o.concat(Id(l,u,d,y))}return s&&(o=o.concat(zo(s,n,i,t))),o}}function Ed(n,e,t,i){const s=e.get(j());t==null&&s!=null&&(t=wt(s,j()));let o=[];return e.children.inorderTraversal((a,l)=>{const u=t?t.getImmediateChild(a):null,d=ld(i,a),y=n.operationForChild(a);y&&(o=o.concat(Ed(y,l,u,d)))}),s&&(o=o.concat(zo(s,n,i,t))),o}function Td(n,e){const t=e.query,i=ui(n,t);return{hashFn:()=>(eI(e)||N.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?gI(n,t._path,i):pI(n,t._path);{const o=mv(s,t);return Es(n,t,null,o)}}}}function ui(n,e){const t=Ls(e);return n.queryToTagMap.get(t)}function Ls(n){return n._path.toString()+"$"+n._queryIdentifier}function Yo(n,e){return n.tagToQueryMap.get(e)}function Jo(n){const e=n.indexOf("$");return b(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new $(n.substr(0,e))}}function Xo(n,e,t){const i=n.syncPointTree_.get(e);b(i,"Missing sync point for query tag that we're tracking");const s=Ds(n.pendingWriteTree_,e);return zo(i,t,s,null)}function yI(n){return n.fold((e,t,i)=>{if(t&&Ct(t))return[Ms(t)];{let s=[];return t&&(s=_d(t)),Ee(i,(o,a)=>{s=s.concat(a)}),s}})}function ei(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(uI())(n._repo,n._path):n}function vI(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Ls(i),o=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(o)}}}function wI(){return dI++}function II(n,e,t){const i=e._path,s=ui(n,e),o=Td(n,t),a=n.listenProvider_.startListening(ei(e),s,o.hashFn,o.onComplete),l=n.syncPointTree_.subtree(i);if(s)b(!Ct(l.value),"If we're adding a query, it shouldn't be shadowed");else{const u=l.fold((d,y,_)=>{if(!F(d)&&y&&Ct(y))return[Ms(y).query];{let v=[];return y&&(v=v.concat(_d(y).map(A=>A.query))),Ee(_,(A,R)=>{v=v.concat(R)}),v}});for(let d=0;d<u.length;++d){const y=u[d];n.listenProvider_.stopListening(ei(y),ui(n,y))}}return a}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Qo(t)}node(){return this.node_}}class Zo{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=ee(this.path_,e);return new Zo(this.syncTree_,t)}node(){return Ko(this.syncTree_,this.path_)}}const EI=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Hl=function(n,e,t){if(!n||typeof n!="object")return n;if(b(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return TI(n[".sv"],e,t);if(typeof n[".sv"]=="object")return CI(n[".sv"],e);b(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},TI=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:b(!1,"Unexpected server value: "+n)}},CI=function(n,e,t){n.hasOwnProperty("increment")||b(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&b(!1,"Unexpected increment value: "+i);const s=e.node();if(b(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const a=s.getValue();return typeof a!="number"?i:a+i},SI=function(n,e,t,i){return ea(e,new Zo(t,n),i)},Cd=function(n,e,t){return ea(n,new Qo(e),t)};function ea(n,e,t){const i=n.getPriority().val(),s=Hl(i,e.getImmediateChild(".priority"),t);let o;if(n.isLeafNode()){const a=n,l=Hl(a.getValue(),e,t);return l!==a.getValue()||s!==a.getPriority().val()?new ie(l,re(s)):n}else{const a=n;return o=a,s!==a.getPriority().val()&&(o=o.updatePriority(new ie(s))),a.forEachChild(K,(l,u)=>{const d=ea(u,e.getImmediateChild(l),t);d!==u&&(o=o.updateImmediateChild(l,d))}),o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function na(n,e){let t=e instanceof $?e:new $(e),i=n,s=L(t);for(;s!==null;){const o=dn(i.node.children,s)||{children:{},childCount:0};i=new ta(s,i,o),t=G(t),s=L(t)}return i}function Cn(n){return n.node.value}function Sd(n,e){n.node.value=e,to(n)}function bd(n){return n.node.childCount>0}function bI(n){return Cn(n)===void 0&&!bd(n)}function xs(n,e){Ee(n.node.children,(t,i)=>{e(new ta(t,n,i))})}function Ad(n,e,t,i){t&&e(n),xs(n,s=>{Ad(s,e,!0)})}function AI(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function bi(n){return new $(n.parent===null?n.name:bi(n.parent)+"/"+n.name)}function to(n){n.parent!==null&&kI(n.parent,n.name,n)}function kI(n,e,t){const i=bI(t),s=st(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,to(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,to(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RI=/[\[\].#$\/\u0000-\u001F\u007F]/,NI=/[\[\].#$\u0000-\u001F\u007F]/,Nr=10*1024*1024,kd=function(n){return typeof n=="string"&&n.length!==0&&!RI.test(n)},Rd=function(n){return typeof n=="string"&&n.length!==0&&!NI.test(n)},PI=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Rd(n)},OI=function(n,e,t,i){ia(ho(n,"value"),e,t)},ia=function(n,e,t){const i=t instanceof $?new Jv(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Ot(i));if(typeof e=="function")throw new Error(n+"contains a function "+Ot(i)+" with contents = "+e.toString());if(bu(e))throw new Error(n+"contains "+e.toString()+" "+Ot(i));if(typeof e=="string"&&e.length>Nr/3&&Ss(e)>Nr)throw new Error(n+"contains a string greater than "+Nr+" utf8 bytes "+Ot(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,o=!1;if(Ee(e,(a,l)=>{if(a===".value")s=!0;else if(a!==".priority"&&a!==".sv"&&(o=!0,!kd(a)))throw new Error(n+" contains an invalid key ("+a+") "+Ot(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Xv(i,a),ia(n,l,i),Qv(i)}),s&&o)throw new Error(n+' contains ".value" child '+Ot(i)+" in addition to actual children.")}},Nd=function(n,e,t,i){if(!Rd(t))throw new Error(ho(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},DI=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Nd(n,e,t)},MI=function(n,e){if(L(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},LI=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!kd(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!PI(t))throw new Error(ho(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function sa(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],o=s.getPath();t!==null&&!Fo(o,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:o}),t.events.push(s)}t&&n.eventLists_.push(t)}function Pd(n,e,t){sa(n,t),Od(n,i=>Fo(i,e))}function $e(n,e,t){sa(n,t),Od(n,i=>Oe(i,e)||Oe(e,i))}function Od(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const o=s.path;e(o)?(FI(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function FI(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Jn&&le("event: "+t.toString()),Tn(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UI="repo_interrupt",VI=25;class BI{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new xI,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=ps(),this.transactionQueueTree_=new ta,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function jI(n,e,t){if(n.stats_=Lo(n.repoInfo_),n.forceRestClient_||Iv())n.server_=new fs(n.repoInfo_,(i,s,o,a)=>{$l(n,i,s,o,a)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Gl(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Z(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Qe(n.repoInfo_,e,(i,s,o,a)=>{$l(n,i,s,o,a)},i=>{Gl(n,i)},i=>{HI(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=bv(n.repoInfo_,()=>new Cw(n.stats_,n.server_)),n.infoData_=new vw,n.infoSyncTree_=new Wl({startListening:(i,s,o,a)=>{let l=[];const u=n.infoData_.getNode(i._path);return u.isEmpty()||(l=Ci(n.infoSyncTree_,i._path,u),setTimeout(()=>{a("ok")},0)),l},stopListening:()=>{}}),oa(n,"connected",!1),n.serverSyncTree_=new Wl({startListening:(i,s,o,a)=>(n.server_.listen(i,o,s,(l,u)=>{const d=a(l,u);$e(n.eventQueue_,i._path,d)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function WI(n){const t=n.infoData_.getNode(new $(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function ra(n){return EI({timestamp:WI(n)})}function $l(n,e,t,i,s){n.dataUpdateCount++;const o=new $(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let a=[];if(s)if(i){const u=Zi(t,d=>re(d));a=_I(n.serverSyncTree_,o,u,s)}else{const u=re(t);a=wd(n.serverSyncTree_,o,u,s)}else if(i){const u=Zi(t,d=>re(d));a=fI(n.serverSyncTree_,o,u)}else{const u=re(t);a=Ci(n.serverSyncTree_,o,u)}let l=o;a.length>0&&(l=Us(n,o)),$e(n.eventQueue_,l,a)}function Gl(n,e){oa(n,"connected",e),e===!1&&qI(n)}function HI(n,e){Ee(e,(t,i)=>{oa(n,t,i)})}function oa(n,e,t){const i=new $("/.info/"+e),s=re(t);n.infoData_.updateSnapshot(i,s);const o=Ci(n.infoSyncTree_,i,s);$e(n.eventQueue_,i,o)}function Dd(n){return n.nextWriteId_++}function $I(n,e,t){const i=mI(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const o=re(s).withIndex(e._queryParams.getIndex());eo(n.serverSyncTree_,e,t,!0);let a;if(e._queryParams.loadsAllData())a=Ci(n.serverSyncTree_,e._path,o);else{const l=ui(n.serverSyncTree_,e);a=wd(n.serverSyncTree_,e._path,o,l)}return $e(n.eventQueue_,e._path,a),Es(n.serverSyncTree_,e,t,null,!0),o},s=>(Fs(n,"get for query "+Z(e)+" failed: "+s),Promise.reject(new Error(s))))}function GI(n,e,t,i,s){Fs(n,"set",{path:e.toString(),value:t,priority:i});const o=ra(n),a=re(t,i),l=Ko(n.serverSyncTree_,e),u=Cd(a,l,o),d=Dd(n),y=vd(n.serverSyncTree_,e,u,d,!0);sa(n.eventQueue_,y),n.server_.put(e.toString(),a.val(!0),(v,A)=>{const R=v==="ok";R||we("set at "+e+" failed: "+v);const P=Ft(n.serverSyncTree_,d,!R);$e(n.eventQueue_,e,P),YI(n,s,v,A)});const _=Vd(n,e);Us(n,_),$e(n.eventQueue_,_,[])}function qI(n){Fs(n,"onDisconnectEvents");const e=ra(n),t=ps();Yr(n.onDisconnect_,j(),(s,o)=>{const a=SI(s,o,n.serverSyncTree_,e);id(t,s,a)});let i=[];Yr(t,j(),(s,o)=>{i=i.concat(Ci(n.serverSyncTree_,s,o));const a=Vd(n,s);Us(n,a)}),n.onDisconnect_=ps(),$e(n.eventQueue_,j(),i)}function zI(n,e,t){let i;L(e._path)===".info"?i=eo(n.infoSyncTree_,e,t):i=eo(n.serverSyncTree_,e,t),Pd(n.eventQueue_,e._path,i)}function Md(n,e,t){let i;L(e._path)===".info"?i=Es(n.infoSyncTree_,e,t):i=Es(n.serverSyncTree_,e,t),Pd(n.eventQueue_,e._path,i)}function KI(n){n.persistentConnection_&&n.persistentConnection_.interrupt(UI)}function Fs(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),le(t,...e)}function YI(n,e,t,i){e&&Tn(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let o=s;i&&(o+=": "+i);const a=new Error(o);a.code=s,e(a)}})}function Ld(n,e,t){return Ko(n.serverSyncTree_,e,t)||N.EMPTY_NODE}function aa(n,e=n.transactionQueueTree_){if(e||Vs(n,e),Cn(e)){const t=Fd(n,e);b(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&JI(n,bi(e),t)}else bd(e)&&xs(e,t=>{aa(n,t)})}function JI(n,e,t){const i=t.map(d=>d.currentWriteId),s=Ld(n,e,i);let o=s;const a=s.hash();for(let d=0;d<t.length;d++){const y=t[d];b(y.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),y.status=1,y.retryCount++;const _=ge(e,y.path);o=o.updateChild(_,y.currentOutputSnapshotRaw)}const l=o.val(!0),u=e;n.server_.put(u.toString(),l,d=>{Fs(n,"transaction put response",{path:u.toString(),status:d});let y=[];if(d==="ok"){const _=[];for(let v=0;v<t.length;v++)t[v].status=2,y=y.concat(Ft(n.serverSyncTree_,t[v].currentWriteId)),t[v].onComplete&&_.push(()=>t[v].onComplete(null,!0,t[v].currentOutputSnapshotResolved)),t[v].unwatcher();Vs(n,na(n.transactionQueueTree_,e)),aa(n,n.transactionQueueTree_),$e(n.eventQueue_,e,y);for(let v=0;v<_.length;v++)Tn(_[v])}else{if(d==="datastale")for(let _=0;_<t.length;_++)t[_].status===3?t[_].status=4:t[_].status=0;else{we("transaction at "+u.toString()+" failed: "+d);for(let _=0;_<t.length;_++)t[_].status=4,t[_].abortReason=d}Us(n,e)}},a)}function Us(n,e){const t=xd(n,e),i=bi(t),s=Fd(n,t);return XI(n,s,i),i}function XI(n,e,t){if(e.length===0)return;const i=[];let s=[];const a=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const u=e[l],d=ge(t,u.path);let y=!1,_;if(b(d!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)y=!0,_=u.abortReason,s=s.concat(Ft(n.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=VI)y=!0,_="maxretry",s=s.concat(Ft(n.serverSyncTree_,u.currentWriteId,!0));else{const v=Ld(n,u.path,a);u.currentInputSnapshot=v;const A=e[l].update(v.val());if(A!==void 0){ia("transaction failed: Data returned ",A,u.path);let R=re(A);typeof A=="object"&&A!=null&&st(A,".priority")||(R=R.updatePriority(v.getPriority()));const D=u.currentWriteId,J=ra(n),te=Cd(R,v,J);u.currentOutputSnapshotRaw=R,u.currentOutputSnapshotResolved=te,u.currentWriteId=Dd(n),a.splice(a.indexOf(D),1),s=s.concat(vd(n.serverSyncTree_,u.path,te,u.currentWriteId,u.applyLocally)),s=s.concat(Ft(n.serverSyncTree_,D,!0))}else y=!0,_="nodata",s=s.concat(Ft(n.serverSyncTree_,u.currentWriteId,!0))}$e(n.eventQueue_,t,s),s=[],y&&(e[l].status=2,(function(v){setTimeout(v,Math.floor(0))})(e[l].unwatcher),e[l].onComplete&&(_==="nodata"?i.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):i.push(()=>e[l].onComplete(new Error(_),!1,null))))}Vs(n,n.transactionQueueTree_);for(let l=0;l<i.length;l++)Tn(i[l]);aa(n,n.transactionQueueTree_)}function xd(n,e){let t,i=n.transactionQueueTree_;for(t=L(e);t!==null&&Cn(i)===void 0;)i=na(i,t),e=G(e),t=L(e);return i}function Fd(n,e){const t=[];return Ud(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Ud(n,e,t){const i=Cn(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);xs(e,s=>{Ud(n,s,t)})}function Vs(n,e){const t=Cn(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Sd(e,t.length>0?t:void 0)}xs(e,i=>{Vs(n,i)})}function Vd(n,e){const t=bi(xd(n,e)),i=na(n.transactionQueueTree_,e);return AI(i,s=>{Pr(n,s)}),Pr(n,i),Ad(i,s=>{Pr(n,s)}),t}function Pr(n,e){const t=Cn(e);if(t){const i=[];let s=[],o=-1;for(let a=0;a<t.length;a++)t[a].status===3||(t[a].status===1?(b(o===a-1,"All SENT items should be at beginning of queue."),o=a,t[a].status=3,t[a].abortReason="set"):(b(t[a].status===0,"Unexpected transaction status in abort"),t[a].unwatcher(),s=s.concat(Ft(n.serverSyncTree_,t[a].currentWriteId,!0)),t[a].onComplete&&i.push(t[a].onComplete.bind(null,new Error("set"),!1,null))));o===-1?Sd(e,void 0):t.length=o+1,$e(n.eventQueue_,bi(e),s);for(let a=0;a<i.length;a++)Tn(i[a])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QI(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function ZI(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):we(`Invalid query segment '${t}' in query '${n}'`)}return e}const ql=function(n,e){const t=eE(n),i=t.namespace;t.domain==="firebase.com"&&it(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&it("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||dv();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Uu(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new $(t.pathString)}},eE=function(n){let e="",t="",i="",s="",o="",a=!0,l="https",u=443;if(typeof n=="string"){let d=n.indexOf("//");d>=0&&(l=n.substring(0,d-1),n=n.substring(d+2));let y=n.indexOf("/");y===-1&&(y=n.length);let _=n.indexOf("?");_===-1&&(_=n.length),e=n.substring(0,Math.min(y,_)),y<_&&(s=QI(n.substring(y,_)));const v=ZI(n.substring(Math.min(n.length,_)));d=e.indexOf(":"),d>=0?(a=l==="https"||l==="wss",u=parseInt(e.substring(d+1),10)):d=e.length;const A=e.slice(0,d);if(A.toLowerCase()==="localhost")t="localhost";else if(A.split(".").length<=2)t=A;else{const R=e.indexOf(".");i=e.substring(0,R).toLowerCase(),t=e.substring(R+1),o=i}"ns"in v&&(o=v.ns)}return{host:e,port:u,domain:t,subdomain:i,secure:a,scheme:l,pathString:s,namespace:o}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Z(this.snapshot.exportVal())}}class jd{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return b(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return F(this._path)?null:zu(this._path)}get ref(){return new Ge(this._repo,this._path)}get _queryIdentifier(){const e=Pl(this._queryParams),t=Do(e);return t==="{}"?"default":t}get _queryObject(){return Pl(this._queryParams)}isEqual(e){if(e=oe(e),!(e instanceof la))return!1;const t=this._repo===e._repo,i=Fo(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Yv(this._path)}}class Ge extends la{constructor(e,t){super(e,t,new jo,!1)}get parent(){const e=Yu(this._path);return e===null?null:new Ge(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class yn{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new $(e),i=Ts(this.ref,e);return new yn(this._node.getChild(t),i,K)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new yn(s,Ts(this.ref,i),K)))}hasChild(e){const t=new $(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function tT(n,e){return n=oe(n),n._checkNotDeleted("ref"),e!==void 0?Ts(n._root,e):n._root}function Ts(n,e){return n=oe(n),L(n._path)===null?DI("child","path",e):Nd("child","path",e),new Ge(n._repo,ee(n._path,e))}function nT(n,e){n=oe(n),MI("set",n._path),OI("set",e,n._path);const t=new Cs;return GI(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function iT(n){n=oe(n);const e=new ca(()=>{}),t=new Ai(e);return $I(n._repo,n,t).then(i=>new yn(i,new Ge(n._repo,n._path),n._queryParams.getIndex()))}class Ai{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Bd("value",this,new yn(e.snapshotNode,new Ge(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new jd(this,e,t):null}matches(e){return e instanceof Ai?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ha{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new jd(this,e,t):null}createEvent(e,t){b(e.childName!=null,"Child events should have a childName.");const i=Ts(new Ge(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new Bd(e.type,this,new yn(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ha?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function tE(n,e,t,i,s){const o=new ca(t,void 0),a=new Ai(o);return zI(n._repo,n,a),()=>Md(n._repo,n,a)}function sT(n,e,t,i){return tE(n,"value",e)}function rT(n,e,t){let i=null;const s=t?new ca(t):null;e==="value"?i=new Ai(s):e&&(i=new ha(e,s)),Md(n._repo,n,i)}rI(Ge);hI(Ge);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nE="FIREBASE_DATABASE_EMULATOR_HOST",no={};let iE=!1;function sE(n,e,t,i){const s=e.lastIndexOf(":"),o=e.substring(0,s),a=Kt(o);n.repoInfo_=new Uu(e,a,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function rE(n,e,t,i,s){let o=i||n.options.databaseURL;o===void 0&&(n.options.projectId||it("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),le("Using default host for project ",n.options.projectId),o=`${n.options.projectId}-default-rtdb.firebaseio.com`);let a=ql(o,s),l=a.repoInfo,u;typeof process<"u"&&fl&&(u=fl[nE]),u?(o=`http://${u}?ns=${l.namespace}`,a=ql(o,s),l=a.repoInfo):a.repoInfo.secure;const d=new Tv(n.name,n.options,e);LI("Invalid Firebase Database URL",a),F(a.path)||it("Database URL must point to the root of a Firebase Database (not including a child path).");const y=aE(l,n,d,new Ev(n,t));return new cE(y,n)}function oE(n,e){const t=no[e];(!t||t[n.key]!==n)&&it(`Database ${e}(${n.repoInfo_}) has already been deleted.`),KI(n),delete t[n.key]}function aE(n,e,t,i){let s=no[e.name];s||(s={},no[e.name]=s);let o=s[n.toURLString()];return o&&it("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),o=new BI(n,iE,t,i),s[n.toURLString()]=o,o}class cE{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(jI(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Ge(this._repo,j())),this._rootInternal}_delete(){return this._rootInternal!==null&&(oE(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&it("Cannot call "+e+" on a deleted database.")}}function oT(n=gi(),e){const t=rt(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=rh("database");i&&lE(t,...i)}return t}function lE(n,e,t,i={}){n=oe(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,o=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Ze(i,o.repoInfo_.emulatorOptions))return;it("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let a;if(o.repoInfo_.nodeAdmin)i.mockUserToken&&it('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),a=new Ji(Ji.OWNER);else if(i.mockUserToken){const l=typeof i.mockUserToken=="string"?i.mockUserToken:ch(i.mockUserToken,n.app.options.projectId);a=new Ji(l)}Kt(e)&&(ro(e),oo("Database",!0)),sE(o,s,i,a)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hE(n){ov(Yt),Ce(new Ie("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal");return rE(i,s,o,t)},"PUBLIC").setMultipleInstances(!0)),he(pl,gl,n),he(pl,gl,"esm2020")}Qe.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Qe.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};hE();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uE="/firebase-messaging-sw.js",dE="/firebase-cloud-messaging-push-scope",Wd="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",fE="https://fcmregistrations.googleapis.com/v1",Hd="google.c.a.c_id",pE="google.c.a.c_l",gE="google.c.a.ts",_E="google.c.a.e",zl=1e4;var Kl;(function(n){n[n.DATA_MESSAGE=1]="DATA_MESSAGE",n[n.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Kl||(Kl={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var di;(function(n){n.PUSH_RECEIVED="push-received",n.NOTIFICATION_CLICKED="notification-clicked"})(di||(di={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qe(n){const e=new Uint8Array(n);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function mE(n){const e="=".repeat((4-n.length%4)%4),t=(n+e).replace(/\-/g,"+").replace(/_/g,"/"),i=atob(t),s=new Uint8Array(i.length);for(let o=0;o<i.length;++o)s[o]=i.charCodeAt(o);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or="fcm_token_details_db",yE=5,Yl="fcm_token_object_Store";async function vE(n){if("databases"in indexedDB&&!(await indexedDB.databases()).map(o=>o.name).includes(Or))return null;let e=null;return(await bs(Or,yE,{upgrade:async(i,s,o,a)=>{if(s<2||!i.objectStoreNames.contains(Yl))return;const l=a.objectStore(Yl),u=await l.index("fcmSenderId").get(n);if(await l.clear(),!!u){if(s===2){const d=u;if(!d.auth||!d.p256dh||!d.endpoint)return;e={token:d.fcmToken,createTime:d.createTime??Date.now(),subscriptionOptions:{auth:d.auth,p256dh:d.p256dh,endpoint:d.endpoint,swScope:d.swScope,vapidKey:typeof d.vapidKey=="string"?d.vapidKey:qe(d.vapidKey)}}}else if(s===3){const d=u;e={token:d.fcmToken,createTime:d.createTime,subscriptionOptions:{auth:qe(d.auth),p256dh:qe(d.p256dh),endpoint:d.endpoint,swScope:d.swScope,vapidKey:qe(d.vapidKey)}}}else if(s===4){const d=u;e={token:d.fcmToken,createTime:d.createTime,subscriptionOptions:{auth:qe(d.auth),p256dh:qe(d.p256dh),endpoint:d.endpoint,swScope:d.swScope,vapidKey:qe(d.vapidKey)}}}}}})).close(),await gr(Or),await gr("fcm_vapid_details_db"),await gr("undefined"),wE(e)?e:null}function wE(n){if(!n||!n.subscriptionOptions)return!1;const{subscriptionOptions:e}=n;return typeof n.createTime=="number"&&n.createTime>0&&typeof n.token=="string"&&n.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IE="firebase-messaging-database",EE=1,fi="firebase-messaging-store";let Dr=null;function $d(){return Dr||(Dr=bs(IE,EE,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(fi)}}})),Dr}async function TE(n){const e=Gd(n),i=await(await $d()).transaction(fi).objectStore(fi).get(e);if(i)return i;{const s=await vE(n.appConfig.senderId);if(s)return await ua(n,s),s}}async function ua(n,e){const t=Gd(n),s=(await $d()).transaction(fi,"readwrite");return await s.objectStore(fi).put(e,t),await s.done,e}function Gd({appConfig:n}){return n.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CE={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},ue=new St("messaging","Messaging",CE);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SE(n,e){const t=await fa(n),i=qd(e),s={method:"POST",headers:t,body:JSON.stringify(i)};let o;try{o=await(await fetch(da(n.appConfig),s)).json()}catch(a){throw ue.create("token-subscribe-failed",{errorInfo:a==null?void 0:a.toString()})}if(o.error){const a=o.error.message;throw ue.create("token-subscribe-failed",{errorInfo:a})}if(!o.token)throw ue.create("token-subscribe-no-token");return o.token}async function bE(n,e){const t=await fa(n),i=qd(e.subscriptionOptions),s={method:"PATCH",headers:t,body:JSON.stringify(i)};let o;try{o=await(await fetch(`${da(n.appConfig)}/${e.token}`,s)).json()}catch(a){throw ue.create("token-update-failed",{errorInfo:a==null?void 0:a.toString()})}if(o.error){const a=o.error.message;throw ue.create("token-update-failed",{errorInfo:a})}if(!o.token)throw ue.create("token-update-no-token");return o.token}async function AE(n,e){const i={method:"DELETE",headers:await fa(n)};try{const o=await(await fetch(`${da(n.appConfig)}/${e}`,i)).json();if(o.error){const a=o.error.message;throw ue.create("token-unsubscribe-failed",{errorInfo:a})}}catch(s){throw ue.create("token-unsubscribe-failed",{errorInfo:s==null?void 0:s.toString()})}}function da({projectId:n}){return`${fE}/projects/${n}/registrations`}async function fa({appConfig:n,installations:e}){const t=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n.apiKey,"x-goog-firebase-installations-auth":`FIS ${t}`})}function qd({p256dh:n,auth:e,endpoint:t,vapidKey:i}){const s={web:{endpoint:t,auth:e,p256dh:n}};return i!==Wd&&(s.web.applicationPubKey=i),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kE=10080*60*1e3;async function RE(n){const e=await PE(n.swRegistration,n.vapidKey),t={vapidKey:n.vapidKey,swScope:n.swRegistration.scope,endpoint:e.endpoint,auth:qe(e.getKey("auth")),p256dh:qe(e.getKey("p256dh"))},i=await TE(n.firebaseDependencies);if(i){if(OE(i.subscriptionOptions,t))return Date.now()>=i.createTime+kE?NE(n,{token:i.token,createTime:Date.now(),subscriptionOptions:t}):i.token;try{await AE(n.firebaseDependencies,i.token)}catch(s){console.warn(s)}return Jl(n.firebaseDependencies,t)}else return Jl(n.firebaseDependencies,t)}async function NE(n,e){try{const t=await bE(n.firebaseDependencies,e),i={...e,token:t,createTime:Date.now()};return await ua(n.firebaseDependencies,i),t}catch(t){throw t}}async function Jl(n,e){const i={token:await SE(n,e),createTime:Date.now(),subscriptionOptions:e};return await ua(n,i),i.token}async function PE(n,e){const t=await n.pushManager.getSubscription();return t||n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:mE(e)})}function OE(n,e){const t=e.vapidKey===n.vapidKey,i=e.endpoint===n.endpoint,s=e.auth===n.auth,o=e.p256dh===n.p256dh;return t&&i&&s&&o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xl(n){const e={from:n.from,collapseKey:n.collapse_key,messageId:n.fcmMessageId};return DE(e,n),ME(e,n),LE(e,n),e}function DE(n,e){if(!e.notification)return;n.notification={};const t=e.notification.title;t&&(n.notification.title=t);const i=e.notification.body;i&&(n.notification.body=i);const s=e.notification.image;s&&(n.notification.image=s);const o=e.notification.icon;o&&(n.notification.icon=o)}function ME(n,e){e.data&&(n.data=e.data)}function LE(n,e){var s,o,a,l;if(!e.fcmOptions&&!((s=e.notification)!=null&&s.click_action))return;n.fcmOptions={};const t=((o=e.fcmOptions)==null?void 0:o.link)??((a=e.notification)==null?void 0:a.click_action);t&&(n.fcmOptions.link=t);const i=(l=e.fcmOptions)==null?void 0:l.analytics_label;i&&(n.fcmOptions.analyticsLabel=i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xE(n){return typeof n=="object"&&!!n&&Hd in n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FE(n){if(!n||!n.options)throw Mr("App Configuration Object");if(!n.name)throw Mr("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:t}=n;for(const i of e)if(!t[i])throw Mr(i);return{appName:n.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}function Mr(n){return ue.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UE{constructor(e,t,i){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=FE(e);this.firebaseDependencies={app:e,appConfig:s,installations:t,analyticsProvider:i}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VE(n){try{n.swRegistration=await navigator.serviceWorker.register(uE,{scope:dE}),n.swRegistration.update().catch(()=>{}),await BE(n.swRegistration)}catch(e){throw ue.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}async function BE(n){return new Promise((e,t)=>{const i=setTimeout(()=>t(new Error(`Service worker not registered after ${zl} ms`)),zl),s=n.installing||n.waiting;n.active?(clearTimeout(i),e()):s?s.onstatechange=o=>{var a;((a=o.target)==null?void 0:a.state)==="activated"&&(s.onstatechange=null,clearTimeout(i),e())}:(clearTimeout(i),t(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jE(n,e){if(!e&&!n.swRegistration&&await VE(n),!(!e&&n.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw ue.create("invalid-sw-registration");n.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WE(n,e){e?n.vapidKey=e:n.vapidKey||(n.vapidKey=Wd)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HE(n,e){if(!navigator)throw ue.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw ue.create("permission-blocked");return await WE(n,e==null?void 0:e.vapidKey),await jE(n,e==null?void 0:e.serviceWorkerRegistration),RE(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $E(n,e,t){const i=GE(e);(await n.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:t[Hd],message_name:t[pE],message_time:t[gE],message_device_time:Math.floor(Date.now()/1e3)})}function GE(n){switch(n){case di.NOTIFICATION_CLICKED:return"notification_open";case di.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qE(n,e){const t=e.data;if(!t.isFirebaseMessaging)return;n.onMessageHandler&&t.messageType===di.PUSH_RECEIVED&&(typeof n.onMessageHandler=="function"?n.onMessageHandler(Xl(t)):n.onMessageHandler.next(Xl(t)));const i=t.data;xE(i)&&i[_E]==="1"&&await $E(n,t.messageType,i)}const Ql="@firebase/messaging",Zl="0.12.23";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zE=n=>{const e=new UE(n.getProvider("app").getImmediate(),n.getProvider("installations-internal").getImmediate(),n.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",t=>qE(e,t)),e},KE=n=>{const e=n.getProvider("messaging").getImmediate();return{getToken:i=>HE(e,i)}};function YE(){Ce(new Ie("messaging",zE,"PUBLIC")),Ce(new Ie("messaging-internal",KE,"PRIVATE")),he(Ql,Zl),he(Ql,Zl,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JE(){try{await lo()}catch{return!1}return typeof window<"u"&&co()&&uh()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XE(n,e){if(!navigator)throw ue.create("only-available-in-window");return n.onMessageHandler=e,()=>{n.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aT(n=gi()){return JE().then(e=>{if(!e)throw ue.create("unsupported-browser")},e=>{throw ue.create("indexed-db-unsupported")}),rt(oe(n),"messaging").getImmediate()}function cT(n,e){return n=oe(n),XE(n,e)}YE();export{aT as a,ZE as b,eT as c,oT as d,rT as e,iT as f,QE as g,cT as h,Zp as i,sT as o,tT as r,nT as s};
