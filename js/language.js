const translations = {};
const quizTranslations = {};

function loadTranslations(lang) {
	return Promise.all([
		fetch(`/lang/${lang}.json`).then((response) => response.json()),
		fetch(`/lang/${lang}_quiz.json`).then((response) => response.json()),
	]).then(([translationsData, quizTranslationsData]) => {
		translations[lang] = translationsData;
		quizTranslations[lang] = quizTranslationsData;
		setLanguage(lang);
		setQuizLanguage(lang);
	});
}

function setLanguage(lang) {
	const elements = document.querySelectorAll("[id]");
	elements.forEach((el) => {
		const key = el.id;
		if (translations[lang] && translations[lang][key]) {
			el.innerText = translations[lang][key];
		}
	});
	localStorage.setItem("language", lang);
}

function setQuizLanguage(lang) {
	const quizHeader = document.getElementById("quizHeader");
	const quizToggle = document.getElementById("quizToggle");
	if (quizTranslations[lang]) {
		quizHeader.innerText = quizTranslations[lang]["quizHeader"];
		quizToggle.innerText = quizTranslations[lang]["quizToggle"];
	}
	// Update questions if quiz is already loaded
	if (document.getElementById("quizContainer").style.display === "block") {
		renderQuestion();
	}
}

function changeLanguage(lang) {
	loadTranslations(lang).then(() => {
		initializeQuiz();
	});
}

document.addEventListener("DOMContentLoaded", () => {
	const savedLang = localStorage.getItem("language") || "en";
	loadTranslations(savedLang).then(() => {
		initializeQuiz();
	});
});
