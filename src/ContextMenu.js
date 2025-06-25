let ContextMenuActions = {};
let context = import.meta.glob('/app/ContextMenu/**/*.js');

//load context menu files
const loadModules = async () => {
	const files = Object.keys(context);

    for ( let i = 0; i < files.length; i++ ) {
		let split = files[i].split('/');
        let name = split[split.length - 1].replace('.js', '');
		let module = await context[files[i]]();
        ContextMenuActions[name] = module.default;
    }
}

export default async (list) => {
    await loadModules();
};
