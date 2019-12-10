$(document).ready(function () {

    $("#log_out").click(function () {
        sessionStorage.clear();
        window.location.replace("/login");
    })

    let username = sessionStorage.getItem('user');
    //let token = sessionStorage.getItem('token');
    let _id = sessionStorage.getItem('userId');
    let currentaskId = sessionStorage.getItem('currentTaskId');
    if (username == null) {
        window.location.replace("/login");
    } else {
        $("#username").text(username);
    }

    $("#back_button").click(function(){
        window.location.replace("/tasks");
    })

    $.ajax({
        url: "/api/task/"+currentaskId,
        type: "GET",
        dataType: "text",
        success: function (data) {
            result = JSON.parse(data);
            if (result) {
                $('#taskData').empty();
                    let task = result.Description;
                    let class_ =result.ClassName;
                    let note = result.Notes;
                    let d= new Date(result.Deadline);
                    let options ={dateStyle: 'medium'};
                        let taskcard = $(`<div class="card"> 
                        <div class="card-body text-center">
                        <h5 class="card-title">`+ task+`</h5>
                        <h6 class="card-subtitle mb-2 text-muted">`+ class_+`</h6>
                        <h6 class="card-subtitle mb-2 text-muted"> Deadline: `+ d.toLocaleDateString('en-US', options)+`</h6>
                        <p class="card-text">Notes: `+ note+`</p>
                        <button class="btn btn-primary" id="editTask"> Edit </button>
                        <button class="btn btn-danger" id="deleteTask"> Delete</button>
                      </div>
                        </div>`);
                        $("#taskData").append(taskcard);
            } 
        },
        error: function () {

        }
    });

});