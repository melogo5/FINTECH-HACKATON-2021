import Component, { html, css } from '../class/Component.js';
import AppSticker from '../components/app-sticker.js';
import AppSocial from '../components/app-social.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    padding: 10px !important;
  }
  app-social {
    margin: 10px 0;
  }
  .text {
    display: block;
    text-align: center;
    font-size: 30px;
  }
  slot {
    display: block;
  }`;

/** Успешный донат {PageSuccess} @class @ui @component <page-success />
  * description
  */
  export default class PageSuccess extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="text">Ура! вы сделали доброе дело и получаете стикер!</div>
        <app-sticker>3-58164</app-sticker>
        <slot></slot>
        <div class="text">Поделитесь с друзьями!</div>
        <app-social></app-social>
        <a class="text" href="#main/stickers">все мои стикеры</a>
      </template>`;

  // /** Создание компонента {PageSuccess} @constructor
  //   // * @param {type} store param-description
  //   */
  //   constructor(store) {
  //     super();
  //     this.store({ store });
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageSuccess} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      // const { store } = this.store();
      return this;
    }


  }

Component.init(PageSuccess, 'page-success', { attributes, properties });
