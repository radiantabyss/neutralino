export default async function() {
    let APP_PATH = await Neutralino.filesystem.getAbsolutePath('.');
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
        DISPLAY_PROFILE += `${display.resolution.width}_${display.resolution.height}_${window.devicePixelRatio}_`;
    }

    return {
        APP_PATH,
        STATIC_PATH,
        IS_PACKAGED,
        WINDOW_TYPE,
        DISPLAY_PROFILE,
        MAIN_WINDOW: null,
        UPDATE_WINDOW: null,
    }
}
