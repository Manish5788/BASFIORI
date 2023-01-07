/*global QUnit*/

sap.ui.define([
	"first/projectfirst/controller/ViewFirst.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ViewFirst Controller");

	QUnit.test("I should test the ViewFirst controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
