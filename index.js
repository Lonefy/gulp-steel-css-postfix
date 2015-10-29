/**
 * Add css postfix 42px
 * @author Lonefy@foxmail.com
 */
'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var minimatch = require("minimatch");
var path = require('path');

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

        var p = file.path.replace(/\\/g, "/")
          , filepost = path.extname(p);

        if(filepost !== '.css'){
            return cb();
        }

        var reg = new RegExp(file.base.replace(/\\/g, "/"),'g');
        
        p = p.replace(reg,"");
        if(isHas(options.filter, p)){
            
            var endLine = p.replace(/\.\w+$/g, "");

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
