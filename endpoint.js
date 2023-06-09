// Set the cookie with a name, value, and expiration time
function setCookie(name, value, hours) {
    var expires = "";
    if (hours) {
      var date = new Date();
      date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function getCookie(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
  
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }
//  setCookie("username", "John Doe", 2);  // Set a cookie named "username" with the value "John Doe" that expires in 2 hours
  
$(document).ready(function() {
    $("#signup-form").submit(function(event) {
        event.preventDefault();

        // Get the form data
        var username = $("#signup-username").val();
        var password = $("#signup-password").val();
        var email = $("#signup-email").val();

        // Create the data object
        var data = {
            passphrase: "xv98qds",
            command: "add_user",
            username: username,
            password: password,
            email: email
        };

        // Send a POST request to the server
        $.ajax({
            url: "https://fluffyfocus.kawaiiteam.com:9481/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(response) {
                document.getElementById("create_status").innerHTML = ("Account Created Successfully - Dont forget the password!");
            },
            error: function(xhr, status, error) {
                document.getElementById('create_error-msg').innerHTML = ("Error Occured : " + error);
            }
        });
    });
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    
    // Define the request URL
    var url = 'https://fluffyfocus.kawaiiteam.com:9481';
  
    // Set the request method to POST
    xhr.open('POST', url);
  
    // Set the request headers
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    // Create the request payload
    var payload = JSON.stringify({
      passphrase: 'xv98qds',
      command: 'check_user',
      username: username,
      password: password
    });
  
    // Define the callback function for when the request is complete
    xhr.onload = function() {
      if (xhr.status === 200) {
        var response = xhr.responseText;
        console.log(response);
        if (response == 200) {
            localStorage.setItem("username", username)
            document.getElementById('status').textContent = ("Login successful Redirecting...");
            setTimeout(function() {
                window.location.href = "index.html";
            }, 2000);
        } else {
          document.getElementById('error-msg').textContent = response;
        }
      }
    };

    xhr.send(payload);
  });
  
