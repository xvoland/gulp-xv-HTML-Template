# Gulp-HTML-Template

This is a template for typical projects that are generated automatically by the GULP (NodeJS).

This is Gulp-template script automatically generates SVG-sprites to bitmap, converts fonts from TTF/OTF to WOFF/WOFF2, converts from SCSS/SASS to CSS-style, optimize CSS-styles, merges and minifies CSS-styles, merges and minifies JavaScripts, compress HTML. And also, gives the ability to edit in a live browser.



Before starting, need to install the packages under console 
>  \> npm i

### Typical file structure
```
./app
	/fonts
		└── *.ttf or *.otf
	/icons
		└── *.svg
	/images
	/js
	/scss
		└── *.scss
		
	index.html
	
gulpfile.js
package.json
```


**Output project structure:**
```
./(project_folder_name)
	└──/css
			style.css
			style.min.css
		
	└──/fonts
			*.woff
			*.woff2
		
	└──/js
			lazysize.js
			lazysize.min.js
			main.js
			main.min.js
		
	└──/images
	
	index.html
	index.min.html
```


## Functions

To generate sprites from folder `./app/images/`
> \> gulp svgSprite

Add all fonts from folder `./app/fonts/` to `./app/scss/fonts.scss`

> \> gulp fontsCSS

## Getting Started

*Clone repo:*

> \> git clone https://github.com/xvoland/Gulp-HTML-Template.git

*Install Packages:*

> \> npm i



The project has been created. Edit files...



*Copy Fonts files to* `./app/fonts/`

*Copy SVG files to* `./app/icons/`

*Generate Sprite image:*

> \> gulp svgSprite

*Generate Fonts CSS:*

> \> gulp fontsCSS

*Run Gulp:*

> \> gulp

**Enjoy editing with Live Update Browser http://localhost:3000**

# Support and Donation

Donate any amount for my projects <a href='https://paypal.me/xvoland'>https://paypal.me/xvoland</a>


You are more than welcome to donate me some beer money :)

<a href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=9D4YBRWH8QURU'><img alt='Click here to lend your support to Extractor and make a donation!' src='https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif' border='0' /></a>

# Copyrights

© 2021, Copyrights Vitalii Tereshchuk at https://dotoca.net