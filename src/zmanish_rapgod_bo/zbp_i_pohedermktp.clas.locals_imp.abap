CLASS lhc_ZI_POHEDERMKTP DEFINITION INHERITING FROM cl_abap_behavior_handler.
  PRIVATE SECTION.

    METHODS get_instance_authorizations FOR INSTANCE AUTHORIZATION
      IMPORTING keys REQUEST requested_authorizations FOR zi_pohedermktp RESULT result.
    METHODS earlynumbering_create FOR NUMBERING
      IMPORTING entities FOR CREATE purchaseorder.

          METHODS earlynumbering_cba_poitems FOR NUMBERING
      IMPORTING entities FOR CREATE PurchaseOrder\_POitems.

ENDCLASS.

CLASS lhc_ZI_POHEDERMKTP IMPLEMENTATION.

  METHOD get_instance_authorizations.
  ENDMETHOD.

  METHOD earlynumbering_create.

   DATA: lv_max_po TYPE c LENGTH 10.
    SELECT MAX( purchaseordernumber )
      FROM zc_pohedermktp
      INTO @lv_max_po.

    DATA(lt_entities) = entities.

    LOOP AT lt_entities INTO DATA(ls_entity).
      lv_max_po = lv_max_po + 1.
      ls_entity-PurchaseOrderNumber = |{ lv_max_po ALPHA = IN }|.

      APPEND VALUE #(   %cid = ls_entity-%cid

                        PurchaseOrderNumber = ls_entity-PurchaseOrderNumber )
                         TO mapped-purchaseorder.

    ENDLOOP.

  ENDMETHOD.

  METHOD earlynumbering_cba_poitems.


    SELECT po_order,po_item AS itemno FROM zpoitems_db
     FOR ALL ENTRIES IN @entities
     WHERE po_order EQ @entities-PurchaseOrderNumber
     INTO TABLE @DATA(lt_poitems).

    IF  sy-subrc EQ 0.

      SORT lt_poitems BY po_order.

    ENDIF.

    DATA(lt_final_keys) = entities.

    LOOP AT lt_final_keys INTO DATA(ls_final_keys).

      "Get Maximum number from item from the PO

      SELECT MAX( itemno ) FROM @lt_poitems AS itemkeys

        WHERE po_order = @ls_final_keys-PurchaseOrderNumber
        INTO @DATA(lv_itemno).

      LOOP AT ls_final_keys-%target INTO DATA(ls_item).

        LV_ITEMno += 10.

        ls_item-poitem = |{ lv_itemno ALPHA = IN }|.

        APPEND VALUE #( %cid = ls_item-%cid %key = ls_item-%key ) TO mapped-zi_po_itemsmkrttp.

      ENDLOOP.

    ENDLOOP.


  ENDMETHOD.

ENDCLASS.
