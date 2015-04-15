## Classes
<dl>
<dt><a href="#ImmutableObjectType">ImmutableObjectType</a></dt>
<dd></dd>
<dt><a href="#ImmutableQuadTree">ImmutableQuadTree</a></dt>
<dd></dd>
</dl>
## Functions
<dl>
<dt><a href="#map">map(qroute, f)</a> ⇒ <code><a href="#ImmutableQuadTree">ImmutableQuadTree</a></code></dt>
<dd><p>Map to every leaf data since given route.</p>
</dd>
<dt><a href="#add">add(qroute, data)</a> ⇒ <code><a href="#ImmutableQuadTree">ImmutableQuadTree</a></code></dt>
<dd><p>Add data to leaf node</p>
</dd>
<dt><a href="#remove">remove(qroute, data)</a> ⇒ <code><a href="#ImmutableQuadTree">ImmutableQuadTree</a></code></dt>
<dd><p>Remove data to leaf node</p>
</dd>
</dl>
## Typedefs
<dl>
<dt><a href="#identity">identity</a> ⇒ <code>string</code></dt>
<dd><p>Grab id from given data.</p>
</dd>
</dl>
<a name="ImmutableObjectType"></a>
## ImmutableObjectType
**Kind**: global class  
<a name="new_ImmutableObjectType_new"></a>
### new ImmutableObjectType(identity)
Leaf node data type tool for native object


| Param | Type | Description |
| --- | --- | --- |
| identity | <code>[identity](#identity)</code> | function to get data id |

<a name="ImmutableQuadTree"></a>
## ImmutableQuadTree
**Kind**: global class  
<a name="new_ImmutableQuadTree_new"></a>
### new ImmutableQuadTree(levels, options)
Basic Immutable Quad Tree class


| Param | Type | Description |
| --- | --- | --- |
| levels | <code>number</code> | Quad tree levels |
| options |  | Options |
| options.datatype |  | Leaf node data tool |
| options.identity |  | Function to get id of leaf data |

<a name="map"></a>
## map(qroute, f) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
Map to every leaf data since given route.

**Kind**: global function  
**Returns**: <code>[ImmutableQuadTree](#ImmutableQuadTree)</code> - New tree  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>string</code> | Route of map root. |
| f | <code>function</code> | Function will execute on every leaf data. |

<a name="add"></a>
## add(qroute, data) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
Add data to leaf node

**Kind**: global function  
**Returns**: <code>[ImmutableQuadTree](#ImmutableQuadTree)</code> - New tree if any change. Self if no change.  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>string</code> | Full length route. |
| data | <code>any</code> | Data store to leaf node |

<a name="remove"></a>
## remove(qroute, data) ⇒ <code>[ImmutableQuadTree](#ImmutableQuadTree)</code>
Remove data to leaf node

**Kind**: global function  
**Returns**: <code>[ImmutableQuadTree](#ImmutableQuadTree)</code> - New tree if any change. Self if no change.  

| Param | Type | Description |
| --- | --- | --- |
| qroute | <code>string</code> | Full length route. |
| data | <code>any</code> | Data store to leaf node |

<a name="identity"></a>
## identity ⇒ <code>string</code>
Grab id from given data.

**Kind**: global typedef  
**Returns**: <code>string</code> - id  

| Param | Description |
| --- | --- |
| data | Data to grab id. |

