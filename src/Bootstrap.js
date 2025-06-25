import Response from './Response.js';
import Invoke from './Invoke.js';
import Validator from './Validator.js';
import IPC from './IPC.js';

import Config from './Support/Config.js';
import Env from './Support/Env.js';
import Helpers from './Support/Helpers.js';

export default () => {
    //helpers
    for ( let key in Helpers ) {
        window[key] = Helpers[key];
    }

    window.RA = {};
    window.Config = Config;
    window.Env = Env;

    window.Response = Response;
    window.Invoke = Invoke;
    window.Validator = Validator;
    window.IPC = IPC;
};
