application = {};

/* Fonction permettant d'importer un fichier javascript : path*/
function importJSFile (path) {
	var imported = document.createElement('script');
	imported.src = path;
	document.head.appendChild(imported);
}

/* On importe les fichiers sources */
importJSFile("fields.js");
importJSFile("domHelp.js");
importJSFile("huntModel.js");
importJSFile("hunt.js");
importJSFile("question.js");
importJSFile("screeen.js");

/* C'est parti :) */
window.onload = function () {
	screeen=new application.Screeen("Treasure Hunt");
	screeen.showListHunt();
}