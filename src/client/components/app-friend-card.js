import Component, { html, css } from '../class/Component.js';
import $, { updateChildrenText, updateChildrenAttribute } from '../class/DOM.js';

const attributes = {};
const properties = {};

const badges = {
  'Красавчик': '#E0CA00',
  'Добросердечный': '#FF6767',
  'Щедрый': '#FF0000',
  'Неравнодушный': '#00E009',
  'Наблюдатель': '#AEAEAE'
}

const style = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
  }
  #name {
    font-size: 14px;
    margin-right: 5px;
  }
  .nameWrapper {
    align-items: baseline;
  }
  #avatar {
    width: 60px;
    height: 60px;
    border-radius: 50px;
    margin-right: 10px;
  }
  #flexWrapper {
    display: flex;
  }
  .flexAlignCenter {
    align-items: center;
  }
  .flexJustifyBetween {
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
        <div id="flexWrapper" class="flexAlignCenter flexJustifyBetween">
          <img id="avatar" />
          <div>
            <div id="flexWrapper" class="nameWrapper">
              <div id="name"></div>
              <div id="badge"></div>
            </div>
            <div>Пожертвовано:</div><div id="donateAmount"></div>
            <div>Стикеров:</div><div id="stickersCount"></div>
          </div>
        </div>
        <app-button primary id="openProfile">Посмотреть</app-button>
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
      for (const [key, value] of Object.entries(store)) {
        console.log(key);
        if (key === 'avatar' ) {
          updateChildrenAttribute(node, `#${key}`, 'src', store[key])
        } else {
          updateChildrenText(node, `#${key}`, store[key]);
        }
      }
      $('#badge', node).style.color = badges[store.badge];
      return this;
    }

    
  }

Component.init(AppFriendCard, 'friend-card', { attributes, properties });
