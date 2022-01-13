!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e||self).bentonet={})}(this,function(e){e.BentoNet=/*#__PURE__*/function(){function e(e,n){void 0===n&&(n=["bentonet.de",location.host]),this.allowedOrigins=[],this.searchHandlers=[],this.startupObservers=[],this.observers=[],window.bentonet=this,e&&window.bentonet.startupObservers.push(e),n&&(window.bentonet.allowedOrigins=n),window.bentonet.init()}var n=e.prototype;return n.init=function(){console.log("BentoNet: Init connection to platform..."),window.parent.postMessage({message:"APP.STARTUP"},"*"),window.addEventListener("beforeunload",function(){console.log("BentoNet: Shutdown connection to platform..."),window.parent.postMessage({message:"APP.SHUTDOWN"},"*")}),window.addEventListener("message",function(e){if(window.bentonet.checkAllowedOrigins(e.origin))switch(e.data.message){case"BENTONET.STARTUP":window.sessionStorage.setItem(e.data.key,e.data.value),window.bentonet.startupObservers.forEach(function(n){n(e.data.key,e.data.value)});break;case"BENTONET.SET":window.sessionStorage.setItem(e.data.key,e.data.value),window.bentonet.observers.forEach(function(n){n(e.data.key,e.data.value)});break;case"BENTONET.GET":var n=window.parent,t=window.sessionStorage.getItem(e.data.key);n.postMessage({message:"APP.RESPONSE",key:e.data.key,value:t},"*");break;case"BENTONET.REMOVE":window.sessionStorage.removeItem(e.data.key);break;case"SEARCH.START":window.bentonet.searchHandlers.forEach(function(n){n(e.data.value)})}else console.log("BentoNet: "+e.origin+" is not an allowed domain for messaging.")})},n.checkAllowedOrigins=function(e){var n=!1;return window.bentonet.allowedOrigins.forEach(function(t){console.log(e+" ==> "+t),e.toLowerCase().endsWith(t.toLowerCase())&&(n=!0)}),n},n.showSearchField=function(e){window.parent.postMessage({message:!0===e?"SEARCH.ENABLE":"SEARCH.DISABLE"},"*")},n.autoEnableSearchField=function(){window.bentonet.searchHandlers.length>0?window.bentonet.showSearchField(!0):window.bentonet.showSearchField(!1)},n.addSearchHandler=function(e){e&&window.bentonet.searchHandlers.push(e),window.bentonet.autoEnableSearchField()},n.removeSearchHandler=function(e){window.bentonet.searchHandlers.forEach(function(n,t){n===e&&(window.bentonet.searchHandlers.splice(t,1),window.bentonet.autoEnableSearchField())})},n.addObserver=function(e){e&&window.bentonet.observers.push(e)},n.removeObserver=function(e){window.bentonet.observers.forEach(function(n,t){n===e&&window.bentonet.observers.splice(t,1)})},n.showInfo=function(e,n){window.parent.postMessage({message:"APP.INFO",key:"content",value:{title:e,text:n}},"*")},n.showWarning=function(e,n){window.parent.postMessage({message:"APP.WARNING",key:"content",value:{title:e,text:n}},"*")},n.showError=function(e,n){window.parent.postMessage({message:"APP.ERROR",key:"content",value:{title:e,text:n}},"*")},n.showSuccess=function(e,n){parent.postMessage({message:"APP.SUCCESS",key:"content",value:{title:e,text:n}},"*")},e}()});
//# sourceMappingURL=bentonet.umd.js.map
