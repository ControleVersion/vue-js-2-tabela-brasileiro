import Vue from 'vue'
import {Time} from './time';
import _ from 'lodash';
require('style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');
let meuVue = new Vue({
  el: '#app',
  data: {
    order:{
      keys: ['pontos', 'gm', 'gs'],
      sort: ['desc', 'desc','asc']
    },
    filter: '',
    colunas: ['escudo','nome', 'pontos', 'gm', 'gs', 'saldo'],
    times:
      [
        new Time("Atlético Mineiro",require('./img/atletico_mineiro.png')),
        new Time("Avaí",require('./img/avai.gif')),
        new Time("Atlético Goianiense",require('./img/atletico_goianiense.png')),
        new Time("Atlético Paranaense",require('./img/atletico_paranaense.png')),
        new Time("Bahia",require('./img/bahia.png')),
        new Time("Botafogo",require('./img/botafogo.gif')),
        new Time("Chapecoense",require('./img/chapeco.png')),
        new Time("Vasco",require('./img/vasco.png')),
        new Time("Vitória",require('./img/vitoria.png'))

      ],
      novoJogo: {
        casa: {
          time: null,
          gols: 0
        },
        fora: {
          time: null,
          gols: 0
        }
      },
      view: 'tabela'
  },
  methods: {
    fimJogo(event){
      let timeAdversario =this.novoJogo.fora.time;
      let gols =this.novoJogo.casa.gols;
      let golsAdversario =this.novoJogo.fora.gols;
      this.novoJogo.casa.time.fimJogo(timeAdversario, gols, golsAdversario);
      this.showView('tabela');
    },
    createNovoJogo(){
      let indexCasa = Math.floor( Math.random() * 9 );
      let  indexFora = Math.floor( Math.random() * 9 );

          this.novoJogo.casa.time = this.times[indexCasa]; //setters
          this.novoJogo.casa.gols = 0;
          this.novoJogo.fora.time = this.times[indexFora];
          this.novoJogo.fora.gols = 0;
          this.showView('novoJogo');
    },
    showView(view){
      this.view = view;
    },
    sortBy(coluna){
      this.order.keys = coluna;
      this.order.sort = this.order.sort == 'desc' ? 'asc': 'desc';
    }
  },
  computed: {
        timesFiltered(){
            let colecao = _.orderBy(this.times, this.order.keys, this.order.sort);

            return _.filter(colecao, item => {
                return item.nome.indexOf(this.filter) >=0;
            });
        }
    },
    filters: {
        saldo(time){
            return time.gm - time.gs;
        },
        ucwords(value){
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
});

 //console.log(meuVue);
 /* Two-away */
