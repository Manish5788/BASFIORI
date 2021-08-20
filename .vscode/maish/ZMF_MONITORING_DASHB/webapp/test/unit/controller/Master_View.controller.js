/*global QUnit*/

sap.ui.define([
	"moni/ZMF_MONITORING_DASHB/controller/Master_View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Master_View Controller");

	QUnit.test("I should test the Master_View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});