import Env from './Env.js';

export default async function() {
    //load env
    let ENV = await Env.load(`.env`);

    for ( let key in ENV ) {
        if ( ENV[key] === 'true' ) {
            ENV[key] = true;
        }
        else if ( ENV[key] === 'false' ) {
            ENV[key] = false;
        }
    }

    let APP_PATH = '.';
    let IS_PACKAGED = NL_RESMODE == 'bundle';
    let STATIC_PATH = `${APP_PATH}/static`;

    //set window type
    let WINDOW_TYPE = 'main';
    for ( let arg of NL_ARGS ) {
        if ( arg.match(/--window-type/) ) {
            WINDOW_TYPE = arg.replace(/--window-type=/, '');
        }
    }

    //set display profile
    let DISPLAY_PROFILE = '';
    for ( let display of await Neutralino.computer.getDisplays() ) {
        DISPLAY_PROFILE += `${display.resolution.width}_${display.resolution.height}_`;
    }

    return {
        ENV,
        APP_PATH,
        STATIC_PATH,
        IS_PACKAGED,
        WINDOW_TYPE,
        DISPLAY_PROFILE,
        MAIN_WINDOW: null,
        UPDATE_WINDOW: null,
        SEQUELIZE: null,
    }
}
