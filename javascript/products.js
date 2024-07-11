import { createProduct, getData, getDataStorage } from "./function.js";

async function getUrl(url) {
    try {
        let response = await fetch(url);
        let res = await response.json();
        return res;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function createCard(){
    return `
    <div class="product-image">
    <img src="${product.image}" alt="" width="600" height="600">
  </div>
  <div class="product-info">
   <h3>${product.name} <br> 
    GS-200Z-5 для офиса</h3>
    <p id="text">Замок дверной электронный Golden Soft GS-200Z-5 имеет роскошный глянцевый блеск, четкие линии, красивые формы.</p>
    <p id="text">Подходит для установки на деревянную/межкомнатную дверь.</p>
    <h4>Цена</h4>
    <p>${product.newPrice}<span>;${product.oldPrice}</span></p>
    <button>КОРЗИНКА</button>
    `;
  }

function getStoredProducts() {
    let products = localStorage.getItem("products");
    return products ? JSON.parse(products) : [];
}

function saveProductToStorage(product) {
    let products = getStoredProducts();
    let confirm = products.some(el => el.id === product.id);
    if (!confirm) {
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        alert("Успешно сохранено");
    } else {
        alert("Такой продукт уже существует");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    if (!id) {
        window.location.assign("http://127.0.0.1:5500/#");
        return;
    }

    getUrl("https://cars-pagination.onrender.com/products/" + id)
        .then((data) => {
            if (data && data.id) {
                const card = createCard(data);
                document.querySelector(".product-information").innerHTML = card;
                document.querySelector(".loader").style.display = "none";
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
                    window.location.assign("http://127.0.0.1:5500/pages/cart.html");
                });
            } else {
                document.querySelector(".product-information").innerHTML = "Продукт не найден.";
            }
        })
        .catch((error) => {
            console.error(error);
        });
});
