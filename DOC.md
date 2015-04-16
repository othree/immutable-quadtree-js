## Classes
<dl>
<dt><a href="#ImmutableQuadTree">ImmutableQuadTree</a></dt>
<dd></dd>
</dl>
## Typedefs
<dl>
<dt><a href="#identity">identity</a> ⇒ <code>string</code></dt>
<dd><p>Grab id from given data. Id is used to make sure data points are unique, no duplication.
    This is only interface defination. Default identity function will grab <em>id</em> property of given object.
    If id of data point isn&#39;t <em>id</em>. You will need to define your own identity function follow this interface.</p>
</dd>
<dt><a href="#mapfunc">mapfunc</a> ⇒ <code>T</code></dt>
<dd><p>Mapping function</p>
</dd>
<dt><a href="#route">route</a> : <code>string</code></dt>
<dd><p>A string only contains <code>0</code>, <code>1</code>, <code>2</code>, <code>3</code></p>
</dd>
<dt><a href="#reducefunc">reducefunc</a> ⇒ <code>S</code></dt>
<dd><p>Reducing function</p>
</dd>
</dl>
<a name="ImmutableQuadTree"></a>
## ImmutableQuadTree
**Kind**: global class  
**Template**: T, S  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ObjectType | <code>[ImmutableObjectType](#ImmutableObjectType)</code> | Native object(map) data type tool |
| ArrayType | <code>ImmutableArrayType</code> | Native array(list) data type tool |


* [ImmutableQuadTree](#ImmutableQuadTree)
  * [new ImmutableQuadTree(levels, options)](#new_ImmutableQuadTree_new)
  * [.map(qroute, f)](#ImmutableQuadTree.map) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
  * [.reduce(qroute, f)](#ImmutableQuadTree.reduce) ⇒ <code>S</code>
  * [.add(qroute, data)](#ImmutableQuadTree.add) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
  * [.remove(qroute, data)](#ImmutableQuadTree.remove) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
  * [.clean(qroute)](#ImmutableQuadTree.clean) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
  * [.keep(qroute)](#ImmutableQuadTree.keep) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
  * [.query(qroute)](#ImmutableQuadTree.query) ⇒ <code>Array.&lt;T&gt;</code>
  * [.get()](#ImmutableQuadTree.get) ⇒ <code>Array.&lt;T&gt;</code>

<a name="new_ImmutableQuadTree_new"></a>
### new ImmutableQuadTree(levels, options)
Basic Immutable Quad Tree class


| Param | Type | Description |
| --- | --- | --- |
| levels | <code>number</code> | Quad tree levels |
| options |  | Options |
| options.datatype |  | Leaf node data tool |
| options.identity |  | Function to get id of leaf data |

<a name="ImmutableQuadTree.map"></a>
### ImmutableQuadTree.map(qroute, f) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
Map to every leaf data since given route.

**Kind**: static method of <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>  
**Returns**: <code>[ImmutableQuadTree](#ImmutableQuadTree)</code> - New tree  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>string</code> | Route of map root. |
| f | <code>[mapfunc](#mapfunc)</code> | Function will execute on every leaf data. |

<a name="ImmutableQuadTree.reduce"></a>
### ImmutableQuadTree.reduce(qroute, f) ⇒ <code>S</code>
Reduce every leaf data since given route.

**Kind**: static method of <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>  
**Returns**: <code>S</code> - Reduced value  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>string</code> | Route of reduce root. |
| f | <code>[reducefunc](#reducefunc)</code> | Reducing function |

<a name="ImmutableQuadTree.add"></a>
### ImmutableQuadTree.add(qroute, data) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
Add data to leaf node

**Kind**: static method of <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>  
**Returns**: <code>[ImmutableQuadTree](#ImmutableQuadTree)</code> - New tree if any change. Self if no change.  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>[route](#route)</code> | Full length route. |
| data | <code>T</code> | Data store to leaf node |

<a name="ImmutableQuadTree.remove"></a>
### ImmutableQuadTree.remove(qroute, data) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
Remove data to leaf node

**Kind**: static method of <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>  
**Returns**: <code>[ImmutableQuadTree](#ImmutableQuadTree)</code> - New tree if any change. Self if no change.  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>[route](#route)</code> | Full length route. |
| data | <code>T</code> | Data store to leaf node |

<a name="ImmutableQuadTree.clean"></a>
### ImmutableQuadTree.clean(qroute) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
Clean all data under route

**Kind**: static method of <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>  
**Returns**: <code>[ImmutableQuadTree](#ImmutableQuadTree)</code> - New tree if any change. Self if no change.  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>[route](#route)</code> | Route to clean. |

<a name="ImmutableQuadTree.keep"></a>
### ImmutableQuadTree.keep(qroute) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
Remove all data except given route.

**Kind**: static method of <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>  
**Returns**: <code>[ImmutableQuadTree](#ImmutableQuadTree)</code> - New tree if any change. Self if no change.  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>[route](#route)</code> | Data under the route will keep |

<a name="ImmutableQuadTree.query"></a>
### ImmutableQuadTree.query(qroute) ⇒ <code>Array.&lt;T&gt;</code>
Query all data under qroute

**Kind**: static method of <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>  
**Returns**: <code>Array.&lt;T&gt;</code> - Array of query data on leaf nodes  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>[route](#route)</code> | Data under the route will return |

<a name="ImmutableQuadTree.get"></a>
### ImmutableQuadTree.get() ⇒ <code>Array.&lt;T&gt;</code>
Getter to query all data under root

**Kind**: static method of <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>  
**Returns**: <code>Array.&lt;T&gt;</code> - Array of all data on leaf nodes  
**Properties**

| Name |
| --- |
| query | 

<a name="identity"></a>
## identity ⇒ <code>string</code>
Grab id from given data. Id is used to make sure data points are unique, no duplication.
    This is only interface defination. Default identity function will grab *id* property of given object.
    If id of data point isn't *id*. You will need to define your own identity function follow this interface.

**Kind**: global typedef  
**Returns**: <code>string</code> - id  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Data to grab id. |

<a name="mapfunc"></a>
## mapfunc ⇒ <code>T</code>
Mapping function

**Kind**: global typedef  
**Returns**: <code>T</code> - If return, then map will create a new data store.
    If you don't make any change, return nothing.  
**Template**: T  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>T</code> | Data received |

<a name="route"></a>
## route : <code>string</code>
A string only contains `0`, `1`, `2`, `3`

**Kind**: global typedef  
<a name="reducefunc"></a>
## reducefunc ⇒ <code>S</code>
Reducing function

**Kind**: global typedef  
**Returns**: <code>S</code> - Returned reduced value  
**Template**: T, S  

| Param | Type | Description |
| --- | --- | --- |
| prev | <code>S</code> | Previous value |
| curr | <code>T</code> | Current value, the data received |

<a name="ImmutableObjectType"></a>
## ~ImmutableObjectType
**Kind**: inner class  
**Template**: T  

* [~ImmutableObjectType](#ImmutableObjectType)
  * [new ImmutableObjectType([identity])](#new_ImmutableObjectType_new)
  * [.add(obj, data)](#ImmutableObjectType.add) ⇒ <code>Object</code>
  * [.remove(obj, data)](#ImmutableObjectType.remove) ⇒ <code>Object</code>
  * [.map(f)](#ImmutableObjectType.map) ⇒ <code>Object</code>

<a name="new_ImmutableObjectType_new"></a>
### new ImmutableObjectType([identity])
Leaf node data type tool for native object. Behaves like immutable map


| Param | Type | Description |
| --- | --- | --- |
| [identity] | <code>[identity](#identity)</code> | function to get data id |

<a name="ImmutableObjectType.add"></a>
### ImmutableObjectType.add(obj, data) ⇒ <code>Object</code>
Add data to the object

**Kind**: static method of <code>[ImmutableObjectType](#ImmutableObjectType)</code>  
**Returns**: <code>Object</code> - Return new object if any change, original object if no change  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The data store native object |
| data | <code>T</code> | Data to store to the object |

<a name="ImmutableObjectType.remove"></a>
### ImmutableObjectType.remove(obj, data) ⇒ <code>Object</code>
Remove data from the object

**Kind**: static method of <code>[ImmutableObjectType](#ImmutableObjectType)</code>  
**Returns**: <code>Object</code> - Return new object if any change, original object if no change  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The data store native object |
| data | <code>T</code> | Data to remove from the object |

<a name="ImmutableObjectType.map"></a>
### ImmutableObjectType.map(f) ⇒ <code>Object</code>
Map f function on all data, behaves like immutable.

**Kind**: static method of <code>[ImmutableObjectType](#ImmutableObjectType)</code>  
**Returns**: <code>Object</code> - Return new object if any change, original object if no change  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>[mapfunc](#mapfunc)</code> | Mapping function |

