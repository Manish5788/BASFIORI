function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZMF_MONI_DASH_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}