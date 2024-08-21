const data = [
  {
     "image": {
          "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
          "mobile": "./assets/images/image-waffle-mobile.jpg",
          "tablet": "./assets/images/image-waffle-tablet.jpg",
          "desktop": "./assets/images/image-waffle-desktop.jpg"
     },
     "name": "Waffle with Berries",
     "category": "Waffle",
     "price": 6.50
  },
  {
      "image": {
          "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
          "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
          "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
          "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
      },
      "name": "Vanilla Bean Crème Brûlée",
      "category": "Crème Brûlée",
      "price": 7.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
          "mobile": "./assets/images/image-macaron-mobile.jpg",
          "tablet": "./assets/images/image-macaron-tablet.jpg",
          "desktop": "./assets/images/image-macaron-desktop.jpg"
      },
      "name": "Macaron Mix of Five",
      "category": "Macaron",
      "price": 8.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
          "mobile": "./assets/images/image-tiramisu-mobile.jpg",
          "tablet": "./assets/images/image-tiramisu-tablet.jpg",
          "desktop": "./assets/images/image-tiramisu-desktop.jpg"
      },
      "name": "Classic Tiramisu",
      "category": "Tiramisu",
      "price": 5.50
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
          "mobile": "./assets/images/image-baklava-mobile.jpg",
          "tablet": "./assets/images/image-baklava-tablet.jpg",
          "desktop": "./assets/images/image-baklava-desktop.jpg"
      },
      "name": "Pistachio Baklava",
      "category": "Baklava",
      "price": 4.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
          "mobile": "./assets/images/image-meringue-mobile.jpg",
          "tablet": "./assets/images/image-meringue-tablet.jpg",
          "desktop": "./assets/images/image-meringue-desktop.jpg"
      },
      "name": "Lemon Meringue Pie",
      "category": "Pie",
      "price": 5.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
          "mobile": "./assets/images/image-cake-mobile.jpg",
          "tablet": "./assets/images/image-cake-tablet.jpg",
          "desktop": "./assets/images/image-cake-desktop.jpg"
      },
      "name": "Red Velvet Cake",
      "category": "Cake",
      "price": 4.50
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
          "mobile": "./assets/images/image-brownie-mobile.jpg",
          "tablet": "./assets/images/image-brownie-tablet.jpg",
          "desktop": "./assets/images/image-brownie-desktop.jpg"
      },
      "name": "Salted Caramel Brownie",
      "category": "Brownie",
      "price": 4.50
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
          "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
          "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
          "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
      },
      "name": "Vanilla Panna Cotta",
      "category": "Panna Cotta",
      "price": 6.50
   }
]
const addBtn = `
<img src="./assets/images/icon-add-to-cart.svg" alt="cart icon">
Add to Cart`;
const setCount = `
<div class="icon decrement">
  <img class="decrement" src="./assets/images/icon-decrement-quantity.svg" alt="decrement count icon">
</div>
<p class="productCount">1</p>
<div class="icon increment">
  <img class="increment" src="./assets/images/icon-increment-quantity.svg" alt="increment count icon">
</div>`;
const cart = {
  items: {},
  itemsCount: function() {
    let count = 0;
    for (const id in this.items) {
      count += this.items[id].count;
    }
    return count
  },
  orderTotal: function() {
    let total = 0;
    for (const id in this.items) {
      total += this.items[id].totalPrice;
    }
    return total
  }
};
function Product(name, price, count=0, thumbnail){
  if (!(this instanceof Product)){
    return new Product()
  }
  this.name = name;
  this.price = price;
  this.count = count;
  this.thumbnail = thumbnail;
}
Object.defineProperty(Product.prototype, 'totalPrice', {
  get: function() {
    return this.count * this.price;
  }
})
function getProduct(product, i){
  const {name, price, category, image} = product;
  return `
  <div class="product" data-id="${i}" data-name="${name}" data-price="${price}">
    <img src="${image.desktop}" alt="product image">
    <div class="addBtn"><button>${addBtn}</button></div>
    <p class="productCategory">${category}</p>
    <p class="productName">${name}</p>
    <p class="productPrice">$${price.toFixed(2)}</p>
  </div>
  `
}

const products = document.querySelector('.wrapper .products');
const cartObj = document.querySelector('.wrapper .cart');
const itemsCount = document.querySelector('.wrapper .cart .itemsCount span');
const cartItems = document.querySelector('.wrapper .cart .cartItems');
const orderTotal = document.querySelector('.wrapper .cart .confirmOrder .orderTotal span');
const confirmBtn = document.querySelector('.wrapper .cart .confirmOrder button');
const orderPopup = document.querySelector('.popup');
const orderItems = document.querySelector('.popup .orderItems .items-container');
const finalOrderTotal = document.querySelector('.popup .orderItems .order-total p.total');
const startNewOrderBtn = document.querySelector('.popup button');

// add all the products to the DOM
data.forEach((product, i) => {
  products.innerHTML += getProduct(product, i);
});

const addToCartBtns = document.querySelectorAll('.wrapper .products .product .addBtn button');

addToCartBtns.forEach(btn =>{
  btn.addEventListener('click', (e)=>{
    const target = e.target;
    console.log(target);
    const product = getParentOf(btn, 'product');
    const {id, name, price, thumbnail} = product.dataset;
    if (!btn.classList.contains('setCount') && !(id in cart.items)) {
      // add the product to cart if it doesnt exist
      product.classList.add('added')
      cartObj.classList.add('hasItems')
      btn.innerHTML = setCount;
      cart.items[id] = new Product(name, price, 1, thumbnail)
      cartItems.innerHTML += addItem(id, name, 1, price, price)
    } else if (cart.items[id].count >= 1 && target.classList.contains("increment")){
      // increment product count in the cart
      cart.items[id].count++;
      changeCount(id, target, '+');
    }
    else if (cart.items[id].count >= 1 && target.classList.contains("decrement")){
      // decrement product count in the cart and if the count gets down to 0 it gets removed from it
      cart.items[id].count--;
      if (cart.items[id].count === 0){
        product.classList.remove('added')
        btn.innerHTML = addBtn;
        document.querySelector(`.wrapper .cart.hasItems .cartItems .cartItem-${id}`).remove()
        delete cart.items[id]
      } else{
        changeCount(id, target, '-');
      }
    }
    // update the cart items count and change the content of it if it has no items.
    const cartItemsCount = cart.itemsCount()
    itemsCount.textContent = cartItemsCount;
    orderTotal.textContent = "$" + cart.orderTotal().toFixed(2);
    if (cartItemsCount === 0) cartObj.classList.remove('hasItems')
  })
})

function getParentOf(element, parentClass){
  if (element.classList.contains(parentClass)) return element
  let parent = element.parentElement;
  while (!parent.classList.contains(parentClass))
      parent = parent.parentElement;
  return parent
 }

function changeCount(productId, target, sign){
  const iconDiv = getParentOf(target, 'icon');
  const cartItemCount= document.querySelector(`.wrapper .cart.hasItems .cartItems .cartItem-${productId} .count`)
  const cartItemtotal = document.querySelector(`.wrapper .cart.hasItems .cartItems .cartItem-${productId} .total`)
  const count = cart.items[productId].count;
  if (sign === "+"){
    iconDiv.previousElementSibling.textContent = count;
  } else {
    iconDiv.nextElementSibling.textContent = count;
  }
  cartItemCount.textContent = count + "x"
  cartItemtotal.textContent = '$' + cart.items[productId].totalPrice.toFixed(2);
}

function addItem(id, name, count, price, total){
  return `
  <div class="cartItem cartItem-${id}" data-id="${id}">
    <div class="info">
      <p class="name">${name}</p>
      <p class="count">${count}x</p>
      <p class="price">@ $${(+price).toFixed(2)}</p>
      <p class="total">$${(+total).toFixed(2)}</p>
    </div>
    <div class="removeIcon">
      <img src="./assets/images/icon-remove-item.svg" alt="" onclick="removeItem(${id})">
    </div>
  </div>
  `
 }

function removeItem(id){
  document.querySelector(`.wrapper .cart.hasItems .cartItems .cartItem-${id}`).remove()
  const btn = document.querySelector(`.wrapper .products .product[data-id="${id}"] .addBtn`)
  btn.classList.remove('setCount')
  btn.innerHTML = addBtn;
  delete cart.items[id]
  const cartItemsCount = cart.itemsCount()
  itemsCount.textContent = cartItemsCount;
  orderTotal.textContent = "$" + cart.orderTotal().toFixed(2);
  if (cartItemsCount === 0) cartObj.classList.remove('hasItems')
}




confirmBtn.addEventListener('click', ()=>{
  orderPopup.showModal();
  for (const id in cart.items) {
    const thumbnail = data[+id].image.thumbnail;
    const {name, price, count, totalPrice} = cart.items[id];
    let orderItem = `
    <div class="orderItem">
      <div class="info">
        <img src="${thumbnail}" alt="">
        <div class="data">
          <p class="name">${name}</p>
          <p class="count">${count}x</p>
          <p class="price">@ $${Number(price).toFixed(2)}</p>
        </div>
      </div>
      <div class="total">
        <p>$${totalPrice.toFixed(2)}</p>
      </div>
    </div>
    `
    orderItems.innerHTML += orderItem;
  }
  finalOrderTotal.innerHTML = "$" + cart.orderTotal().toFixed(2);
})

startNewOrderBtn.addEventListener('click', ()=> {
  orderPopup.close()
  location.reload()
})


// fetch('https://test-api.free.beeceptor.com/all-products')
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(data => {
    //     console.log('data:');
    //     data['all'].forEach(product => {
    //       console.log(product);
    //     });
    //     console.log(JSON.stringify(data));
    //   })
    //   .catch(error => {
    //     console.log('there was a problem while fetching data: ', error);
    //   })