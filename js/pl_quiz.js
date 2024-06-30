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
			question: "1. Co oznacza HTML?",
			choices: [
				"Hyper Text Markup Language",
				"Hot Mail",
				"Hyper Text Marking Language",
				"How to Make Lasagna",
			],
			answer: 0,
		},
		{
			question: "2. Co oznacza CSS?",
			choices: [
				"Cascading Style Sheets",
				"Cascading System Sheets",
				"Cascading Simple Sheets",
			],
			answer: 0,
		},
		{
			question: "3. Co oznacza CPU?",
			choices: [
				"Central Processing Unit",
				"Computer Personal Unit",
				"Central Processor Unit",
			],
			answer: 0,
		},
		{
			question: "4. Jaka jest główna funkcja systemu operacyjnego?",
			choices: [
				"Zarządzanie zasobami sprzętowymi i programowymi komputera",
				"Przeglądanie internetu",
				"Edytowanie dokumentów",
			],
			answer: 0,
		},
		{
			question: "5. Która z poniższych jest przeglądarką internetową?",
			choices: ["Google Chrome", "Microsoft Word", "Adobe Photoshop"],
			answer: 0,
		},
		{
			question: "6. Co oznacza RAM?",
			choices: [
				"Random Access Memory",
				"Read Access Memory",
				"Run Access Memory",
			],
			answer: 0,
		},
		{
			question: "7. Jaka jest funkcja routera w sieci?",
			choices: [
				"Przekazywanie pakietów danych między sieciami komputerowymi",
				"Przechowywanie danych",
				"Uruchamianie aplikacji",
			],
			answer: 0,
		},
		{
			question: "8. Który program służy do tworzenia dokumentów?",
			choices: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"],
			answer: 0,
		},
		{
			question: "9. Co oznacza URL?",
			choices: [
				"Uniform Resource Locator",
				"Universal Resource Locator",
				"Uniform Resource Link",
			],
			answer: 0,
		},
		{
			question:
				"10. Jakie rozszerzenie pliku jest używane dla dokumentu Microsoft Excel?",
			choices: [".xlsx", ".docx", ".pptx", ".excel"],
			answer: 0,
		},
		{
			question:
				"11. Jaki jest skrót do kopiowania tekstu w większości programów?",
			choices: ["Ctrl + C", "Ctrl + V", "Ctrl + X"],
			answer: 0,
		},
		{
			question: "12. Co oznacza LAN?",
			choices: [
				"Local Area Network",
				"Large Area Network",
				"Long Area Network",
			],
			answer: 0,
		},
		{
			question:
				"13. Jaki jest główny cel klienta poczty e-mail, takiego jak Microsoft Outlook?",
			choices: [
				"Wysyłanie i odbieranie e-maili",
				"Przeglądanie internetu",
				"Edytowanie zdjęć",
			],
			answer: 0,
		},
		{
			question: "14. Która firma opracowała system operacyjny Windows?",
			choices: ["Microsoft", "Apple", "Google"],
			answer: 0,
		},
		{
			question: "15. Co oznacza HTTP?",
			choices: [
				"Hypertext Transfer Protocol",
				"Hypertext Transfer Program",
				"Hyper Transfer Text Protocol",
			],
			answer: 0,
		},
		{
			question: "16. Jakie jest główne zastosowanie Microsoft Excel?",
			choices: [
				"Obliczenia w arkuszu kalkulacyjnym",
				"Tworzenie dokumentów",
				"Edytowanie zdjęć",
			],
			answer: 0,
		},
		{
			question: "17. Który z tych jest językiem programowania?",
			choices: ["Python", "HTML", "CSS"],
			answer: 0,
		},
		{
			question: "18. Co oznacza ISP?",
			choices: [
				"Dostawca usług internetowych",
				"Dostawca dostaw internetowych",
				"Dostawca źródeł internetowych",
			],
			answer: 0,
		},
		{
			question: "19. Jakiego typu oprogramowaniem jest Microsoft PowerPoint?",
			choices: [
				"Oprogramowanie do prezentacji",
				"Oprogramowanie do arkuszy kalkulacyjnych",
				"Oprogramowanie do przetwarzania tekstu",
			],
			answer: 0,
		},
		{
			question: "20. Co oznacza USB?",
			choices: [
				"Uniwersalna magistrala szeregowa",
				"Uniwersalna magistrala systemowa",
				"Uniwersalna magistrala pamięci",
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
			alert("Proszę wybrać odpowiedź przed przejściem dalej.");
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
					feedback = "Możesz być lepszy.";
				} else if (percentage < 75) {
					feedback = "Nieźle.";
				} else if (percentage < 90) {
					feedback = "Całkiem dobrze.";
				} else {
					feedback = "Jesteś mistrzem komputerowym.";
				}
				result.innerHTML = `Twój wynik: ${percentage}%. ${feedback}`;
				retryQuiz.style.display = "block";
			} else {
				alert(
					"Proszę odpowiedzieć na wszystkie pytania przed ich sprawdzeniem."
				);
			}
		} else {
			alert("Proszę wybrać odpowiedź.");
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
