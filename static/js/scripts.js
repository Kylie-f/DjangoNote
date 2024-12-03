document.addEventListener('DOMContentLoaded', () => {
    const bannerContent = document.querySelector('.banner-content');
    const images = document.querySelectorAll('.banner-content img');
    const imageWidth = images[0].offsetWidth; // Get the width of a single image
    const imageCount = images.length;
    let currentIndex = 0;

    // Function to scroll the images one at a time
    function scrollToNextImage() {
        currentIndex++;

        // Scroll to the next image
        bannerContent.style.transition = 'transform 1s ease-in-out'; // Ensure smooth transition
        bannerContent.style.transform = `translateX(-${currentIndex * imageWidth}px)`; // Move by the width of one image

        // If all images have scrolled off-screen, reset to the first image
        if (currentIndex >= imageCount) {
            setTimeout(() => {
                bannerContent.style.transition = 'none'; // Disable transition temporarily
                bannerContent.style.transform = `translateX(0)`; // Reset position to the first image
                // Move the first image to the end for seamless loop
                bannerContent.appendChild(bannerContent.firstElementChild);
                currentIndex = 0;
                setTimeout(() => {
                    bannerContent.style.transition = 'transform 1s ease-in-out'; // Re-enable transition
                }, 50); // Short delay to reset the transition
            }, 1000); // Wait for the transition to finish before resetting
        }
    }

    // Scroll every 5 seconds
    setInterval(scrollToNextImage, 5000);

    // Initial scroll to the first image (no immediate jump)
    scrollToNextImage();
});



//----------------------------------------------
 
document.addEventListener("DOMContentLoaded", function () {
    const noteCards = document.querySelectorAll(".note-card");

    noteCards.forEach(function (noteCard) {
        dragElement(noteCard);
    });

    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        //Starting note position

        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();

            // Get the initial mouse cursor position
            pos3 = e.clientX;
            pos4 = e.clientY;

            // Change position to absolute for dragging
            elmnt.style.position = 'absolute';
            elmnt.style.zIndex = '9999';

            // Add dragging class
            elmnt.classList.add("dragging");

            // Attach event listeners to move and release
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();

            // Calculate new cursor position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            // Update element position
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // Remove event listeners
            document.onmouseup = null;
            document.onmousemove = null;

            // Remove dragging class
            elmnt.classList.remove("dragging");
        }
    }
});