// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("gender");
  var gender = select.children[select.selectedIndex].value;
  localStorage["gender_selection"] = gender;

  var maxTab = document.getElementById("maxTab");
  localStorage["maxTab"] = maxTab.value;

   var omgTab = document.getElementById("omgTab");
  localStorage["omgTab"] = omgTab.value;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var favorite = localStorage["gender_selection"];
  if (!favorite) {
    return;
  }
  var select = document.getElementById("gender");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }

  var mt = localStorage["maxTab"];
  if (!mt) {
    return;
  }

  var maxTab = document.getElementById("maxTab");
  maxTab.value = mt;

  var ot = localStorage["omgTab"];
  if (!ot) {
    return;
  }

  var omgTab = document.getElementById("omgTab");
  omgTab.value = ot;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);