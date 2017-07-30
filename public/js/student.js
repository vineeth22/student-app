$(document).ready(function () {

    $("#insertStudent").click(function () {
        var data = {};
        data.id = $("#id").val();
        data.name = $("#name").val();
        data.department = $("#department").val();

        $.ajax({
            url: 'insertStudent',
            data: JSON.stringify(data),
            type: 'POST',
            contentType: 'application/json; charset=UTF-8'
        })
            .done(function (res) {
                $("#output").text(res);
            })
            .fail(function (xhr) {
                $("#output").text(xhr.responseText);
            })
    });
    $("#getStudent").click(function () {
        var data = new Object();
        data.id = $("#getId").val();

        $.ajax({
            url: 'getStudent',
            data: data,
            type: 'GET',
            contentType: 'application/json; charset=UTF-8'
        })
            .done(function (res) {
                $("#output").text(JSON.stringify(res), null, 2);
            })
            .fail(function (xhr) {
                $("#output").text(xhr.responseText);
            })
    });
});
