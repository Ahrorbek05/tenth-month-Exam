import { getData, createCard, createProduct} from "../javascript/function.js";

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
    window.location.assign(`http://127.0.0.1:5500/pages/products.html?id=${cardId}`);
  }
          createProduct(this)
        window.location.assign("http://127.0.0.1:5500/pages/products.html")
        })
    });
    
  } catch (err) {
    console.log(err);
  }
});
