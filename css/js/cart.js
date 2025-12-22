const menuData = [
  { id: 1, name: "Espresso", price: 3, ingredients: ["Coffee Beans", "Hot Water"] },
  { id: 2, name: "Cappuccino", price: 4, ingredients: ["Espresso", "Milk Foam", "Steamed Milk"] },
  { id: 3, name: "Latte", price: 5, ingredients: ["Espresso", "Milk", "Cream"] }
];

let cart = JSON.parse(localStorage.getItem("cart")) || {};
const container = document.getElementById("cart-items");
let total = 0;

function updateCart() {
    container.innerHTML = '';
    total = 0;
    let itemCount = 0;
    if (Object.keys(cart).length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some delicious coffee to get started!</p>
                <a href="menu.html" class="cta-btn">Browse Menu</a>
            </div>
        `;
    } else {
        Object.keys(cart).forEach(id => {
            const item = menuData.find(i => i.id == id);
            if (item) {
                const quantity = cart[id];
                itemCount += quantity;
                const div = document.createElement("div");
                div.className = 'cart-item fade-in';
                div.innerHTML = `
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price} each</p>
                    </div>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${id}, -1)">-</button>
                        <span>${quantity}</span>
                        <button onclick="changeQuantity(${id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${id})">Remove</button>
                `;
                container.appendChild(div);
                total += item.price * quantity;
            }
        });
    }
    document.getElementById("total").innerText = "Total: $" + total.toFixed(2);
    document.getElementById("cart-count").innerText = itemCount;
}

function changeQuantity(id, delta) {
    if (cart[id]) {
        cart[id] += delta;
        if (cart[id] <= 0) {
            delete cart[id];
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}

function removeItem(id) {
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

updateCart();
