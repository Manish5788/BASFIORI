sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("myteamappmyteamapp.controller.operationDetail", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myteamappmyteamapp.view.operationDetail
		 */
		//Get Router 
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		// Get pattern matched 
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("operDetail").attachPatternMatched(this._onRouteMatched, this);
		},
		// Bind the element with operation details 
		_onRouteMatched: function(oEvent) {
			var sPath = oEvent.getParameter("arguments").sPath;
			var oModel = sap.ui.getCore().getModel("WoDetailModel1");
			// Set the element 
			this.getView().setModel(oModel, "WoOperModel");
			this.getView().bindElement("WoOperModel>/ToOperations/results/" + sPath + "");
		},
		// Go Back to previous page
		onNavBack: function() {

			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("master", {}, true /*no history*/ );
			}

		}

	});

});