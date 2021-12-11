import Component, { html, css } from '../class/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  #flexWrapper {
    display: flex;
  }
  .flexAlignCenter {
    align-items: center;
  }
  .flexJustifyBetween {
    justify-content: space-between;
  }
  slot {
    display: block;
  }`;

/** name {AppFriendCard} @class @ui @component <app-friend-card />
  * description
  */
  export default class AppFriendCard extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <div id="flexWrapper" class="flexAlignCenter flexJustifyBetween">
            <div id="avatar">Ава</div>
            <div>
                <div id="flexWrapper">
                    <div id="name">Илья</div>
                    <div id="badge">Щедрый</div>
                </div>
                <div id="donateAmount">5</div>
                <div id="stickersCount">2</div>
            </div>
            <app-button primary id="openProfile">Посмотреть</app-button>
        </div>
      </template>`;

  /** Создание компонента {AppFriendCard} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppFriendCard} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      console.log(store);
      return this;
    }

    
  }

Component.init(AppFriendCard, 'friend-card', { attributes, properties });
