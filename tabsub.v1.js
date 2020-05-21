class TabSub {
    constructor() {
        this.listeners = {};
    }
    publish(topic,msg) {
        const dataKey = topic + "_data";
        const jsonData = JSON.stringify([msg,Date.now()]);

        localStorage.setItem(dataKey, jsonData);

        // Dispatch to local event listener as well
        var event = new Event("storage");
        event.key=dataKey;
        event.newValue=jsonData;
        window.dispatchEvent(event);
    }
    state(topic){
        const dataKey = topic + "_data";
        const dataJSON = localStorage.getItem(dataKey);
        if (dataJSON == undefined){
            return undefined
        }
        return JSON.parse(dataJSON)[0];
    }
    subscribe(topic, callback) {
        if (this.listeners[topic] == undefined) {
            // Not yet any listener for this topic
            this.listeners[topic] = [];

            window.addEventListener('storage', (e) => {
                const dataKey = topic + "_data";
                if (e.key === dataKey) {
                    const data =  JSON.parse(e.newValue)[0];
                    this.listeners[topic].forEach((v, k) => {
                        v(data);
                    });
                }
            }, false);
        }
        this.listeners[topic].push(callback)
    }
}
