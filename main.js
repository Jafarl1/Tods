let products = [
    {
        id: 1,
        name: "Black Single T",
        description:
            "Your order will be elegantly presented in our signature packaging with the iconic Tod's Logo design and a named sticker.",
        price: 200,
        count: 1,
        stock: 3,
        image: "images/Black single T.webp",
    },
    {
        id: 2,
        name: "Driving mocassino",
        description:
            "Your order will be elegantly presented in our signature packaging with the iconic Tod's Logo design and a named sticker.",
        price: 80,
        count: 1,
        stock: 10,
        image: "images/driving mocasino.jpg",
    },
    {
        id: 3,
        name: "Grey gommino",
        description:
            "Your order will be elegantly presented in our signature packaging with the iconic Tod's Logo design and a named sticker.",
        price: 145,
        count: 1,
        stock: 8,
        image: "images/Grey Gommino.webp",
    },
    {
        id: 4,
        name: "Loafer mocassino",
        description:
            "Your order will be elegantly presented in our signature packaging with the iconic Tod's Logo design and a named sticker.",
        price: 99,
        count: 1,
        stock: 6,
        image: "images/Loafer mocasino.jpg",
    },
    {
        id: 5,
        name: "White gommino",
        description:
            "Your order will be elegantly presented in our signature packaging with the iconic Tod's Logo design and a named sticker.",
        price: 145,
        count: 1,
        stock: 5,
        image: "images/White gommino.webp",
    },
    {
        id: 6,
        name: "Winter mocassino",
        description:
            "Your order will be elegantly presented in our signature packaging with the iconic Tod's Logo design and a named sticker.",
        price: 240,
        count: 1,
        stock: 3,
        image: "images/Winter mocasino.jpg",
    },
];
let cart = [];

let container = document.querySelector(".container");
let productinfo = document.querySelector(".productinfo");
let content = document.querySelector(".content");
let contentBody = document.querySelector(".contentbody");
let basket = document.querySelector(".basket");
let basketBody = document.querySelector(".basketbody");
let totalPrice = document.querySelector(".totalprice");
let inCartNow = document.querySelector(".incart");

let addBtn = document.querySelectorAll(".add");
let moreBtn = document.querySelectorAll(".more");
let closeBtn = document.querySelector(".closebtn");
let basketBtn = document.querySelector(".cart");
let closeBasket = document.querySelector(".closebasket");

products.forEach((el) => {
    container.innerHTML += `
        <div class="product">
         <div class="item">
          <img src="${el.image}" alt="${el.name}">
          <h2 class="model">${el.name}</h2>
          <span class="about">${el.description}</span>
           <div class="buy">
             <p class="price">${el.price} $</p>
             <div class="buttons">
                <button class="more" onclick="moreInfo(${el.id})">
                <i class="fa-solid fa-info"></i>
                </button>
                    <button class="add" onclick="addToCart(${el.id})">
                    <i class="fa-solid fa-cart-arrow-down">
                    </i></button>
             </div>   
           </div>
         </div>
       </div> 
   `;
});

const moreInfo = (id) => {
    productinfo.classList.add("showback");
    content.classList.add("show");

    let prod = products.find((a) => a.id === id);
    contentBody.innerHTML = `
        <div class="picture" >
            <img src="${prod.image}" alt="${prod.name}">
        </div>

        <div class="info">
            <h1>${prod.name}</h1>
            <p>${prod.description}</p>
            <span>${prod.price} $</span>
          <button class="add" onclick="addToCart(${prod.id})">
            <i class="fa-solid fa-cart-arrow-down"></i>
          </button>
        </div>  
    `;
};

closeBtn.addEventListener("click", () => {
    productinfo.classList.remove("showback");
    content.classList.remove("show");
});

basketBtn.addEventListener("click", () => {
    basket.classList.add("open");
});

closeBasket.addEventListener("click", () => {
    basket.classList.remove("open");
});

const addToCart = (id) => {
    let data = products.find((a) => a.id === id);
    let check = cart.some((a) => a.id == data.id);

    if (check) {
        increaseItem(id);
    } else {
        cart.push(data);
    }
    listBasket();
    console.log(cart);
};

const listBasket = () => {
    basketBody.innerHTML = "";

    if (cart.length < 1) {
        basketBody.innerHTML = "";
    } else {
        cart.forEach((a) => {
            basketBody.innerHTML += `
     <div class="prodincart">
         <div class="prodimg">
             <img src="${a.image}" alt="${a.name}">
         </div>
                  
         <div class="prodinfo">
             <h3>${a.name}</h3>
                 <p>${a.price} $</p>
                 
                 <div class="buttonsrow">
                     <button class="delete w-h" onclick="deleteItem(${a.id})"> <i class="fa-solid fa-trash-can"></i> </button>
 
                     <div class="btn-group">
                         <button class="decrease w-h" onclick="decreaseItem(${a.id})"> <i class="fa-solid fa-minus"> </i></button>
                         <div class="count"> ${a.count}</div>
                         <button class="increase w-h" onclick="increaseItem(${a.id})"> <i class="fa-solid fa-plus"> </i></button>
                     </div>
                 </div>
          </div>
     </div>
    `;
        });
    }
    let inCart = 0;
    cart.map((a) => {
        inCart += a.count;
    });
    if (inCart > 0) {
        inCartNow.innerHTML = inCart;
    } else {
        inCartNow.innerHTML = "";
    }
    calcTotal();
};

const deleteItem = (id) => {
    cart.find((a) => a.id === id).count = 1;
    cart = cart.filter((a) => a.id !== id);
    listBasket();
};

const increaseItem = (id) => {
    let data = cart.find((a) => a.id == id);
    if (data.count < data.stock) {
        data.count++;
    } else {
        alert("BU MƏHSULDAN QALMAYIB.");
    }
    listBasket();
};

const decreaseItem = (id) => {
    let data = cart.find((a) => a.id == id);
    if (data.count > 1) {
        data.count--;
    } else {
        deleteItem(id);
    }
    listBasket();
};

const calcTotal = () => {
    let sum = 0;
    cart.map((a) => {
        sum += a.price * a.count;
    });
    if (sum > 0) {
        totalPrice.innerHTML = `${sum.toFixed(2)} $`;
    } else {
        totalPrice.innerHTML = "";
    }
};
listBasket();

// const addToCart = (id) => {
//     let properties = products.find( a => a.id == id)
//     let check = cart.some( a => a.id ==id )

//     if (check){
//         increaseItem()
//     }
//     else{
//         cart.push(properties)
//     }
//       listBasket()
// }

// const listBasket = () => {

//     basketBody.innerHTML = ""

//     if (cart.length > 0) {

//     }

// }

// const addToCart = (id) => {
// let prod = products.find(a => a.id === id)

// if (prod.stock > 0){
//     // basketBody.innerHTML = "";
//     cart.push(prod);
//     basketBody.innerHTML +=
//     `
//     <div class="prodincart">

//         <div class="prodimg">
//             <img src="${prod.image}" alt="${prod.description}">
//         </div>

//         <div class="prodinfo">
//             <h3>${prod.name}</h3>
//             <p>${prod.price} $</p>
//             <div class="buttonsrow">
//                <button class="delete w-h"> <i class="fa-solid fa-trash-can"></i> </button>

//                <div class="btn-group">
//                    <button class="decrease w-h"> <i class="fa-solid fa-minus"></i></button>
//                    <div class="count">${prod.count}</div>
//                    <button class="increase w-h"><i class="fa-solid fa-plus"></i></button>
//                </div>
//             </div>
//         </div>

//     </div>
//     `
//     prod.stock--;
//     prod.count++;
// }
// else{
//     alert("Bu məhsuldan qalmayıb.")
// }
// totalPrice += prod.count*prod.price;
// }

// const addToCart = (id) => {
//     let data = products.find( a => a.id === id)
//     let check = cart.some( a => a.id === a.id)

//     if (check){
//         increaseItem(id)
//     }
//     else {
//         cart.push(data)
//     }
//     listBasket()
//  }
//  const listBasket = () => {
//      basketBody.innerHTML = ""

//      cart.length > 0 ?
//      cart.forEach( a=> {
//          basketBody.innerHTML +=
//  `
//      <div class="prodincart">
//          <div class="prodimg">
//              <img src="${a.image}" alt="${a.name}">
//          </div>

//          <div class="prodinfo">
//              <h3>${a.name}</h3>
//                  <p>${a.price} $</p>

//                  <div class="buttonsrow">
//                      <button class="delete w-h"> <i class="fa-solid fa-trash-can"></i> </button>

//                      <div class="btn-group">
//                          <button class="decrease w-h" onclick="decreaseItem"> <i class="fa-solid fa-minus"> </i></button>
//                          <div class="count"></div>
//                          <button class="increase w-h" onclick="increaseItem"> <i class="fa-solid fa-plus"> </i></button>
//                      </div>
//                  </div>
//           </div>
//      </div>
//  `
//         }) : basketBody.innerHTML = ""

//      }
