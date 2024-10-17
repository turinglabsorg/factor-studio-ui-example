import{v as m,y as P,z as We,A as Ve}from"./index-BtNQMnkc.js";const qe=()=>"9.1.0",ke=e=>e.toString(16).padStart(2,"0"),Fe=e=>{const n=new Uint8Array(e/2);return window.crypto.getRandomValues(n),Array.from(n,ke).join("")},Ke=()=>typeof window<"u"?Fe(10):new Date().getTime().toString(36);class N{}N.makeRequest=(e,n)=>({id:Ke(),method:e,params:n,env:{sdkVersion:qe()}});N.makeResponse=(e,n,t)=>({id:e,success:!0,version:t,data:n});N.makeErrorResponse=(e,n,t)=>({id:e,success:!1,error:n,version:t});var f;(function(e){e.sendTransactions="sendTransactions",e.rpcCall="rpcCall",e.getChainInfo="getChainInfo",e.getSafeInfo="getSafeInfo",e.getTxBySafeTxHash="getTxBySafeTxHash",e.getSafeBalances="getSafeBalances",e.signMessage="signMessage",e.signTypedMessage="signTypedMessage",e.getEnvironmentInfo="getEnvironmentInfo",e.getOffChainSignature="getOffChainSignature",e.requestAddressBook="requestAddressBook",e.wallet_getPermissions="wallet_getPermissions",e.wallet_requestPermissions="wallet_requestPermissions"})(f||(f={}));var D;(function(e){e.requestAddressBook="requestAddressBook"})(D||(D={}));class Xe{constructor(n=null,t=!1){this.allowedOrigins=null,this.callbacks=new Map,this.debugMode=!1,this.isServer=typeof window>"u",this.isValidMessage=({origin:i,data:r,source:s})=>{const d=!r,l=!this.isServer&&s===window.parent,g=typeof r.version<"u"&&parseInt(r.version.split(".")[0]),I=typeof g=="number"&&g>=1;let E=!0;return Array.isArray(this.allowedOrigins)&&(E=this.allowedOrigins.find(y=>y.test(i))!==void 0),!d&&l&&I&&E},this.logIncomingMessage=i=>{console.info(`Safe Apps SDK v1: A message was received from origin ${i.origin}. `,i.data)},this.onParentMessage=i=>{this.isValidMessage(i)&&(this.debugMode&&this.logIncomingMessage(i),this.handleIncomingMessage(i.data))},this.handleIncomingMessage=i=>{const{id:r}=i,s=this.callbacks.get(r);s&&(s(i),this.callbacks.delete(r))},this.send=(i,r)=>{const s=N.makeRequest(i,r);if(this.isServer)throw new Error("Window doesn't exist");return window.parent.postMessage(s,"*"),new Promise((d,l)=>{this.callbacks.set(s.id,g=>{if(!g.success){l(new Error(g.error));return}d(g)})})},this.allowedOrigins=n,this.debugMode=t,this.isServer||window.addEventListener("message",this.onParentMessage)}}const p=e=>typeof e=="object"&&e!=null&&"domain"in e&&"types"in e&&"message"in e;var Qe={},_={},T={},w=m&&m.__awaiter||function(e,n,t,i){function r(s){return s instanceof t?s:new t(function(d){d(s)})}return new(t||(t=Promise))(function(s,d){function l(E){try{I(i.next(E))}catch(y){d(y)}}function g(E){try{I(i.throw(E))}catch(y){d(y)}}function I(E){E.done?s(E.value):r(E.value).then(l,g)}I((i=i.apply(e,n||[])).next())})};Object.defineProperty(T,"__esModule",{value:!0});T.getData=T.fetchData=T.stringifyQuery=T.insertParams=void 0;const $e=e=>typeof e=="object"&&e!==null&&"code"in e&&"message"in e;function Ye(e,n,t){return e.replace(new RegExp(`\\{${n}\\}`,"g"),t)}function Je(e,n){return n?Object.keys(n).reduce((t,i)=>Ye(t,i,String(n[i])),e):e}T.insertParams=Je;function ze(e){if(!e)return"";const n=new URLSearchParams;Object.keys(e).forEach(i=>{e[i]!=null&&n.append(i,String(e[i]))});const t=n.toString();return t?`?${t}`:""}T.stringifyQuery=ze;function L(e){return w(this,void 0,void 0,function*(){let n;try{n=yield e.json()}catch{n={}}if(!e.ok){const t=$e(n)?`CGW error - ${n.code}: ${n.message}`:`CGW error - status ${e.statusText}`;throw new Error(t)}return n})}function Ze(e,n,t,i,r){return w(this,void 0,void 0,function*(){const s=Object.assign({"Content-Type":"application/json"},i),d={method:n??"POST",headers:s};r&&(d.credentials=r),t!=null&&(d.body=typeof t=="string"?t:JSON.stringify(t));const l=yield fetch(e,d);return L(l)})}T.fetchData=Ze;function xe(e,n,t){return w(this,void 0,void 0,function*(){const i={method:"GET"};n&&(i.headers=Object.assign(Object.assign({},n),{"Content-Type":"application/json"})),t&&(i.credentials=t);const r=yield fetch(e,i);return L(r)})}T.getData=xe;Object.defineProperty(_,"__esModule",{value:!0});_.getEndpoint=_.deleteEndpoint=_.putEndpoint=_.postEndpoint=void 0;const S=T;function C(e,n,t,i){const r=(0,S.insertParams)(n,t),s=(0,S.stringifyQuery)(i);return`${e}${r}${s}`}function en(e,n,t){const i=C(e,n,t==null?void 0:t.path,t==null?void 0:t.query);return(0,S.fetchData)(i,"POST",t==null?void 0:t.body,t==null?void 0:t.headers,t==null?void 0:t.credentials)}_.postEndpoint=en;function nn(e,n,t){const i=C(e,n,t==null?void 0:t.path,t==null?void 0:t.query);return(0,S.fetchData)(i,"PUT",t==null?void 0:t.body,t==null?void 0:t.headers,t==null?void 0:t.credentials)}_.putEndpoint=nn;function tn(e,n,t){const i=C(e,n,t==null?void 0:t.path,t==null?void 0:t.query);return(0,S.fetchData)(i,"DELETE",t==null?void 0:t.body,t==null?void 0:t.headers,t==null?void 0:t.credentials)}_.deleteEndpoint=tn;function an(e,n,t,i){if(i)return(0,S.getData)(i,void 0,t==null?void 0:t.credentials);const r=C(e,n,t==null?void 0:t.path,t==null?void 0:t.query);return(0,S.getData)(r,t==null?void 0:t.headers,t==null?void 0:t.credentials)}_.getEndpoint=an;var b={};Object.defineProperty(b,"__esModule",{value:!0});b.DEFAULT_BASE_URL=void 0;b.DEFAULT_BASE_URL="https://safe-client.safe.global";var B={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.ImplementationVersionState=void 0,function(n){n.UP_TO_DATE="UP_TO_DATE",n.OUTDATED="OUTDATED",n.UNKNOWN="UNKNOWN"}(e.ImplementationVersionState||(e.ImplementationVersionState={}))})(B);var H={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.SafeAppSocialPlatforms=e.SafeAppFeatures=e.SafeAppAccessPolicyTypes=void 0,function(n){n.NoRestrictions="NO_RESTRICTIONS",n.DomainAllowlist="DOMAIN_ALLOWLIST"}(e.SafeAppAccessPolicyTypes||(e.SafeAppAccessPolicyTypes={})),function(n){n.BATCHED_TRANSACTIONS="BATCHED_TRANSACTIONS"}(e.SafeAppFeatures||(e.SafeAppFeatures={})),function(n){n.TWITTER="TWITTER",n.GITHUB="GITHUB",n.DISCORD="DISCORD"}(e.SafeAppSocialPlatforms||(e.SafeAppSocialPlatforms={}))})(H);var U={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.LabelValue=e.StartTimeValue=e.DurationType=e.DetailedExecutionInfoType=e.TransactionListItemType=e.ConflictType=e.TransactionInfoType=e.SettingsInfoType=e.TransactionTokenType=e.TransferDirection=e.TransactionStatus=e.Operation=void 0,function(n){n[n.CALL=0]="CALL",n[n.DELEGATE=1]="DELEGATE"}(e.Operation||(e.Operation={})),function(n){n.AWAITING_CONFIRMATIONS="AWAITING_CONFIRMATIONS",n.AWAITING_EXECUTION="AWAITING_EXECUTION",n.CANCELLED="CANCELLED",n.FAILED="FAILED",n.SUCCESS="SUCCESS"}(e.TransactionStatus||(e.TransactionStatus={})),function(n){n.INCOMING="INCOMING",n.OUTGOING="OUTGOING",n.UNKNOWN="UNKNOWN"}(e.TransferDirection||(e.TransferDirection={})),function(n){n.ERC20="ERC20",n.ERC721="ERC721",n.NATIVE_COIN="NATIVE_COIN"}(e.TransactionTokenType||(e.TransactionTokenType={})),function(n){n.SET_FALLBACK_HANDLER="SET_FALLBACK_HANDLER",n.ADD_OWNER="ADD_OWNER",n.REMOVE_OWNER="REMOVE_OWNER",n.SWAP_OWNER="SWAP_OWNER",n.CHANGE_THRESHOLD="CHANGE_THRESHOLD",n.CHANGE_IMPLEMENTATION="CHANGE_IMPLEMENTATION",n.ENABLE_MODULE="ENABLE_MODULE",n.DISABLE_MODULE="DISABLE_MODULE",n.SET_GUARD="SET_GUARD",n.DELETE_GUARD="DELETE_GUARD"}(e.SettingsInfoType||(e.SettingsInfoType={})),function(n){n.TRANSFER="Transfer",n.SETTINGS_CHANGE="SettingsChange",n.CUSTOM="Custom",n.CREATION="Creation",n.SWAP_ORDER="SwapOrder",n.TWAP_ORDER="TwapOrder",n.SWAP_TRANSFER="SwapTransfer"}(e.TransactionInfoType||(e.TransactionInfoType={})),function(n){n.NONE="None",n.HAS_NEXT="HasNext",n.END="End"}(e.ConflictType||(e.ConflictType={})),function(n){n.TRANSACTION="TRANSACTION",n.LABEL="LABEL",n.CONFLICT_HEADER="CONFLICT_HEADER",n.DATE_LABEL="DATE_LABEL"}(e.TransactionListItemType||(e.TransactionListItemType={})),function(n){n.MULTISIG="MULTISIG",n.MODULE="MODULE"}(e.DetailedExecutionInfoType||(e.DetailedExecutionInfoType={})),function(n){n.AUTO="AUTO",n.LIMIT_DURATION="LIMIT_DURATION"}(e.DurationType||(e.DurationType={})),function(n){n.AT_MINING_TIME="AT_MINING_TIME",n.AT_EPOCH="AT_EPOCH"}(e.StartTimeValue||(e.StartTimeValue={})),function(n){n.Queued="Queued",n.Next="Next"}(e.LabelValue||(e.LabelValue={}))})(U);var j={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.FEATURES=e.GAS_PRICE_TYPE=e.RPC_AUTHENTICATION=void 0,function(n){n.API_KEY_PATH="API_KEY_PATH",n.NO_AUTHENTICATION="NO_AUTHENTICATION",n.UNKNOWN="UNKNOWN"}(e.RPC_AUTHENTICATION||(e.RPC_AUTHENTICATION={})),function(n){n.ORACLE="ORACLE",n.FIXED="FIXED",n.FIXED_1559="FIXED1559",n.UNKNOWN="UNKNOWN"}(e.GAS_PRICE_TYPE||(e.GAS_PRICE_TYPE={})),function(n){n.ERC721="ERC721",n.SAFE_APPS="SAFE_APPS",n.CONTRACT_INTERACTION="CONTRACT_INTERACTION",n.DOMAIN_LOOKUP="DOMAIN_LOOKUP",n.SPENDING_LIMIT="SPENDING_LIMIT",n.EIP1559="EIP1559",n.SAFE_TX_GAS_OPTIONAL="SAFE_TX_GAS_OPTIONAL",n.TX_SIMULATION="TX_SIMULATION",n.EIP1271="EIP1271"}(e.FEATURES||(e.FEATURES={}))})(j);var G={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.TokenType=void 0,function(n){n.ERC20="ERC20",n.ERC721="ERC721",n.NATIVE_TOKEN="NATIVE_TOKEN"}(e.TokenType||(e.TokenType={}))})(G);var W={};Object.defineProperty(W,"__esModule",{value:!0});var V={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.ConfirmationViewTypes=void 0,function(n){n.COW_SWAP_ORDER="COW_SWAP_ORDER",n.COW_SWAP_TWAP_ORDER="COW_SWAP_TWAP_ORDER"}(e.ConfirmationViewTypes||(e.ConfirmationViewTypes={}))})(V);var q={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.SafeMessageStatus=e.SafeMessageListItemType=void 0,function(n){n.DATE_LABEL="DATE_LABEL",n.MESSAGE="MESSAGE"}(e.SafeMessageListItemType||(e.SafeMessageListItemType={})),function(n){n.NEEDS_CONFIRMATION="NEEDS_CONFIRMATION",n.CONFIRMED="CONFIRMED"}(e.SafeMessageStatus||(e.SafeMessageStatus={}))})(q);var k={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.DeviceType=void 0,function(n){n.ANDROID="ANDROID",n.IOS="IOS",n.WEB="WEB"}(e.DeviceType||(e.DeviceType={}))})(k);var F={};Object.defineProperty(F,"__esModule",{value:!0});(function(e){var n=m&&m.__createBinding||(Object.create?function(a,c,o,u){u===void 0&&(u=o);var A=Object.getOwnPropertyDescriptor(c,o);(!A||("get"in A?!c.__esModule:A.writable||A.configurable))&&(A={enumerable:!0,get:function(){return c[o]}}),Object.defineProperty(a,u,A)}:function(a,c,o,u){u===void 0&&(u=o),a[u]=c[o]}),t=m&&m.__exportStar||function(a,c){for(var o in a)o!=="default"&&!Object.prototype.hasOwnProperty.call(c,o)&&n(c,a,o)};Object.defineProperty(e,"__esModule",{value:!0}),e.deleteAccount=e.getAccount=e.createAccount=e.verifyAuth=e.getAuthNonce=e.getContract=e.getSafeOverviews=e.unsubscribeAll=e.unsubscribeSingle=e.registerRecoveryModule=e.deleteRegisteredEmail=e.getRegisteredEmail=e.verifyEmail=e.resendEmailVerificationCode=e.changeEmail=e.registerEmail=e.unregisterDevice=e.unregisterSafe=e.registerDevice=e.getDelegates=e.confirmSafeMessage=e.proposeSafeMessage=e.getSafeMessage=e.getSafeMessages=e.getDecodedData=e.getMasterCopies=e.getSafeApps=e.getChainConfig=e.getChainsConfig=e.getConfirmationView=e.proposeTransaction=e.getNonces=e.postSafeGasEstimation=e.deleteTransaction=e.getTransactionDetails=e.getTransactionQueue=e.getTransactionHistory=e.getCollectiblesPage=e.getCollectibles=e.getAllOwnedSafes=e.getOwnedSafes=e.getFiatCurrencies=e.getBalances=e.getMultisigTransactions=e.getModuleTransactions=e.getIncomingTransfers=e.getSafeInfo=e.getRelayCount=e.relayTransaction=e.setBaseUrl=void 0,e.putAccountDataSettings=e.getAccountDataSettings=e.getAccountDataTypes=void 0;const i=_,r=b;t(B,e),t(H,e),t(U,e),t(j,e),t(G,e),t(W,e),t(V,e),t(q,e),t(k,e),t(F,e);let s=r.DEFAULT_BASE_URL;const d=a=>{s=a};e.setBaseUrl=d;function l(a,c){return(0,i.postEndpoint)(s,"/v1/chains/{chainId}/relay",{path:{chainId:a},body:c})}e.relayTransaction=l;function g(a,c){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/relay/{address}",{path:{chainId:a,address:c}})}e.getRelayCount=g;function I(a,c){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/safes/{address}",{path:{chainId:a,address:c}})}e.getSafeInfo=I;function E(a,c,o,u){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/safes/{address}/incoming-transfers/",{path:{chainId:a,address:c},query:o},u)}e.getIncomingTransfers=E;function y(a,c,o,u){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/safes/{address}/module-transactions/",{path:{chainId:a,address:c},query:o},u)}e.getModuleTransactions=y;function Q(a,c,o,u){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/safes/{address}/multisig-transactions/",{path:{chainId:a,address:c},query:o},u)}e.getMultisigTransactions=Q;function $(a,c,o="usd",u={}){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/safes/{address}/balances/{currency}",{path:{chainId:a,address:c,currency:o},query:u})}e.getBalances=$;function Y(){return(0,i.getEndpoint)(s,"/v1/balances/supported-fiat-codes")}e.getFiatCurrencies=Y;function J(a,c){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/owners/{address}/safes",{path:{chainId:a,address:c}})}e.getOwnedSafes=J;function z(a){return(0,i.getEndpoint)(s,"/v1/owners/{address}/safes",{path:{address:a}})}e.getAllOwnedSafes=z;function Z(a,c,o={}){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/safes/{address}/collectibles",{path:{chainId:a,address:c},query:o})}e.getCollectibles=Z;function x(a,c,o={},u){return(0,i.getEndpoint)(s,"/v2/chains/{chainId}/safes/{address}/collectibles",{path:{chainId:a,address:c},query:o},u)}e.getCollectiblesPage=x;function ee(a,c,o={},u){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/transactions/history",{path:{chainId:a,safe_address:c},query:o},u)}e.getTransactionHistory=ee;function ne(a,c,o={},u){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/transactions/queued",{path:{chainId:a,safe_address:c},query:o},u)}e.getTransactionQueue=ne;function te(a,c){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/transactions/{transactionId}",{path:{chainId:a,transactionId:c}})}e.getTransactionDetails=te;function ie(a,c,o){return(0,i.deleteEndpoint)(s,"/v1/chains/{chainId}/transactions/{safeTxHash}",{path:{chainId:a,safeTxHash:c},body:{signature:o}})}e.deleteTransaction=ie;function ae(a,c,o){return(0,i.postEndpoint)(s,"/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations",{path:{chainId:a,safe_address:c},body:o})}e.postSafeGasEstimation=ae;function se(a,c){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/nonces",{path:{chainId:a,safe_address:c}})}e.getNonces=se;function ce(a,c,o){return(0,i.postEndpoint)(s,"/v1/chains/{chainId}/transactions/{safe_address}/propose",{path:{chainId:a,safe_address:c},body:o})}e.proposeTransaction=ce;function oe(a,c,o,u){return(0,i.postEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/views/transaction-confirmation",{path:{chainId:a,safe_address:c},body:{data:o,to:u}})}e.getConfirmationView=oe;function re(a){return(0,i.getEndpoint)(s,"/v1/chains",{query:a})}e.getChainsConfig=re;function ue(a){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}",{path:{chainId:a}})}e.getChainConfig=ue;function de(a,c={}){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/safe-apps",{path:{chainId:a},query:c})}e.getSafeApps=de;function le(a){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/about/master-copies",{path:{chainId:a}})}e.getMasterCopies=le;function fe(a,c,o){return(0,i.postEndpoint)(s,"/v1/chains/{chainId}/data-decoder",{path:{chainId:a},body:{data:c,to:o}})}e.getDecodedData=fe;function ge(a,c,o){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/messages",{path:{chainId:a,safe_address:c},query:{}},o)}e.getSafeMessages=ge;function he(a,c){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/messages/{message_hash}",{path:{chainId:a,message_hash:c}})}e.getSafeMessage=he;function Ee(a,c,o){return(0,i.postEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/messages",{path:{chainId:a,safe_address:c},body:o})}e.proposeSafeMessage=Ee;function _e(a,c,o){return(0,i.postEndpoint)(s,"/v1/chains/{chainId}/messages/{message_hash}/signatures",{path:{chainId:a,message_hash:c},body:o})}e.confirmSafeMessage=_e;function Te(a,c={}){return(0,i.getEndpoint)(s,"/v2/chains/{chainId}/delegates",{path:{chainId:a},query:c})}e.getDelegates=Te;function ve(a){return(0,i.postEndpoint)(s,"/v1/register/notifications",{body:a})}e.registerDevice=ve;function Ae(a,c,o){return(0,i.deleteEndpoint)(s,"/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}",{path:{chainId:a,safe_address:c,uuid:o}})}e.unregisterSafe=Ae;function Ie(a,c){return(0,i.deleteEndpoint)(s,"/v1/chains/{chainId}/notifications/devices/{uuid}",{path:{chainId:a,uuid:c}})}e.unregisterDevice=Ie;function ye(a,c,o,u){return(0,i.postEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/emails",{path:{chainId:a,safe_address:c},body:o,headers:u})}e.registerEmail=ye;function Se(a,c,o,u,A){return(0,i.putEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}",{path:{chainId:a,safe_address:c,signer:o},body:u,headers:A})}e.changeEmail=Se;function me(a,c,o){return(0,i.postEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend",{path:{chainId:a,safe_address:c,signer:o},body:""})}e.resendEmailVerificationCode=me;function Oe(a,c,o,u){return(0,i.putEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify",{path:{chainId:a,safe_address:c,signer:o},body:u})}e.verifyEmail=Oe;function Ne(a,c,o,u){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}",{path:{chainId:a,safe_address:c,signer:o},headers:u})}e.getRegisteredEmail=Ne;function Ce(a,c,o,u){return(0,i.deleteEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}",{path:{chainId:a,safe_address:c,signer:o},headers:u})}e.deleteRegisteredEmail=Ce;function be(a,c,o){return(0,i.postEndpoint)(s,"/v1/chains/{chainId}/safes/{safe_address}/recovery",{path:{chainId:a,safe_address:c},body:o})}e.registerRecoveryModule=be;function De(a){return(0,i.deleteEndpoint)(s,"/v1/subscriptions",{query:a})}e.unsubscribeSingle=De;function Re(a){return(0,i.deleteEndpoint)(s,"/v1/subscriptions/all",{query:a})}e.unsubscribeAll=Re;function we(a,c){return(0,i.getEndpoint)(s,"/v1/safes",{query:Object.assign(Object.assign({},c),{safes:a.join(",")})})}e.getSafeOverviews=we;function Pe(a,c){return(0,i.getEndpoint)(s,"/v1/chains/{chainId}/contracts/{contractAddress}",{path:{chainId:a,contractAddress:c}})}e.getContract=Pe;function Me(){return(0,i.getEndpoint)(s,"/v1/auth/nonce",{credentials:"include"})}e.getAuthNonce=Me;function pe(a){return(0,i.postEndpoint)(s,"/v1/auth/verify",{body:a,credentials:"include"})}e.verifyAuth=pe;function Le(a){return(0,i.postEndpoint)(s,"/v1/accounts",{body:a,credentials:"include"})}e.createAccount=Le;function Be(a){return(0,i.getEndpoint)(s,"/v1/accounts/{address}",{path:{address:a},credentials:"include"})}e.getAccount=Be;function He(a){return(0,i.deleteEndpoint)(s,"/v1/accounts/{address}",{path:{address:a},credentials:"include"})}e.deleteAccount=He;function Ue(){return(0,i.getEndpoint)(s,"/v1/accounts/data-types")}e.getAccountDataTypes=Ue;function je(a){return(0,i.getEndpoint)(s,"/v1/accounts/{address}/data-settings",{path:{address:a},credentials:"include"})}e.getAccountDataSettings=je;function Ge(a,c){return(0,i.putEndpoint)(s,"/v1/accounts/{address}/data-settings",{path:{address:a},body:c,credentials:"include"})}e.putAccountDataSettings=Ge})(Qe);class sn{constructor(n){this.communicator=n}async getBySafeTxHash(n){if(!n)throw new Error("Invalid safeTxHash");return(await this.communicator.send(f.getTxBySafeTxHash,{safeTxHash:n})).data}async signMessage(n){const t={message:n};return(await this.communicator.send(f.signMessage,t)).data}async signTypedMessage(n){if(!p(n))throw new Error("Invalid typed data");return(await this.communicator.send(f.signTypedMessage,{typedData:n})).data}async send({txs:n,params:t}){if(!n||!n.length)throw new Error("No transactions were passed");const i={txs:n,params:t};return(await this.communicator.send(f.sendTransactions,i)).data}}const h={eth_call:"eth_call",eth_gasPrice:"eth_gasPrice",eth_getLogs:"eth_getLogs",eth_getBalance:"eth_getBalance",eth_getCode:"eth_getCode",eth_getBlockByHash:"eth_getBlockByHash",eth_getBlockByNumber:"eth_getBlockByNumber",eth_getStorageAt:"eth_getStorageAt",eth_getTransactionByHash:"eth_getTransactionByHash",eth_getTransactionReceipt:"eth_getTransactionReceipt",eth_getTransactionCount:"eth_getTransactionCount",eth_estimateGas:"eth_estimateGas",safe_setSettings:"safe_setSettings"},v={defaultBlockParam:(e="latest")=>e,returnFullTxObjectParam:(e=!1)=>e,blockNumberToHex:e=>Number.isInteger(e)?`0x${e.toString(16)}`:e};class cn{constructor(n){this.communicator=n,this.call=this.buildRequest({call:h.eth_call,formatters:[null,v.defaultBlockParam]}),this.getBalance=this.buildRequest({call:h.eth_getBalance,formatters:[null,v.defaultBlockParam]}),this.getCode=this.buildRequest({call:h.eth_getCode,formatters:[null,v.defaultBlockParam]}),this.getStorageAt=this.buildRequest({call:h.eth_getStorageAt,formatters:[null,v.blockNumberToHex,v.defaultBlockParam]}),this.getPastLogs=this.buildRequest({call:h.eth_getLogs}),this.getBlockByHash=this.buildRequest({call:h.eth_getBlockByHash,formatters:[null,v.returnFullTxObjectParam]}),this.getBlockByNumber=this.buildRequest({call:h.eth_getBlockByNumber,formatters:[v.blockNumberToHex,v.returnFullTxObjectParam]}),this.getTransactionByHash=this.buildRequest({call:h.eth_getTransactionByHash}),this.getTransactionReceipt=this.buildRequest({call:h.eth_getTransactionReceipt}),this.getTransactionCount=this.buildRequest({call:h.eth_getTransactionCount,formatters:[null,v.defaultBlockParam]}),this.getGasPrice=this.buildRequest({call:h.eth_gasPrice}),this.getEstimateGas=t=>this.buildRequest({call:h.eth_estimateGas})([t]),this.setSafeSettings=this.buildRequest({call:h.safe_setSettings})}buildRequest(n){const{call:t,formatters:i}=n;return async r=>{i&&Array.isArray(r)&&i.forEach((l,g)=>{l&&(r[g]=l(r[g]))});const s={call:t,params:r||[]};return(await this.communicator.send(f.rpcCall,s)).data}}}const on="0x1626ba7e",rn="0x20c13b0b",R=4001;class O extends Error{constructor(n,t,i){super(n),this.code=t,this.data=i,Object.setPrototypeOf(this,O.prototype)}}class K{constructor(n){this.communicator=n}async getPermissions(){return(await this.communicator.send(f.wallet_getPermissions,void 0)).data}async requestPermissions(n){if(!this.isPermissionRequestValid(n))throw new O("Permissions request is invalid",R);try{return(await this.communicator.send(f.wallet_requestPermissions,n)).data}catch{throw new O("Permissions rejected",R)}}isPermissionRequestValid(n){return n.every(t=>typeof t=="object"?Object.keys(t).every(i=>!!Object.values(D).includes(i)):!1)}}const M=(e,n)=>n.some(t=>t.parentCapability===e),un=()=>(e,n,t)=>{const i=t.value;return t.value=async function(){const r=new K(this.communicator);let s=await r.getPermissions();if(M(n,s)||(s=await r.requestPermissions([{[n]:{}}])),!M(n,s))throw new O("Permissions rejected",R);return i.apply(this)},t};var dn=function(e,n,t,i){var r=arguments.length,s=r<3?n:i===null?i=Object.getOwnPropertyDescriptor(n,t):i,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(e,n,t,i);else for(var l=e.length-1;l>=0;l--)(d=e[l])&&(s=(r<3?d(s):r>3?d(n,t,s):d(n,t))||s);return r>3&&s&&Object.defineProperty(n,t,s),s};class X{constructor(n){this.communicator=n}async getChainInfo(){return(await this.communicator.send(f.getChainInfo,void 0)).data}async getInfo(){return(await this.communicator.send(f.getSafeInfo,void 0)).data}async experimental_getBalances({currency:n="usd"}={}){return(await this.communicator.send(f.getSafeBalances,{currency:n})).data}async check1271Signature(n,t="0x"){const i=await this.getInfo(),r=P({abi:[{constant:!1,inputs:[{name:"_dataHash",type:"bytes32"},{name:"_signature",type:"bytes"}],name:"isValidSignature",outputs:[{name:"",type:"bytes4"}],payable:!1,stateMutability:"nonpayable",type:"function"}],functionName:"isValidSignature",args:[n,t]}),s={call:h.eth_call,params:[{to:i.safeAddress,data:r},"latest"]};try{return(await this.communicator.send(f.rpcCall,s)).data.slice(0,10).toLowerCase()===on}catch{return!1}}async check1271SignatureBytes(n,t="0x"){const i=await this.getInfo(),r=P({abi:[{constant:!1,inputs:[{name:"_data",type:"bytes"},{name:"_signature",type:"bytes"}],name:"isValidSignature",outputs:[{name:"",type:"bytes4"}],payable:!1,stateMutability:"nonpayable",type:"function"}],functionName:"isValidSignature",args:[n,t]}),s={call:h.eth_call,params:[{to:i.safeAddress,data:r},"latest"]};try{return(await this.communicator.send(f.rpcCall,s)).data.slice(0,10).toLowerCase()===rn}catch{return!1}}calculateMessageHash(n){return We(n)}calculateTypedMessageHash(n){const t=typeof n.domain.chainId=="object"?n.domain.chainId.toNumber():Number(n.domain.chainId);let i=n.primaryType;if(!i){const r=Object.values(n.types),s=Object.keys(n.types).filter(d=>r.every(l=>l.every(({type:g})=>g.replace("[","").replace("]","")!==d)));if(s.length===0||s.length>1)throw new Error("Please specify primaryType");i=s[0]}return Ve({message:n.message,domain:{...n.domain,chainId:t,verifyingContract:n.domain.verifyingContract,salt:n.domain.salt},types:n.types,primaryType:i})}async getOffChainSignature(n){return(await this.communicator.send(f.getOffChainSignature,n)).data}async isMessageSigned(n,t="0x"){let i;if(typeof n=="string"&&(i=async()=>{const r=this.calculateMessageHash(n);return await this.isMessageHashSigned(r,t)}),p(n)&&(i=async()=>{const r=this.calculateTypedMessageHash(n);return await this.isMessageHashSigned(r,t)}),i)return await i();throw new Error("Invalid message type")}async isMessageHashSigned(n,t="0x"){const i=[this.check1271Signature.bind(this),this.check1271SignatureBytes.bind(this)];for(const r of i)if(await r(n,t))return!0;return!1}async getEnvironmentInfo(){return(await this.communicator.send(f.getEnvironmentInfo,void 0)).data}async requestAddressBook(){return(await this.communicator.send(f.requestAddressBook,void 0)).data}}dn([un()],X.prototype,"requestAddressBook",null);class fn{constructor(n={}){const{allowedDomains:t=null,debug:i=!1}=n;this.communicator=new Xe(t,i),this.eth=new cn(this.communicator),this.txs=new sn(this.communicator),this.safe=new X(this.communicator),this.wallet=new K(this.communicator)}}export{N as MessageFormatter,f as Methods,h as RPC_CALLS,D as RestrictedMethods,fn as default,qe as getSDKVersion,p as isObjectEIP712TypedData};
