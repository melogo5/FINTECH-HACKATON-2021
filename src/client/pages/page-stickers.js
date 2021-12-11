import Component, { html, css } from '../class/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  slot {
    display: block;
  }`;

/** stickers {PageStickers} @class @ui @component <page-stickers />
  * description
  */
  export default class PageStickers extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        стикеры
      </template>`;

  /** Создание компонента {PageStickers} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageStickers} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      return this;
    }


  }

Component.init(PageStickers, 'page-stickers', { attributes, properties });
