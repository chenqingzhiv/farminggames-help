// DataTables initialization script
// Automatically converts guide tables into sortable, searchable interactive tables
(function($) {
    'use strict';

    $(document).ready(function() {
        // Detect all tables on the page; if the table is inside .md-content with data rows
        // or has a "datatable" class, enable DataTables
        var $tables = $('.md-content table');
        
        $tables.each(function() {
            var $table = $(this);
            // Skip Utterances comment tables, nav tables, and other non-content tables
            if ($table.closest('.utterances, .md-sidebar, .md-header').length > 0) {
                return;
            }
            // Only process tables with at least 2 data rows (header + 1 data row)
            if ($table.find('tr').length >= 2) {
                // Auto-add .datatable class for CSS styling support
                $table.addClass('datatable');
                try {
                    $table.DataTable({
                        language: {
                            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/zh-Hans.json'
                        },
                        pageLength: 25,
                        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
                        order: [],
                        responsive: false,
                        autoWidth: false,
                        stateSave: false,
                        pagingType: 'full_numbers'
                    });
                } catch(e) {
                    // Silently fail, should not affect other page functionality
                }
            }
        });
    });
})(jQuery);
