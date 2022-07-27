var ShoppingCart = (function($) {
    "use strict";
    
    
    var productsEl = document.querySelector(".products"),
        cartEl =     document.querySelector(".shopping-cart-list"),
        productQuantityEl = document.querySelector(".product-quantity"),
        emptyCartEl = document.querySelector(".empty-cart-btn"),
        cartCheckoutEl = document.querySelector(".cart-checkout"),
        totalPriceEl = document.querySelector(".total-price");
    
    
    var products = [
      {
        id: 0,
        name: "iPhone 13",
        description: "El mejor iPhone precio/calidad del mercado",
        imageUrl: "./Assets/iphone-13.jpg",
        price: 1199
      },
      {
        id: 1,
        name: "iPhone 13 Pro Max",
        description: "El iPhone mas potente, para nuestros clientes mas exigentes",
        imageUrl: "./Assets/iphone-pro-max.jpg",
        price: 1999,
      },
      {
        id: 2,
        name: "Macbook Air",
        description: "La opcion economica para sumarse al mundo MacBook",
        imageUrl: "./Assets/macbook-air.jpg",
        price: 1499
      },
      {
        id: 3,
        name: "Macbook",
        description: "La notebook mas completa del mercado",
        imageUrl: "./Assets/macbook.jpg",
        price: 999
      },
      {
        id: 4,
        name: "iPad 11inch",
        description: "Ideal para diseñadores graficos",
        imageUrl: "./Assets/ipad.jpg",
        price: 599
      },
      {
        id: 5,
        name: "iPad Mini",
        description: "Producto ideal para entretener a los niños",
        imageUrl: "./Assets/ipad-mini.jpg",
        price: 499
      }
    ],
        productsInCart = [];
    
    
    var generateProductList = function() {
      products.forEach(function(item) {
        var productEl = document.createElement("div");
        productEl.className = "product";
        productEl.innerHTML = `<div class="product-image">
                                  <img src="${item.imageUrl}" alt="${item.name}">
                               </div>
                               <div class="product-name"><span>Product:</span> ${item.name}</div>
                               <div class="product-description"><span>Description:</span> ${item.description}</div>
                               <div class="product-price"><span>Price:</span> ${item.price} $</div>
                               <div class="product-add-to-cart">
                                 <a href="#0" class="button see-more">Mas Detalles</a>
                                 <a href="#0" class="button add-to-cart" data-id=${item.id}>Añadir al carrito</a>
                               </div>
                            </div>
  `;
                               
  productsEl.appendChild(productEl);
      });
    }
    
    
    var generateCartList = function() {
      
      cartEl.innerHTML = "";
      
      productsInCart.forEach(function(item) {
        var li = document.createElement("li");
        li.innerHTML = `${item.quantity} ${item.product.name} - $${item.product.price * item.quantity}`;
        cartEl.appendChild(li);
      });
      
      productQuantityEl.innerHTML = productsInCart.length;
      
      generateCartButtons()
    }
    
    
    
    var generateCartButtons = function() {
      if(productsInCart.length > 0) {
        emptyCartEl.style.display = "block";
        cartCheckoutEl.style.display = "block"
        totalPriceEl.innerHTML = "$ " + calculateTotalPrice();
      } else {
        emptyCartEl.style.display = "none";
        cartCheckoutEl.style.display = "none";
      }
    }
    
  
    var setupListeners = function() {
      productsEl.addEventListener("click", function(event) {
        var el = event.target;
        if(el.classList.contains("add-to-cart")) {
         var elId = el.dataset.id;
         addToCart(elId);
        }
      });
      
      emptyCartEl.addEventListener("click", function(event) {
        if(confirm("Estas seguro?")) {
          productsInCart = [];
        }
        generateCartList();
      });
    }
    
  
    var addToCart = function(id) {
      var obj = products[id];
      if(productsInCart.length === 0 || productFound(obj.id) === undefined) {
        productsInCart.push({product: obj, quantity: 1});
      } else {
        productsInCart.forEach(function(item) {
          if(item.product.id === obj.id) {
            item.quantity++;
          }
        });
      }
      generateCartList();
    }
    
    
 
    var productFound = function(productId) {
      return productsInCart.find(function(item) {
        return item.product.id === productId;
      });
    }
  
    var calculateTotalPrice = function() {
      return productsInCart.reduce(function(total, item) {
        return total + (item.product.price *  item.quantity);
      }, 0);
    }
    
 
    var init = function() {
      generateProductList();
      setupListeners();
    }
    
   
    return {
      init: init
    };
    
 
  })(jQuery);
  
  ShoppingCart.init();