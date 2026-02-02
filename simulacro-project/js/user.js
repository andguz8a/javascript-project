import { getProducts, createOrder } from "./api.js";

const productsContainer = document.getElementById("products");
const orderList = document.getElementById("orderList");

let cart = [];

async function loadMenu() {
    const products = await getProducts();

    productsContainer.innerHTML = "";
    products.forEach(p => {
        productsContainer.innerHTML += `
        <div class="bg-white p-4 rounded shadow">
            <img src="${p.image}" class="w-full h-32 object-cover">
            <h3 class="font-bold">${p.name}</h3>
            <p>$${p.price}</p>
            <button data-id="${p.id}" class="add-btn">
                Add to order
            </button>
        </div>
    `;
    });
}

productsContainer.addEventListener("click", e => {
    if (e.target.classList.contains("add-btn")) {
        const id = Number(e.target.dataset.id);
        cart.push(id);
        renderCart();
    }
});

function renderCart() {
    orderList.innerHTML = cart.map(id => `<li>Producto ${id}</li>`).join("");
}

loadMenu();
