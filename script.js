// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
const Carousel = document.getElementById("Carousel");
const podcastCards = document.querySelectorAll(".Podcast-Card");
let currentIndex = 0;
const slideInterval = 3000;

if (!Carousel) {
  console.error("Error: Carousel element with ID 'Carousel' not found.");
} else {
  console.log("Carousel element found:", Carousel);
}

// Function to show the slide at a specific index
function showSlide(index) {
  if (Carousel) {
      Carousel.style.transform = `translateX(-${index * 100}%)`;
  }
}

// Function to go to the next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % podcastCards.length;
  showSlide(currentIndex);
}

// Function to go to the previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + podcastCards.length) % podcastCards.length;
  showSlide(currentIndex);
}

// Set up automatic sliding, if carousel exists
let autoSlide;
if (Carousel) {
  autoSlide = setInterval(nextSlide, slideInterval);

  // Pause the automatic sliding on mouseover and resume on mouseout
  Carousel.addEventListener("mouseover", () => clearInterval(autoSlide));
  Carousel.addEventListener("mouseout", () => autoSlide = setInterval(nextSlide, slideInterval));
}

// Select navigation buttons and add event listeners if they exist
const prevButton = document.querySelector(".nav-buttons.prev");
const nextButton = document.querySelector(".nav-buttons.next");

if (prevButton) {
  prevButton.addEventListener("click", prevSlide);
}

if (nextButton) {
  nextButton.addEventListener("click", nextSlide);
}

document.addEventListener("DOMContentLoaded", function() {
  const heroBanner = document.querySelector(".hero-banner");
  heroBanner.classList.add("fade-in");
});
document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll(".fade-in");
  images.forEach(image => image.classList.add("fade-in"));
});



// Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// CART WORKING JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');

    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add To Cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
  
    document
  .getElementsByClassName("btn-buy")[0]
  .addEventListener("click", buyButtonClicked);
  }
// Buy Button
function buyButtonClicked() {
  alert('Your Order is placed')
  var cartContent = document.getElementsByClassName('cart-content')[0]
  while (cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal()
}



// Remove Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// Quantity Changes
function quantityChanged(event) {
    var input = event.target;

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updatetotal();
}

// Add To Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartContent = document.querySelector(".cart-content"); // Corrected: Use querySelector to get the first element
    var cartItemsNames = cartContent.getElementsByClassName("cart-product-title");
    alert(`${title} added to cart!`);


    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already added this item to cart");
            return;
        }
    } 

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bx-trash cart-remove'></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartContent.appendChild(cartShopBox);

    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

// Update Total
function updatetotal() {
    var cartContent = document.querySelector(".cart-content");
    var cartBoxes = cartContent.getElementsByClassName("cart-box");

    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
      }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    }
    function searchProducts() {
      const searchTerm = document.getElementById('search-bar').value.toLowerCase();
      const productBoxes = document.querySelectorAll('.product-box');
      let productFound = false;
    
      productBoxes.forEach(productBox => {
        const productTitle = productBox.querySelector('.product-title').textContent.toLowerCase();
    
        if (productTitle.includes(searchTerm)) {
          productBox.style.display = 'block';
          productFound = true;
        } else {
          productBox.style.display = 'none';
        }
      });
    
      if (!productFound) {
        alert('Product not found.');
        // Or you can display a message on the page:
        // document.getElementById('search-message').textContent = 'Product not found.';
      }
    }