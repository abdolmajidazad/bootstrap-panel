'use strict';
/**
 * grunt install with npm , npm install -g grunt-cli
 * this project need to install several grunt task
 * all task need show in list
 * *1*  npm install grunt-contrib-concat --save-dev   @for concat js file
 * *2*  npm install babel-cli babel-preset-es2015 --save-dev @for convert all es6 syntax to es5
 * *3*  npm install grunt-concat-css --save-dev @for concat css file
 * *4*  npm install grunt-ng-annotate --save-dev @for set angular function before uglify it
 * *5*  npm install grunt-contrib-uglify --save-dev @for minify and uglify js file
 * *6*  npm install grunt-contrib-watch --save-dev @for listen on changes in file and rebuild project   //https://github.com/gruntjs/grunt-contrib-watch
 * *7*  npm install grunt-postcss pixrem autoprefixer cssnano --save-dev  @for minimize css file and remove all css is repeated in file //https://github.com/nDmitry/grunt-postcss
 * *8*  npm install --save-dev time-grunt @for get time of any task and monitor it //https://github.com/sindresorhus/time-grunt
 * *9*  npm install --save-dev grunt-config @for set config of tun grunt , such as development mode or production mode //https://github.com/outaTiME/grunt-config#environment-variable-in-source-with-grunt-replace
 * *10* npm install --save-dev grunt-replace @for replace variable in project  , such as @@environment || @@timeStampVersion //https://github.com/outaTiME/grunt-replace
 *
 * how to run project?
 * before npm install in project path run this task in terminal
 * in development mode run ==> grunt    @after run grunt in development mode run watch for rebuild project hen changes file
 * in production mode run  ==> grunt prod --target=prod
 *
 *
 * what occur after run grunt?
 * set config file for load project in development or production mode copy ./config.js to ./views/resource/js/config.js
 * copy needed file form ./bower_components   to   ./src/main/webapp/library/bower_components
 * concat all js file in ./components/directives and copy in ./src/main/webapp/library/bundle with bundle.js
 * copy all html file in ./components/directives to ./src/main/webapp/library/bundle/html
 * copy and concat css file in this path  ./src/main/webapp/views/resource/css/   with this name bundle.1.css and  bundle.2.css
 * copy all file in./views/resource/js to ./src/main/webapp/views/resource/js
 * copy all file in ./views/resource/json to ./src/main/webapp
 * create min js file and uglify it in all folder in this path ./src/main/webapp/views/pages and ./src/main/webapp/views/tpl
 *
 * @param grunt
 */
module.exports = function (grunt) {
    var target = grunt.option('target') || 'dev';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        /**
         * for set project environment
         * environment contains development | production
         *
         * when run grunt in terminal load dev variable
         * when run grunt prod --target=prod load prod variable
         */
        config: {
            dev: {
                options: {
                    variables: {
                        'environment': 'development'
                    }
                }
            },
            prod: {
                options: {
                    variables: {
                        'environment': 'production'
                    }
                }
            }
        },


        /**
         * for replace variable in project
         *
         * when run with replace:first load first variable and change any @@environment  in project to development | production
         * when run with replace:second load second variable abd change all @@timeStampVersion in project to new Date().getTimestamp()
         */
        replace: {
            first: {
                    options: {
                        variables: {
                            'environment': '<%= grunt.config.get("environment") %>',
                        },
                        force: true
                    },
                    files: [
                        {expand: true, flatten: true, src: ['config.js'], dest: './views/resource/js/'},
                    ]
                },
            second: {
                    options: {
                        variables: {
                            'timeStampVersion' : new Date().getTime()
                        },
                        force: true
                    },
                    files: [
                        {expand: true, flatten: true, src: ['./src/main/webapp/views/resource/js/app.js'], dest: './src/main/webapp/views/resource/js/'},
                        {expand: true, flatten: true, src: ['./src/main/webapp/library/bundle/bundle.js'], dest: './src/main/webapp/library/bundle/'},
                        {expand: true, flatten: true, src: [
                            './views/resource/json/files.json'
                        ], dest: './src/main/webapp/'},
                    ]
                }

        },


        // 'json-minify': {
        //     build: {
        //         files: 'src/main/webapp/offlineCity.json'
        //     }
        // },

        /**
         * for concat all js file in this path and generate bundle.js file
         */
        concat: {
            dist : {
                files :[
                    {
                        src: [
                            'components/**/*.js',
                            '!components/**/CVS/Base/*.js'
                        ],
                        dest: 'src/main/webapp/library/bundle/bundle.js'
                    }
                ]
            }
        },


        /**
         * concat all css file show in list and generate bundle.css
         */
        concat_css: {
            options: {},
            dist: {
                files: {
                    'src/main/webapp/views/resource/css/bundle.css': [
                        'src/main/webapp/views/resource/css/fonts.css',
                        'src/main/webapp/views/resource/css/theme.css',
                        'src/main/webapp/views/resource/css/components.css',
                        'src/main/webapp/views/resource/css/main.css',
                        'src/main/webapp/views/resource/css/menu.css'
                    ]
                }
            }
        },


        /**
         * copy all file in all path show in list
         * when run copy:main ,copy files in path list set in main variable
         * when run copy:bower ,copy all file need in bower_components path
         */
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'components/directives/**/views/*.html',
                            'components/directives/**/views/pagination/*.html',
                            '!components/directives/**/CVS/Base/*.html'
                        ],
                        dest: 'src/main/webapp/library/bundle/html/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'views/resource/js/**/*.js',
                            '!views/resource/js/CVS/**/*.js',
                            // '!views/resource/js/app.js'

                        ],
                        dest: 'src/main/webapp/views/resource/js/'
                    }
                ]
            },
            bower: {
                files: [

                    {
                        expand: true,
                        src: [
                            'bower_components/**/dist/*.js',
                            'bower_components/**/dist/*.css',
                            'bower_components/**/dist/**/*.css',
                            'bower_components/**/dist/*.map',
                            'bower_components/**/*.min.js.map',
                            'bower_components/**/*.min.js',
                            'bower_components/crypto-js/*.js',
                            '!bower_components/popper.js/docs/**',
                            '!bower_components/popper.js/dist/esm/**',
                            '!bower_components/popper.js/dist/umd/**',
                            'bower_components/nprogress/nprogress.css',
                            'bower_components/nprogress/nprogress.js',
                            'bower_components/persian-datepicker/dist/css/persian-datepicker-0.4.5.css',
                            'bower_components/persian-datepicker/lib/persian-date.js',
                            'bower_components/angular-bootstrap-contextmenu/contextMenu.js'

                        ],
                        dest: 'src/main/webapp/library/'
                    }
                ]
            }
        },


        /**
         * convert all js file from es6 to es5
         */
        babel: {
            options: {
                sourceMap: false
            },
            dist: {
                files: [{
                    "src/main/webapp/library/bundle/bundle.js": "src/main/webapp/library/bundle/bundle.js"
                },
                {
                    expand: true,
                    src: [
                        'src/main/webapp/views/pages/**/*.js',
                        '!src/main/webapp/views/pages/**/*.min.js'
                    ],
                    dest: '',
                    ext:  '.min.js'
                },
                {
                    expand: true,
                    src: [
                        'src/main/webapp/views/tpl/**/*.js',
                        '!src/main/webapp/views/tpl/**/*.min.js'
                    ],
                    dest: '',
                    ext:  '.min.js'
                },
                {
                    expand: true,
                    src: [
                        'src/main/webapp/views/resource/js/app.js',
                        '!src/main/webapp/views/resource/js/app.min.js'
                    ],
                    dest: '',
                },
                {
                    expand: false,
                    src: [
                        'views/resource/js/init.js',
                    ],
                    dest: 'src/main/webapp/views/resource/js/init.js',
                }
                ]
            }
        },


        /**
         * for angular parameter in minify and uglify mode
         */
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: [
                    {
                        'src/main/webapp/library/bundle/bundle.js': [
                            'src/main/webapp/library/bundle/bundle.js'
                        ]
                    }
                    ,{
                        expand: true,
                        src: ['src/main/webapp/views/pages/**/*.min.js'],
                        dest: ''
                    }
                    ,{
                        expand: true,
                        src: ['src/main/webapp/views/tpl/**/*.min.js'],
                        dest: ''
                    }
                    ,{
                        expand: true,
                        src: ['src/main/webapp/views/resource/js/app.js'],
                        dest: ''
                    }
                ]
            }

        },

        /**
         * minify and uglify all js file defined in list
         * when load uglify in dev mode all file copy without change
         * when load uglify in prod mode all file minify and uglify and remove all command and console.log
         */
        uglify: {
            prod:{
                options: {
                    compress: {
                        drop_console: true
                    }
                },
                files:[
                    {
                        src: [
                            'src/main/webapp/library/bundle/bundle.js'
                        ],
                        dest: 'src/main/webapp/library/bundle/bundle.js'
                    },
                    {
                        expand: true,
                        src: ['src/main/webapp/views/pages/**/*.min.js'],
                        dest: ''
                    },
                    {
                        expand: true,
                        src: ['src/main/webapp/views/tpl/**/*.min.js'],
                        dest: ''
                    },
                    {
                        expand: true,
                        src: [
                            'src/main/webapp/views/resource/js/*.js',
                            '!src/main/webapp/views/resource/js/bootstrapProject.js',
                            '!src/main/webapp/views/resource/js/browserCompatibility.js'
                        ],
                        dest: ''
                    },
                ]
            },
            dev : {}
        },


        /**
         * minify all css file and remove any class or css extera repeated
         */
        postcss: {
            options: {
                map: false, // inline sourcemaps
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                files: {
                    'src/main/webapp/views/resource/css/bundle.css': 'src/main/webapp/views/resource/css/bundle.css'
                }
            }
        },


        // https://github.com/gruntjs/grunt-contrib-htmlmin
        // npm install grunt-contrib-htmlmin --save-dev
        // grunt.loadNpmTasks('grunt-contrib-htmlmin');
        // htmlmin: {                                     // Task
        //     dist: {                                      // Target
        //         options: {                                 // Target options
        //             removeComments: true,
        //             collapseWhitespace: true
        //         },
        //         files: [{
        //             expand: true,
        //             src: [
        //                 'src/main/webapp/views/pages/appVisitorsMobileDevices/appVisitorsMobileDeviceTests.html'
        //             ],
        //             dest: ''
        //         }]
        //     }
        // },



        /**
         * listen on file define in list
         * after change any one , rebuild project
         */
        watch: {
            options: {
                livereload: true
            },
            site:{
                files: [
                    'components/**/*.js',
                    'components/**/*.html',
                    'components/**/*.css',
                    'views/resource/js/*.js',
                    'src/main/webapp/views/**/*.css',
                    'src/main/webapp/views/**/*.js',
                    '!src/main/webapp/views/**/*.min.js',
                    'src/main/webapp/views/**/*.html',
                    'src/main/webapp/index.html',
                    'src/main/webapp/library/i18n/*.json'

                ],
                tasks: ['concat','concat_css','copy:main','babel','ngAnnotate','replace:second']//,'uglify:'+target, ,'postcss'
            }
        }
    });


    /**
     * this task for sho time of any task run in grunt
     */
    require('time-grunt')(grunt, (stats, done) => {
        done();
    });


    /**
     * initialize all task need in grunt
     */
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-config');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-postcss');
    // grunt.loadNpmTasks('grunt-run');
    // grunt.loadNpmTasks('grunt-json-minify');
    // grunt.loadNpmTasks('grunt-contrib-htmlmin');

    console.log("target : " , target);
    // grunt.registerTask('default', ['config:'+target, 'replace','concat','concat_css','cssmin','copy:bower','copy:main','babel','ngAnnotate','watch']);//,'uglify:'+target
    grunt.registerTask('default', ['config:'+target,'replace:first', 'concat','concat_css','copy:bower','copy:main','babel','ngAnnotate','replace:second','watch']);//,'uglify:'+target, ,'postcss'
    // grunt.registerTask('default', ['config:'+target, 'replace','concat','concat_css','copy:bower','copy:main','babel','ngAnnotate','uglify:'+target ,'postcss']);//,'uglify:'+target, ,'postcss'
    grunt.registerTask('prod', ['config:'+target,'replace:first','concat','concat_css','copy:bower','copy:main','babel','ngAnnotate','uglify:'+target ,'postcss', 'replace:second']);//,'uglify:'+target, ,'postcss','htmlmin'

};