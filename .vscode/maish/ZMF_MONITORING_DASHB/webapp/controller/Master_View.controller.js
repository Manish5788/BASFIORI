sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, jquery, MessageToast, History, Export, ExportTypeCSV, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("moni.ZMF_MONITORING_DASHB.controller.Master_View", {
		onInit: function () {
			this._URL = this.getOwnerComponent().getManifestObject()._oManifest["sap.app"].dataSources["ZMF_MONI_DASH_SRV"].uri;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("RouteMaster_View").attachMatched(this._onRouteFound, this);
		},

		_onRouteFound: function (oEvent) {
			// URL without multiple origin

			var oBatchCount = new sap.ui.model.odata.ODataModel(this._URL, true);
			var that = this;
			// URL with multiple origin
			var p = this._URL; //create an Multi origin URL Datasource 
			this._URLmO = p.slice(0, p.length - 1) + ";mo" + p.slice(p.length - 1, p.length);
			// this._URLmO = "/sap/opu/odata/sap/ZMF_MONI_DASH_SRV;mo/";
			var oMoCount = new sap.ui.model.odata.ODataModel(this._URLmO, true);
			var oMoIdoc = new sap.ui.model.odata.ODataModel(this._URLmO, true);
			that._ODataIdoc = new sap.ui.model.json.JSONModel();
			// Ser busy indicatore light 
			var oGlobalBusyDialog = new sap.m.BusyDialog();
			oGlobalBusyDialog.open();

			oMoCount.read("/zwork_errSet", {
				success: $.proxy(function (oData, oResponse) {
					var count = oData.results.length;
					that._oODataJSONModel = new sap.ui.model.json.JSONModel();
					// set the odata JSON as data of JSON model
					that._oODataJSONModel.setData(oData);
					that.getView().setModel(that._oODataJSONModel, "WoWorkModel");
					// store the model
					sap.ui.getCore().setModel(that._oODataJSONModel, "WoWorkModel");
					var oTile0 = this.getView().byId("idTile0");
					var oTileValueWork = this.getView().byId("idNumericContentWork");

					var dateFormat4 = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "dd/MM/yyyy"
					});
					var inputDate4 = dateFormat4.format(new Date());
					oTile0.setSubheader(inputDate4);
					oTileValueWork.setValue(count);

					//Indicator logic based on base value
					if (count > 50) {
						oTileValueWork.setValueColor("Error");
						oTileValueWork.setIndicator("Up");
					} else if (count >= 50 && count <= 30) {
						oTileValueWork.setValueColor("Critical");
						oTileValueWork.setIndicator("Up");

					} else {
						oTileValueWork.setValueColor("Good");
						oTileValueWork.setIndicator("Down");
					}

				}, this)
			});
			oMoIdoc.read("/zidoc_errSet", {
				success: $.proxy(function (oData, oResponse) {

					// set the odata JSON as data of JSON model
					that._ODataIdoc.setData(oData);
					that._oODataJSONModel = new sap.ui.model.json.JSONModel();
					// set the odata JSON as data of JSON model
					that._oODataJSONModel.setData(oData);
					that.getView().setModel(that._oODataJSONModel, "WoIdocModel");
					// store the model
					sap.ui.getCore().setModel(that._oODataJSONModel, "WoIdocModel");

					var count = oData.results.length;
					// IDOC Count
					var oTile1 = this.getView().byId("idTile1");
					var oTileValueIdoc = this.getView().byId("idNumericContentIdoc");

					var dateFormat5 = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "dd/MM/yyyy"
					});
					var inputDate5 = dateFormat5.format(new Date());
					oTile1.setSubheader(inputDate5);
					// oTileValueIdoc.setTruncateValueTo(6);
					oTileValueIdoc.setValue(count);
					oTileValueIdoc.setValueColor("Good");
					oTileValueIdoc.setIndicator("Down");

					//Indicator logic based on base value
					if (count > 100) {
						oTileValueIdoc.setValueColor("Error");
						oTileValueIdoc.setIndicator("Up");
					} else if (count <= 100 && count >= 50) {
						oTileValueIdoc.setValueColor("Critical");
						oTileValueIdoc.setIndicator("Up");

					} else {
						oTileValueIdoc.setValueColor("Good");
						oTileValueIdoc.setIndicator("Down");
					}

				}, this)
			});

			this.getView("Idoc_view").setModel(this._ODataIdoc, "oMoIdoc");

			//zlock_objSet,zcan_servSet,zdump_allSet,zidoc_errSet,zupd_errSet,zwork_errSet
			oBatchCount.read("/zmain_callSet?$expand=zlock_objSet,zupd_errSet,zdump_allSet", {
				success: $.proxy(function (oData, oResponse) {

					that._oODataJSONModel = new sap.ui.model.json.JSONModel();
					// set the odata JSON as data of JSON model
					that._oODataJSONModel.setData(oData);
					that.getView().setModel(that._oODataJSONModel, "WoMain");
					// store the model
					sap.ui.getCore().setModel(that._oODataJSONModel, "WoMain");

					var oTile = that.getView().byId("idTile");
					var oTileValue = that.getView().byId("idNumericContent");
					var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "dd/MM/yyyy"
					});
					var inputDate = dateFormat.format(new Date());
					oTile.setSubheader(inputDate);
					//truncateValueTo of the sap.m.NumericContent which is defaulted to 4 .
					// oTileValue.setTruncateValueTo(5);
					var count_lock;
					var count_dump;
					var count_jobs;
					var count_updt;

					count_lock = oData.results["0"].ZcountLock;
					count_jobs = oData.results["0"].ZcountCanc;
					count_dump = oData.results["0"].ZcountDump;
					count_updt = oData.results["0"].ZcountUpdt;

					if (count_jobs.toString().length > 4) {
						oTileValue.setTruncateValueTo(5);
					}
					oTileValue.setValue(count_jobs);
					//Indicator logic based on base value
					if (count_jobs > 100) {
						oTileValue.setValueColor("Error");
						oTileValue.setIndicator("Up");
					} else if (count_jobs <= 100 && count_jobs >= 50) {
						oTileValue.setValueColor("Critical");
						oTileValue.setIndicator("Up");

					} else {

						oTileValue.setValueColor("Good");
						oTileValue.setIndicator("Down");
					}

					var oTile2 = this.getView().byId("idTile2");
					var oTileValueDump = this.getView().byId("idNumericContentDump");

					var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "dd/MM/yyyy"
					});
					var inputDate1 = dateFormat1.format(new Date());
					oTile2.setSubheader(inputDate1);
					oTileValueDump.setValue(count_dump);

					//Indicator logic based on base value
					if (count_dump > 100) {
						oTileValueDump.setValueColor("Error");
						oTileValueDump.setIndicator("Up");
					} else if (count_dump <= 100 && count_dump >= 50) {
						oTileValueDump.setValueColor("Critical");
						oTileValueDump.setIndicator("Up");

					} else {
						oTileValueDump.setValueColor("Good");
						oTileValueDump.setIndicator("Down");
					}

					// Update error Count
					var oTile3 = this.getView().byId("idTile3");
					var oTileValueUpdt = this.getView().byId("idNumericContentUpdt");

					var dateFormat2 = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "dd/MM/yyyy"
					});
					var inputDate2 = dateFormat2.format(new Date());
					oTile3.setSubheader(inputDate2);
					// oTileValueUpdt.setTruncateValueTo(6);
					oTileValueUpdt.setValue(count_updt);

					// 		//Indicator logic based on base value
					if (count_updt > 100) {
						oTileValueUpdt.setValueColor("Error");
						oTileValueUpdt.setIndicator("Up");
					} else if (count_updt <= 100 && count_updt >= 50) {
						oTileValueUpdt.setValueColor("Critical");
						oTileValueUpdt.setIndicator("Up");

					} else {
						oTileValueUpdt.setValueColor("Good");
						oTileValueUpdt.setIndicator("Down");
					}

					// Lock Object Count
					var oTile4 = this.getView().byId("idTile4");
					var oTileValueLock = this.getView().byId("idNumericContentLock");

					var dateFormat3 = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "dd/MM/yyyy"
					});
					var inputDate3 = dateFormat3.format(new Date());
					oTile4.setSubheader(inputDate3);
					// oTileValueUpdt.setTruncateValueTo(6);
					oTileValueLock.setValue(count_lock);

					// 		//Indicator logic based on base value
					if (count_lock > 100) {
						oTileValueLock.setValueColor("Error");
						oTileValueLock.setIndicator("Up");
					} else if (count_lock <= 100 && count_lock >= 50) {
						oTileValueLock.setValueColor("Critical");
						oTileValueLock.setIndicator("Up");

					} else {
						oTileValueLock.setValueColor("Good");
						oTileValueLock.setIndicator("Down");
					}
				}, this)
			});
			oGlobalBusyDialog.close();

		},

		onPress: function (evt) {
			MessageToast.show("Background Jobs");

			this.getOwnerComponent().getRouter().navTo("Details_View", {});
		},
		onPressWork: function (evt) {
			MessageToast.show("Workflow");

			this.getOwnerComponent().getRouter().navTo("Workflow_View", {});
		},
		onPressIdoc: function (evt) {
			MessageToast.show("The IDOC");

			this.getOwnerComponent().getRouter().navTo("Idoc_View", {});
		},
		onPressDump: function (evt) {
			MessageToast.show("The Dumps");

			this.getOwnerComponent().getRouter().navTo("Dump_View", {});
		},
		onPressUpdt: function (evt) {
			MessageToast.show("The Update Error");

			this.getOwnerComponent().getRouter().navTo("update_view", {});
		},
		onPressLock: function (evt) {
			MessageToast.show("The Lock Objects");

			this.getOwnerComponent().getRouter().navTo("Lock_View", {});
		},

		// simulate a refresh of the date that lasts 2 secs
		handleRefresh: function (evt) {
			setTimeout(function () {
				this.byId("pullToRefresh").hide();
				this._onRouteFound();
			}.bind(this), 500);
		},

		onExit: function () {
			// You should stop the interval on exit. 
			// You should also stop the interval if you navigate out of your view and start it again when you navigate back. 
			if (this.intervalHandle) {
				clearInterval(this.intervalHandle);
			}
		}
	});
});