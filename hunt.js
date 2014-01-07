application.Hunt = function () {
	huntthis = this;
	this.name = this.setName();
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
		screeen.addTextField("question", {label : "Write the question", id : "question"});
		screeen.addTextField("answer", {label : "Enter the code", id : "answer"});
		screeen.addButtonField("Next", { onclick : "huntthis.nextQuestion();" });
		screeen.addButtonField("Finish", { onclick : "huntthis.finishHunt();" });
	},
	saveQuestion : function (questionRequiered) {
		var question = document.getElementById("question").value;
		var answer = document.getElementById("answer").value;
		var qSave = true;
		console.log('On check les champs questions/réponses -> on ne fait rien si pas correct!');
		if (question.length < 1) {
			if (questionRequiered) {
				screeen.makeAlert("Write a question first!");
				return;
			}
			qSave = false;
		}
		if (answer.length < 1 || isNaN(answer)) {
			if (questionRequiered) {
				screeen.makeAlert("Wrong answer, must be a number");
				return;
			}
			qSave = false;
		}
		if (qSave) {
			this.qNumber++;
			console.log('Save question ' + this.qNumber);
		} else {
			console.log('Question not save');
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
		screeen.makeAlert('finish Hunt');
		localStorage['test'] = this;
		screeen = new application.Screeen("New Teasure Hunt");
		screeen.showListHunt();
	},
	toJson : function () {
		return;
	}
}