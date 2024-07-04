const translations = {};
const quizTranslations = {};

async function loadTranslations(lang) {
	try {
		const [translationsData, quizTranslationsData] = await Promise.all([
			fetch(`/lang/${lang}.json`).then((response) => response.json()),
			fetch(`/lang/${lang}_quiz.json`).then((response) => response.json()),
		]);
		translations[lang] = translationsData;
		quizTranslations[lang] = quizTranslationsData;
		console.log(
			`Translations loaded for ${lang}`,
			translationsData,
			quizTranslationsData
		); // Debug
	} catch (error) {
		console.error(`Error loading translations for ${lang}:`, error);
		throw error;
	}
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
		window.renderQuestion();
	}
}

async function changeLanguage(lang) {
	console.log("Changing language to:", lang); // Debug

	// Zachowanie stanu widoczności quizu przed zmianą języka
	const quizContainer = document.getElementById("quizContainer");
	const quizVisible = quizContainer.style.display === "block";

	await loadTranslations(lang);
	console.log("Translations loaded for:", lang); // Debug

	setLanguage(lang);
	setQuizLanguage(lang);

	// Przywrócenie stanu widoczności quizu po zmianie języka
	window.initializeQuiz(); // Reinitialize quiz after language change
	if (quizVisible) {
		quizContainer.style.display = "block";
		window.renderQuestion(); // Render the first question after language change
	}

	console.log("Language changed to:", lang); // Debug
}

document.addEventListener("DOMContentLoaded", async () => {
	const savedLang = localStorage.getItem("language") || "en";
	console.log("Loaded language on DOMContentLoaded:", savedLang); // Debug
	await loadTranslations(savedLang);
	setLanguage(savedLang);
	setQuizLanguage(savedLang);
	window.initializeQuiz(); // Ensure using the global reference
	console.log("Quiz initialized on DOMContentLoaded"); // Debug
});
