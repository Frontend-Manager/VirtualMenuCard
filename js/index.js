document.addEventListener('DOMContentLoaded', function() {
        const apiUrl = 'https://sheetdb.io/api/v1/r9npyrr275u4l'; // Your Google Sheet API
        const menuBook = document.getElementById('menu-book');
        let touchStartX = 0;

        // Fetch data from Google Sheet
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const pages = {};

                // Group dishes by page number
                data.forEach(dish => {
                    const pageNum = dish.Page;
                    if (!pages[pageNum]) {
                        pages[pageNum] = [];
                    }
                    pages[pageNum].push(dish);
                });

                // Create and append pages
                Object.keys(pages).forEach(pageNum => {
                    const pageElement = document.createElement('div');
                    pageElement.classList.add('page');

                    // Create and populate dish grid
                    const dishGrid = document.createElement('div');
                    dishGrid.classList.add('dish-grid');

                    pages[pageNum].forEach(dish => {
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
                        dishPrice.textContent = `${dish.Price}`;

                        // Append elements to dish card
                        dishCard.appendChild(dishImage);
                        dishCard.appendChild(dishName);
                        dishCard.appendChild(dishPrice);

                        // Append dish card to dish grid
                        dishGrid.appendChild(dishCard);
                    });

                    // Append dish grid to page element
                    pageElement.appendChild(dishGrid);
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
