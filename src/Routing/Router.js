import Actions from './Actions.js';
import Middleware from './Middleware.js';
import RouteFiles from './RouteFiles.js';
import Route from './Route.js';
import RouteCrud from './RouteCrud.js';

window.RA.RouteFiles = RouteFiles;
window.RA.Route = Route;
window.RA.RouteCrud = RouteCrud;

let Routes = [];

//load route files
let context = import.meta.glob('/app/Routes/**/*.js');

const loadModules = async () => {
    window.RA.Actions = await Actions();
    const files = Object.keys(context);

    for ( let i = 0; i < files.length; i++ ) {
        let file = files[i].replace('/app/Routes/', '').replace(/\.js$/, '');
        window.RA.__neutralino_route_file = file;

        if ( !window.RA.RouteFiles[window.RA.__neutralino_route_file] ) {
            window.RA.RouteFiles[window.RA.__neutralino_route_file] = [];
        }

        await context[files[i]]();
    }
}

const match = async(args) => {
    let matched = null;
    let params = [];

    //check for exact matches
    for ( let Route of Routes ) {
        if ( Route.path == args.path && Route.method == args.method ) {
            matched = Route;
            break;
        }
    }

    //check for routes with params
    if ( !matched ) {
        for ( let Route of Routes ) {
            if ( !Route.path.match(/\{.*\}/) ) {
                continue;
            }

            //check if route matches
            let regex_string = Route.path.replace(/\{(.*?)\}/g, '([^\/]*?)') + '\/$';
            let regex = new RegExp(regex_string, 'g');

            //add trailing slash to path for regex
            let path = args.path.replace(/\/$/, '') + '/';
            let match = regex.exec(path);
            if ( !match ) {
                continue;
            }

            //check method
            if ( Route.method != args.method ) {
                continue;
            }

            matched = Route;

            for (let i = 1; i < match.length; i++) {
                params.push(match[i]);
            }

            break;
        }
    }

    Invoked.data = args.payload;

    return {
        Route: matched,
        params,
        path: args.path,
        payload: args.payload,
    };
}

export default async () => {
    // let runMiddleware = await Middleware();
    await loadModules();

    //handle route matching
    IPC.handle('invoke', async (args) => {
        args.payload = JSON.parse(args.payload);

        let matched = await match(args);
        if ( !matched.Route ) {
            throw `Route "${matched.path}" not found.`;
        }

        return await matched.Route.component.run(...matched.params);
    });

    let Router = {
        addRoute(Route) {
            Routes.push(Route);
        },
    };

    return { Router, RouteFiles };
};
