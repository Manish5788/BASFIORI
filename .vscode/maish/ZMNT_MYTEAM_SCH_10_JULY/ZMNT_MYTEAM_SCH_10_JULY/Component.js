sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"myteamappmyteamapp/model/models",
	"myteamappmyteamapp/controller/ListSelector"
], function(UIComponent, Device, models,ListSelector) {
	"use strict";

	return UIComponent.extend("myteamappmyteamapp.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {

			this.oListSelector = new ListSelector();
			// this._oErrorHandler = new ErrorHandler(this);
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// create the views based on the url/hash
			this.getRouter().initialize();
		}
	});
});