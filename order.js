// Initialize cart from localStorage or as an empty array
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const menuItems = document.querySelectorAll('.menu-item');
const orderBtn = document.querySelector('.order-btn');

// Create a modal for displaying cart items
const cartModal = document.createElement('div');
cartModal.classList.add('cart-modal');
Object.assign(cartModal.style, {
    display: 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: '1000',
});

document.body.appendChild(cartModal);

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update the cart button with total price and items count
function updateCartButton() {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const totalItems = cart.length;
    orderBtn.innerHTML = `<h3>View Cart (${totalItems} items | $${totalPrice.toFixed(2)})</h3>`;
}

// Event listener for menu item clicks
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const itemName = item.getAttribute('data-name');
        const itemPrice = parseFloat(item.getAttribute('data-price'));

        const existingItem = cart.find(cartItem => cartItem.name === itemName);
        if (!existingItem) {
            cart.push({ name: itemName, price: itemPrice });
            saveCart();
            updateCartButton();

            // Visual feedback for adding item
            item.style.backgroundColor = "#d4edda"; // Light green
            item.style.borderColor = "#28a745";     // Green border
        }
    });
});

// Event listener for the order button to show cart items
orderBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }

    cartModal.innerHTML = `
        <h3>Cart Items</h3>
        <ul>
            ${cart.map((item, index) => `
                <li>
                    ${item.name} - $${item.price.toFixed(2)}
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </li>
            `).join('')}
        </ul>
        <h4>Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</h4>
        <button id="closeCart">Close</button>
    `;

    cartModal.style.display = 'block';

    // Event listeners for remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            saveCart();
            updateCartButton();
            orderBtn.click(); // Refresh modal
        });
    });

    // Close modal event
    document.getElementById('closeCart').addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
});

// Initialize cart button on page load
updateCartButton();