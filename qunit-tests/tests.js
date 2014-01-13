
/* Tests sur mes questions */
/* On crée une question, et on test les getter/setter */
test( "Questions", function() {
	var q = "Quelle est l'année de naissance de votre mère?";
	var a = 1963;
	var question = new application.Question(q,a); 
	/* Test : la question contient-elle bien les bonne question et réponse? */
	ok( question.question == q, "Question is ok" );
	ok( question.answer == a, "Answer is ok" );

	/* Test des setter */
	q = "Quelle est l'année de naissance de votre père?";
	a = 1957; 
	question.question = q;
	question.answer = a;

	ok( question.question == q, "Setter question is ok" );
	ok( question.answer == a, "Setter answer is ok" );
});


/* Test sur la creation d'un model Hunt sans parametre json*/
test("Model Hunt creation without json param (empty model)", function() {
	var nom = "TestModel";
	var hmodel = new application.HuntModel(nom);

	/* On test si le nom est bien correct */
	ok (hmodel.name == nom, "Name is correct");

	/* On test le setter du nom */
	nom = "New name";
	hmodel.name = nom;
	ok (hmodel.name == nom, "Setter name is ok");

});

/* Test des fonctions du model */
test("Model Hunt function", function() {
	var nom = "TestModel";
	var hmodel = new application.HuntModel(nom);
	var q1 = "Quelle est l'année de naissance de votre mère?";
	var a1 = 1963;
	var question1 = new application.Question(q1,a1); 
	var q2 = "Quelle est l'année de naissance de votre père?";
	var a2 = 1957;
	var question2 = new application.Question(q2,a2);

	/* Test ajout question et get question */
	hmodel.addQuestion(question1);
	ok( hmodel.getQuestion(0) == question1, "Add / Get question 1 is ok");

	hmodel.addQuestion(question2);
	ok( hmodel.getQuestion(1) == question2, "Add / Get question 2 is ok");

	ok( hmodel.getQuestion(0) == question1, "Get question 1 is ok");

	/* Test sur le nombre de question */
	ok( hmodel.getNbQuestions() == 2, "There are 2 questions");

	/* Test de la fonction toJson */
	var jsonText = '{"name":"TestModel","questions":[{"q":"Quelle est l\'année de naissance de votre mère?","a":"1963"},{"q":"Quelle est l\'année de naissance de votre père?","a":"1957"}]}';
	ok( hmodel.toJson() == jsonText, "toJson is ok");

});

/* Test sur la creation d'un model Hunt un parametre json*/
test("Model Hunt creation with json param (not empty model)", function() {
	var nom = "TestModel";
	var jsonText = '{"name":"TestModel","questions":[{"q":"Quelle est l\'année de naissance de votre mère?","a":"1963"},{"q":"Quelle est l\'année de naissance de votre père?","a":"1957"}]}';
	var json = JSON.parse(jsonText);
	var hmodel = new application.HuntModel(nom, json);

	/* On test si le nom est bien correct */
	ok (hmodel.name == nom, "Name is correct");

	/* Test du nombre de questions */
	ok( hmodel.getNbQuestions() == 2, "There are 2 questions");

	/* Test de récupération des questions */
	var q1 = "Quelle est l'année de naissance de votre mère?";
	var a1 = 1963;
	var q2 = "Quelle est l'année de naissance de votre père?";
	var a2 = 1957;

	ok( hmodel.getQuestion(0).question == q1, "Question 1 is ok");
	ok( hmodel.getQuestion(0).answer == a1, "Answer 1 is ok");
	ok( hmodel.getQuestion(1).question == q2, "Question 2 is ok");
	ok( hmodel.getQuestion(1).answer == a2, "Answer 2 is ok");

	/* Test de la fonction toJson */
	ok( hmodel.toJson() == jsonText, "toJson function is ok");

	/* On ajoute une question pour voir si tout fonctionne bien */
	var q3 = "Quelle est l'année de naissance de votre poisson rouge?"
	var a3 = 1971;
	var question3 = new application.Question(q3,a3);

	hmodel.addQuestion(question3);
	ok (hmodel.getQuestion(2) == question3, "Add / Get question 3 is ok");

	/* Test sur le nombre de questions */
	ok( hmodel.getNbQuestions() == 3, "There are 3 questions");

});