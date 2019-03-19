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
        var id = jelem.attr("id");
        datatablesviewsmapdt_asInitVals[id] = new Array();
        nbcolumns = $('td', $("tbody tr", jelem)[0]).length;
        cdefs = new Array();
        for (i=0;i<nbcolumns;i++) {
                cdefs[cdefs.length] = {
                targets: [i],
                searchable: true,
                width: "1%"
            };
        }
        datatablesviewsmapdt_tables[id] = jelem.dataTable({
            dom: 'Blfrtip',
            language: {"url": "@@collective.js.datatables.translation"},
            buttons: [{
                extend: 'excelHtml5',
                text: 'Export als XLS-Datei',
                sheetName: 'Tabelle 1'
            }],
            pagingType: "full_numbers",
            columnDefs: cdefs
        });
    });
}); 
