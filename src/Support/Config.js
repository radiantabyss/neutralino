const self = {
    async read(config) {
        return JSON.parse(await Neutralino.filesystem.readFile(`${APP_PATH}/configs/${config}.json`));
    },

    async write(config, data) {
        await Neutralino.filesystem.writeFile(`${APP_PATH}/configs/${config}.json`, JSON.stringify(data, null, 4));
    },

    async get(config, key = null) {
        let data = await self.read(config);

        if ( key !== null ) {
            return data[key];
        }

        return data;
    },

    async set(config, value, key = null) {
        let data = value;

        if ( key !== null ) {
            data = await self.read(config);
            data[key] = value;
        }

        await self.write(config, data);
    },

    async remove(config, key = null) {
        let data = {};

        if ( key !== null ) {
            data = await self.read(config);
            delete data[key];
        }

        await self.write(config, data);
    },
};

export default self;
