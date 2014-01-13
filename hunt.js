application.Hunt = function () {
	huntthis = this;

	this.name = this.setName();
	/* On cré un model */
	model = new application.HuntModel(this.name);

	this.qNumber = 0;
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
		screeen.addTextField("question", {hint : "Write the question", id : "question"});
		screeen.addTextField("answer", {hint : "Enter the code", id : "answer"});
		screeen.addButtonField("Next", { onclick : "huntthis.nextQuestion();" });
		screeen.addButtonField("Finish", { onclick : "huntthis.finishHunt();" });
	},
	saveQuestion : function (questionRequiered) {
		var question = document.getElementById("question").value;
		var answer = document.getElementById("answer").value;
		var qSave = true;
		console.log('On check les champs questions/réponses -> on ne fait rien si pas correct!');

		try {
			var questionM = new application.Question(question, answer);
			model.addQuestion(questionM);
			this.qNumber++;

		} catch (err) {
			if (questionRequiered) {
				screeen.makeAlert("Not a question or answer is not a number");
			}
		}
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
		//screeen.makeAlert('finish Hunt');
		

		model.showAllQuestions();

		model.storeModel();

		screeen = new application.Screeen("New Teasure Hunt");
		screeen.showCreationHunt();
		screeen.showListHunt();
	},
	toJson : function () {
		return;
	}
}