import { getData, createCard } from "../javascript/function.js";

document.addEventListener('DOMContentLoaded', async function() {
    const wrap = document.querySelector('.collection-products');
    try {
        const data = await getData("https://cars-pagination.onrender.com/products");

        data.forEach(element => {
            if (element.id > 4 && element.id <= 16) {
                const card = createCard(element);
                wrap.innerHTML += card;
            }
        });
        const select = document.querySelector('#select');
        select.addEventListener('change', function() {
            wrap.innerHTML = ''; 
            data.forEach(element => {
                if (this.value === element.category) {
                    const card = createCard(element);
                    wrap.innerHTML += card;
                }
            });
        });

        const cards = document.querySelectorAll('.card-hero');
        console.log(cards);
        cards.forEach(el => {
            el.addEventListener('click', function(event) {
                window.location.assign(`http://127.0.0.1:5500/pages/products.html?id=${el.id}`);
            });
        });
    } catch (err) {
        console.error(err);
    }
});
