import Component, { html, css } from '../class/Component.js';
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
  #stickerList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: 5px;
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
        <div id="stickerList"></div>
      </template>`;

  // /** Создание компонента {PageStickers} @constructor
  //   * @param {type} store param-description
  //   */
  // constructor(store) {
  //   super();
  //   this.store({ store });
  // }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageStickers} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);
    const { store } = this.store();

    const list = $('#stickerList', node);

    for (let i = 0; i < stickersArray.length; i++) {
      const stickerCard = new StickerListItem(stickersArray[i]);
      list.append(stickerCard);
    }

    return this;
  }


}

Component.init(PageStickers, 'page-stickers', { attributes, properties });
