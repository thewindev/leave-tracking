import environment from './environment';
import moment from 'moment'
export function configure(aurelia) {

    aurelia.use
      .standardConfiguration()
      .plugin('aurelia-bootstrap', config => config.options.version = 4)
      .plugin('aurelia-bootstrap-datetimepicker')
      .plugin('aurelia-validation')
      .plugin('aurelia-dialog', config => {
        config.settings.lock = false;
        config.settings.enableEscClose = true;
      })
      .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
