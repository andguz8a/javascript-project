import { getProducts } from "./api.js";

const container = document.getElementById("productsContainer");
const searchInput = document.querySelector("input[type='search']");
const categoryButtons = document.querySelectorAll("[data-category]");

let allProducts = [];
let activeCategory = "all";

async function loadProducts() {
    allProducts = await getProducts();
    renderProducts();
}

// 🖼 Render cards
function renderProducts() {
    const search = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(p => {
        const matchCategory =
            activeCategory === "all" || p.category === activeCategory;

        const matchSearch =
            p.name.toLowerCase().includes(search);

        return matchCategory && matchSearch;
    });

    container.innerHTML = "";

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl shadow p-4 flex flex-col";

        card.innerHTML = `
            <img src="${product.image}"
                 class="h-32 object-cover rounded mb-3">

            <h3 class="font-semibold">${product.name}</h3>
            <p class="text-sm text-gray-500 mb-2">${product.category}</p>

            <div class="mt-auto flex justify-between items-center">
                <span class="font-bold text-green-600">$${product.price}</span>
                <button class="bg-green-500 text-white px-3 py-1 rounded text-sm">
                    Add
                </button>
            </div>
        `;

        card.querySelector("button").addEventListener("click", () => {
            window.addToCart({
                id: product.id,
                name: product.name,
                price: product.price
            });
        });

        container.appendChild(card);
    });
}

// 🔎 Search
searchInput.addEventListener("input", renderProducts);

// 🏷 Categories
categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;

        categoryButtons.forEach(b => b.classList.remove("bg-black", "text-white"));
        btn.classList.add("bg-black", "text-white");

        renderProducts();
    });
});

loadProducts();


