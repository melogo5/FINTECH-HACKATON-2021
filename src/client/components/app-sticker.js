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
    constructor(path) {
      super();
      this.store({ path });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppSticker} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const { path } = this.store();

      // debugger;
      const element = $('div', node);
      element.style.width = '80px';
      element.style.height = '80px';
      // @ts-ignore
      window.lottie.loadAnimation({
        container: element, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: path // the path to the animation json
      });

      // const { store } = this.store();
      return this;
    }


  }

Component.init(AppSticker, 'app-sticker', { attributes, properties });
