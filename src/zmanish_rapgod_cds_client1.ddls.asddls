@AbapCatalog.sqlViewName: 'ZRAPGOD3'
@AbapCatalog.compiler.compareFilter: true
@AbapCatalog.preserveKey: true
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'CLIENT'
define view ZMANISH_RAPGOD_CDS_CLIENT1 as select from /dmo/flight {

$session.client as CLIEN1T,
$session.system_date as DAT111E,
$session.user as USER1
    
}
