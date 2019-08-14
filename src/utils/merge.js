/* eslint-disable */

/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200

/** Used to stand-in for `undefined` hash values. */
const HASH_UNDEFINED = '__lodash_hash_undefined__'

/** Used to detect hot functions by number of calls within a span of milliseconds. */
const HOT_COUNT = 800
const HOT_SPAN = 16

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991

/** `Object#toString` result references. */
const argsTag = '[object Arguments]'
const arrayTag = '[object Array]'
const asyncTag = '[object AsyncFunction]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const funcTag = '[object Function]'
const genTag = '[object GeneratorFunction]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const nullTag = '[object Null]'
const objectTag = '[object Object]'
const proxyTag = '[object Proxy]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const undefinedTag = '[object Undefined]'
const weakMapTag = '[object WeakMap]'

const arrayBufferTag = '[object ArrayBuffer]'
const dataViewTag = '[object DataView]'
const float32Tag = '[object Float32Array]'
const float64Tag = '[object Float64Array]'
const int8Tag = '[object Int8Array]'
const int16Tag = '[object Int16Array]'
const int32Tag = '[object Int32Array]'
const uint8Tag = '[object Uint8Array]'
const uint8ClampedTag = '[object Uint8ClampedArray]'
const uint16Tag = '[object Uint16Array]'
const uint32Tag = '[object Uint32Array]'

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g

/** Used to detect host constructors (Safari). */
const reIsHostCtor = /^\[object .+?Constructor\]$/

/** Used to detect unsigned integer values. */
const reIsUint = /^(?:0|[1-9]\d*)$/

/** Used to identify `toStringTag` values of typed arrays. */
const typedArrayTags = {}
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false

/** Detect free variable `global` from Node.js. */
const freeGlobal = typeof global === 'object' && global && global.Object === Object && global

/** Detect free variable `self`. */
const freeSelf = typeof self === 'object' && self && self.Object === Object && self

/** Used as a reference to the global object. */
const root = freeGlobal || freeSelf || Function('return this')()

/** Detect free variable `exports`. */
const freeExports = typeof exports === 'object' && exports && !exports.nodeType && exports

/** Detect free variable `module`. */
const freeModule = freeExports && typeof module === 'object' && module && !module.nodeType && module

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports

/** Detect free variable `process` from Node.js. */
const freeProcess = moduleExports && freeGlobal.process

/** Used to access faster Node.js helpers. */
const nodeUtil = (function () {
    try {
    // Use `util.types` for Node.js 10+.
        const types = freeModule && freeModule.require && freeModule.require('util').types

        if (types) {
            return types
        }

        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding('util')
    } catch (e) {}
}())

/* Node.js helper references. */
const nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply (func, thisArg, args) {
    switch (args.length) {
        case 0: return func.call(thisArg)
        case 1: return func.call(thisArg, args[0])
        case 2: return func.call(thisArg, args[0], args[1])
        case 3: return func.call(thisArg, args[0], args[1], args[2])
    }
    return func.apply(thisArg, args)
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes (n, iteratee) {
    let index = -1
    const result = Array(n)

    while (++index < n) {
        result[index] = iteratee(index)
    }
    return result
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary (func) {
    return function (value) {
        return func(value)
    }
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue (object, key) {
    return object == null ? undefined : object[key]
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg (func, transform) {
    return function (arg) {
        return func(transform(arg))
    }
}

/** Used for built-in method references. */
const arrayProto = Array.prototype
const funcProto = Function.prototype
const objectProto = Object.prototype

/** Used to detect overreaching core-js shims. */
const coreJsData = root['__core-js_shared__']

/** Used to resolve the decompiled source of functions. */
const funcToString = funcProto.toString

/** Used to check objects for own properties. */
const { hasOwnProperty } = objectProto

/** Used to detect methods masquerading as native. */
const maskSrcKey = (function () {
    const uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '')
    return uid ? (`Symbol(src)_1.${uid}`) : ''
}())

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
const nativeObjectToString = objectProto.toString

/** Used to infer the `Object` constructor. */
const objectCtorString = funcToString.call(Object)

/** Used to detect if a method is native. */
const reIsNative = RegExp(`^${
    funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')}$`)

/** Built-in value references. */
const Buffer = moduleExports ? root.Buffer : undefined
const { Symbol } = root
const { Uint8Array } = root
const allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined
const getPrototype = overArg(Object.getPrototypeOf, Object)
const objectCreate = Object.create
const { propertyIsEnumerable } = objectProto
const { splice } = arrayProto
const symToStringTag = Symbol ? Symbol.toStringTag : undefined

const defineProperty = (function () {
    try {
        const func = getNative(Object, 'defineProperty')
        func({}, '', {})
        return func
    } catch (e) {}
}())

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined
const nativeMax = Math.max
const nativeNow = Date.now

/* Built-in method references that are verified to be native. */
const Map = getNative(root, 'Map')
const nativeCreate = getNative(Object, 'create')

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
const baseCreate = (function () {
    function object () {}
    return function (proto) {
        if (!isObject(proto)) {
            return {}
        }
        if (objectCreate) {
            return objectCreate(proto)
        }
        object.prototype = proto
        const result = new object()
        object.prototype = undefined
        return result
    }
}())

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash (entries) {
    let index = -1
    const length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
        const entry = entries[index]
        this.set(entry[0], entry[1])
    }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear () {
    this.__data__ = nativeCreate ? nativeCreate(null) : {}
    this.size = 0
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete (key) {
    const result = this.has(key) && delete this.__data__[key]
    this.size -= result ? 1 : 0
    return result
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet (key) {
    const data = this.__data__
    if (nativeCreate) {
        const result = data[key]
        return result === HASH_UNDEFINED ? undefined : result
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas (key) {
    const data = this.__data__
    return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key)
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet (key, value) {
    const data = this.__data__
    this.size += this.has(key) ? 0 : 1
    data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value
    return this
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear
Hash.prototype.delete = hashDelete
Hash.prototype.get = hashGet
Hash.prototype.has = hashHas
Hash.prototype.set = hashSet

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache (entries) {
    let index = -1
    const length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
        const entry = entries[index]
        this.set(entry[0], entry[1])
    }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear () {
    this.__data__ = []
    this.size = 0
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete (key) {
    const data = this.__data__
    const index = assocIndexOf(data, key)

    if (index < 0) {
        return false
    }
    const lastIndex = data.length - 1
    if (index == lastIndex) {
        data.pop()
    } else {
        splice.call(data, index, 1)
    }
    --this.size
    return true
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet (key) {
    const data = this.__data__
    const index = assocIndexOf(data, key)

    return index < 0 ? undefined : data[index][1]
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas (key) {
    return assocIndexOf(this.__data__, key) > -1
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet (key, value) {
    const data = this.__data__
    const index = assocIndexOf(data, key)

    if (index < 0) {
        ++this.size
        data.push([key, value])
    } else {
        data[index][1] = value
    }
    return this
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear
ListCache.prototype.delete = listCacheDelete
ListCache.prototype.get = listCacheGet
ListCache.prototype.has = listCacheHas
ListCache.prototype.set = listCacheSet

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache (entries) {
    let index = -1
    const length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
        const entry = entries[index]
        this.set(entry[0], entry[1])
    }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear () {
    this.size = 0
    this.__data__ = {
        hash: new Hash(),
        map: new (Map || ListCache)(),
        string: new Hash(),
    }
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete (key) {
    const result = getMapData(this, key).delete(key)
    this.size -= result ? 1 : 0
    return result
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet (key) {
    return getMapData(this, key).get(key)
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas (key) {
    return getMapData(this, key).has(key)
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet (key, value) {
    const data = getMapData(this, key)
    const { size } = data

    data.set(key, value)
    this.size += data.size == size ? 0 : 1
    return this
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear
MapCache.prototype.delete = mapCacheDelete
MapCache.prototype.get = mapCacheGet
MapCache.prototype.has = mapCacheHas
MapCache.prototype.set = mapCacheSet

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack (entries) {
    const data = this.__data__ = new ListCache(entries)
    this.size = data.size
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear () {
    this.__data__ = new ListCache()
    this.size = 0
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete (key) {
    const data = this.__data__
    const result = data.delete(key)

    this.size = data.size
    return result
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet (key) {
    return this.__data__.get(key)
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas (key) {
    return this.__data__.has(key)
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet (key, value) {
    let data = this.__data__
    if (data instanceof ListCache) {
        const pairs = data.__data__
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
            pairs.push([key, value])
            this.size = ++data.size
            return this
        }
        data = this.__data__ = new MapCache(pairs)
    }
    data.set(key, value)
    this.size = data.size
    return this
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear
Stack.prototype.delete = stackDelete
Stack.prototype.get = stackGet
Stack.prototype.has = stackHas
Stack.prototype.set = stackSet

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys (value, inherited) {
    const isArr = isArray(value)
    const isArg = !isArr && isArguments(value)
    const isBuff = !isArr && !isArg && isBuffer(value)
    const isType = !isArr && !isArg && !isBuff && isTypedArray(value)
    const skipIndexes = isArr || isArg || isBuff || isType
    const result = skipIndexes ? baseTimes(value.length, String) : []
    const { length } = result

    for (const key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
        // Safari 9 has enumerable `arguments.length` in strict mode.
            key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
            result.push(key)
        }
    }
    return result
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue (object, key, value) {
    if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value)
    }
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue (object, key, value) {
    const objValue = object[key]
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value)
    }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf (array, key) {
    let { length } = array
    while (length--) {
        if (eq(array[length][0], key)) {
            return length
        }
    }
    return -1
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue (object, key, value) {
    if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            value,
            writable: true,
        })
    } else {
        object[key] = value
    }
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
const baseFor = createBaseFor()

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag (value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag
    }
    return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value)
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments (value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative (value) {
    if (!isObject(value) || isMasked(value)) {
        return false
    }
    const pattern = isFunction(value) ? reIsNative : reIsHostCtor
    return pattern.test(toSource(value))
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray (value) {
    return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)]
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn (object) {
    if (!isObject(object)) {
        return nativeKeysIn(object)
    }
    const isProto = isPrototype(object)
    const result = []

    for (const key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key)
        }
    }
    return result
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge (object, source, srcIndex, customizer, stack) {
    if (object === source) {
        return
    }
    baseFor(source, (srcValue, key) => {
        stack || (stack = new Stack())
        if (isObject(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack)
        } else {
            let newValue = customizer
                ? customizer(safeGet(object, key), srcValue, (`${key}`), object, source, stack)
                : undefined

            if (newValue === undefined) {
                newValue = srcValue
            }
            assignMergeValue(object, key, newValue)
        }
    }, keysIn)
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep (object, source, key, srcIndex, mergeFunc, customizer, stack) {
    const objValue = safeGet(object, key)
    const srcValue = safeGet(source, key)
    const stacked = stack.get(srcValue)

    if (stacked) {
        assignMergeValue(object, key, stacked)
        return
    }
    let newValue = customizer
        ? customizer(objValue, srcValue, (`${key}`), object, source, stack)
        : undefined

    let isCommon = newValue === undefined

    if (isCommon) {
        const isArr = isArray(srcValue)
        const isBuff = !isArr && isBuffer(srcValue)
        const isTyped = !isArr && !isBuff && isTypedArray(srcValue)

        newValue = srcValue
        if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
                newValue = objValue
            } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue)
            } else if (isBuff) {
                isCommon = false
                newValue = cloneBuffer(srcValue, true)
            } else if (isTyped) {
                isCommon = false
                newValue = cloneTypedArray(srcValue, true)
            } else {
                newValue = []
            }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue
            if (isArguments(objValue)) {
                newValue = toPlainObject(objValue)
            } else if (!isObject(objValue) || isFunction(objValue)) {
                newValue = initCloneObject(srcValue)
            }
        } else {
            isCommon = false
        }
    }
    if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue)
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack)
        stack.delete(srcValue)
    }
    assignMergeValue(object, key, newValue)
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest (func, start) {
    return setToString(overRest(func, start, identity), `${func}`)
}

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
const baseSetToString = !defineProperty ? identity : function (func, string) {
    return defineProperty(func, 'toString', {
        configurable: true,
        enumerable: false,
        value: constant(string),
        writable: true,
    })
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer (buffer, isDeep) {
    if (isDeep) {
        return buffer.slice()
    }
    const { length } = buffer
    const result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length)

    buffer.copy(result)
    return result
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer (arrayBuffer) {
    const result = new arrayBuffer.constructor(arrayBuffer.byteLength)
    new Uint8Array(result).set(new Uint8Array(arrayBuffer))
    return result
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray (typedArray, isDeep) {
    const buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length)
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray (source, array) {
    let index = -1
    const { length } = source

    array || (array = Array(length))
    while (++index < length) {
        array[index] = source[index]
    }
    return array
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject (source, props, object, customizer) {
    const isNew = !object
    object || (object = {})

    let index = -1
    const { length } = props

    while (++index < length) {
        const key = props[index]

        let newValue = customizer
            ? customizer(object[key], source[key], key, object, source)
            : undefined

        if (newValue === undefined) {
            newValue = source[key]
        }
        if (isNew) {
            baseAssignValue(object, key, newValue)
        } else {
            assignValue(object, key, newValue)
        }
    }
    return object
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner (assigner) {
    return baseRest((object, sources) => {
        let index = -1
        let { length } = sources
        let customizer = length > 1 ? sources[length - 1] : undefined
        const guard = length > 2 ? sources[2] : undefined

        customizer = (assigner.length > 3 && typeof customizer === 'function')
            ? (length--, customizer)
            : undefined

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined : customizer
            length = 1
        }
        object = Object(object)
        while (++index < length) {
            const source = sources[index]
            if (source) {
                assigner(object, source, index, customizer)
            }
        }
        return object
    })
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor (fromRight) {
    return function (object, iteratee, keysFunc) {
        let index = -1
        const iterable = Object(object)
        const props = keysFunc(object)
        let { length } = props

        while (length--) {
            const key = props[fromRight ? length : ++index]
            if (iteratee(iterable[key], key, iterable) === false) {
                break
            }
        }
        return object
    }
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData (map, key) {
    const data = map.__data__
    return isKeyable(key)
        ? data[typeof key === 'string' ? 'string' : 'hash']
        : data.map
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative (object, key) {
    const value = getValue(object, key)
    return baseIsNative(value) ? value : undefined
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag (value) {
    const isOwn = hasOwnProperty.call(value, symToStringTag)
    const tag = value[symToStringTag]

    try {
        value[symToStringTag] = undefined
        var unmasked = true
    } catch (e) {}

    const result = nativeObjectToString.call(value)
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag] = tag
        } else {
            delete value[symToStringTag]
        }
    }
    return result
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject (object) {
    return (typeof object.constructor === 'function' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {}
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex (value, length) {
    const type = typeof value
    length = length == null ? MAX_SAFE_INTEGER : length

    return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length)
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall (value, index, object) {
    if (!isObject(object)) {
        return false
    }
    const type = typeof index
    if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
    ) {
        return eq(object[index], value)
    }
    return false
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable (value) {
    const type = typeof value
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null)
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked (func) {
    return !!maskSrcKey && (maskSrcKey in func)
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype (value) {
    const Ctor = value && value.constructor
    const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto

    return value === proto
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn (object) {
    const result = []
    if (object != null) {
        for (const key in Object(object)) {
            result.push(key)
        }
    }
    return result
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString (value) {
    return nativeObjectToString.call(value)
}

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest (func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0)
    return function () {
        const args = arguments
        let index = -1
        const length = nativeMax(args.length - start, 0)
        const array = Array(length)

        while (++index < length) {
            array[index] = args[start + index]
        }
        index = -1
        const otherArgs = Array(start + 1)
        while (++index < start) {
            otherArgs[index] = args[index]
        }
        otherArgs[start] = transform(array)
        return apply(func, this, otherArgs)
    }
}

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet (object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
        return
    }

    if (key == '__proto__') {
        return
    }

    return object[key]
}

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString)

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut (func) {
    let count = 0
    let lastCalled = 0

    return function () {
        const stamp = nativeNow()
        const remaining = HOT_SPAN - (stamp - lastCalled)

        lastCalled = stamp
        if (remaining > 0) {
            if (++count >= HOT_COUNT) {
                return arguments[0]
            }
        } else {
            count = 0
        }
        return func.apply(undefined, arguments)
    }
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource (func) {
    if (func != null) {
        try {
            return funcToString.call(func)
        } catch (e) {}
        try {
            return (`${func}`)
        } catch (e) {}
    }
    return ''
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq (value, other) {
    return value === other || (value !== value && other !== other)
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function () { return arguments }()) ? baseIsArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee')
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var { isArray } = Array

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike (value) {
    return value != null && isLength(value.length) && !isFunction(value)
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject (value) {
    return isObjectLike(value) && isArrayLike(value)
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction (value) {
    if (!isObject(value)) {
        return false
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    const tag = baseGetTag(value)
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength (value) {
    return typeof value === 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject (value) {
    const type = typeof value
    return value != null && (type == 'object' || type == 'function')
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike (value) {
    return value != null && typeof value === 'object'
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject (value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false
    }
    const proto = getPrototype(value)
    if (proto === null) {
        return true
    }
    const Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor
    return typeof Ctor === 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject (value) {
    return copyObject(value, keysIn(value))
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn (object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object)
}

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
const merge = createAssigner((object, source, srcIndex) => {
    baseMerge(object, source, srcIndex)
})

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant (value) {
    return function () {
        return value
    }
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity (value) {
    return value
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse () {
    return false
}

export default merge
