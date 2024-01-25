// Products Array
const products = [
    {
        id: 1,
        title: "Autumn Hoodie",
        price: 264.9,
        image: "Assets/product_1.png"
    },
    {
        id: 2,
        title: "FUSHION HOODIE",
        price: 295,
        image: "Assets/product_2.png"
    },
    {
        id: 3,
        title: "Chestnut Brown",
        price: 74.9,
        image: "Assets/product_3.png"
    },
    {
        id: 4,
        title: "Nike Sportswear",
        price: 80,
        image: "Assets/product_4.png"
    },
    {
        id: 5,
        title: "Champion BASIC",
        price: 48.99,
        image: "Assets/product_5.png"
    },
    {
        id: 6,
        title: "Cotton Hoodie",
        price: 395,
        image: "Assets/product_6.png"
    },
    {
        id: 7,
        title: "CLASSIC CREWNECK",
        price: 48.99,
        image: "Assets/product_7.png"
    },
    {
        id: 8,
        title: "THPE HOODED",
        price: 79.99,
        image: "Assets/product_8.png"
    },
];



// DOM Elements
const productList = document.getElementById("productList");
const cartItemsElement = document.getElementById("cartItems");

// Cart Storage in Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render Products On Page
function renderProduct(product) {
    return `
        <div class="product">
            <img src="${product.image}" alt="${product.title}" class="product-img" >
            <div class="product-info">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-price">${product.price.toFixed(2)}</p>
                <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
            </div>
        </div>
    `;
}

function renderProducts() {
    productList.innerHTML = products.map(renderProduct).join("");
}

// Render Products On Cart Page
function renderCartItem(item) {
    return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input type="number" name="" min="1" value="${item.quantity}" data-id="${item.id}" class="cart-item-quantity">
            </div>
            <h2 class="cart-item-price">${item.price}</h2>
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        </div>
    `;
}

function renderCartItems() {
    cartItemsElement.innerHTML = cart.map(renderCartItem).join("");
}

// Check If On Cart Page
if (window.location.pathname.includes("cart.html")) {
    renderCartItems();
} else {
    renderProducts();
}
