import Component, { html, css } from '../class/Component.js';
import $ from '../class/DOM.js';
import locator from '../script/locator.js';

import AppClose from './app-close.js';

const attributes = {};
const properties = {};

const TIMING = 160;

const style = css`
  :host {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
    display: block;
    width: 100vh;
    height: 100%;
    z-index: 5;
  }
  #root {
    position: absolute;
    left: 2vw;
    bottom: 0;
    background-color: whitesmoke;
    box-shadow: 0 0 3px 3px #ccc;
    padding: 16px 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-sizing: border-box;
    width: 96vw;
  }
  app-close {
    width: 24px;
  }
  slot {
    display: block;
    overflow: auto;
    max-height: 80vh;
    padding-bottom: 80px;
    box-sizing: border-box;
  }`;

/** BottomDrawer {AppDrawer} @class @ui @component <app-drawer />
  * description
  */
  export default class AppDrawer extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div id="root">
          <app-close></app-close>
          <slot></slot>
        </div>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppDrawer} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const tumbling = [
        { transform: 'translateY(100%)' },
        { transform: 'translateY(0)' }
      ];

      const root = $('#root', node);
      root.animate(tumbling, TIMING);

      const closeDrawer = () => { // анимация закрытия
        const animation = root.animate(tumbling.reverse(), TIMING);
        animation.onfinish = () => this.remove();
      }

      $('app-close', node).addEventListener('click', closeDrawer);
      locator.channel.on('drawer-close', closeDrawer);
      return this;
    }
  }

Component.init(AppDrawer, 'app-drawer', { attributes, properties });
