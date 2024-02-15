$(document).ready(function() {
    // Thiết lập cấu hình mặc định cho AJAX
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true // Gửi cookie cùng với yêu cầu AJAX
        },
        crossDomain: true
    });

    $(".form-btn").click(function(){
        var email = $("#email").val();
        var password = $("#password").val();
        $.ajax({
            method: "POST",
            url: "http://localhost:8000/api/v1/user/login",
            dataType: 'json',
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            data: JSON.stringify({ 
                email: email,
                password: password
            })
        })
        .done(function( msg ) {
            if(msg.success){
                console.log(msg)
            }
        })
        .fail(function(msg){
            console.log(msg.responseJSON)
        });
    })
});
