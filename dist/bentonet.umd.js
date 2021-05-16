!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e||self).bentonet={})}(this,function(e){e.BentoNet=function(){function e(e){this.allowedOrigins=[],this.searchHandlers=[],window.bentonet=this,window.bentonet.allowedOrigins=e,window.bentonet.init()}var n=e.prototype;return n.init=function(){console.log("BentoNet: Init connection to platform..."),window.parent.postMessage({message:"APP.STARTUP"},"*"),window.addEventListener("beforeunload",function(){console.log("BentoNet: Shutdown connection to platform..."),window.parent.postMessage({message:"APP.SHUTDOWN"},"*")}),window.addEventListener("message",function(e){if(window.bentonet.allowedOrigins.includes(e.origin))switch(e.data.message){case"BENTONET.SET":window.sessionStorage.setItem(e.data.key,e.data.value);break;case"BENTONET.GET":var n=window.parent,t=window.sessionStorage.getItem(e.data.key);n.postMessage({message:"APP.RESPONSE",key:e.data.key,value:t},"*");break;case"BENTONET.REMOVE":window.sessionStorage.removeItem(e.data.key);break;case"SEARCH.START":window.bentonet.searchHandlers.forEach(function(n){n(e.data.value)})}})},n.showSearchField=function(e){window.parent.postMessage({message:!0===e?"SEARCH.ENABLE":"SEARCH.DISABLE"},"*")},n.autoEnableSearchField=function(){window.bentonet.searchHandlers.length>0?window.bentonet.showSearchField(!0):window.bentonet.showSearchField(!1)},n.addSearchHandler=function(e){window.bentonet.searchHandlers.push(e),window.bentonet.autoEnableSearchField()},n.removeSearchHandler=function(e){window.bentonet.searchHandlers.forEach(function(n,t){if(n===e)return window.bentonet.searchHandlers.splice(t,1),void window.bentonet.autoEnableSearchField()})},n.showInfo=function(e,n){window.parent.postMessage({message:"APP.INFO",key:"content",value:{title:e,text:n}},"*")},n.showWarning=function(e,n){window.parent.postMessage({message:"APP.WARNING",key:"content",value:{title:e,text:n}},"*")},n.showError=function(e,n){window.parent.postMessage({message:"APP.ERROR",key:"content",value:{title:e,text:n}},"*")},n.showSuccess=function(e,n){parent.postMessage({message:"APP.SUCCESS",key:"content",value:{title:e,text:n}},"*")},e}()});
//# sourceMappingURL=bentonet.umd.js.map
