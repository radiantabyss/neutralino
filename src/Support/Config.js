const self = {
    async read(config) {
        return JSON.parse(await Neutralino.filesystem.readFile(`${APP_PATH}/configs/${config}.json`));
    },

    async write(config, data) {
        await Neutralino.filesystem.writeFile(`${APP_PATH}/configs/${config}.json`, JSON.stringify(data, null, 4));
    },

    get(config) {
        return self.read(config);
    },

    getKey(config, key) {
        let data = self.read(config);
        return data[key];
    },

    set(config, data) {
        self.write(config, data);
    },

    setKey(config, key, value) {
        let data = self.read(config);
        data[key] = value;
        self.write(config, data);
    },

    deleteKey(config, key) {
        let data = self.read(config);
        delete data[key];
        self.write(config, data);
    },

    clear(config) {
        self.write(config, {});
    },
};

export default self;
