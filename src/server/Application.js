import Koa from 'koa';
import serve from 'koa-static';
// import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mount from 'koa-mount';
import fetch from 'node-fetch';
import https from 'https';
import fs from 'fs';

/**  */
  export default class Application {
  /**  */
    constructor(config) {
      this.config = config;
    }

  /**  */
    launch() {
      // ---
      const htdocs = new Koa();
      htdocs.use(serve(this.config.serve));

      // ---
      const api = new Koa();
      api.use(bodyParser());
      api.use(async (ctx, next) => {
        const path = 'https://' + this.config.proxy + '/api' + ctx.path;
        const method = ctx.method.toLowerCase();
        const isJSON = ctx.headers['content-type']?.toLowerCase() === 'application/json';
        const body = method === 'get' || !isJSON ? new URLSearchParams(ctx.request.body).toString() || ctx.request.querystring : JSON.stringify(ctx.request.body);
        const headers = { ...ctx.headers, host: this.config.proxy, 'accept-encoding': undefined, 'set-cookie': undefined };

        const url = method === 'get' ? path + '?' + body : path;
        const response = await fetch(url, { method, body: method !== 'get' ? body : null, headers });
        try {
          parseCookies(response).forEach(cookie => {
            ctx.cookies.set(cookie.name, cookie.value);
          });
          ctx.status = response.status;
          const json = response.headers.get('content-type')?.toLowerCase()?.startsWith('application/json');
          if (json) {
            const data = await response.json();
            ctx.body = data;
          } else {
            ctx.body = null;
          }
        } catch (e) {
          console.error(e);
        }
      });

      // ---
      const app = new Koa();
      app.use(mount('/', htdocs));
      app.use(mount('/api', api));

      app.listen(this.config.port, () => {
        const location = `http://${this.config.host}:${this.config.port}`;
        console.log(`server for bell-integrator running at ${location}`);
      });

      try {
        const ssl = {
          key: fs.readFileSync(this.config.ssl + this.config.key),
          cert: fs.readFileSync(this.config.ssl + this.config.cert)
        };
        https.createServer(ssl, app.callback()).listen(this.config.https, () => {
          const location = `https://${this.config.host}:${this.config.https}`;
          console.log(`server running at ${location}`);
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  function parseCookies(response) {
    const raw = response.headers.raw()['set-cookie'] || [];
    return raw.map((entry) => {
      const parts = entry.split(';');
      const cookiePart = parts[0];
      const cookie = cookiePart.split('=');
      return { name: cookie[0], value: cookie[1] }
    });
  }
