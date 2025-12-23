const menuData = [
  { id: 1, name: "Espresso", price: 3, ingredients: ["Coffee Beans", "Hot Water"] },
  { id: 2, name: "Cappuccino", price: 4, ingredients: ["Espresso", "Milk Foam", "Steamed Milk"] },
  { id: 3, name: "Latte", price: 5, ingredients: ["Espresso", "Milk", "Cream"] }
];

function loadCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");
    
    if (!checkoutItems || !checkoutTotal) return;
    
    checkoutItems.innerHTML = '';
    let total = 0;
    
    if (Object.keys(cart).length === 0) {
        checkoutItems.innerHTML = '<p>Your cart is empty. <a href="menu.html">Go back to menu</a></p>';
        checkoutTotal.textContent = 'Total: $0.00';
        return;
    }
    
    Object.keys(cart).forEach(id => {
        const item = menuData.find(i => i.id == id);
        if (item) {
            const quantity = cart[id];
            const itemTotal = item.price * quantity;
            total += itemTotal;
            
            const div = document.createElement("div");
            div.className = 'checkout-item';
            div.innerHTML = `
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price} × ${quantity} = $${itemTotal.toFixed(2)}</p>
                </div>
            `;
            checkoutItems.appendChild(div);
        }
    });
    
    checkoutTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// API configuration
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://coffee-hub-website-tazh.vercel.app';

async function submitOrder(e) {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const items = Object.keys(cart).map(id => {
        const item = menuData.find(i => i.id == id);
        return { ...item, quantity: cart[id] };
    });
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const customerName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    // Validate form
    if (!customerName || !email || !address) {
        alert("Please fill in all required fields");
        return;
    }

    if (items.length === 0) {
        alert("Your cart is empty");
        return;
    }

    try {
        console.log('Sending order:', { items, total, customerName, email, address });

        const res = await fetch(`${API_BASE_URL}/api/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items, total, customerName, email, address })
        });

        const data = await res.json();
        console.log('Response:', res.status, data);

        if (res.ok) {
            alert(data.message);
            localStorage.removeItem("cart");
            window.location.href = "success.html";
        } else {
            alert("Error placing order: " + (data.message || "Unknown error"));
        }
    } catch (error) {
        console.error('Network error:', error);
        alert("Network error. Please check if the server is running.");
    }
}

// Load checkout items when page loads
window.onload = loadCheckout;

// Add form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', submitOrder);
    }
});
