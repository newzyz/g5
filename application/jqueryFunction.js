$(() => {
    $("#result").hide();
    $("#btn1").click(function () {
        $("#result").show();
    });
    $("#btnLoad").click(btnLoad_Click);
    $("#btnNew").click(NewRoom);
    $("#btnConfirm").click(updateRoom);
});

function btnLoad_Click() {
    var idcheck = $("#ID").val();
    var urlAPI = "http://localhost/php/g5/api.php/getdb/" + idcheck;

    $.getJSON(urlAPI, { format: "json" })
        .done(function (data) {
            console.log(data);
            $("#Room").text(data["0"]["ginfo_room"]);
            $("#Type").text(data["0"]["rtype_eng"]);
            $("#Building").text(data["0"]["building_name"]);
            $("#View").text(data["0"]["rview_eng"]);
            $("#Price").text(data["0"]["ginfo_price"]);
            $("#Night").text(data["0"]["ginfo_night"]);
            $("#Total_Price").text(data["0"]["ginfo_price_total"]);
        })
        .fail(function (jqxhr, testStatus, error) { });
}

function NewRoom() {
    var idcheck = $("#IDnew").val();
    var urlAPI = "http://localhost/php/g5/api.php/getdb/" + idcheck;

    $.getJSON(urlAPI, { format: "json" })
        .done(function (data) {
            console.log(data);
            $("#Roomnew").text(data["0"]["ginfo_room"]);
            $("#Typenew").text(data["0"]["rtype_eng"]);
            $("#Buildingnew").text(data["0"]["building_name"]);
            $("#Viewnew").text(data["0"]["rview_eng"]);
            $("#Pricenew").text(data["0"]["ginfo_price"]);
            $("#Nightnew").text(data["0"]["ginfo_night"]);
            $("#Total_Pricenew").text(data["0"]["ginfo_price_total"]);
        })
        .fail(function (jqxhr, testStatus, error) { });
}

function selectionLoad() {
    var urlAPI = "http://localhost/php/g5/api.php/getRoom";
    // /"+$("#ID").val();
    $.getJSON(urlAPI, {
        format: "json"
    })
        .done(function (data) {
            console.log(data);
            var selectionObject = document.getElementById("select");
            for (var i = 0; i < data.length; i++) {
                var option = document.createElement("OPTION"),
                    txt = document.createTextNode(data[i]['room_name']);
                option.appendChild(txt);
                option.setAttribute("value", data[i]['room_id']);
                select.insertBefore(option, select.lastChild);
                // $("#element-id").val(data[i]['room_id']);
            }
        })
        .fail(function (jqxhr, textStatus, error) {
        })
}
function updateRoom() {
    window.location.replace("http://localhost/php/g5/api.php/updateRoom/"+$("#select").val()+"/1");
}