function addProduct() {
    let name = document.getElementById('product-name').value;
    let price = document.getElementById('product-price').value;
    let description = document.getElementById('product-description').value;
    let image = document.getElementById('product-image').value;

    let productHTML = `
        <div class="product">
            <img src="${image}" width="100%" alt="${name}">
            <h3>${name}</h3>
            <p>${description}</p>
            <p><strong>$${price}</strong></p>
        </div>
    `;

    localStorage.setItem(name, productHTML);
    alert("Product Added!");
}

function loadProducts() {
    let productsContainer = document.getElementById('products');
    if (!productsContainer) return;

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        productsContainer.innerHTML += localStorage.getItem(key);
    }
}

document.addEventListener("DOMContentLoaded", loadProducts);
