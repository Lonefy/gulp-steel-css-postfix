# gulp-steel-css-postfix
use glob pattern to filter your file path;

the fliter could also be Array or String, like:
{filter:['pages/*.*']}
{filter:'lib/*.*'}

In your gulpfile, you can use in this way
    .pipe($.steelCssPostfix({
        filter:['lib/*.*','pages/*.*']
    }))
    
