let self = {
    data: {},

    all() {
        return JSON.parse(JSON.stringify(self.data));
    },

    get(key) {
        return JSON.parse(JSON.stringify(self.data[key]));
    },

    has(key) {
        return key in self.data;
    },
};

export default self;
