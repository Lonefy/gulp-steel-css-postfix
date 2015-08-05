/**
 * Add css postfix 42px
 * @author Lonefy@foxmail.com
 */
'use strict';
var through = require('through2');
var gutil = require('gulp-util');

module.exports = function (options) {
    options = options || {};
    return through.obj(function (file, enc, cb) {

        var self = this;

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('css_postfix', 'Streaming not supported'));
            return cb();
        }

        var path = file.path.replace(/\\/g, "/").replace(/\.css$/g,'');//for winPath
        path = path.substr(path.indexOf('/css/') + 5);
    
        if(isHas(options.filter, path)){

            //generate endline 
            var endLine = path;

            endLine = ["#S","CSS"].concat(endLine.split('/')).join("_") + '{height:42px;}';

            //console.log(endLine);
            var content = file.contents.toString() + endLine;

            file.contents = new Buffer(content);
        
        }
        self.push(file);
        cb();
    });


    function isHas(filter, text){
        if(!filter) return true;
        
        var flag = false;
        filter = [].concat(filter);
          
        for(var i=0, len=filter.length; i<len; i++){

            var _f = filter[i];
            if(typeof _f == 'string'){
                flag |= text.indexOf(_f) == -1? false: true;
            }
            else{
                flag |= _f.test(text);
            }

            if(flag) return true;
        }

        return false;
    }
};
