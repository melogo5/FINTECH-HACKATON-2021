import locator from './locator.js';
import Channel from '../class/Browser.js';
import Router from '../class/Router.js';

import PageRegistration from "../pages/page-registation.js";
import PageLogin from "../pages/page-login.js";
import PageMain from "../pages/page-main.js";

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err));
}

main();

/** Инициализация приложения
  */
  async function main() {
    const standalone =
         window.navigator.standalone // on iOS Safari
      || window.matchMedia?.('(display-mode: standalone)')?.matches // on Android Chrome
      || false;

    // if (standalone) alert('PWA');

    const channel = new Channel();

    const router = routing();

    locator.services = {
      channel,
      router,
      go: (path) => {
        if (!(path instanceof Array)) path = [path];
        // router.path(path);
        window.location.hash = path;
      }
      // storage
    };

    router.callback((e) => {
      // console.log("ROUTE CALLBACK", e);
      const path = window.location.hash.replace(/^#/, '').split('/');
      channel.send('app-routing', path);
    }).start();
  }

// #region [Private]
/** routing */
  function routing() {
    const root = document.body;
    const router = Router.hash(root)
      .route({
        path: 'login',
        node: 'page-login',
        default: true
        // callback: (element, options, route, router) => {
        //   if (options.location.length > 1) {
        //     const x = element.shadowRoot.querySelector('#' + options.location[1]).getBoundingClientRect().top;
        //     window.scrollTo({ top: x - 100 });
        //   }
        // }
      })
      .route({
        path: 'register',
        node: 'page-registration'
      })
      .route({
        name: 'main',
        node: 'page-main',
        nesting: new Router()
          .route({
            path: 'camera',
            node: 'page-profile',
            default: true
          })
          .route({
            path: 'stickers',
            node: 'page-candidates'
          })
          .route({
            path: 'friends  ',
            node: 'page-vacancy'
          })
          .route({
            path: 'profile',
            node: 'page-notification'
          })
      });

    return router;
  }
// #endregion

// PWA custom install
// window.addEventListener('beforeinstallprompt', e => {
//   e.preventDefault();
//   e.prompt();
// });
