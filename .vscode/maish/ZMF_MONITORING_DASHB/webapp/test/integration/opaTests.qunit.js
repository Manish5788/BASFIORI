/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"moni/ZMF_MONITORING_DASHB/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});