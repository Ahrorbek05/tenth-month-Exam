async function getData(url){
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return data
    } catch (error) {
        return error
    }
}

function createProduct(){
  return `
  <div class="product-image">
  <img src="${common.image}" alt="" width="600" height="600">
</div>
<div class="product-info">
 <h3>${common.name} <br> 
  GS-200Z-5 для офиса</h3>
  <p id="text">Замок дверной электронный Golden Soft GS-200Z-5 имеет роскошный глянцевый блеск, четкие линии, красивые формы.</p>
  <p id="text">Подходит для установки на деревянную/межкомнатную дверь.</p>
  <h4>Цена</h4>
  <p>${common.newPrice}<span>;${common.oldPrice}</span></p>
  <button>КОРЗИНКА</button>
  `;
}


function createCard(common) {
    return`
    
    <div class="card-hero" data-id="${common.id}">
    <div class="box">
      <i class="fa-solid fa-gift" style="color: #4295e4"></i>Подарок
    </div>
    <span class="baza"
      ><i"></i>${common.isExist}</span
    >
    <span class="sale">SALE</span>
    <img  class="img" src="${common.image}" alt="lock door" />
    <div class="card-prod data-id">
      <span>
      <img src="./images/starto.svg" alt="star-icon" />
      <img src="./images/starto.svg" alt="star-icon" />
      <img src="./images/starto.svg" alt="star-icon" />
      <img src="./images/star-icon.svg" alt="star-icon" />
      <img src="./images/star-icon.svg" alt="star-icon" /></span>
      <span>(${common.comments}) отзывов</span>
      <p>Вариативный замок Golden Soft для отеля</p>
      <span class="price"
        ><span class="old">${common.newPrice / 1000}₽</span
        ><span class="skidka">${common.oldPrice / 1000}₽</span></span
      >
    </div>
  </div>
    `;

}

function getDataStroge(){
  let data = [];
  if(localStorage.getItem('products')){
      data = JSON.parse(localStorage.getItem('products'))
  }
  return data
}


export {getData, createCard, createProduct, getDataStroge}