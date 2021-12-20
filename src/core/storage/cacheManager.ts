/* eslint-disable @typescript-eslint/no-explicit-any */
import Debug from '../debug/debug';

/**
 * @class CacheManager
 * @classdesc Creates a CacheManager
 * @description The CacheManager Class. Manages Cached items in memory and in storage
 * @since 2.0.0
 */
export default class CacheManager {
	protected cache: {
		[key: string]: string;
	};

	/**
	 * @memberof CacheManager
	 * @description Added start of every key that is stored in the localStorage, defaults to "DuckEngine_CacheManager_${key}"
	 * @type string
	 * @since 2.0.0
	 */
	public storageIdentifier: string;

	/**
	 * @constructor CacheManager
	 * @description Creates a CacheManager instance
	 * @since 2.0.0
	 */
	constructor() {
		this.cache = {};
		this.storageIdentifier = 'DuckEngine_CacheManager_';

		this.syncValues();
	}

	protected syncValues() {
		this.cache = { ...localStorage };
	}

	/**
	 * @memberof CacheManager
	 * @description Sets a Key-Value pair in the memory-cache and storage
	 * @param {string} name Name/Key to save the value to
	 * @param {string} value Value to save to the Name/Key
	 * @since 2.0.0
	 */
	public set(name: string, value: string) {
		this.cache[name] = value;
		localStorage.setItem(`${this.storageIdentifier}${name}`, value);
	}

	/**
	 * @memberof CacheManager
	 * @description Gets a value from a Name/Key from the storage or memory-cache
	 * @param {string} name Name/Key to get the value from
	 * @returns {string}
	 * @since 2.0.0
	 */
	public get(name: string): string | undefined | null {
		return (
			localStorage.getItem(`${this.storageIdentifier}${name}`) ||
			this.cache[name]
		);
	}

	/**
	 * @memberof CacheManager
	 * @description Deletes a Key-Value pair from the memory-cache and storage
	 * @param {string} name Name/Key to use to delete the pair
	 * @since 2.0.0
	 */
	public delete(name: string) {
		if (this.has(name)) {
			delete this.cache[name];
			localStorage.removeItem(`${this.storageIdentifier}${name}`);
		} else {
			new Debug.Error(
				`CacheManager: Cannot delete from values with name "${name}". "${name}" does not exist as an entry.`
			);
		}
	}

	/**
	 * @memberof CacheManager
	 * @description Gets a Key-Value pair from the storage or memory-cache and returns based on if it exists or not
	 * @param {string} name Name/Key to save the value to
	 * @since 2.0.0
	 */
	public has(name: string): boolean {
		const e =
			localStorage.getItem(`${this.storageIdentifier}${name}`) ||
			this.cache[name];

		return e ? true : false;
	}

	/**
	 * @memberof CacheManager
	 * @description Returns the keys from the memory-cache
	 * @returns {string[]}
	 * @since 2.0.0
	 */
	public keys() {
		return Object.keys(this.cache);
	}

	/**
	 * @memberof CacheManager
	 * @description Returns the values from the memory-cache
	 * @returns {string[]}
	 * @since 2.0.0
	 */
	public values() {
		return Object.values(this.cache);
	}

	/**
	 * @memberof CacheManager
	 * @description Loops through each entry in the memory-cache
	 * @param { (key:string,value:string) => any } cb Callback function
	 * @since 2.0.0
	 */
	public each(cb: (key: string, value: string) => any) {
		for (const key in this.cache) {
			if (Object.prototype.hasOwnProperty.call(this.cache, key)) {
				cb(key, this.cache[key]);
			}
		}
	}

	/**
	 * @memberof CacheManager
	 * @description Returns the memory-cache entries as an object
	 * @returns {{[key: string]: string}}
	 * @since 2.0.0
	 */
	public get entries() {
		this.syncValues();
		return this.cache;
	}
}
