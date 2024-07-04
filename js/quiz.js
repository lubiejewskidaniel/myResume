document.addEventListener("DOMContentLoaded", function () {
	// Get elements by their IDs
	const quizToggle = document.getElementById("quizToggle");
	const quizContainer = document.getElementById("quizContainer");
	const prevQuestion = document.getElementById("prevQuestion");
	const nextQuestion = document.getElementById("nextQuestion");
	const submitQuiz = document.getElementById("submitQuiz");
	const retryQuiz = document.getElementById("retryQuiz");
	const result = document.getElementById("result");

	let currentQuestionIndex = 0; // Current question index
	let userAnswers = []; // Store user answers

	// Function to render the current question
	function renderQuestion() {
		const lang = localStorage.getItem("language") || "en"; // Get language from localStorage
		const questions = quizTranslations[lang]?.questions || []; // Get questions for the language
		const question = questions[currentQuestionIndex]; // Get the current question

		if (!question) {
			// Handle case where question is not found
			console.error("Question not found", { lang, currentQuestionIndex });
			return;
		}

		// Generate HTML for the current question and its choices
		let quizHtml = `<div class="question"><p>${question.question}</p>`;
		question.choices.forEach((choice, i) => {
			quizHtml += `<input type="radio" name="q${currentQuestionIndex}" value="${i}" ${
				userAnswers[currentQuestionIndex] === i ? "checked" : ""
			}> ${choice}<br>`;
		});
		quizHtml += `</div>`;
		document.getElementById("quiz").innerHTML = quizHtml;

		// Show/hide navigation buttons based on question index
		prevQuestion.style.display =
			currentQuestionIndex === 0 ? "none" : "inline-block";
		nextQuestion.style.display =
			currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
		submitQuiz.style.display =
			currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
	}

	window.renderQuestion = renderQuestion; // Expose renderQuestion to global scope

	// Function to initialize the quiz
	window.initializeQuiz = function () {
		const lang = localStorage.getItem("language") || "en"; // Get language from localStorage
		if (!quizTranslations[lang]) {
			// Handle missing translations
			console.error(`No quiz translations found for language: ${lang}`);
			return;
		}

		userAnswers = new Array(quizTranslations[lang].questions.length).fill(null); // Initialize user answers array

		quizContainer.style.display = "none"; // Hide quiz container initially

		// Toggle quiz container display on click
		quizToggle.addEventListener("click", function () {
			quizContainer.style.display =
				quizContainer.style.display === "none" ? "block" : "none";
			console.log("Quiz toggled to", quizContainer.style.display); // Debug

			if (quizContainer.style.display === "block") {
				// Render question if quiz is visible
				renderQuestion();
			}
		});

		renderQuestion(); // Render the first question
		console.log("Quiz initialized", {
			lang,
			questions: quizTranslations[lang].questions,
		}); // Debug
	};

	// Function to check if all questions are answered
	function checkIfAllAnswered() {
		return userAnswers.every((answer) => answer !== null);
	}

	// Function to calculate the score
	function calculateScore() {
		const lang = localStorage.getItem("language") || "en"; // Get language from localStorage
		const questions = quizTranslations[lang]?.questions || []; // Get questions for the language
		let score = 0;
		questions.forEach((q, index) => {
			if (userAnswers[index] === q.answer) {
				// Increment score for correct answers
				score++;
			}
		});
		return (score / questions.length) * 100; // Calculate percentage
	}

	// Event listener for next question button
	nextQuestion.addEventListener("click", function () {
		const selected = document.querySelector(
			`input[name="q${currentQuestionIndex}"]:checked`
		);
		if (selected) {
			// If an answer is selected
			userAnswers[currentQuestionIndex] = parseInt(selected.value); // Store the answer
			currentQuestionIndex++; // Increment question index
			renderQuestion(); // Render the next question
			console.log("Next question rendered", {
				currentQuestionIndex,
				userAnswers,
			}); // Debug
		} else {
			alert("Please select an answer before proceeding."); // Alert if no answer is selected
		}
	});

	// Event listener for previous question button
	prevQuestion.addEventListener("click", function () {
		currentQuestionIndex--; // Decrement question index
		renderQuestion(); // Render the previous question
		console.log("Previous question rendered", {
			currentQuestionIndex,
			userAnswers,
		}); // Debug
	});

	// Event listener for submit quiz button
	submitQuiz.addEventListener("click", function () {
		const selected = document.querySelector(
			`input[name="q${currentQuestionIndex}"]:checked`
		);
		if (selected) {
			// If an answer is selected
			userAnswers[currentQuestionIndex] = parseInt(selected.value); // Store the answer
			if (checkIfAllAnswered()) {
				// Check if all questions are answered
				const percentage = calculateScore(); // Calculate the score
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
				result.innerHTML = `Your score: ${percentage}%. ${feedback}`; // Display the score and feedback
				retryQuiz.style.display = "block"; // Show retry button
				console.log("Quiz submitted", { percentage, feedback }); // Debug
			} else {
				alert("Please answer all questions before submitting."); // Alert if not all questions are answered
			}
		} else {
			alert("Please select an answer before submitting."); // Alert if no answer is selected
		}
	});

	// Event listener for retry quiz button
	retryQuiz.addEventListener("click", function () {
		userAnswers.fill(null); // Reset user answers
		result.innerHTML = ""; // Clear result
		retryQuiz.style.display = "none"; // Hide retry button
		currentQuestionIndex = 0; // Reset question index
		renderQuestion(); // Render the first question
		console.log("Quiz reset"); // Debug
	});
});
