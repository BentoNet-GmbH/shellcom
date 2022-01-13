
class BentoNet {

    allowedOrigins = [];
    searchHandlers = [];
    startupObservers = [];
    observers = [];

    constructor(startupObserver, allowedOrigins = ["bentonet.de", location.host]) {
        window.bentonet = this;
        if (startupObserver) {
            window.bentonet.startupObservers.push(startupObserver);
        }
        if(allowedOrigins) {
            window.bentonet.allowedOrigins = allowedOrigins;
        }
        window.bentonet.init();
    }

    init() {
        console.log("BentoNet: Init connection to platform...");
        let parent = window.parent;
        parent.postMessage({ message: "APP.STARTUP" }, "*")

        window.addEventListener( "beforeunload", function() {
            console.log("BentoNet: Shutdown connection to platform...");
            var parent = window.parent;
            parent.postMessage({ message: "APP.SHUTDOWN" }, "*")
        });

        window.addEventListener("message", function(event) {
            if(!window.bentonet.checkAllowedOrigins(event.origin)) {
                console.log("BentoNet: " + event.origin + " is not an allowed domain for messaging.");
                return;
            }
            switch (event.data.message) {
                case 'BENTONET.STARTUP':
                    console.log("BentoNet: Connection successful...");
                    window.sessionStorage.setItem(event.data.key, event.data.value);
                    window.bentonet.startupObservers.forEach( handler => {
                        handler(event.data.key, event.data.value);
                    })
                    break;
                case 'BENTONET.SET':
                    window.sessionStorage.setItem(event.data.key, event.data.value);
                    window.bentonet.observers.forEach( handler => {
                        handler(event.data.key, event.data.value);
                    })
                    break;
                case 'BENTONET.GET':
                    let parent = window.parent;
                    let data = window.sessionStorage.getItem(event.data.key);
                    let returnPayload = {
                        message: 'APP.RESPONSE',
                        key: event.data.key,
                        value: data
                    }
                    parent.postMessage(returnPayload, '*');
                    break;
                case 'BENTONET.REMOVE':
                    window.sessionStorage.removeItem(event.data.key);
                    break;
                case 'SEARCH.START':
                    window.bentonet.searchHandlers.forEach( handler => {
                        handler(event.data.value);
                    })
            }
        });
    }

    checkAllowedOrigins(origin) {
        let allowed = false;
        window.bentonet.allowedOrigins.forEach( allowedOrigin => {
            console.log(origin + " ==> " + allowedOrigin);
            if (origin.toLowerCase().endsWith(allowedOrigin.toLowerCase())) {
                allowed = true;
            }
        })
        return allowed;
    }

    showSearchField(show) {
        let parent = window.parent;
        let message = show === true ? "SEARCH.ENABLE" : "SEARCH.DISABLE";
        parent.postMessage({ message: message }, "*")
    }

    autoEnableSearchField() {
        if(window.bentonet.searchHandlers.length > 0) {
            window.bentonet.showSearchField(true )
        } else {
            window.bentonet.showSearchField( false )
        }
    }

    addSearchHandler(handler) {
        if (handler) {
            window.bentonet.searchHandlers.push(handler);
        }
        window.bentonet.autoEnableSearchField();
    }

    removeSearchHandler(handler) {
        window.bentonet.searchHandlers.forEach( (h, i) => {
            if(h === handler) {
                window.bentonet.searchHandlers.splice(i, 1);
                window.bentonet.autoEnableSearchField();
            }
        })
    }

    addObserver(handler) {
        if (handler) {
            window.bentonet.observers.push(handler);
        }
    }

    removeObserver(handler) {
        window.bentonet.observers.forEach( (h, i) => {
            if(h === handler) {
                window.bentonet.observers.splice(i, 1);
            }
        })
    }

    showInfo(title, info) {
        let parent = window.parent;
        parent.postMessage({ message: "APP.INFO", key: "content", value: { title: title, text: info}  }, "*")
    }

    showWarning(title, warning) {
        let parent = window.parent;
        parent.postMessage({ message: "APP.WARNING", key: "content", value: { title: title, text: warning}  }, "*")
    }

    showError(title, error) {
        let parent = window.parent;
        parent.postMessage({ message: "APP.ERROR", key: "content", value: { title: title, text: error}  }, "*")
    }

    showSuccess(title, message) {
        parent.postMessage({ message: "APP.SUCCESS", key: "content", value: { title: title, text: message}  }, "*")
    }
}

export { BentoNet };