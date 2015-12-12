const path = require('path');

const gulp = require('gulp');
const karma = require('karma');

<% if (modules === 'inject') { -%>
gulp.task('karma:single-run', gulp.series('scripts', karmaSingleRun));
gulp.task('karma:auto-run', gulp.series('watch', karmaAutoRun));
<% } else { -%>
gulp.task('karma:single-run', karmaSingleRun);
gulp.task('karma:auto-run', karmaAutoRun);
<% } -%>

function karmaFinishHandler(done) {
  return failCount => {
    done(failCount ? new Error(`Failed ${failCount} tests.`) : null);
  }
}

function karmaSingleRun(done) {
  const configFile = path.join(process.cwd(), 'conf', 'karma.conf.js');
  const karmaServer = new karma.Server({ configFile }, karmaFinishHandler(done));
  karmaServer.start();
}

function karmaAutoRun(done) {
  const configFile = path.join(process.cwd(), 'conf', 'karma-auto.conf.js');
  const karmaServer = new karma.Server({ configFile }, karmaFinishHandler(done));
  karmaServer.start();
}
