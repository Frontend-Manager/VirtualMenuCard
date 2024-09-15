// Get the menu-book element
var menuBook = document.getElementById('menu-book');

// Initialize Hammer.js for swipe detection
var hammer = new Hammer(menuBook);

// Handle swipe left and right for page navigation
hammer.on('swipeleft', function() {
    menuBook.scrollBy(window.innerWidth, 0); // Swipe to next page
});

hammer.on('swiperight', function() {
    menuBook.scrollBy(-window.innerWidth, 0); // Swipe to previous page
});