document.addEventListener("DOMContentLoaded", function () {
	const quizToggle = document.getElementById("quizToggle");
	const quizContainer = document.getElementById("quizContainer");
	const prevQuestion = document.getElementById("prevQuestion");
	const nextQuestion = document.getElementById("nextQuestion");
	const submitQuiz = document.getElementById("submitQuiz");
	const retryQuiz = document.getElementById("retryQuiz");
	const result = document.getElementById("result");

	quizToggle.addEventListener("click", function () {
		quizContainer.style.display =
			quizContainer.style.display === "none" ? "block" : "none";
	});

	const questions = [
		{
			question: "1. What does HTML stand for?",
			choices: [
				"Hyper Text Markup Language",
				"Hot Mail",
				"Hyper Text Marking Language",
				"How to Make Lasagna",
			],
			answer: 0,
		},
		{
			question: "2. What does CSS stand for?",
			choices: [
				"Cascading Style Sheets",
				"Cascading System Sheets",
				"Cascading Simple Sheets",
			],
			answer: 0,
		},
		{
			question: "3. What does CPU stand for?",
			choices: [
				"Central Processing Unit",
				"Computer Personal Unit",
				"Central Processor Unit",
			],
			answer: 0,
		},
		{
			question: "4. What is the main function of the operating system?",
			choices: [
				"Manage computer hardware and software resources",
				"Browse the internet",
				"Edit documents",
			],
			answer: 0,
		},
		{
			question: "5. Which of the following is a web browser?",
			choices: ["Google Chrome", "Microsoft Word", "Adobe Photoshop"],
			answer: 0,
		},
		{
			question: "6. What does RAM stand for?",
			choices: [
				"Random Access Memory",
				"Read Access Memory",
				"Run Access Memory",
			],
			answer: 0,
		},
		{
			question: "7. What is the function of a router in a network?",
			choices: [
				"Forward data packets between computer networks",
				"Store data",
				"Run applications",
			],
			answer: 0,
		},
		{
			question: "8. Which program is used to create documents?",
			choices: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"],
			answer: 0,
		},
		{
			question: "9. What does URL stand for?",
			choices: [
				"Uniform Resource Locator",
				"Universal Resource Locator",
				"Uniform Resource Link",
			],
			answer: 0,
		},
		{
			question:
				"10. Which file extension is used for a Microsoft Excel document?",
			choices: [".xlsx", ".docx", ".pptx", ".excel"],
			answer: 0,
		},
		{
			question: "11. What is the shortcut for copying text in most programs?",
			choices: ["Ctrl + C", "Ctrl + V", "Ctrl + X"],
			answer: 0,
		},
		{
			question: "12. What does LAN stand for?",
			choices: [
				"Local Area Network",
				"Large Area Network",
				"Long Area Network",
			],
			answer: 0,
		},
		{
			question:
				"13. What is the main purpose of an email client like Microsoft Outlook?",
			choices: ["Send and receive emails", "Browse the web", "Edit photos"],
			answer: 0,
		},
		{
			question: "14. Which company developed the Windows operating system?",
			choices: ["Microsoft", "Apple", "Google"],
			answer: 0,
		},
		{
			question: "15. What does HTTP stand for?",
			choices: [
				"Hypertext Transfer Protocol",
				"Hypertext Transfer Program",
				"Hyper Transfer Text Protocol",
			],
			answer: 0,
		},
		{
			question: "16. What is the primary use of Microsoft Excel?",
			choices: [
				"Spreadsheet calculations",
				"Document creation",
				"Photo editing",
			],
			answer: 0,
		},
		{
			question: "17. Which of these is a programming language?",
			choices: ["Python", "HTML", "CSS"],
			answer: 0,
		},
		{
			question: "18. What does ISP stand for?",
			choices: [
				"Internet Service Provider",
				"Internet Supply Provider",
				"Internet Source Provider",
			],
			answer: 0,
		},
		{
			question: "19. What type of software is Microsoft PowerPoint?",
			choices: [
				"Presentation software",
				"Spreadsheet software",
				"Word processing software",
			],
			answer: 0,
		},
		{
			question: "20. What does USB stand for?",
			choices: [
				"Universal Serial Bus",
				"Universal System Bus",
				"Universal Storage Bus",
			],
			answer: 0,
		},
	];

	let currentQuestionIndex = 0;
	let userAnswers = new Array(questions.length).fill(null);

	function renderQuestion() {
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
		let score = 0;
		questions.forEach((q, index) => {
			if (userAnswers[index] === q.answer) {
				score++;
			}
		});
		return (score / questions.length) * 100;
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
			alert("Please select an answer before proceeding.");
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
	});
});
