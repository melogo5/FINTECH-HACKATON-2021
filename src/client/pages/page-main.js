import Component, { html, css } from '../class/Component.js';
import $ from '../class/DOM.js';
import locator from '../script/locator.js';

import AppBar from '../components/app-bar.js';
import AppDrawer from '../components/app-drawer.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    height: 100vh;
    position: relative;
  }
  #root {
    display: grid;
    grid-template-rows: 1fr 96px;
    grid-template-columns: 1fr;
    height: 100vh;
  }
  slot {
    display: block;
    overflow: auto;
    overscroll-behavior-y: contain;
    /* padding-bottom: 80px; */
  }
  app-bar {
    text-align: center;
  }`;

/** Раскладка {PageMain} @class @ui @component <page-main />
  * description
  */
export default class PageMain extends Component {
  static template = html`
    <template>
      <style>${style}</style>
      <div id="root">
        <slot></slot>
        Здарова
        <app-bar></app-bar>
      </div>
    </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageMain} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);
    // GET /notification/message/unread/count
    // this.addEventListener('component-routing', (e) => {
    // 	debugger;
    // 	console.log('main component-routing', e.detail);
    // })

    locator.channel.on('drawer-open', ({ page }) => {
      const drawer = new AppDrawer();
      if (page) drawer.appendChild(page);
      node.appendChild(drawer);
      // анимация появления
    });

    return this;
  }

  // route(node, route, options, router, depth = 0) {
  // 	console.log('main route', {node, route, options, router, depth})
  // 	return this;
  // }
}

Component.init(PageMain, 'page-main', { attributes, properties });
