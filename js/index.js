
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}


function populateModal(modalId, items) {
    const modalContent = document.querySelector(`#${modalId} .dropdown-content`);
    modalContent.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('dropdown-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name} - $${item.price}</span>
            <input type="number" value="1" min="1">
            <button onclick="addToCart('${item.name}', ${item.price}, '${item.image}', this)">Add to Cart</button>
        `;
        modalContent.appendChild(itemElement);
    });
}

const freshProduceItems = [
    { name: 'Bananas', price: '0.59', image: 'img/bb.webp' },
    { name: 'Apples (Gala)', price: '1.29', image: 'img/apple.jpg' },
    { name: 'Baby Carrots (1 lb bag)', price: '1.50', image: 'img/carrot.jpg' },
    { name: 'Romaine Lettuce (head)', price: '1.99', image: 'img/romaine lettuce.jpg' },
    { name: 'Tomatoes (vine-ripened)', price: '1.89', image: 'img/tomato.webp' }
];

const bakeryItems = [
    { name: 'Sourdough Bread (loaf)', price: '3.99', image: 'img/bread loaf.webp' },
    { name: 'Croissants (4-pack)', price: '4.99', image: 'img/crossiant.webp' },
    { name: 'Blueberry Muffins (6-pack)', price: '5.49', image: 'img/blueberry.webp' },
    { name: 'Bagels (6-pack)', price: '3.49', image: 'img/bagel.webp' },
    { name: 'Chocolate Chip Cookies (dozen)', price: '4.50', image: 'img/cookie.webp' }
];

const dairyProductsItems = [
    { name: 'Whole Milk (gallon)', price: '3.49', image: 'img/milk.webp' },
    { name: 'Cheddar Cheese (8 oz block)', price: '2.99', image: 'img/cheese.webp' },
    { name: 'Greek Yogurt (32 oz)', price: '5.99', image: 'img/yogurt.webp' },
    { name: 'Butter (1 lb)', price: '4.49', image: 'img/butter.webp' },
    { name: 'Eggs (dozen, large)', price: '2.99', image: 'img/eggs.webp' }
];

const beveragesItems = [
    { name: 'Orange Juice (64 oz)', price: '3.99', image: 'img/orange.webp' },
    { name: 'Apple Juice (64 oz)', price: '2.99', image: 'img/apple.webp' },
    { name: 'Cranberry Juice (64 oz)', price: '3.49', image: 'img/cranberry.webp' },
    { name: 'Grape Juice (64 oz)', price: '3.99', image: 'img/grape.webp' },
    { name: 'Pineapple Juice (46 oz)', price: '2.49', image: 'img/pineapple.webp' }
];

const cleaningSuppliesItems = [
    { name: 'Dish Soap (22 oz)', price: '2.99', image: 'img/dish soap.webp' },
    { name: 'All-Purpose Cleaner (32 oz)', price: '3.49', image: 'img/all purpouse.webp' },
    { name: 'Laundry Detergent (100 oz)', price: '9.99', image: 'img/laundery.webp' },
    { name: 'Glass Cleaner (32 oz)', price: '2.99', image: 'img/glass cleaner.webp' },
    { name: 'Paper Towels (6-pack)', price: '5.99', image: 'img/toilet.webp' }
];


document.querySelector('.product[onclick="openModal(\'fresh-produce-modal\')"]').addEventListener('click', () => populateModal('fresh-produce-modal', freshProduceItems));
document.querySelector('.product[onclick="openModal(\'bakery-modal\')"]').addEventListener('click', () => populateModal('bakery-modal', bakeryItems));
document.querySelector('.product[onclick="openModal(\'dairy-products-modal\')"]').addEventListener('click', () => populateModal('dairy-products-modal', dairyProductsItems));
document.querySelector('.product[onclick="openModal(\'beverages-modal\')"]').addEventListener('click', () => populateModal('beverages-modal', beveragesItems));
document.querySelector('.product[onclick="openModal(\'cleaning-supplies-modal\')"]').addEventListener('click', () => populateModal('cleaning-supplies-modal', cleaningSuppliesItems));

function addToCart(name, price, image, button) {
    const quantity = parseInt(button.previousElementSibling.value);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ name, price: parseFloat(price), image, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));

 
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    notificationMessage.textContent = `${name} has been added to the cart`;
    notification.style.display = 'block';

    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}
