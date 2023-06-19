// Goal: Implement a simple Shopify cart using Typescript
// Support the following actions:

window.onload = () => {
    console.log("My custom cart script is loading...");
}

// 1. Change quantity of existing cart item (updates state to render the new selection and submits to
// Shopify ajax cart change).

// Remove Quantity
// <button class="quantity__button no-js-hidden" name="minus" type="button"></button>
// button.quantity__button.no-js-hidden

// Add Quantity
// <button class="quantity__button no-js-hidden" name="plus" type="button">
// button.quantity__button.no-js-hidden

// querySelectorAll
// determine the name that was in the element
// based on minus then -1 or plus +1 or --i ++i

// get thee input value information //
// < input class="quantity__input" data-quantity-variant-id="40010440704159" type="number" name="updates[]" value="80" data-cart-quantity="80" min="1" step="1" aria-label="Quantity for 2021 Panini Diamond Kings Baseball Hobby Box" id="Quantity-1" data-index="1"></input>

const buttons = document.querySelectorAll("button.quantity__button.no-js-hidden");

for (var i = 0, len = buttons.length; i < len; i++) {
    console.log("forloop running... ");
    buttons[i].addEventListener('click', (event) => {
        let name = event.target.getAttribute('name');
        let input;
        let quantity;
        let variant_id;

        if (name === 'minus') {
            input = event.target.nextElementSibling;
            quantity = Number(input.value) - 1;
            variant_id = input.getAttribute('data-quantity-variant-id');
            changeQuantity(name, variant_id, quantity)
        }
        else {
            input = event.target.previousElementSibling;
            quantity = Number(input.value) + 1;
            variant_id = input.getAttribute('data-quantity-variant-id');
            changeQuantity(name, variant_id, quantity)
        }
    });
}

changeQuantity = (name, variant_id, quantity) => {
    // console.log("-------------------------------------");
    // console.log("UpdateQuantity function is running...");
    // console.log("name: ", name);
    // console.log("variant_id: ", variant_id);
    // console.log("quantity: ", quantity);
    // console.log("-------------------------------------");

    let variantId = variant_id;
    let newQuantity = quantity;

    // console.log("variantId....", variantId);
    // console.log("newQuantity....", newQuantity);
    // console.log("URL " + window.Shopify.routes.root + 'cart/update.js')
    // console.log("stringify: ", JSON.stringify({ 'id': variantId, 'quantity': newQuantity }));

    fetch('/cart/change.js', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 'id': variantId, 'quantity': newQuantity })

    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("Success...")
            // Refresh cart //
            // One method is to refresh the page //
            location.reload()
            // For performance, another way is to refresh the qty by calling the GET endpoint //
        }).catch(error => console.error('Error:', error));
}