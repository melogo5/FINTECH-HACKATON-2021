import Component, { html, css } from '../class/Component.js';
import $ from '../class/DOM.js';
import AppSticker from './app-sticker.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: inline-block;
    background: var(--sticker-card-color);
    border-radius: 15px;
    width: 40%;
    margin: 4%;
  }
  .sticker {
  }
  slot {
    display: block;
  }`;

/** StickerItem {StickerListItem} @class @ui @component <sticker-list-item />
  * description
  */
export default class StickerListItem extends Component {
  static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {StickerListItem} @constructor
    * @param {type} store param-description
    */
  constructor(sticker) {
    super();
    if (!sticker) return;
    this.store({ sticker });
  }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {StickerListItem} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);

    const { sticker } = this.store();
    const stickerComponent = new AppSticker(sticker.stickerPath);

    stickerComponent.classList.add("sticker");

    console.log(sticker);
    node.append(stickerComponent);
    return this;
  }


}

Component.init(StickerListItem, 'sticker-list-item', { attributes, properties });
