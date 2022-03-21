$.site.boutique = {};
$.jgo.prm.cssSvgBackground.push('form#search > a', '#boutique_compte .item.compte', '#boutique_compte .item');

$(document).ready(function() {

	$.site.boutique.panier = new cartManager();

	$('#btCgv').click(function() {
		$('#cgv').toggle({
			duration: 250,
			complete: function() {
				var obj = $.site.boutique.panier.accs.prm.elems[$.site.boutique.panier.accs.prm.elems.length - 1];
				obj.resize();
			}
		});
	});
	
	function corrigeScrollTop(parent){
		var st = $(window).scrollTop() - parent.innerHeight();
        $(window).scrollTop(st);	
	}
    
    

	$('#boutiqueGoStep2').click(function(e) {
		e.preventDefault();
		$.site.boutique.panier.accs.prm.elems[0].ferme();
		$.site.boutique.panier.accs.prm.elems[1].ouvre();
	});

	$('#boutiqueGoStep3').click(function(e) {
		e.preventDefault();
		$.site.boutique.panier.accs.prm.elems[1].ferme();
		$.site.boutique.panier.accs.prm.elems[2].ouvre();
	});

	$('#boutiqueGoStep3Bis').click(function(e) {
		e.preventDefault();
		$.site.boutique.panier.accs.prm.elems[1].ferme();
		$.site.boutique.panier.accs.prm.elems[2].ouvre();
	});

	/*$('#boutiqueGoStep4').click(function(e) {
	 e.preventDefault();
	 $.site.boutique.panier.accs.prm.elems[2].ferme();
	 $.site.boutique.panier.accs.prm.elems[3].ouvre();
	 });*/

	$('#boutiqueGoStep5').click(function(e) {
		e.preventDefault();
		$.site.boutique.panier.accs.prm.elems[3].ferme();
		$.site.boutique.panier.accs.prm.elems[4].ouvre();
	});

	/*$('#toggleAdresseLivraison').change(function(e) {
	 e.preventDefault();
	 if($(this).prop('checked')) {
	 $('#adresseLivraison').show(400);
	 } else {
	 $('#adresseLivraison').hide(400);
	 }
	 });*/

	$('#boutiqueGoStep4').click(function(e) {
		e.preventDefault();
		var valide = true;
		var champ_manquant = false;
		var champ_erreurs = document.getElementById("erreur_panier");
		var inputs = document.getElementsByTagName('input');
		for (var i=0; i<inputs.length; i++){
			var input = inputs[i];
			var relAttribute = String(input.getAttribute('title'));
			if ((relAttribute.match('requis'))){
				if (input.value.length == 0){
					champ_manquant=true;
					valide = false;
					input.style.backgroundColor = '#FFCCCC';
					input.style.color ='#FF0000';
				}
				else
				{
					input.style.backgroundColor = '#CCFFCC';
					input.style.color ='#00CC00';
				}
			}
		}
		if (champ_manquant==true){
			champ_erreurs.innerHTML = "- Les champs en rouge sont obligatoires.<br>";
			champ_erreurs.className = 'alerte';
		}
		if (valide) {
			champ_erreurs.innerHTML = "";
			champ_erreurs.className = '';
			$('.bloc_panier').removeClass('notaccessible');
			$.ajax({
				type: "POST",
				url: "compte.php?type=ajaxUpdateInfo",
				data: "email=" + $('input[name=email]').val() + "&nom=" + $('input[name=nom]').val() + "&prenom=" + $('input[name=prenom]').val() + "&societe=" + $('input[name=societe]').val() + "&telephone=" + $('input[name=telephone]').val() + "&adresse=" + $('input[name=adresse]').val() + "&adresse_complement=" + $('input[name=adresse_complement]').val() + "&code_postal=" + $('input[name=code_postal]').val() + "&ville=" + $('input[name=ville]').val() + "&pays=" + $('select[name=pays]').val() + "&l_societe=" + $('input[name=l_societe]').val() + "&l_nom=" + $('input[name=l_nom]').val() + "&l_prenom=" + $('input[name=l_prenom]').val() + "&l_adresse=" + $('input[name=l_adresse]').val() + "&l_adresse_complement=" + $('input[name=l_adresse_complement]').val() + "&l_code_postal=" + $('input[name=l_code_postal]').val() + "&l_ville=" + $('input[name=l_ville]').val() + "&l_pays=" + $('select[name=l_pays]').val(),
				cache: false,
				success: function(html) {
					if ($.trim(html) !== "") {
						var obj = jQuery.parseJSON(html);
						$('#headerStep3 > div:first').html('Adresse : <strong> ' + obj.clientInfos.adresse + ' ' + obj.clientInfos.adresse_complement + ' ' + obj.clientInfos.code_postal + ' ' + obj.clientInfos.ville + '</strong>');
						$('#headerStep4 > div:first').html('Adresse de livraison : <strong> ' + obj.livraisonInfos.adresse + ' ' + obj.livraisonInfos.adresse_complement + ' ' + obj.livraisonInfos.code_postal + ' ' + obj.livraisonInfos.ville + '</strong>');
						$('#frais_de_port').html(obj.frais_de_port);

						$.site.boutique.panier.accs.prm.elems[2].ferme();
						$.site.boutique.panier.accs.prm.elems[3].ouvre();
					} else {
						alert('Identifiant ou mot de passe incorrect');
					}
				}
			});
		}
		$(this).parent().parent().parent().css('height', $(this).parent().parent().parent().css('height')+50);
	});

	$('#ajaxConnexionButton').click(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "compte.php?type=ajaxConnexion",
			data: "login=" + $('input[name=login]').val() + "&password=" + $('input[name=password]').val(),
			cache: false,
			success: function(html) {
				if ($.trim(html) !== "") {
					var obj = jQuery.parseJSON(html);
					$('#blocStep2 > div').html('<a href="deconnexion.html" title="Se déconnecter" class="bt full">Se déconnecter</a>');
					$('#headerStep2 > div:first').html('Adresse mail : <strong>' + obj.clientInfos.email + '</strong><br />' + obj.clientInfos.nom + ' ' + obj.clientInfos.prenom);
					$('#headerStep3 > div:first').html('Adresse : <strong> ' + obj.clientInfos.adresse + ' ' + obj.clientInfos.adresse_complement + ' ' + obj.clientInfos.code_postal + ' ' + obj.clientInfos.ville + '</strong>');
					$('#headerStep4 > div:first').html('Adresse de livraison : <strong> ' + obj.livraisonInfos.adresse + ' ' + obj.livraisonInfos.adresse_complement + ' ' + obj.livraisonInfos.code_postal + ' ' + obj.livraisonInfos.ville + '</strong>');

					if (obj.clientInfos.email != '') {
						$('input[name=email]').val(obj.clientInfos.email);
					}
					if (obj.clientInfos.societe != '') {
						$('input[name=societe]').val(obj.clientInfos.societe);
					}
					if (obj.clientInfos.nom != '') {
						$('input[name=nom]').val(obj.clientInfos.nom);
					}
					if (obj.clientInfos.prenom != '') {
						$('input[name=prenom]').val(obj.clientInfos.prenom);
					}
					if (obj.clientInfos.adresse != '') {
						$('input[name=adresse]').val(obj.clientInfos.adresse);
					}
					if (obj.clientInfos.adresse_complement != '') {
						$('input[name=adresse_complement]').val(obj.clientInfos.adresse_complement);
					}
					if (obj.clientInfos.code_postal != '') {
						$('input[name=code_postal]').val(obj.clientInfos.code_postal);
					}
					if (obj.clientInfos.ville != '') {
						$('input[name=ville]').val(obj.clientInfos.ville);
					}
					if (obj.clientInfos.telephone != '') {
						$('input[name=telephone]').val(obj.clientInfos.telephone);
					}
					if (obj.clientInfos.pays != '') {
						$('select[name=pays]').val(obj.clientInfos.pays);
					}
					if (obj.livraisonInfos.societe != '') {
						$('input[name=l_societe]').val(obj.livraisonInfos.societe);
					}
					if (obj.livraisonInfos.nom != '') {
						$('input[name=l_nom]').val(obj.livraisonInfos.nom);
					}
					if (obj.livraisonInfos.prenom != '') {
						$('input[name=l_prenom]').val(obj.livraisonInfos.prenom);
					}
					if (obj.livraisonInfos.adresse != '') {
						$('input[name=l_adresse]').val(obj.livraisonInfos.adresse);
					}
					if (obj.livraisonInfos.adresse_complement != '') {
						$('input[name=l_adresse_complement]').val(obj.livraisonInfos.adresse_complement);
					}
					if (obj.livraisonInfos.code_postal != '') {
						$('input[name=l_code_postal]').val(obj.livraisonInfos.code_postal);
					}
					if (obj.livraisonInfos.ville != '') {
						$('input[name=l_ville]').val(obj.livraisonInfos.ville);
					}
					if (obj.livraisonInfos.pays != '') {
						$('select[name=l_pays]').val(obj.livraisonInfos.pays);
					}
					$('.bloc_panier').removeClass('notaccessible');
					$.site.boutique.panier.accs.prm.elems[1].ferme();
					$.site.boutique.panier.accs.prm.elems[2].ouvre();
				} else {
					alert('Identifiant ou mot de passe incorrect');
				}
			}
		});
	});


});



function allResizeBoutique() {

}



$.jgo.handledResize.push(allResizeBoutique);



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

	this.init = function() {

		accs = new $.jgo.accordeon({
			duree: 200,
			objet: '.bloc_panier',
			objetCache: '.panier_remplissage',
			classeActive: prm.classeActive
		});


		$(prm.item).each(function(index) {
			elems.push(new cartElement($(this), index));
		});


		accs.prm.elems[0].ouvre();
	};



	function cartElement(obj, index) {

		var html = obj.html();
		var cnt = obj.find(prm.contenu).find('div');
		var acc = accs.prm.elems[index];
		var claAct = accs.prm.classeActive;

		obj.find(prm.tete).click(function() {
			obj.removeClass('unauthorized');
			if (obj.hasClass(prm.classeActive)) {
				acc.ferme();
			} else {
				if (isBlocOk(obj)) {
					acc.ouvre();
					location.reload();  //Fix car les accordéons se referment suite a une propagation d'evenement Jquery
				} else {
					obj.addClass('unauthorized');
				}
			}
		});

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
