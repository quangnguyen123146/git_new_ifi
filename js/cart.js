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
        updateCount(cart[id]);
    }else {
        cart[id] = newItem;
    } 
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart(id);
    add1ItemToCart(newItem);
}

function updateCount(item) {
    id = item.id;
    const cart = JSON.parse(localStorage.getItem('cart'));
    for (let key in cart) {
        if(key[id] == id) {
            let my_item = key[id]
            my_item[key].count += 1;
            updateCart();
        }
    }
}

function add1ItemToCart(item) {
    var cart = $(".cart_shop_purchase")
    const html = `<div class = "shopping_cart" id = "${item.id}">
        <div class = "item_element" >
        <span class = "item_name">
        ${item.name}  
        </span>
        <span class = "discount">
            Discount: ${item.discount}
        </span>
    </div>
    <input class = "item_count" type="number" min = "1"
    max = "100" value = "1">
    <div class="x-container" onclick = "removeCartItem(event)">X</div>
    <span class = "price_tag">${item.price}</span>
    </div>`
    console.log(cart)
    const $html = $(html);
    $html.find('item_name').text(item.name);
    $html.find('item_count').val(item.count);
    $html.find('price_tag').text(item.price);
    $html.find('discount').text(item.discount);
    cart.append($html);
    updateCart();
}


function removeCartItem(event) {
    const $item = $(event.target).closest('.shopping_cart');
    const id = $item.attr('id');
    const cart = JSON.parse(localStorage.getItem('cart'));
    delete cart[id]
    $item.remove();
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart()
}


function updateCart() {
    var cartItemContainer = document.getElementsByClassName('none_empty_shopping_cart')[0];
    var cartRows = cartItemContainer.getElementsByClassName('shopping_cart');
    var total = 0

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
        
        }
    }
}