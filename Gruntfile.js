/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
	  files: ['inpoot.js', 'lib/resources/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        boss: true,
        eqnull: true,
        browser: true
      }
    },
    clean: {
      dirs: [
        'dist',
      ]
    },
    concat: {
      dist: {
        src: ['inpoot.js', 'lib/resources/*.js' ],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    uglify: {
		options: {
		  // the banner is inserted at the top of the output
		  banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
	    },
		dist: {
           files: {
             'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
           }
        }
    }
  });
  
  // Defining a custom task to delete previously generated file before generate them
  grunt.registerTask('clean', 'Clean the previously generated files', function() {
    var dirs = grunt.config('clean').dirs;
 
    for (var i = 0; i < dirs.length; i++) {
      grunt.file.delete(dirs[i]);
      grunt.file.mkdir(dirs[i]);
    }
  });
  
  // Default task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify']);

};
