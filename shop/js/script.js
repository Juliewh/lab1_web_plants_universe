const cart = [];

const productCards = document.querySelectorAll('.product-card');

console.log('Товаров в каталоге:', productCards.length);

productCards.forEach((card) => {
    const button = card.querySelector('button');

    button.addEventListener('click', () => {
        const product = {
            id: Number(card.dataset.id),
            name: card.dataset.name,
            price: Number(card.dataset.price),
            image: card.querySelector('img').src
        };

        cart.push(product);
        
        renderCart();

        console.log('Корзина:', cart);
    });
});

function renderCart() {
    const cartItems = document.querySelector('.cart-items');

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста</p>';
        return;
    }

    cart.forEach((product) => {
        const item = document.createElement('div');

        item.classList.add('cart-item');

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
    
            <div class="cart-item-info">
                <span class="cart-item-name">${product.name}</span>
                <span class="cart-item-price">${product.price} ₽</span>
            </div>
        `;

        cartItems.appendChild(item);
    });
}