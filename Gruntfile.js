module.exports = function (grunt) {
    require('jit-grunt')(grunt, {
        configureProxies: 'grunt-connect-proxy'
    });
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        settings: {
            connect: {
                host: 'localhost',
                port: 8070
            },
            proxy: {
                // host: '101.53.157.190',
                host: 'localhost',
                port: 3030
            }
        },
        connect: {
            server: {
                options: {
                    port: 8070,
                    hostname: '*',
                    middleware: function (connect, options, defaultMiddleware) {

                        /*  middleware: function (connect, options, middlewares) {
                                // inject a custom middleware into the array of default middlewares
                            middlewares.unshift(function (req, res, next) {
                                if (req.url !== '/hello/world') return next();

                                res.end('Hello, world from port #' + options.port + '!');
                            });

                            return middlewares;
                        },
                        */
                        var proxy = require("grunt-connect-proxy/lib/utils").proxyRequest;
                        return [
                            proxy
                        ].concat(defaultMiddleware);

                    }
                }
            },
            proxies: [{
                    context: "/golit/odata/app",
                    host: '<%= settings.proxy.host %>',
                    port: '<%= settings.proxy.port %>',
                    headers: {
                        "host": '<%= settings.proxy.host %>',
                        port: '<%= settings.proxy.port %>'
                    },
                    changeOrigin: true,
                    rewrite: {
                        // "^/destinations/Golit": "/hr-odata-modules/golit/dev/odata.svc/"
                        "^/golit/odata/app": "/golit/app/services/"
                    },
                    headers: {
                        "X-Proxied-Header": "*"
                    },
                    ws: true
                }
                // , 
                // {
                // 	context: '/hr-odata-modules',
                // 	host: '<%= settings.proxy.host %>',
                // 	port: '<%= settings.proxy.port %>',
                // 	https: false
                // }
            ]
        },
        concat: {
            /* options:{
                    separator:";"
            }, */
            js: {
                src: [
                    'app-modules/**/*.js',
                    'app-modules/**/*.xml',
                    'app-modules/**/*.json',
                    'app-modules/**/*.html',
                    'app-modules/**/*.properties'

                ],
                dest: 'dist/js/component-preload.js'
            },
            css: {
                src: ['src/css/style1.css',
                    "src/js/**/css/style1.css"
                ],
                dest: 'dist/css/style.css'
            }
        },
        watch: {
            css: {
                files: ['app-modules/**/*.less',
                    'app-modules/**/*.css'
                ],
                tasks: ['concat:css']
            },
            js: {
                files: [
                    'app-modules/**/*.js',
                    'app-modules/**/*.xml',
                    'app-modules/**/*.json',
                    'app-modules/**/*.html',
                    'app-modules/**/*.properties'
                ],
                tasks: ['concat:js']
            },
        }
        // ,
        // jshint: {
        //     all: ['**/js/**/*.js']
        // }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('default', ['configureProxies:server', 'connect', 'watch']);

}