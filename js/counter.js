let count = localStorage.getItem("visitCount") || 0;

count++;

document.getElementById("counter").textContent = count;

localStorage.setItem("visitCount", count);
