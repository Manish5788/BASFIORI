@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'ITEM PO DETAILS'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel.usageType:{
    serviceQuality: #X,
    sizeCategory: #S,
    dataClass: #MIXED
}
define view entity ZI_PO_ITEMSMKR as select from zpoitems_dbmkr

 association [1] to ZI_PO_HEADERMKR as _PurchaseHeader on $projection.PoOrder = _PurchaseHeader.PurchaseOrderNumber
 association[1] to I_Currency as _Currency on $projection.PriceUnit = _Currency.Currency
 {
    key po_order as PoOrder,
    key po_item as PoItem,
    short_text as ShortText,
    material as Material,
    plant as Plant,
    mat_group as MatGroup,
    @Semantics.quantity.unitOfMeasure: 'OrderUnit'
    order_qunt as OrderQunt,
    order_unit as OrderUnit,

    @Semantics.amount.currencyCode: 'PriceUnit'
    product_price as ProductPrice,
    price_unit as PriceUnit,
    @Semantics.amount.currencyCode: 'PriceUnit'
    cast( cast( product_price as abap.dec(10,2 ) ) * cast( order_qunt as abap.dec(10,2) ) as abap.dec( 10, 2 ) ) as ItemPrice,
    local_last_changed_by as LocalLastChangedBy,
    local_last_changed_at as LocalLastChangedAt,
    _PurchaseHeader,
    _Currency
}
