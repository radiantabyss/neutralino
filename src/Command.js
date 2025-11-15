let context = import.meta.glob('/app/Domains/**/*.js');

const getMatchedCommand = async () => {
    const files = Object.keys(context);

    for ( let i = 0; i < files.length; i++ ) {
        let split = files[i].split('/');
        split.shift();
        let name = split[split.length - 1].replace('.js', '');
        split.pop();
        split.pop();
        split.shift();
        split.shift();

        if ( !name.match(/Command/) || name == 'Command' ) {
            continue;
        }

        let module = await context[files[i]]();
        let signature_split = module.default.signature.split(' ');
        if ( signature_split[0] == NL_ARGS[1] ) {
            return module.default;
        }
    }

    return null;
}

export default async () => {
    let command = await getMatchedCommand();
    await Neutralino.os.execCommand('cmd /c echo');

    if ( !command ) {
        throw `Command with signature "${NL_ARGS[1]}" not found.`;
    }

    let args = NL_ARGS;
    args.shift();
    args.shift();
    await command.run.apply(this, args);
}
