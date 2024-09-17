'use strict';

const build = require('@microsoft/sp-build-web');
const path = require('path');
build.addSuppression(
	`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`,
);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
	var result = getTasks.call(build.rig);

	result.set('serve', result.get('serve-deprecated'));

	return result;
};

build.initialize(require('gulp'));

build.configureWebpack.mergeConfig({
	additionalConfiguration: (generatedConfiguration) => {
		generatedConfiguration.resolve.alias['@'] = path.resolve(
			__dirname,
			'lib/webparts/marketMonitorForm/',
		);
		generatedConfiguration.resolve.alias['@clientes'] = path.resolve(
			__dirname,
			'lib/webparts/marketMonitorClientesList/',
		);
		generatedConfiguration.resolve.alias['@cngs'] = path.resolve(
			__dirname,
			'lib/webparts/marketMonitorCngList/',
		);
		return generatedConfiguration;
	},
});
