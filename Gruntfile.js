/*global module, process */

module.exports = function (grunt) {
  grunt.initConfig({
    build_num: process.env.BUILD_NUMBER,
    version_log: process.env.ARTIFACT_VERSION_LOG,
    pkg: grunt.file.readJSON('package.json'),
    full_version: '<%= pkg.version %>+build.<%= build_num %>',
    tar_file: 'dataset-landing-page-<%= full_version %>.tar',
    connect_base: grunt.option('connect_base') || 'src',

    clean: {
      dist: ['dist/', 'build/', 'logs/']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',

        // Custom Globals
        globals: {         // additional predefined global variables
          module : true
        }
      },

      with_defaults: ['Gruntfile.js', 'src/js/**/*.js'],

      with_testing_overrides: {
        options: {
          jshintrc: '.jshintrc_for_tests'
        },
        files: {
          src: ['spec/**/*.js']
        }
      }
    },

    mocha_html_require: {
      unit: {
        html: 'build/spec/unit/mocha.html',
        requireConfig: 'spec/unit/helpers/requireConfig.js',
        test: ['spec/unit/**/*spec.js'],
        checkLeaks: false,
        assert: 'chai'
      }
    },

    mocha_phantomjs: {
      unit: {
        options: {
          urls: ['<%= mocha_html_require.unit.html %>']
        }
      }
    },

    mochaWebdriver: {
      phantom: {
        src: ['spec/acceptance/*.js'],
        options: {
          usePhantom: true
        }
      },
      sauce: {
        src: ['spec/acceptance/*.js'],
        options: {
          usePhantom: false,
          username: 'nsidc_dev',
          key: '0f31d51a-33a4-4d08-b070-bf0adbb8a4e5',
          testName: 'Dataset Landing Page',
          browsers: [{
            browserName: 'firefox',
            platform: 'Windows 8',
            version: '20'
          }]
        }
      }
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['index.html',
              'images/*',
              'lib/requirejs/require.js'],
            dest: 'dist/'
          }
        ]
      },
    },

    htmlbuild: {
      dist: {
        src: 'src/index.html',
        dest: 'dist/',
        options: {
          sections: {
            require_config: 'src/templates_htmlbuild/require_config.html'
          }
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/js',
          name: 'main',
          mainConfigFile: 'src/js/requireConfig.js',
          out: 'dist/js/main.js'
        }
      }
    },

    sass: {
      dist: {
        files: {                        // Dictionary of files
          'dist/css/styles.css': 'src/stylesheets/main.scss'     // 'destination': 'source'
        }
      },
      dev: {
        files: {
          'src/css/styles.css': 'src/stylesheets/main.scss'
        }
      }
    },

    compress: {
      main: {
        options: {
          mode: 'tar',
          archive: '<%= tar_file %>'
        },
        expand: true,
        cwd: 'dist/',
        src: ['**'],
        dest: '/'
      }
    },

    watch: {
      js: {
        files: ['Gruntfile.js', 'spec/**/*.js', 'src/js/**/*.js', '!src/lib/**/*.js'],
        tasks: ['lint', 'unit']
      },
      styles: {
        files: ['src/stylesheets/**/*.scss'],
        tasks: ['sass:dev']
      }
    },

    connect: {
      server: {
        options: {
          hostname: '',  // Setting host name to empty string allows port forwarding to work on VMs
          port: 3000,
          base: '<%= connect_base %>',
          keepalive: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-mocha-html-require');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-mocha-webdriver');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('dist', ['copy', 'htmlbuild', 'sass:dist', 'requirejs']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('package', ['dist', 'compress']);
  grunt.registerTask('style', ['sass:dev']);
  grunt.registerTask('unit', ['mocha_html_require:unit', 'mocha_phantomjs:unit']);
  grunt.registerTask('default', ['clean', 'lint', 'unit']);


  // Use ENVIRONMENT and BRANCH env vars to specify which environment these tests should be run against
  grunt.registerTask('acceptance_local', ['mochaWebdriver:phantom']);
  grunt.registerTask('acceptance_sauce', ['mochaWebdriver:sauce']);

  grunt.registerTask('run', ['sass:dev', 'connect']);
};
