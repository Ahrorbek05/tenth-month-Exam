const wrap = document.querySelector(".cart");
const prod = document.getElementById('product')

function getCart(product) {
  return `
  <div class="cart">
  <h2>${product.name}</h2>
  <div class="cart-item">
      <div class="cart-item__image">
          <img src="${product.image}" alt="Дверной Замок Golden Soft для офиса">
      </div>
      <div class="cart-item__details">
          <p>Дверной Замок Golden Soft для офиса</p>
          <p class="gift">+ Подарок: <a href="#">Приложение к замкам Golden Service</a></p>
          <div class="quantity">
              <button class="quantity__button">-</button>
              <input type="text" class="quantity__input" value="2">
              <button class="quantity__button">+</button>
          </div>
          <p class="price">${product.price * 2}₽</p>
      </div>
      <div class="cart-item__actions">
          <button class="remove-item">Удалить</button>
      </div>
  </div>
  <div class="cart-summary">
      <p>Итого: <span class="total-price">${product.price}₽</span></p>
      <button class="checkout-button">Оформить заказ</button>
      <button class="continue-shopping-button">Продолжить покупки</button>
  </div>
</div>
  `;
}

function save(products) {
  const cart = {
    id: products.id,
    time: products.time,
    name: products.name,
    price: products.newPrice,
  };

  let data = [];
  if (localStorage.getItem("products")) {
    data = JSON.parse(localStorage.getItem("products"));
  }

  data.push(cart);
  localStorage.setItem("products", JSON.stringify(data));

  const card = getCart(cart);
  wrap.innerHTML += card;
}

document.addEventListener("DOMContentLoaded", function () {
  let data = [];
  if (localStorage.getItem("products")) {
    data = JSON.parse(localStorage.getItem("products"));
  }

  if (data.length > 0) {
    data.forEach((value) => {
      const cart = getCart(value);
      wrap.innerHTML += cart;
    });
  }
});

prod.addEventListener('click', function(){
    window.location.assign(`http://127.0.0.1:5500/common.html`)
})
