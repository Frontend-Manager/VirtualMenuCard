document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://api.sheety.co/40cdb086bff82a3c12266121dd5025de/demo/sheet1'; // Your Google Sheet API
    const menuBook = document.getElementById('menu-book');
    let touchStartX = 0;

    // Fetch data from Google Sheet
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const pages = {};

            // Group dishes by page number and category
            data.forEach(dish => {
                const pageNum = dish.Page;
                const category = dish.Category;

                if (!pages[pageNum]) {
                    pages[pageNum] = {};
                }
                if (!pages[pageNum][category]) {
                    pages[pageNum][category] = [];
                }
                pages[pageNum][category].push(dish);
            });

            // Create and append pages
            Object.keys(pages).forEach(pageNum => {
                const pageElement = document.createElement('div');
                pageElement.classList.add('page');
                pageElement.innerHTML = `<h2>Page ${pageNum}</h2>`;

                // Loop through categories on each page
                Object.keys(pages[pageNum]).forEach(category => {
                    const categoryElement = document.createElement('div');
                    categoryElement.classList.add('category');
                    categoryElement.textContent = category;

                    // Create and populate dish grid for this category
                    const dishGrid = document.createElement('div');
                    dishGrid.classList.add('dish-grid');

                    pages[pageNum][category].forEach(dish => {
                        const dishCard = document.createElement('div');
                        dishCard.classList.add('dish-card');

                        // Create dish image element
                        const dishImage = document.createElement('img');
                        dishImage.src = dish['Image URL'];
                        dishImage.alt = dish['Dish Name'];
                        dishImage.classList.add('dish-image');

                        // Create dish name element
                        const dishName = document.createElement('p');
                        dishName.textContent = dish['Dish Name'];

                        // Create dish price element
                        const dishPrice = document.createElement('p');
                        dishPrice.textContent = `₹${dish.Price}`; // Price in INR

                        // Append elements to dish card
                        dishCard.appendChild(dishImage);
                        dishCard.appendChild(dishName);
                        dishCard.appendChild(dishPrice);

                        // Append dish card to dish grid
                        dishGrid.appendChild(dishCard);
                    });

                    // Append category and dish grid to page element
                    pageElement.appendChild(categoryElement);
                    pageElement.appendChild(dishGrid);
                });

                // Append page element to menu book container
                menuBook.appendChild(pageElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Swipe functionality
    menuBook.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    menuBook.addEventListener('touchmove', (e) => {
        const touchEndX = e.touches[0].clientX;
        const touchDiff = touchStartX - touchEndX;

        if (Math.abs(touchDiff) > 50) { // Swipe threshold
            if (touchDiff > 0) {
                // Swipe left - move to next page
                menuBook.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
            } else {
                // Swipe right - move to previous page
                menuBook.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
            }
            touchStartX = touchEndX; // Reset the start point
        }
    });
});
