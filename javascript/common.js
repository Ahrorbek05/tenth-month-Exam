import { getData, createCard, createProduct} from "../javascript/function.js";

document.getElementById('filter-btn').addEventListener('click', function() {
    let minPrice = parseInt(document.getElementById('min-price').value) || 0;
    let maxPrice = parseInt(document.getElementById('max-price').value) || Infinity;

    let products = document.querySelectorAll('.collection-products .card-hero');
    products.forEach(function(product) {
        let productPrice = parseInt(product.getAttribute('data-price'));
        if (productPrice >= minPrice && productPrice <= maxPrice) {
            product.style.display = 'block';
        } else {
            // product.style.display = 'none';
        }
    });
});


document.addEventListener("DOMContentLoaded", async function () {
  const wrap = document.querySelector(".collection-products");
  const select = document.querySelector("#select");

  try {
    const data = await getData("https://cars-pagination.onrender.com/products");

    data.forEach((element) => {
      if (element.id > 4 && element.id <= 16) {
        const card = createCard(element);
        wrap.innerHTML += card;
      }
    });

    select.addEventListener("change", function () {
      wrap.innerHTML = "";

      data.forEach((element) => {
        if (this.value === element.category) {
          const card = createCard(element);
          wrap.innerHTML += card;
          
        }
      });
    

      
    });
    const cards = document.querySelectorAll('.card-hero');
    cards.length > 0 && cards.forEach(el => {
        el.addEventListener('click',function(event){
          const cardId = this.getAttribute("data-id");
  if (cardId) {
    window.location.assign(`https://tenth-month-exam.vercel.app//pages/products.html?id=${cardId}`);
  }
          createProduct(this)
        window.location.assign("https://tenth-month-exam.vercel.app//pages/products.html")
        })
    });
    
  } catch (err) {
    console.log(err);
  }
});
