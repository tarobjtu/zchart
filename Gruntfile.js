'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        data : {
            dist : 'dist',
            src : 'src'
        },
        less: {
            compile: {
                src : '<%= data.src %>/less/zchart.less',
                dest : '<%= data.dist %>/zchart.css'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: '<%= data.src %>/**/*.less',
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'watch']);
};
