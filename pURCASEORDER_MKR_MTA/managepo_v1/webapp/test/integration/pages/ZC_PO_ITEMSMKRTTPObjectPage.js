sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'managepov1.managepov1',
            componentId: 'ZC_PO_ITEMSMKRTTPObjectPage',
            entitySet: 'ZC_PO_ITEMSMKRTTP'
        },
        CustomPageDefinitions
    );
});