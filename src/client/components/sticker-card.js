import Component, { html, css } from '../class/Component.js';
import AppSticker from './app-sticker.js';
import SameSticker from './friends-same-sticker.js';
import AppSocial from './app-social.js';
import AppButton from './app-button.js';

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
  .noSticker {
    text-align: center;
  }
  .social {
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 20%);
    padding: 10px 0px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    width: 80%;
    margin: auto;
    margin-top: 25px;
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
    constructor(sticker) {
      super();
      this.store({ sticker });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {StickerCard} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const { sticker } = this.store();

      const stickerElem = new AppSticker(sticker);
      node.appendChild(stickerElem);

      if (!sticker.paused) {
        const info = document.createElement("div");
        info.innerText = "Вы пожертвовали 200 рублей в фонд детей-сирот";
        info.classList.add("donationCount");
        node.appendChild(info);
  
        const sameSticker = new SameSticker();
        node.appendChild(sameSticker);
  
        const social = new AppSocial();
        social.classList.add("social");
        node.appendChild(social);
      } else {
        const info = document.createElement("div");
        info.innerText = "У вас пока нет этого стикера!";
        info.classList.add('noSticker');
        node.appendChild(info);
        const buyStickerButton = new AppButton({
          text: 'Получить стикер!'
        });
        node.appendChild(buyStickerButton);
      }

      return this;
    }
  }

Component.init(StickerCard, 'sticker-card', { attributes, properties });
