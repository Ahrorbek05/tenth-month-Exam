import { getData } from "../javascript/function.js";

const wrapper = document.querySelector(".product-information");
const loader = document.querySelector(".loader");

function getStoredProducts() {
  let products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
}

function saveProductToStorage(product) {
  let products = getStoredProducts();
  let confirm = products.some((el) => el.id === product.id);
  if (!confirm) {
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    alert("Muvaffaqqiyatli saqlandi");
  } else {
    alert("Bunday mahsulotdan mavjud");
  }
}

function createProductCard(product) {
  return `
    <div class="information_product information_product_container" data-id="${product.id}">
      <img width="500" height="500" src="${product.image}" alt="picture">
      <div class="info">
        <h1>${product.name}</h1>
        <p>Замок дверной электронный Golden Soft GS-200Z-5 имеет роскошный глянцевый блеск, четкие линии,
            красивые формы.</p>
        <p>Подходит для установки на деревянную/межкомнатную дверь.</p>
        <h6>Цена</h6>
        <span>
          <h5 class="new_price">${product.newPrice / 1000}₽</h5>
          <h5 class="old_price">${product.oldPrice / 1000}₽</h5>
        </span>
        <button class="button">КОРЗИНКА</button>
      </div>
    </div>`;
}

document.addEventListener("DOMContentLoaded", function () {
  let url = window.location.href;
  let id = url.split("id=")[1];
  console.log(id);
  if (!id) {
    window.location.assign(`http://127.0.0.1:5500/common.html`);
    return;
  }

  getData(`https://cars-pagination.onrender.com/products/${id}`)
    .then((data) => {
      if (data.id) {
        const card = createProductCard(data);
        wrapper.innerHTML = card;
        const button = document.querySelector(".button");
        button.addEventListener("click", function () {
          saveProductToStorage({
            id: data.id,
            name: data.name,
            newPrice: data.newPrice,
            oldPrice: data.oldPrice,
            image: data.image,
            time: Date.now(),
          });
          window.location.assign(`http://127.0.0.1:5500/pages/cart.html`);
        });
        loader.style.display = "none";
      } else {
        wrapper.innerHTML = "Bunday mahsulot topilmadi.";
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
});
