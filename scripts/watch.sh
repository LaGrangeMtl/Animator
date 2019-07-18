cd dist
composer update
cd ..
parcel watch 'src/js/index.js' -o dist/animator.min.js --no-hmr &
livereload dist