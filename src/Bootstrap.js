import Response from './Response.js';
import Invoked from './Invoked.js';
import Validator from './Validator.js';
import IPC from './IPC.js';

import Config from './Support/Config.js';
import Env from './Support/Env.js';
import Helpers from './Support/Helpers.js';

window.RA.Neu = {};

export default () => {
    //helpers
    for ( let key in Helpers ) {
        window[key] = Helpers[key];
    }

    window.Config = Config;
    window.Env = Env;

    window.Response = Response;
    window.Invoked = Invoked;
    window.Validator = Validator;
    window.IPC = IPC;
};
