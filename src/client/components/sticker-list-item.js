import Component, { html, css } from '../class/Component.js';
import $, { slottedValue } from '../class/DOM.js';
import locator from '../script/locator.js';
import AppSticker from './app-sticker.js';
import StickerCard from './sticker-card.js';

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
  .stickerBody {
    width: 100%;
  }
  slot {
    display: none;
  }`;

/** StickerItem {StickerListItem} @class @ui @component <sticker-list-item />
  * description
  */
export default class StickerListItem extends Component {
  static template = html`
      <template>
        <style>${style}</style>
        <div id="stickerBody">

        </div>
        <slot></slot>
      </template>`;

  /** Создание компонента {StickerListItem} @constructor
    * @param {type} store param-description
    */
  constructor(sticker) {
    super();
    if (!sticker) return;
    this.innerText = sticker;
  }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {StickerListItem} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);

    // const { sticker } = this.store();
    const slot = $('slot', node);
    const text = slottedValue(slot);
    const stickerComponent = new AppSticker(text);

    node.addEventListener("click", () => {
      locator.channel.send('drawer-open', {
        page: new StickerCard(text),
        params: {
          title: text
        }
      });
    });

    $("#stickerBody", node).append(stickerComponent);
    return this;
  }


}

Component.init(StickerListItem, 'sticker-list-item', { attributes, properties });
