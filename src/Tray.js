let TrayActions = {};
let context = import.meta.glob('/app/Tray/**/*.js');
let inited = false;

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

	if ( !inited ) {
	    await loadModules();

		for ( let item of tray.menuItems ) {
			if ( !item.id ) {
				continue;
			}

			let split = item.id.split('/');
			if ( !TrayActions[split[0]] ) {
				throw `Tray Action "${item.id}" not found.`;
			}
		}

		Neutralino.events.on('trayMenuItemClicked', (e) => {
			let split = e.detail.id.split('/');
			let action_name = split[0];
			split.shift();
			TrayActions[action_name].run.apply(this, split);
	    });

		inited = true;
	}

    Neutralino.os.setTray(tray);
};
