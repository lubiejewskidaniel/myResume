async function getVisitsCount() {
	try {
		const response = await fetch(
			"https://daniellubiejewski.com/get-visits-count"
		);
		if (!response.ok) {
			throw new Error("Failed to fetch visits count");
		}
		const data = await response.json();
		return data.count;
	} catch (error) {
		console.error(error);
		return 0;
	}
}

async function updateCounter() {
	const counterElement = document.getElementById("counter");
	if (counterElement) {
		const count = await getVisitsCount();
		counterElement.textContent = count;
	}
}

window.addEventListener("load", updateCounter);
