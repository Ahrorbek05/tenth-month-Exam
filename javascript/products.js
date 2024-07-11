import { createProduct } from "../javascript/function.js";

const details = document.getElementById('details');
const prod = document.getElementById('product');

document.addEventListener('DOMContentLoaded', function () {
    let url = window.location.href;
    let id = url.split('id=')[1];

    if(!id){
        window.location.assign('http://127.0.0.1:5500/index.html');
        return;
    }

    getData(`https://strapi-store-server.onrender.com/api/products/${id}`)
    .then(data =>{
        if(data.data.id){
            const card = createDetails(data.data);
            details.innerHTML = card;

            const form = document.getElementById('form');
           const button = document.querySelector('.button')
            const select = document.getElementById('select');

            form.addEventListener('submit', function(event){
                event.preventDefault();
                let product = {
                    id: data.data.id,
                    time: Date.now(),
                    count: select.value * 1,
                    attribute: data.data.attributes
                }
                let products = getDataStroge();
                let isExist = products.find(element => {
                    return element.id ==  product.id
                })
                if( isExist && isExist.id){
                    products = products.map(element =>{
                        if(element.id === product.id){
                            element.count += product.count
                        }
                        return element;
                    })
                } else {
                    products.push(product)
                }
                localStorage.setItem('products', JSON.stringify(products));
            })

            button.addEventListener('click', function(){
              window.location.assign(`http://127.0.0.1:5500/pages/cart.html?id=${id}`) 
            })

            prod.addEventListener('click', function(){
                window.location.assign(`http://127.0.0.1:5500/index.html?id=${id}`)
            })



        } else {
            details.innerHTML = 'Bunday mahsulot mavjud emas!';  
        }
    })
    .catch(err =>{
        console.log(err);
    })
    .finally(function(){
        loader.style.display = 'none';
    })
})
