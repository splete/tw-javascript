application.HuntModel = function (name, jsonObject) {
	console.log('New model : ' + name);
	var _name = name;
	this.__defineGetter__("name", function () {return _name;});
	this.__defineSetter__("name", function (value) {return _name = value;});
	/* Ici, on regarde si le jsonObject est la, ou pas, et on charge les questions en consequence */
	this.name = _name;
	this.questions = [];
}

application.HuntModel.prototype = {
	addQuestion : function (question) {
		/* on ajoute la question au model */
		console.log('Ajout de la question ' + this.questions.length + ' dans le model');
		this.questions[this.questions.length] = question;
	},
	getQuestion : function (indice) {
		return this.questions[indice];
	},
	storeModel : function () {
		/* on store le model dans le local storage */
	},
	showAllQuestions : function () {
		for (var i=0; i<this.questions.length; i++) {
			console.log("Question " + i + " : " + this.questions[i].question);
			console.log("Answer " + i + " : " + this.questions[i].answer);
		}
	}
}