window.onload = function () {
	// 设置透明度方式实现
	var bannerSlide = {
		banner: document.getElementById("banner"),
		slides: document.getElementById("slides"),
		slidesLi: slides.getElementsByTagName("li"),
		slideControls: document.getElementById("slide-controls").getElementsByTagName("li"),
		prev: document.getElementById("icon-prev"),
		next: document.getElementById("icon-next"),
		player: null,  //图片轮播定时器
		bufferPlayer: null, //图片缓冲定时器
		num: 0,
		alpha: 0,
		startCount: function () {
			bannerSlide.num++;
			bannerSlide.changePic();
		},
		changePic: function () {
			var index = bannerSlide.num % bannerSlide.slidesLi.length;
			index = index >= 0 ? index : -index;

			for (var i = 0, len = bannerSlide.slidesLi.length; i < len; i++) {
				bannerSlide.slidesLi[i].style.opacity = 0;
				bannerSlide.slidesLi[i].style.filter = "alpha(opacity = 0)"; 
				bannerSlide.slidesLi[i].zIndex = "1";
			}
			bannerSlide.slidesLi[index].zIndex = "2";

			for (var i = 0, len = bannerSlide.slideControls.length; i < len; i++) {
				bannerSlide.slideControls[i].className = "";
			}
			bannerSlide.slideControls[index].className = "sel";

			bannerSlide.bufferPlayer = setInterval(function () {
				bannerSlide.changeOpacity(index);
			}, 30);
		},
		changeOpacity: function (index) {
			bannerSlide.alpha += 5;
			
			bannerSlide.slidesLi[index].style.opacity = bannerSlide.alpha / 100;
			bannerSlide.slidesLi[index].style.filter = "alpha(opacity = " + bannerSlide.alpha + ")";

			if (bannerSlide.alpha === 100) {
				bannerSlide.alpha = 0;
				window.clearInterval(bannerSlide.bufferPlayer);
			}
		},
		prevPic: function () { //点击向左按钮
			bannerSlide.num--;
			bannerSlide.changePic();
		},
		nextPic: function () { //点击向右按钮
			bannerSlide.num++;
			bannerSlide.changePic();
		},
		init: function () {
			bannerSlide.player = window.setInterval(bannerSlide.startCount, 5000);

			// 鼠标划过图片停止自动播放，鼠标移出图片开始自动播放
			bannerSlide.banner.onmouseover = function  () {
				window.clearInterval(bannerSlide.player);
			}
			bannerSlide.banner.onmouseout = function () {
				bannerSlide.player = window.setInterval(bannerSlide.startCount, 5000);
			}

			// 鼠标点击上一张、下一张按钮
			bannerSlide.prev.onclick = function () {
				bannerSlide.prevPic();
			}
			bannerSlide.next.onclick = function () {
				bannerSlide.nextPic();
			}

			// slide-controls按钮
			for (var i = 0, len = bannerSlide.slideControls.length; i < len; i++) {
				(function (index) {
					bannerSlide.slideControls[index].onclick = function (){
						bannerSlide.num = index;
						bannerSlide.changePic();
					}
				})(i);
			}
		}
	};
	bannerSlide.init();
}