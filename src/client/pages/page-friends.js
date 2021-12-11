import Component, { html, css } from '../class/Component.js';
import AppList from '../components/app-list.js';
import AppFriendCard from '../components/app-friend-card.js';
import AppListItem from '../components/app-list-item.js';
import $ from '../class/DOM.js';

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
        <app-list></app-list>
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
      const list = $('app-list', node);
      for (let i = 0; i < friendList.length; i++) {
        const listItem = new AppListItem();
        const friendCard = new AppFriendCard(friendList[i]);
        listItem.append(friendCard);
        list.append(listItem);
      }
      return this;
    }


  }

Component.init(PageFriends, 'page-friends', { attributes, properties });
