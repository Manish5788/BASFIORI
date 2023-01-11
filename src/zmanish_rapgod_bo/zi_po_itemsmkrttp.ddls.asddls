@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Purchase order item BO'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel.usageType:{
    serviceQuality: #X,
    sizeCategory: #S,
    dataClass: #MIXED
}
define view entity ZI_PO_ITEMSMKRtTP as select from ZI_PO_ITEMSMKR 
association to parent ZI_POHEDERMKTP as _PurchaseHeader on $projection.PoOrder = _PurchaseHeader.PurchaseOrderNumber 
{
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
