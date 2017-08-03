if($("input").is("#phone")) {
  $("#phone").mask("+7 (999) 999-99-99");
}

var textarea = document.querySelector('.free-question textarea');
if(textarea != null) {
  textarea.addEventListener('focus', showOpacity);
}


var opacity = document.querySelector('.opacity');
var close = document.querySelector('.free-question .close');
if(opacity != null) {
  opacity.addEventListener('click', hideOpacity);
}
if(close != null) {
  close.addEventListener('click', hideOpacity);
}


function showOpacity() {
	if(document.querySelector('.opacity').classList.contains('opacity-show')) {

	} else {
		document.querySelector('.opacity').classList.add('opacity-show');
	}

	if(document.querySelector('.opacity').classList.contains('opacity-show')) {

	} else {
		document.querySelector('.opacity').classList.add('opacity-show');
	}
	
	if(document.querySelector('.free-question .close').classList.contains('close-open')) {

	} else {
		document.querySelector('.free-question .close').classList.add('close-open');
	}

}

function hideOpacity() {
	document.querySelector('.opacity').classList.remove('opacity-show');
	document.querySelector('.free-question .close').classList.remove('close-open');
}

var Menu = {

  el: {
    ham: $('.hamburger'),
    menuTop: $('.hamburger__top'),
    menuMiddle: $('.hamburger__middle'),
    menuBottom: $('.hamburger__bottom'),
    menuHeader: $('.header .menu')
  },
  
  init: function() {
    Menu.bindUIactions();
  },
  
  bindUIactions: function() {
    Menu.el.ham
        .on(
          'click',
        function(event) {
        Menu.activateMenu(event);
        event.preventDefault();
      }
    );
  },
  
  activateMenu: function() {
    Menu.el.menuTop.toggleClass('hamburger__top-click');
    Menu.el.menuMiddle.toggleClass('hamburger__middle-click');
    Menu.el.menuBottom.toggleClass('hamburger__bottom-click');
    if(Menu.el.menuHeader.hasClass('menu-active')) {
    	Menu.el.menuHeader.slideUp(550);
    	Menu.el.menuHeader.removeClass('menu-active');
    } else {
    	Menu.el.menuHeader.slideDown(550);
    	Menu.el.menuHeader.addClass('menu-active');
    }
  }
};

Menu.init();

$(window).resize(function(){

	if(window.innerWidth >= 780) {
		Menu.el.menuHeader.removeAttr('style');
		Menu.el.menuHeader.removeClass('menu-active');
		Menu.el.menuTop.removeClass('hamburger__top-click');
    	Menu.el.menuMiddle.removeClass('hamburger__middle-click');
    	Menu.el.menuBottom.removeClass('hamburger__bottom-click');
	}

});