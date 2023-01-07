sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'managepov1.managepov1',
            componentId: 'ZC_POHEDERMKTPObjectPage',
            entitySet: 'ZC_POHEDERMKTP'
        },
        CustomPageDefinitions
    );
});