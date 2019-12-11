$(document).ready(function () {

    $("#log_out").click(function () {
        sessionStorage.clear();
        window.location.replace("/login");
    })

    let username = sessionStorage.getItem('user');
    //let token = sessionStorage.getItem('token');
    let _id = sessionStorage.getItem('userId');
    let currentClass_ = sessionStorage.getItem('currentClass');
    let curretnClassId = sessionStorage.getItem('currentClassId');
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
        CurrentClassId: curretnClassId,
        ClassName: currentClass_,
        userId: _id
    }

    function getGoodDateFormat(date) {
        let a = new Date(date);
        return (a.getUTCMonth() + 1) + "/" + a.getUTCDate() + "/" + a.getUTCFullYear();
    }

    $.ajax({
        url: "/api/" + user.userId + "/getTaskByClass/" + user.CurrentClassId,
        type: "GET",
        dataType: "text",
        success: function (data) {
            result = JSON.parse(data);
            if (result) {
                $('ul#listOftasks').empty();
                result.forEach(function (item, index) {
                    let d = new Date(item.Deadline);
                    let today = new Date();
                    let warn = (d < today);
                    let completed = item.Completed;
                    // let options = { dateStyle: 'medium' };
                    let listItem = $('<li class="list-group-item myTask"> </li>');;
                    listItem.text(item.Description + " (Deadline: " + getGoodDateFormat(item.Deadline) + ")");
                    listItem.attr('value', item._id);
                    let checked = "<span class='float-right'>&#10004;</span>";
                    let warning = "<span class='float-right'>&#9888;</span>";
                    if (completed) {
                        // listItem.wrapInner("<strike></strike>");
                        listItem.append(checked);
                    } else if (warn) {
                        listItem.append(warning);
                    }
                    $("#listOftasks").append(listItem);
                });
            }
        },
        error: function () {

        }
    });

    $("#listOftasks").on("click", ".myTask", function (e) {
        sessionStorage.setItem("currentTaskId", e.target.getAttribute('value'));
        window.location.replace("/task/profile");
    })

    $('#deleteClassbtn').click(function(){
        $.ajax({
            url:"/api/class/"+curretnClassId,
            type: "DELETE",
            dataType: "text",
            success: function (data) {
                result = JSON.parse(data);
                console.log(result);
                if (result.success) {
                    sessionStorage.setItem('currentClass', null);
                    sessionStorage.setItem('currentClassId', null);
                    window.location.replace("/home");
                }
            },
            error: function () {
                $("#error-message").text("Something went wrong. Please try again later.");
                $("#error-message").addClass("alert-warning");
            }
        });
    })

    $("#createTaskbtn").click(function () {
        let description = $("#description").val();
        let date = $('#deadline').val();
        let notes = $("#notes").val();
        let data_task = {
            "Task": description,
            "ClassName": user.ClassName,
            'classId':user.CurrentClassId,
            "deadline": date,
            "notes": notes 
        }
        if (description !== "" && date !== '') {
            $.ajax({
                url: "/api/" + user.userId + "/task",
                type: "POST",
                data: data_task,
                dataType: "text",
                success: function (data) {
                    result = JSON.parse(data);
                    if (result.success) {
                        location.reload(true);
                    }
                },
                error: function () {
                    $("#error-message").text("Something went wrong. Please try again later.");
                    $("#error-message").addClass("alert-warning");
                }
            });
        }

    });



});