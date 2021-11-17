
class BentoNet {

    allowedOrigins = [];
    searchHandlers = [];

    constructor(allowedOrigins) {
        window.bentonet = this;
        window.bentonet.allowedOrigins = allowedOrigins;
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
            if (!window.bentonet.allowedOrigins.includes(event.origin)) {
                console.log("BentoNet: " + event.origin + " is not an allowed domain for messaging.");
                return;
            }
            switch (event.data.message) {
                case 'BENTONET.SET':
                    window.sessionStorage.setItem(event.data.key, event.data.value);
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
        window.bentonet.searchHandlers.push(handler);
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