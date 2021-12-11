import Component, { html, css } from '../class/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: grid;
    justify-content: center;
    gap: 10px;
  }
  .myAvatar {
    margin-top: 25px;
    border-radius: 100%;
  }
  .nameProfile {
    justify-self: center;
    font-size: 28px;
  }
  .statusProfile {
    color: #00E009;
    justify-self: center;
  }
  .donationsProfile {
    display: flex;
    justify-content: space-between;
  }
  .stickersProfile {
    display: flex;
    justify-content: space-between;
  }
  slot {
    display: block;
  }`;

/** Profile {PageProfile} @class @ui @component <page-profile />
  * description
  */
  export default class PageProfile extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <img class="myAvatar" src="../images/Steve_Jobs.jpg">
        <div class="nameProfile">Стив Джобс</div>
        <div class="statusProfile">Неравнодушный</div>
        <div class="donationsProfile">
          <p>пожертвованно:</p>
          <p>400:</p>
        </div>
        <div class="stickersProfile">
          <p>стикеров</p>
          <p>10</p>
        </div>
      </template>`;

  /** Создание компонента {PageProfile} @constructor
    * @param {type} store param-description
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageProfile} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      return this;
    }


  }

Component.init(PageProfile, 'page-profile', { attributes, properties });
