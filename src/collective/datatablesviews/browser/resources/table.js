if(typeof(datatablesviewsmapdt_tables) == "undefined") {
    var datatablesviewsmapdt_asInitVals = new Array();
    var datatablesviewsmapdt_tables = new Array();
}
jq(document).ready(function() {
    $.fn.dataTable.moment('MM/YYYY');
    $.fn.dataTable.moment('DD.MM.YYYY');
    $.fn.dataTable.moment('DD.MM.YY HH:mm');
    $.fn.dataTable.moment('DD.MM.YYYY HH:mm:ss');
    var datatablesviewsmapdt_elems = jq(".datatable-wrapper table");
    datatablesviewsmapdt_elems.each(function(i, elem){
        var jelem = jq(elem);
        var summary = jelem.attr("summary");
        datatablesviewsmapdt_asInitVals[summary] = new Array();
        nbcolumns = $('td', $("tbody tr", jelem)[0]).length;
        cdefs = new Array();
        for (i=0;i<nbcolumns;i++) {
                cdefs[cdefs.length] = {
                targets: [i],
                searchable: true
            };
        }
        datatablesviewsmapdt_tables[summary] = jelem.DataTable({
            dom: 'Blfrtip',
            language: {"url": "++resource++collective.datatablesviews/de.json"},
            buttons: [{
                extend: 'excelHtml5',
                text: 'Export als XLS-Datei',
                sheetName: 'Tabelle 1'
            }],
            pagingType: "full_numbers",
            columnDefs: cdefs,
            // Settings for input filtering in header
            orderCellsTop: true,
            fixedHeader: true
        });
        // Filter in table header.
        $('thead tr', jelem).clone(true).appendTo('thead', jelem);
        $('thead tr:eq(1) th', jelem).each( function (i) {
            var title = $(this).text();
            var table = datatablesviewsmapdt_tables[summary];
            $(this).html('<input type="text" placeholder="Search '+title+'" />');

            $('input', this).on('keyup change', function () {
                if (table.column(i).search() !== this.value) {
                    table
                        .column(i)
                        .search( this.value )
                        .draw();
                }
            } );
        } );
    });
});
