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
    }

  });

  // modulo Less
  grunt.loadNpmTasks('grunt-contrib-less');
  // modulo connect
  grunt.loadNpmTasks('grunt-contrib-connect');
  // modulo watch
  grunt.loadNpmTasks('grunt-contrib-watch');

  // tarefas
  // responsável por compilar os arquivos Less
  grunt.registerTask('lesstocss', ['less:dev']);

  // responsável por iniciar o servidor local
  grunt.registerTask('server', 'Iniciando servidor e monitoramento', function (target) {
    grunt.task.run(['connect', 'watch']);
  });

};