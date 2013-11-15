/*
 * siapa
 * http://github.com/hariadi/siapa
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
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*_test.js']
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
