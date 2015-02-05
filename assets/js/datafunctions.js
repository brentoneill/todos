//Sets the tasks class based on the value of copmlete
var checkComplete = function(complete) {
  if(complete === "true") {
    return 'task complete';
  }
  else {
    return 'task';
  }
}
//Changes icon based on value of complete
var checkIcon = function(complete) {
  if(complete === "true") {
    return 'fa-check';
  }
  else {
    return 'fa-circle-o'
  }
}
