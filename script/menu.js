const buttons = document.querySelectorAll(".shop-item i");
const cartElement = document.getElementById("cart");
const placeOrderButton = document.getElementById("place-order");

let cart = [];  // Keeps all names and prices of items

buttons.forEach((button) => {
    button.addEventListener("mousedown", () => handleClick(button));
})

// Each item has dataset attributes in the HTML (data-name, data-price)
function handleClick(item) {
    let name = item.dataset.name;
    let price = parseFloat(item.dataset.price);

    // If one of the elements isn't there, leave function quickly
    if(!name || !price) {
        console.log("Missing attributes for this menu item.");
        return;
    }

    // Add to cart
    cart.push([name, price]);

    showMenu();
}

function showMenu() {
    // Reset the cart each time an element is added/removed
    // And reconstruct it based on the array cart
    cartElement.innerHTML = "";

    for(let i = 0; i < cart.length; i++) {
        
        let itemName = cart[i][0];
        let itemPrice = cart[i][1];

        // Reconstructing
        let nameDisplay = document.createElement("h3");
        let priceDisplay = document.createElement("p");

        nameDisplay.innerText = itemName;
        priceDisplay.innerText = "$" + itemPrice;

        // Remove button has event listener that deletes itself
        // and also rerenders the menu
        let removeButton = document.createElement("i");
        removeButton.classList.add("fa-solid");
        removeButton.classList.add("fa-circle-xmark");

        removeButton.addEventListener("mousedown", () => {
            cart.splice(i, 1);
            showMenu();
        })

        // Add the elements to the HTML
        let cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");

        cartRow.appendChild(nameDisplay);
        cartRow.appendChild(priceDisplay);
        cartRow.appendChild(removeButton);

        cartElement.appendChild(cartRow);

    }


    // Nothing in cart yet
    if(cart.length === 0) {
        let nameDisplay = document.createElement("h3");
        let priceDisplay = document.createElement("p");


        // Same as above but with placeholder text
        nameDisplay.innerText = "Your cart is empty!";

        let cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");
        cartRow.classList.add("empty-cart");

        cartRow.appendChild(nameDisplay);
        cartRow.appendChild(priceDisplay);

        cartElement.appendChild(cartRow);

    } else {
        // Extra row showing the grand total
        let totalName = document.createElement("h3");
        let totalDisplay = document.createElement("h3");

        totalName.innerText = "Total + HST";
        
        // Calcualte grand total based on prices in cart array
        let price = 0;  
        for(let i = 0; i < cart.length; i++) {
            price += parseFloat(cart[i][1]);
        }

        // Calculate with 13% tax and rounded to 2 decimals
        totalDisplay.innerText = "$" + (price * 1.13).toFixed(2);
        
        // Add to HTML
        let totalRow = document.createElement("div");
        totalRow.classList.add("cart-row");
        totalRow.classList.add("total-row");

        totalRow.appendChild(totalName);
        totalRow.appendChild(totalDisplay);

        cartElement.appendChild(totalRow);


    }
}

showMenu();


placeOrderButton.onmousedown = () => {
    // Empty Cart
    if(cart.length === 0) {
        alert("Your cart is empty! There is nothing to order.\nPlease select items from above.");
        return;
    }

    alert("Your order has been placed!");
    cart = [];
    showMenu();
}