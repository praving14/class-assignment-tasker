$(document).ready(function () {

    $("#log_out").click(function () {
        sessionStorage.clear();
        window.location.replace("/login");
    })

    let username = sessionStorage.getItem('user');
    //let token = sessionStorage.getItem('token');
    let _id = sessionStorage.getItem('userId');
    let currentClass_ = sessionStorage.getItem('currentClass');
    //console.log(username);
    if (username == null) {
        window.location.replace("/login");
    } else {
        $("#username").text(username);
    }

    $("#className").text(currentClass_);
    let user = {
        username: username,
        ClassName:currentClass_,
        userId: _id
    }


    $.ajax({
        url: "/api/"+ user.userId +"/getTaskByClass/"+user.ClassName,
        type: "GET",
        dataType: "text",
        success: function (data) {
            result = JSON.parse(data);
            if (result) {
               // console.log(result);
                result.forEach(function(item, index){
                    let d= new Date(item.Deadline);
                    let options ={dateStyle: 'medium'};

                        let listItem = $('<li class="list-group-item myTask"> </li>');
                        listItem.text(item.Description + " (Deadline: "+ d.toLocaleDateString('en-US', options)+ ")");
                        listItem.attr('value',item._id);
                        $("#listOftasks").append(listItem);
                    });
            } 
        },
        error: function () {

        }
    });
});