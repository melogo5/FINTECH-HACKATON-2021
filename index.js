import config from './config/dev.json';
import Application from './src/server/Application.js';

const application = new Application(config);
application.launch();
