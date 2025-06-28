const self = {
    async read(config) {
        return JSON.parse(await Neutralino.filesystem.readFile(`${APP_PATH}/configs/${config}.json`));
    },

    async write(config, data) {
        await Neutralino.filesystem.writeFile(`${APP_PATH}/configs/${config}.json`, JSON.stringify(data, null, 4));
    },

    async get(config) {
        return await self.read(config);
    },

    async getKey(config, key) {
        let data = await self.read(config);
        return data[key];
    },

    async set(config, data) {
        await self.write(config, data);
    },

    async setKey(config, key, value) {
        let data = await self.read(config);
        data[key] = value;
        await self.write(config, data);
    },

    async deleteKey(config, key) {
        let data = await self.read(config);
        delete data[key];
        await self.write(config, data);
    },

    async clear(config) {
        await self.write(config, {});
    },
};

export default self;
