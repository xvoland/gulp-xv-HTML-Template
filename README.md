# Gulp-HTML-Template

This is a template for typical projects that are generated automatically by the GULP (NodeJS).

Before starting, need to install the packages under console 
>  \> npm i

### Typical file structure
```
./app
	/css
	/fonts
	/icons
	/images
	/js
	/scss
	index.html
	
gulpfile.js
package.json
```


**Output project structure:**
```
./(project_folder_name)
	/css
		style.css
		style.min.css
		
	/fonts
		*.woff
		*.woff2
		
	/js
		lazysize.js
		lazysize.min.js
		main.js
		main.min.js
		
	/images
	
	index.html
```


## Functions

To generate sprites from folder `./app/images/`
> \> gulp svgSprite

Add all fonts from folder `./app/fonts/` to `./app/scss/fonts.scss`

> \> gulp fontsCSS