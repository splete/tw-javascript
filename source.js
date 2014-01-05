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

application = {};

application.TextField = function (conteneur, name, _parent, type, parameters) {
	var _name = name;
	var parent = _parent;
	var newLine=domHelp.addElement(parent,"p");

	var label=domHelp.addElement(newLine,"span");
	var labelText=domHelp.addText(label,(parameters.label?parameters.label:""));
	ttt=labelText;

	var textField=domHelp.addElement(newLine,"input","type",type);
	if (parameters.hint)
		textField.setAttribute("placeholder",parameters.hint);
	
	var objetthis = this;

	this.__defineGetter__("label", function () {return labelText.data;});
	this.__defineSetter__("label", function (value) {return labelText.data=value});
	this.__defineGetter__("hint", function () {return textField.getAttribute("placeholder");});
	this.__defineSetter__("hint", function (value) {return textField.setAttribute("placeholder",value)});

	// Exo 6
	// Getter qui renvoie le nom
	this.__defineGetter__("name", function () {return _name;});
	this.__defineSetter__("name", function (value) {
		// sur le champ fields de l'objet conteneur, je supprime la propriété name
		// Je rajoute la propriété qui vaut this
		
		delete conteneur.fields[_name]
		_name = value;
		conteneur.fields[_name] = objetthis;
	});
}

application.TextField.prototype = {

}

application.ButtonField = function (conteneur, name, _parent, parameters) {
	var _name = name;
	var parent = _parent;
	var newLine=domHelp.addElement(parent,"p");

	var buttonField=domHelp.addElement(newLine,"input","type","button");

	if (parameters.onclick)
		buttonField.setAttribute("onclick", parameters.onclick);
	buttonField.setAttribute("value", _name);

}

application.ButtonField.prototype = {

}

application.Hunt = function () {
	name = this.setName();
	console.log(name);
	this.questions = {};
}

application.Hunt.prototype = {
	setName : function () {
		return prompt('What is its name?');
	},
	addQuestion : function () {

	},
	saveHunt : function () {
		
	}
}

application.Screeen = function (title) {
	this.body=document.getElementsByTagName("body").item(0);
	for (var i=0;this.body.childNodes.length;i++)
		this.body.removeChild(this.body.childNodes.item(0));
	this.fields={};
	this.addTitle(title)
}

application.Screeen.prototype = {
	addTitle : function (_titleText) {
		this.titleNode=domHelp.addElement(this.body,"div");
		this.titleTextNode=domHelp.addText(this.titleNode,_titleText);
		this.setTitleStyle();
	},
	setTitleStyle : function () {
		var style=this.titleNode.style;
		style.width="100%";
		style.margin="0px";
		style.paddingTop="10px";
		style.paddingBottom="10px";
		style.backgroundColor="#2B5278";
		style.top="0px";
		style.left="0px";
		style.textAlign="center";
		style.fontSize="18px";
		style.color="white";
		style.fontWeight="bold"
	},
	addTextField : function (name, parameters) {
		this.fields[name]=new application.TextField(this, name, this.body,"text",parameters);
	},
	addButtonField : function (name, parameters) {
		this.fields[name]=new application.ButtonField(this, name, this.body,parameters);
	}	
}


window.onload = function () {
	screeen=new application.Screeen("Treasure Hunt");
	screeen.addButtonField ("Create a teaser Hunt", { onclick : "new application.Hunt()" });
}