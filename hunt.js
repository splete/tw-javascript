application.Hunt = function () {
	huntthis = this;

	var _name = this.setName();

	/* Si le nom n'est pas setter, on sort */
	if (_name == undefined || _name.length < 1) return;

	/* Si le nom est deja pris, on sort aussi... */
	if (localStorage[_name] != undefined) {
		screeen.makeAlert("This name is already in use");
		return;
	}

	/* On cré un model */
	var model = new application.HuntModel(_name);

	/* Getter / Setter */
	this.__defineGetter__("name", function () {return _name;});
	this.__defineSetter__("name", function (value) {return _name = value;});

	this.__defineGetter__("model", function () {return model;});
	this.__defineSetter__("model", function (value) {return model = value;});
	
	/* Premmiere question... */
	this.addQuestion();
}

application.Hunt.prototype = {
	setName : function () {
		return screeen.getPrompt('What is its name?');
	},
	addQuestion : function () {
		screeen = new application.Screeen("New Teasure Hunt : " + this.name);
		screeen.addTextField("question", {hint : "Write the question", id : "question"});
		screeen.addTextField("answer", {hint : "Enter the code", id : "answer"});
		screeen.addButtonField("Next", { onclick : "huntthis.nextQuestion();", id : "next" });
		screeen.addButtonField("Finish", { onclick : "huntthis.finishHunt();", id : "finish" });
	},
	saveQuestion : function (questionRequiered) {
		var question = document.getElementById("question").value;
		var answer = document.getElementById("answer").value;
		var qSave = true;

		try {
			var questionM = new application.Question(question, answer);
			this.model.addQuestion(questionM);

		} catch (err) {
			if (questionRequiered) {
				screeen.makeAlert("Not a question or answer is not a number");
			}
		}
	},
	nextQuestion : function () {
		huntthis.saveQuestion(true);
		huntthis.addQuestion();
	},
	finishHunt : function () {
		huntthis.saveQuestion(false);

		if (this.model.getNbQuestions() > 0)
			this.model.storeModel();

		screeen = new application.Screeen("Teasure Hunt");
		screeen.showCreationHunt();
		screeen.showListHunt();
	}
}