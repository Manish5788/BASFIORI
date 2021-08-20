sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/m/MessageToast",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, History, Export, ExportTypeCSV, MessageToast, Sorter, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("moni.ZMF_MONITORING_DASHB.controller.Details_View", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf moni.ZMF_MONITORING_DASHB.view.Details_View
		 */
		onInit: function () {
			this._URL = this.getOwnerComponent().getManifestObject()._oManifest["sap.app"].dataSources["ZMF_MONI_DASH_SRV"].uri;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Details_View").attachMatched(this._onRouteFound, this);
		},
		// Bind UI element from backend data 
		_onRouteFound: function (oEvent) {

			this._setModel(); // }
		},
		_setModel: function () {
			var oWoJobModel = new sap.ui.model.odata.ODataModel(this._URL, true);
			var that = this;
			oWoJobModel.read("/zcan_servSet", null, null, false, function (oData, oResponse) {
				that._oODataJSONModel = new sap.ui.model.json.JSONModel();
				// set the odata JSON as data of JSON model
				that._oODataJSONModel.setData(oData);
				that.getView().setModel(that._oODataJSONModel, "WoModelJobs");

			});

		},
		goBack: function (oEvent) {
			//Idhar kya dekhte ho be.

			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("RouteMaster_View", {}, true /*no history*/ );
			}
		},
		onDataExport: function (oEvent) {

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType: new ExportTypeCSV({
					separatorChar: ";"
				}),

				// Pass in the model created above
				models: this.getView().getModel("WoModelJobs"),

				// binding information for the rows aggregation
				rows: {
					path: "/results"
				},

				// column definitions with column name and binding info for the content

				columns: [{
					name: "Date ",
					template: {
						content: "{ path: 'Sdlstrtdt', type: 'sap.ui.model.odata.type.Date', formatOptions: { style: 'medium' }}"
					}
				}, {
					name: "Time ",
					template: {
						content: "{ path: 'Sdlstrttm', type: 'sap.ui.model.odata.type.Time', formatOptions: { style: 'medium' }}"
					}
				}, {
					name: "Job Name",
					template: {
						content: "{Jobname}"
					}
				}, {
					name: "Client",
					template: {
						content: "{Authckman}"
					}
				}, {
					name: "Program",
					template: {
						content: "{Progname}"
					}
				}, {
					name: "User",
					template: {
						content: "{Sdluname}"
					}
				}]
			});

			// download exported file
			oExport.saveFile("Jobs Details").catch(function (oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function () {
				oExport.destroy();
			});
		},

		onSearch: function (oEvent) {
				// add filter for search
				var aFilters = [];
				var sQuery = oEvent.getSource().getValue();
				if (sQuery && sQuery.length > 0) {
					var ofilter = new Filter([
						new Filter("Jobname", FilterOperator.Contains, sQuery),
						new Filter("Authckman", FilterOperator.Contains, sQuery),
						new Filter("Progname", FilterOperator.Contains, sQuery),
						new Filter("Sdluname", FilterOperator.Contains, sQuery)
					], false);

					aFilters.push(ofilter);
				}

				// update table binding
				var oTable = this.byId("table0");
				var oBinding = oTable.getBinding("items");
				oBinding.filter(aFilters, "Application");
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf moni.ZMF_MONITORING_DASHB.view.Details_View
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf moni.ZMF_MONITORING_DASHB.view.Details_View
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf moni.ZMF_MONITORING_DASHB.view.Details_View
		 */
		//	onExit: function() {
		//
		//	}

	});

});