let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const productCards = document.querySelectorAll('.product-card');

productCards.forEach((card) => {
    const button = card.querySelector('button');

    button.addEventListener('click', () => {
        const productId = Number(card.dataset.id);
    
        const existingProduct = cart.find(
            (product) => product.id === productId
        );
    
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            const product = {
                id: productId,
                name: card.dataset.name,
                price: Number(card.dataset.price),
                image: card.querySelector('img').src,
                    quantity: 1
            };

            cart.push(product);
        }    
    
        saveCart();
        renderCart();
    });
});

function renderCart() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста</p>';
        cartTotal.textContent = '0 ₽';
        return;
    }

    let total = 0;

    cart.forEach((product) => {
        total += product.price * product.quantity;

        const item = document.createElement('div');

        item.classList.add('cart-item');

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
    
            <div class="cart-item-info">
                <span class="cart-item-name">${product.name}</span>
                <span class="cart-item-price">${product.price} ₽</span>
            
                <div class="quantity-controls">
                    <button
                        class="quantity-button decrease-button"
                        type="button"
                    >
                        −
                    </button>

                    <span>${product.quantity}</span>

                    <button
                        class="quantity-button increase-button"
                        type="button"
                    >
                        +
                    </button>
                </div>
            </div>
        
            <button class="remove-button" type="button">
                Удалить
            </button>
        `;

        const decreaseButton = item.querySelector('.decrease-button');
        const increaseButton = item.querySelector('.increase-button');
        const removeButton = item.querySelector('.remove-button');

        decreaseButton.addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity -= 1;
                saveCart();
            }

            renderCart();
        });

        increaseButton.addEventListener('click', () => {
            product.quantity += 1;

            saveCart();
            renderCart();
        });

        removeButton.addEventListener('click', () => {
            const productIndex = cart.findIndex(
                (item) => item.id === product.id
            );

            cart.splice(productIndex, 1);

            saveCart();
            renderCart();
        });

        cartItems.appendChild(item);
    });

    cartTotal.textContent = `${total} ₽`;
}

renderCart();

const checkoutButton = document.querySelector('.checkout-button');
const orderModal = document.querySelector('#order-modal');
const closeModalButton = document.querySelector('.modal-close');
const orderForm = document.querySelector('.order-form');
const orderSuccess = document.querySelector('.order-success');

checkoutButton.addEventListener('click', () => {
    orderSuccess.hidden = true;
    orderModal.style.display = 'flex';
});

closeModalButton.addEventListener('click', () => {
    orderModal.style.display = 'none';
});


orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    orderSuccess.hidden = false;

    orderForm.reset();

    cart = [];
    saveCart();
    renderCart();
});