const translations = {}; // Object to store general translations
const quizTranslations = {}; // Object to store quiz-specific translations

// Function to load translations for the specified language
async function loadTranslations(lang) {
	try {
		// Fetch both general and quiz translations concurrently
		const [translationsData, quizTranslationsData] = await Promise.all([
			fetch(`/lang/${lang}.json`).then((response) => response.json()),
			fetch(`/lang/${lang}_quiz.json`).then((response) => response.json()),
		]);
		// Store the fetched translations in their respective objects
		translations[lang] = translationsData;
		quizTranslations[lang] = quizTranslationsData;
		console.log(
			`Translations loaded for ${lang}`,
			translationsData,
			quizTranslationsData
		); // Debug log
	} catch (error) {
		console.error(`Error loading translations for ${lang}:`, error); // Log any errors
		throw error; // Re-throw the error after logging it
	}
}

// Function to set the language for the general interface
function setLanguage(lang) {
	const elements = document.querySelectorAll("[id]"); // Select all elements with an id
	elements.forEach((el) => {
		const key = el.id;
		// If translation exists for the element id, set the innerText
		if (translations[lang] && translations[lang][key]) {
			el.innerText = translations[lang][key];
		}
	});
	localStorage.setItem("language", lang); // Save the selected language in local storage
}

// Function to set the language for the quiz interface
function setQuizLanguage(lang) {
	const quizHeader = document.getElementById("quizHeader");
	const quizToggle = document.getElementById("quizToggle");
	// If quiz translations exist, update the quiz header and toggle text
	if (quizTranslations[lang]) {
		quizHeader.innerText = quizTranslations[lang]["quizHeader"];
		quizToggle.innerText = quizTranslations[lang]["quizToggle"];
	}
	// If the quiz is already displayed, update the questions
	if (document.getElementById("quizContainer").style.display === "block") {
		window.renderQuestion();
	}
}

// Function to change the language of the application
async function changeLanguage(lang) {
	console.log("Changing language to:", lang); // Debug log

	// Save the current visibility state of the quiz before changing language
	const quizContainer = document.getElementById("quizContainer");
	const quizVisible = quizContainer.style.display === "block";

	await loadTranslations(lang); // Load translations for the new language
	console.log("Translations loaded for:", lang); // Debug log

	setLanguage(lang); // Set the general interface language
	setQuizLanguage(lang); // Set the quiz interface language

	// Reinitialize the quiz and restore its visibility state if it was visible before
	window.initializeQuiz(); // Reinitialize quiz after language change
	if (quizVisible) {
		quizContainer.style.display = "block";
		window.renderQuestion(); // Render the first question after language change
	}

	console.log("Language changed to:", lang); // Debug log
}

// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", async () => {
	const savedLang = localStorage.getItem("language") || "en"; // Load saved language or default to 'en'
	console.log("Loaded language on DOMContentLoaded:", savedLang); // Debug log
	await loadTranslations(savedLang); // Load translations for the saved language
	setLanguage(savedLang); // Set the general interface language
	setQuizLanguage(savedLang); // Set the quiz interface language
	window.initializeQuiz(); // Ensure quiz is initialized using the global reference
	console.log("Quiz initialized on DOMContentLoaded"); // Debug log
});
