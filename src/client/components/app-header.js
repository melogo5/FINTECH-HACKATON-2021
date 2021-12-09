import Component, { html, css } from '../class/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    z-index: 3;
    position: sticky;
    top: 0;
    background: white;
    border-bottom: 1px solid var(--ligth-gray);
    padding: 32px 10px 8px;
    display: grid;
    grid-template-columns: 4fr 2fr;
  }
  slot {
    display: block;
  }
  slot[name] {
    display: flex;
    justify-content: flex-end;
  }`;

/** Header {AppHeader} @class @ui @component <app-header />
  * description
  */
  export default class AppHeader extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <slot name="actions"></slot>
      </template>`;

  // /** Создание компонента {AppHeader} @constructor
  //   * @param {type} store param-description
  //   */
  //   constructor(store) {
  //     super();
  //     this.store({ store });
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppHeader} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      // const { store } = this.store();
      return this;
    }


  }

Component.init(AppHeader, 'app-header', { attributes, properties });
