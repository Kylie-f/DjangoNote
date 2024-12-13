document.addEventListener('DOMContentLoaded', () => {
    //adds event listener for HTML page (dom content loaded) then starts the function
    const bannerContent = document.querySelector('.banner-content');
    const images = document.querySelectorAll('.banner-content img');
    const imageWidth = images[0].offsetWidth;
    const imageCount = images.length;
    let currentIndex = 0;
    //set variables and pull from HTML page

    function scrollToNextImage() {
        currentIndex++;

        bannerContent.style.transition = 'transform 1s ease-in-out'; 
        bannerContent.style.transform = `translateX(-${currentIndex * imageWidth}px)`; 

        if (currentIndex >= imageCount) {
            setTimeout(() => {
                bannerContent.style.transition = 'none';
                bannerContent.style.transform = `translateX(0)`;
                bannerContent.appendChild(bannerContent.firstElementChild);
                currentIndex = 0;
                setTimeout(() => {
                    bannerContent.style.transition = 'transform 1s ease-in-out';
                }, 50);
            }, 1000);
        }
    }
    //scrolls to next image, itterates through each image and transitions between them from JS styles

    setInterval(scrollToNextImage, 5000);

    scrollToNextImage();
    //sets scrolling to 5000 milliseconds then calls function
});

//----------------------------------------------
 
document.addEventListener("DOMContentLoaded", function () {
    const noteCards = document.querySelectorAll(".note-card");

    noteCards.forEach(function (noteCard) {
        dragElement(noteCard);
    });

    function dragElement(elmnt) {
        //drag function
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();

            pos3 = e.clientX;
            pos4 = e.clientY;

            elmnt.style.position = 'absolute';
            elmnt.style.zIndex = '9999';

            elmnt.classList.add("dragging");

            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        //checks to see if cursor is down and dragging, then will call element drag

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        //drags element (div) accross background (div background)

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;

            elmnt.classList.remove("dragging");
        }
        //ends the tag of dragging and sets location of note to where it is
    }
});