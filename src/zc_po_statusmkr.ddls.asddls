@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Po Status Consumption view'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel.usageType:{
    serviceQuality: #X,
    sizeCategory: #S,
    dataClass: #MIXED
}

@Search.searchable: true
define view entity ZC_PO_STATUSMKR as select from ZI_PO_STATUSMKR {

@ObjectModel.text.element: ['Statusdesc']

    key Postatus,
@Semantics.text:true
@EndUserText.label: 'Status Description'
@Search.defaultSearchElement: true
@Search.fuzzinessThreshold: 0.7
    Statusdesc
}
