import Vue from 'vue';
import VueI18n from 'vue-i18n';
import hy from './locales/hy.json';
import ru from './locales/ru.json';
import en from './locales/en.json';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'hy',
  messages: {hy, ru, en},
})