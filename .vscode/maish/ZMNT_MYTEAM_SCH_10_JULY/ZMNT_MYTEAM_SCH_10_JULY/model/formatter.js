sap.ui.define([], function() {
	"use strict";

	return {

		// ToolTip for Status Color Indicator

		formatTooltip: function(v, w) {

			if (w === 'X') {

				return "Dispatched On Mobile";
			} else if (v === 'E0005') {

				return "Completed";
			} else if (v === 'E0003') {

				return "Dispatched";
			} else if (v === 'E0015') {

				return "Scheduled";
			}
			else if (v === 'E0001') {

				return "Proposed";
			}
			else if (v === 'E0006') {

				return "Reschedule";
			}

			return v;

		}

	};

});