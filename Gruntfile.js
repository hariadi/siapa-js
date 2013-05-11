/*
 * malay-name-parser
 * http://github.com/hariadi/malay-name-parser
 *
 * Copyright (c) 2013 Hariadi Hinta
 * MIT License
 */

module.exports = function(grunt) {

'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Configuration to be run (and then tested).
    coffee: {
      parser: {
        expand: true,
        cwd: 'src/lib',
        src: [
          '*.coffee'
        ],
        dest: 'lib/',
        ext: '.js'
      },
      tests: {
        expand: true,
        cwd: 'src/test',
        src: ['**/*.coffee'],
        dest: 'test/',
        ext: '.js'
      }
    },

    // Run mocha tests.
    mochaTest: {
      files: ['test/*_test.js']
    },
    mochaTestConfig: {
      options: {
        reporter: 'spec'
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Build templates using parser and run all tests.
  grunt.registerTask('test', [
    'mochaTest'
  ]);

  // Build templates using parser and run all tests.
  grunt.registerTask('default', [
    'coffee',
    'mochaTest'
  ]);
};
