var hintTime = 30000;
var hintInterval = false;
var hintsEnabled = false;
var touchinprogress=false;
var listened=false;
bugfix=()=>{
	var imgs = document.getElementsByTagName("img");
	for (var i=0; i<imgs.length; i++){
		if (imgs[i].parentNode.nodeName=='BODY'){
			imgs[i].remove();
		}
	}
};
prepSlots();
prepElements();
prepIcons();
setTimeout(prepHome,0);
openm('home');
if (document.monetization) {
	document.monetization.addEventListener('monetizationstart', () => {
		hintTime = 10000;
	})
}
const toggleTheme = document.getElementById("toggleTheme");
let darkMode = false;

toggleTheme.addEventListener("click", () => {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.classList.add("dark-theme");
    // Add any other UI changes here
  } else {
    document.body.classList.remove("dark-theme");
    // Remove any other UI changes here
  }
});