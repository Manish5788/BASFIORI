sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/export/library",
	"sap/ui/export/Spreadsheet"
], function (Controller, MessageToast, History, Export, ExportTypeCSV, MessageBox, Filter, FilterOperator, exportLibrary, Spreadsheet) {
	"use strict";

	return Controller.extend("moni.ZMF_MONITORING_DASHB.controller.Dump_View", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf moni.ZMF_MONITORING_DASHB.view.Dump_View
		 */
		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Dump_View").attachMatched(this._onRouteFound, this);
		},
		// Bind UI element from backend data 
		_onRouteFound: function (oEvent) {

			this._setModel(); // }
		},
		_setModel: function () {
			// var oWoDumpModel = new sap.ui.model.odata.ODataModel(this._URL, true);
			var that = this;
			that._oODataJSONModel = new sap.ui.model.json.JSONModel();
			// 	// set the odata JSON as data of JSON model
			that._oODataJSONModel.setData(sap.ui.getCore().getModel("WoMain").getData().results["0"].zdump_allSet);
			that.getView().setModel(that._oODataJSONModel, "WoModelDump");
			//Get the last two columns of Dump (DT22)
			var vData = this.getView().getModel("WoModelDump").getData();
			for (var i = 0; i < vData.results.length; i++) {
				var ProgId = vData.results[i].Flist;
				var sIndex = ProgId.indexOf("AP0");
				vData.results[i].prgId = ProgId.substring(5, sIndex);
				var sIndexProg = ProgId.indexOf("AI0");
				vData.results[i].prgName = ProgId.substring(sIndex + 5, sIndexProg);
			}
			this.getView().getModel("WoModelDump").setData(vData);
		},
		goBack: function (oEvent) {
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
				models: this.getView().getModel("WoModelDump"),

				// binding information for the rows aggregation
				rows: {
					path: "/results"
				},

				// column definitions with column name and binding info for the content

				columns: [{
					name: "Date",
					template: {
						content: "{ path: 'Datum', type: 'sap.ui.model.odata.type.Date', formatOptions: { style: 'medium' }}"
					}
				}, {
					name: "Time",
					template: {
						content: "{ path: 'Uzeit', type: 'sap.ui.model.odata.type.Time', formatOptions: { style: 'medium' }}"
					}
				}, {
					name: "User Name ",
					template: {
						content: "{Uname}"
					}
				}, {
					name: "Error",
					template: {
						content: "{prgId}"
					}
				}, {
					name: "Program",
					template: {
						content: "{prgName}"
					}
				}, {
					name: "Client",
					template: {
						content: "{Mandt}"
					}
				}]
			});

			// download exported file
			oExport.saveFile("DUMP Details").catch(function (oError) {
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
					new Filter("Mandt", FilterOperator.Contains, sQuery),
					new Filter("Uname", FilterOperator.Contains, sQuery),
					new Filter("prgName", FilterOperator.Contains, sQuery),
					new Filter("prgId", FilterOperator.Contains, sQuery)

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
		 * @memberOf moni.ZMF_MONITORING_DASHB.view.Dump_View
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf moni.ZMF_MONITORING_DASHB.view.Dump_View
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf moni.ZMF_MONITORING_DASHB.view.Dump_View
		 */
		//	onExit: function() {
		//
		//	}

	});

});