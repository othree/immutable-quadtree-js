## Classes
<dl>
<dt><a href="#ImmutableQuadTree">ImmutableQuadTree</a></dt>
<dd></dd>
</dl>
<a name="ImmutableQuadTree"></a>
## ImmutableQuadTree
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ObjectType | <code>[ImmutableObjectType](#ImmutableObjectType)</code> | Native object(map) data type tool |
| ArrayType | <code>ImmutableArrayType</code> | Native array(list) data type tool |


* [ImmutableQuadTree](#ImmutableQuadTree)
  * [new ImmutableQuadTree(levels, options)](#new_ImmutableQuadTree_new)
  * [.map(qroute, f)](#ImmutableQuadTree.map) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
  * [.add(qroute, data)](#ImmutableQuadTree.add) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
  * [.remove(qroute, data)](#ImmutableQuadTree.remove) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
  * [.clean(qroute)](#ImmutableQuadTree.clean) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
  * [.keep(qroute)](#ImmutableQuadTree.keep) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>

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
| f | <code>function</code> | Function will execute on every leaf data. |

<a name="ImmutableQuadTree.add"></a>
### ImmutableQuadTree.add(qroute, data) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
Add data to leaf node

**Kind**: static method of <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>  
**Returns**: <code>[ImmutableQuadTree](#ImmutableQuadTree)</code> - New tree if any change. Self if no change.  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>string</code> | Full length route. |
| data | <code>any</code> | Data store to leaf node |

<a name="ImmutableQuadTree.remove"></a>
### ImmutableQuadTree.remove(qroute, data) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
Remove data to leaf node

**Kind**: static method of <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>  
**Returns**: <code>[ImmutableQuadTree](#ImmutableQuadTree)</code> - New tree if any change. Self if no change.  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>string</code> | Full length route. |
| data | <code>any</code> | Data store to leaf node |

<a name="ImmutableQuadTree.clean"></a>
### ImmutableQuadTree.clean(qroute) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
Clean all data under route

**Kind**: static method of <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>  
**Returns**: <code>[ImmutableQuadTree](#ImmutableQuadTree)</code> - New tree if any change. Self if no change.  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>string</code> | Route to clean. |

<a name="ImmutableQuadTree.keep"></a>
### ImmutableQuadTree.keep(qroute) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
Remove all data except given route.

**Kind**: static method of <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>  
**Returns**: <code>[ImmutableQuadTree](#ImmutableQuadTree)</code> - New tree if any change. Self if no change.  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>string</code> | Data under the route will keep |

<a name="ImmutableObjectType"></a>
## ~ImmutableObjectType
**Kind**: inner class  
<a name="new_ImmutableObjectType_new"></a>
### new ImmutableObjectType(identity)
Leaf node data type tool for native object


| Param | Type | Description |
| --- | --- | --- |
| identity | <code>[identity](#identity)</code> | function to get data id |

<a name="identity"></a>
## ~identity ⇒ <code>string</code>
Grab id from given data. Id is used to make sure data points are unique, no duplication.
    This is only interface defination. Default identity function will grab *id* property of given object.
    If id of data point isn't *id*. You will need to define your own identity function follow this interface.

**Kind**: inner typedef  
**Returns**: <code>string</code> - id  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Data to grab id. |

