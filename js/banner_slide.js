window.onload = function () {
	 //向左移动元素的方式实现
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
		startCount: function () {
			bannerSlide.num++;
			bannerSlide.changePic();
		},
		changePic: function () {
			var index = bannerSlide.num % bannerSlide.slidesLi.length;

			index = index >= 0 ? index : -index;

			for (var i = 0, len = bannerSlide.slideControls.length; i < len; i++) {
				bannerSlide.slideControls[i].className = "";
			}
			bannerSlide.slideControls[index].className = "sel";

			bannerSlide.startMove(-bannerSlide.slidesLi[0].offsetWidth * index);
		},
		prevPic: function () { //点击向左按钮
			bannerSlide.num--;
			bannerSlide.changePic();
		},
		nextPic: function () { //点击向右按钮
			bannerSlide.num++;
			bannerSlide.changePic();
		},
		startMove: function (target) { 
			window.clearInterval(bannerSlide.bufferPlayer);  //防止发生抖颤
			bannerSlide.bufferPlayer = window.setInterval( function () {
				bannerSlide.doMove(target);	
			}, 10);
		},
		doMove: function (target) {
			var speed = (target - bannerSlide.slides.offsetLeft) / 10; //速度缓冲，speed越来越小
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);  //speed取整数

			if (bannerSlide.slides.offsetLeft === target) {
				window.clearInterval(bannerSlide.bufferPlayer);
			} else {
				bannerSlide.slides.style.left = bannerSlide.slides.offsetLeft + speed + "px";
			}
		},
		init: function () {
			bannerSlide.slides.style.width = bannerSlide.slidesLi[0].offsetWidth * bannerSlide.slidesLi.length + "px";

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