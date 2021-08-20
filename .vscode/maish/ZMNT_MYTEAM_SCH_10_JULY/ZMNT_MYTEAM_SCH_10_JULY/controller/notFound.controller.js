sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("myteamappmyteamapp.controller.notFound", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myteamappmyteamapp.view.notFound
		 */
		onInit: function() {
			var oRouter, oTarget;

			oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oTarget = oRouter.getTarget("notFound");
			oTarget.attachDisplay(function(oEvent) {
				this._oData = oEvent.getParameter("data"); // store the data
			}, this);

		},
		
		// onNavBack:function(){
			
		// 	history.go(-1);
		// }
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf myteamappmyteamapp.view.notFound
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf myteamappmyteamapp.view.notFound
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf myteamappmyteamapp.view.notFound
		 */
		//	onExit: function() {
		//
		//	}

	});

});