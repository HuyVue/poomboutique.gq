//ajout panier pas dans un iframe => de ce que j'ai vu c'est quand il n'y a pas de caracs
function cart_update() {
    qte = document.getElementById('panier-qte');
    $.get('panier.php', {type: 'countArticles'}, function (data) {
        $('#panier-qte').html(data);
        $('.nombre').html(data);
    });
}

//ajout panier depuis un iframe => de ce que j'ai vu c'est si il y a des caracs
function cart_update_iframe() {
    qte = document.getElementById('panier-qte');
    $.get('panier.php', {type: 'countArticles'}, function (data) {
        var page = parent.document;
        var qte = page.getElementById('panier-qte');
        qte.innerHTML = data;
        $('#panier-qte').html(data);
        $('.nombre').html(data);
    });
}

function cart_carac(article_id) {
    $.fancybox.open({type: 'iframe', href: 'achat-rapide-' + article_id + '.html'});
}

function cart_react() {
    if (is_panier() && $.galaxies != undefined) {
        $.galaxies.totaux.load();
        $.galaxies.articles.load();
    }
    cart_update();
}

function is_panier() {
    return (/panier\.html$/.test(document.location.toString()));
}

function cart_add(bt) {
    if (bt.data('article') > 0) {
        $.post('call_boutique.php',
            {type: 'cart', action: 'ajouter', article: bt.data('article')},
            function (json) {
                handle_cart_add(json);
            }
        );
    }
}

function cart_add_form(form) {
    console.log(form.serialize());
    $.post('call_boutique.php',
        form.serialize(),
        function (json) {
            handle_cart_add(json);
        }
    );
}

function handle_cart_add(json) {
    var data;
    try {
        console.log(json);
        data = JSON.parse(json);
        switch (data.code) {
            case 201:
                cart_update_iframe();
                if (is_panier()) {
                    cart_react();
                } else {
                    sweetAlert({
                        title: "Ajout au panier",
                        text: data.html,
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: data.message,
                        html: true
                    }, function () {
                        cart_react();
                    });
                }
                break;
            case -203:
                cart_carac(data.message)
                break;
            default:
                if (data.code > 0 && is_panier()) {
                    cart_react();
                } else {
                    cart_update_iframe();
                    sweetAlert({
                        title: "Ajout au panier",
                        text: data.html,
                        type: ((data.code > 0) ? "success" : "error"),
                        showCancelButton: false,
                        confirmButtonText: data.message,
                        html: true
                    });
                }
        }
    }
    catch (e) {
        console.log(json);
    }
}

$('body').ready(function () {
    setInterval(function () {
        cart_update()
    }, 300000);
    cart_update();
    $('.bt.cart,.bt_cart').click(function () {
        cart_add($(this));
    });
});