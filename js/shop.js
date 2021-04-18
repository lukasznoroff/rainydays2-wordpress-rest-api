const productsWrap = document.querySelector(".products-wrap");
const currentSex = getParameterByName("sex");


fetch(`${getRestApiData().url}products?consumer_key=${getRestApiData().clientKey}&consumer_secret=${getRestApiData().clientSecret}`)
    .then((response) => {
        return response.json()
    })
    .then((products) => {
        console.log(products);

        const prosuctWrpper = document.querySelector("product-wrapper");
        productsWrap.innerHTML = ""
       

        for (let product of products) {

            const featureImage = product.images[0].src;
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
        
                            <a href="./single-product.html?id=${product.id}"><img src="${featureImage}"alt="jacket"></a>
                            <h4 class="cards-headers-small">PRICE:${product.price}$</h4>
                            <a class="btn btn-jacket js-add-to-cart" data-product-id="${product.id}" href="/pages/cart.html">ADD TO CART</a>
                         `;
             

            productsWrap.appendChild(card);
            let title;

            if (currentSex === "male") {
                title = "Men"
            } else {
                title = "Women"
            }

            document.querySelector(".js-page-title").innerHTML = title;

        }
    })

 

