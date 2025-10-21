let TrayActions = {};
let context = import.meta.glob('/app/Tray/**/*.js');

//load context menu files
const loadModules = async () => {
	const files = Object.keys(context);

    for ( let i = 0; i < files.length; i++ ) {
		let split = files[i].split('/');
        let name = split[split.length - 1].replace('.js', '');
		let module = await context[files[i]]();
        TrayActions[name] = module.default;
    }
}

export default async (tray) => {
	if ( tray.for_window != WINDOW_TYPE ) {
		return;
	}

    await loadModules();

	for ( let item of tray.menuItems ) {
		if ( item.id && !TrayActions[item.id] ) {
			throw `Tray Action ${item.id} not found.`;
		}
	}

	Neutralino.events.on('trayMenuItemClicked', (e) => {
		TrayActions[e.detail.id].run();
    });

    Neutralino.os.setTray(tray);
};
