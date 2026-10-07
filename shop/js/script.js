let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const productsContainer = document.querySelector('.products');

products.forEach((product) => {
    const card = document.createElement('article');
    card.classList.add('product-card');

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.name;

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const name = document.createElement('h2');
    name.textContent = product.name;

    const price = document.createElement('p');
    price.classList.add('product-price');
    price.textContent = `${product.price} ₽`;

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Добавить в корзину';

    productInfo.append(name, price, button);
    card.append(image, productInfo);
    productsContainer.append(card);

    button.addEventListener('click', () => {
        const existingProduct = cart.find(
            (item) => item.id === product.id
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        saveCart();
        renderCart();
    });
});

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
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;

        const itemInfo = document.createElement('div');
        itemInfo.classList.add('cart-item-info');

        const itemName = document.createElement('span');
        itemName.classList.add('cart-item-name');
        itemName.textContent = product.name;

        const itemPrice = document.createElement('span');
        itemPrice.classList.add('cart-item-price');
        itemPrice.textContent = `${product.price} ₽`;

        const quantityControls = document.createElement('div');
        quantityControls.classList.add('quantity-controls');

        const decreaseButton = document.createElement('button');
        decreaseButton.classList.add(
            'quantity-button',
            'decrease-button'
        );
        decreaseButton.type = 'button';
        decreaseButton.textContent = '−';

        const quantity = document.createElement('span');
        quantity.textContent = product.quantity;

        const increaseButton = document.createElement('button');
        increaseButton.classList.add(
            'quantity-button',
            'increase-button'
        );
        increaseButton.type = 'button';
        increaseButton.textContent = '+';

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.type = 'button';
        removeButton.textContent = 'Удалить';

        quantityControls.append(
            decreaseButton,
            quantity,
            increaseButton
        );

        itemInfo.append(
            itemName,
            itemPrice,
            quantityControls
        );

        item.append(
            image,
            itemInfo,
            removeButton
);

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