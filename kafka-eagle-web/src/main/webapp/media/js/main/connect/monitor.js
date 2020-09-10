$(document).ready(function () {
    $("#result").dataTable({
        "bSort": false,
        "bLengthChange": false,
        "bProcessing": true,
        "bServerSide": true,
        "fnServerData": retrieveData,
        "sAjaxSource": "/connect/monitor/table/ajax",
        "aoColumns": [{
            "mData": 'name'
        }, {
            "mData": 'state'
        }, {
            "mData": 'workid'
        }, {
            "mData": 'type'
        }, {
            "mData": 'action'
        }, {
            "mData": 'operate'
        }]
    });

    function retrieveData(sSource, aoData, fnCallback) {
        $.ajax({
            "type": "get",
            "contentType": "application/json",
            "url": sSource,
            "dataType": "json",
            "data": {
                aoData: JSON.stringify(aoData)
            },
            "success": function (data) {
                fnCallback(data)
            }
        });
    }

    $("#ke-create-connect-uri-btn").click(function () {
        $('#ke_connect_uri_create_dialog').modal('show');
    });

    $(document).on('click', 'a[name=ke_connect_uri_modify]', function () {
        $('#ke_connect_uri_modify_dialog').modal('show');
        var href = $(this).attr("href");
        var id = href.split("#")[1];
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: '/connect/uri/schema/' + id + '/ajax',
            success: function (datas) {
                $("#ke_connect_uri_name_modify").val(datas.connectUri);
                $("#ke_connect_uri_id_modify").val(datas.id);
            }
        });
    });

    $(document).on('click', 'a[name=ke_connect_uri_del]', function () {
        var href = $(this).attr("href");
        var val = $(this).attr("val");
        var id = href.split("#")[1];
        $("#ke_connect_config_remove_content").html("<p class='alert alert-danger'>Are you sure you want to delete kafka connect uri [<strong>" + val + "</strong>] ?<p>");
        $("#ke_connect_config_footer").html("<a href='/connect/uri/" + id + "/del' class='btn btn-danger'>Remove</a>");
        $('#ke_connect_config_delete').modal({
            backdrop: 'static',
            keyboard: false
        });
        $('#ke_connect_config_delete').modal('show').css({
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translateX(-50%) translateY(-50%)'
        });
    });
});