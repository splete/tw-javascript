application.HuntModel = function (name, jsonObject) {
	console.log('New model : ' + name);
	var _name = name;
	this.__defineGetter__("name", function () {return _name;});
	this.__defineSetter__("name", function (value) {return _name = value;});

	this.name = _name;
	this.questions = [];
	
	/* Ici, on regarde si le jsonObject est la, ou pas, et on charge les questions en consequence */
	if (typeof(jsonObject) != 'undefined') {
		for (var i=0; i<jsonObject["questions"].length; i++) {
			var q = new application.Question(jsonObject["questions"][i]["q"],jsonObject["questions"][i]["a"])
			this.questions[i] = q;
		}
	}
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
	getNbQuestions : function () {
		return this.questions.length;
	},
	storeModel : function () {
		/* on fabrique un joli objet json contenant toutes les infos qui faut :) */
		var jsonText = this.toJson();
		/* on store le model dans le local storage */
		localStorage[this.name] = jsonText;

	},
	toJson : function () {
		var jsonText = '';
		/* on ouvre le json */
		jsonText += '{';
		/* on ajout le nom */
		jsonText += '"name":"'+this.name+'",';

		if (this.questions.length > 0) {
			jsonText += '"questions":[';

			/* on ajoute toutes les questions */
			for(var i=0; i<this.questions.length; i++) {
				jsonText += '{"q":"'+this.questions[i].question+'",';
				jsonText += '"a":"'+this.questions[i].answer+'"}';
				if (i<this.questions.length-1) jsonText += ",";
			}

			jsonText += ']';
		}

		jsonText += '}';

		return jsonText;
	},
	showAllQuestions : function () {
		for (var i=0; i<this.questions.length; i++) {
			console.log("Question " + i + " : " + this.questions[i].question);
			console.log("Answer " + i + " : " + this.questions[i].answer);
		}
	}
}