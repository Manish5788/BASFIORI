@AbapCatalog.sqlViewName: 'ZRAPGODD'
@AbapCatalog.compiler.compareFilter: true
@AbapCatalog.preserveKey: true
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'RAP GOD'
define view ZMANISH_RAPGOD_CDS
  as select from /dmo/airport
{

  key airport_id                    as AirportId,
      name                          as Name,
      city                          as City,
      country                       as Country,

      case country

       when 'DE' then 'germany'

       when 'FR' then 'FRANCE'
       when 'US' then 'SUPERPOWER'
       else 'OTHER'

       end                          as CuntrName,

      cast(0.25 as abap.fltp( 16 )) as Literal



}
