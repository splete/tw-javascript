application.Field = function () {
	
}

application.Field.prototype = {
	newLine : function (parent) {
		return  domHelp.addElement(parent,"p");	
	},
	newLabel : function (parent) {
		return domHelp.addElement(parent,"span");
	}
}


application.TextField = function (conteneur, name, _parent, type, parameters) {
	var _name = name;
	var parent = _parent;
	var newLine = this.newLine(parent);
	newLine.style.textAlign="center";

	var label = this.newLabel(newLine);
	label.style.fontSize="20px";

	var labelText=domHelp.addText(label,(parameters.label?parameters.label:""));
	//ttt=labelText;

	var textField=domHelp.addElement(newLine,"input","type",type);
	if (parameters.hint)
		textField.setAttribute("placeholder",parameters.hint);
	if (parameters.id)
		textField.setAttribute("id",parameters.id);
	
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

	screeen.setStyleTextField(textField);
}

/* TextField hérite de Field */
application.TextField.prototype = new application.Field();
application.TextField.prototype.constructor = application.TextField;

application.ButtonField = function (conteneur, name, _parent, parameters) {
	var _name = name;
	var parent = _parent;
	var newLine = this.newLine(parent);

	var buttonField=domHelp.addElement(newLine,"input","type","button");

	if (parameters.id)
		buttonField.setAttribute("id",parameters.id);

	if (parameters.onclick) {
		buttonField.addEventListener("click" , function () {
			eval(parameters.onclick);
		});
	}
	buttonField.setAttribute("value", _name);

	screeen.setStyleButton(buttonField);
}

/* ButtonField hérite de Field */
application.ButtonField.prototype = new application.Field();
application.ButtonField.prototype.constructor = application.ButtonField;