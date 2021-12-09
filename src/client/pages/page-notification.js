import Component, { html, css } from '../class/Component.js';
import NoNotification from "../components/notification/no-notification.js";
import AppList from '../components/app-list.js';
import AppListItem from '../components/app-list-item.js';
import AppNotifyItem from "../components/notification/app-notify-item.js";

import $, { clear } from '../class/DOM.js';

const data = [
  {
    date: new Date(),
    title: "Тестововое сообщение",
    description: "Тестовое описание и очень невероятно длинный текст, как можно писать такие длинные тексты для теста длинных текстов а главное зачем?"
  },
  {
    date: new Date(1611600000000),
    title: "Победа!",
    description: "Поздравляю с 1 местом на хакактоне от bellintegrator!"
  },
  {
    date: new Date(1642200000000),
    title: "ШО це ТАке!",
    description: "а нишо"
  },
  {
    date: new Date(1632600000000),
    title: "тут пусто в описании",
    description: ""
  }
]

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  button {
    border: 0px;
    padding: 10px 0px;
    background: var(--bell-white);
    border-bottom: 1px solid var(--ligth-gray);
    font-size: 16px;
  }
  .active {
    background: var(--bell-red);
    color: white;
  }
  .switcher {
    margin-top: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 48px;
  }
  .notificationWrapper {
    height: 100%;
  }
  .hidden {
    display: none;
  }
  slot {
    display: block;
  }`;

/** Уведомления {PageNotification} @class @ui @component <page-notification />
  * description
  */
export default class PageNotification extends Component {
  static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <div class="notificationWrapper">
          <div class="switcher">
            <button class="active" id="all">Все</button>
            <button id="unread">Непрочитанные</button>
          </div>
          <no-notification class="hidden"></no-notification>
          <app-list></app-list>
        </div>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageNotification} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);
    this.main(node);

    const unread = $("#unread", node);
    const all = $("#all", node);
    const noNotification = $("no-notification", node);
    const appList = $("app-list", node);
    unread.addEventListener("click", () => {
      all.classList.remove("active");
      noNotification.classList.remove("hidden");
      unread.classList.add("active");
      appList.classList.add("hidden");
    });

    all.addEventListener("click", () => {
      unread.classList.remove("active");
      appList.classList.remove("hidden");
      all.classList.add("active");
      noNotification.classList.add("hidden");
    })

    return this;
  }

  main(node) {
    const appList = $('app-list', node);
    clear(appList);

    data.forEach(message => {
      const item = new AppNotifyItem(message);
      const appListItem = new AppListItem();
      appListItem.appendChild(item);
      appList.appendChild(appListItem);
    });
  }
}

Component.init(PageNotification, 'page-notification', { attributes, properties });
