const cart = {};

var clicked = 0;
var cart_button = document.getElementsByClassName('cart')[0];
cart_button.addEventListener('click', function() {
    
    if (clicked == 0) {
        document.getElementById('none_empty_shopping_cart_id').style.display = 'block';
        clicked = 1;
    }else if (clicked == 1) {
        document.getElementById('none_empty_shopping_cart_id').style.display = 'none';
        clicked = 0;
    }

});

var x_close = document.getElementsByClassName('x_close')[0];
x_close.addEventListener('click', function(){
    document.getElementById('none_empty_shopping_cart_id').style.display = 'none';
    clicked = 0;
})



if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    start()
}


function incHeight() {
    var el = document.getElementsByClassName('none_empty_shopping_cart')[0];
    var currHeight = el.clientHeight
    el.style.height = (currHeight + 30) + 'px';
}

function decHeight() {
    var el = document.getElementsByClassName('none_empty_shopping_cart')[0];
    var currHeight = el.clientHeight
    el.style.height = (currHeight - 100) + 'px';
}

document.getElementById('empty_cart').innerHTML = 'this cart is empty'
function start() {

    var item_count = document.getElementsByClassName('item_count')
    for (var i = 0; i < item_count.length; i++) {
        var input = item_count[i]
        input.addEventListener('change', item_count_change)
    }

    var addToCartButtons = document.getElementsByClassName('offer_button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

}

function removeCartItem(event) {
    const $item = $(event.target).closest('.item_element');
    const id = $item.attr('id');
    const cart = JSON.parse(localStorage.getItem('cart'));
    delete cart[id]
    $item.parent.parent.remove();
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart()
    decHeight()
}

function item_count_change(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCart()
}

function addToCartClicked(event) { 
    /* document.getElementById('none_empty_shopping_cart_id').style.display = 'block';
    incHeight();
    clicked = 1;
    document.getElementById('empty_cart').innerHTML = '' */
    const $item = $(event.target).closest('.container');
    const count = 1;
    const price = parseFloat($item.find('.offer_element2').text().replace('$', ''));
    const id = $item.attr('id');
    const title = $item.find('.offer_element1').text();

    const newItem = {
        id: id,
        name : title,
        price: price,
        count: count,
        discount: count
    }
    if (!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify({}));
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart[id]) {
        cart[id].count += newItem.count;
    }else {
        cart[id] = newItem;
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    
    addItemToCart(title , price, id, count);
    
    console.log(id, title, price);
    updateCart();
}

function addItemToCart(title , price, id, discount) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    var cartRow = document.createElement('li');
    cartRow.classList.add('item');
    cartRow.innerText = title;
    cartRow.setAttribute('id', 'cart_item_' + id);
    var CartItems = document.getElementsByClassName('item_drop')[0];
    
    console.log(title, price)
    var total = 0;
    if (cart) {
        const $cart = $('.item_drop')
        for (let key in cart) {
            const item = cart[key]
            const html = `<div class = "item_element" id = "${item.id}">
            <span class = "item_name">
              ${item.name}  
            </span>
            <span class = "discount">
                Discount: ${item.discount}
            </span>
        </div>
        <input class = "item_count" type="number" min = "1"
        max = "100">
        <div class="x-container" onclick = "removeCartItem(event)">X</div>
        <span class = "price_tag">${item.price}</span>`;
        const $html = $(html);
        $html.find('item_name').text(item.name);
        $html.find('item_count').val(item.count);
        $html.find('price_tag').text(item.price);
        $html.find('discount').text(item.discount);
        $cart.append($html);
        var countz = Number(item.count);

        total = total + (countz * price);
        cartRow.innerHTML = html;
        CartItems.append(cartRow);
        }
    }
    
    
}

function updateCart() {
    var cartItemContainer = document.getElementsByClassName('none_empty_shopping_cart')[0]
    var cartRows = cartItemContainer.getElementsByClassName('item')
    var total = 0

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('price_tag')[0]
        var item_count = cartRow.getElementsByClassName('item_count')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var item = item_count.value
        total += ((price * item)/2) + 3.99
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total_price')[0].innerText = '$' + total
    if (total == 0) {
        document.getElementById('empty_cart').innerHTML = 'this cart is empty'
    }else {
        document.getElementById('empty_cart').innerHTML = ''
    }
}