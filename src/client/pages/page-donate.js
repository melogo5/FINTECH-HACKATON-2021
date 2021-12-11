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

/** name {Class} @class @ui @component <page-donate />
  * description
  */
  export default class PageDonate extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        Помощь в сборе средств на фильтры для ИВЛ
        <slot></slot>
      </template>`;

  // /** Создание компонента {Class} @constructor
  //   * @param {type} store param-description
  //   */
  //   constructor(store) {
  //     super();
  //     this.store({ store });
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageDonate} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      // const { store } = this.store();
      return this;
    }


  }

Component.init(PageDonate, 'page-donate', { attributes, properties });
