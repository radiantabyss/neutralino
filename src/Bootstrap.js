import Response from './Response.js';
import Invoked from './Invoked.js';
import Validator from './Validator.js';
import IPC from './IPC.js';

import Globals from './Support/Globals.js';
import Config from './Support/Config.js';
import Storage from './Support/Storage.js';
import Helpers from './Support/Helpers.js';
import Item from './Support/Item';
import Items from './Support/Items';

window.RA = {};

export default async () => {
    Neutralino.init();

    window.Config = Config;
    window.Storage = Storage;
    window.Item = Item;
    window.Items = Items;

    //globals
    let globals = await Globals();
    for (let key in globals) {
        window[key] = globals[key];
    }

    //helpers
    for ( let key in Helpers ) {
        window[key] = Helpers[key];
    }

    window.Response = Response;
    window.Invoked = Invoked;
    window.Validator = Validator;
    window.IPC = IPC;
};
