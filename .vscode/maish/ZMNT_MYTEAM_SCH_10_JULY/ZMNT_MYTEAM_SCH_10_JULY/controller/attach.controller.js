sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("myteamappmyteamapp.controller.attach", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myteamappmyteamapp.view.attach
		 */
		// onInit: function() {
		// 	this.getOwnerComponent().getRouter().getRoute("attach").attachPatternMatched(this._onRouteMatched, this);
		// },
		// _onRouteMatched: function(oEvent) {

		// 	var objectId = oEvent.getParameter("arguments").objectId;
		// 	var sArcNumber = oEvent.getParameter("arguments").sArcNumber;

		// 	// this.getView().bindElement("/WoAttachSet(Orderid='" + objectId + "',ArcDocId='" + sArcNumber + "')/$value");
		// 	// this.getView().bindElement("/WoDetailSet(Orderid='" + objectId + "')/ToAttachments");
		// 	// this.getView().bindElement("/ToAttachments('110001894')");

		// },

		// onNav: function() {
		// 	//This code was generated by the layout editor.
		// 	history.go(-1);
		// }

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf myteamappmyteamapp.view.attach
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf myteamappmyteamapp.view.attach
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf myteamappmyteamapp.view.attach
		 */
		//	onExit: function() {
		//
		//	}

	});

});