@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Root View for BO Objects'
define root view entity ZI_POHEDERMKTP as select from ZI_PO_HEDERPOPRICEMK
composition[*] of ZI_PO_ITEMSMKRtTP as _POitems 
association[1] to ZC_SUPPLIER_DBMKR as _SupplierData on $projection.Supplier = _SupplierData.Supplierid
association[1] to ZC_PO_STATUSMKR as _OrderStatus on $projection.PoStatu = _OrderStatus.Postatus
association[1] to ZC_PO_TYPEMKR as _OrderType on $projection.POType = _OrderType.PoType
{
    key PurchaseOrderNumber,
    PODesc,
    PurchaseTotalPrice,
    PriceUnit,
    POType,
    CompanyCode,
    POOrg,
    PoStatu,
    Supplier,
    Imageurl,
          case
          when PoStatu = '01' then 2
          when PoStatu = '02' then 3
          when PoStatu = '03' then 1
          else 0
          end as CriticalityValue,
      case
      when PurchaseTotalPrice < 500 then '03'
      when PurchaseTotalPrice > 500 and PurchaseTotalPrice < 1000 then '02'
      when PurchaseTotalPrice > 1000 then '01'
      else '00'
      end     as Priority,
    @Semantics.user.createdBy: true
    CreateBy,
    @Semantics.systemDateTime.createdAt: true
    CreatedDateTime,
    @Semantics.systemDateTime.localInstanceLastChangedAt: true
    ChangedDateTime,
    @Semantics.user.lastChangedBy: true
    LocalLastChangedBy,
    /* Associations */
    _OrderType,
    _SupplierData,
    _OrderStatus,
    _POitems // Make association public
}
