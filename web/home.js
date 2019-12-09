$(document).ready(function () {

    $("#log_out").click(function () {
        sessionStorage.clear();
        window.location.replace("/login");
    })

    let username = sessionStorage.getItem('user');
    //let token = sessionStorage.getItem('token');
    let _id = sessionStorage.getItem('userId');
    //console.log(username);
    if (username == null) {
        window.location.replace("/login");
    } else {
        $("#username").text(username);
    }
    let user = {
        username: username,
        //token: token,
        userId: _id
    }
    $("#listOfClasses").on("click",".myClass", function(e){
        sessionStorage.setItem("currentClass", e.target.getAttribute('value'));
        window.location.replace("/tasks");
    })

    $.ajax({
        url: "/api/"+ user.userId +"/classNames",
        type: "GET",
        dataType: "text",
        success: function (data) {
            result = JSON.parse(data);
            if (result) {
               // console.log(result);
                result.forEach(function(item, index){
                   // console.log(item.ClassName);
                        let listItem = $('<li class="list-group-item myClass"> </li>');
                        listItem.text(item.ClassName);
                        listItem.attr('value',item.ClassName);
                        $("#listOfClasses").append(listItem);
                    });
            } 
        },
        error: function () {

        }
    });
});