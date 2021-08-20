sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("myteamappmyteamapp.controller.notificationDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myteamappmyteamapp.view.notificationDetail
		 */
		//Get Router 
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		// Get pattern matched 
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("notifDetail").attachPatternMatched(this._onRouteMatched, this);
		},
		// Bind the element with operation details 
		_onRouteMatched: function(oEvent) {

			// Get Notification no and Order no

			var sNotifNo = oEvent.getParameter("arguments").NotifNo;
			var oModel = sap.ui.getCore().getModel("WoDetailModel1");
			this.getView().setModel(oModel, "WoNotifModel");
			var sPath = oEvent.getParameter("arguments").sPath;
			this.getView().bindElement("WoNotifModel>/ToNotifications/results/" + sPath + "");
			// Bind it ot Header view element 

			// Create Model for Notification Activity and Lomng Text 
			this._URL = "/sap/opu/odata/sap/ZMNT_MYTEAM_SCHEDULE_SRV";
			// Create Model for Notification Activity and Lomng Text 
			this._setActivity(sNotifNo);
			this._setLongText(sNotifNo);

		},
		// Go to previous view 
		goNav: function() {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("master", {}, true /*no history*/ );
			}
		},
		_setLongText: function(sNotifNo) {

			var oWoNotifLongModel = new sap.ui.model.odata.ODataModel(this._URL, true);
			// Read the Services for Long Text 
			var that = this;

			oWoNotifLongModel.read(
				"/LongTextSet?$filter=NotifNo eq '" + sNotifNo + "'",

				null,
				null, false,
				function(oData1, oResponse) {
					// create JSON model
					that._oODataJSONModel = new sap.ui.model.json.JSONModel();
					// set the odata JSON as data of JSON model
					that._oODataJSONModel.setData(oData1);
					that.getView().setModel(that._oODataJSONModel, "WoNotifLongModel"); // store the model
					sap.ui.getCore().setModel(that._oODataJSONModel, "WoNotifLongModel");
				});

		},

		_setActivity: function(sNotifNo) {

			// Read the Services for Activity details 
			var oWoNotifActModel = new sap.ui.model.odata.ODataModel(this._URL, true);
			var that = this;
			oWoNotifActModel.read(
				"/NotifActSet?$filter=NotifNo eq '" + sNotifNo + "'",

				null,
				null, false,
				function(oData1, oResponse) {
					// create JSON model
					that._oODataJSONModel = new sap.ui.model.json.JSONModel();
					// set the odata JSON as data of JSON model
					that._oODataJSONModel.setData(oData1);
					that.getView().setModel(that._oODataJSONModel, "WoNotifActModel"); // store the model
					sap.ui.getCore().setModel(that._oODataJSONModel, "WoNotifActModel");

				});

		}
	});

});