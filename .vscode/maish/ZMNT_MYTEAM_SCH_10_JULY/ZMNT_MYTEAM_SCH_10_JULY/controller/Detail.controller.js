sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
	"myteamappmyteamapp/model/formatter",
	'jquery.sap.global'

], function(Controller, Filter, FilterOperator, FilterType, formatter, jquery) {
	"use strict";

	return Controller.extend("myteamappmyteamapp.controller.Detail", {
		formatter: formatter,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myteamappmyteamapp.view.Detail
		 */
		onInit: function() {

			var oDialog = new sap.m.BusyDialog({

			});
			oDialog.open();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("object").attachMatched(this._onRouteFound, this);
			// Set Icon Color
			this._setIconColor();
			jQuery.sap.delayedCall(3000, this, function() {
				oDialog.close();
			});

		},
		// Bind UI element from backend data 
		_onRouteFound: function(oEvent) {

			this._orderId = oEvent.getParameter("arguments").objectId;
			var sObjectId = oEvent.getParameter("arguments").objectId;
			// Get Detail set data from backend using expand 
			if (sObjectId === 'UNKNOWN') {
				this.getOwnerComponent().getRouter().getTargets().display("notFound");
			} else {
				this._setModel(sObjectId);
				this._setIconColor();
			}
			this._setIconColor();
		},
		// Get Operation details page
		itemPress: function(oEvent) {

			var sProductId = oEvent.getParameter("listItem").getBindingContext("WoDetailModel1").getProperty("Activity");
			var sPath = oEvent.getParameter("listItem").getBindingContext("WoDetailModel1").sPath.substr(22);
			this.getOwnerComponent().getRouter()
				.navTo("operDetail", {
					objectId: this._orderId,
					Activity: sProductId,
					sPath: sPath
				});
		},
		// Get Notification details page
		itemNotiPress: function(oEvent) {

			var sNotifNo = oEvent.getParameter("listItem").getBindingContext("WoDetailModel1").getProperty("NotifNo");
			var sPath = oEvent.getParameter("listItem").getBindingContext("WoDetailModel1").sPath.substr(25);
			this.getOwnerComponent().getRouter()
				.navTo("notifDetail", {
					objectId: this._orderId,
					NotifNo: sNotifNo,
					sPath: sPath

				});
		},
		// Get Component details page (Currently not being used)
		itemComPress: function(oEvent) {

			var sItemNumber = oEvent.getParameter("listItem").getBindingContext("WoDetailModel1").getProperty("ItemNumber");
			this.getOwnerComponent().getRouter()
				.navTo("compDetail", {
					objectId: this._orderId,
					ItemNumber: sItemNumber
				});
		},
		// Open Fragment Dialog
		_getDialog: function() {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("myteamappmyteamapp.view.Dialog", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},

		// Notification Filter 
		onNotiFilter: function(oEvent) {

			this._getDialog()
				.setFilterSearchCallback(null)
				.setFilterSearchOperator(sap.m.StringFilterOperator.Contains)
				.open();

		},
		// Notification Search Function (This will Equidescr:Equipment Description serach)
		onSearchEquip: function(oEvt) {

			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {

				var ofilter = new Filter([
					new Filter("NotifNo", FilterOperator.Contains, sQuery),
					new Filter("ShortText", FilterOperator.Contains, sQuery),
					new Filter("Equidescr", FilterOperator.Contains, sQuery),
					new Filter("FunctLoc", FilterOperator.Contains, sQuery),
					new Filter("Funcldescr", FilterOperator.Contains, sQuery)
				], false);

				aFilters.push(ofilter);
			}

			// update list binding
			var olist = this.getView().byId("lineItemsList1");
			var obinding = olist.getBinding("items");
			obinding.filter(aFilters, "Application");

		},

		_setModel: function(sObject) {

			this._URL = "/sap/opu/odata/sap/ZMNT_MYTEAM_SCHEDULE_SRV";
			var oWoDetailModel = new sap.ui.model.odata.ODataModel(this._URL, true);

			var that = this;

			oWoDetailModel.read(

				"/WoDetailSet('" + sObject + "')?$expand=ToNotifications,ToOperations,ToComponents,ToAttachments",
				null,
				null, false,

				function(oData1, oResponse) {

					that._oODataJSONModel = new sap.ui.model.json.JSONModel();
					// set the odata JSON as data of JSON model
					that._oODataJSONModel.setData(oData1);
					that.getView().setModel(that._oODataJSONModel, "WoDetailModel1"); // store the model
					sap.ui.getCore().setModel(that._oODataJSONModel, "WoDetailModel1");

				}

			);

		},

		_setIconColor: function() {

			// status Indicator Color Determination based on Status Values
			var oTable = this.getView().byId("lineItemsList");
			oTable.rerender();
			oTable.onAfterRendering = function() {
				if (sap.m.Table.prototype.onAfterRendering) {
					sap.m.Table.prototype.onAfterRendering.apply(this, arguments);
				}
				var oitems = this.getItems();
				for (var i = 0; i < oitems.length; i++) {
					var oitem = oitems[i];
					var obj = oitem.getBindingContext("WoDetailModel1").getProperty("Stat");
					var ombl = oitem.getBindingContext("WoDetailModel1").getProperty("Ombl");
					if (ombl === "X") {
						oitem.$().find('.sapUiIcon').addClass('highlightStyle3');
					}
					if (obj === "E0003") {
						oitem.$().find('.sapUiIcon').addClass('highlightStyle1');
					} else if (obj === 'E0005') {
						oitem.$().find('.sapUiIcon').addClass('highlightStyle');
					} else if (obj === 'E0015') {
						oitem.$().find('.sapUiIcon').addClass('highlightStyle2');
					} else if (obj === 'E0001') {
						oitem.$().find('.sapUiIcon').addClass('highlightStyle4');
					} else if (obj === 'E0006') {
						oitem.$().find('.sapUiIcon').addClass('highlightStyle5');
					} else if (ombl === 'X') {
						oitem.$().find('.sapUiIcon').addClass('highlightStyle3');
					}

				}
			};

		}

	});

});