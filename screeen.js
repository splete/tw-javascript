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
	showCreationHunt : function () {
		this.addButtonField ("Create a Treasure Hunt", { onclick : "new application.Hunt()" });
	},
	showListHunt : function () {
		for (var key in localStorage) {
			this.addButtonField(key, { onclick : "new application.PlayHunt('" + key + "');"});
		}
	}

}