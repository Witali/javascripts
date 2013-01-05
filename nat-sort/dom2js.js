/*
	Преобразование Dom-дерева в javascript
	
	на выходе получаем дерево из объектов
	n.t {string} - tag
	n.a {object} - attributes
	n.b {array of nodes} - body
	 
*/


function dom2js(node){
    var el, i, n;
    
    
    if(node.nodeType === 1){
       el = {
            t:node.nodeName.toLowerCase(),
        };
                
        
        if(node.childNodes.length)
        {
            el.b = [];
            for(i=0, n=node.childNodes.length; i<n; ++i)
            {
                el.b.push(dom2js(node.childNodes[i]));
            }
        }
        if(node.attributes.length)
        {
            el.a = {};
            for(i=0, n=node.attributes.length; i<n; ++i)
            {
                el.a[node.attributes[i].name] = node.attributes[i].value;
            }
        }   
     }
  
    else if(node.nodeType === 3)
    {
        el = node.nodeValue || '';
    }
 


    return el;
}

// Преобразуем дерево объектов в текст
function js2text(node){
	var tag = node.t || 'div',
		attrs = node.a,
		childs = node.b,
		out = '<' + tag;
	
	for(var name in attrs)
	{
		if(!attrs.hasOwnProperty(name) || !name)
		{
			continue;
		}
		
		out += ' ' + name + '="' + attrs[name].replace(/"/g, '&quot;') + '"';
		
	}
	
	if(!childs)
	{
		out += '/>';
	}
	else
	{
		out += '>';
		for(var i=0, n=childs.length, ch; i<n; ++i)
		{
			ch = childs[i];
			if(typeof ch === 'string')
			{
				out += ch;
			}
			else
			{
				out += js2text(ch);
			}
		}
	}

	out += '</' + tag + '>';
	
	return out;
};

var node = document.getElementById('a1');

console.log(dom2js(node));

