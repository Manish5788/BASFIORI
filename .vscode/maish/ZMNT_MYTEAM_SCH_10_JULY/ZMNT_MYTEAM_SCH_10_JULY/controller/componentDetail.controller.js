sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("myteamappmyteamapp.controller.componentDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myteamappmyteamapp.view.componentDetail
		 */
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("compDetail").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(oEvent) {

			var objectId = oEvent.getParameter("arguments").objectId;
			var ItemNumber = oEvent.getParameter("arguments").ItemNumber;

			this.getView().bindElement("/WoCompSet(Orderid='" + objectId + "'" + ",ItemNumber=" + "'" + ItemNumber + "') ");
		},

		onNav: function() {
			//This code was generated by the layout editor.
			history.go(-1);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf myteamappmyteamapp.view.componentDetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf myteamappmyteamapp.view.componentDetail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf myteamappmyteamapp.view.componentDetail
		 */
		//	onExit: function() {
		//
		//	}

	});

});