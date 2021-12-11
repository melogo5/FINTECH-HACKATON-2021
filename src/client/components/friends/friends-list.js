import Component, { html, css } from '../../class/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  slot {
    display: block;
  }`;

/** FriendsList {FriendsList} @class @ui @component <friends-list />
  * description
  */
  export default class FriendsList extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        лист
      </template>`;

  /** Создание компонента {FriendsList} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {FriendsList} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      return this;
    }


  }

Component.init(FriendsList, 'friends-list', { attributes, properties });
