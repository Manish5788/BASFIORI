@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'PURCHASE HEADER DETAILS'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel.usageType:{
    serviceQuality: #X,
    sizeCategory: #S,
    dataClass: #MIXED
}
@Metadata.allowExtensions: true
@ObjectModel.semanticKey: ['PurchaseOrderNumber']
@Search.searchable: true
define view entity ZC_PURCHASE_DHEAD_MKR
  as select from ZI_PO_HEDERPOPRICEMK

  association [*] to ZC_PURCHASE_DITEM_MKR as _Items     on $projection.PurchaseOrderNumber = _Items.PoOrder
  association [1] to ZC_SUPPLIER_DBMKR           as _Supplier  on $projection.Supplier = _Supplier.Supplierid
  association [1] to ZC_PO_TYPEMKR         as _OrderType on $projection.POType = _OrderType.PoType
  association [1] to ZC_PO_STATUSMKR       as _Status    on $projection.PoStatu = _Status.Postatus

{
      @ObjectModel.text.element: ['PODesc']
  key PurchaseOrderNumber,
      @Search.defaultSearchElement: true
      @Search.fuzzinessThreshold: 0.7
      @Search.ranking: #HIGH
      PODesc,
      PurchaseTotalPrice,
      PriceUnit,
      @Consumption.valueHelpDefinition: [{entity:{name: 'ZC_PO_STATUSMKR' , element: 'Postatus' }}]
      POType,
      @Consumption.valueHelpDefinition: [{ entity:{name : 'ZC_PO_STATUSMKR', element: 'PoStatu'} }]
      @ObjectModel.text.element: ['StatusDesc']
      PoStatu,
      _Status.Statusdesc as StatusDesc,
      CompanyCode,
      POOrg,
      @Search.defaultSearchElement: true
      @Search.ranking: #MEDIUM
      @Consumption.valueHelpDefinition: [{entity:{name: 'ZC_SUPPLIER_DBMKR' , element: 'Supplierid' },
      additionalBinding: [{element: 'CompanyCode' , localElement: 'CompanyCode' }] }]
      @ObjectModel.text.element: ['SupplierName']
      @Consumption.filter.multipleSelections: true
      Supplier,
      
      case 
      
      when PoStatu = '01' then 1
      when PoStatu = '02' then 2
      when PoStatu = '03' then 3
      
      else 0
      
      end as CriticalityValue,
      
      _Supplier.SupplierName as SupplierName,
      @Semantics.imageUrl: true
      Imageurl,
      CreateBy,
      CreatedDateTime,
      ChangedDateTime,
      LocalLastChangedBy,
      /* Associations */
      _OrderType,
      _Items,
      _Supplier,
      _Status
}
