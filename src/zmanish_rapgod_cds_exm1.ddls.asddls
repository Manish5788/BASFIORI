@AbapCatalog.sqlViewName: 'ZRAPGOD2'
@AbapCatalog.compiler.compareFilter: true
@AbapCatalog.preserveKey: true
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'ZMANISH_RAPGOD_CDS_EXM1'
define view ZMANISH_RAPGOD_CDS_EXM1 as select from /DMO/I_Flight_R {

key AirlineID,
key ConnectionID,
key FlightDate,
Price,
CurrencyCode,
PlaneType,
MaximumSeats,
OccupiedSeats,
/* Associations */
_Airline
    
}
