domHelp = {
	addElement : function (parent,tagName) {
		var tag=document.createElement(tagName);
		parent.appendChild(tag);
		for (var i=2;i<arguments.length;i+=2)
			tag.setAttribute(arguments[i],arguments[i+1]);
		return tag;
	},

	addText : function (tag, text) {
		var node=document.createTextNode(text);
		tag.appendChild(node);
		return node;
	}
}