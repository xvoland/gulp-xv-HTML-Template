# Gulp-xv-HTML-Template

This is a template for typical projects that are generated automatically by the [Gulp](https://gulpjs.com/) (Node.js).

This is Gulp-template script automatically:
* using templates in HTML `@@include('_filename.html')`
* compress HTML
* converts from `SCSS/SASS` to CSS-style
* optimize CSS-styles
* merges and minifies CSS-styles
* using templates in JavaScript `@@include('_filename.js')`
* merges and minifies JavaScripts
* generates SVG-sprites to bitmap
* create WEBP images and replace `<img>` tag to `<picture>`
* converts fonts from `TTF/OTF` to `WOFF/WOFF2`

and also, gives the ability to edit in a live browser.



Before starting, need to install the packages under console 
```bash
> npm i
```

### Typical file structure
```bash
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
```bash
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
```bash
> gulp svgSprite
```

Add all fonts from folder `./app/fonts/` to `./app/scss/fonts.scss`
```bash
> gulp fontsCSS
```

## Getting Started

*Clone repo:*
```bash
> git clone https://github.com/xvoland/Gulp-HTML-Template.git
```

*Install Packages:*
```bash
> npm i
```


The project has been created. Edit files...



*Copy Fonts files to* `./app/fonts/`

*Copy SVG files to* `./app/icons/`

*Generate Sprite image:*
```bash
> gulp svgSprite
```

*Generate Fonts CSS:*
```bash
> gulp fontsCSS
```

*Run Gulp:*
```bash
> gulp
```

**Enjoy editing with Live Update Browser http://localhost:3000**

# Support and Donation

I’ll continue to work and improve the script features regardless of the outcome of funding, because it's rewarding to see that people are using it and it does the job for them. Still I would appreciate your support in covering some of the expenses with the domain hosting and programming hours which are taken from my family time.

Donate any amount for my projects <a href='https://paypal.me/xvoland'>https://paypal.me/xvoland</a>


<a href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=9D4YBRWH8QURU'><img alt='Click here to lend your support to Extractor and make a donation!' src='https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif' border='0' /></a>

# Copyrights

© 2021, Copyrights Vitalii Tereshchuk at https://dotoca.net