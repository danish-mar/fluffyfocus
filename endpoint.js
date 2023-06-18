function clearContentById(id) {
  var element = document.getElementById(id);
  if (element) {
    element.innerHTML = '';
  }
}

function refreshPage() {
  location.reload();
}


var serverURL;

fetch("config.json")
  .then(response => response.json())
  .then(data => {
    var serverIP = data.server.ip;
    var serverPort = data.server.port;
    serverURL = "https://" + serverIP + ":" + serverPort;
    // ...
  })
  .catch(error => {
    console.error("Error loading configuration file:", error);
  });

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
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('upload-form');
  const fileInput = document.getElementById('file-input');
  const message = document.getElementById('message');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const file = fileInput.files[0];

    if (!file) {
      showMessage('No file selected');
      return;
    }

    const username = localStorage.getItem('username');
    const fileExtension = file.name.split('.').pop();
    const fileName = `${username}.${fileExtension}`;

    const formData = new FormData();
    formData.append('file', file, fileName);

    fetch(`${serverURL}/upload`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(result => {
        showMessage(result);
        fileInput.value = '';
        refreshPage();
      })
      .catch(error => {
        console.error(error);
        showMessage('Error uploading file');
      });
  });

  function showMessage(text) {
    message.textContent = text;
  }
});


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
          url: serverURL,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function(response) {
              if (response === "User added successfully") {
                  clearContentById("create_status")
                  clearContentById("create_error-msg")
                  document.getElementById("create_status").innerHTML = "Account Created Successfully - Don't forget the password!";
                  setTimeout(function() {
                      location.hash = "login-form";
                      location.reload();
                  }, 2000); // 2000 milliseconds = 2 seconds
              } else {
                  clearContentById("create_error-msg")
                  document.getElementById("create_error-msg").innerHTML = "Email or username already exists";
              }
          },
          error: function(xhr, status, error) {
              clearContentById("create_error-msg")
              document.getElementById("create_error-msg").innerHTML = "Error Occurred: " + error;
          }
      });      
    });
});

function deleteProfile() {
  document.getElementById('overlay-delete').style.display = 'flex';
}

function confirmDelete() {
  var password = document.getElementById('password-input').value;

  // Create the data object
  var data = {
    passphrase: "xv98qds",
    command: "rem_user",
    username: localStorage.getItem('username'),
    password: password
  };

  // Send a POST request to the server
  $.ajax({
    url: serverURL,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function(response) {
      if (response === "User deleted successfully") {
        alert("User deleted successfully")
        showLoggedOutDialog();
        setTimeout(function() {
          window.location.href = "index.html";
      }, 2000);
      } else if (response === "Incorrect password") {
        document.getElementById('delete-error-msg').innerHTML = "Incorrect password";
      } else {
        document.getElementById('delete-error-msg').innerHTML = "Failed to delete the account";
      }
    },
    error: function(xhr, status, error) {
      document.getElementById('delete-error-msg').innerHTML = "Error Occurred: " + error;
    }
  });
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    
    // Define the request URL
    var url = serverURL;
  
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
            clearContentById("create_error-msg")
            clearContentById('status')
            document.getElementById('status').textContent = ("Login successful Redirecting...");
            setTimeout(function() {
                window.location.href = "index.html";
            }, 2000);
        } else {
          clearContentById('error-msg')
          document.getElementById('error-msg').textContent = response;
        }
      }
    };

    xhr.send(payload);
  });
