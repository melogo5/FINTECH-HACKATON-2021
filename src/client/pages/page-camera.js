import Component, { html, css } from '../class/Component.js';
import $ from '../class/DOM.js';

import AppCamera from '../components/app-camera.js';


const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  slot {
    display: block;
  }`;

/** Camera {PageCamera} @class @ui @component <page-camera />
  * description
  */
  export default class PageCamera extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <app-camera></app-camera>
      </template>`;

  // /** Создание компонента {PageCamera} @constructor
  //   * @param {type} store param-description
  //   */
  //   constructor(store) {
  //     super();
  //     this.store({ store });
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageCamera} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const camera = $('app-camera', node);
      camera.addEventListener('qr-code', e => {
        console.log(e.detail);
      })

      // const { store } = this.store();
      return this;
    }


  }

Component.init(PageCamera, 'page-camera', { attributes, properties });
