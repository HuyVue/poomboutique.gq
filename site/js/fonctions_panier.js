$.site.boutique = {};
$.jgo.prm.cssSvgBackground.push('form#search > a', '#boutique_compte .item.compte', '#boutique_compte .item');
$.kamino = {};
$.galaxies = {};
$.cartAjax = new cartAjax();
$.doors = [];

var ajaxUrl = 'panier.php';
var b_couponInit = false;

$(document).ready(function () {
    // $.cartAjax.setDebug();

    /**
     * Informations sur les portes
     */
    var panier = theForceReveals('panier');
    var connexion = theForceReveals('connexion');
    var livraison = theForceReveals('livraison');
    var paiement = theForceReveals('paiement');

    $.doors.push(panier);
    if (connexion != null) {
        $.doors.push(connexion);
    }
    $.doors.push(livraison);
    $.doors.push(paiement);

    /**
     * Initialisation cartManager
     */
    $.site.boutique.panier = new cartManager();

    /**
     * Initialisation des galaxies
     */
    $.galaxies.articles = new cartGalaxy('articles', ajaxUrl);
    $.galaxies.totaux = new cartGalaxy('totaux', ajaxUrl);
    $.galaxies.client = new cartGalaxy('client', ajaxUrl);
    $.galaxies.livraison = new cartGalaxy('livraison', ajaxUrl);
    $.galaxies.livraisonClient = new cartGalaxy('livraisonClient', ajaxUrl);
    $.galaxies.modesLivraison = new cartGalaxy('modesLivraison', ajaxUrl);
    $.galaxies.methodesPaiement = new cartGalaxy('methodesPaiement', ajaxUrl);
    $.galaxies.coupon = new cartGalaxy('coupon', ajaxUrl);

    /**
     * bind galaxies dépendantes
     */
    $.galaxies.totaux.bindGalaxy($.galaxies.articles);
    $.galaxies.totaux.bindGalaxy($.galaxies.totaux);
    $.galaxies.totaux.bindGalaxy($.galaxies.livraison);

    /**
     * Initialisation cartKamino pour les articles
     */
    $.kamino.articles = new cartKamino('articles', panier);
    $.kamino.articles.bindGalaxy($.galaxies.articles, kaminoArticles);

    /**
     * Initialisation cartKamino pour les totaux
     */
    $.kamino.totaux = new cartKamino('totaux', panier, '#panier-total');
    $.kamino.totaux.setMaxTrooper(1);
    $.kamino.totaux.bindGalaxy($.galaxies.totaux);

    /**
     * Initialisation cartKamino pour les totaux
     */
    $.kamino.totaux3 = new cartKamino('totaux3', panier, '.panier_resume');
    $.kamino.totaux3.setMaxTrooper(1);
    $.kamino.totaux3.bindGalaxy($.galaxies.totaux);

    /**
     * Initialisation cartKamino pour les frais de port
     */
    $.kamino.totaux4 = new cartKamino('totaux4', paiement);
    $.kamino.totaux4.setMaxTrooper(1);
    $.kamino.totaux4.bindGalaxy($.galaxies.totaux);

    if (connexion != null) {
        /**
         * Initialisation cartKamino pour le formulaire d'inscription
         */
        $.kamino.clientInscription = new cartKamino('clientInscription', connexion, '#connexion-inscription');
        $.kamino.clientInscription.setBlank();
        $.kamino.clientInscription.bindGalaxy($.galaxies.client);
    }

    /**
     * Initialisation cartKamino pour les livraisonClient
     */
    $.kamino.livraison2 = new cartKamino('livraison2', livraison);
    $.kamino.livraison2.setBlank();
    $.kamino.livraison2.bindGalaxy($.galaxies.livraison);


    /**
     * Initialisation cartKamino pour le mode de livraison
     */
    $.kamino.modeLivraison = new cartKamino('modeLivraison', livraison);
    $.kamino.modeLivraison.bindGalaxy($.galaxies.livraison, kaminoModesLivraison);

    /**
     * Initialisation cartKamino pour les livraisonClient
     */
    $.kamino.livraisonClient = new cartKamino('livraisonClient', livraison);
    $.kamino.livraisonClient.setBlank();
    $.kamino.livraisonClient.bindGalaxy($.galaxies.livraisonClient, kaminoLivraisonClient);

    /**
     * Initialisation cartKamino pour les informations de livraison
     */
    $.kamino.livraison = new cartKamino('livraison', paiement);
    $.kamino.livraison.bindGalaxy($.galaxies.livraison);

    /**
     * Initialisation cartKamino pour les informations client
     */
    $.kamino.client = new cartKamino('client', paiement);
    $.kamino.client.bindGalaxy($.galaxies.client);

    /**
     * Initialisation cartKamino pour les informations client
     */
    $.kamino.clientForm = new cartKamino('clientForm', paiement);
    $.kamino.clientForm.bindGalaxy($.galaxies.client, function () {
        var _this = this;
        $('#paiement-edit-client').hide('fast', function () {
            $('#paiement-recap').show('fast', function () {
                _this.door.resize();
            });
        });
    });

    /**
     * Initialisation cartKamino pour les totaux dans le paiement
     */
    $.kamino.totaux2 = new cartKamino('totaux2', paiement);
    $.kamino.totaux2.setMaxTrooper(1);
    $.kamino.totaux2.bindGalaxy($.galaxies.totaux);

    /**
     * Initialisation cartKamino pour les méthodes de paiement
     */
    $.kamino.methodesPaiement = new cartKamino('methodesPaiement', paiement);
    $.kamino.methodesPaiement.bindGalaxy($.galaxies.methodesPaiement);


    /**
     * Initialisation cartKamino pour les articles dans le paiement
     */
    $.kamino.articles2 = new cartKamino('articles2', paiement);
    $.kamino.articles2.bindGalaxy($.galaxies.articles);

    /**
     * Initialisation cartKamino pour le coupon de réduction
     */
    $.kamino.coupon = new cartKamino('coupon', paiement);
    $.kamino.coupon.bindGalaxy($.galaxies.coupon, function () {
        this.door.resize();
    });

    /**
     * Chargement des galaxies
     */
    for (var g in $.galaxies) {
        $.galaxies[g].load();
    }

    /**
     * Blocage des blocs
     */
    $('.bloc_panier:not(:first)').addClass('notaccessible');

    /**
     * Au clic sur un bouton pour aller au bloc suivant
     */
    $('[data-cart-next]').click(function (event) {
        event.preventDefault();
        var next = $(this).data('cart-next');
        var valid = window[$(this).data('cart-valid')];

        $.doors[next].resize();

        if (typeof valid === 'function') {
            valid(next, $(this));
            panierDone((next - 1));
        } else {
            r2d2UnlockDoor(next);
            panierDone((next - 1));
        }
    });

    /**
     * Au clic sur l'entête d'un bloc
     */
    $('.panier_tete').click(function (event) {
        event.preventDefault();
        event.stopPropagation();

        var current = $(this).data('cart-current');
        var valid = window[$(this).data('cart-valid')];

        if (typeof valid === 'function') {
            valid(current, $(this));
            panierUndone(current);
        } else {
            r2d2UnlockDoor(current);
            //panierUndone(current);
        }
    });


    function panierDone(door) {
        $($('.bloc_panier')[door]).addClass('done');
    }

    function panierUndone(door) {
        $($('.bloc_panier')[door]).removeClass('done');
    }

    /**
     * Au clic sur le bouton d'ajout en quantité
     */
    $('.boutique-quantite-operateur').click(function (event) {
        event.preventDefault();
        var form = $(this).parents('form');
        var trooper = $.kamino.articles.indexOf($(this).parents('[data-kamino-trooper]'));
        var operateur = parseInt($(this).data('operateur'));
        if (operateur == 0) {
            $.kamino.articles.fill('quantite', operateur, trooper, true);
        } else {
            $.kamino.articles.fill('quantite', (parseInt(form.find('input[name=quantite]').val()) + operateur), trooper, true);
        }
        $.cartAjax.post(ajaxUrl, form.serialize(),
            function () {
                if ($.kamino.articles.troopers.length <= 1) {
                    $.galaxies.articles.load();
                } else {
                    $.kamino.articles.delete(trooper, function () {
                        $.galaxies.articles.load();
                    });
                }
            });
    });

    /**
     * Au clic sur le bouton pour modifier les informations de facturation
     */
    $('#paiement-edit-client-btn').click(function (event) {
        event.preventDefault();
        $('#paiement-recap').hide('fast', function () {
            $('#paiement-edit-client').show('fast', function () {
                $.kamino.clientForm.door.resize();
            });
        });
    });

    /**
     * Au clic sur le bouton pour s'inscrire
     */
    $('#connexion-inscription-btn').click(function (event) {
        event.preventDefault();
        $('#connexion-non-connecte').hide('fast', function () {
            $('#connexion-connecte').hide('fast', function () {
                $('#connexion-inscription').show('fast', function () {
                    $.kamino.clientInscription.door.resize();
                });
            });
        });
    });

    /**
     * Au clic sur le bouton pour s'inscrire
     */
    $('#connexion-inscription-back-btn').click(function (event) {
        event.preventDefault();
        $('#connexion-inscription').hide('fast', function () {
            $('#connexion-non-connecte').show('fast');
        });
    });

    /**
     * A la soumission du formulaire de coupon
     */
    $('.coupon-form').on('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $.cartAjax.post(ajaxUrl, $(this).serialize(), function (data) {
            if (!data.code) {
                sweetAlert('Oops...', data.message, 'error');
            } else {
                $.galaxies.coupon.load();
            }
        }, 'JSON');
        return false;
    });

    /**
     * Au clic sur le bouton pour passer à la caisse
     */
    $('#paiement-final-form-btn').click(function () {
        var form = $($(this).data('form'));
        var errorMessage = $(this).data('message');
        if (form.find('input[type=radio]:checked').length > 0) {
            var params = {
                action: form.find('[name=action]').val(),
                methodePaiement: form.find('[name=methodePaiement]:checked').val(),
                mode: $('body').find('[name=mode]:checked').val(),
            };
            $.cartAjax.post(ajaxUrl, params, function (data) {
                if (data.code > 0) {
                    location.replace(data.url);
                } else if (data.code == -1) {
                    sweetAlert('Oops...', data.msg, 'error');
                    location.replace(data.url);
                } else {
                    sweetAlert('Oops...', errorMessage, 'error');
                }
            }, 'JSON');
        } else {
            sweetAlert('Oops...', errorMessage, 'error');
        }
    });
});

/***********************************************************************************************************************
 * *********************************************************************************************************************
 * *********************************************************************************************************************
 * FONCTIONS ***********************************************************************************************************
 * KAMINO **************************************************************************************************************
 * *********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * Articles
 * @param cartKamino kamino
 */
function kaminoArticles() {
    var _this = this;
    if (this.done && this.troopers.length > 0) {
        $('#panier-vide').hide('fast', function () {
            $('#panier-non-vide').show('fast');
        });
    } else {
        $('#panier-non-vide').hide('fast', function () {
            $('#panier-vide').show('fast', function () {
                _this.door.resize();
            });
        });
    }
    $('#panier-bas-non-annonce').hide('fast', function () {
        $('#panier-bas-annonces').show('fast');
    })
}

/**
 * LivraisonClient
 * @param kamino
 */
function kaminoLivraisonClient() {
    var _this = this;
    $.cartAjax.get(ajaxUrl, {action: 'clientAuthed'}, function (data) {
        if (data > 0) {
            $('#connexion-inscription').hide('fast', function () {
                $('#connexion-non-connecte').hide('fast', function () {
                    $('#connexion-connecte').show('fast', function () {
                        _this.door.resize();
                        $.kamino.clientInscription.door.resize();
                    });
                });
            });
        } else {
            $('#connexion-inscription').hide('fast', function () {
                $('#connexion-connecte').hide('fast', function () {
                    $('#connexion-non-connecte').show('fast', function () {
                        _this.door.resize();
                        $.kamino.clientInscription.door.resize();
                    });
                });
            });
        }
    });
}

/**
 * ModesLivraison
 * @param kamino
 */
function kaminoModesLivraison() {
    if (this.troopers.length > 0) {
        //kamino.troopers[0].find('input[type=radio]:first').prop('checked', true);
        for (var i = 0; i < this.troopers.length; i++) {
            //wattoStore(kamino.troopers[i]);
            shutDownHologram(this.troopers[i])
        }
    }
    this.door.resize();
}


/***********************************************************************************************************************
 * *********************************************************************************************************************
 * *********************************************************************************************************************
 * FONCTIONS ***********************************************************************************************************
 * VERIFICATION ********************************************************************************************************
 * *********************************************************************************************************************
 **********************************************************************************************************************/

function openArticles(door) {
    $('#panier-bas-non-annonce').hide('fast', function () {
        $('#panier-bas-annonces').show('fast');
    });
    r2d2UnlockDoor(door);
}

/**
 * Vérification que tout est bon dans la première étape
 * @returns {boolean}
 */
function checkPanier(door) {
    if ($.kamino.articles.troopers.length > 0) {
        $.kamino.livraisonClient.door.resize();
        $('#panier-bas-annonces').hide('fast', function () {
            $('#panier-bas-non-annonce').show('fast', function () {
                $.kamino.livraisonClient.door.resize();
            });
        });
        r2d2UnlockDoor(door);
    }
}

/**
 * Vérification que l'inscription d'un compte temporaire s'est bien passé
 * @param door
 */
function checkTempClient(door) {
    $.cartAjax.post(ajaxUrl, {action: 'tempClient'}, function (data) {
        $.galaxies.livraison.load();
        if (data > 0) {
            r2d2UnlockDoor(door);
        }
    });
}

/**
 * Vérification de la connexion du client
 * @param door
 */
function checkClient(door, btn) {
    var email = $(btn.data('email')).val();
    var pass = $(btn.data('pass')).val();
    var errorMessage = btn.data('message');
    $.cartAjax.post(ajaxUrl, {action: 'connexion', login: email, password: pass}, function (data) {
        if (data > 0) {
            $.galaxies.livraisonClient.load();
            $.galaxies.client.load();
            $.galaxies.livraison.load();
            r2d2UnlockDoor(door);
        } else {
            sweetAlert("Oops...", errorMessage, "error");
        }
    });
}

/**
 * Vérification que l'utilisateur est connecté
 * @param door
 */
function checkLogged(door) {
    $.cartAjax.get(ajaxUrl, {action: 'clientAuthed'}, function (data) {
        if (data > 0) {
            /*$.galaxies.livraisonClient.load();
            $.galaxies.client.load();
            $.galaxies.livraison.load();*/

            $.galaxies.livraisonClient.loadAndResize(door);
            $.galaxies.client.loadAndResize(door);
            $.galaxies.livraison.loadAndResize(door);
            //r2d2UnlockDoor(door);
        }
    });
}

/**
 * Vérification de l'inscription du client
 * @param door
 * @param btn
 */
function checkClientInscription(door, btn) {
    var form = $('form[data-kamino-trooper=clientInscription]');
    var errorMessage = btn.data('message');
    var emptys = form.find('input[required]').filter(function () {
        return !this.value;
    });
    form.find('input,select').css('background-color', '')
        .css('color', '');
    var passwordsEqual = form.find('input[type=password]:first').val() == form.find('input[type=password]:last').val();
    if (!passwordsEqual) {
        form.find('input[type=password]').css('background-color', 'rgb(255, 204, 204)')
            .css('color', 'rgb(255, 0, 0)');
        sweetAlert('Oops...', "Les mots de passe ne correspondent pas", 'error');
        return;
    }
    if (emptys.length < 1 && passwordsEqual) {
        $.cartAjax.post(ajaxUrl, form.serialize(), function (data) {
            //console.log(data);
            a_data = JSON.parse(data);
            if (parseInt(data) > 0) {
                $.galaxies.livraisonClient.load();
                $.galaxies.client.load();
                $.galaxies.livraison.load();
                r2d2UnlockDoor(door);
            } else if (typeof a_data.msg !== 'undefined') {
                sweetAlert('Oops...', a_data.msg, 'error');
            } else {
                sweetAlert('Oops...', errorMessage, 'error');
            }
        });
    } else {
        console.log(emptys);
        $(emptys).css('background-color', 'rgb(255, 204, 204)');
        $(emptys).css('color', 'rgb(255, 0, 0)');
        sweetAlert('Oops...', errorMessage, 'error');
    }
}

/**
 * Vérification des modifications sur l'adresse de facturation
 * @param door
 * @param btn
 */
function checkClientForm(door, btn) {
    var adresse = $('form[data-kamino-trooper=clientForm]');
    var errorMessage = btn.data('message');
    var check = true;
    adresse.find('input[required]').each(function () {
        var value = $(this).val();
        if (value == undefined || $.trim(value) == '') {
            check = false;
        }
    });
    if (check && $.kamino.clientForm.troopers.length > 0) {
        $.cartAjax.post(ajaxUrl, adresse.serialize(), function (data) {
            if (parseInt(data) > 0) {
                $.galaxies.client.load();
            } else {
                swal({
                    title: "Oops...",
                    text: errorMessage,
                    type: "error"
                }, function () {
                    $.kamino.clientForm.door.resize();
                });
            }
        });
    }
    if (!check) {
        swal({
            title: "Oops...",
            text: errorMessage,
            type: "error"
        }, function () {
            $.kamino.clientForm.door.resize();
        });
    }
}

/**
 * Vérification des informations de connexion
 * @param door
 */
function checkLivraison(door, btn) {
    var adresse = $('form[data-kamino-trooper=livraisonClient]');
    var mode = $('form[data-kamino-trooper=modeLivraison]');
    var errorMessage = btn.data('message');
    var check = true;
    if (mode.find('input:checked').length < 1) {
        check = false;
    }
    adresse.find('input[required]').each(function () {
        var value = $(this).val();
        $(this).css('background-color', '');
        if (value == undefined || $.trim(value) == '') {
            $(this).css('background-color', 'rgb(255, 204, 204)');
            check = false;
        }
    });
    if (check && $.kamino.modeLivraison.troopers.length > 0) {
        var modeLivraisonData = mode.serialize();
        $.cartAjax.post(ajaxUrl, modeLivraisonData);
    }
    if (check && $.kamino.livraisonClient.troopers.length > 0) {
        $.cartAjax.post(ajaxUrl, adresse.serialize(), function () {
            $.galaxies.livraisonClient.load();
            $.galaxies.client.load();
            $.galaxies.livraison.load();
        });
    }
    if (check) {
        r2d2UnlockDoor(door);
    } else {
        swal({
            title: "Oops...",
            text: errorMessage,
            type: "error"
        }, function () {
            $.kamino.livraisonClient.door.resize();
        });
    }
}

/***********************************************************************************************************************
 * *********************************************************************************************************************
 * *********************************************************************************************************************
 * CLASSES & FONCTIONS DIVERSES ****************************************************************************************
 * *********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * Création des select pour les boutiques
 * @param trooper
 */
function wattoStore(trooper) {
    trooper.find('input[data-kamino-fill=boutiques]').each(function () {
        var _this = $(this);
        if (parseInt(_this.val()) > 0) {
            _this.remove();
        } else {
            _this.parent().find('select[name=boutique]').remove();
            _this.remove();
        }
    });
}

/**
 * Supprime les images vides
 * @param trooper
 */
function shutDownHologram(trooper) {
    trooper.find('img').each(function () {
        var src = $(this).attr('src');
        if (src == undefined || src == '') {
            $(this).remove();
        }
    });
}

/**
 * Dévérouille et ouvre un bloc
 * @param door
 */
function r2d2UnlockDoor(door) {
    var previous = $.site.boutique.panier.accs.prm.elems[(door - 1)];
    var current = $.site.boutique.panier.accs.prm.elems[door];
    var blocs = $('.bloc_panier');
    if (blocs == undefined || blocs.length == undefined || blocs.length < 1) {
        return;
    }
    var currentDom = blocs.get(door);
    if (previous != undefined) {
        previous.ferme();
    }
    if (current != undefined) {
        //current.ouvre();
        current.ouvreHeightAuto();
        if (door > 1) {
            $('html, body').animate({
                scrollTop: parseInt($('[data-door="' + (door - 1) + '"]').offset().top)
            }, 200);
        }
    }
    if (currentDom != undefined) {
        $(currentDom).removeClass('notaccessible');
        $(currentDom).removeClass('unauthorized');
    }
}

/**
 * Révèle des informations sur chaque porte
 * @param doorType
 * @returns {DOMStringMap|jQuery}
 */
function theForceReveals(doorType) {
    var door = $('[data-type=' + doorType + ']');
    if (door.length > 0) {
        var data = door.get(0).dataset;
        return new cartDoor(parseInt(data.door), data.type);
    }
    return null;
}

/**
 * Dispatche les requêtes AJAX
 */
function cartAjax() {
    this.callbacks = $.Callbacks('memory');
    this.callbacks.add(function (params) {
        return $.ajax(params);
    });
    this.pile = [];
    this.executing = false;
    this.debug = false;
    this.eventName = 'ready';
    MicroEvent.mixin(this);

    this.get = function (_url, _data, _success, _dataType) {
        var params = this.prepare(_url, 'GET', _data, _success, _dataType);
        return this.exec(params);
    };

    this.post = function (_url, _data, _success, _dataType) {
        var params = this.prepare(_url, 'POST', _data, _success, _dataType);
        return this.exec(params);
    };

    this.prepare = function (_url, _method, _data, _success, _dataType) {
        return {
            url: _url,
            method: _method,
            dataType: _dataType,
            data: _data,
            success: _success
        };
    };

    this.addPile = function (params) {
        var pileSize = this.pile.length;
        this.pile.push(params);
        if (pileSize < 1) {
            this.notify();
        }
    };

    this.execPile = function () {
        if (this.pile.length > 0) {
            this.executing = true;
            this.callbacks.fire(this.pile.shift());
        }
    };

    this.exec = function (params) {
        if (this.debug) {
            this.printDebug('starting', params);
        }
        var _this = this;
        var mainSuccess = params.success;
        params.success = function (data) {
            if (_this.debug) {
                _this.printDebug('done', params);
            }
            if (typeof mainSuccess === 'function') {
                mainSuccess.call(_this, data);
            }
            _this.executing = false;
            _this.notify();
        };
        return this.addPile(params);
    };

    this.printDebug = function (lib, params) {
        if (typeof params !== 'object') {
            console.warn('cartAjax.printDebug : undefined params');
            return;
        }
        var data = '';
        var et = '';
        for (var p in params.data) {
            data += et + p + '=' + params.data[p];
            et = '&';
        }
        console.log(params.method + ':' + params.url + (data.length > 0 ? '?' + data : '') + ' ' + lib);
    };

    this.notify = function () {
        this.trigger(this.eventName);
    };

    this.setDebug = function () {
        this.debug = true;
    };

    var _this = this;
    this.bind(this.eventName, function () {
        _this.execPile.call(this);
    });
}

/**
 * Gestion des données
 * @param type
 * @param url
 */
function cartGalaxy(type, url) {
    this.kaminoans = [];
    this.loading = false;
    this.type = type;
    this.url = url;
    this.data = [];
    MicroEvent.mixin(this);

    this.add = function (kamino) {
        if (this.kaminoans.indexOf(kamino) < 0) {
            this.kaminoans.push(kamino);
        }
    };

    this.load = function () {
        if (this.loading) {
            return;
        }
        this.loading = true;
        var _this = this;
        $.cartAjax.exec({
            url: _this.url,
            method: 'GET',
            data: {action: _this.type},
            dataType: 'JSON',
            success: function (data) {
                _this.data = data;
                for (var k = 0; k < _this.kaminoans.length; k++) {
                    _this.kaminoans[k].reset(function (kamino) {
                        kamino.load(data);
                    });
                }
                if (_this.type == 'coupon' && b_couponInit == true) { //ici on met à jour les tarifs pour le coupon
                    $('[data-kamino-fill="ht"]').html(data[0]['ht']);
                    $('[data-kamino-fill="tva"]').html(data[0]['tva']);
                    $('[data-kamino-fill="ttc_fdp"]').html(data[0]['ttc_fdp']);
                } else if (_this.type == 'coupon' && b_couponInit == false) {
                    b_couponInit = true;
                }
                _this.trigger('change');
                _this.loading = false;
            }
        });
    };

    this.loadAndResize = function (door) {
        if (this.loading) {
            return;
        }
        this.loading = true;
        var _this = this;
        $.cartAjax.exec({
            url: _this.url,
            method: 'GET',
            data: {action: _this.type},
            dataType: 'JSON',
            success: function (data) {
                _this.data = data;
                for (var k = 0; k < _this.kaminoans.length; k++) {
                    _this.kaminoans[k].reset(function (kamino) {
                        kamino.load(data);
                    });
                }
                //_this.trigger('change');
                _this.loading = false;
                r2d2UnlockDoor(door);
            }
        });
    };

    this.bindGalaxy = function (galaxy) {
        var _this = this;
        if (typeof galaxy !== 'object') {
            throw 'cartGalaxy.bindGalaxy incorrect object';
        }
        galaxy.bind('change', function () {
            _this.load();
        });
    };
}

/**
 * Gestion des différents blocs du panier
 * @param index
 * @param type
 */
function cartDoor(index, type) {
    this.index = null;
    this.type = null;
    this.manager = null;
    this.dom = null;
    this.layer = null;

    this.resize = function () {
        if (this.manager == null && !this.init(this.index, this.type)) {
            throw 'cartDoor.resize : fail to init';
        }
        //this.manager.resize();
        this.manager.resizeHeightAuto();
        this.layer.resize();
    };

    this.init = function (index, type) {
        if (typeof index !== 'number' || typeof type !== 'string') {
            throw 'cartDoor.init : wrong init values';
        }
        this.index = index;
        this.type = type;
        this.dom = $('[data-type=' + this.type + '] .panier_remplissage');
        this.layer = new cartLayer(this.dom);
        try {
            this.manager = $.site.boutique.panier.accs.prm.elems[this.index];
            return true;
        } catch (e) {
            return false;
        }
    };

    this.init(index, type);
}

/**
 * Gestion de la surcouche de chargement animée
 * @param parent
 */
function cartLayer(parent) {
    this.baseLayer = $('#kamino-jango-loading-layer');
    this.layer = this.baseLayer.clone(true).removeAttr('id');
    this.parent = undefined;
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.counter = 1;
    this.state = 0;

    this.applyTo = function (parent) {
        if (typeof parent !== 'object') {
            return;
        }
        this.parent = parent;
        this.resize();
        this.layer.detach();
        this.layer.appendTo(parent);
        this.counter = 1;
    };

    this.resize = function () {
        var position = parent.position();
        var width = parent.width();
        //var height = parent.height();
        var height = 'auto';
        if (width > this.baseLayer.width() && height > this.baseLayer.height()) {
            //this.setTop(position.top);
            //this.setLeft(position.left);
            this.setWidth(width);
            this.setHeight(height);
        }
    };

    this.show = function () {
        if (this.state == 0) {
            setTimeout(this.execReset, 10000, this.counter, this.layer, this.state);
        }
        setTimeout(this.execShow, 0, this.counter, this.layer, this.state);
    };

    this.execShow = function (counter, layer, state) {
        counter++;
        if (counter > 0) {
            layer.fadeIn();
            state = 1;
        }
    };

    this.hide = function () {
        setTimeout(this.execHide, 2000, this.counter, this.layer, this.state);
    };

    this.execHide = function (counter, layer, state) {
        counter--;
        if (counter < 1) {
            layer.fadeOut();
            state = 0;
        }
    };

    this.execReset = function (counter, layer, state) {
        counter = 0;
        layer.fadeOut();
        state = 0;
    };

    this.setTop = function (top) {
        this.top = top;
        this.layer.css('top', this.top + 'px');
    };

    this.setLeft = function (left) {
        this.left = left;
        this.layer.css('left', this.left + 'px');
    };

    this.setWidth = function (width) {
        this.width = width;
        this.layer.width(this.width + 'px');
    };

    this.setHeight = function (height) {
        this.height = height;
        if (height == 'auto') {
            this.layer.height(this.height);
        } else {
            this.layer.height(this.height + 'px');
        }
    };

    if (typeof parent === 'object') {
        this.applyTo(parent);
    }
    this.execHide(this.counter, this.layer, this.state);
}

/**
 * Gestion du clonage et du remplissage
 * @param type
 * @param door
 * @param handler
 */
function cartKamino(type, door, handler) {
    if (handler == undefined) {
        var handler = '';
    }
    this.type = type;
    this.door = door;
    this.jango = this.door.dom.find($.trim(handler + ' [data-kamino-jango=' + this.type + ']'));
    this.troopers = [];
    this.inc = -1;
    this.done = false;
    this.maxTroopers = 0;

    // for reload
    this.callbackBlank = false;

    this.jango.find('select').prop('disabled', true);
    this.jango.hide();

    this.clone = function () {
        var trooper = this.jango.clone(true);
        trooper.removeAttr('data-kamino-jango');
        trooper.attr('data-kamino-trooper', this.type);
        trooper.show();
        this.troopers.push(trooper);
        trooper.find('select').prop('disabled', false);
        this.inc++;
        return this.troopers.indexOf(trooper);
    };

    this.fill = function (type, data, trooper, clear) {
        if (clear == undefined) {
            var clear = false;
        }
        if (typeof this.troopers[trooper] === 'undefined') {
            return;
        }
        var els = this.troopers[trooper].find('[data-kamino-fill=' + type + ']');
        if (els.length < 1) {
            return;
        }
        if (typeof data !== 'number' && (data == undefined || data == null || $.trim(data) == '')) {
            return;
        }
        var pureData = (typeof data == 'string') ? $.trim(data.replace(/<[^>]+>/ig, '')) : data;
        if (typeof data == 'string' && (pureData == '' || pureData == 'undefined')) {
            return;
        }
        els.each(function () {
            var el = $(this);
            if (el.is('input')) {
                switch (el.attr('type')) {
                    case 'checkbox':
                        if (el.val() != undefined && el.val() != '' && el.val() != 'on') {
                            el.parents('form').find('[name="' + el.attr('name') + '"][value="' + pureData + '"]').prop('checked', true);
                        } else {
                            el.val(pureData);
                        }
                        break;
                    case 'radio':
                        if (el.val() != undefined && el.val() != '' && el.val() != 'on') {
                            el.parents('form').find('[name="' + el.attr('name') + '"]').removeProp('checked');
                            el.parents('form').find('[name="' + el.attr('name') + '"][value="' + pureData + '"]').prop('checked', true);
                        } else {
                            el.val(pureData);
                        }
                        break;
                    default:
                        el.val(pureData);
                }
                return;
            }
            if (el.is('select')) {
                el.children('option').removeProp('selected');
                el.find('option[value="' + pureData + '"]').prop('selected', true);
                return;
            }
            if (el.is('img')) {
                if (typeof data === 'string') {
                    el.attr('src', data);
                } else {
                    el.remove();
                }
                return;
            }
            if (clear) {
                el.html(data);
            } else {
                el.append(data);
            }
        });
    };

    this.fillUp = function (data) {
        if (this.maxTroopers == 0 || this.troopers.length < this.maxTroopers) {
            var index = this.clone();
            for (var type in data) {
                this.fill(type, data[type], this.inc);
            }
        }
    };

    this.setMaxTrooper = function (nb) {
        var max = parseInt(nb);
        if (max > 0) {
            this.maxTroopers = max;
        }
    };

    this.setCallback = function (fn) {
        if (typeof fn === 'function') {
            this.callbackFunction = fn;
        }
    };

    this.bindGalaxy = function (galaxy, callback) {
        var _this = this;
        if (typeof galaxy !== 'object') {
            throw 'cartKamino.bind incorrect object';
        }
        if (typeof callback !== 'function') {
            callback = function () {
                this.door.resize();
            };
        }
        galaxy.bind('change', function () {
            _this.reset(function () {
                _this.load(galaxy.data, callback);
            });
        });
    };

    this.setBlank = function () {
        this.callbackBlank = true;
    };

    this.load = function (data, callback) {
        this.door.layer.show();
        if (this.maxTroopers > 0) {
            data = data.slice(0, this.maxTroopers);
        }
        if (data.length > 0) {
            for (var i in data) {
                this.fillUp(data[i]);
            }
        }
        else if (this.callbackBlank) {
            this.clone();
        }
        this.achieve();
        if (typeof callback === 'function') {
            callback.call(this, this);
        }
    };

    this.achieve = function () {
        if (this.troopers.length > 0) {
            for (var i = 0; i < this.troopers.length; i++) {
                this.jango.before(this.troopers[i]);
            }
        }
        this.done = true;
        this.door.layer.hide();
    };

    this.reset = function (callback) {
        var finished = false;
        if (this.troopers.length > 0) {
            for (var i = 0; i < this.troopers.length; i++) {
                if (this.troopers.length == 1 && typeof callback === 'function') {
                    this.delete(i, callback);
                    finished = true;
                } else {
                    this.delete(i);
                }
            }
            if (!finished) {
                this.reset(callback);
                return;
            }
        }
        if (typeof callback === 'function' && !finished) {
            callback(this);
        }
        this.inc = -1;
        this.done = false;
    };

    this.delete = function (index, callback) {
        try {
            var _this = this;
            var trooper = this.troopers.splice(index, 1)[0];
            trooper.hide('fast', function () {
                _this.door.resize();
                if (typeof callback === 'function') {
                    callback(_this);
                }
            }).remove();
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    };

    this.indexOf = function (dom) {
        for (var i = 0; i < this.troopers.length; i++) {
            if (this.troopers[i].get(0) == dom.get(0)) {
                return i;
            }
        }
    };
}

function allResizeBoutique() {

}


$.jgo.handledResize.push(allResizeBoutique);

/**
 * Gestion des blocs du panier
 */
function cartManager() {

    var prm = {
        item: '.bloc_panier',
        tete: '.panier_tete',
        titre: '.panier_titre',
        resume: '.panier_resume',
        contenu: '.panier_remplissage',
        classeActive: 'open'
    };

    this.prm = prm;

    elems = [];

    var accs = {};

    this.init = function () {

        accs = new $.jgo.accordeon({
            duree: 200,
            objet: '.bloc_panier',
            objetCache: '.panier_remplissage',
            classeActive: prm.classeActive
        });


        $(prm.item).each(function (index) {
            elems.push(new cartElement($(this), index));
        });


        accs.prm.elems[0].ouvre();
    };


    function cartElement(obj, index) {

        var html = obj.html();
        var cnt = obj.find(prm.contenu).find('div');
        var acc = accs.prm.elems[index];
        var claAct = accs.prm.classeActive;

        /*obj.find(prm.tete).click(function () {
            obj.removeClass('unauthorized');
            if (obj.hasClass(prm.classeActive)) {
                acc.ferme();
            } else {
                if (isBlocOk(obj)) {
                    acc.ouvre();
                    //location.reload();  //Fix car les accordéons se referment suite a une propagation d'evenement Jquery
                } else {
                    obj.addClass('unauthorized');
                }
            }
        });*/

    }


    //===================================================
    //DEV DEV DEV DEV DEV DEV
    //===================================================
    //verifier si on peut ouvrir le bloc (DEV)
    function isBlocOk(obj) {
        if (obj.hasClass('notaccessible')) {
            return false;
        } else {
            return true;
        }
    }


    if ($.jgo.elementExiste(prm.item)) {
        this.init();
        this.accs = accs;
    }

}