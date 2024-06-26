
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price: parseFloat(price), image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} has been added to the cart`);
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.querySelector('#cartTable tbody');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        document.getElementById('emptyMessage').style.display = 'block';
        document.getElementById('cartTable').style.display = 'none';
        document.getElementById('cartTotal').style.display = 'none';
        document.getElementById('continueShoppingButton').style.display = 'none';
        document.getElementById('checkoutButton').style.display = 'none';
        document.getElementById('totalBeforeDiscounts').innerText = '0.00';
        document.getElementById('summaryTotalAmount').innerText = '0.00';
        return;
    }

    let totalBeforeDiscounts = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('tr');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}"> ${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateCart('${item.name}', this.value)"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;
        cartItemsDiv.appendChild(itemElement);
        totalBeforeDiscounts += item.price * item.quantity;
    });

    document.getElementById('totalBeforeDiscounts').innerText = totalBeforeDiscounts.toFixed(2);
    document.getElementById('summaryTotalAmount').innerText = totalBeforeDiscounts.toFixed(2);
    document.getElementById('totalAmount').innerText = totalBeforeDiscounts.toFixed(2); 

    document.getElementById('emptyMessage').style.display = 'none';
    document.getElementById('cartTable').style.display = 'table';
    document.getElementById('cartTotal').style.display = 'block';
    document.getElementById('continueShoppingButton').style.display = 'block';
    document.getElementById('checkoutButton').style.display = 'block';
}

function updateCart(name, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== name);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}


function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function applyDiscounts() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalBeforeDiscounts = parseFloat(document.getElementById('totalBeforeDiscounts').innerText);
    let total = totalBeforeDiscounts;

    const usfeatsChecked = document.getElementById('usfeats').checked;
    const usfcleanChecked = document.getElementById('usfclean').checked;
    const usfhydratesChecked = document.getElementById('usfhydrates').checked;

    if (usfeatsChecked) {
        cart.forEach(item => {
            if (item.name.includes('Bread') || item.name.includes('Muffins') || item.name.includes('Bagels') || item.name.includes('Cookies') || item.name.includes('Croissants (4-pack)')) {
                total -= (item.price * item.quantity) * 0.10;
            }
        });
    }

    if (usfcleanChecked) {
        cart.forEach(item => {
            if (item.name.includes('Soap') || item.name.includes('Cleaner') || item.name.includes('Detergent') || item.name.includes('Towels')) {
                total -= (item.price * item.quantity) * 0.10;
            }
        });
    }

    if (usfhydratesChecked) {
        cart.forEach(item => {
            if (item.name.includes('Juice')) {
                total -= (item.price * item.quantity) * 0.05;
            }
        });
    }

    document.getElementById('summaryTotalAmount').innerText = total.toFixed(2);
}


function checkout() {
    localStorage.removeItem('cart'); 
    displayCart(); 
    document.getElementById('checkoutModal').style.display = 'flex';
}


function closeModal() {
    document.getElementById('checkoutModal').style.display = 'none';
}


document.addEventListener('DOMContentLoaded', displayCart);
