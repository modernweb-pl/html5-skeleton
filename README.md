# HTML5 Skeleton [![dependencies][deps-badge]][deps] [![devDependencies][dev-deps-badge]][dev-deps]

Simple skeleton app for quick development of multi page HTML5 websites.

## Contents
- NPM
- Bootstrap 3 (SASS)
- Spritesmith
- Font Awesome
- jQuery
- Gulp
- Browserify

## Setup
```
npm install
gulp server
```

Open http://localhost:9000/ in your browser and you're ready to go! :)

## Release History

* 2018-02-17   **0.3.1**
  * added [partialify](https://github.com/bclinkinbeard/partialify)
  * updated dependencies + package-lock.json
  * `zip` gulp task separated
  * npm scripts (start, build, zip)
  * fixes and improvements
* 2015-09-04   **0.3.0**
  * Huge migration:
    * grunt -> gulp
    * compass -> node-sass + spritesmith
    * bower -> npm
    * (nothing) -> browserify
* 2015-02-22   **0.2.1**
  * Fix sprites
* 2014-06-14   **0.2.0**
  * Include html partials and replace variables
  * bootstrap updated to 3.1.1
  * build date in dist files
* 2015-06-13   **0.1.0**   Initial version.

[deps]: https://david-dm.org/Hagith/html5-skeleton
[deps-badge]: https://img.shields.io/david/Hagith/html5-skeleton.svg
[dev-deps]: https://david-dm.org/Hagith/html5-skeleton?type=dev
[dev-deps-badge]: https://img.shields.io/david/dev/Hagith/html5-skeleton.svg
