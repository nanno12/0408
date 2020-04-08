/**
 * 卫宁健康--LIS0
 * @Author winning
 * @Data 2017-4-1
 *
 */
var _lis60={
	//状态
	data:{
		_interId:"",
		_myVers:"V1.0.0"
	},
	//初始化
	init:function(){
		this.myAlert();
		this.winEvent();
		this.winResize();
		this.myIndex();
	},
	myAlert:function(){
		//alert(1);
	},
	winEvent:function(){
		$(document).on("click", function() {

		});
	},
	/*index*/
	myIndex:function(){
		$(".left-m1").on("click",function(){
			var $this=$(this);
			$(this).toggleClass("active");
			$(".left-m13:visible").parent().removeClass("active").end().stop().slideUp();
			$(this).find(".left-m13").stop().slideToggle();
		});
		$(".biji .icon-biji").on("click",function(){
			$(".slide-cnt").animate({left:"0px"});
			return false;
		});
		$(".icon-bacu,.icon-chxi").on("click",function(){
			$(".slide-cnt").animate({left:"-410px"});
		});
		$(".left-m").height($(".right").height()-134);
		/*menu-switch*/
		$(".left-b li").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
		});

		$(".slide-cnt li>input").hover(function(){
			$(this).select().removeAttr("readonly");
		},function(){
			$(this).attr("readonly");
			}
		);
		$(".sbar-t2").click(function(){
			$(".sbar-t1 li").toggleClass("disshow");
		})
        $(".sbar-t3 .icon-yiqi").click(function(){
            $(".sbar-t3 dd").toggleClass("disshow");
        })
        $(".header .icon-cada").on("click",function(){
        	$(this).toggleClass("active");
        	$(".menu").toggleClass("out");
        });
        $(".menu .link").on("click",function(){
        	$(".menu>li").each(function(index,ele){
        		$(ele).removeClass("open");
        		$(ele).find("ul").stop().slideUp();
        	});
        	$(this).parent().toggleClass("open").end().next("ul").stop().slideToggle();
        });
      	/*动态加载数据*/
      	$(".left-m").scroll(function(){
      		var $this =$(this),
		        viewH =$(this).height(),//可见高度
		        contentH =$(this).get(0).scrollHeight,//内容高度
		        scrollTop =$(this).scrollTop();//滚动高度
	        if(scrollTop/(contentH -viewH)>=0.99){ //到达底部100px时,加载新内容
	        	console.log(1);
	        	$(".left-m").append("<div class='aac'></div>");
	        }
	    });
	      /*输入框*/
	    $(".left-t1>input").focus(function(){
	     	console.log(1);
	     	$(".left-down").slideToggle();
	    },function(){
	     	console.log(2);
	    });
	    /*左边输入框*/
	   $(".left-t1>input").keydown(function(){
			if(!$(".left-down").is(":visible")) {
				$(".left-down").slideDown();
			}
		});
		$(".left-t1 i").on("click",function(event){
			var _ev=event||window.event;
			$(this).toggleClass("open");
			if(!$(".left-menu").is(":visible")) {
				$(".left-menu").slideDown();
				$(".left-down").hide();
			}else{
				$(".left-menu").slideUp();
			}
			_ev.stopPropagation();
		});
	},
	winResize:function(){
		$(".left-m").height($(".right").height()-134);
		$(window).resize(function(){
			$(".left-m").height($(".right").height()-134);
		});
		$(window).click(function(){
			if($(".left-down").is(":visible")) {
				$(".left-down").slideUp();
			}
			$(".left-menu").slideUp();
		});
	}
}
