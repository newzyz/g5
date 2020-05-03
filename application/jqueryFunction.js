    $(() => {
        selectionLoad();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('ginfo_id');
        var urlAPI = "http://localhost/php/g5/api.php/getdb/" + id;
        $.getJSON(urlAPI, { format: "json" })
            .done(function (data) {
                console.log(data);
                $("#oldroom").val(data["0"]["room_id"]);
                $("#Room").text(data["0"]["room_name"]);
                $("#Type").text(data["0"]["rtype_eng"]);
                $("#Building").text(data["0"]["building_name"]);
                $("#View").text(data["0"]["rview_eng"]);
                $("#Price").text(data["0"]["room_price"]);
                $("#Night").text(data["0"]["ginfo_night"]);
                $("#Total_Price").text((data["0"]["room_price"])*parseInt(data["0"]["ginfo_night"]));
            })
            .fail(function (jqxhr, testStatus, error) { });
        $('#select').change(showNewRoom);
        $("#btnConfirm").click(saveRoom);
    });
    

    function showNewRoom() {
       night = $("#Night").text();
         var idcheck = $("#select").val();
         var urlAPI = "http://localhost/php/g5/api.php/getNewRoom/" + idcheck;

         $.getJSON(urlAPI, { format: "json" })
             .done(function (data) {
                 console.log(data);
                 $("#Roomnew").text(data["0"]["room_name"]);
                 $("#Typenew").text(data["0"]["rtype_eng"]);
                 $("#Buildingnew").text(data["0"]["building_name"]);
                 $("#Viewnew").text(data["0"]["rview_eng"]);
                 $("#Pricenew").text(data["0"]["room_price"]);
                 $("#Nightnew").text(night)
                 $("#Total_Pricenew").text((data["0"]["room_price"])* parseInt(night));
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
                    $("#element-id").val(data[i]['room_id']);
                }
            })
            .fail(function (jqxhr, textStatus, error) {
            })
    }
    function moveroom(){
        var name = $('#inputName').val();
        var email = $('#inputEmail').val();
        var message = $('#inputMessage').val();
        if(name.trim() == '' ){
            alert('Please enter your name.');
            $('#inputName').focus();
            return false;
        }else if(email.trim() == '' ){
            alert('Please enter your email.');
            $('#inputEmail').focus();
            return false;
        }else if(email.trim() != '' && !reg.test(email)){
            alert('Please enter valid email.');
            $('#inputEmail').focus();
            return false;
        }else if(message.trim() == '' ){
            alert('Please enter your message.');
            $('#inputMessage').focus();
            return false;
        }else{
            $.ajax({
                type:'POST',
                url:'submit_form.php',
                data:'contactFrmSubmit=1&name='+name+'&email='+email+'&message='+message,
                beforeSend: function () {
                    $('.submitBtn').attr("disabled","disabled");
                    $('.modal-body').css('opacity', '.5');
                },
                success:function(msg){
                    if(msg == 'ok'){
                        $('#inputName').val('');
                        $('#inputEmail').val('');
                        $('#inputMessage').val('');
                        $('.statusMsg').html('<span style="color:green;">Thanks for contacting us, we\'ll get back to you soon.</p>');
                    }else{
                        $('.statusMsg').html('<span style="color:red;">Some problem occurred, please try again.</span>');
                    }
                    $('.submitBtn').removeAttr("disabled");
                    $('.modal-body').css('opacity', '');
                }
            });
        }
    }

    function saveRoom(){
            var api_url = "http://localhost/php/g5/api.php/updateRoom/";
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const key1 = urlParams.get('ginfo_id');
            var key2 = $("#oldroom").val();
            var key3 = $("#select").val();
            var tester = api_url + key1 + "/" + key2 + "/" +key3;
            alert(tester);
            $.ajax({
                type: "POST",
                url: api_url + key1 + "/" + key2 + "/" +key3,

                success: function(result, status, xhr) {
                    alert("success");
                },
                error: function(xhr, status, error) {
                    alert(
                        api_url+
                        "Result: " +
                        status +
                        " " +
                        error +
                        " " +
                        xhr.status +
                        " " +
                        xhr.statusText
                    );
                },
            });
    };
