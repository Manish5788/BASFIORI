@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Purchase header'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel.usageType:{
    serviceQuality: #X,
    sizeCategory: #S,
    dataClass: #MIXED
}

define view entity ZI_PO_HEADERMKR as select from zpoheader_dbmkr
      association [1..*] to ZI_PO_ITEMSMKR as _PurchaseItems on $projection.PurchaseOrderNumber = _PurchaseItems.PoOrder
      association[1] to ZI_PO_TYPEMKR as _OrderType on $projection.POType = _OrderType.PoType
      association[1] to ZI_SUPPLIER_DBMKR as _Supplier on $projection.Supplier = _Supplier.Supplierid
      association[1] to ZI_PO_STATUSMKR as _Status on $projection.PoStatu = _Status.Postatus
 {
    key po_order as PurchaseOrderNumber,
    po_desc as PODesc,
    po_type as POType,
    comp_code as CompanyCode,
    po_org as POOrg,
    po_status as PoStatu,
    supplier as Supplier,
    imageurl as Imageurl,
    create_by as CreateBy,
    created_date_time as CreatedDateTime,
    changed_date_time as ChangedDateTime,
    local_last_changed_by as LocalLastChangedBy,
    _PurchaseItems,
    _OrderType,
    _Supplier,
    _Status
}
