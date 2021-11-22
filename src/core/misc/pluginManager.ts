import { Duck } from '../..';
import Debug from '../debug/debug';

/**
 * @class PluginManager
 * @classdesc Creates a DuckEngine PluginManager
 * @description The PluginManager Class. Manages and handles plugins
 * @since 2.0.0
 */
export default class PluginManager {
	/**
	 * @memberof PluginManager
	 * @description An object that holds all registered plugins
	 * @type { [key: string]: Duck.Types.Game.Plugin; }
	 * @since 2.0.0
	 */
	public plugins: {
		[key: string]: Duck.Types.Game.Plugin;
	};

	/**
	 * @constructor PluginManager
	 * @description Creates a PluginManager instance
	 * @since 2.0.0
	 */
	constructor() {
		this.plugins = {};
	}

	/**
	 * @memberof PluginManager
	 * @description Registers a plugin and adds a plugin by its name to the plugins object
	 * @param {Duck.Types.Game.Plugin} plugin Plugin to add
	 * @since 2.0.0
	 */
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

	/**
	 * @memberof PluginManager
	 * @description Unregisters a plugin by its name
	 * @param {string} name Name of plugin to remove
	 * @since 2.0.0
	 */
	public unregisterPlugin(name: string) {
		const plugin = this.find(name);

		if (plugin) {
			delete this.plugins[name];
		}
	}

	/**
	 * @memberof PluginManager
	 * @description Calls/Runs a plugin by its name
	 * @param {string} name Name of plugin to call/run
	 * @since 2.0.0
	 */
	public call(name: string) {
		const plugin = this.find(name);

		if (plugin) {
			plugin.func(...plugin.args);
		}
	}

	/**
	 * @memberof PluginManager
	 * @description Finds a plugin by its name
	 * @param {string} name Name of plugin to find
	 * @returns Duck.Types.Game.Plugin
	 * @since 2.0.0
	 */
	public find(name: string): Duck.Types.Game.Plugin | undefined {
		return this.plugins[name];
	}
}
