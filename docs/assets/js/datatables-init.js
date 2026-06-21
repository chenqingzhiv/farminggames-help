// DataTables 初始化脚本
// 自动将攻略中的表格转换为可排序、可搜索的交互式表格
(function($) {
    'use strict';

    $(document).ready(function() {
        // 检测页面中所有表格，如果表格在 .md-content 区域内且有数据行
        // 或者表格带有 "datatable" 类，则启用 DataTables
        var $tables = $('.md-content table');
        
        $tables.each(function() {
            var $table = $(this);
            // 跳过 Utterances 评论区表格、nav 表格等非内容表格
            if ($table.closest('.utterances, .md-sidebar, .md-header').length > 0) {
                return;
            }
            // 只处理有至少2行数据（表头+1行数据）的表格
            if ($table.find('tr').length >= 2) {
                try {
                    $table.DataTable({
                        language: {
                            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/zh-Hans.json'
                        },
                        pageLength: 25,
                        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, '全部']],
                        order: [],
                        responsive: false,
                        autoWidth: false,
                        stateSave: false,
                        pagingType: 'full_numbers'
                    });
                } catch(e) {
                    // 静默失败，不影响页面其他功能
                }
            }
        });
    });
})(jQuery);
