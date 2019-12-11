$(document).ready(function () {

    $("#log_out").click(logOut);

    function logOut() {
        sessionStorage.clear();
        window.location.replace("/login");
    }

    let username = sessionStorage.getItem('user');
    //let token = sessionStorage.getItem('token');
    let _id = sessionStorage.getItem('userId');
    let token = sessionStorage.getItem('token');

    if (username == null || _id == null || token == null) {
        window.location.replace("/login");
    } else {
        $("#username").text(username);
        let user = {
            username: username,
            //token: token,
            userId: _id
        }
        function getGoodDateFormat(date) {
            let a = new Date(date);
            return (a.getUTCMonth() + 1) + "/" + a.getUTCDate() + "/" + a.getUTCFullYear();
        }

        $.ajax({
            url: "/api/" + user.userId + "/class",
            type: "GET",
            dataType: "text",
            beforeSend: function (xhr) {   //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + token);
            },
            success: function (data) {
                result = JSON.parse(data);
                if (result.success) {
                    $("ul#listOfClasses").empty();
                    result.Class.forEach(function (item, index) {
                        // console.log(item.ClassName);
                        let listItem = $('<li class="list-group-item myClass text-center"> </li>');
                        listItem.text("Class: " + item.ClassName);
                        listItem.attr('value', item.ClassName);
                        listItem.attr('_id', item._id);
                        $("#listOfClasses").append(listItem);
                    });
                } else {
                    if (result.message === "Invalid Token" || result.message === "Missing Token") {
                        alert(result.message);
                        logOut();
                    }
                }
            },
            error: function () {

            }
        });

        //
        let TwoweeksDate = new Date(Date.now() + 12096e5);
        $.ajax({
            url: "/api/" + user.userId + "/getTaskByDeadline/" + TwoweeksDate,
            type: "GET",
            dataType: "text",
            beforeSend: function (xhr) {   //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + token);
            },
            success: function (data) {
                result = JSON.parse(data);
                if (result.success) {
                    $('ul#listOfDeadlineTasks').empty();
                    if (result.Task.length > 0) {
                        result.Task.forEach(function (item, index) {
                            // console.log(item.ClassName);
                            let listItem = $('<li class="list-group-item"> </li>');;
                            listItem.text("[" + item.ClassName + "] " + item.Description + " (Deadline: " + getGoodDateFormat(item.Deadline) + ")");
                            listItem.attr('value', item._id);
                            $('ul#listOfDeadlineTasks').append(listItem);
                        });
                    } else {
                        let listItem = $('<li class="list-group-item text-center"> No tasks with deadline within next two weeks.</li>');
                        $('ul#listOfDeadlineTasks').append(listItem);
                    }
                } else {
                    if (result.message === "Invalid Token" || result.message === "Missing Token") {
                        alert(result.message);
                        logOut();
                    }
                }
            },
            error: function () {

            }
        });
        let cuurentDate = new Date();
        $.ajax({
            url: "/api/" + user.userId + "/getTaskByDeadlinePassed/" + cuurentDate,
            type: "GET",
            dataType: "text",
            beforeSend: function (xhr) {   //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + token);
            },
            success: function (data) {
                result = JSON.parse(data);
                if (result.success) {
                    if (result.Task.length > 0) {
                        $('ul#listOfIncompleteTasks').empty();
                        result.Task.forEach(function (item, index) {
                            // console.log(item.ClassName);
                            let listItem = $('<li class="list-group-item"> </li>');
                            listItem.text("[" + item.ClassName + "] " + item.Description + " (Deadline: " + getGoodDateFormat(item.Deadline) + ")");
                            listItem.attr('value', item._id);
                            let checked = "<span class='float-right'>&#9888;</span>";
                            listItem.append(checked);
                            $('ul#listOfIncompleteTasks').append(listItem);
                        });
                    } else {
                        let listItem = $('<li class="list-group-item text-center"> None of your incomplete tasks has passed deadline.</li>');
                        $('ul#listOfIncompleteTasks').append(listItem);
                    }
                } else {
                    if (result.message === "Invalid Token" || result.message === "Missing Token") {
                        alert(result.message);
                        logOut();
                    }
                }
            },
            error: function () {

            }
        });


        $("#listOfClasses").on("click", ".myClass", function (e) {
            sessionStorage.setItem("currentClass", e.target.getAttribute('value'));
            sessionStorage.setItem("currentClassId", e.target.getAttribute('_id'));
            window.location.replace("/tasks");
        })

        $("#createClassBtn").click(function () {
            let class_ = $("#class-name").val();
            let professor = $("#professor-name").val();
            let data_class = {
                'ClassName': class_,
                "Professor": professor
            }
            if (class_ !== "") {
                $.ajax({
                    url: "/api/" + user.userId + "/class",
                    type: "POST",
                    data: data_class,
                    dataType: "text",
                    beforeSend: function (xhr) {   //Include the bearer token in header
                        xhr.setRequestHeader("Authorization", 'Bearer ' + token);
                    },
                    success: function (data) {
                        result = JSON.parse(data);
                        if (result.success) {
                            location.reload(true);
                        } else {
                            if (result.message === "Invalid Token" || result.message === "Missing Token") {
                                alert(result.message);
                                logOut();
                            }
                        }
                    },
                    error: function () {
                        $("#error-message").text("Something went wrong. Please try again later.");
                        $("#error-message").addClass("alert-warning");
                    }
                });
            }


        });
    }


});