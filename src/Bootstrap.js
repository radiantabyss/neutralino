import Request from './Request.js';
import Response from './Response.js';
import Invoke from './Invoke.js';
import Validator from './Validator.js';
import IPC from './IPC.js';

import Config from './Support/Config.js';
import Env from './Support/Env.js';
import Helpers from './Support/Helpers.js';
import Item from './Support/Item.js';
import Items from './Support/Items.js';
import Str from './Support/Str.js';

export default async () => {
    //helpers
    for ( let key in Helpers ) {
        window[key] = Helpers[key];
    }

    window.Config = Config;
    window.Env = Env;
    window.Item = Item;
    window.Items = Items;
    window.Str = Str;

    window.Request = Request;
    window.Response = Response;
    window.Invoke = Invoke;
    window.Validator = Validator;
    window.IPC = IPC;
};
