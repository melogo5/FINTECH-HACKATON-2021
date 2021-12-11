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

/** Profile {PageProfile} @class @ui @component <page-profile />
  * description
  */
  export default class PageProfile extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        Профиль
      </template>`;

  /** Создание компонента {PageProfile} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageProfile} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      return this;
    }


  }

Component.init(PageProfile, 'page-profile', { attributes, properties });
