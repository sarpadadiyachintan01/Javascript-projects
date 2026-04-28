
let products = JSON.parse(localStorage.getItem('products')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];


if (products.length === 0) {
    products = [
        { id: "1", name: "Apple iPhone 15", price: 75000, image: "https://placehold.co/400x400/e0e0e0/212121?text=iPhone+15" },
        { id: "2", name: "Sony WH-1000XM5", price: 29990, image: "https://placehold.co/400x400/e0e0e0/212121?text=Sony+Headphones" },
        { id: "3", name: "Dell XPS 13", price: 115000, image: "https://placehold.co/400x400/e0e0e0/212121?text=Dell+XPS+13" },
        { id: "4", name: "Samsung Galaxy Watch 6", price: 29999, image: "https://placehold.co/400x400/e0e0e0/212121?text=Galaxy+Watch+6" },
        { id: "5", name: "Sony PlayStation 5", price: 54990, image: "https://placehold.co/400x400/e0e0e0/212121?text=PlayStation+5" }
    ];
    localStorage.setItem('products', JSON.stringify(products));
}

function switchView(viewId) {
   
    document.querySelectorAll('.view-section').forEach(section => {
        section.style.display = 'none';
    });
    
  
    document.getElementById(`${viewId}-view`).style.display = 'block';

    if (viewId === 'home') applyFilters(); 
    if (viewId === 'cart') renderCart();   
}


document.getElementById('addProductForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('prodName').value.trim();
    const price = parseFloat(document.getElementById('prodPrice').value);
    const image = document.getElementById('prodImage').value.trim();

    // Validation
    if (name.length < 3) return alert('Product name must be at least 3 characters.');
    if (isNaN(price) || price <= 0) return alert('Please enter a valid positive price.');
    if (!image.startsWith('http')) return alert('Please enter a valid image URL starting with http/https.');

    const newProduct = {
        id: Date.now().toString(), 
        name: name,
        price: price,
        image: image
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    // Reset UI
    e.target.reset();
    alert('Product successfully added!');
    switchView('home');
});

document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('sortSelect').addEventListener('change', applyFilters);

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sortVal = document.getElementById('sortSelect').value;

    let filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm));

    if (sortVal === 'low-high') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'high-low') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    renderProducts(filteredProducts);
}

function renderProducts(productList) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    if(productList.length === 0) {
        container.innerHTML = '<h3 style="grid-column: 1/-1;">No products found.</h3>';
        return;
    }

    productList.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price.toLocaleString()}</p>
                <button class="add-cart-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingCartItem = cart.find(item => item.product.id === productId);

    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        cart.push({ product: product, quantity: 1 });
    }

    saveCart();
    alert(`${product.name} added to cart!`);
}

function updateQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.product.id === productId);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity += delta;
        
        // Remove item if quantity falls to 0
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        saveCart();
        renderCart(); 
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').innerText = totalItems;
}

function renderCart() {
    const container = document.getElementById('cart-container');
    const totalEl = document.getElementById('cart-total');
    container.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        container.innerHTML = '<h3>Your cart is empty! Start shopping.</h3>';
        document.querySelector('.cart-summary').style.display = 'none';
    } else {
        document.querySelector('.cart-summary').style.display = 'block';
        
        cart.forEach(item => {
            const itemTotal = item.product.price * item.quantity;
            totalPrice += itemTotal;

            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.product.image}" alt="${item.product.name}">
                    <div class="item-details">
                        <h4>${item.product.name}</h4>
                        <p>₹${item.product.price.toLocaleString()}</p>
                    </div>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity('${item.product.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity('${item.product.id}', 1)">+</button>
                    </div>
                    <div class="item-total">
                        ₹${itemTotal.toLocaleString()}
                    </div>
                </div>
            `;
        });
    }

    totalEl.innerText = totalPrice.toLocaleString();
}


updateCartBadge();
switchView('home');