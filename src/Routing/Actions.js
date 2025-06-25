let Actions = {};
let context = import.meta.glob('/app/Domains/**/*.js');

const loadModules = async () => {
    const files = Object.keys(context);

    for ( let i = 0; i < files.length; i++ ) {
        let split = files[i].split('/');
        split.shift();
        let name = split[split.length - 1].replace('.js', '');
        split.pop();
        split.pop();
        split.shift();
        split.shift();

        if ( !name.match(/Action$/) || name == 'Action' ) {
            continue;
        }

        let module = await context[files[i]]();
        setNamespace(Actions, name, split, module);
    }
}

function setNamespace(Actions, name, namespace, module) {
    if ( !namespace.length ) {
        Actions[name] = module.default;
        return;
    }

    let first = namespace[0].replace(/-/g, ' ').replace(/_/g, ' ').replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(s) {
        return s.toUpperCase();
    }).replace(/ /g, '');

    namespace.shift();

    if ( !Actions[first] ) {
        Actions[first] = {};
    }

    setNamespace(Actions[first], name, namespace, module);
}

export default async () => {
    await loadModules();
    return Actions;
}
