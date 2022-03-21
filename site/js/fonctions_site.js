$.jgo.prm = {
    defaultActiveClass: 'active',
    transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend webkitAnimationEnd oanimationend msAnimationEnd animationend',
    handleTouchNav: false,
    debug: false,
    replaceSVGtoPNG: true,
    aspireSVG: true,
    cssSvgBackground: [],
    handleTextInput: true,
    textInputException: 'input[type=text]:not(.noErase), textarea:not(.noErase)',
    handleIframeWmode: true,
    handleResize: true,
    watchScroll: true,
    scrollPoint: $('nav.nav').offset().top,
    menuMobile: true,
    menuMobileReleaseElems: ['.contenu', '#logo'],

    ready: function () {
        if (is_iOs()) {
            $('html').addClass('badios');
        } // rajoute a body la classe badios si ios7
        try {
            annonceSwitcher();
        } catch (e) {
        } // determine si les annonces sont en gallerie ou pas

        /* Pied de page */
        if ($.jgo.elementExiste('footer')) {
            $('#footer-bt').click(function () {
                $('footer').toggleClass('ouvre');
            });
            $('#total_site,  footer .bloc--compl').click(function () {
                $('footer').removeClass('ouvre');
            });
        }

        if ($.jgo.elementExiste('.diaporama--fiche')) {
            $('body').addClass('fiche-diaporama');
        }

        if ($.jgo.elementExiste('.diaporama--accueil')) {
            $('body').addClass('accueil');
        }


        //pour la boutique
       


       

        // if ($(".bloc-gauche--tri > * > ul > li").hasClass("op")) {
        //     $('.reninit').css('display', 'block');
        // } else {
        //     $('.reninit').css('display', 'none');
        // }


        /*diaporamas et slideshows*/
        $.site.diaporama = new $.jgo.slideshow({
            conteneur: '.diaporama--fond'
        });

        $.site.diaporama_intro = new $.jgo.slideshow({
            conteneur: '.diaporama--intro'
        });

        $.site.diaporama_accueil = new $.jgo.slideshow({
            conteneur: '.diaporama--accueil',
            afficheAleatoire: true
        });

        $.site.diaporamaLaius = new $.jgo.slideshow({
            conteneur: '.diaporama--laius'
        });

        $.site.diaporamaFiche = new $.jgo.slideshow({
            conteneur: '.diaporama--fiche'
        });

        $.site.slideshow = new $.jgo.slideshow({
            conteneur: '.slideshow',
            genereBoutons: true,
            placeNum: false,
            tempsAffichage:  8000,
            defilementAuto:true
        });


        //fourrage en background-image d'un img
        $.site.imgback = new $.jgo.imgback({
            elements: ['.img--back', '.slide', '.ico']
        });

        // surveillance du viewport
        $.site.vsy = $('.vsy').jalisInView();

        //accordeon
        $.site.accordeon = new $.jgo.accordeon();

        // clic & scroll
        goClic('.go');

        // seuil de responsive pour les annonces
        $('.ann').jalisInnerResponsive({
            step: 540,
            cssClass: 'ann-gallerie'
        });
        $('*[class*="grille-annonce--"] .ann').jalisInnerResponsive({
            step: 265
        });
        $('.grille-annonce .ann').jalisInnerResponsive({
            step: 340
        });
        $('.ann-gallerie--survol').jalisInnerResponsive({
            step: 320,
            cssClass: 'small--survol'
        });

        //retrait de l'intro une fois le scroll fait
        if ($('body').hasClass('accueil')) {
            $(window).scroll(function () {
                if ($(window).scrollTop() >= $(window).height() && $.jgo.elementExiste('.intro')) {
                    $('.intro').remove();
                    $('body, html').scrollTop(0);
                    $.jgo.prm.scrollPoint = $('nav.nav').offset().top;
                }
            });
        }

        // zoom quand survol
        $.site.zoom = $('.zoom').jalisZoom({
            zoomCssClass: 'fiche-img-cover'
        });

        //sticky (bugé)
        /*$.site.sticky = $('.sticky').jalisSticky({
            topModulator: function () {
                return $('body.scrolled nav').outerHeight(true);
            }
        });*/














                /*slick*/



    $(".vertical-center-4").slick({
        dots: true,
        vertical: true,
        centerMode: true,
        slidesToShow: 4,
        slidesToScroll: 2
      });
      $(".vertical-center-3").slick({
        dots: true,
        vertical: true,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 3
      });
      $(".vertical-center-2").slick({
        dots: true,
        vertical: true,
        centerMode: true,
        slidesToShow: 2,
        slidesToScroll: 2
      });
      $(".vertical-center").slick({
        dots: true,
        vertical: true,
        centerMode: true,
      });



      $(".verticaltest").slick({
        dots: true,
        vertical: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        verticalSwiping: false,
      });



      $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      });
      $(".center").slick({
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 5,
        slidesToScroll: 3
      });
      $(".variable").slick({
        dots: true,
        infinite: true,
        variableWidth: true
      });
      $(".lazy").slick({
        lazyLoad: 'anticipated', // ondemand progressive anticipated
        infinite: true,
        autoplay:true,
        autoplaySpeed: 6000
      });




      /*slick*/










        // liens miniatures / img
        $('.grille-images .miniatures *[class*="img"]').mouseover(function (e) {
            $('.fiche-img img, .fiche-img > .zoom > img').attr('src', $(e.target).attr('href'));
            try {
                $.site.zoom.update()
            } catch (e) {
            }
        });

        $('body.fiche-diaporama *[class^="miniatures"] *[class*="img--back"]').mouseover(function (e) {
            $.site.diaporamaFiche.goSlide($(e.target).index());
        });

        // rajoute un flex end quand il n'y a qu'un enfant dans la pagination
        $('.bts--flex.pagination').each(function () {
            var bloc = $(this);
            if (bloc.children('*').length == 1 && bloc.children('.pagination').length == 1) {
                bloc.addClass('flex-end');
            }
        });




        if ($(window).width() < 700) {
            $('.bloc-gauche--tri > * > ul > li').click(function () {
                $(this).toggleClass('op');
            });

            $(".bloc-gauche--tri > * > ul > li").each(function (index) {
                if ($(this).find('.bt').hasClass("alt")) {
                    $(this).addClass('op');
                }
            });
        }


        //retrocomp
        if (!Modernizr.flexbox) {
            $.site.paddingMenu = new $.jgo.paddingMenu();
        }



        hauteurSld();
        $.jgo.handledResize.push(hauteurSld);


        marges();
        $.jgo.handledResize.push(marges);



        //retrocomp pour tous les vh
        if (!Modernizr.cssvhunit || is_iOs()) {
            function diaporamaAccueilSize() {
                $('.diaporama--accueil').css('height', $(window).height() * 0.68)
            }

            diaporamaAccueilSize();
            $.jgo.handledResize.push(diaporamaAccueilSize);

            function diaporamaFicheSize() {
                $('.diaporama--fiche').css('height', $(window).height() * 0.68)
            }

            diaporamaFicheSize();
            $.jgo.handledResize.push(diaporamaFicheSize);

            // tri_resp();
            // $.jgo.handledResize.push(tri_resp);

            function diaporamaIntroSize() {
                $('.diaporama--intro').css('height', $(window).height());
            }

            diaporamaIntroSize();
            $.jgo.handledResize.push(diaporamaIntroSize);


        }


    }

    ,

    load: function () {
        var scrolled_for_ancre = $(window).scrollTop();
        var ancre_fiche = $(location).attr('hash');
        if (ancre_fiche && ancre_fiche.indexOf("#") == 0 && ancre_fiche.indexOf("F") == (ancre_fiche.length - 1)) {
            $('html, body').animate({
                scrollTop: (scrolled_for_ancre - 85)
            }, 800);
        }
    }
};


/*===== FONCTIONS EXTERNES BATMAN 5.B =====*/
(function ($) {
    $.fn.jalisInView = function (options) {

        var defaults = {
            class_on: 'view-on',
            class_off: 'view-off',
            on_and_off: true,
            html_attribute: 'data-jalisinview',
            resize: true
        }

        var elems = this;
        var selector = this.selector;
        var prm = $.extend(defaults, options);
        var st;
        win = $(window);
        available_height = get_available_height();
        this.prm = prm;

        init();

        function init() {
            elems = $(selector);
            refresh();
            win.on('scroll', function (e) {
                refresh();
            });
            if (prm.resize) {
                win.resize(function () {
                    resize();
                });
            }
        }

        function get_available_height() {
            return win.height();
        }


        function refresh() {
            if (elems.length != $(selector).length) {
                elems = $(selector);
            }
            st = $(window).scrollTop();
            available_height = get_available_height();
            elems.each(function () {
                var item = $(this);
                var top = item.offset().top;
                var bottom = top + item.outerHeight();
                var on_and_off = prm.on_and_off;
                if (item.attr('data-jalisinview') != undefined) {
                    on_and_off = (item.attr('data-jalisinview') == "both");
                }
                if (top <= available_height + st) {
                    item.removeClass(prm.class_off);
                    item.addClass(prm.class_on);
                    if (bottom < st && on_and_off) {
                        item.removeClass(prm.class_on);
                    }
                } else if (on_and_off) {
                    item.removeClass(prm.class_on);
                    item.addClass(prm.class_off);
                }
            });
        }


        function resize() {
            refresh();
        }

        this.reset = function () {
            win.off('scroll');
            win.off('resize');
            elems.removeClass(prm.class_off).removeClass(prm.class_on);
        }

        this.restart = function () {
            this.reset();
            init();
        }

        this.resize = resize;

        this.update = function () {
            refresh();
        }

        return this;
    }
})(jQuery);




function marges(){
    var winw = $(window).width();
    var centrw = $('.contenu').width()/2;
    var marg = winw/2 - centrw;


    $('.mardroit').css("margin-right" , marg );
    $('.margauch').css("margin-left" , marg );
}


/** SCROLLE OU QU'ON LUI DIT
 * Scroll vers un point determine quand on clic sur un autre
 * ex : <div class="go" data-go="#contact">contact</div>
 * rajouter data-go-origin="top|middle|bottom" pour lui dire ou placer le piont visé dans la page (middle par defaut)
 * rajouter goClic('.go'); dans le ready pour activer
 * @param {String} elem selecteur de ce qui doit etre clique
 * @param {String} facultatif element ou s'applique le scroll ['html, body']
 */
function goClic(elem) {

    // element ou est applique l'ecouteur de scroll
    var scrollzone = (arguments[1] != undefined) ? arguments[1] : 'html, body';

    $(elem).each(function () {
        var obj = $(this);
        var desc = $(obj.attr('data-go'));
        var origin = obj.attr('data-go-origin');
        var shift = obj.attr('data-go-shift');
        obj.off('click');

        obj.on("click", function (e) {
            desc = $(obj.attr('data-go'));
            e.preventDefault();
            var h;
            if (obj.attr('data-go') == "top") {
                h = 0;
            } else {

                var pos = desc.offset().top - $(scrollzone).offset().top;

                if (scrollzone != 'html, body') {
                    pos += $(scrollzone).scrollTop();
                }

                if (desc.outerHeight() > ($(window).height() * 0.8)) {
                    h = pos - ($(window).height() / 2);
                } else {
                    h = pos - (($(window).height() - desc.innerHeight()) / 2);
                }
                if (origin != undefined) {
                    if (origin == "top") {
                        h = pos;
                    } else if (origin == "bottom") {
                        h = pos - (desc.offset().top - desc.innerHeight());
                    }
                }

                if (shift != undefined) {
                    h -= parseFloat(shift);
                }
            }
            $(scrollzone).animate({
                scrollTop: h
            }, {
                queue: false,
                duration: 750
            });
        });

    });
}






function hauteurSld() {
$('.fond_sm').css({  
    width :  $(window).width() + $('.centrage').width()/2,
    left : - $(window).width()/2
    });
}





/** SET PRICES
 * Mouline les caracs crachées par Touch pour pouvoir les mettre en page comme on le souhaite
 */
function setPrices() {

    var conts = ['.ann', '.fiche'];

    for (var i in conts) {
        $(conts[i]).each(function (index) {

            var ann = $(this);

            ann.find('.detail').find('span').each(function (index2) {

                var spn = $(this);
                var cnt = spn.html();

                if (cnt == 'Prix : ') {
                    spn.remove();
                } else if (cnt == 'Nous consulter') {
                    spn.remove();
                }

            });

        });
    }

}


// determine si ios7
function is_iOs() {
    var ret = false;
    var uA = navigator.userAgent;
    if (uA.match('Version/7.0')) {
        ret = true;
    }
    return ret;
}


/*
JALIS INNER RESPONSIVE 0.1
by Pierre Bonnin - @PierreBonninPRO - 2015
*/
(function ($) {
    $.fn.jalisInnerResponsive = function (options) {

        var defaults = {
            step: '640', //width where class is applied
            cssClass: 'small',
            outerWidth: false,
            onChange: function () {
                void(0);
            }
        }

        var prm = $.extend(defaults, options);
        var elems = this;
        var selector = this.selector;

        function watch() {
            elems.each(function (e) {
                var elem = $(this);
                var width = (prm.outerWidth) ? elem.outerWidth(true) : elem.width();
                if (width <= prm.step) {
                    if (!elem.hasClass(prm.cssClass)) {
                        elem.addClass(prm.cssClass);
                        try {
                            prm.onChange()
                        } catch (e) {
                            consonle.log('jalis inner responsive onChange error');
                        }
                    }
                } else {
                    if (elem.hasClass(prm.cssClass)) {
                        elem.removeClass(prm.cssClass);
                        try {
                            prm.onChange()
                        } catch (e) {
                            consonle.log('jalis inner responsive onChange error');
                        }
                    }
                }
            });
        }

        $(window).resize(function () {
            watch();
        });

        watch();

        this.update = function () {
            elems = $(selector);
            watch();
        }

        return this;
    }
})(jQuery);








/*
JALISZOOM 0.2
by Pierre Bonnin - @PierreBonninPRO - 2015
*/
(function ($) {
    $.fn.jalisZoom = function (options) {

        var elems = this.each(function () {

            var defaults = {
                imgSelector: 'img',
                zoomCssClass: 'fiche-image-cover',
                autoupdate: true
            }

            var prm = $.extend(defaults, options);

            var container = $(this);
            var img = $(this).find(prm.imgSelector);
            var frontCover;

            init();

            function init() {
                frontCover = "<span class='" + prm.zoomCssClass + "' style='background-image:url(" + img.attr('src') + ");'></span>";
                container.append(frontCover);
                setMouseEnter();
            }


            function onMouseMove(e) {
                var offset = container.offset();
                var sizes = {
                    width: container.width(),
                    height: container.height()
                }
                var mousePos = {
                    top: e.pageY - offset.top,
                    left: e.pageX - offset.left
                }

                var ratios = {
                    top: (mousePos.top / sizes.height) * 100,
                    left: (mousePos.left / sizes.width) * 100
                }

                container.find('.' + prm.zoomCssClass).css('background-position', ratios.left + '% ' + ratios.top + '%');
            }

            function onMouseEnter(e) {
                unsetMouseEnter();
                if (prm.autoupdate) {
                    update();
                }
                setMouseLeave();
                setMouseMove();
            }

            function onMouseLeave(e) {
                unsetMouseLeave();
                unsetMouseMove();
                setMouseEnter();
            }


            function setMouseEnter() {
                container.on('mouseenter', onMouseEnter);
            }

            function unsetMouseEnter() {
                container.off('mouseenter', onMouseEnter);
            }


            function setMouseLeave() {
                container.on('mouseleave', onMouseLeave);
            }

            function unsetMouseLeave() {
                container.off('mouseleave', onMouseLeave);
            }


            function setMouseMove() {
                container.on('mousemove', onMouseMove);
            }

            function unsetMouseMove() {
                container.off('mousemove', onMouseMove);
            }


            function update() {
                var cover = container.find('.' + prm.zoomCssClass);
                var img = container.find(prm.imgSelector);
                if (!cover.css('background-image').match(img.attr('src'))) {
                    cover.css('background-image', "url(" + img.attr('src'));
                }
            }

            this.update = update;

            this.stop = function () {
                unsetMouseEnter();
                unsetMouseLeave();
                unsetMouseMove();
                $('.' + prm.zoomCssClass).remove();
            }

            this.reset = function () {
                this.stop();
                init();
            }

            return this;

        });

        this.update = function () {
            for (var i = 0; i < elems.length; i++) {
                $(elems[i])[0].update();
            }
        }

        return this;


    }
})(jQuery);


/*
JALISSTICKY 0.3
by Pierre Bonnin - @PierreBonninPRO - 2016
*/
(function ($) {
    $.fn.jalisSticky = function (options) {
        this.each(function () {
            var defaults = {
                cssClass: 'sticked',
                topModulator: function () {
                    return 0;
                },
                onStick: function () {
                    void(0);
                },
                onUnStick: function () {
                    void(0);
                },
                eventType: 'scroll',
                debug: false
            }

            var prm = $.extend(defaults, options);

            var obj = $(this);
            var win = $(window);
            var initialTop = obj.css('top');
            var initialTopValue = (initialTop == "auto" || initialTop == "inherit" || initialTop == undefined) ? 0 : parseInt(initialTop);
            var windowHeiht, scrolltop, offsetTop, objHeight, debord;

            init();

            function init() {
                scrolltop = $(win).scrollTop();
                offsetTop = obj.offset().top;
                updateValues();
                offsetTop -= debord.size;
                win.on(prm.eventType, update);
                if (prm.debug) console.log('jalis sticky init');
                update();
            }

            function updateValues() {
                winHeight = win.height();
                scrolltop = win.scrollTop();
                objHeight = obj.outerHeight(true);
                debord = getDebord();
            }

            function getDebord() {
                var ret = {
                    is: false,
                    size: 0
                };
                if (objHeight + offsetTop > winHeight) {
                    ret.is = true;
                    ret.size = winHeight - (objHeight + offsetTop);
                }
                return ret;
            }


            function update() {
                updateValues();
                var local_offsetTop = offsetTop - prm.topModulator();
                if (scrolltop > local_offsetTop && objHeight < obj.parent().innerHeight()) {

                    var top = (scrolltop - local_offsetTop) + initialTopValue;

                    if (top + objHeight > obj.parent().innerHeight()) {
                        top = obj.parent().innerHeight() - objHeight;
                    }

                    if ($(obj.find('.' + prm.cssClass)).length > 0) {
                        $(obj.find('.' + prm.cssClass)).each(function () {
                            $(this).attr('jalissticky-data', top);
                        });
                    }

                    if (obj.attr('jalissticky-data') != undefined) {
                        top = top - parseInt(obj.attr('jalissticky-data'));
                    }

                    obj.css('top', top).addClass(prm.cssClass);

                    if (prm.debug) {
                        console.log('Element :');
                        console.log(obj);
                        console.log('***');
                        console.log('offsetTop : ' + offsetTop);
                        console.log('scrolltop : ' + scrolltop);
                        console.log('localoffsetTop : ' + local_offsetTop);
                        console.log('initialTop : ' + initialTop);
                        console.log('initialTopValue : ' + initialTopValue);
                        console.log('top : ' + top);
                        console.log('----------------');
                    }
                } else {
                    obj.css('top', initialTop).removeClass(prm.cssClass);
                    if ($(obj.find('.' + prm.cssClass)).length > 0) {
                        $(obj.find('.' + prm.cssClass)).each(function () {
                            $(this).removeAttr('jalissticky-data');
                        });
                    }
                    if (prm.debug) {
                        console.log('Unsticked Element :');
                        console.log(obj);
                        console.log('----------------');
                    }
                }
            }


            this.kill = function () {
                win.off(prm.eventType, update);
            }

        });

    }
})(jQuery);

//debut recherche
function recherche(form) {
    //console.log("om on recherche");
    if (typeof form === 'undefined') {
        form = $('#search');
    }
    var recherche = $('#inputRecherche').val();
    var url = "recherche.html";
    $.ajax({
        url: url,
        type: 'POST',
        data: 'inputRecherche=' + recherche,
        success: function (html, statut) {
            window.location.href = url;
        },
        error: function (html, statut, erreur) {
            window.location.href = url;
        }
    });
}
$('#search').on('submit', function (e) {
    //console.log("allez l'om on recherche");
    e.preventDefault();
    recherche($(this));
});
//fin recherche

//debut selection
function getSelection(url)
{
    $.ajax({
        'url' : url+'?action=getListing',
        'type' : 'GET',
        success : function(html, res) {
            $('#ma-selection').html(html);
        }
    })
}
//fin selection

function setSelectionAction(ligne, url)
{
    var elem = ligne;
    var id = ligne.attr('data-id');
    var action = ligne.attr('data-selection');

    if (action == 'ajout') {
        console.log('ajout');
        $('#add-selection-' + id).attr('data-selection', "suppr");
        $('#add-selection-' + id).addClass('in_selection');
        //$('#add-selection-' + id)[0].setAttribute('data-selection', 0);
    } else if (action == 'suppr') {
        console.log('suppr');
        $('#add-selection-' + id).attr('data-selection', "ajout");
        $('#add-selection-' + id).removeClass('in_selection');
    }
    console.log($('#add-selection-' + id));
    var url = url;
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            id: id,
            action: action,
            url: url
        },
        success: function (data, statut) {

            div = document.getElementById('add-selection-' + id);
        },
        error: function (data, statut, erreur) {
        }
    });
}

// var tri_resp = function(){

//     if ($(window).width() < 700) {
//         $('.bloc-gauche--tri > * > ul > li').click(function () {
//             $(this).toggleClass('op');
//         });

//         $(".bloc-gauche--tri > * > ul > li").each(function (index) {
//             if ($(this).find('.bt').hasClass("alt")) {
//                 $(this).addClass('op');
//             }
//         });
//     }

// }