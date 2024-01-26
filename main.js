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
const cartTotalElement = document.getElementById("cartTotal");

// Cart Items in Local Storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render Products on Page
function renderProducts() {
  productList.innerHTML = products.map(renderProduct).join("");
  addAddToCartListeners();
}

// Render a single Product
function renderProduct(product) {
  return `
    <div class="product">
      <img src="${product.image}" alt="${product.title}" class="product-img">
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">${product.price.toFixed(2)}</p>
        <a class="add-to-cart" data-id="${product.id}" >Add to cart</a>
      </div>
    </div>`;
}

// Add Event Listeners for "Add to Cart" buttons
function addAddToCartListeners() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", addToCart);
  });
}

// Add to Cart
function addToCart(event) {
  const productId = parseInt(event.target.dataset.id);
  const product = products.find(product => product.id === productId);

  if (product) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }

    // Change Add to cart text to added
    event.target.textContent = "Added";
    updateCartIcon();
    // Save updated cart to localStorage
    saveCartToLocalStorage();

    // Render Cart Items
    renderCartItems();
    calculateCartTotlal();
  }
}

// Remove from Cart
function removeFromCart(event) {
  const productId = parseInt(event.target.dataset.id);
  cart = cart.filter(item => item.id !== productId);
  saveCartToLocalStorage();
  renderCartItems();
  calculateCartTotlal();
  updateCartIcon();
}

// SaveToLocalStorage
function changeQuantity(event) {
  const productID = parseInt(event.target.dataset.id);
  const quantity = parseInt(event.target.value);

  if (quantity > 0) {
    const cartItem = cart.find((item) => item.id === productID);
    if (cartItem) {
      cartItem.quantity = quantity;
      saveCartToLocalStorage();
      calculateCartTotlal();
      updateCartIcon();
    }
  }
}

// Function to save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Render Cart Items on Cart Page
function renderCartItems() {
  cartItemsElement.innerHTML = cart.map(renderCartItem).join("");
  addRemoveFromCartListeners();
}

// Render a single Cart Item
function renderCartItem(item) {
  if (!item || !item.image) {
    return ''; // Or handle it differently based on requirements
  }

  return `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-info">
        <h2 class="cart-item-title">${item.title}</h2>
        <input type="number" name="" min="1" value="${item.quantity}" data-id="${item.id}" class="cart-item-quantity">
      </div>
      <h2 class="cart-item-price">${item.price}</h2>
      <button class="remove-from-cart" data-id="${item.id}">Remove</button>
    </div>`;
}

// Add Event Listeners for "Remove from Cart" buttons
function addRemoveFromCartListeners() {
  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
  removeFromCartButtons.forEach(button => {
    button.addEventListener("click", removeFromCart);
  });

  // Quantity Change
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", changeQuantity);
  })
}

// Claculate Total
function calculateCartTotlal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalElement.textContent = `Total: ${total.toFixed(2)}`;
}

// Check if on Cart Page and render accordingly
if (window.location.pathname.includes("cart.html")) {
  renderCartItems();
  addRemoveFromCartListeners();
  calculateCartTotlal();
} else {
  renderProducts();
}

// Cart Icon Quantity
const cartIcon = document.getElementById('cart-icon')

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartIcon.setAttribute('data-quantity', totalQuantity)
}

updateCartIcon();

function updateCartIconOnCartChange() {
  updateCartIcon();
}

window.addEventListener("storage", updateCartIconOnCartChange);

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.setAttribute("data-quantity", totalQuantity);
}

calculateCartTotlal();