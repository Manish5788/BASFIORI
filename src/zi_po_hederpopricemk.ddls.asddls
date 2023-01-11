@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'pURCHASE HEADER  PO PRICE'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel.usageType:{
    serviceQuality: #X,
    sizeCategory: #S,
    dataClass: #MIXED
}

//@VDM.viewType: #COMPOSITE
define view entity ZI_PO_HEDERPOPRICEMK as select from ZI_PO_HEADERMKR {
    key PurchaseOrderNumber,
    PODesc,
    @Semantics.amount.currencyCode: 'PriceUnit'
    sum( _PurchaseItems.ItemPrice ) as PurchaseTotalPrice,
    _PurchaseItems.PriceUnit,
    POType,
    CompanyCode,
    POOrg,
    PoStatu,
    Supplier,
    Imageurl,
    CreateBy,
    CreatedDateTime,
    ChangedDateTime,
    LocalLastChangedBy,
    /* Associations */
    _OrderType,
    _PurchaseItems,
    _Supplier
}
group by
    PurchaseOrderNumber,
    PODesc,
    POType,
    CompanyCode,
    POOrg,
    PoStatu,
    Supplier,
    Imageurl,
    CreateBy,
    CreatedDateTime,
    ChangedDateTime,
    LocalLastChangedBy,
    _PurchaseItems.PriceUnit

