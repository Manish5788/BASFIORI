sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/ui/table/library"
], function (Controller, MessageToast, History, Export, ExportTypeCSV, MessageBox, Filter, FilterOperator, Sorter, library) {
	"use strict";
	// shortcut for sap.ui.table.SortOrder
	// var SortOrder = library.SortOrder;
	return Controller.extend("moni.ZMF_MONITORING_DASHB.controller.Idoc_View", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf moni.ZMF_MONITORING_DASHB.view.Idoc_View
		 */
		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Idoc_View").attachMatched(this._onRouteFound, this);
		},
		// Bind UI element from backend data 
		_onRouteFound: function (oEvent) {

			this._setModel(); // }
		},
		_setModel: function () {
			//Set the view with data
			this._oODataJSONModel = new sap.ui.model.json.JSONModel();
			this._oODataJSONModel.setData(sap.ui.getCore().getModel("WoIdocModel").getData());
			this.getView().setModel(this._oODataJSONModel, "WoIdoc");
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
				models: this.getView().getModel("WoIdoc"),

				// binding information for the rows aggregation
				rows: {
					path: "/results"
				},

				// column definitions with column name and binding info for the content

				columns: [{
					name: "Date ",
					template: {
						content: "{ path: 'Credat', type: 'sap.ui.model.odata.type.Date', formatOptions: { style: 'medium' }}"
					}
				}, {
					name: "Time",
					template: {
						content: "{ path: 'Cretim', type: 'sap.ui.model.odata.type.Time', formatOptions: { style: 'medium' }}"
					}
				}, {
					name: "Doc Number",
					template: {
						content: "{Docnum}"
					}
				}, {
					name: "Client",
					template: {
						content: "{Zclient}"
					}
				}, {
					name: "Basic Type",
					template: {
						content: "{Idoctp}"
					}
				}, {
					name: "Status",
					template: {
						content: "{Status}"
					}
				}, {
					name: "Sender",
					template: {
						content: "{Sndpor}"
					}
				}]
			});

			// download exported file
			oExport.saveFile("IDOC Details").catch(function (oError) {
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
					new Filter("Docnum", FilterOperator.Contains, sQuery),
					new Filter("Idoctp", FilterOperator.Contains, sQuery),
					new Filter("Sndpor", FilterOperator.Contains, sQuery),
					new Filter("Zclient", FilterOperator.Contains, sQuery),
					new Filter("Status", FilterOperator.Contains, sQuery)
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
			 * @memberOf moni.ZMF_MONITORING_DASHB.view.Idoc_View
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf moni.ZMF_MONITORING_DASHB.view.Idoc_View
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf moni.ZMF_MONITORING_DASHB.view.Idoc_View
		 */
		//	onExit: function() {
		//
		//	}

	});

});