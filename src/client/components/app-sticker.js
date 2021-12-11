import Component, { html, css } from '../class/Component.js';
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

/** Отображение стикеров {AppSticker} @class @ui @component <app-sticker />
  * description
  */
  export default class AppSticker extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>

        <div></div>
      </template>`;

  /** Создание компонента {AppSticker} @constructor
    // * @param {type} store param-description
    */
    // constructor(store) {
    //   super();
    //   this.store({ store });
    // }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppSticker} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      // debugger;
      const element = $('div', node);
      // @ts-ignore
      window.lottie.loadAnimation({
        container: element, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/stickers/3-58164.json' // the path to the animation json
      });

      // const { store } = this.store();
      return this;
    }


  }

Component.init(AppSticker, 'app-sticker', { attributes, properties });
