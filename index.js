/**
 * Add css postfix 42px
 * @author Lonefy@foxmail.com
 */
'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var minimatch = require("minimatch");


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

   
        var path = file.path.replace(/\\/g, "/")//for winPath

        path = path.substr(path.indexOf('/css/') + 5);
        
        if(isHas(options.filter, path)){
          
            var endLine = path.replace(/\.css$/g,'');

            endLine = ["#S","CSS"].concat(endLine.split('/')).join("_") + '{height:42px;}';

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
        
            flag |= minimatch(text, filter[i]);

            if(flag) return true;
        }

        return false;
    }
};
