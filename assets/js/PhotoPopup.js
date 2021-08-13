var zoomInOutCount = 0;
var zoomValue = 10;
var getImgCurrentW = 0;
var getImgCurrentH = 0;
var getImgResizeW = 0;
var getImgResizeH = 0;
var getMrginL = 0;
var getMrginT = 0;
var getImgCurrentContW = 580;
var getImgCurrentContH = 383;
var zoomImgIncPosLeft = 0;
var zoomImgIncPosTop = 0;
var zoomImgDragg = false;
var myGraybox = parent.parent.GB_CURRENT;
var prevWidth = 0;
var prevHeight = 0;
var prevSlideH = 0;
var prevSlideW = 0;
var maxdataHeight = 0;
var maxdataWidth = 0;
var isfullScreen = "N";
var isZoomIn = "N";
var countCat = 0;
var getThumbConW = 0;
var sliderW = 0;
var slideWidth = 0;
var checkTowerValue = 0;
var getCatScroll = 0;
var propOrProject = "Property";
var selectedclass = "selected";

function slidePhotos() {
	maxdataHeight = $(window).height() - 117;
	maxdataWidth = $(window).width();
	if ($("#photoTowerId").size() == 1) {
		maxdataHeight = $(window).height() - 167
	}
	$("#propertyImageSlider").height(maxdataHeight);
	countPhotosVideos();
	getImageTitle();
	lazyLoad();
	var i = 1;
	$(".projectComPhoto").each(function () {
		$(this).attr("lang", i);
		i++
	});
	var a = 1;
	$(".videoProject").each(function () {
		$(this).attr("lang", a);
		a++
	});
	var g = 1;
	$(".photoProperty").each(function () {
		$(this).attr("lang", g);
		g++
	});
	var d = 1;
	$(".videoProperty").each(function () {
		$(this).attr("lang", d);
		d++
	});
	var h = 1;
	$(".photoLocality").each(function () {
		$(this).attr("lang", h);
		h++
	});
	var f = 1;
	$(".videoLocality").each(function () {
		$(this).attr("lang", f);
		f++
	});
	resetCat();
	imagePerspectiveView();
	if ($("#localityInfo").size() == 1) {
		$("#zoomPanelDesable").hide();
		$("#zoomPanel").hide()
	}
	localityTopTab();
	var e = $("#propertyImageSlider ul li").size();
	if (e <= 1) {
		$("#btnSliderNext").hide()
	}
	$("#propertyImageSlider ul li").attr("data-value", 0);
	$("#propertyImageSliderThumb ul li").attr("data-value", 0);
	resetThumb();
	var c = 800;
	var b = "swing";
	$(".btnThumbNext").on("click", function () {
		var k = parseInt($("#propertyImageSliderThumb ul").css("marginLeft"));
		var j = $("#propertyImageSliderThumb").outerWidth();
		$(this).addClass("btnThumbNextTemp");
		$(".btnThumbNextTemp").removeClass("btnThumbNext");
		$(".btnThumbPrev").addClass("btnThumbPrevTemp");
		$(".btnThumbPrevTemp").removeClass("btnThumbPrev");
		if (slideWidth <= -(k)) {
			$("#propertyImageSliderThumb ul").stop().animate({
				marginLeft: 0
			}, {
				duration: c,
				easing: b,
				complete: function () {
					$(".btnThumbNextTemp").addClass("btnThumbNext");
					$(".btnThumbNext").removeClass("btnThumbNextTemp");
					$(".btnThumbPrevTemp").addClass("btnThumbPrev");
					$(".btnThumbPrev").removeClass("btnThumbPrevTemp");
					$(".btnThumbPrev").addClass("btnThumbDisable")
				}
			})
		} else {
			$("#propertyImageSliderThumb ul").stop().animate({
				marginLeft: (-j) + (k)
			}, {
				duration: c,
				easing: b,
				complete: function () {
					$(".btnThumbNextTemp").addClass("btnThumbNext");
					$(".btnThumbNext").removeClass("btnThumbNextTemp");
					$(".btnThumbPrevTemp").addClass("btnThumbPrev");
					$(".btnThumbPrev").removeClass("btnThumbPrevTemp");
					$(".btnThumbPrev").removeClass("btnThumbDisable")
				}
			})
		}
		lazyLoad()
	});
	$(".btnThumbPrev").on("click", function () {
		var k = parseInt($("#propertyImageSliderThumb ul").css("marginLeft"));
		var j = $("#propertyImageSliderThumb").outerWidth();
		$(this).addClass("btnThumbPrevTemp");
		$(".btnThumbPrevTemp").removeClass("btnThumbPrev");
		if (k == 0) {
			$(".btnThumbPrevTemp").addClass("btnThumbPrev");
			$(".btnThumbPrev").removeClass("btnThumbPrevTemp");
			$(".btnThumbPrev").addClass("btnThumbDisable");
			return false
		} else {
			k = parseInt($("#propertyImageSliderThumb ul").css("marginLeft"));
			if (k > -j) {
				$("#propertyImageSliderThumb ul").stop().animate({
					marginLeft: 0
				}, {
					duration: c,
					easing: b,
					complete: function () {
						$(".btnThumbPrevTemp").addClass("btnThumbPrev");
						$(".btnThumbPrev").removeClass("btnThumbPrevTemp");
						$(".btnThumbNextTemp").addClass("btnThumbNext");
						$(".btnThumbNext").removeClass("btnThumbNextTemp");
						k = parseInt($("#propertyImageSliderThumb ul").css("marginLeft"));
						if (k == 0) {
							$(".btnThumbPrev").addClass("btnThumbDisable")
						} else {
							$(".btnThumbPrev").removeClass("btnThumbDisable")
						}
					}
				});
				return false
			} else {
				$("#propertyImageSliderThumb ul").stop().animate({
					marginLeft: (j) + (k)
				}, {
					duration: c,
					easing: b,
					complete: function () {
						$(".btnThumbPrevTemp").addClass("btnThumbPrev");
						$(".btnThumbPrev").removeClass("btnThumbPrevTemp");
						$(".btnThumbNextTemp").addClass("btnThumbNext");
						$(".btnThumbNext").removeClass("btnThumbNextTemp");
						k = parseInt($("#propertyImageSliderThumb ul").css("marginLeft"));
						if (k == 0) {
							$(".btnThumbPrev").addClass("btnThumbDisable")
						} else {
							$(".btnThumbPrev").removeClass("btnThumbDisable")
						}
					}
				})
			}
		}
		lazyLoad(this)
	});
	$("#btnSliderNext").on("click", function () {
		var n = $("#propertyImageSlider ul").find(".active").next("li").size();
		var j = $("#propertyImageSlider ul").find(".active").next("script").size();
		var m = $("#propertyImageSlider ul").find(".active").next("script").next("script").size();
		var l = $("#photoTowerId").size();
		if (m == 1) {
			j = 0
		}
		if (n == 1 || j == 1 || m == 1) {
			if (l == 1) {
				if (checkTowerValue == 0) {
					$("#propertyImageSlider ul li").animate({
						opacity: "hide"
					}, 400);
					$("#propertyImageSlider ul").find(".active").next("li").addClass("active");
					$("#propertyImageSlider ul").find(".active").prev("li").removeClass("active");
					$("#propertyImageSlider ul").find(".active").animate({
						opacity: "show"
					}, 800)
				} else {
					var k = parseInt($("#propertyImageSlider ul").find(".active").attr("data-value")) + 1;
					$("#propertyImageSlider ul li").animate({
						opacity: "hide"
					}, 400);
					$("#propertyImageSlider ul li").removeClass("active");
					$("#propertyImageSlider ul li[data-value=" + k + "]").addClass("active");
					$("#propertyImageSlider ul").find(".active").animate({
						opacity: "show"
					}, 800)
				}
				$("#propertyImageSliderThumb ul").find(".active").next("li:visible").addClass("active");
				$("#propertyImageSliderThumb ul").find(".active").prev("li:visible").removeClass("active")
			} else {
				if (j == 1) {
					$("#propertyImageSlider ul li").animate({
						opacity: "hide"
					}, 400);
					$("#propertyImageSlider ul").find(".active").next("script").next("li").addClass("active");
					$("#propertyImageSlider ul").find(".active").prev("script").prev("li").removeClass("active");
					$("#propertyImageSlider ul").find(".active").animate({
						opacity: "show"
					}, 800)
				}
				if (m == 1) {
					$("#propertyImageSlider ul li").animate({
						opacity: "hide"
					}, 400);
					$("#propertyImageSlider ul").find(".active").next("script").next("script").next("li").addClass("active");
					$("#propertyImageSlider ul").find(".active").prev("script").prev("script").prev("li").removeClass("active");
					$("#propertyImageSlider ul").find(".active").animate({
						opacity: "show"
					}, 800)
				}
				if (n == 1) {
					$("#propertyImageSlider ul li").animate({
						opacity: "hide"
					}, 400);
					$("#propertyImageSlider ul").find(".active").next("li").addClass("active");
					$("#propertyImageSlider ul").find(".active").prev("li").removeClass("active");
					$("#propertyImageSlider ul").find(".active").animate({
						opacity: "show"
					}, 800)
				}
				$("#propertyImageSliderThumb ul").find(".active").next("li").addClass("active");
				$("#propertyImageSliderThumb ul").find(".active").prev("li").removeClass("active")
			}
			checkZoom();
			photoZoomReset();
			localityTopTab();
			photoCatogaryTab();
			getImageTitle();
			activeThumb();
			youtubeVideos();
			lazyLoad()
		} else {
			return false
		}
		trackPhotoPopup()
	});
	$("#btnSliderPrev").on("click", function () {
		var n = $("#propertyImageSlider ul").find(".active").prev("li").size();
		var j = $("#propertyImageSlider ul").find(".active").prev("script").size();
		var m = $("#propertyImageSlider ul").find(".active").prev("script").prev("script").size();
		var l = $("#photoTowerId").size();
		if (m == 1) {
			j = 0
		}
		if (n == 1 || j == 1 || m == 1) {
			if (l == 1) {
				if (checkTowerValue == 0) {
					$("#propertyImageSlider ul li").animate({
						opacity: "hide"
					}, 400);
					$("#propertyImageSlider ul").find(".active").prev("li").addClass("active");
					$("#propertyImageSlider ul").find(".active").next("li").removeClass("active");
					$("#propertyImageSlider ul").find(".active").animate({
						opacity: "show"
					}, 800)
				} else {
					var k = parseInt($("#propertyImageSlider ul").find(".active").attr("data-value")) - 1;
					$("#propertyImageSlider ul li").animate({
						opacity: "hide"
					}, 400);
					$("#propertyImageSlider ul li").removeClass("active");
					$("#propertyImageSlider ul li[data-value=" + k + "]").addClass("active");
					$("#propertyImageSlider ul").find(".active").animate({
						opacity: "show"
					}, 800)
				}
				$("#propertyImageSliderThumb ul").find(".active").prev("li:visible").addClass("active");
				$("#propertyImageSliderThumb ul").find(".active").next("li:visible").removeClass("active")
			} else {
				if (j == 1) {
					$("#propertyImageSlider ul li").animate({
						opacity: "hide"
					}, 400);
					$("#propertyImageSlider ul").find(".active").prev("script").prev("li").addClass("active");
					$("#propertyImageSlider ul").find(".active").next("script").next("li").removeClass("active");
					$("#propertyImageSlider ul").find(".active").animate({
						opacity: "show"
					}, 800)
				}
				if (m == 1) {
					$("#propertyImageSlider ul li").animate({
						opacity: "hide"
					}, 400);
					$("#propertyImageSlider ul").find(".active").prev("script").prev("script").prev("li").addClass("active");
					$("#propertyImageSlider ul").find(".active").next("script").next("script").next("li").removeClass("active");
					$("#propertyImageSlider ul").find(".active").animate({
						opacity: "show"
					}, 800)
				}
				if (n == 1) {
					$("#propertyImageSlider ul li").animate({
						opacity: "hide"
					}, 400);
					$("#propertyImageSlider ul").find(".active").prev("li").addClass("active");
					$("#propertyImageSlider ul").find(".active").next("li").removeClass("active");
					$("#propertyImageSlider ul").find(".active").animate({
						opacity: "show"
					}, 800)
				}
				$("#propertyImageSliderThumb ul").find(".active").prev("li").addClass("active");
				$("#propertyImageSliderThumb ul").find(".active").next("li").removeClass("active")
			}
			checkZoom();
			photoZoomReset();
			localityTopTab();
			photoCatogaryTab();
			getImageTitle();
			activeThumb();
			youtubeVideos();
			lazyLoad()
		} else {
			return false
		}
		trackPhotoPopup()
	});
	$("#propertyImageSliderThumb ul li").on("click", function () {
		var k = $(this).val();
		$("#propertyImageSliderThumb ul li").removeClass("active");
		$(this).addClass("active");
		$("#propertyImageSlider ul li").animate({
			opacity: "hide"
		}, 400);
		$("#propertyImageSlider ul li").removeClass("active");
		$("#propertyImageSlider ul li[value=" + k + "]").addClass("active");
		$("#propertyImageSlider ul li[value=" + k + "]").animate({
			opacity: "show"
		}, 800);
		checkZoom();
		photoZoomReset();
		localityTopTab();
		photoCatogaryTab();
		getImageTitle();
		youtubeVideos();
		lazyLoad();
		var j = $("#propertyImageSlider ul li").size();
		if (k == 1) {
			$("#btnSliderPrev").hide();
			$("#btnSliderNext").show()
		} else {
			$("#btnSliderPrev").show()
		}
		if (k == j) {
			if (j == 1) {
				$("#btnSliderPrev").hide()
			} else {
				$("#btnSliderPrev").show()
			}
			$("#btnSliderNext").hide()
		} else {
			$("#btnSliderNext").show()
		}
		if ($("#propertyImageSlider ul li.active").hasClass("mbVideo")) {
			$("#btnSliderPrev").addClass("btnNextPrev25");
			$("#btnSliderNext").addClass("btnNextPrev25")
		} else {
			$("#btnSliderPrev").removeClass("btnNextPrev25");
			$("#btnSliderNext").removeClass("btnNextPrev25")
		}
		trackPhotoPopup()
	});
	$("#photoCatogaryTab ul li span").on("click", function (l) {
		l.preventDefault();
		var j = $(this).attr("data-rel");
		$("#photoCatogaryTab ul li").removeClass(selectedclass);
		$(this).parents("li").addClass(selectedclass);
		var k = $("#photoCatogaryTab ul li.selected").text().trim().split(" ").join("-").replace(/(\r\n\t|\n|\r\t)/gm, "");
		if ($("#propertyImageSlider ul").find("." + j + ":first").hasClass("active")) {
			return false
		} else {
			$("#propertyImageSlider ul li").animate({
				opacity: "hide"
			}, 400);
			$("#propertyImageSlider ul li").removeClass("active");
			$("#propertyImageSlider ul").find("." + j + ":first").addClass("active");
			$("#propertyImageSlider ul").find("." + j + ":first").animate({
				opacity: "show"
			}, 800)
		}
		checkZoom();
		photoZoomReset();
		localityTopTab();
		getImageTitle();
		activeThumb();
		youtubeVideos();
		lazyLoad();
		trackPhotoPopup();
		trackEventData(["Property", "PhotoView", "Web", "propertyId=" + propertyIdValue + "&category=" + k])
	});
	$(".btnZoomIn").on("click", function (j) {
		zoomInOutCount++;
		photoZoomIn(400);
		if (isZoomIn == "N") {
			isZoomIn = "Y"
		}
	});
	$(".btnZoomOut").on("click", function (j) {
		zoomInOutCount--;
		photoZoomOut(400)
	});
	$("#btnZoomDefault").on("click", function (j) {
		photoZoomReset()
	});
	$("#GB_window .close div").on("click", function () {
		$("body").css({
			overflow: "visible"
		})
	});
	$("#propertyImageSliderThumb ul li:first").trigger("click");
	$(".btnCatNext").on("click", function () {
		var k = parseInt($("#photoCatogaryTab ul").css("marginLeft"));
		var j = $("#photoCatogaryTab").outerWidth() - 30;
		if (getCatScroll <= -(k)) {
			$("#photoCatogaryTab ul").stop().animate({
				marginLeft: 0
			}, {
				duration: c,
				easing: b,
				complete: function () {
					$(".btnCatPrev").hide()
				}
			})
		} else {
			$("#photoCatogaryTab ul").stop().animate({
				marginLeft: (-j) + (k)
			}, {
				duration: c,
				easing: b,
				complete: function () {
					$(".btnCatPrev").show()
				}
			})
		}
	});
	$(".btnCatPrev").on("click", function () {
		var k = parseInt($("#photoCatogaryTab ul").css("marginLeft"));
		var j = $("#photoCatogaryTab").outerWidth();
		if (k == 0) {
			$(".btnCatPrev").hide();
			return false
		} else {
			k = parseInt($("#photoCatogaryTab ul").css("marginLeft"));
			if (k > -j) {
				$("#photoCatogaryTab ul").stop().animate({
					marginLeft: 0
				}, {
					duration: c,
					easing: b,
					complete: function () {
						k = parseInt($("#photoCatogaryTab ul").css("marginLeft"));
						if (k == 0) {
							$(".btnCatPrev").hide()
						} else {
							$(".btnCatPrev").show()
						}
					}
				});
				return false
			} else {
				$("#photoCatogaryTab ul").stop().animate({
					marginLeft: (j) + (k)
				}, {
					duration: c,
					easing: b,
					complete: function () {
						k = parseInt($("#photoCatogaryTab ul").css("marginLeft"));
						if (k == 0) {
							$(".btnCatPrev").hide()
						} else {
							$(".btnCatPrev").show()
						}
					}
				})
			}
		}
	});
	$("#towerDropDownId ul li").on("click", function () {
		var m = $(this).text();
		var l = $(this).val();
		checkTowerValue = l;
		$("#towerValue").text(m);
		$(this).parent().hide("fast", function () {
			$("#towerDropDownId ul").removeAttr("style")
		});
		if (l == 0) {
			$("#propertyImageSlider ul li").css({
				display: "none"
			});
			$("#propertyImageSlider ul li:first").css({
				display: "block"
			});
			$("#propertyImageSliderThumb ul li").css({
				display: "block"
			});
			$("#photoCatogaryTab ul li").css({
				display: "block"
			});
			$("#photoCatogaryTab ul li").removeClass(selectedclass);
			$("#photoCatogaryTab ul li:first").addClass(selectedclass);
			$("#propertyImageSlider ul li").attr("data-value", 0);
			$("#propertyImageSliderThumb ul li").attr("data-value", 0);
			$("#propertyImageSlider ul li").removeClass("active");
			$("#propertyImageSliderThumb ul li").removeClass("active");
			$("#propertyImageSlider ul li:first").addClass("active");
			$("#propertyImageSliderThumb ul li:first").addClass("active")
		} else {
			var k = $("#propertyImageSlider ul").find(".tower_" + l).attr("class");
			var o = k.split(" ");
			$("#photoCatogaryTab ul li").css({
				display: "none"
			});
			$("#photoCatogaryTab ul li").each(function () {
				$(this).find("span[data-rel=" + o[2] + "]").parents("li").css({
					display: "block"
				})
			});
			$("#photoCatogaryTab ul li").removeClass(selectedclass);
			$("#photoCatogaryTab ul li:visible:first").addClass(selectedclass);
			$("#propertyImageSlider ul li").css({
				display: "none"
			});
			$("#propertyImageSliderThumb ul li").css({
				display: "none"
			});
			$("#propertyImageSlider ul").find(".tower_" + l).each(function () {
				var p = $(this).val();
				$("#propertyImageSliderThumb ul li[value=" + p + "]").css({
					display: "block"
				})
			});
			$("#propertyImageSlider ul li").removeClass("active");
			$("#propertyImageSliderThumb ul li").removeClass("active");
			$("#propertyImageSliderThumb ul li").removeAttr("data-value");
			$("#propertyImageSlider ul li").removeAttr("data-value");
			var n = 1;
			$("#propertyImageSlider ul").find(".tower_" + l).each(function () {
				$(this).attr("data-value", n);
				n++
			});
			var j = 1;
			$("#propertyImageSliderThumb ul li:visible").each(function () {
				$(this).attr("data-value", j);
				j++
			});
			$("#propertyImageSlider ul").find(".tower_" + l + ":first").addClass("active").css({
				display: "block"
			});
			$("#propertyImageSliderThumb ul li:visible:first").addClass("active")
		}
		resetThumb();
		resetCat();
		if ($("#propertyImageSlider ul").find(".tower_" + l).size() == 1) {
			$("#btnSliderNext").hide();
			$("#btnSliderPrev").hide()
		} else {
			$("#btnSliderNext").show()
		}
		lazyLoad();
		trackPhotoPopup()
	});
	$("#propertyImageSlider ul").on("mousewheel", ".active img", function (j, k) {
		if (k > 0) {
			zoomInOutCount = zoomInOutCount + 1;
			photoZoomIn(0)
		} else {
			if (zoomInOutCount > 0) {
				zoomInOutCount = zoomInOutCount - 1;
				photoZoomIn(0)
			}
		}
		return false
	});
	contactFormOpenClose()
}

function countPhotosVideos() {
	var a = $("#propertyImageSlider").find(".projectComPhoto").size();
	$("#projectComPhoto").text(a);
	var d = $("#propertyImageSlider").find(".videoProject").size();
	$("#videoProject").text(d);
	var b = $("#propertyImageSlider").find(".photoProperty").size();
	$("#photoProperty").text(b);
	var f = $("#propertyImageSlider").find(".videoProperty").size();
	$("#videoProperty").text(f);
	var e = $("#propertyImageSlider").find(".photoLocality").size();
	$("#photoLocality").text(e);
	var c = $("#propertyImageSlider").find(".videoLocality").size();
	$("#videoLocality").text(c)
}

function localityTopTab() {
	var k = $(".photoProperty").size();
	var l = $(".videoProperty").size();
	var f = $(".photoLocality").size();
	var g = $(".videoLocality").size();
	var c = $(".projectComPhoto").size();
	var d = $(".videoProject").size();
	var a = $("#propertyImageSlider ul").find(".active").attr("lang");
	var j = $("#propertyImageSlider ul").find(".active").attr("data-count");
	$("#curPageTotalPage").text(j);
	var i;
	try {
		if (j) {
			var b = j.substr(j.indexOf(" ") + 1);
			$("#photoCatogaryTab ul li").each(function () {
				if (i && $(this).text()) {
					i = i + " | " + $(this).text()
				} else {
					i = $(this).text()
				}
			});
			if (b) {
				i = b + " | " + i
			}
			if (fromPage) {
				if (fromPage == "search") {
					ga("send", "event", "SRP_photocomponent", a, i);
					if (a == "1") {
						ga("send", "event", "SRP_photocomponent", "Main_Photo", b)
					}
				} else {
					if (fromPage == "detail") {
						ga("send", "event", "PDP_photocomponent", a, i);
						if (a == "1") {
							ga("send", "event", "PDP_photocomponent", "Main_Photo", b)
						}
					} else {
						if (fromPage == "searchPG") {
							ga("send", "event", "SRP_PG_photocomponent", a, i);
							if (a == "1") {
								ga("send", "event", "SRP_PG_photocomponent", "Main_Photo", b)
							}
						} else {
							ga("send", "event", "ProjectDetail_photocomponent", a, i);
							if (a == "1") {
								ga("send", "event", "ProjectDetail_photocomponent", "Main_Photo", b)
							}
						}
					}
				}
			}
		}
	} catch (h) {
		console.log(h)
	}
}

function photoCatogaryTab() {
	$("#photoCatogaryTab ul li").removeClass(selectedclass);
	var b = "";
	var a = $("#propertyImageSlider ul").find(".active").attr("class");
	if (a != null && a != "") {
		var e = a.split(" ");
		var d = $("#propertyImageSlider ul").find(".active");
		if ($("#propertyImageSlider ul").find(".active").hasClass(e[2])) {
			$("#photoCatogaryTab ul li").removeClass(selectedclass);
			if (d.hasClass("photoProperty") || d.hasClass("videoProperty") || d.hasClass("videoProject") || d.hasClass("videoLocality") || d.hasClass("video")) {
				$("#photoCatogaryTab ul li").find("span[data-rel=" + e[1] + "]").parents("li").addClass(selectedclass);
				b = $("#photoCatogaryTab ul li.selected").text().trim().split(" ").join("-").replace(/(\r\n\t|\n|\r\t)/gm, "")
			} else {
				$("#photoCatogaryTab ul li").find("span[data-rel=" + e[2] + "]").parents("li").addClass(selectedclass);
				b = $("#photoCatogaryTab ul li.selected").text().trim().split(" ").join("-").replace(/(\r\n\t|\n|\r\t)/gm, "")
			}
		}
		var c = $("#photoCatogaryTab ul").find(".selected").index();
		if (c >= 6) {
			activeCatogary()
		} else {
			$(".btnCatPrev").trigger("click")
		}
		checkZoomFullScreen();
		trackEventData(["Property", "PhotoView", "Web", "propertyId=" + propertyIdValue + "&category=" + b])
	}
}

function localityLeftTab() {
	$(".propertyLocalityNav ul li").removeClass(selectedclass);
	var b = $("#propertyImageSlider ul").find(".active").attr("class");
	var a = $(".propertySubTab").find(".selected").attr("data-rel");
	if (b != null && b != "") {
		var d = b.split(" ");
		var c = $("#propertyImageSlider ul").find(".active");
		if ($("#propertyImageSlider ul").find(".active").hasClass(d[2])) {
			$(".propertyLocalityNav ul li").removeClass(selectedclass);
			if (c.hasClass("photoProperty") || c.hasClass("videoProperty") || c.hasClass("videoProject") || c.hasClass("videoLocality") || c.hasClass("video")) {
				$(".propertyLocalityNav ul li").find("span[data-rel=" + d[1] + "]").parents("li").addClass(selectedclass)
			} else {
				$(".propertyLocalityNav ul li").find("span[data-rel=" + d[2] + "]").parents("li").addClass(selectedclass)
			}
			if ($(".propertyLocalityNav ul li.selected").parents("ul").is(":hidden")) {
				$(".propertyLocalityNav ul").slideUp();
				$(".propertyLocalityNav ul li.selected").parents("ul").slideDown();
				$(".propertyLocalityNav h4").find("span").removeClass("minusIcon");
				$(".propertyLocalityNav ul li.selected").parents("ul").prev("h4").find("span").addClass("minusIcon")
			}
		}
		checkZoomFullScreen()
	}
}

function getImageTitle() {
	var a = $("#propertyImageSlider ul").find(".active").attr("title");
	$("#propertyImgTitle").text(a)
}

function activeThumb() {
	var d = parseInt($("#propertyImageSlider ul").find(".active").attr("data-value"));
	if (d == 0) {
		var b = $("#propertyImageSlider ul").find(".active").val();
		$("#propertyImageSliderThumb ul li").removeClass("active");
		$("#propertyImageSliderThumb ul li[value=" + b + "]").addClass("active");
		var e = (b - 1) * 80;
		var c = $("#propertyImageSliderThumb ul").outerWidth();
		$(".btnThumbPrev").removeClass("btnThumbDisable");
		$("#propertyImageSliderThumb ul").stop().animate({
			marginLeft: -e
		}, {
			duration: 800,
			easing: "swing",
			complete: function () {
				$(".btnThumbPrevTemp").addClass("btnThumbPrev");
				$(".btnThumbPrev").removeClass("btnThumbPrevTemp");
				$(".btnThumbNextTemp").addClass("btnThumbNext");
				$(".btnThumbNext").removeClass("btnThumbNextTemp");
				var f = parseInt($("#propertyImageSliderThumb ul").css("marginLeft"));
				if (f == 0) {
					$(".btnThumbPrev").addClass("btnThumbDisable")
				} else {
					$(".btnThumbPrev").removeClass("btnThumbDisable")
				}
			}
		})
	} else {
		var b = $("#propertyImageSlider ul").find(".active").attr("data-value");
		$("#propertyImageSliderThumb ul li").removeClass("active");
		$("#propertyImageSliderThumb ul li[data-value=" + b + "]").addClass("active");
		var e = (b - 1) * 80;
		var c = $("#propertyImageSliderThumb ul").outerWidth();
		$(".btnThumbPrev").removeClass("btnThumbDisable");
		$("#propertyImageSliderThumb ul").stop().animate({
			marginLeft: -e
		}, {
			duration: 800,
			easing: "swing",
			complete: function () {
				$(".btnThumbPrevTemp").addClass("btnThumbPrev");
				$(".btnThumbPrev").removeClass("btnThumbPrevTemp");
				$(".btnThumbNextTemp").addClass("btnThumbNext");
				$(".btnThumbNext").removeClass("btnThumbNextTemp");
				var f = parseInt($("#propertyImageSliderThumb ul").css("marginLeft"));
				if (f == 0) {
					$(".btnThumbPrev").addClass("btnThumbDisable")
				} else {
					$(".btnThumbPrev").removeClass("btnThumbDisable")
				}
			}
		})
	}
	var a = $("#propertyImageSlider ul li").size();
	if (b == 1) {
		$("#btnSliderPrev").hide();
		$("#btnSliderNext").show()
	} else {
		$("#btnSliderPrev").show()
	}
	if (b == a) {
		if (a == 1) {
			$("#btnSliderPrev").hide()
		} else {
			$("#btnSliderPrev").show()
		}
		$("#btnSliderPrev").show();
		$("#btnSliderNext").hide()
	} else {
		$("#btnSliderNext").show()
	}
	if ($("#propertyImageSlider ul li.active").hasClass("mbVideo")) {
		$("#btnSliderPrev").addClass("btnNextPrev25");
		$("#btnSliderNext").addClass("btnNextPrev25")
	} else {
		$("#btnSliderPrev").removeClass("btnNextPrev25");
		$("#btnSliderNext").removeClass("btnNextPrev25")
	}
}

function activeCatogary() {
	var a = $("#photoCatogaryTab ul").find(".selected").val();
	$("#photoCatogaryTab ul").stop().animate({
		marginLeft: -a
	}, {
		duration: 800,
		easing: "swing",
		complete: function () {
			var b = parseInt($("#photoCatogaryTab ul").css("marginLeft"));
			if (b == 0) {
				$(".btnCatPrev").hide()
			} else {
				$(".btnCatPrev").show()
			}
		}
	})
}

function replaceRange(c, d, b, a) {
	return c.substring(0, d) + a + c.substring(b)
}

function youtubeVideos() {
	$("#propertyImageSlider ul li").find("iframe").attr("src", "");
	var c = $("#propertyImageSliderThumb ul").find(".active").find(".iconVideo").attr("title");
	var b = $("#propertyImageSliderThumb ul").find(".active").find(".iconVideo").size();
	if (b == 1) {
		var a = c.search("wmode");
		var d = c.match("wmode");
		var e = replaceRange(c, a, c.length, "wmode=opaque");
		if (d) {
			$("#propertyImageSlider ul").find(".active").find("iframe").attr("src", e)
		} else {
			if ($("#propertyImageSlider ul").find(".active").hasClass("videoProperty")) {
				$("#propertyImageSlider ul").find(".active").find("iframe").attr("src", c + "?autoplay=1")
			} else {
				$("#propertyImageSlider ul").find(".active").find("iframe").attr("src", c + "?wmode=opaque")
			}
		}
	}
}
$(document).on("keydown", function (b) {
	if (b.keyCode == 39) {
		var a = $("#propertyTabMatter_1").size();
		if (a == 1) {
			if ($("#propertyTabMatter_1").is(":visible")) {
				$("#btnSliderNext").trigger("click")
			}
		} else {
			$("#btnSliderNext").trigger("click")
		}
	}
	if (b.keyCode == 37) {
		var a = $("#propertyTabMatter_1").size();
		if (a == 1) {
			if ($("#propertyTabMatter_1").is(":visible")) {
				$("#btnSliderPrev").trigger("click")
			}
		} else {
			$("#btnSliderPrev").trigger("click")
		}
	}
});
$(window).on('load',(function () {
	var b = $("#propertyImageSliderThumb").outerWidth();
	var a = $("#propertyImageSliderThumb ul").outerWidth();
	if (b >= a) {
		$(".btnThumbNext").addClass("btnThumbDisable")
  }
  jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();
	if ($.browser.msie && $.browser.version < "9.0") {
		var c = $("#propertyImageSlider ul").find(".active").val();
		$("#propertyImageSliderThumb ul li[value=" + c + "]").trigger("click")
	}
	// if ($("#photoProperty").size() == 1) {
	// 	$(".propertyLocalityNav ul").slideDown();
	// 	$(".propertyLocalityNav ul").prev("h4").find("span").addClass("minusIcon")
	// }
}));

function getYouTubeThumb(b, d) {
	if (b == null) {
		return ""
	}
	d = (d == null) ? "big" : d;
	var a;
	var c;
	c = b.match("[\\?&]v=([^&#]*)");
	a = (c === null) ? b : c[1];
	if (d == "small") {
		return "http://img.youtube.com/vi/" + a + "/2.jpg"
	} else {
		return "http://img.youtube.com/vi/" + a + "/0.jpg"
	}
}

function lazyLoad(b) {
	var f = $("#propertyImageSlider ul").find(".active").val();
	var g = $("#propertyImageSlider ul li").size();
	var i = 1;
	var a = $("#propertyImageSliderThumb ul li").size();
	if (a == 1) {
		$("#propertyImageSliderThumb ul li").each(function () {
			var j = $(this).find("img").attr("data-src");
			$(this).find("img").attr("src", j)
		})
	}
	if (g == 1) {
		$("#propertyImageSlider ul li").each(function () {
			var j = $(this).find("img").attr("data-src");
			$(this).find("img").attr("src", j)
		})
	} else {
		if ($("#propertyImageSlider ul li.active").next().size() == 0) {
			var e = $("#propertyImageSlider ul li.active").find("img").attr("data-src");
			$("#propertyImageSlider ul li.active").find("img").attr("src", e);
			$("#propertyImageSlider ul li.active").find("img").attr("itemprop", "contentURL")
		} else {
			$("#propertyImageSlider ul li.active").nextAll().each(function () {
				if (i <= 2) {
					var k = $(this).find("img").attr("data-src");
					var j = $(this).prev().find("img").attr("data-src");
					$(this).find("img").attr("src", k);
					$(this).find("img").attr("itemprop", "contentURL");
					$(this).prev().find("img").attr("src", j);
					$(this).prev().find("img").attr("itemprop", "contentURL")
				}
				i++
			})
		}
	}
	var c = 1;
	$("#propertyImageSliderThumb ul li[value=" + f + "]").nextAll().each(function () {
		if (c <= 12) {
			var l = $(this).find("img").attr("data-src");
			var k = $(this).prev().find("img").attr("data-src");
			$(this).find("img").attr("src", l);
			$(this).find("img").attr("itemprop", "contentURL");
			$(this).prev().find("img").attr("src", k);
			$(this).prev().find("img").attr("itemprop", "contentURL");
			$(this).prev().addClass("nextImageLoaded");
			$(this).addClass("nextImageLoaded");
			var j = 1;
			$(".nextImageLoaded:last").nextAll().each(function () {
				if (j <= 12) {
					var n = $(this).find("img").attr("data-src");
					var m = $(this).prev().find("img").attr("data-src");
					$(this).find("img").attr("src", n);
					$(this).find("img").attr("itemprop", "contentURL");
					$(this).prev().find("img").attr("src", m);
					$(this).prev().find("img").attr("itemprop", "contentURL");
					$(this).prev().addClass("nextImageLoaded");
					$(this).addClass("nextImageLoaded")
				}
				j++
			})
		}
		c++
	});
	if (b) {
		var d = 1;
		$("#propertyImageSliderThumb ul li[value=" + f + "]").prevAll().each(function () {
			if (d <= 10) {
				var l = $(this).find("img").attr("data-src");
				var k = $(this).prev().find("img").attr("data-src");
				$(this).find("img").attr("src", l);
				$(this).find("img").attr("itemprop", "contentURL");
				$(this).prev().find("img").attr("src", k);
				$(this).prev().find("img").attr("itemprop", "contentURL");
				$(this).prev().addClass("prevImageLoaded");
				$(this).addClass("prevImageLoaded");
				var j = 1;
				$(".prevImageLoaded:first").prevAll().each(function () {
					if (j <= 12) {
						var n = $(this).find("img").attr("data-src");
						var m = $(this).prev().find("img").attr("data-src");
						$(this).find("img").attr("src", n);
						$(this).find("img").attr("itemprop", "contentURL");
						$(this).prev().find("img").attr("src", m);
						$(this).prev().find("img").attr("itemprop", "contentURL");
						$(this).prev().addClass("prevImageLoaded");
						$(this).addClass("prevImageLoaded")
					}
					j++
				})
			}
			d++
		})
	}
	var h = 1;
	$("#propertyImageSliderThumb ul li[value=" + f + "]").prevAll().each(function () {
		if (h <= 15) {
			var k = $(this).find("img").attr("data-src");
			var j = $(this).prev().find("img").attr("data-src");
			$(this).find("img").attr("src", k);
			$(this).find("img").attr("itemprop", "contentURL");
			$(this).prev().find("img").attr("src", j);
			$(this).prev().find("img").attr("itemprop", "contentURL");
			$(this).prev().addClass("nextImageLoaded");
			$(this).addClass("nextImageLoaded")
		}
		h++
	})
}

function photoZoomIn(e) {
	zoomImgIncPosLeft = parseInt($("#propertyImageSlider ul li.active").find("img").position().left);
	zoomImgIncPosTop = parseInt($("#propertyImageSlider ul li.active").find("img").position().top);
	getImgCurrentW = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-width"));
	getImgCurrentH = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-height"));
	getImgResizeW = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("resize-width"));
	getImgResizeH = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("resize-height"));
	getMrginL = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("margin-left"));
	getMrginT = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("margin-top"));
	var i = 0;
	var d = 0;
	i = (getImgCurrentW / getImgResizeW) * 2;
	d = (getImgCurrentH / getImgResizeH) * 2;
	if ((getImgCurrentW - getImgResizeW) < 700 || (getImgCurrentH - getImgResizeH) < 400) {
		getImgCurrentW = getImgCurrentW * i;
		getImgCurrentH = getImgCurrentH * d
	}
	if (zoomInOutCount <= 10) {
		$(".btnZoomIn").addClass("btnZoomInTemp");
		$(".btnZoomInTemp").removeClass("btnZoomIn");
		$("#propertyImageSlider ul li.active").find("img").draggable({
			cursor: "move",
			containment: "#propertyImageSlider ul li.active .imageZoomScrollBound",
			scroll: false,
			drag: function () {
				zoomImgIncPosLeft = parseInt($("#propertyImageSlider ul li.active").find("img").position().left);
				zoomImgIncPosTop = parseInt($("#propertyImageSlider ul li.active").find("img").position().top);
				zoomImgDragg = true
			}
		});
		var j = ((getImgCurrentW - getImgResizeW) / 10) * 2;
		j = j * zoomInOutCount;
		var f = ((getImgCurrentH - getImgResizeH) / 10) * 2;
		f = f * zoomInOutCount;
		var g = ((getImgCurrentW - getImgResizeW) / 10);
		g = g * zoomInOutCount;
		var a = ((getImgCurrentH - getImgResizeH) / 10);
		a = a * zoomInOutCount;
		var h = ((getImgCurrentW - getImgResizeW) / 10);
		h = h * zoomInOutCount;
		var c = ((getImgCurrentH - getImgResizeH) / 10);
		c = c * zoomInOutCount;
		var b = ((getImgCurrentW - getImgResizeW) / 10) / 2;
		b = b * zoomInOutCount;
		var k = ((getImgCurrentH - getImgResizeH) / 10) / 2;
		k = k * zoomInOutCount;
		$("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").animate({
			width: getImgResizeW + j,
			height: getImgResizeH + f,
			marginLeft: getMrginL - g,
			marginTop: getMrginT - a
		}, {
			duration: e,
			easing: "swing",
			complete: function () {
				$(".btnZoomInTemp").addClass("btnZoomIn");
				$(".btnZoomIn").removeClass("btnZoomInTemp")
			}
		});
		$("#propertyImageSlider ul li.active").find("img").animate({
			width: getImgResizeW + h,
			height: getImgResizeH + c,
			left: 0,
			top: k
		}, {
			duration: e,
			easing: "swing"
		})
	} else {
		zoomInOutCount = 10;
		zoomImgDragg = false
	}
	if (zoomInOutCount > 0) {
		$("#btnSliderPrev").addClass("btnNextPrevHide");
		$("#btnSliderNext").addClass("btnNextPrevHide")
	} else {
		$("#btnSliderPrev").removeClass("btnNextPrevHide");
		$("#btnSliderNext").removeClass("btnNextPrevHide")
	}
}

function photoZoomOut(e) {
	zoomImgIncPosLeft = parseInt($("#propertyImageSlider ul li.active").find("img").position().left);
	zoomImgIncPosTop = parseInt($("#propertyImageSlider ul li.active").find("img").position().top);
	getImgCurrentW = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-width"));
	getImgCurrentH = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-height"));
	getImgResizeW = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("resize-width"));
	getImgResizeH = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("resize-height"));
	getMrginL = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("margin-left"));
	getMrginT = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("margin-top"));
	var i = 0;
	var d = 0;
	i = (getImgCurrentW / getImgResizeW) * 2;
	d = (getImgCurrentH / getImgResizeH) * 2;
	if ((getImgCurrentW - getImgResizeW) < 700 || (getImgCurrentH - getImgResizeH) < 400) {
		getImgCurrentW = getImgCurrentW * i;
		getImgCurrentH = getImgCurrentH * d
	}
	if (zoomInOutCount >= 0) {
		$(".btnZoomOut").addClass("btnZoomOutTemp");
		$(".btnZoomOutTemp").removeClass("btnZoomOut");
		$("#propertyImageSlider ul li.active").find("img").draggable({
			cursor: "move",
			containment: "#propertyImageSlider ul li.active .imageZoomScrollBound",
			scroll: false,
			drag: function () {
				zoomImgIncPosLeft = parseInt($("#propertyImageSlider ul li.active").find("img").position().left);
				zoomImgIncPosTop = parseInt($("#propertyImageSlider ul li.active").find("img").position().top);
				zoomImgDragg = true
			}
		});
		var j = ((getImgCurrentW - getImgResizeW) / 10) * 2;
		j = j * zoomInOutCount;
		var f = ((getImgCurrentH - getImgResizeH) / 10) * 2;
		f = f * zoomInOutCount;
		var g = ((getImgCurrentW - getImgResizeW) / 10);
		g = g * zoomInOutCount;
		var a = ((getImgCurrentH - getImgResizeH) / 10);
		a = a * zoomInOutCount;
		var h = ((getImgCurrentW - getImgResizeW) / 10);
		h = h * zoomInOutCount;
		var c = ((getImgCurrentH - getImgResizeH) / 10);
		c = c * zoomInOutCount;
		var b = ((getImgCurrentW - getImgResizeW) / 10) / 2;
		b = b * zoomInOutCount;
		var k = ((getImgCurrentH - getImgResizeH) / 10) / 2;
		k = k * zoomInOutCount;
		$("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").animate({
			width: getImgResizeW + j,
			height: getImgResizeH + f,
			marginLeft: getMrginL - g,
			marginTop: getMrginT - a
		}, {
			duration: e,
			easing: "swing",
			complete: function () {
				$(".btnZoomOutTemp").addClass("btnZoomOut");
				$(".btnZoomOut").removeClass("btnZoomOutTemp")
			}
		});
		$("#propertyImageSlider ul li.active").find("img").animate({
			width: getImgResizeW + h,
			height: getImgResizeH + c,
			left: 0,
			top: k
		}, {
			duration: e,
			easing: "swing"
		})
	} else {
		zoomInOutCount = 0;
		zoomImgDragg = false
	}
	if (zoomInOutCount > 0) {
		$("#btnSliderPrev").addClass("btnNextPrevHide");
		$("#btnSliderNext").addClass("btnNextPrevHide")
	} else {
		$("#btnSliderPrev").removeClass("btnNextPrevHide");
		$("#btnSliderNext").removeClass("btnNextPrevHide")
	}
}

function photoZoomReset() {
	var a = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").size());
	getImgResizeW = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("resize-width"));
	getImgResizeH = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("resize-height"));
	getMrginL = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("margin-left"));
	getMrginT = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("margin-top"));
	$("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").animate({
		width: getImgResizeW,
		height: getImgResizeH,
		marginLeft: getMrginL,
		marginTop: getMrginT
	}, {
		easing: "swing"
	});
	$("#propertyImageSlider ul li.active").find("img").animate({
		width: getImgResizeW,
		height: getImgResizeH,
		left: 0,
		top: 0
	}, {
		easing: "swing",
		complete: function () {
			if ($("#propertyImageSlider ul li.active").find("img").hasClass("ui-draggable")) {
				$("#propertyImageSlider ul li.active").find("img").draggable("destroy")
			}
		}
	});
	zoomInOutCount = 0;
	$("#btnSliderPrev").removeClass("btnNextPrevHide");
	$("#btnSliderNext").removeClass("btnNextPrevHide")
}

function checkZoom() {
	getImgCurrentW = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-width"));
	getImgCurrentH = parseInt($("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-height"));
	var c = $("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-width");
	var a = $("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-height");
	var b = $("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-photo-width");
	var d = $("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-photo-height");
	if ($("#includeFormIdLocInfo").hasClass("fullscreenMode")) {
		if (b != null && d != null) {
			if (c == undefined || a == undefined) {
				$("#zoomPanelDesable").css({
					display: "none"
				});
				$("#zoomPanel").css({
					display: "none"
				})
			}
		}
		if ($("#propertyImageSlider ul").find(".active").hasClass("mbVideo")) {
			$("#zoomPanel").css({
				display: "none"
			});
			$("#zoomPanelDesable").css({
				display: "none"
			})
		}
	}
}

function checkZoomFullScreen() {
	var c = $("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-width");
	var a = $("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-height");
	var b = $("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-photo-width");
	var d = $("#propertyImageSlider ul li.active").find(".imageZoomScrollBound").attr("data-photo-height");
	if ($("#includeFormIdLocInfo").hasClass("fullscreenMode")) {
		if (b != null && d != null) {
			if ($("#propertyImageSlider ul").find(".active").hasClass("photoLocality")) {
				$("#zoomPanel").css({
					display: "none"
				});
				$("#zoomPanelDesable").css({
					display: "none"
				})
			} else {
				$("#zoomPanel").css({
					display: "block"
				})
			}
			if (c == undefined || a == undefined) {
				$("#zoomPanelDesable").css({
					display: "none"
				});
				$("#zoomPanel").css({
					display: "none"
				})
			}
		}
	} else {
		$("#zoomPanelDesable").css({
			display: "none"
		});
		$("#zoomPanel").css({
			display: "none"
		})
	}
}

function imagePerspectiveView() {
	$(".imageZoomScrollBound").each(function () {
		var a = $(this).attr("data-photo-height");
		var c = $(this).attr("data-photo-width");
		var b = 0;
		$(this).attr("data-height", a);
		$(this).attr("data-width", c);
		if (c > maxdataWidth) {
			b = maxdataWidth / c;
			$(this).css({
				width: maxdataWidth,
				height: a * b
			});
			$(this).find("img").css({
				width: maxdataWidth,
				height: a * b
			});
			a = $(this).find("img").outerHeight();
			c = $(this).find("img").outerWidth();
			$(this).attr("resize-height", a);
			$(this).attr("resize-width", c);
			$(this).attr("margin-left", (maxdataWidth - c) / 2);
			$(this).attr("margin-top", (maxdataHeight - a) / 2);
			$(this).css({
				marginLeft: (maxdataWidth - c) / 2,
				marginTop: (maxdataHeight - a) / 2
			})
		} else {
			$(this).attr("resize-height", a);
			$(this).attr("resize-width", c);
			$(this).attr("margin-left", (maxdataWidth - c) / 2);
			$(this).attr("margin-top", (maxdataHeight - a) / 2);
			$(this).css({
				width: c,
				height: a,
				marginLeft: (maxdataWidth - c) / 2,
				marginTop: (maxdataHeight - a) / 2
			})
		}
		if (a > maxdataHeight) {
			b = maxdataHeight / a;
			$(this).css({
				width: c * b,
				height: maxdataHeight
			});
			$(this).find("img").css({
				width: c * b,
				height: maxdataHeight
			});
			a = $(this).find("img").outerHeight();
			c = $(this).find("img").outerWidth();
			$(this).attr("resize-height", a);
			$(this).attr("resize-width", c);
			$(this).attr("margin-left", (maxdataWidth - c) / 2);
			$(this).attr("margin-top", (maxdataHeight - a) / 2);
			$(this).css({
				marginLeft: (maxdataWidth - c) / 2,
				marginTop: (maxdataHeight - a) / 2
			})
		} else {
			$(this).attr("resize-height", a);
			$(this).attr("resize-width", c);
			$(this).attr("margin-left", (maxdataWidth - c) / 2);
			$(this).attr("margin-top", (maxdataHeight - a) / 2);
			$(this).css({
				width: c,
				height: a,
				marginLeft: (maxdataWidth - c) / 2,
				marginTop: (maxdataHeight - a) / 2
			})
		}
	})
}

function trackGA(a) {}

function resetThumb() {
	$("#propertyImageSliderThumb ul").removeAttr("style");
	var a = $("#propertyImageSliderThumb ul li:visible").size();
	$("#propertyImageSliderThumb ul").css({
		width: (80 * a)
	});
	getThumbConW = $("#propertyImageSliderThumb").outerWidth();
	sliderW = $("#propertyImageSliderThumb ul").outerWidth();
	slideWidth = sliderW - getThumbConW
}

function resetCat() {
	$("#photoCatogaryTab ul").removeAttr("style");
	var b = 0;
	var a = 0;
	if ($("#photoCatogaryTab").parents(".photoCatogaryCont").hasClass("withCntactBtn")) {
		a = $(window).width() - 260
	} else {
		a = $(window).width() - 80
	}
	countCat = $("#photoCatogaryTab ul li:visible").size();
	$("#photoCatogaryTab ul li").each(function () {
		var c = parseInt($(this).outerWidth());
		$(this).attr("value", b);
		b = b + c
	});
	if (countCat >= 4) {
		$("#photoCatogaryTab ul").width(b)
	}
	if (countCat <= 4) {
		$(".photoCatogaryNav").addClass("margin0")
	} else {
		$(".photoCatogaryNav").removeClass("margin0")
	}
	if (b <= a) {
		$(".btnCatPrev").hide();
		$(".btnCatNext").hide()
	} else {
		$(".btnCatNext").show()
	}
	getCatScroll = b - a
}

function enableTab(a) {
	if (a != null && a != "" && a != "null") {
		if ($("#" + a).val()) {
			var b = $("#" + a).val();
			$("#propertyImageSliderThumb ul li").removeClass("active");
			$("#" + a).addClass("active");
			$("#propertyImageSlider ul li").animate({
				opacity: "hide"
			}, 400);
			$("#propertyImageSlider ul li").removeClass("active");
			$("#propertyImageSlider ul li[value=" + b + "]").addClass("active");
			$("#propertyImageSlider ul li[value=" + b + "]").animate({
				opacity: "show"
			}, 800);
			localityTopTab();
			activeThumb();
			photoCatogaryTab();
			getImageTitle();
			youtubeVideos();
			lazyLoad()
		} else {
			$("#propertyImageSliderThumb ul li:first").trigger("click")
		}
	}
}

function trackPhotoPopup() {
	var c = $("#photoCatogaryTab ul").find(".selected").text();
	c = c.replace(/^\s+|\s+$/g, "");
	var b = document.URL;
	c = c.substring(0, c.indexOf("("));
	var a = "";
	if (b.indexOf("localityPhotoOnly") != -1) {
		a = "Locality | " + c
	} else {
		if (b.indexOf("pid") != -1) {
			a = "Property | Normal | " + c
		} else {
			if (b.indexOf("prjPsmId") != -1) {
				if (b.indexOf("fromPage") == -1) {
					a = "Project | Normal | " + c
				} else {
					if (b.indexOf("fromPage=search") != -1) {
						a = "Project | Normal | " + c
					} else {
						if (b.indexOf("fromPage=construction") != -1) {
							a = "Project | Construction | " + c
						} else {
							if (b.indexOf("fromPage=layout") != -1) {
								a = "Project | Layout | " + c
							} else {
								if (b.indexOf("fromPage=floorplan") != -1) {
									a = "Project | FloorPlan | " + c
								}
							}
						}
					}
				}
			}
		}
	}
	a = a.replace(/[^- a-zA-Z 0-9|]+/g, "")
}

function contactFormOpenClose() {
	$(".btnContactNow").on("click", function () {
		$(".photoContactFormOverlay").show()
	});
	$(".closeForm span").on("click", function () {
		$(".photoContactFormOverlay").hide()
	})
}

function getGaInVideoCLick(a) {};
