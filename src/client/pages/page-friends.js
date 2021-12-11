import Component, { html, css } from '../class/Component.js';
import FriendsList from '../components/friends/friends-list.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  slot {
    display: block;
  }`;

/** Friends {PageFriends} @class @ui @component <page-friends />
  * description
  */
  export default class PageFriends extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <friends-list />
      </template>`;

  /** Создание компонента {PageFriends} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageFriends} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      return this;
    }


  }

Component.init(PageFriends, 'page-friends', { attributes, properties });
