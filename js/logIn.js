function PasswordFunction() {
  alert("Password: admin");
}
function logIn() {
  var nazwa = document.getElementById("username").value;
  var haslo = document.getElementById("password").value;
  if (nazwa.length > 3 && nazwa.length < 15 && haslo === "admin") {
    window.location.href = "homePage.html";
  } else {
    alert("Bledne dane logowania!");
  }
}
