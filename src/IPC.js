let self = {
    handlers: new Map(),

    handle(channel, handler) {
        self.handlers.set(channel, handler);
    },

    async invoke(channel, ...args) {
        const handler = self.handlers.get(channel);
        if ( !handler ) {
            throw new Error(`No handler for channel: ${channel}`);
        }
        return await handler(...args);
    },

    send(channel, data) {
        const event = new CustomEvent(channel, { detail: data });
        window.dispatchEvent(event);
    },

    on(channel, callback) {
        window.addEventListener(channel, (event) => {
            callback(event.detail);
        });
    },
}

export default self;
