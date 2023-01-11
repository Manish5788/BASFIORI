@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'PURCHASE ITEMS DETAIL'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel.usageType:{
    serviceQuality: #X,
    sizeCategory: #S,
    dataClass: #MIXED
}
define view entity ZC_PURCHASE_DITEM_MKR as select from ZI_PO_ITEMSMKR {
    key PoOrder,
    key PoItem,
    ShortText,
    Material,
    Plant,
    MatGroup,  
   @Semantics.quantity.unitOfMeasure: 'OrderUnit'
    OrderQunt,
    OrderUnit,
   @Semantics.amount.currencyCode: 'PriceUnit'
    ProductPrice,
    PriceUnit,
    ItemPrice,
    LocalLastChangedBy,
    LocalLastChangedAt,
    /* Associations */
    _Currency,
    _PurchaseHeader
}
