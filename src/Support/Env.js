let self = {
    async load(file_path) {
        let content = await Neutralino.filesystem.readFile(file_path);
        content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        let env = {};
        let lines = content.split('\n');

        for ( let line of lines ) {
            line = line.trim();

            if (!line || line.startsWith('#')) {
                continue;
            }

            // Find the first = sign
            const equal_index = line.indexOf('=');
            if ( equal_index === -1 ) {
                continue;
            }

            // Extract key and value
            const key = line.substring(0, equal_index).trim();
            let value = line.substring(equal_index + 1).trim();

            // Remove quotes if present
            if ( (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")) ) {
                value = value.slice(1, -1);
            }

            // Handle escaped characters in quoted strings
            value = value.replace(/\\n/g, '\n')
                .replace(/\\r/g, '\r')
                .replace(/\\t/g, '\t')
                .replace(/\\\\/g, '\\')
                .replace(/\\"/g, '"')
                .replace(/\\'/g, "'");

            env[key] = value;
        }

        return env;
    }
}

export default self;
