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

document.addEventListener('DOMContentLoaded', (event) => {
    const draggables = document.querySelectorAll('.draggable');
    const dropContainer = document.getElementById('forge');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
        draggable.addEventListener('dragend', dragEnd);
    });

    dropContainer.addEventListener('dragover', dragOver);
    dropContainer.addEventListener('drop', drop);

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    }

    function dragEnd(e) {
        e.target.classList.remove('hide');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggable = document.getElementById(id);
        e.target.appendChild(draggable);
    }
});
