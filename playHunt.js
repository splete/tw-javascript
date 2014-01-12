application.PlayHunt = function (nom) {
	var json = JSON.parse(localStorage[nom]);
	playThis = this;
	this.nom = nom;
	this.model = new application.HuntModel(nom, json);
	this.nombreQuestion = this.model.getNbQuestions();
	this.qCur = 0;
	this.showQuestion(this.qCur);
}

application.PlayHunt.prototype = {
	showQuestion : function (indice) {
		question = this.model.getQuestion(this.qCur);
		screeen = new application.Screeen(this.nom);
		screeen.addTextField("answer", {label : question.question, hint: "Your answer", id : "answer"});
		screeen.addButtonField("Validate", { onclick : "playThis.checkAnswer(question);" });
		screeen.addButtonField('I give up!', { onclick : "playThis.giveUpHunt();" });
	},
	checkAnswer : function (question) {
		var answer = document.getElementById('answer').value;
		if (answer == question.answer) {
			console.log('Bonne réponse');
			this.qCur++;
		} else {
			console.log('Mauvaise réponse');
			screeen.makeAlert('! :-( BAD ANSWER :-( !');
		}
		if (this.qCur == this.nombreQuestion) {
			this.finishHunt();
		} else {
			this.showQuestion(this.qCur);
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