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
});