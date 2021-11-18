import { Duck } from '../..';
import Debug from '../debug/debug';

export default class PluginManager {
	public plugins: {
		[key: string]: Duck.Types.Game.Plugin;
	};

	constructor() {
		this.plugins = {};
	}

	public registerPlugin(plugin: Duck.Types.Game.Plugin) {
		const foundPlugin = this.find(plugin.name);

		if (!foundPlugin) {
			this.plugins[plugin.name] = plugin;
		} else {
			new Debug.Error(
				`Cannot register plugin with name "${plugin.name}". Plugin with that name already exists.`
			);
		}
	}

	public unregisterPlugin(name: string) {
		const plugin = this.find(name);

		if (plugin) {
			delete this.plugins[name];
		}
	}

	public call(name: string) {
		const plugin = this.find(name);

		if (plugin) {
			plugin.func(...plugin.args);
		}
	}

	public find(name: string): Duck.Types.Game.Plugin | undefined {
		return this.plugins[name];
	}
}
