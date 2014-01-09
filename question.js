application.Question = function (question, answer) {
	console.log('New object question');
	var _question = question;
	var _answer = answer;
	this.__defineGetter__("question", function () {return _question;});
	this.__defineSetter__("question", function (value) {return _question = value;});
	this.__defineGetter__("answer", function () {return _answer;});
	this.__defineSetter__("answer", function (value) {return _answer = value;});
}