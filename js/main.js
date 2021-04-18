function handleAddToCart() {
    document.body.addEventListener("click", (e) => {

        if (!e.target.classList.contains("js-add-to-cart")) {
            return;
        }
        e.preventDefault();
        const productId = e.target.dataset.productId;

        let cartObject = JSON.parse(localStorage.getItem("cart"));

        if (!cartObject) {
            cartObject = {
                "items": [
                    {
                        "productId": productId,
                        "quantity": 1,
                    }
                ]
            }
        } else {
            const productExist = cartObject.items.find((item) => {
                return item.productId === productId;

            })
            if (productExist) {
                productExist.quantity++;
            } else {
                cartObject.items.push({
                    "productId": productId,
                    "quantity": 1,
                })
            }
        }


        localStorage.setItem("cart", JSON.stringify(cartObject));
        const cartIcon = document.querySelector(".cart-total-items");
        const newIcon = cartIcon.cloneNode(true);
        cartIcon.parentNode.replaceChild(newIcon, cartIcon);
        newIcon.innerHTML = getCartTotalItems();
        newIcon.classList.add("animate");
    })

}

function displayCardTotals() {
    document.querySelector(".cart-total-items").innerHTML = getCartTotalItems();
}

function handleRemoveFromCart() {

    document.body.addEventListener("click", (e)=>{
        if(!e.target.classList.contains("js-remove-product")){
            return;
        }
        const productId = e.target.dataset.productId;
        let cartObject = JSON.parse(localStorage.getItem("cart"));

        const updatedItems = cartObject.items.filter((item)=>{
            return item.productId !== productId;
        })

        const updatedCartObject = {
            "items": updatedItems
        }

        localStorage.setItem("cart", JSON.stringify(updatedCartObject));
        window.location.reload();
        return;
    })

}


function handleEmptyCart(){
    document.body.addEventListener("click", (e)=>{
        if(!e.target.classList.contains("js-clear-cart")){
            return;
        }

        localStorage.removeItem("cart")
        window.location.reload();
        return;
    })
}



window.addEventListener("DOMContentLoaded", () => {
    handleAddToCart();
    displayCardTotals();
    handleRemoveFromCart();
    handleEmptyCart();
})




