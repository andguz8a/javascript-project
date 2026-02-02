import { createOrder } from "./api.js";

const orderItems = document.getElementById("orderItems");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");
const confirmBtn = document.querySelector("aside button");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ======================
   FUNCIONES PRINCIPALES
====================== */

// ➕ Agregar producto (SIN duplicar)
window.addToCart = function (product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveAndRender();
};

// ➕➖ Cambiar cantidad
window.changeQty = function (id, amount) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.qty += amount;

    if (item.qty <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    saveAndRender();
};

// 🗑 Limpiar carrito
window.clearCart = function () {
    cart = [];
    saveAndRender();
};

// 💾 Guardar + renderizar
function saveAndRender() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// 🧾 Render del carrito
function renderCart() {
    orderItems.innerHTML = "";

    if (cart.length === 0) {
        orderItems.innerHTML = `<p class="text-sm text-gray-400">No items added</p>`;
        updateTotals();
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "flex justify-between items-center mb-3 text-sm";

        div.innerHTML = `
            <div>
                <p class="font-medium">${item.name}</p>
                <p class="text-xs text-gray-500">$${item.price}</p>
            </div>

            <div class="flex items-center gap-2">
                <button onclick="changeQty(${item.id}, -1)"
                    class="px-2 bg-gray-200 rounded">−</button>

                <span>${item.qty}</span>

                <button onclick="changeQty(${item.id}, 1)"
                    class="px-2 bg-gray-200 rounded">+</button>
            </div>
        `;

        orderItems.appendChild(div);
    });

    updateTotals();
}

// 💰 Totales
function updateTotals() {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

// ✅ Confirmar orden
if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty");
            return;
        }

        createOrder({
            userId: JSON.parse(localStorage.getItem("user"))?.id || 1,
            products: cart,
            date: new Date().toISOString()
        });

        alert("✅ Order placed!");
        cart = [];
        saveAndRender();
    });
}

// Init
renderCart();
