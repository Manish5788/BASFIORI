@EndUserText.label: 'Projection of BO Root'
@AccessControl.authorizationCheck: #NOT_REQUIRED
@Metadata.allowExtensions: true
@ObjectModel.semanticKey: ['PurchaseOrderNumber']
@Search.searchable: true
define root view entity ZC_POHEDERMKTP

provider contract transactional_query
 as projection on ZI_POHEDERMKTP
  {
   @ObjectModel.text.element: ['PODesc']
    key PurchaseOrderNumber,
   @Search.defaultSearchElement: true
   @Search.fuzzinessThreshold: 0.7
   @Search.ranking: #HIGH
    PODesc,
   @Semantics.amount.currencyCode: 'PriceUnit'
    PurchaseTotalPrice,
   @UI.hidden: true
    PriceUnit,
    @Consumption.valueHelpDefinition: [{ entity:{name: 'ZC_PO_TYPEMKR',element: 'PoType'  } } ]
    POType,
    CompanyCode,
    POOrg,
    @Search.defaultSearchElement: true
    @Search.ranking: #MEDIUM
    @Consumption.valueHelpDefinition: [{ entity:{ name: 'ZC_SUPPLIER_DBMKR', element: 'Supplierid' },
      additionalBinding: [{ element: 'CompanyCodeSupplier' ,localElement: 'CompanyCode'}] }]
    @ObjectModel.text.element: ['SupplierName']
    @Consumption.filter:{multipleSelections: false }
    Supplier,
   _SupplierData.SupplierName,
    @Semantics.imageUrl: true
    Imageurl,
    @UI.hidden: true
    CriticalityValue,
    @Consumption.valueHelpDefinition: [{ entity:{name: 'ZC_PO_STATUSMKR',element: 'PoStatu'  } } ]
    @ObjectModel.text.element: ['StatusDesc']
    PoStatu,
    _OrderStatus.Statusdesc,
    CreateBy,
    CreatedDateTime,
    ChangedDateTime,
    LocalLastChangedBy,
    /* Associations */
    _OrderType,
    _POitems: redirected to composition child ZC_PO_ITEMSMKRTTP,
    _SupplierData
}
