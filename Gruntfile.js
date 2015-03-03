module.exports = function(grunt) {

  // configurações do grunt
  grunt.initConfig({
    // variáveis de diretorio
    dirs: {
      src: 'dev',
      dest: 'dist'
    },

    // compila os arquivos Less
    less: {
      dev: {
        options: {
          paths: ["<%= dirs.src %>/assets/stylesheets/less"]
        },
        files: {
          "<%= dirs.src %>/assets/stylesheets/style.css": "<%= dirs.src %>/assets/stylesheets/less/style.less"
        }
      },
      build: {
        options: {
          paths: ["<%= dirs.src %>/assets/stylesheets/less"],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}), /* autoprefix nos arquivos Less */
            new (require('less-plugin-clean-css'))({advanced: true}) /* minifica o CSS */
          ]
        },
        files: {
          "<%= dirs.dest %>/assets/stylesheets/style.min.css": "<%= dirs.src %>/assets/stylesheets/less/style.less"
        }
      }
    },

    // cria um servidor em localhost:9000
    connect: {
      server: {
        options: {
          port: 9000,
          base: '<%= dirs.src %>',
          hostname: 'localhost',
          livereload: true,
          open: true
        }
      }
    },

    // Verifica se os arquivos estão sofrendo alterações e dispara a task necessária
    watch: {
      options: {
        livereload: true,
        atBegin: true,
        spawn: false
      },
      less: {
        files: ['<%= dirs.src %>/assets/components/bootstrap/less/{,**/}*.less', '<%= dirs.src %>/assets/stylesheets/less/{,**/}*.less'],
        tasks: ['less:dev']
      }
    },

    // limpa o diretório 'dist' para iniciar o build
    clean: {
      build: ['<%= dirs.dest %>']
    },

    // minifica os arquivos JavaScript
    uglify: {
      build: {
        files: {
          '<%= dirs.dest %>/assets/scripts/main.min.js': ['<%= dirs.src %>/assets/scripts/{,**/}*.js']
        }
      }
    },

    // minifica as imagens
    imagemin: {
      build: {
         files: [{
          expand: true,
          cwd: '<%= dirs.src %>/assets/images',
          src: ['{,**/}*.{png,jpg,jpeg,gif}'],
          dest: '<%= dirs.dest %>/assets/images'
        }]
      }
    },

    // substitui comentários no HTML por expressões
    processhtml: {
      build: {
        files: {
          '<%= dirs.dest %>/index.html': ['<%= dirs.src %>/index.html']
        }
      }
    },

    // minifica os arquivos HTML
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '<%= dirs.dest %>/index.html': '<%= dirs.dest %>/index.html'
        }
      }
    },

    // copia arquivos do projeto para pasta de produção
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= dirs.src %>',
          dest: '<%= dirs.dest %>',
          src: [
            'assets/fonts/{,**/}*.*'
          ]
        },
        {
          expand: true,
          flatten: true,
          filter: 'isFile',
          src: ['<%= dirs.src %>/assets/components/bootstrap/dist/js/bootstrap.min.js'],
          dest: '<%= dirs.dest %>/assets/scripts/vendor/bootstrap/'
        },
        {
          expand: true,
          flatten: true,
          filter: 'isFile',
          src: ['<%= dirs.src %>/assets/components/jquery/dist/jquery.min.js', '<%= dirs.src %>/assets/components/jquery/dist/jquery.min.map'],
          dest: '<%= dirs.dest %>/assets/scripts/vendor/jquery/'
        }]
      }
    }

  });

  // modulo Less
  grunt.loadNpmTasks('grunt-contrib-less');
  // modulo connect
  grunt.loadNpmTasks('grunt-contrib-connect');
  // modulo watch
  grunt.loadNpmTasks('grunt-contrib-watch');
  // modulo clean
  grunt.loadNpmTasks('grunt-contrib-clean');
  // modulo uglify
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // modulo imagemin
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // modulo processhtml
  grunt.loadNpmTasks('grunt-processhtml');
  // modulo htmlmin
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // modulo copy
  grunt.loadNpmTasks('grunt-contrib-copy');

  // tarefas
  // responsável por compilar os arquivos Less
  grunt.registerTask('lesstocss', ['less:dev']);

  // responsável por iniciar o servidor local
  grunt.registerTask('server', 'Iniciando servidor e monitoramento', function (target) {
    grunt.task.run(['connect', 'watch']);
  });

  // responsável por realizar o build da aplicação para produção
  grunt.registerTask('build', [
    'clean:build',
    'less:build',
    'uglify:build',
    'imagemin:build',
    'processhtml:build',
    'htmlmin:build',
    'copy:build'
  ]);

};