import Component, { html, css } from '../class/Component.js';
import AppSticker from './app-sticker.js';
import SameSticker from './friends-same-sticker.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  .donationCount {
    text-align: center;
    margin-top: 5px;
  }
  slot {
    display: block;
  }`;

/** StickerCard {StickerCard} @class @ui @component <sticker-card />
  * description
  */
  export default class StickerCard extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {StickerCard} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {StickerCard} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const { store } = this.store();

      const sticker = new AppSticker();
      sticker.innerHTML = store;
      node.appendChild(sticker);

      const donation = document.createElement("div");
      donation.innerText = "Вы пожертвовали 200 рублей в фонд детей-сирот";
      donation.classList.add("donationCount");
      node.appendChild(donation);

      const sameSticker = new SameSticker();
      node.appendChild(sameSticker);

      return this;
    }


  }

Component.init(StickerCard, 'sticker-card', { attributes, properties });
