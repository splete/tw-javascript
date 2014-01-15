application.PlayHunt = function (nom) {
	var json = JSON.parse(localStorage[nom]);
	playThis = this;

	var _nom = nom;
	var model = new application.HuntModel(nom, json);

	/* Getter / Setter */
	this.__defineGetter__("nom", function () {return _nom;});
	this.__defineSetter__("nom", function (value) {return _nom = value;});

	this.__defineGetter__("model", function () {return model;});
	this.__defineSetter__("model", function (value) {return model = value;});

    /* Le nombre de question */
	nombreQuestion = this.model.getNbQuestions();

	/* La question courante */
	qCur = 0;
	
	this.showQuestion(qCur);
}

application.PlayHunt.prototype = {
	showQuestion : function (indice) {
		question = this.model.getQuestion(qCur);
		screeen = new application.Screeen(this.nom);
		screeen.addTextField("answer", {label : question.question, hint: "Your answer", id : "answer"});
		screeen.addButtonField("Validate", { onclick : "playThis.checkAnswer(question);", id : "validate"});
		screeen.addButtonField('I give up!', { onclick : "playThis.giveUpHunt();", id : "giveup" });
	},
	checkAnswer : function (question) {
		var answer = document.getElementById('answer').value;
		if (answer == question.answer) {
			qCur++;
		} else {
			screeen.makeAlert('! :-( BAD ANSWER :-( !');
		}
		if (qCur == nombreQuestion) {
			this.finishHunt();
		} else {
			this.showQuestion(qCur);
		}
	},
	finishHunt : function () {
		screeen.makeAlert("! YOU'VE COMPLETED THE HUNT !");
		screeen = new application.Screeen("New Teasure Hunt");
		screeen.showCreationHunt();
		screeen.showListHunt();
	},
	giveUpHunt : function () {
		screeen.makeAlert("You've given up. Maybe next time");
		screeen = new application.Screeen("New Teasure Hunt");
		screeen.showCreationHunt();
		screeen.showListHunt();
	}	
}