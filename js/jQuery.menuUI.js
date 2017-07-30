(function( $ ) {
	'use strict';
	$.fn.menuUI = function(data, options) {
		const menuUI = {
			json: {brand : 'Brand', menu: [{
				id: 'home',
				value: 'Home',
				icon: 'glyphicon glyphicon-home'
			}]},
			defaults : {
				theme: {nav: 'navbar navbar-default navbar-fixed-top'},
				action: 'click',
				debug: false
			},
			template: {
				navbarHor : '<nav class="navbar navbar-default navbar-fixed-top" role="navigation"> <div class="container-fluid"> <div class="navbar-header navbar-header-top"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand">$brand</a> </div> </div> </nav>',
				navbarVer : '<div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand">$brand</a> </div> <div class="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1"> <ul class="nav navbar-nav"> $menuUI </ul> </div> </div>',
				menuItem : '<li id="$id"><a>$value<span class="pull-right hidden-xs showopacity $icon"></span></a></li>',
				subMenu: '<li id="$id" class="dropdown"> <a class="dropdown-toggle" data-toggle="dropdown">$value <span class="caret"></span><span  class="pull-right hidden-xs showopacity $icon"></span></a> <ul class="dropdown-menu forAnimate" role="menu"> $submenu </ul> </li>',
				subMenuItem : '<li id="$id"><a>$value</a></li>'
			}
		};
		var option = $.extend({}, menuUI.defaults, options);
		var jsonData = $.extend({}, menuUI.json, data);
		var debug = function (i, str){option.debug ? console.log("debug : "+ str || '' +" : ", i) : console.log()};
		//debug(option);
		//debug(jsonData);
		var setSubMenu = function(subMenuData){
			var subMenuItems = '';
			var subMenu = menuUI.template.subMenu.replace('$id', subMenuData.id || '').replace('$value', subMenuData.value || '').replace('$icon', subMenuData.icon || '');
			for (var liData of subMenuData.submenu) {
				var subMenuItem = '';
				subMenuItem = menuUI.template.subMenuItem.replace('$id', liData.id || '').replace('$value', liData.value || '');
				subMenuItems +=subMenuItem;
			}
			return subMenu.replace('$submenu', subMenuItems || '');
		};
		var $self = $(this);

		var navbarHor = menuUI.template.navbarHor, navbarVer = menuUI.template.navbarVer, menuItems = '';
		navbarHor = navbarHor.replace("$brand", jsonData.brand);
		for (var liData of jsonData.menu) {
			var menuItem = '';
			liData.submenu ? (
				menuItem = setSubMenu(liData)
			) : (
				menuItem = menuUI.template.menuItem.replace('$id', liData.id || '').replace('$value', liData.value || '').replace('$icon', liData.icon || '')
			);
			menuItems += menuItem;
		}
		navbarVer = navbarVer.replace("$menuUI", menuItems || '');
		//debug(navbarVer, 'menu items');

		$self.addClass('navbar navbar-default sidebar').attr('role', 'navigation');
		$self.prepend(navbarHor);
		$self.append(navbarVer);
		debug($self, "final element");
		return this;
	};

})(jQuery );
