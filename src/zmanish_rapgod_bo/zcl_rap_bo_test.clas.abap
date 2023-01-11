CLASS zcl_rap_bo_test DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_rap_bo_test IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.

  DATA: LT_KEYS  TYPE TABLE FOR READ IMPORT ZC_POHEDERMKTP.

  "Read Entity

  LT_KEYS = VALUE #( ( %KEY-PurchaseOrderNumber = '0000001000'
                       %control-PODesc = 01
                       %control-CompanyCode = 01
                       %control-Imageurl = 01
                          ) ).

  "READ ENTITY ZC_POHEDERMKTP
  "ALL FIELDS WITH VALUE #( ( %KEY-PurchaseOrderNumber = '0000001000'  ) )
 " RESULT DATA(LT_RESULT).

    READ ENTITY ZC_POHEDERMKTP FROM LT_KEYS
  "ALL FIELDS WITH VALUE #( ( %KEY-PurchaseOrderNumber = '0000001000'  ) )
  RESULT DATA(LT_RESULT).

  OUT->write( LT_RESULT ).

  "Read By Association
  READ ENTITY ZC_POHEDERMKTP
  BY \_POitems
  ALL FIELDS WITH VALUE #( ( %key-PurchaseOrderNumber = '0000001000' ) )
 RESULT DATA(LT_ITEM).

 OUT->write( LT_ITEM ).

"Below ways we can create entities without using early numbering

 "MODIFY ENTITY ZC_POHEDERMKTP

 "CREATE FIELDS ( PurchaseOrderNumber PODesc CompanyCode )

" WITH VALUE #( (
 "              %cid = 'CID_IND'
  "             PurchaseOrderNumber = '0000001012'
   "            PODesc = 'Test BO FROM CLOUD'
    "           CompanyCode = 'AR01' ) )
     "          MAPPED DATA(LT_MAPPED).

"OUT->write( LT_MAPPED ).

 "Creation with multiple Fields on Purchase Header
    modify ENTITY zc_pohedermktp
    CREATE
*    AUTO FILL CID (if you don't pass %cid used this option
    FIELDS  ( podesc companycode )
    WITH VALUE #(
                  (
                  %cid = 'CID_12253'
*                  PurchaseOrderNumber = '0000001012' //if you implement early number do not pass.
                  podesc = 'Test from BOO 123'
                  CompanyCode = '1008' )
                  (
                  %cid = 'CID_2345263'
*                  PurchaseOrderNumber = '0000001013'
                  podesc = 'Test from BOO 113'
                  CompanyCode = '1007' )

                   )
                  MAPPED data(lt_mapped).
                  COMMIT ENTITIES.
                  if   sy-subrc eq 0.

                  endif .



                   OUT->write( LT_MAPPED ).


 "Modify Items

 MODIFY ENTITY zc_pohedermktp
 CREATE BY \_POItems
 FIELDS ( PoItem plant itemprice material matgroup )
 WITH VALUE #( ( PURCHASEORDERNUMBER = '0000001013'
                 %target = VALUE #( ( %cid = 'CID_230'
                                      PoItem = '0100'
                                      plant = '1010'
                                      itemprice = 100
                                      material =   'MaterialNew'
                                      matgroup = '001' )

                                      ( %cid = 'CID_231'
                                        PoItem = '0020'
                                      plant = '1020'
                                      itemprice = 400
                                      material =   'MaterialNew1'
                                      matgroup = '002' ) ) ) )

                                      FAILED data(lt_failed)
                                      MAPPED DATA(LT_MAP)
                                      REPORTED DATA(LT_REPORT).
                                      COMMIT ENTITIES.
  ENDMETHOD.
ENDCLASS.
