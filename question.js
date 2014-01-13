application.Question = function (question, answer) {
	console.log('New object question');
	var _question = question;
	var _answer = answer;

	/* Exception dans le cas ou la question est trop courte (<1) ou que la réponse n'est pas un nombre */
	if (_question.length < 1) throw "Question length too short";
	if (_answer.length < 1 || isNaN(_answer)) throw "Answer is not a number";

	this.__defineGetter__("question", function () {return _question;});
	this.__defineSetter__("question", function (value) {return _question = value;});
	this.__defineGetter__("answer", function () {return _answer;});
	this.__defineSetter__("answer", function (value) {return _answer = value;});
}