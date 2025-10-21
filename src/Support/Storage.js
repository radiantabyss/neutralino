const self = {
    async get(key) {
        try {
            return JSON.parse(await Neutralino.storage.getData(key));
        }
        catch (e) {
            return null;
        }
    },
    async set(key, value) {
        await Neutralino.storage.setData(key, JSON.stringify(value));
    },

    async remove(key) {
        await Neutralino.storage.setData(key, null);
    },

    async clear() {
        await Neutralino.filsystem.remove(`${APP_PATH}/.storage`);
    },
};

export default self;
