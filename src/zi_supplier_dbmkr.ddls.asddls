@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'SUPPLIER CDS VIEW'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel.usageType:{
    serviceQuality: #X,
    sizeCategory: #S,
    dataClass: #MIXED
}
define view entity ZI_SUPPLIER_DBMKR as select from zsupplier_dbmkr {
    key supplierid as Supplierid,
    supplier_name as SupplierName,
    email_address as EmailAddress,
    phone_number as PhoneNumber,
    fax_number as FaxNumber,
    web_address as WebAddress
}
