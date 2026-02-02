const API_URL = "http://localhost:3000";

export async function getProducts() {
    const res = await fetch(`${API_URL}/products`);
    return await res.json();
}

export async function createOrder(order) {
    return fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    });
}
