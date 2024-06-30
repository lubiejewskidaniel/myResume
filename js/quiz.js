document.addEventListener("DOMContentLoaded", function () {
	const quizToggle = document.getElementById("quizToggle");
	const quizContainer = document.getElementById("quizContainer");
	const prevQuestion = document.getElementById("prevQuestion");
	const nextQuestion = document.getElementById("nextQuestion");
	const submitQuiz = document.getElementById("submitQuiz");
	const retryQuiz = document.getElementById("retryQuiz");
	const result = document.getElementById("result");

	let currentQuestionIndex = 0;
	let userAnswers = [];

	function initializeQuiz() {
		const lang = localStorage.getItem("language") || "en";
		if (!quizTranslations[lang]) {
			console.error(`No quiz translations found for language: ${lang}`);
			return;
		}

		userAnswers = new Array(quizTranslations[lang].questions.length).fill(null);

		quizToggle.addEventListener("click", function () {
			quizContainer.style.display =
				quizContainer.style.display === "none" ? "block" : "none";
		});

		function renderQuestion() {
			const questions = quizTranslations[lang].questions;
			const question = questions[currentQuestionIndex];
			let quizHtml = `<div class="question">
                                <p>${question.question}</p>`;
			question.choices.forEach((choice, i) => {
				quizHtml += `<input type="radio" name="q${currentQuestionIndex}" value="${i}" ${
					userAnswers[currentQuestionIndex] === i ? "checked" : ""
				}> ${choice}<br>`;
			});
			quizHtml += `</div>`;
			document.getElementById("quiz").innerHTML = quizHtml;

			// Show/hide navigation buttons
			prevQuestion.style.display =
				currentQuestionIndex === 0 ? "none" : "inline-block";
			nextQuestion.style.display =
				currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
			submitQuiz.style.display =
				currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
		}

		function checkIfAllAnswered() {
			return userAnswers.every((answer) => answer !== null);
		}

		function calculateScore() {
			const questions = quizTranslations[lang].questions;
			let score = 0;
			questions.forEach((q, index) => {
				if (userAnswers[index] === q.answer) {
					score++;
				}
			});
			return (score / questions.length) * 100;
		}

		function getFeedbackMessage(score) {
			if (score < 60) {
				return translations[lang].feedback.score_0_59;
			} else if (score < 75) {
				return translations[lang].feedback.score_60_74;
			} else if (score < 90) {
				return translations[lang].feedback.score_75_89;
			} else {
				return translations[lang].feedback.score_90_100;
			}
		}

		renderQuestion();

		nextQuestion.addEventListener("click", function () {
			const selected = document.querySelector(
				`input[name="q${currentQuestionIndex}"]:checked`
			);
			if (selected) {
				userAnswers[currentQuestionIndex] = parseInt(selected.value);
				currentQuestionIndex++;
				renderQuestion();
			} else {
				alert(translations[lang].alerts.select_answer);
			}
		});

		prevQuestion.addEventListener("click", function () {
			currentQuestionIndex--;
			renderQuestion();
		});

		submitQuiz.addEventListener("click", function () {
			const selected = document.querySelector(
				`input[name="q${currentQuestionIndex}"]:checked`
			);
			if (selected) {
				userAnswers[currentQuestionIndex] = parseInt(selected.value);
				if (checkIfAllAnswered()) {
					const percentage = calculateScore();
					const feedback = getFeedbackMessage(percentage);
					result.innerHTML = `Your score: ${percentage}%. ${feedback}`;
					retryQuiz.style.display = "block";
				} else {
					alert(translations[lang].alerts.answer_all);
				}
			} else {
				alert(translations[lang].alerts.select_answer);
			}
		});

		retryQuiz.addEventListener("click", function () {
			userAnswers.fill(null);
			result.innerHTML = "";
			retryQuiz.style.display = "none";
			currentQuestionIndex = 0;
			renderQuestion();
		});
	}

	const savedLang = localStorage.getItem("language") || "en";
	loadTranslations(savedLang)
		.then(() => {
			initializeQuiz();
		})
		.catch((error) => console.error("Error initializing quiz:", error));
});
