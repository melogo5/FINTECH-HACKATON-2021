import Component, { html, css } from '../class/Component.js';
import $, { slottedValue } from '../class/DOM.js';

const attributes = {};
const properties = {
  /** / paused */
    paused(root, value, previous) {}
};

const style = css`
  :host {
    display: block;
  }
  slot {
    display: none;
  }
  :host([paused]) {
    opacity: 0.5
  }`;

  const allStickers = {
    "3-58164": {
      stickerPath: '/stickers/3-58164.json',
      name: "кошкодевочка"
    }
  };

/** Отображение стикеров {AppSticker} @class @ui @component <app-sticker />
  * description
  */
  export default class AppSticker extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div></div>
        <slot></slot>
      </template>`;

  /** Создание компонента {AppSticker} @constructor
    // * @param {type} store param-description
    */
    constructor(name) {
      super();
      if (name) this.innerText = name;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppSticker} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const slot = $('slot', node);
      const text = slottedValue(slot);
      const path = allStickers[text]?.stickerPath;
      if (!path) return;

      console.log(text, path);

      // debugger;
      const element = $('div', node);
      // @ts-ignore
      window.lottie.loadAnimation({
        container: element, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: !this.paused,
        path // the path to the animation json
      });

      // const { store } = this.store();
      return this;
    }


  }

Component.init(AppSticker, 'app-sticker', { attributes, properties });
