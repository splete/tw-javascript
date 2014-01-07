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
	huntthis = this;
	this.name = this.setName();
	console.log(this.name);
	this.questions = {};
	this.addQuestion();
}

application.Hunt.prototype = {
	setName : function () {
		return screeen.getPrompt('What is its name?');
	},
	addQuestion : function () {
		screeen = new application.Screeen("New Teasure Hunt : " + this.name);
		screeen.addTextField("question", {label : "Write the question", id : "question"});
		screeen.addTextField("answer", {label : "Enter the code", id : "answer"});
		screeen.addButtonField("Next", { onclick : "huntthis.nextQuestion();" });
		screeen.addButtonField("Finish", { onclick : "huntthis.finishHunt();" });
	},
	saveQuestion : function (questionRequiered) {
		var question = document.getElementById("question").value;
		var answer = document.getElementById("answer").value;
		console.log('On check les champs questions/réponses -> on ne fait rien si pas correct!');
		if (question.length < 1) {
			screeen.makeAlert("Write a question first!");
			return;
		}
		if (answer.length < 1 || isNaN(answer)) {
			screeen.makeAlert("Wrong answer, must be a number");
			return;
		}
		console.log('Save question');
	},
	nextQuestion : function () {
		console.log('Click next');
		huntthis.saveQuestion(true);
		huntthis.addQuestion();
	},
	finishHunt : function () {
		console.log('Click finish');
		huntthis.saveQuestion(false);
		console.log('Enregistrer la chasse!')
		screeen.makeAlert('finish Hunt');
		screeen = new application.Screeen("New Teasure Hunt");
		screeen.showListHunt();
	}
}

application.Question = function () {

}

application.Screeen = function (title) {
	console.log('New screen');
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
	},
	getPrompt : function (text) {
		return prompt(text);
	},
	makeAlert : function(text) {
		alert(text);
	},
	showListHunt : function () {
		this.addButtonField ("Create a teaser Hunt", { onclick : "new application.Hunt()" });
	}

}

window.onload = function () {
	screeen=new application.Screeen("Treasure Hunt");
	screeen.showListHunt();
}