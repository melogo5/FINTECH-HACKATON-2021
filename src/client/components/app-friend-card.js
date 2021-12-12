import Component, { html, css } from '../class/Component.js';
import $, { updateChildrenText, updateChildrenAttribute } from '../class/DOM.js';
import PageStickers from '../pages/page-stickers.js';
import AppDrawer from './app-drawer.js';

const attributes = {};
const properties = {};

const stickersArray = ["3-58164", "3-58150", "3-58145", "3-58138", "3-58139"];

const badges = {
  'Красавчик': '#E0CA00',
  'Добросердечный': '#FF6767',
  'Щедрый': '#FF0000',
  'Неравнодушный': '#00E009',
  'Наблюдатель': '#AEAEAE'
}

const style = css`
  :host {
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 20%);
    border-radius: 15px;
    padding: 5px 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 10px;
  }
  #name {
    font-size: 18px;
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
  #donateAmount, #stickersCount {
    margin-left: 5px;
  }
  .flexWrapper {
    display: flex;
  }
  .flexAlignCenter {
    align-items: center;
  }
  .flexAlignBaseline {
    align-items: baseline;
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
        <div class="flexWrapper flexAlignCenter flexJustifyBetween" style="width: 100%;">
          <img id="avatar" />
          <div>
            <div class="flexWrapper flexAlignBaseline">
              <div id="name"></div>
              <div id="badge"></div>
            </div>
            <div class="flexWrapper">
              <div>Пожертвовано:</div><div id="donateAmount"></div>
            </div>
            <div class="flexWrapper">
            <div>Стикеров:</div><div id="stickersCount"></div>
            </div>
          </div>
        </div>
      </template>`;

  /** Создание компонента {AppFriendCard} @constructor
    * @param {type} data param-description
    */
    constructor(data) {
      super();
      this.store({ data });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppFriendCard} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const { data } = this.store();
      for (const [key, value] of Object.entries(data)) {
        if (key === 'avatar' ) {
          updateChildrenAttribute(node, `#${key}`, 'src', value);
        } else if (key === 'donateAmount') {
          updateChildrenText(node, `#${key}`, `${value} ${this.declOfNum(value, ['рубль', 'рубля', 'рублей'])}`);
        } else {
          updateChildrenText(node, `#${key}`, value);
        }
      }
      $('#badge', node).style.color = badges[data.badge];
      node.addEventListener('click', (event) => {
        locator.channel.send('drawer-open', {
          page: new PageStickers(this.getFriendStickers()),
          params: {
            title: `Стикеры друга: ${data.name}`
          }
        });
      });
      return this;
    }

    getFriendStickers() {
      const stickers = [];
      const myStickers = this.getMyStickers();
      let { stickersCount } = this.store().data;
      stickersCount = stickersCount > stickersArray.length ? stickersArray.length : stickersCount;
      for (let i = 0; i < stickersCount; i++) {
        const sticker = stickersArray[this.getRandomInRange(0, stickersArray.length - 1)];
        stickers.push({
          id: sticker,
          paused: !myStickers.includes(sticker)
        });
      }
      return stickers;
    }

    getMyStickers() {
      return ["3-58164", "3-58150"];
    }

    getRandomInRange(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    declOfNum(number, words) {
      return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
    }
  }

Component.init(AppFriendCard, 'friend-card', { attributes, properties });
