import Component, { html, css } from '../class/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    font-family: var(--font);
  }
  :host([primary]) {
    --color: var(--bell-red);
    --font-color: var(--bell-white);
    --color-hover: var(--bell-dark-red);
    --border-color: var(--bell-red);
    --gradient: var(--main-btn-gradient);
  }
  :host([secondary]) {
    --color: var(--bell-white);
    --font-color: var(--bell-black);
    --color-hover: var(--ligth-gray2);
    --border-color: var(--bell-gray);
    --gradient: var(--secondary-btn-gradient);
  }
  :host([disabled]) {
    cursor: default;
  }
  button:hover {
    background-color: var(--color-hover);
  }
  button {
    background-color: var(--color);
    color: var( --font-color);
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 12px;
    width: 100%;
    border: none;
    background: linear-gradient(var(--gradient));
  }`;

/** Дефолтная кнопка {Button} @class @ui @component <app-button />
  * description
  */
  export default class AppButton extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <button><slot></slot></button>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppButton} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }


  }

Component.init(AppButton, 'app-button', { attributes, properties });
