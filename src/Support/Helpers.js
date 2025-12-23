let self = {
    dmp(text) {
        // eslint-disable-next-line
        console.log(text);
    },

    decode_json(string) {
        if ( typeof string == 'string') {
            return JSON.parse(string);
        }

        return string;
    },

    encode_json(array, null_if_empty = true, return_empty_array = true) {
        if ( typeof array == 'string' ) {
            return array;
        }

        if ( array === null ) {
            return null_if_empty ? null : JSON.stringify(return_empty_array ? [] : {});
        }
        else if ( Array.isArray(array) && !array.length ) {
            return null_if_empty ? null : JSON.stringify([]);
        }
        else if ( array == '{}' ) {
            return null_if_empty ? null : JSON.stringify({});
        }

        return JSON.stringify(array, (key, value) => (typeof value === "string" && value !== '' && !isNaN(value) ? Number(value) : value));
    },

    async custom_logger(e) {
        if ( typeof e == 'object' ) {
            e = e.toString();
        }

        let path = `${APP_PATH}/error.log`;

        let date = new Date();
        let timestamp = `${date.getFullYear()}-${Str.leading_zero(date.getMonth() + 1)}-${Str.leading_zero(date.getDate())}`+
            ` ${Str.leading_zero(date.getHours())}:${Str.leading_zero(date.getMinutes())}`;

        await Neutralino.filesystem.appendFile(path, `\n[${timestamp}] ${e}`);
    },

    async file_exists(path) {
        try {
            await Neutralino.filesystem.getStats(path);
            return true;
        }
        catch {
            return false;
        }
    },

    async ensure_dir(path) {
        try {
            await Neutralino.filesystem.createDirectory(path);
        }
        catch {}
    },

    async is_folder_empty(path) {
        try {
            let entries = await Neutralino.filesystem.readDirectory(path);
            return entries.length == 0;
        }
        catch {
            return true;
        }
    },
};

export default self;
