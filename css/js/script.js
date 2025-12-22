const menuData = [
  { id: 1, name: "Espresso", price: 3, ingredients: ["Coffee Beans", "Hot Water"] },
  { id: 2, name: "Cappuccino", price: 4, ingredients: ["Espresso", "Milk Foam", "Steamed Milk"] },
  { id: 3, name: "Latte", price: 5, ingredients: ["Espresso", "Milk", "Cream"] }
];

function loadMenu() {
    const menu = document.getElementById("menu");
    if (!menu) {
        console.error("Menu container not found!");
        return;
    }

    menuData.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "menu-card fade-in-card";
        div.style.animationDelay = `${index * 0.2}s`;
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <div class="ingredients">
              ${item.ingredients.map(i => `<span>${i}</span>`).join("")}
            </div>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menu.appendChild(div);
    });
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[id]) {
        cart[id]++;
    } else {
        cart[id] = 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${menuData.find(i => i.id === id).name} added to cart!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// Wait until page fully loads
window.onload = loadMenu;

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
}

// Load theme
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
}
