@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Supplier consumption View'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel.usageType:{
    serviceQuality: #X,
    sizeCategory: #S,
    dataClass: #MIXED
}
@Search.searchable: true
define view entity ZC_SUPPLIER_DBMKR as select from ZI_SUPPLIER_DBMKR {
@ObjectModel.text.element: ['SupplierName']
    key Supplierid,
@Search.defaultSearchElement: true
@Search.fuzzinessThreshold: 0.7
@EndUserText.label: 'Supplier Name'

@Semantics.text: true
@Semantics.name.fullName: true
    SupplierName,
@Semantics.eMail.type: [#WORK]
@EndUserText.label: 'Email'
    EmailAddress,
@Semantics.telephone.type: [#WORK]
@EndUserText.label: 'Phone No'
    PhoneNumber,
@Semantics.telephone.type: [#FAX]
@EndUserText.label: 'FAX No'
    FaxNumber,
'1000' as CompanyCode,
@EndUserText.label: 'Web Address'
    WebAddress
}
