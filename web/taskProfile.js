$(document).ready(function () {

    $("#log_out").click(logOut);

    function logOut() {
        sessionStorage.clear();
        window.location.replace("/login");
    }

    let username = sessionStorage.getItem('user');
    //let token = sessionStorage.getItem('token');
    let _id = sessionStorage.getItem('userId');
    let currentaskId = sessionStorage.getItem('currentTaskId');
    let token = sessionStorage.getItem('token');
    if (username == null || _id == null || token == null) {
        window.location.replace("/login");
    }  else {
        $("#username").text(username);
    }

    $("#back_button").click(function () {
        window.location.replace("/tasks");
    })

    $("#taskData").on("click","#markdone", function(e){
       $.ajax({
        url: "/api/completeTask/" + currentaskId,
        type: "PUT",
        dataType: "text",
        beforeSend: function (xhr) {   //Include the bearer token in header
            xhr.setRequestHeader("Authorization", 'Bearer ' + token);
        },
        success: function (data) {
            result = JSON.parse(data);
            if (result.success) {
                location.reload(true);
            }else{
                alert("Something went wrong. Please Try again later.")
            }
        },
        error: function () {

        }
       });
    });

    $("#deleteTaskbtn").click(function(){
        $.ajax({
            url:"/api/task/"+currentaskId,
            type: "DELETE",
            dataType: "text",
            beforeSend: function (xhr) {   //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + token);
            },
            success: function (data) {
                result = JSON.parse(data);
                console.log(result);
                if (result.success) {
                    sessionStorage.setItem('currentTaskId', null);
                    window.location.replace("/tasks");
                }
            },
            error: function () {
                $("#error-message").text("Something went wrong. Please try again later.");
                $("#error-message").addClass("alert-warning");
            }
        });
    })

    function getGoodDateFormat(date){
        let a =  new Date(date);
        return (a.getUTCMonth()+1) +"/"+a.getUTCDate() + "/" +a.getUTCFullYear();
    }

    function getDateDisplyFormat(date){
        let now =  new Date(date);
        let day = ("0" + now.getUTCDate()).slice(-2);
        let month = ("0" + (now.getUTCMonth() + 1)).slice(-2);
        return now.getUTCFullYear()+"-"+(month)+"-"+(day) ;
    }

    $.ajax({
        url: "/api/task/" + currentaskId,
        type: "GET",
        dataType: "text",
        beforeSend: function (xhr) {   //Include the bearer token in header
            xhr.setRequestHeader("Authorization", 'Bearer ' + token);
        },
        success: function (data) {
            result = JSON.parse(data);
            if (result.success) {
                let Task = result.Task;
                $('#taskData').empty();
                let task = Task.Description;
                let class_ = Task.ClassName;
                let note = Task.Notes;
                let isCompleted = Task.Completed;
                 let d = new Date(Task.Deadline);
                 let today = new Date();
                 let warn = (d < today);
                /**
                 * Fill in the modal window
                 * 
                 */
                    $("#classNameLabel").text(class_);
                    $("#description").val(task);
                    $("#deadline").val(getDateDisplyFormat(Task.Deadline));
                    $("#notes").val(note);

                 /***************************************** */
                let taskcard ='';
                if(isCompleted){
                     taskcard = $(`<div class="card"> 
                    <div class="card-body text-center"> <span clas="float-right">Completed: &#10004;</span>
                    <h5 class="card-title">`+ task + `</h5> 
                    <h6 class="card-subtitle mb-2 text-muted">`+ class_ + `</h6>
                    <h6 class="card-subtitle mb-2 text-muted"> Deadline: `+ getGoodDateFormat(Task.Deadline) + `</h6>
                    <p class="card-text">Notes: `+ note + `</p>
                    <button class="btn btn-danger" data-toggle="modal" data-target="#confirm-delete"> Delete</button>
                  </div>
                    </div>`);
                }else if(warn){
                     taskcard = $(`<div class="card"> 
                    <div class="card-body text-center"><span class='float-right'>&#9888;</span>
                    <h5 class="card-title">`+ task + `</h5>  
                    <h6 class="card-subtitle mb-2 text-muted">`+ class_ + `</h6>
                    <h6 class="card-subtitle mb-2 text-muted"> Deadline: `+ getGoodDateFormat(Task.Deadline) +` [Deadline Passed]</h6>
                    <p class="card-text">Notes: `+ note + `</p>
                    <button class="btn btn-success" id="markdone"> Mark As Done </button>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#edit-task"> Edit </button>
                    <button class="btn btn-danger" data-toggle="modal" data-target="#confirm-delete"> Delete</button>
                  </div>
                    </div>`);
                }else{
                    taskcard = $(`<div class="card"> 
                    <div class="card-body text-center">
                    <h5 class="card-title">`+ task + `</h5> 
                    <h6 class="card-subtitle mb-2 text-muted">`+ class_ + `</h6>
                    <h6 class="card-subtitle mb-2 text-muted"> Deadline: `+ getGoodDateFormat(Task.Deadline) + `</h6>
                    <p class="card-text">Notes: `+ note + `</p>
                    <button class="btn btn-success" id="markdone"> Mark As Done </button>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#edit-task"> Edit </button>
                    <button class="btn btn-danger" data-toggle="modal" data-target="#confirm-delete"> Delete</button>
                  </div>
                    </div>`);
                }
                $("#taskData").append(taskcard);
            }else {
                if (result.message === "Invalid Token" || result.message === "Missing Token") {
                    alert(result.message);
                    logOut();
                }
            }
        },
        error: function () {

        }
    });

    $("#editTaskbtn").click(function(){
        let description = $("#description").val();
        let date = $('#deadline').val();
        let notes = $("#notes").val();
        let data_task = {
            "description": description,
            "deadline": date,
            "notes": notes 
        }
        if (description !== "" && date !== '') {
            $.ajax({
                url: "/api/task/" + currentaskId,
                type: "PUT",
                data: data_task,
                dataType: "text",
                beforeSend: function (xhr) {   //Include the bearer token in header
                    xhr.setRequestHeader("Authorization", 'Bearer ' + token);
                },
                success: function (data) {
                    result = JSON.parse(data);
                    if (result.success) {
                        location.reload(true);
                    }else{
                        alert("Something went wrong. Please Try again later.")
                    }
                },error: function(){
               
                }
             })
        }
    });

});