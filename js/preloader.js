window.addEventListener("load", () => {
	setTimeout(() => {
		const preloader = document.querySelector(".preloader");
		preloader.style.opacity = "0";
		preloader.style.visibility = "hidden";

		setTimeout(() => {
			preloader.remove();
		}, 1000);
	}, 5000);
});

function handleFeedback() {
	window.location.href = 'feedback.html';
}
