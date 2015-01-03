module.exports = function (grunt) {
  var dependencies = grunt.file.readJSON("dependencies.json");

  // grunt dev target=dev
  var target = "./build";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      options: {
        separator: " "
      },
      dist: {
        src: dependencies.scripts.vendor,
        dest: target + "/scripts/vendor.js"
      },
      app: {
        src: dependencies.scripts.app,
        dest: target + "/scripts/app.js"
      },
      css_vendor: {
        src: dependencies.styles.vendor,
        dest: target + "/css/vendor.css"
      },
      css_app: {
        src: dependencies.styles.app,
        dest: target + "/css/app.css"
      }
    },
    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> */\n"
      },
      dist: {
        files: {
          "dist/<%= pkg.name %>.min.js": ["<%= concat.dist.dest %>"]
        }
      }
    },
    copy: {
      index: {
        files: [
          {
            src: "index.html",
            dest: target + '/../'
        }
        ]
      },
      fonts: {
        files: [
          {
            expand: true,
            cwd: dependencies.assets.fonts,
            src: "*",
            dest: target + "/fonts"
          }
        ]
      },
      html: {
        files: [
          {
            expand: true,
            cwd: 'components',
            src: dependencies.assets.html,
            dest: target + "/html"
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            cwd: dependencies.assets.images,
            src: "*",
            dest: target + "/images"
          }
        ]
      }
    },
    watch: {
      app: {
        files: [dependencies.scripts.app],
        tasks: ["concat:app", "ngAnnotate:app"]
      },
      html: {
        files: [dependencies.assets.html],
        tasks: ["copy:index","copy:html"]
      },
      less: {
        files: [dependencies.assets.less + '/*.less'],
        tasks: ["less:development", "concat:css_app"]
      }
    },
    less: {
      development: {
        options: {},
        files: {
          "assets/css/app.css": dependencies.assets.less + '/app.less'
        }
      },
    },
    ngAnnotate: {
      app: {
        files: [
          {
            src: target + "/js/app.js",
            ext: ".js",
            extDot: 'last', // Extensions in filenames begin after the last dot
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  // https://www.npmjs.org/package/grunt-ng-annotate
  grunt.loadNpmTasks('grunt-ng-annotate');


  // grunt.registerTask("test", ["jshint", "qunit"]);
  grunt.registerTask("default", []);
  grunt.registerTask("dev", ["less","concat", "copy", "ngAnnotate:app", "watch"]);
  grunt.registerTask("release", ["less","concat", "copy", "ngAnnotate:app"]);

};
