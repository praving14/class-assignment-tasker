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
    $('#classNameLabel').text(currentClass_);

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
                $('ul#listOftasks').empty();
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

    $("#listOftasks").on("click",".myTask", function(e){
        sessionStorage.setItem("currentTaskId", e.target.getAttribute('value'));
        window.location.replace("/task/profile");
    })


    $("#createTaskbtn").click(function(){
        let description  = $("#description").val();
        let date = $('#deadline').val();
        let notes = $("#notes").val();
        let data_task = {
            "Task":description,
            "ClassName":user.ClassName,
            "deadline":date,
            "notes":notes
        }
        if(description !== "" && date !== ''){
            $.ajax({
                url: "/api/"+ user.userId +"/task",
                type: "POST",
                data: data_task,
                dataType: "text",
                success : function(data) {
                    result =JSON.parse(data);
                    if(result.success){
                        location.reload(true);
                    }
                },
                error : function() {
                    $("#error-message").text("Something went wrong. Please try again later.");
                    $("#error-message").addClass("alert-warning"); 
                }
            });
        }

    });



});