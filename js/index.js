// JavaScript for swipe gestures
let startX, endX;

document.getElementById('menu-book').addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

document.getElementById('menu-book').addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    if (startX - endX > 50) {
        // Swipe Left
        document.getElementById('menu-book').scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    } else if (endX - startX > 50) {
        // Swipe Right
        document.getElementById('menu-book').scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    }
}
