import Component, { html, css } from '../class/Component.js';
import AppList from '../components/app-list.js';
import AppListItem from '../components/app-list-item.js';
import StickerListItem from '../components/sticker-list-item.js';
import $ from '../class/DOM.js';

const attributes = {};
const properties = {};

const stickersArray = [
  {
    stickerPath: '/stickers/3-58164.json',
    name: "кошкодевочка"
  },
  {
    stickerPath: '/stickers/3-58164.json',
    name: "кошкодевочка"
  },
  {
    stickerPath: '/stickers/3-58164.json',
    name: "кошкодевочка"
  }
];

const style = css`
  :host {
    display: block;
  }
  .stickerList {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .sticker {
    /*display: inline-block;*/
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
        <app-list class="stickerList"></app-list>
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

    const list = $('app-list', node);
    for (let i = 0; i < stickersArray.length; i++) {
      const listItem = new AppListItem();

      const stickerCard = new StickerListItem(stickersArray[i]);
      listItem.append(stickerCard);
      listItem.classList.add("sticker");
      list.append(listItem);
    }

    return this;
  }


}

Component.init(PageStickers, 'page-stickers', { attributes, properties });
