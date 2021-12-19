//**npm i raven-js@3.26.4**
//import Raven from "raven-js";

function init() {
  //**after build a raven account in sit**
  // Raven.config("ADD YOUR OWN API KEY (sentry)", {
  //   release: "1-0-0",
  //   environment: "development-test"
  // }).install();
}

function log(error) {
  console.error(error);
  // Raven.captureException(error);
}

export default {
  init,
  log
};

//in index.js :      (import logger and)      logger.init();
//in httpService.js: (import logger and)      logger.log(error);
