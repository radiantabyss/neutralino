// MIDDLEWARE IS NOT USED AT THE MOMENT
//
//
//
let Middleware = {};
let context = import.meta.glob('/app/Http/Middleware/**/*.js');

const loadModules = async () => {
    const files = Object.keys(context);

    for ( let i = 0; i < files.length; i++ ) {
        let split = files[i].split('/');
        let name = split[split.length - 1].replace('.js', '').replace('Middleware', '');
        let module = await context[files[i]]();
        Middleware[name] = module.default;
    }
}

let runMiddleware = async (to, from, i = 0) => {
    //reached end, then everything passed
    if ( i == to.meta.middleware.length ) {
        return;
    }

    //middleware doesnt exist
    if ( !Middleware[to.meta.middleware[i]] ) {
        throw new Error(`${to.meta.middleware[i]} Middleware not found.`);
    }

    //run middleware
    await Middleware[to.meta.middleware[i]](to, from);
    await runMiddleware(to, from, i + 1);
}

export default async () => {
    await loadModules();

    return async (to, from) => {
        if ( !to.meta || !to.meta.middleware ) {
            return;
        }

        return runMiddleware(to, from);
    };
}
