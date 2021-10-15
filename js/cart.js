const button = document.getElementsByClassName('offer_button');

for (let i = 0 ; i < button.length; i++) {
    button[i].addEventListener('click', addToCartClicked)
}

if (Object.keys(localStorage).length === 0) {
    $('.empty_cart').innerText = 'empty cart';
}else {
    initCartFromStorage();
}

function addToCartClicked(event) {
    const wholepage = $('.cart_shop_purchase');
    const $item = $(event.target).closest('.container');
    const count = 1;
    const price = parseFloat($item.find('.offer_element2').text().replace('$', ''));
    const id = $item.attr('id');
    const title = $item.find('.offer_element1').text();
    const discount = $item.find('.discount_value').val();
    const newItem = {
        id: id,
        name : title,
        price: price,
        count: count,
        discount: discount
    }
    if (!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify({}));
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart[id]) {
        cart[id].count += count;
        item_count_change(cart[id]);
    }else {
        cart[id] = newItem;
        add1ItemToCart(newItem);
    } 
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart();
}


function item_count_change(event) {
    var id = event.id;
    var row = document.getElementsByClassName('shopping');
    var i = 0;
    for (i; i < row.length; i++) {
        if (id in row[i]) {
            var item_count = document.getElementsByClassName('item_count')[i]; //undefine
            var item_count_value = Number(item_count.value); //undefine
            item_count.value = item_count_value + 1; //undefine
            break;
        }
    }
    updateCart();
}


function add1ItemToCart(item) {
    var cart = $(".cart_shop_purchase")
    const html = `<div class = "shopping" id = "${item.id}">
    <div class = "item_element">
    <span class = "item_name">
      ${item.name}  
    </span>
</div>
<h1 class = "add">+</h1>
<input class = "item_count" type="number" min = "1"
max = "100" value = 1>
<h1 class = "minus">-</h1> 
<div class="x-container" onclick = "removeCartItem(event)">X</div>
<span class = "price_tag">${item.price}</span>
</div>`;
    const $html = $(html);
    $html.find('item_name').text(item.name);
    $html.find('item_count').val(item.count);
    $html.find('price_tag').text(item.price);
    $html.find('discount').text(item.discount);
    cart.append($html);
    updateCart();
}

var plus_minus = document.getElementsByClassName('item_count');
for (var i = 0; i < plus_minus.length; i++) {
    plus_minus[i].addEventListener('click', plus_and_minus);
}

function plus_and_minus (event){
    var cart = JSON.parse(localStorage.getItem('cart'));
    const $item = $(event.target).closest('.shopping');
    const id = $item.attr('id');
    if (isNaN(event.value) || event.value <= 0) {
        event.value = Number(event.value) + 1;
    }
    cart[id].count = Number(event.value);
    updateCart();
}

function removeCartItem(event) {
    const $item = $(event.target).closest('.shopping');
    const id = $item.attr('id');
    const cart = JSON.parse(localStorage.getItem('cart'));
    delete cart[id]
    $item.remove();
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart()
}


function updateCart() {
    var cartItemContainer = document.getElementsByClassName('none_empty_shopping_cart')[0];
    var cartRows = cartItemContainer.getElementsByClassName('shopping');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('price_tag')[0]
        var item_count = cartRow.getElementsByClassName('item_count')[0]
        var price = parseFloat(priceElement.innerText)
        var item = item_count.value
        total += (price * item)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total_price')[0].innerText = '$' + total
    if (total == 0) {
        document.getElementById('empty_cart').innerHTML = 'this cart is empty'
    }else {
        document.getElementById('empty_cart').innerHTML = ''
    }
}

function initCartFromStorage( ) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    var total = 0;
    if (cart) {
        const $cart = $('.cart_shop_purchase')
        for (let key in cart) {
            const item = cart[key]
            const html = `<div class = "shopping" id = "${item.id}">
            <div class = "item_element">
            <span class = "item_name">
              ${item.name}  
            </span>
        </div>
        <h1 class = "add">+</h1>
        <input class = "item_count" type="number" min = "1"
        max = "100" value = 1>
        <h1 class = "minus">-</h1> 
        <div class="x-container" onclick = "removeCartItem(event)">X</div>
        <span class = "price_tag">${item.price}</span>
        <span class = "discount">${item.discount}</span>
        </div>`;
        const $html = $(html);
        $html.find('item_name').text(item.name);
        $html.find('item_count').val(item.count);
        $html.find('price_tag').text(item.price);
        $html.find('discount').text(item.discount);
        $cart.append($html);
        total += item.price * item.count
        }
        updateCart()
    }
}