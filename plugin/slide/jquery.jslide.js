;(function (factory) {
	'use strict';
	// Register as an AMD module, compatible with script loaders like RequireJS.
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	}
	else {
		factory(jQuery);
	}
}(function ($, undefined) {
	'use strict';
	var defaults = {
		speed : 3000,
		pageCss : 'paginationslide',
		auto: true //自动切换
	};
	
	var nowImage = 0;//现在是哪张图片
	var pause = false;//暂停
	var autoMethod;

	/**
     * @method private
     * @name _init
     * @description Initializes plugin
     * @param opts [object] "Initialization options"
     */
	function _init(opts) {
		opts = $.extend({}, defaults, opts || {});
		// Apply to each element
        var $items = $(this);
        for (var i = 0, count = $items.length; i < count; i++) {
            _build($items.eq(i), opts);
        }
        return $items;
	}
	
	/**
	 * @method private
	 * @name _getSlides
	 * @description 获取幻灯片对象
	 * @param $node [jQuery object] "目标对象"
	 */
	function _getSlides($node) {
		return $node.children('li');
	}
	
	/**
	 * @method private
	 * @name _build
	 * @description Builds each instance
	 * @param $node [jQuery object] "目标对象"
	 * @param opts [object] "插件参数"
	 */
    function _build($node, opts) {
		var $slides = _getSlides($node);
		$slides.eq(0).siblings('li').css({'display':'none'});
		var numpic = $slides.size() - 1;
		
		$node.delegate('li', 'mouseenter', function() {
			pause = true;//暂停轮播
			clearInterval(autoMethod);
		}).delegate('li', 'mouseleave', function() {
			pause = false;
			autoMethod = setInterval(function() {
				_auto($slides, $pages, opts);
			}, opts.speed);
		});
		//console.log(autoMethod)
		var $pages = _pagination($node, opts, numpic);
		
		if(opts.auto) {
			autoMethod = setInterval(function() {
				_auto($slides, $pages, opts);
			}, opts.speed);
		}
	}
	
	/**
	 * @method private
	 * @name _pagination
	 * @description 初始化选择按钮
	 * @param $node [jQuery object] "目标对象"
	 * @param opts [Object] "参数"
	 * @param size [int] "图片数量"
	 */
	 function _pagination($node, opts, size) {
		var $ul = $('<ul>', {'class': opts.pageCss});
		for(var i = 0; i <= size; i++){
			$ul.append('<li>' + '<a href="javascript:void(0)">' + (i+1) + '</a>' + '</li>');
		}
		
		$ul.children(':first').addClass('current');//给第一个按钮选中样式
		var $pages = $ul.children('li');
		$ul.delegate('li', 'click', function() {//绑定click事件
			var changenow = $(this).index();
			_changePage($pages, $node, changenow);
		}).delegate('li', 'mouseenter', function() {
			pause = true;//暂停轮播
		}).delegate('li', 'mouseleave', function() {
			pause = false;
		});
		$node.after($ul);
		return $pages;
	 }
	 
	 /**
	 * @method private
	 * @name _change
	 * @description 选择不同页面按钮显示不同图片
	 * @param $pages [jQuery object] "按钮对象"
	 * @param $node [jQuery object] "目标对象"
	 * @param changenow [int] "要选中的按钮的下标"
	 */
	 function _changePage($pages, $node, changenow){
		var $slides = _getSlides($node);
		_fadeinout($slides, $pages, changenow);
		nowImage = changenow;
	}
	
	 /**
	 * @method private
	 * @name _change
	 * @description 幻灯片显示与影藏
	 * @param $slides [jQuery object] "图片对象"
	 * @param $pages [jQuery object] "按钮对象"
	 * @param next [int] "要显示的下一个序号"
	 */
	 function _fadeinout($slides, $pages, next){
		$slides.eq(nowImage).css('z-index','2');
		$slides.eq(next).css({'z-index':'1'}).show();
		$pages.eq(next).addClass('current').siblings().removeClass('current');
		$slides.eq(nowImage).fadeOut(400, function(){
			$slides.eq(next).fadeIn(500);
		});
	}
	
	/**
	 * @method private
	 * @name _auto
	 * @description 自动轮播
	 * @param $slides [jQuery object] "图片对象"
	 * @param $pages [jQuery object] "按钮对象"
	 * @param opts [Object] "参数"
	 */
	 function _auto($slides, $pages, opts){
		var next = nowImage + 1;
		var size = $slides.size() - 1;
		if(!pause) {
			if(nowImage >= size){
				next = 0;
			}
			
			_fadeinout($slides, $pages, next);
			
			if(nowImage < size){
				nowImage += 1;
			}else {
				nowImage = 0;
			}
		}else {
			clearInterval(autoMethod);//暂停的时候就取消自动切换
		}
	 }
	
	
	$.fn.jslide = function (method) {
		return _init.apply(this, arguments);
    };
}));