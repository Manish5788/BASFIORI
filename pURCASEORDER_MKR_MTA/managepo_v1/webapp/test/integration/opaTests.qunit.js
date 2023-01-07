sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'managepov1/managepov1/test/integration/FirstJourney',
		'managepov1/managepov1/test/integration/pages/ZC_POHEDERMKTPList',
		'managepov1/managepov1/test/integration/pages/ZC_POHEDERMKTPObjectPage',
		'managepov1/managepov1/test/integration/pages/ZC_PO_ITEMSMKRTTPObjectPage'
    ],
    function(JourneyRunner, opaJourney, ZC_POHEDERMKTPList, ZC_POHEDERMKTPObjectPage, ZC_PO_ITEMSMKRTTPObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('managepov1/managepov1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheZC_POHEDERMKTPList: ZC_POHEDERMKTPList,
					onTheZC_POHEDERMKTPObjectPage: ZC_POHEDERMKTPObjectPage,
					onTheZC_PO_ITEMSMKRTTPObjectPage: ZC_PO_ITEMSMKRTTPObjectPage
                }
            },
            opaJourney.run
        );
    }
);