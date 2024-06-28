const translations = {};

function loadTranslations(lang) {
	fetch(`/lang/${lang}.json`)
		.then((response) => response.json())
		.then((data) => {
			translations[lang] = data;
			setLanguage(lang);
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

function changeLanguage(lang) {
	if (!translations[lang]) {
		loadTranslations(lang);
	} else {
		setLanguage(lang);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const savedLang = localStorage.getItem("language") || "en";
	loadTranslations(savedLang);
});
