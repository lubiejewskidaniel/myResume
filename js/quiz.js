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

	function renderQuestion() {
		const lang = localStorage.getItem("language") || "en";
		const questions = quizTranslations[lang]?.questions || [];
		const question = questions[currentQuestionIndex];
		if (!question) {
			console.error("Question not found", { lang, currentQuestionIndex });
			return;
		}
		let quizHtml = `<div class="question"><p>${question.question}</p>`;
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

	window.renderQuestion = renderQuestion;

	window.initializeQuiz = function () {
		const lang = localStorage.getItem("language") || "en";
		if (!quizTranslations[lang]) {
			console.error(`No quiz translations found for language: ${lang}`);
			return;
		}

		userAnswers = new Array(quizTranslations[lang].questions.length).fill(null);

		// Ensure the display state is properly set after initialization
		quizContainer.style.display = "none";

		quizToggle.addEventListener("click", function () {
			quizContainer.style.display =
				quizContainer.style.display === "none" ? "block" : "none";
			console.log("Quiz toggled to", quizContainer.style.display); // Debug

			if (quizContainer.style.display === "block") {
				renderQuestion();
			}
		});

		renderQuestion();
		console.log("Quiz initialized", {
			lang,
			questions: quizTranslations[lang].questions,
		}); // Debug
	};

	nextQuestion.addEventListener("click", function () {
		const selected = document.querySelector(
			`input[name="q${currentQuestionIndex}"]:checked`
		);
		if (selected) {
			userAnswers[currentQuestionIndex] = parseInt(selected.value);
			currentQuestionIndex++;
			renderQuestion();
			console.log("Next question rendered", {
				currentQuestionIndex,
				userAnswers,
			}); // Debug
		} else {
			alert("Please select an answer before proceeding.");
		}
	});

	prevQuestion.addEventListener("click", function () {
		currentQuestionIndex--;
		renderQuestion();
		console.log("Previous question rendered", {
			currentQuestionIndex,
			userAnswers,
		}); // Debug
	});

	submitQuiz.addEventListener("click", function () {
		const selected = document.querySelector(
			`input[name="q${currentQuestionIndex}"]:checked`
		);
		if (selected) {
			userAnswers[currentQuestionIndex] = parseInt(selected.value);
			if (checkIfAllAnswered()) {
				const percentage = calculateScore();
				let feedback = "";
				if (percentage < 60) {
					feedback = "You can be better.";
				} else if (percentage < 75) {
					feedback = "Not bad.";
				} else if (percentage < 90) {
					feedback = "Pretty good.";
				} else {
					feedback = "You are a computing master.";
				}
				result.innerHTML = `Your score: ${percentage}%. ${feedback}`;
				retryQuiz.style.display = "block";
				console.log("Quiz submitted", { percentage, feedback }); // Debug
			} else {
				alert("Please answer all questions before submitting.");
			}
		} else {
			alert("Please select an answer before submitting.");
		}
	});

	retryQuiz.addEventListener("click", function () {
		userAnswers.fill(null);
		result.innerHTML = "";
		retryQuiz.style.display = "none";
		currentQuestionIndex = 0;
		renderQuestion();
		console.log("Quiz reset"); // Debug
	});
});
