function fontNameValue(e) {
  var t = "UNTITLED FONT";
  "" == e.value ? e.value = t : e.value == t && (e.value = "")
}

function resizeHeights() {
  setTimeout(function() {
    $(".letter-dropzone,.add-new-glyph").css("height", $(".letter-dropzone").outerWidth(!0));
    var e = .8 * $(".letter-dropzone").width();
    Array.prototype.slice.call(document.getElementsByClassName("preview-svg")).forEach(function(t) {
      t.setAttribute("width", e + "px")
    }), $("#available-icons").css("height", window.innerHeight - $("#right-shelf>section:first-child").outerHeight(!0) - $("#right-shelf>section:nth-child(2)>header").outerHeight(!0) - 10)
  }, 0)
}

function showLoader() {
  $(".loading-container").removeClass("hide")
}

function hideLoader() {
  $(".loading-container").addClass("hide")
}

function stringAsUnicodeEscape(e) {
  function t(e) {
    var t = e.length;
    return 0 == t ? "0000" : 1 == t ? "000" + e : 2 == t ? "00" + e : 3 == t ? "0" + e : e
  }
  for (var a = "", n = 0, o = e.length; o > n; n++) a += t(e.charCodeAt(n).toString(16));
  return a
}

function showPremiumIntro() {
  window.localStorage.hasSeenPremium || ($("#glyphter-prem-modal").modal("show"), window.localStorage.hasSeenPremium = !0)
}

function isClickOnDropdownMenu(e) {
  var t = $(e.target).parentsUntil(".dropdown-menu");
  return t = t.length ? t.parent() : $(e.target).parent(), t.filter(".dropdown-menu").length ? !1 : !0
}

function createCustomFontCharacterSquare(e) {
  var t = getFontSq(e);
  return createNewDropzone($(".letter-dropzone").length, t), $(t).droppable(droppableParams), t
}

function addUserFontToGrid(e, t) {
  $(".font-name").val(t);
  var a = ($(e).find("glyph[class]").attr("class") || "").split("-");
  a.length > 1 && (GLOBALS.fontOptions.cssClassPrefix = a[0] + "-", $(".class-prefix").val(GLOBALS.fontOptions.cssClassPrefix));
  var n = !1;
  $(e).find("glyph").each(function(e, t) {
    if (!n) {
      if (!t.getAttribute("d")) return;
      var a = t.getAttribute("unicode"),
        o = alphabet.indexOf(a);
      if (-1 == o) {
        if (!GLOBALS.isPremium) return $("#premium-prompt").modal("show"), void(n = !0);
        $(".letter-dropzone").last().after(createCustomFontCharacterSquare(a)), alphabet.push(a), o = alphabet.indexOf(a)
      }
      var i = $(".letter-dropzone").eq(o),
        r = createPreview(o);
      $(i).append(r);
      var s = addNewFile({
        previewElement: r
      }, o);
      s ? (r.appendChild(createSvgWithPath(Raphael.transformPath(t.getAttribute("d"), "s1,-1"))), createAndUpdatePath(r, {
        i: o,
        previewElement: r,
        name: (t.getAttribute("class") || "").replace(GLOBALS.fontOptions.cssClassPrefix, "")
      })) : n = !0
    }
  }), resizeHeights(), displayFontSaved()
}

function updateTransformPartSVG(e, t, a) {
  if (t.has(e)) {
    var n = t.indexOf(e + "("),
      o = t.substr(0, n),
      i = t.substr(n + e.length);
    i = a + i.substr(i.indexOf(")") + 1), res = o + i
  } else res = t + a;
  return res
}

function updateTransformPart(e, t, a) {
  var n, o = t.split(")");
  if (o.pop(), o[o.length - 1].has(e)) "scale" == e ? (o.pop(), o.pop(), o.push(a), n = o.join(")")) : (o.pop(), o.push(a), n = o.join(")"));
  else if (t.has(e) && "rotate" == e) {
    var i = t.indexOf(e + "("),
      r = t.substr(0, i),
      s = t.substr(i + 7);
    s = a + s.substr(s.indexOf(")") + 1), n = r + s
  } else if (t.has(e) && "scale" == e) {
    var l = t.split("scale"),
      c = !0;
    l.forEach(function(e, t) {
      if (e.has("translate") && l[t + 1] && "(" == l[t + 1].charAt(0) && c) {
        var n = e.split("translate");
        n.pop(), l[t] = n.join("translate") + a, l[t + 1] = l[t + 1].substring(l[t + 1].indexOf(")") + 1), c = !1
      }
    }), n = l.join("")
  } else n = t + a;
  return n
}

function flipIt(e) {
  var t = document.querySelector("#orig-glyph svg .selected") || document.querySelector("#orig-glyph svg"),
    a = t.getAttribute("data-scaleX") || !1,
    n = t.getAttribute("data-scaleY") || !1;
  e.target.className.has("horiz") ? (a = a ? -parseFloat(a) : -1, t.setAttribute("data-scaleX", a)) : (n = n ? -parseFloat(n) : -1, t.setAttribute("data-scaleY", n)), scale()
}

function scaleIt(e) {
  var t = document.querySelector("#orig-glyph svg .selected") || document.querySelector("#orig-glyph svg"),
    a = roundToDecimal(parseFloat(t.getAttribute("data-scaleX")) || 1, 3),
    n = roundToDecimal(parseFloat(t.getAttribute("data-scaleX")) || 1, 3);
  a += e.target.className.has("grow") ? .1 : -.1, n += e.target.className.has("grow") ? .1 : -.1, t.setAttribute("data-scaleX", a), t.setAttribute("data-scaleY", n), scale()
}

function translateIt(e, t, a) {
  if (0 != document.querySelector("#left-shelf.open").length) {
    var n, o, i = document.querySelector("#orig-glyph svg .selected") || document.querySelector("#orig-glyph svg"),
      r = parseInt(i.getAttribute("data-left")) || 0,
      s = parseInt(i.getAttribute("data-top")) || 0,
      l = "SVG" == i.tagName.toUpperCase(),
      c = l ? i.style.transform || i.style.webkitTransform : i.getAttribute("transform"),
      d = c ? c.split("translate(") : [],
      p = c ? d.pop().replace(")", "").split(",") : [!1],
      u = i.getAttribute("data-scaleX") || 1,
      h = i.getAttribute("data-scaleY") || 1,
      f = document.querySelector("#orig-glyph svg").getAttribute("data-scaleX") || 1,
      g = document.querySelector("#orig-glyph svg").getAttribute("data-scaleY") || 1,
      m = i.getAttribute("data-rotate"),
      v = u && parseInt(u) * parseInt(f) < 0 ? !0 : !1,
      w = h && parseInt(h) * parseInt(g) < 0 ? !0 : !1;
    if (isNaN(parseFloat(p[0])) || p[1].has("(") ? (n = 0, o = 0) : (o = parseFloat(p[0]) * (l ? GLOBALS.fontOptions.emSquare / $("#orig-glyph svg").outerWidth() : 1), n = parseFloat(p[1]) * (l ? GLOBALS.fontOptions.emSquare / $("#orig-glyph svg").outerHeight() : 1)), e) {
      switch (e) {
        case "move-left":
        case 37:
          r += 0 > f ? 1 : -1;
          break;
        case "move-right":
        case 39:
          r += 0 > f ? -1 : 1;
          break;
        case "move-down":
        case 40:
          s += 0 > g ? -1 : 1;
          break;
        case "move-up":
        case 38:
          s += 0 > g ? 1 : -1;
          break;
        default:
          throw new Error("Undefined translate direction")
      }
      var y = isNaN(e) ? ["move-up", "move-left", "move-down", "move-right"] : [38, 37, 40, 39],
        b = y.indexOf(e),
        A = y.splice(0, b);
      if (A.forEach(function(e) {
        y.push(e)
      }), m) {
        if (0 > m && m / -90 % 2 == 1)
          for (var S = 0; 2 > S; S++) y.unshift(y.pop());
        e = y[Math.abs(m) / 90]
      }
      switch (e) {
        case "move-left":
        case 37:
          o += v ? 1 : -1;
          break;
        case "move-right":
        case 39:
          o += v ? -1 : 1;
          break;
        case "move-down":
        case 40:
          n += w ? -1 : 1;
          break;
        case "move-up":
        case 38:
          n += w ? 1 : -1;
          break;
        default:
          throw new Error("Undefined translate direction")
      }
      i.setAttribute("data-left", r), i.setAttribute("data-top", s)
    } else o = t ? t + r : r, n = a ? a + s : s;
    if (l) {
      var L = "translate(" + o / GLOBALS.fontOptions.emSquare * $("#orig-glyph svg").outerWidth() + "px," + n / GLOBALS.fontOptions.emSquare * $("#orig-glyph svg").outerHeight() + "px)",
        P = i.style.transform || i.style.webkitTransform;
      "" != P && (L = updateTransformPartSVG("translate", P, L)), i.style.transform ? i.style.transform = L : i.style.webkitTransform = L
    } else {
      var L = "translate(" + o + "," + n + ")",
        P = i.getAttribute("transform");
      P && (L = updateTransformPart("translate", P, L)), i.setAttribute("transform", L)
    }
    var x = alphabet.indexOf($(".glyph-letter").text());
    createAndUpdatePath($("#orig-glyph"), {
      i: x,
      previewElement: $(".letter-dropzone").eq(x).find(".dz-image-preview")
    })
  }
}

function scale() {
  var e = document.querySelector("#orig-glyph svg .selected") || document.querySelector("#orig-glyph svg"),
    t = "SVG" == e.tagName.toUpperCase(),
    a = e.getAttribute("data-scaleX") || 1,
    n = e.getAttribute("data-scaleY") || 1,
    o = "scale(" + a + "," + n + ")";
  if (t) {
    var i = e.style.transform || e.style.webkitTransform;
    "" != i && (o = updateTransformPartSVG("scale", i, o)), e.style.transform ? e.style.transform = o : e.style.webkitTransform = o
  } else {
    var i = e.getAttribute("transform"),
      r = Raphael.pathBBox(getPath(e, !0));
    o = "translate(" + getTranslateFactorAfterScale(r.cx, a) + "," + getTranslateFactorAfterScale(r.cy, n) + ")" + o, i && (o = updateTransformPart("scale", i, o)), e.setAttribute("transform", o)
  }
  var s = alphabet.indexOf($(".glyph-letter").text());
  createAndUpdatePath($("#orig-glyph"), {
    i: s,
    previewElement: $(".letter-dropzone").eq(s).find(".dz-image-preview")
  })
}

function getTranslateFactorAfterScale(e, t) {
  return roundToDecimal(-e * (t - 1), 3)
}

function rotateIt(e) {
  var t = document.querySelector("#orig-glyph svg .selected") || document.querySelector("#orig-glyph svg"),
    a = parseInt(t.getAttribute("data-rotate")) || 0,
    n = "SVG" == t.tagName.toUpperCase();
  if (e.target.className.has("left") ? (newVal = -270 == a ? 0 : (n ? -a : a) - 90, svgVal = 270 == a ? 0 : a + 90) : (newVal = 270 == a ? 0 : (n ? -a : a) + 90, svgVal = -270 == a ? 0 : a - 90), n) {
    t.setAttribute("data-rotate", svgVal);
    var o = "rotate(" + newVal + "deg)",
      i = t.style.transform || t.style.webkitTransform;
    "" != i && (o = updateTransformPartSVG("rotate", i, o)), t.style.transform ? t.style.transform = o : t.style.webkitTransform = o
  } else {
    t.setAttribute("data-rotate", newVal);
    var o = "rotate(" + newVal + " " + Raphael.rotationCenterPoint(getPath(t)) + ")",
      i = t.getAttribute("transform");
    if (i) {
      o = updateTransformPart("rotate", i, o);
      var r = t.getAttribute("data-top") || 0,
        s = t.getAttribute("data-left") || 0,
        o = o.split("translate");
      o.forEach(function(e, t) {
        e.lastIndexOf(")") != e.indexOf(")") || /[a-zA-Z]/.test(e) || t == o.length - 1 || "" == e || o.splice(t, 1)
      }), o = o.join("translate"), o = updateTransformPart("translate", o, "translate(" + s + "," + r + ")")
    }
    t.setAttribute("transform", o)
  }
  var l = alphabet.indexOf($(".glyph-letter").text());
  createAndUpdatePath($("#orig-glyph"), {
    i: l,
    previewElement: $(".letter-dropzone").eq(l).find(".dz-image-preview")
  })
}

function createNewDropzone(e, t) {
  var a = new Dropzone(t, {
    url: "upload-svg",
    paramName: e,
    previewTemplate: "<div class='dz-image-preview'><img data-dz-thumbnail /><span class='icon-class'></span><span class='edit glyphter'>O</span></div>",
    maxFiles: 1440,
    addRemoveLinks: !0,
    dictRemoveFile: "+",
    acceptedFiles: "image/svg+xml"
  });
  a.on("addedfile", function(t) {
    var n = new FileReader;
    n.readAsText(t), n.onloadend = function() {
      -1 == n.result.indexOf("<glyph") ? addNewFile.call(a, t, e) : $(t.previewElement).remove()
    }
  }).on("complete", function(e) {
    $(".gopher-second").addClass("gopher-vis"), hideFirstGopher();
    e.i;
    "" != e.xhr.response && $.get(e.xhr.response, function(t) {
      var a = createAndUpdatePath(t, e);
      a.numPaths > 1 && !localStorage.getItem("aside-opened") && ($(e.previewElement).find(".edit").click(), localStorage.setItem("aside-opened", "true"))
    })
  }).on("removedfile", handleRemovedFile).on("dragenter", function(e) {
    $(e.target).addClass("white-ltr")
  }).on("drop", function(e) {
    $(e.target).removeClass("white-ltr")
  }).on("dragleave", function(e) {
    $(e.target).removeClass("white-ltr")
  })
}

function getFontSq(e) {
  var t = document.createElement("div"),
    a = document.createElement("span");
  return t.className = "letter-dropzone", t.setAttribute("data-letter", e), a.className = "pull-left", a.innerText = e, t.appendChild(a), t
}

function initiateFont(e) {
  switch (e) {
    case "en":
      alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", alphabet = (alphabet + alphabet.toLowerCase()).split("").concat("0123456789!\"#$%&'()*+,-./[\\]^_`{|}~?".split(""));
      for (var t = document.createDocumentFragment(), a = 0, n = alphabet.length; n > a; a++) t.appendChild(getFontSq(alphabet[a]));
      $(".add-new-glyph").before(t)
  }
}

function addNewFile(e, t) {
  var a = !0;
  if (displayFontUnsaved(), $(e.previewElement).on("click", function(t) {
    t.stopPropagation(), $("video").addClass("edit-clicked"), displayFontUnsaved();
    var a = $(e.previewElement).find("svg");
    if (openEditTool(), $(".editing").removeClass("editing"), $(e.previewElement).parent().addClass("editing"), 1 != a.length) {
      var n = a.last()[0];
      editGlyph(n, e)
    }
  }), $(e.previewElement).parent().removeClass("white-ltr"), e.previewElement.previousSibling.className.has("dz-image-preview")) {
    var n = this;
    $(".letter-dropzone").each(function(t, o) {
      return 1 == $(o).children().length ? ($(o).append(e.previewElement), e.i = t, !1) : void(t == $(".letter-dropzone").length - 1 && (n.removeFile ? n.removeFile(e) : $(e.previewElement).remove(), a = !1, alert("Too many files added.")))
    })
  } else e.i = t;
  return a
}

function handleRemovedFile(e) {
  alphabet[e.i] == $(".glyph-letter").text() && (closeEditTool(), $("#orig-glyph").empty(), $(".editing").removeClass("editing")), displayFontUnsaved(), delete fontGlyphs[e.i]
}

function hideFirstGopher() {
  hideGopher("first")
}

function hideSecondGopher() {
  hideGopher("second")
}

function hideGopher(e) {
  $(".gopher-" + e).hide()
}

function Shapes() {}

function getPath(e, t) {
  return $(e).is("line") ? userModifications(e, new Line(e).convertLineToPath(), t) : $(e).is("path") ? userModifications(e, $(e).attr("d"), t) : $(e).is("polygon") || $(e).is("polyline") ? userModifications(e, convertPolyToPath(e), t) : $(e).is("rect") ? userModifications(e, convertRectToPath(e), t) : $(e).is("circle") || $(e).is("ellipse") ? userModifications(e, convertCircleToPath(e), t) : void 0
}

function createPath(e) {
  var t = "",
    a = 0;
  if ($(e).find("svg").find("*").each(function(e, n) {
    var o = getPath(n);
    $.trim(o).length > 0 && (t += " " + o, a++)
  }), t = $.trim(t), "" != t) {
    t = Raphael.pathToRelative(t);
    var n = Raphael.pathBBox(t),
      o = n.x2 - n.x,
      i = n.y2 - n.y,
      r = GLOBALS.fontOptions.emSquare / o,
      s = GLOBALS.fontOptions.emSquare / i,
      l = r > s ? s : r;
    t = Raphael.transformPath(t, "s" + l + ",-" + l);
    var c = Raphael.pathBBox(t),
      d = -c.x + (GLOBALS.fontOptions.emSquare - parseInt(c.width)) / 2,
      p = -c.y + (GLOBALS.fontOptions.emSquare - parseInt(c.height)) / 2;
    t = Raphael.transformPath(t, "T" + d + "," + p), t = userModifications($(e).find("svg")[0], t), t.forEach(function(e, a) {
      e.forEach(function(e, n) {
        return isNaN(e) ? !0 : void(t[a][n] = parseFloat(e.toFixed(3)))
      })
    })
  }
  return {
    numPaths: a,
    path: t.toString()
  }
}

function updatePath(e, t, a) {
  if (fontGlyphs[a.i] ? fontGlyphs[a.i].path = e : fontGlyphs[a.i] = {
    path: e
  }, fontGlyphs[a.i].unicode = stringAsUnicodeEscape(a.previewElement.previousSibling.innerText), a.name) {
    var n = a.name.replace(".svg", "");
    fontGlyphs[a.i].name = n, $(a.previewElement).find(".icon-class").text(n)
  }
  var o = $(t).find("svg")[0];
  $(a.previewElement).find("img,svg").not(".edit").remove(), $(a.previewElement).prepend("<svg class='preview-svg' viewBox='0 0 " + GLOBALS.fontOptions.emSquare + " " + GLOBALS.fontOptions.emSquare + "'><path d='" + Raphael.transformPath(e, "s1,-1") + "'></svg>"), $(t).is("#orig-glyph") || $(a.previewElement).append(o)
}

function createAndUpdatePath(e, t) {
  if ($(e).find("glyph").length > 0) return addUserFontToGrid(e), {};
  var a = createPath(e);
  return updatePath(a.path, e, t), a
}

function editGlyph(e, t) {
  $("#icon-class").val(fontGlyphs[$(".editing").index()].name || ""), $("[data-letter='" + $(".glyph-letter").text() + "']").find(".dz-image-preview").append($("#orig-glyph").children("svg")), $(".glyph-letter").text(t.previewElement.parentNode.getAttribute("data-letter")), $("#orig-glyph").append(e), $("#orig-glyph").find("svg").find("*").not("g").off("mouseenter").on("mouseenter", function() {
    if (!this.getAttribute("class")) {
      var e = this.getAttribute("stroke");
      e && this.setAttribute("data-prev-stroke", e), this.setAttribute("stroke-width", this.getAttribute("stroke-width") || parseInt($("#orig-glyph").children()[0].getAttribute("width")) / 100)
    }
  }).off("mouseleave").on("mouseleave", function() {
    this.getAttribute("class") || (this.getAttribute("data-prev-stroke") ? this.setAttribute("stroke", this.getAttribute("data-prev-stroke")) : (this.removeAttribute("stroke"), this.removeAttribute("stroke-width")))
  }).off("click").on("click", function(e) {
    e.stopPropagation();
    var a = this.getAttribute("class") || "";
    clearSelectedSvg(), "" == a ? (this.setAttribute("class", "selected"), $("#positive").addClass("selected")) : "selected" == a ? (this.setAttribute("class", a + " neg-space"), $("#positive").removeClass("selected"), $("#negative").addClass("selected")) : a.has("neg-space") ? (this.setAttribute("class", a.replace("neg-space", "delete-el")), $("#negative").removeClass("selected")) : a.has("delete-el") && this.setAttribute("class", ""), createAndUpdatePath($("#orig-glyph"), t)
  })
}

function clearSelectedSvg() {
  Array.prototype.slice.call(document.querySelectorAll("#glyph-color-editor .selected")).forEach(function(e) {
    e.setAttribute("class", e.getAttribute("class").replace("selected", ""))
  })
}

function openIconsTool() {
  closeEditTool(), $("#container").css("max-width", $("body").width() - 400), resizeHeights(), $("#right-shelf").addClass("open"), $("#open-icons").hide()
}

function closeIconsTool() {
  $("#container").removeAttr("style"), resizeHeights(), $("#right-shelf").removeClass("open"), $("#open-icons").css({
    display: "inline"
  })
}

function openEditTool() {
  closeIconsTool(), $("#container").css("max-width", $("body").width() - 400), resizeHeights(), $("#left-shelf").addClass("open")
}

function closeEditTool() {
  $("#container").removeAttr("style"), resizeHeights(), $("#left-shelf").removeClass("open"), $(".editing").removeClass("editing")
}

function Line(e) {
  this.line = e, this.strokeWidth = e.getAttribute("stroke-width"), this.x1 = parseFloat(e.getAttribute("x1")), this.x2 = parseFloat(e.getAttribute("x2")), this.y1 = parseFloat(e.getAttribute("y1")), this.y2 = parseFloat(e.getAttribute("y2"))
}

function convertPolyToPath(e) {
  var t = e.getAttribute("points").split(/\s+|,/),
    a = t.shift(),
    n = t.shift(),
    o = "M" + a + "," + n + "L" + t.join(" ");
  return "polygon" == e.tagName && (o += "z"), o
}

function convertCircleToPath(e) {
  var t = e.getAttribute("cx"),
    a = e.getAttribute("cy"),
    n = e.getAttribute("rx"),
    o = e.getAttribute("ry"),
    i = e.getAttribute("r");
  i > 0 && (n = i, o = i);
  var r = "M" + (t - n) + "," + a;
  return r += "a" + n + "," + o + " 0 1,0 " + 2 * n + ",0", r += "a" + n + "," + o + " 0 1,0 " + -2 * n + ",0"
}

function convertRectToPath(e) {
  var t = e.ownerSVGElement.namespaceURI,
    a = document.createElementNS(t, "path"),
    n = e.getAttribute("height"),
    o = e.getAttribute("width"),
    i = parseFloat(e.getAttribute("x")),
    r = parseFloat(e.getAttribute("y")),
    s = e.getAttribute("rx"),
    l = e.getAttribute("ry"),
    c = i,
    d = r + (null != l ? l : 0),
    p = n - 2 * (null != l ? l : 0),
    u = o - 2 * (null != s ? s : 0),
    a = "M" + c + "," + d + "v" + p + (null != s ? "a" + s + "," + l + " 0 0 0 " + s + "," + l : "") + "h" + u + (null != s ? "a" + s + "," + l + " 0 0 0 " + (s - l) : "") + "v" + -p + (null != s ? "a" + s + "," + l + " 0 0 0 " + -s + "," + -l : "") + "h" + -u + (null != s ? "a" + s + "," + l + " 0 0 0 " + -s + "," + l : "");
  return a
}

function roundToDecimal(e, t) {
  var a = Math.pow(10, t);
  return Math.round(e * a) / a
}

function userModifications(e, t, a) {
  var n = e.getAttribute("class") || "",
    o = parseFloat(e.getAttribute("data-left")) || 0,
    i = parseFloat(e.getAttribute("data-top")) || 0,
    r = parseInt(e.getAttribute("data-rotate")) || 0,
    s = e.getAttribute("data-flip") || "",
    l = e.getAttribute("data-scaleX") || 1,
    c = e.getAttribute("data-scaleY") || 1,
    d = "";
  if (n.has("neg-space") ? t = $(e).is("line") ? new Line(e).negSpaceLine() : Raphael.transformPath(t, "s-1,1") : n.has("delete-el") && (t = ""), a) {
    var p = e.getAttribute("transform");
    p && (p = p.split(")"), p.forEach(function(e, t) {
      p[t] = e.substr(0, 1) + e.substr(e.indexOf("(")).split(" ").join(",")
    }), d = p.join(")"))
  } else(o || i) && (d += "T" + o + "," + i), r && (d += "r" + r), (s || 1 != l || 1 != c) && (d += "s" + (s.has("x") ? "-" : "") + l + "," + (s.has("y") ? "-" : "") + c);
  return t = Raphael.transformPath(t, d)
}

function saveFont() {
  GLOBALS.email ? createFont(!1) : (GLOBALS.registerThruSave = !0, requestSignUp())
}

function displayFontSaved() {
  GLOBALS.email && $("#save-font").addClass("saved")
}

function displayFontUnsaved() {
  $("#save-font").removeClass("saved")
}

function downloadFont() {
  createFont(!0)
}

function createFont(e) {
  if (0 == fontGlyphs.length) return alert("Please add at least one image to create a font."), !1;
  var t = $(".font-name").val(),
    a = {
      glyphs: JSON.stringify(fontGlyphs),
      options: GLOBALS.fontOptions
    };
  GLOBALS.fontOptions.fontName = t, GLOBALS.currentFontName && (a.lastFontName = spacesToDashes(GLOBALS.currentFontName)), displayFontSaved(), $.post("createFont", a, function(a) {
    var n = !0;
    $("#project-list li").each(function(e, a) {
      $(a).text() == GLOBALS.currentFontName && ($(a).children("span").eq(0).text(t), n = !1)
    }), n && addProject(t), GLOBALS.currentFontName = t, e && (window.location.href = a)
  }).error(function(e) {
    displayFontUnsaved();
    var t = "Font creation failed. Please try again.";
    try {
      t = JSON.parse(e.responseText)
    } catch (a) {}
    alert(t.error || t)
  })
}

function requestSignUp() {
  $("#sign-up-form").modal("show")
}

function login(e) {
  $(".error").remove(), $.post("login", e || {
    username: $("#username").val(),
    password: $("#password").val()
  }, function(t) {
    t.error ? $("#password").after("<div class='error'>" + t.error + "</div>") : (GLOBALS.email = e ? e.username : $("#username").val(), addProjects(t.projects), convertToPremium(t.isPremium))
  })
}

function logout() {
  window.location.href = "logout"
}

function addProjects(e) {
  e.forEach(addProject);
  var t = $("#loginOrMyStuff>section");
  t.eq(0).addClass("hide").find(".dropdown-menu").hide(), t.eq(1).removeClass("hide"), $("#save-font").html($("#save-font").html().replace("Sign Up", "Save"))
}

function addProject(e) {
  $("#project-list").append("<li><span>" + dashesToSpaces(e) + "</span><span class='remove'></span></li>")
}

function dashesToSpaces(e) {
  return e.split("-").join(" ")
}

function spacesToDashes(e) {
  return e.split(" ").join("-")
}

function closeSignupModal() {
  $("#sign-up-form").modal("hide")
}

function createSvgWithPath(e) {
  var t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  t.setAttribute("viewBox", "0 0 " + GLOBALS.fontOptions.emSquare + " " + GLOBALS.fontOptions.emSquare), t.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
  var a = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return a.setAttributeNS(null, "d", e), t.appendChild(a), t
}

function addViewBox() {
  if (!this.getAttribute("viewBox")) {
    var e = this.getAttribute("width"),
      t = this.getAttribute("height");
    e && t && this.setAttribute("viewBox", "0 0 " + e + " " + t)
  }
}

function loadIcons(e) {
  $(".progress").addClass("active");
  var t = document.getElementById("available-icons"),
    a = document.createDocumentFragment();
  $("#available-icons").empty(), $.getJSON("font-icons/" + (e || ""), function(e) {
    var n = 0;
    if (e.files.length > 0) {
      $("#available-font-names").val(e.fontName);
      var o = e.files.length;
      e.files.forEach(function(i) {
        $.get("font-icons/" + e.fontName + "/" + i, function(e) {
          n++;
          var r = document.createElement("div");
          r.className = "col-xs-2", r.setAttribute("data-filter-name", i.replace(".svg", "")), addViewBox.call($(e).find("svg")[0]), r.appendChild($(e).find("svg")[0]), 90 > n ? t.appendChild(r) : a.appendChild(r), makeDraggable(r), o == n && setTimeout(function() {
            $(".progress").removeClass("active"), t.appendChild(a)
          }, 100)
        })
      }), addActiveClassToSelectedFontSetDropdown()
    }
  })
}

function selectIconFont() {
  removeLicenseDetails(), loadIcons(spacesToDashes($(this).text())), $(this).parent().children().removeClass("active"), $(this).addClass("active")
}

function getLicenseDetails(e) {
  removeLicenseDetails();
  var t = $("<div class='license-info'>License: " + $(e.target).attr("data-license") + "</div>");
  t.on("mouseenter", function() {
    licenseInfoHover && clearTimeout(licenseInfoHover)
  }).on("mouseleave", removeLicenseDetails), $(e.target.parentNode).append(t)
}

function removeLicenseDetails() {
  $(".license-info").remove()
}

function addActiveClassToSelectedFontSetDropdown() {
  var e = $("#available-font-names").val();
  $("#font-list>ul").children().each(function(t, a) {
    return e == $(a).text() ? (a.className = "active", !1) : void 0
  })
}

function initializeFontIconList() {
  $.getJSON("font-icons/list", function(e) {
    for (var t in e)
      if (e.hasOwnProperty(t)) {
        var a = $("<li><span class='glyphter info-sign' data-license='" + e[t]["license-type"] + "'></span>" + dashesToSpaces(e[t].name) + "</li>").on("click", function(e) {
          "SPAN" == e.target.tagName && (e.target = e.target.parentNode), selectIconFont.call(e.target)
        });
        $(a).find("span").on("mouseenter", getLicenseDetails).on("mouseleave", function() {
          licenseInfoHover = setTimeout(removeLicenseDetails, 100)
        }), $("#font-list>ul").append(a)
      } addActiveClassToSelectedFontSetDropdown()
  });
  var e = $("#right-shelf>section:nth-child(2)>header");
  e.find(".glyphicon-chevron-left").on("click", function() {
    var e = $("#font-list").find(".active").index() - 1; - 1 == e && (e = $("#font-list>ul").children().length - 1), selectIconFont.call($("#font-list>ul").children().eq(e))
  }), e.find(".glyphicon-chevron-right").on("click", function() {
    var e = $("#font-list").find(".active").index() + 1;
    e == $("#font-list>ul").children().length && (e = 0), selectIconFont.call($("#font-list>ul").children().eq(e))
  })
}

function makeDraggable(e) {
  $(e).draggable({
    revert: "invalid",
    helper: "clone",
    zIndex: 100
  })
}

function makeDroppables() {
  $(".letter-dropzone").droppable(droppableParams)
}

function createPreview(e) {
  var t = document.createElement("div");
  return t.className = "dz-image-preview", t.innerHTML = "<span class='icon-class'></span><span class='edit glyphter'>O</span><a class='dz-remove' href='javascript:undefined;'>+</a>", $(t).find("a").on("click", function(a) {
    a.stopPropagation(), handleRemovedFile({
      i: e
    }), t.parentNode.removeChild(t)
  }), t
}

function removeAllFiles() {
  $(".dz-image-preview").remove(), $(".editing").removeClass("editing"), fontGlyphs.length = 0
}

function convertToPremium(e) {
  GLOBALS.isPremium = e, e ? ($(".is-premium").removeClass("hide"), $(".isnt-premium").addClass("hide")) : ($(".is-premium").addClass("hide"), $(".isnt-premium").removeClass("hide"))
}

function getUserProjects() {
  $.getJSON("user/project-list", function(e) {
    e && (GLOBALS.email = e.email, GLOBALS.isPremium = e.isPremium, convertToPremium(e.isPremium), e.projects && (hideFirstGopher(), hideSecondGopher(), addProjects(e.projects)))
  }).error(function() {
    window.localStorage.getItem("gopherSeen") ? (hideFirstGopher(), hideSecondGopher()) : ($(".gopher-first").addClass("gopher-vis"), window.localStorage.setItem("gopherSeen", "true"))
  })
}
var GLOBALS = {
    isPremium: !1,
    fontOptions: {
      fontName: "",
      emSquare: 1024,
      verticalAscent: 0,
      horizontalAdvance: 0,
      cssClassPrefix: "icon-"
    }
  },
  alphabet, droppableParams = {
    drop: function(e, t) {
      displayFontUnsaved(), $(".gopher-second").addClass("gopher-vis"), hideFirstGopher();
      var a = !1;
      if (0 != $(this).find(".dz-image-preview").length ? $(".letter-dropzone").each(function(e, t) {
        return 1 == $(t).children().length ? (a = e, !1) : void(e == $(".letter-dropzone").length - 1 && isNaN(a) && alert("Too many files added."))
      }) : a = $(this).index(), a !== !1) {
        var n = createPreview(a);
        $(this).append(n), addNewFile({
          previewElement: n
        }, a), createAndUpdatePath(t.helper, {
          i: a,
          previewElement: n
        })
      }
    }
  };
initiateFont("en"), String.prototype.has = function(e) {
  return -1 != this.indexOf(e)
}, Raphael.prototype.raphael.rotationCenterPoint = function(e) {
  var t = this.pathBBox(e);
  return t.x + t.width / 2 + " " + (t.y + t.height / 2)
}, showPremiumIntro(), loadIcons(), initializeFontIconList(), getUserProjects(), $(".hide-prem-intro").on("click", function() {
  $("#glyphter-prem-modal").modal("hide")
}), $(".isnt-premium").on("click", function(e) {
  e.stopPropagation(), $(".modal").modal("hide"), GLOBALS.email ? ($("#premium-form").modal("show"), ga("send", "event", "Premium", "Click", e.delegateTarget.id)) : (requestSignUp(), ga("send", "event", "Premium", "Click", "Signin"))
}), $("#new-glyph-unicode").on("keydown", function(e) {
  var t = alphabet.indexOf(this.value) > -1;
  if (13 == e.which && (e.preventDefault(), t && (this.value = "", setTimeout(function() {
    alert("You may only have one of each character per font.")
  }, 0))), 1 == this.value.length && 13 == e.which && !t && GLOBALS.isPremium) {
    var a = createCustomFontCharacterSquare(this.value);
    $(this).parentsUntil(".add-new-glyph").last().parent().before(a), resizeHeights(), this.value = ""
  }
}), $("#login").on("click", function(e) {
  $(e.target).is("[href='#faq']") || (e.stopPropagation(), isClickOnDropdownMenu(e) && $("#login .dropdown-menu").toggle())
}), $(".trigger-join").on("click", function(e) {
  e.stopPropagation(), requestSignUp()
}), $("#logout").on("click", logout), $("#my-fonts").on("click", function(e) {
  $(e.target).is("[href='#faq']") || (e.stopPropagation(), isClickOnDropdownMenu(e) && $("#my-fonts .dropdown-menu").toggle())
}), $("#open-font-list").on("click", function(e) {
  e.stopPropagation(), $("#font-list").toggle()
}), $("#search-icons").on("keyup", function(e) {
  $("#available-icons").children().each(function(t, a) {
    -1 != a.getAttribute("data-filter-name").indexOf(e.target.value) ? a.removeAttribute("style") : (document.getElementById("available-icons").appendChild(a), a.style.display = "none")
  })
}), $(window).on("resize", resizeHeights), makeDroppables(), $(".tooltip-text .close").on("click", function() {
  $(this).parent().parent().hide()
}), $(".close-toolbox").on("click", function() {
  closeEditTool()
}), $("#new-project").on("click", function(e) {
  e.stopPropagation(), GLOBALS.isPremium ? (GLOBALS.currentFontName = null, removeAllFiles(), $(".font-name").val("UNTITLED FONT"), $("#my-fonts .dropdown-menu").toggle(), $("#project-list .active").removeClass("active")) : alert("We've moved to a premium model for additional projects. You can still access all your old projects but to create a new one you'll have to go premium. Just click the \"Go Premium\" button to activate!")
}), $(".font-name").on("keyup", function(e) {
  13 != e.which ? displayFontUnsaved() : saveFont()
}), $("#project-list").on("click", "li", function() {
  showLoader(), removeAllFiles();
  var e = $(this).text();
  GLOBALS.currentFontName = e, $("#project-list li").removeClass("active"), $(this).addClass("active"), $.get("user-fonts/" + GLOBALS.email + "/" + spacesToDashes(e) + ".svg", function(t) {
    addUserFontToGrid(t, e)
  }).always(hideLoader).error(function() {
    alert("An error occurred while trying to load this font")
  })
}), $("#project-list").on("click", "li .remove", function(e) {
  var t = $(this).parent().text();
  e.stopPropagation(), $.ajax({
    type: "DELETE",
    url: "user-fonts",
    data: {
      fontName: spacesToDashes(t)
    }
  }), t == $(".font-name").val() && ($(".font-name").val("UNTITLED FONT"), removeAllFiles()), $(this).parent().remove(), $("#my-fonts .dropdown-menu").toggle()
}), $("#show-settings").on("click", function() {
  $("#settings-modal").modal("show")
}), $("body").on("click", function() {
  clearSelectedSvg(), $(".dropdown-menu").hide()
}), [".font-name", ".class-prefix"].forEach(function(e) {
  function t(t) {
    t.which > 36 && t.which < 41 || 8 == t.which || $(e).not(t.target).val(t.target.value)
  }
  $(e).on("keyup", t)
}), $(".class-prefix").on("keyup", function(e) {
  "-" !== e.target.value.slice(-1) && $(".class-prefix").val(e.target.value + "-")
}), $(".class-prefix").on("keydown", function(e) {
  (32 == e.which || 189 == e.which) && e.preventDefault()
}),
  function() {
    function e(e) {
      -1 != [37, 38, 39, 40].indexOf(e.which) && 0 == $("input").filter(":focus").length && (e.preventDefault(), translateIt(e.which))
    }

    function t(e) {
      e.stopPropagation(), n && clearInterval(n), n = setInterval(function() {
        translateIt(e.target.classList[0])
      }, 100)
    }

    function a() {
      clearInterval(n)
    }
    var n;
    $("body").on("keydown", e), $(".btn[class|=move]").on("mousedown", t).on("mouseup", a).on("click", function(e) {
      e.stopPropagation()
    })
  }(), $("#username,#password").on("keydown", function(e) {
  13 == e.which && (e.preventDefault(), GLOBALS.whichSubmitButton = "submit-login", $("#font-set").submit())
}), $("#right-shelf>.pull-tab").on("click", function() {
  $("#right-shelf").hasClass("open") ? closeIconsTool() : openIconsTool()
}), $("#left-shelf>.pull-tab").on("click", function() {
  $("#left-shelf").hasClass("open") ? closeEditTool() : openEditTool()
}), $(".clear-changes").on("click", function() {
  function e(e) {
    e.forEach(function(e) {
      this.removeAttribute(e)
    }.bind(this))
  }
  Array.prototype.slice.call(document.querySelectorAll("#orig-glyph *")).forEach(function(t) {
    e.call(t, ["class", "transform", "data-scaleY", "data-scaleX", "data-flip", "data-left", "data-top", "data-rotate"])
  });
  var t = alphabet.indexOf($(".glyph-letter").text());
  createAndUpdatePath($("#orig-glyph"), {
    i: t,
    previewElement: $(".letter-dropzone").eq(t).find(".dz-image-preview")
  }), $("#positive,#negative").removeClass("selected")
}), $("#delete-shape").on("click", function(e) {
  e.stopPropagation();
  var t = document.querySelector("#orig-glyph .selected");
  if (t) {
    var a = t.getAttribute("class") || "";
    a.has("delete-el") ? t.setAttribute("class", a.replace(" delete-el", "")) : t.setAttribute("class", a + " delete-el"), $("#negative,#positive").removeClass("selected");
    var n = alphabet.indexOf($(".glyph-letter").text());
    createAndUpdatePath($("#orig-glyph"), {
      i: n,
      previewElement: $(".letter-dropzone").eq(n).find(".dz-image-preview")
    })
  } else alert("Please select a path to delete.")
}), $("#positive").on("click", function(e) {
  e.stopPropagation();
  var t = document.querySelector("#orig-glyph .selected");
  if (t) {
    var a = t.getAttribute("class") || "";
    $(this).addClass("selected"), $("#negative").removeClass("selected"), a.has("neg-space") && (a = a.replace(" neg-space", ""), t.setAttribute("class", a)), a.has("delete-el") && (a = a.replace(" delete-el", ""), t.setAttribute("class", a));
    var n = alphabet.indexOf($(".glyph-letter").text());
    createAndUpdatePath($("#orig-glyph"), {
      i: n,
      previewElement: $(".letter-dropzone").eq(n).find(".dz-image-preview")
    })
  } else alert("Please select a path to make into positive space.")
}), $("#negative").on("click", function(e) {
  e.stopPropagation();
  var t = document.querySelector("#orig-glyph .selected");
  if (t) {
    var a = t.getAttribute("class") || "";
    $(this).addClass("selected"), $("#positive").removeClass("selected"), a.has("neg-space") || t.setAttribute("class", a + " neg-space"), a.has("delete-el") && t.setAttribute("class", a.replace(" delete-el", ""));
    var n = alphabet.indexOf($(".glyph-letter").text());
    createAndUpdatePath($("#orig-glyph"), {
      i: n,
      previewElement: $(".letter-dropzone").eq(n).find(".dz-image-preview")
    })
  } else alert("Please select a path to make into negative space.")
}), $(".flip-horiz,.flip-vert").on("click", function(e) {
  e.stopPropagation(), flipIt(e)
}), $(".grow,.shrink").on("click", function(e) {
  e.stopPropagation(), scaleIt(e)
}), $(".rotate-left,.rotate-right").on("click", function(e) {
  e.stopPropagation(), rotateIt(e)
}), resizeHeights();
var fontGlyphs = [];
openIconsTool(), $(".letter-dropzone").each(createNewDropzone), Shapes.prototype.getDist = function() {
  var e = this.x1 - this.x2,
    t = this.y1 - this.y2;
  return Math.sqrt(Math.pow(t, 2) + Math.pow(e, 2))
}, Line.prototype = Object.create(Shapes.prototype), Line.prototype.convertLineToPath = function() {
  var e = (this.getDist(), this.x1 - this.x2),
    t = this.y1 - this.y2,
    a = Math.atan(t / e),
    n = "M" + this.x1 + "," + this.y1 + "L" + (this.x1 + Math.sin(a) * this.strokeWidth) + "," + (this.y1 - this.strokeWidth) + "L" + (this.x2 + Math.sin(a) * this.strokeWidth) + "," + (this.y2 - this.strokeWidth) + "L" + this.x2 + "," + this.y2 + "L" + this.x1 + "," + this.y1;
  return n = Raphael.transformPath(n, "T0," - this.strokeWidth / 2)
}, Line.prototype.negSpaceLine = function() {
  var e = this.x1,
    t = this.y1;
  return this.x1 = this.x2, this.x2 = e, this.y1 = this.y2, this.y2 = t, this.convertLineToPath()
}, $("#download-no-reg").on("click", function() {
  createFont(!0), closeSignupModal()
}), $("#sign-up").on("click", function() {
  showLoader(), GLOBALS.email = $("#sign-up-username").val();
  var e = {
    username: GLOBALS.email,
    password: $("#sign-up-password").val(),
    subscribe: $("#email-opt-in")[0].checked
  };
  return "" == e.username || "" == e.password ? void alert("Please fill out all fields") : void $.post("signup", e, function() {
    login(e), hideSecondGopher(), closeSignupModal(), 0 != fontGlyphs.length && (GLOBALS.registerThruSave ? createFont() : (GLOBALS.registerThruSave = !1, downloadFont()))
  }).error(function() {
    delete GLOBALS.email
  }).always(hideLoader)
}), $("#premium-form").on("submit", function() {
  $.post("/subscribe-premium", $("#premium-form").serialize(), function(e) {
    e.error ? $("#premium-form").find(".error").text(e.error) : (GLOBALS.isPremium = 1, convertToPremium(1), $("#premium-form").modal("hide"), setTimeout(function() {
      $("#premium-success").modal("show")
    }, 0))
  })
}), $("#unsubscribe-premium").on("click", function() {
  if (!GLOBALS.isPremium) return void alert("You're not a premium member so there's nothing to cancel. You can join by clicking on any of the locked features.");
  var e = confirm("Are you sure you want to cancel your subscription?");
  e && $.ajax({
    method: "DELETE",
    url: "/subscribe-premium",
    success: function() {
      alert("Your plan has been canceled but your premium access will remain until the end of the billing cycle.")
    },
    error: function() {
      alert("Something went wrong when we tried to cancel your plan. Please contact us at sayhello@glyphter.com.")
    }
  })
}), $("#settings-modal input:not([type='submit'])").on("keyup", function(e) {
  e.stopPropagation(), GLOBALS.fontOptions[e.target.dataset.optionName] = "number" == e.target.type ? parseInt(e.target.value) : e.target.value
}), $("#font-set [type=submit]").on("click", function() {
  GLOBALS.whichSubmitButton = this.id || this.parentNode.id
}), $("#font-set").on("submit", function() {
  switch (GLOBALS.whichSubmitButton) {
    case "submit-login":
      login();
      break;
    case "form-submit":
      GLOBALS.email ? downloadFont() : requestSignUp();
      break;
    case "save-font":
      $(".saved").length || saveFont()
  }
  GLOBALS.whichSubmitButton = null
}), window.onresize = function() {
  $(".open").length && resizeHeights()
}, $("#icon-class").on("keyup", function(e) {
  var t = $(".editing").index();
  fontGlyphs[t].name = spacesToDashes(this.value), $(".editing").find(".icon-class").text(this.value), e.which > 36 && e.which < 41 || 8 == e.which || (this.value = fontGlyphs[t].name)
}), window.localStorage.getItem("hasSeenShare") || ($(".share-bar").addClass("visible"), $(".close-share-bar").on("click", function() {
  $(".share-bar").removeClass("visible"), window.localStorage.setItem("hasSeenShare", "true")
})), $(".faq").on("show.bs.collapse hide.bs.collapse", function(e) {
  $(e.target).prev().first().toggleClass("active")
}), $('[data-toggle="popover"]').popover();
