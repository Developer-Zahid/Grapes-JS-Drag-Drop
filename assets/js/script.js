(function ($) {
    "use strict"

	/* Document on Load functions */
	$(window).on('load', function () {
        // preLoader();
    });
	/* Document on Resize functions */
	$(window).on('resize', function () {
		// headerHeightFixer();
    });

	/* Preloader init */
	function preLoader(){
		$(".preloader").delay(1000).fadeOut("slow");
	}

	window.matchMedia("(max-width: 500px)").addListener(function(){
		if (x.matches) {
			document.body.style.backgroundColor = "yellow";
		}
	})

	// // Add slideDown animation to Bootstrap dropdown when expanding.
	// $('.dropdown').on('show.bs.dropdown', function() {
	// 	$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
	// });
	
	// // Add slideUp animation to Bootstrap dropdown when collapsing.
	// $('.dropdown').on('hide.bs.dropdown', function() {
	// $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
	// });

	/* Closes responsive menu when a navbar link is clicked */
	$(".nav-link, .dropdown-item").on("click", function (e) {
		if( $(this).hasClass("dropdown-toggle") ){
			e.preventDefault();
		}else{
			$(".navbar-collapse").collapse("hide");
			$("html").removeClass("overflow-hidden");
			$('.offCanvasMenuCloser').removeClass('show');
		}
	});
	$('.navbar-toggler').on('click', function () {
        $("html").toggleClass('overflow-hidden');
        $('.offCanvasMenuCloser').toggleClass('show');
    });
    $('.offCanvasMenuCloser').on('click', function () {
        $(this).removeClass('show');
        $("html").removeClass("overflow-hidden");
    });

	/* Light Mode Toggler Function */
	(function(){
		const themeToggler = $(".theme-toggler");
		let lightMode = localStorage.getItem("lightMode");

		// Enable lightMode Function
		const enableLightMode = () =>{
			// 1. Add the class dark-mode to the html Element
			$('html').addClass('light-mode');
			// 2. Add the class toggle to themeToggler
			themeToggler.addClass("toggle");
			// 3. Update themeToggler aria-label text
			themeToggler.attr("aria-label", "dark mode");
			// 4. Update lightMode in the localStorage
			localStorage.setItem("lightMode", "enabled");
		}

		// Disable lightMode Function
		const disableLightMode = () =>{
			// 1. Remove the class dark-mode to the html Element
			$('html').removeClass('light-mode');
			// 2. Remove the class toggle to themeToggler
			themeToggler.removeClass("toggle");
			// 3. Update themeToggler aria-label text
			themeToggler.attr("aria-label", "light mode");
			// 4. Update lightMode in the localStorage
			localStorage.setItem("lightMode", null);
		}

		// Check localStorage lightMode value
		if(lightMode === "enabled"){
			enableLightMode();
		}

		// Theme Change Event Functions
		themeToggler.on("click", function(){
			lightMode = localStorage.getItem("lightMode");
			if(lightMode !== "enabled"){
				enableLightMode();
			} else{
				disableLightMode();
			}
		})
	})()

})(jQuery);

const editor = grapesjs.init({
	// Indicate where to init the editor. You can also pass an HTMLElement
	container: '#editor',
	// Get the content for the canvas directly from the element
	// As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
	fromElement: true,
	// Size of the editor
	width: 'auto',
	height: '100vh',
	// plugins: ['gjs-preset-webpage'],
    // pluginsOpts: {
    //     'gjs-preset-webpage': {
    //       // options
    //     }
    // },
	blockManager: {
		appendTo: "#blocks-container",
	},
	traitManager: {
		appendTo: "#trait-container"
	},
	layerManager: {
		appendTo: "#layers-container"
	},
	selectorManager: {
		appendTo: "#styles-container"
	},
	styleManager: {
		appendTo: "#styles-container"
	},
	storageManager: {
		id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
		type: 'local',          // Type of the storage
		autosave: true,         // Store data automatically
		autoload: true,         // Autoload stored data on init
		stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
		storeComponents: true,  // Enable/Disable storing of components in JSON format
		storeStyles: true,      // Enable/Disable storing of rules in JSON format
		storeHtml: true,        // Enable/Disable storing of components as HTML string
		storeCss: true,         // Enable/Disable storing of rules as CSS string
	},
	// assetManager: {
	// 	upload: '../../assets/images/',
	// 	uploadName: 'files',
	// },
	deviceManager: {
		devices: [
			{
				name: 'Desktop',
				width: '', // default size
		  	},
			{
				name: 'Laptop',
				width: '991px',
				widthMedia: '991px',
		  	},
			{
				name: 'Tablet',
				width: '767px',
				widthMedia: '767px',
		  	},
		  	{
				name: 'Mobile',
				width: '575px', // this value will be used on canvas width
				widthMedia: '575px', // this value will be used in CSS @media
			},
		]
	},
	panels: {
		defaults: [
			{
				id: 'basic-actions',
  				el: '.builder-header__basic-actions',
				buttons: [
					{
						id: 'visibility',
						tagName: 'button',
						className: 'builder-btn',
						attributes: { 'aria-label': 'show grid' },
						active: true,
						command: 'sw-visibility',
						label: `<i class="bi bi-border"></i>`,
						context: 'basic-actions',
					},
					{
						id: 'preview',
						tagName: 'button',
						className: 'builder-btn',
						attributes: { 'aria-label': 'preview' },
						command: 'preview',
						label: `<i class="bi bi-eye"></i>`,
						context: 'basic-actions',
					},
					{
						id: 'fullscreen',
						tagName: 'button',
						className: 'builder-btn',
						attributes: { 'aria-label': 'fullscreen' },
						command: 'fullscreen',
						label: `<i class="bi bi-arrows-fullscreen"></i>`,
						context: 'fullscreen',
					},
					{
						id: 'export-template',
						tagName: 'button',
						className: 'builder-btn',
						attributes: { 'aria-label': 'show code' },
						command: 'export-template',
						label: `<i class="bi bi-code-slash"></i>`,
						context: 'basic-actions',
					},
					{
						id: 'undo',
						tagName: 'button',
						className: 'builder-btn',
						attributes: { 'aria-label': 'undo' },
						command: function command(editor, sender) {
							sender.set("active", 0);
							editor.UndoManager.undo(1);        
						},
						label: `<i class="bi bi-arrow-counterclockwise"></i>`,
						context: 'basic-actions',
					},
					{
						id: 'redo',
						tagName: 'button',
						className: 'builder-btn',
						attributes: { 'aria-label': 'redo' },
						command: function command(editor, sender) {
							sender.set("active", 0);
							editor.UndoManager.redo(1);
						},
						label: `<i class="bi bi-arrow-clockwise"></i>`,
						context: 'basic-actions',
					},
					{
						id: 'delete',
						tagName: 'button',
						className: 'builder-btn',
						attributes: { 'aria-label': 'delete all' },
						command: 'delete',
						label: `<i class="bi bi-trash"></i>`,
						context: 'basic-actions',
					},
				],
			},
			{
				id: 'panel-devices',
				el: '.builder-header__devices-nav',
				buttons: [
					{
						id: 'device-desktop',
						tagName: 'button',
						className: 'builder-btn',
						attributes: { 'aria-label': 'desktop device' },
						label: `<i class="bi bi-window-desktop"></i>`,
						command: 'set-device-desktop',
						active: true,
						togglable: true,
					},
					{
						id: 'device-laptop',
						tagName: 'button',
						className: 'builder-btn',
						attributes: { 'aria-label': 'laptop device' },
						label: `<i class="bi bi-laptop"></i>`,
						command: 'set-device-laptop',
						active: false,
						togglable: true,
					},
					{
						id: 'device-tablet',
						tagName: 'button',
						className: 'builder-btn',
						attributes: { 'aria-label': 'tablet device' },
						label: `<i class="bi bi-tablet"></i>`,
						command: 'set-device-tablet',
						active: false,
						togglable: true,
					},
					{
						id: 'device-mobile',
						tagName: 'button',
						className: 'builder-btn',
						attributes: { 'aria-label': 'phone device' },
						label: `<i class="bi bi-phone"></i>`,
						command: 'set-device-mobile',
						active: false,
						togglable: true,
					},
				],
			}
		]
	},
	plugins: ['grapesjs-blocks-bootstrap4'],
	pluginsOpts: {
	  'grapesjs-blocks-bootstrap4': {
		blocks: {
		  // ...
		},
		blockCategories: {
		  // ...
		},
		labels: {
		  // ...
		},
		// ...
	  }
	},
	canvas: {
	  styles: [
		'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
	  ],
	  scripts: [
		'https://code.jquery.com/jquery-3.3.1.slim.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
		'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
	  ],
	},
});


// Commands
const commands = editor.Commands;
commands.add('undo', {
	run: function (editor, sender) {
		sender.set("active", false);
		editor.UndoManager.undo(1);
	}
});
commands.add('redo', {
	run: function (editor, sender) {
		sender.set("active", false);
		editor.UndoManager.redo(1);
	}
});
commands.add('set-device-desktop', {
	run: editor => editor.setDevice('Desktop')
});
commands.add('set-device-laptop', {
	run: editor => editor.setDevice('Laptop')
});
commands.add('set-device-tablet', {
	run: editor => editor.setDevice('Tablet')
});
commands.add('set-device-mobile', {
	run: editor => editor.setDevice('Mobile')
});
commands.add('delete', {
	run: editor =>{
		editor.DomComponents.clear();
		editor.CssComposer.clear();
	}
});
editor.on('run:preview', () => {
	editor.DomComponents.getWrapper().onAll(comp => 
		comp.is('text') && comp.set({ editable: false })
	);
});
editor.on('stop:preview', () => {
	editor.DomComponents.getWrapper().onAll(comp => 
		comp.is('text') && comp.set({ editable: true })
	);
});
editor.Panels.getPanels().forEach(item => console.log(item));
console.log(editor.DomComponents.Components);