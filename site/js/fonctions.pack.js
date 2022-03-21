function afficher(e) {
    var t = "erreurcode";
    e && (t += "_" + e), document.getElementById(t).style.display = "block"
}

function rafraichirCaptcha() {
    var e = Math.floor(10 * Math.random()), t = document.getElementById("imgsrc").src;
    document.getElementById("imgsrc").src = t + "?rand=" + e
}

function verifierFormulaire(e) {
    if (!document.getElementsByTagName) return !0;
    var t, r = "erreur";
    e ? (r += "_" + e, t = document.getElementById(e).getElementsByTagName("input")) : t = document.getElementsByTagName("input");
    var l = !1, o = !1, n = !1, a = !0, s = document.getElementById(r);
    s.innerHTML = "";
    for (var c = t, i = 0; i < c.length; i++) {
        var u = c[i], d = String(u.getAttribute("title"));
        if (u.getAttribute('type') == "radio" && d == 'requis') {
            console.log(u.getAttribute('type') + d);
        }

        if (String(u.getAttribute("id")), d.match("requis") && u.getAttribute('type') != "radio") {
            0 == u.value.length ? (l = !0, a = !1, u.style.backgroundColor = "#FFCCCC", u.style.color = "#FF0000") : (u.style.backgroundColor = "#CCFFCC", u.style.color = "#00CC00");
        } else if (d.match("consentement")) {

            if (!document.getElementById('consentement').checked) {
                consentement = document.getElementById('consentement_bloc');
                c = !0, a = !1, consentement.style.backgroundColor = "#FFCCCC";
            }
        } else if (d.match("tel")) {
            var m = /^(0[1-9])(?:[ _.-]?(\d{2})){4}$/;
            m.test(u.value) ? (u.style.backgroundColor = "#CCFFCC", u.style.color = "#00CC00") : (n = !0, a = !1, u.style.backgroundColor = "#FFCCCC", u.style.color = "#FF0000")
        } else if (u.getAttribute('type') == "radio" && d == 'requis') {
            var name = c[i].getAttribute('name');
            radio = document.getElementsByName(name);
            var isChecked = false;
            radio.forEach(function (e) {
                if (e.checked) {
                    isChecked = true;
                }
            });
            if (!isChecked) {
                l = !1;
                a = !1;
                document.getElementById('bloc-radio-' + name).style.backgroundColor = "#FFCCCC";
            }
        } else {
            if (!d.match("email")) continue;
            var C = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            u.value.match(C) ? (u.style.backgroundColor = "#CCFFCC", u.style.color = "#00CC00") : (o = !0, a = !1, u.style.backgroundColor = "#FFCCCC", u.style.color = "#FF0000")
        }
    }
    for (var y = document.getElementsByTagName("textarea"), i = 0; i < y.length; i++) {
        var g = y[i], d = String(g.getAttribute("title"));
        if (String(g.getAttribute("id")), d.match("requis")) 0 == g.value.length && (l = !0, a = !1, g.style.backgroundColor = "#FFCCCC", g.style.color = "#FF0000"); else if (d.match("tel")) m.test(g.value) ? (g.style.backgroundColor = "#CCFFCC", g.style.color = "#00CC00") : (n = !0, a = !1, g.style.backgroundColor = "#FFCCCC", g.style.color = "#FF0000"); else {
            if (!d.match("email")) continue;
            var p = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            g.value.match(p) ? (g.style.backgroundColor = "#CCFFCC", g.style.color = "#00CC00") : (o = !0, a = !1, g.style.backgroundColor = "#FFCCCC", g.style.color = "#FF0000")
        }
    }
    return 1 == l && (s.innerHTML = "- Les champs munis d'une astérisque sont obligatoires.<br>", s.className = "alerte"), 1 == c && (document.getElementById(r), s.innerHTML = s.innerHTML + "- Vous devez accepter les conditions d'utilisations.<br>", s.className = "alerte"), 1 == o && (document.getElementById(r), s.innerHTML = s.innerHTML + "- L'adresse email est erronée.<br>", s.className = "alerte"), 1 == n && (document.getElementById(r), s.innerHTML = s.innerHTML + "- Le téléphone est erroné (Format : 01 23 45 67 89).<br>", s.className = "alerte"), a
}

function MM_jumpMenu(targ, selObj, restore) {
    eval(targ + ".location='" + selObj.options[selObj.selectedIndex].value + "'"), restore && (selObj.selectedIndex = 0)
}

function MM_swapImage() {
    var e, t, r = 0, l = MM_swapImage.arguments;
    for (document.MM_sr = new Array, e = 0; e < l.length - 2; e += 3) null != (t = MM_findObj(l[e])) && (document.MM_sr[r++] = t, t.oSrc || (t.oSrc = t.src), t.src = l[e + 2])
}

function MM_findObj(e, t) {
    var r, l, o;
    for (t || (t = document), (r = e.indexOf("?")) > 0 && parent.frames.length && (t = parent.frames[e.substring(r + 1)].document, e = e.substring(0, r)), !(o = t[e]) && t.all && (o = t.all[e]), l = 0; !o && l < t.forms.length; l++) o = t.forms[l][e];
    for (l = 0; !o && t.layers && l < t.layers.length; l++) o = MM_findObj(e, t.layers[l].document);
    return !o && t.getElementById && (o = t.getElementById(e)), o
}

function MM_swapImgRestore() {
    var e, t, r = document.MM_sr;
    for (e = 0; r && e < r.length && (t = r[e]) && t.oSrc; e++) t.src = t.oSrc
}

function MM_preloadImages() {
    var e = document;
    if (e.images) {
        e.MM_p || (e.MM_p = new Array);
        var t, r = e.MM_p.length, l = MM_preloadImages.arguments;
        for (t = 0; t < l.length; t++) 0 != l[t].indexOf("#") && (e.MM_p[r] = new Image, e.MM_p[r++].src = l[t])
    }
}

function fermerPopup(e) {
    var t = document.getElementById(e), r = t.parentNode;
    r.removeChild(t);
    var t = document.getElementById("divOmbre"), r = t.parentNode;
    r.removeChild(t)
}

function popup(e, t, r, l) {
    var o = t / 2, n = r / 2;
    document.location.replace("#top");
    var a = document.createElement("div");
    a.setAttribute("id", e), a.style.position = "absolute", a.style.display = "block", a.style.top = document.body.clientHeight / 2 - n + "px", a.style.left = document.body.clientWidth / 2 - o + "px", a.style.width = t + "px", a.style.height = r + "px", a.style.zIndex = 1000001, a.style.backgroundColor = "#FFFFFF", a.style.border = "solid 1px " + couleurBordure;
    var s = document.createElement("div");
    s.setAttribute("id", "divOmbre"), s.style.position = "absolute", s.style.display = "block", s.style.top = 0, s.style.left = 0, s.style.width = document.body.clientWidth + "px", s.style.height = document.body.scrollHeight + "px", s.style.zIndex = 1e6, s.style.backgroundColor = couleurOmbre, s.style.opacity = degreOpacite / 10, s.style.filter = "alpha(opacity = " + 10 * degreOpacite + ")";
    var c = document.getElementsByTagName("body");
    return c[0].appendChild(a), c[0].appendChild(s), "" != l && clientSideInclude(e, l), a
}

function xhr() {
    var e = null;
    if (window.XMLHttpRequest) e = new XMLHttpRequest; else {
        if (!window.ActiveXObject) return void alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
        e = new ActiveXObject("Microsoft.XMLHTTP")
    }
    return e
}

function clientSideInclude(e, t) {
    if (window.XMLHttpRequest) try {
        req = new XMLHttpRequest
    } catch (r) {
        req = !1
    } else if (window.ActiveXObject) try {
        req = new ActiveXObject("Msxml2.XMLHTTP")
    } catch (r) {
        try {
            req = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (r) {
            req = !1
        }
    }
    return element = document.getElementById(e), element ? void (req ? (req.open("GET", t + "?" + new Date * Math.random(), !1), req.send(null), element.innerHTML = req.responseText) : element.innerHTML = "Sorry, your browser does not support XMLHTTPRequest objects. This page requires Internet Explorer 5 or better for Windows, or Firefox for any system, or Safari. Other compatible browsers may also exist.") : void alert("Bad id " + e + "passed to clientSideInclude.You need a div or span element with this id in your page.")
}

function verifierFormulaireCall() {
    if (!document.getElementsByTagName) return !0;
    var e = !1, t = !1, r = !1, l = !0, o = document.getElementById("erreurcall");
    o.innerHTML = "";
    for (var n = document.getElementsByTagName("input"), a = 0; a < n.length; a++) {
        var s = n[a], c = String(s.getAttribute("title"));
        if (String(s.getAttribute("id")), c.match("requis")) 0 == s.value.length ? (e = !0, l = !1, s.style.backgroundColor = "#FFCCCC", s.style.color = "#FF0000") : (s.style.backgroundColor = "#CCFFCC", s.style.color = "#00CC00"); else if (c.match("tel")) {
            var i = /^(0[1-68])(?:[ _.-]?(\d{2})){4}$/;
            i.test(s.value) ? (s.style.backgroundColor = "#CCFFCC", s.style.color = "#00CC00") : (r = !0, l = !1, s.style.backgroundColor = "#FFCCCC", s.style.color = "#FF0000")
        } else {
            if (!c.match("email")) continue;
            var u = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            s.value.match(u) ? (s.style.backgroundColor = "#CCFFCC", s.style.color = "#00CC00") : (t = !0, l = !1, s.style.backgroundColor = "#FFCCCC", s.style.color = "#FF0000")
        }
    }
    for (var d = document.getElementsByTagName("textarea"), a = 0; a < d.length; a++) {
        var m = d[a], c = String(m.getAttribute("rel"));
        if (String(m.getAttribute("id")), c.match("requis")) 0 == m.value.length && (e = !0, l = !1, m.style.backgroundColor = "#FFCCCC", m.style.color = "#FF0000"); else if (c.match("tel")) i.test(m.value) ? (m.style.backgroundColor = "#CCFFCC", m.style.color = "#00CC00") : (r = !0, l = !1, m.style.backgroundColor = "#FFCCCC", m.style.color = "#FF0000"); else {
            if (!c.match("email")) continue;
            var C = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            m.value.match(C) ? (m.style.backgroundColor = "#CCFFCC", m.style.color = "#00CC00") : (t = !0, l = !1, m.style.backgroundColor = "#FFCCCC", m.style.color = "#FF0000")
        }
    }
    return 1 == e && (o.innerHTML = "- Les champs munis d'une astérisque sont obligatoires.<br>", o.className = "alerte"), 1 == t && (document.getElementById("erreur"), o.innerHTML = o.innerHTML + "- L'adresse email est erronée.<br>", o.className = "alerte"), 1 == r && (document.getElementById("erreur"), o.innerHTML = o.innerHTML + "- Le téléphone est erroné (Format : 01 23 45 67 89).<br>", o.className = "alerte"), l
}

function affichercall() {
    document.getElementById("erreurcodecall").style.display = "block"
}

function callback(e, t, r) {
    $.ajax({
        type: "GET",
        url: "http://ccv.viatelecom.com/services/?item=webcallback&gid=" + t + "&sid=" + r + "&num=" + e,
        cache: !1,
        dataType: "json",
        complete: function () {
            $("#result").html("Votre demande de rappel a bien ete prise en compte nous allons vous rappelez rapidement"), parent.$.fancybox.close()
        }
    })
}

function callbackstat(e) {
    $.ajax({
        type: "GET",
        url: "http://ccvws.viatelecom.com/index.php?ws=AgentCallStat&wskey=ebd494f406ef18986ebffddfa09d51a0&aid=" + e + "&output=xml",
        cache: !1,
        dataType: "xml",
        complete: function (e) {
            $("#result").html(e)
        }
    })
}

var couleurOmbre = "#FFFFFF", couleurBordure = "#000000", degreOpacite = 7;