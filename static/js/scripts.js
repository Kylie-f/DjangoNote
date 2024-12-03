// script.js
document.addEventListener('DOMContentLoaded', () => {
    const bannerContent = document.querySelector('.banner-content');
    const images = document.querySelectorAll('.banner-content img');
    const imageCount = images.length;
    let currentIndex = 0;
  
    // Function to scroll the images
    function scrollToNextImage() {
      currentIndex++;
  
      // If all images have scrolled off-screen, reset to the first set
      if (currentIndex >= imageCount) {
        currentIndex = 0;
        bannerContent.style.transition = 'none'; // Disable transition temporarily
        bannerContent.style.transform = `translateX(0%)`; // Reset the position to the first image
        setTimeout(() => {
          bannerContent.style.transition = 'transform 1s ease-in-out'; // Re-enable smooth transition
        }, 50);
      } else {
        bannerContent.style.transform = `translateX(-${currentIndex * 20}%)`; // Scroll the images
      }
    }
  
    // Create a seamless loop by duplicating the images
    function duplicateImages() {
      const clonedBanner = bannerContent.cloneNode(true); // Clone the banner-content
      bannerContent.appendChild(clonedBanner); // Append the clone at the end to the same container
    }
  
    // Initial clone the images for seamless looping
    duplicateImages();
  
    // Scroll every 5 seconds
    setInterval(scrollToNextImage, 5000);
  
    // Initial scroll to the first image
    scrollToNextImage();
  });

//----------------------------------------------
// Get all note-card elements
var noteCards = document.querySelectorAll(".note-card");

// Apply drag functionality to each note card
noteCards.forEach(function(noteCard) {
  dragElement(noteCard);
});

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // Call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // Stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Add a "dragging" class to bring it to the top
        elmnt.classList.add("dragging");
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

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

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        // Remove the "dragging" class when dragging is finished
        elmnt.classList.remove("dragging");
    }
}
