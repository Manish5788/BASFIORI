sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'managepov1.managepov1',
            componentId: 'ZC_POHEDERMKTPList',
            entitySet: 'ZC_POHEDERMKTP'
        },
        CustomPageDefinitions
    );
});