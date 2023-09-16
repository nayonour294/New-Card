"use strict";

const addCartBtn = document.querySelectorAll('.add-cart');
const productCount = document.querySelector('.nav-menu span');


let products = [
    {
        name: "Sky Bule Man's Shirt",
        tag: "shirt-3",
        price: 60,
        inCart:0
    },

    {
        name: "Cotton Formal Shirt",
        tag: "shirt-4",
        price: 40,
        inCart:0
    },

    {
        name: "Half Sleeve t-shirt For Men",
        tag: "t-shirt-1",
        price: 30,
        inCart:0
    },

    {
        name: "Short Sleeve t-Shirt",
        tag: "t-shirt-2",
        price: 50,
        inCart:0
    }
];



for ( let btnNum = 0; btnNum < addCartBtn.length; btnNum++ ) {
    addCartBtn[btnNum].addEventListener("click", () => {

        showCartNumber(products[btnNum]);
        getTotalCost(products[btnNum]);
        
    })
}

const loadCartNumber = () => {
    let getCartNumber = Number(localStorage.getItem("cartNumber"));
    if ( getCartNumber ) {
        productCount.textContent = getCartNumber;
    }
}

const showCartNumber = (products) => {
    let getCartNumber = Number(localStorage.getItem("cartNumber"))

    if ( getCartNumber ) {
        localStorage.setItem("cartNumber", getCartNumber + 1);
        productCount.textContent = getCartNumber + 1;
    } else {
        localStorage.setItem("cartNumber", 1);
        productCount.textContent = 1;
    }

    setProduct(products);
    
}


const setProduct = (products) => {
    let cartProduct = localStorage.getItem("productCart");
    cartProduct = JSON.parse(cartProduct);

    if ( cartProduct != null ) {

        if (cartProduct[products.tag] == undefined) {
            cartProduct = {
                ...cartProduct,
                [products.tag]: products
            }
        }
        cartProduct[products.tag].inCart += 1;

    } else {
        products.inCart = 1;
        cartProduct = {
            [products.tag]: products
        }
    }


    
    localStorage.setItem("productCart", JSON.stringify(cartProduct));

}


const getTotalCost = (products) => {
    let costValue = Number(localStorage.getItem("totalCost"))

    if (costValue != null) {
        localStorage.setItem("totalCost",costValue + products.price);
    } else {
        localStorage.setItem("totalCost", products.price);
    }
}

const seleProdCont = document.querySelector('.selected-product');

const showSelectedProduct = () => {
    let cartProduct = localStorage.getItem("productCart");
    cartProduct = JSON.parse(cartProduct);

    if ( cartProduct && seleProdCont ) {
        seleProdCont.innerHTML = "";
        Object.values(cartProduct).map(item => {
            seleProdCont.innerHTML += `
            
            <div class = "inner-container">
            
                <div class = "product">
                    <img src = "../images/${item.tag}.webp">
                    <img src = "../images/${item.tag}.webp">
                    <img src = "../images/${item.tag}.webp">
                    <img src = "../images/${item.tag}.webp">
                </div>
                <span>${item.name}</span>
                <div class="price">$${item.price},00</div>
                <div class="quantity">
                    <i class="fa-solid fa-square-minus" ></i>
                    <span>${item.inCart}</span>
                    <i class="fa-solid fa-square-plus" ></i>
                </div>
                <div class="total">
                    $${item.inCart * item.price},00
                </div>
            
            </div>
            
            `
        })
    }

}


loadCartNumber ();
showSelectedProduct ();


