/**
 * Created by sylvain.conny on 04/12/2015.
 */

/*
OLD

var caracteristiques_action = $('#tri-caracteristiques').data('action');

$('#tri-caracteristiques-reset').click(function () {
    $('#tri-caracteristiques .active[data-valeur]').removeClass('active');
    post_caracteristiques();
});

//$('#tri-caracteristiques .active[data-valeur]').css('font-weight', 'bold').css('color', 'red');

$('#tri-caracteristiques [data-valeur]').click(function () {
    $('#tri-caracteristiques [data-caracteristique=' + $(this).data('caracteristique') + ']').removeClass('active');
    $(this).addClass('active');
    post_caracteristiques();
});

function post_caracteristiques() {
    var data = {};
    $('#tri-caracteristiques .active[data-valeur]').each(function () {
        data[$(this).data('caracteristique')] = $(this).data('valeur');
    });
    console.log(data);
    $.post(caracteristiques_action, {caracteristiques: data}, function (data) {
        //console.log(data);
        window.location.href = caracteristiques_action;
    });
}
*/

var caracteristiques_action = $('#tri-caracteristiques').data('action');

$('#tri-caracteristiques-reset').click(function () {
    $('#tri-caracteristiques .alt[data-valeur], #tri-caracteristiques .active[data-valeur]').removeClass('active');
    post_caracteristiques_reinit();
});

//$('#tri-caracteristiques .active[data-valeur]').css('font-weight', 'bold').css('color', 'red');

$('#tri-caracteristiques [data-valeur]').click(function () {

    if ($(this).hasClass('active') || $(this).hasClass('alt')) {
        $(this).removeClass('alt');
        $(this).removeClass('active');
    } else {
        $(this).addClass('active');
        $(this).addClass('alt');
    }
    //$('#tri-caracteristiques [data-caracteristique=' + $(this).data('caracteristique') + ']').removeClass('active');
    post_caracteristiques();
});

function post_caracteristiques_reinit() {
    var data = {};
    //$('#tri-caracteristiques .active[data-valeur]').each(function () {
    $('#tri-caracteristiques .alt[data-valeur], #tri-caracteristiques .active[data-valeur]').each(function () {
        data[$(this).data('caracteristique')] = "reinitallezlom";
    });
    console.log(data);
    $.post(caracteristiques_action, {caracteristiques: data}, function (data) {
        console.log(data);
        window.location.href = caracteristiques_action;
    });
}

function post_caracteristiques() {
    var data = {};
    //$('#tri-caracteristiques .active[data-valeur]').each(function () {
    //$('#tri-caracteristiques .alt[data-valeur], #tri-caracteristiques .active[data-valeur]').each(function () {
    $('#tri-caracteristiques .alt[data-valeur], #tri-caracteristiques .active[data-valeur]').each(function () {
        //data[$(this).data('caracteristique')] = $(this).data('valeur');
        if(typeof data[$(this).data('caracteristique')] == 'undefined') {
            data[$(this).data('caracteristique')] = $(this).data('valeur');
        } else {
            data[$(this).data('caracteristique')] = data[$(this).data('caracteristique')] + ',' + $(this).data('valeur');
        }
    });
    console.log(data);
    $.post(caracteristiques_action, {caracteristiques: data}, function (data) {
        //console.log(data);
        window.location.href = caracteristiques_action;
    });
}