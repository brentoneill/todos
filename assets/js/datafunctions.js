//Sets the tasks class based on the value of complete
var checkComplete = function(complete) {
  if(complete === "true") {
    return 'task complete';
  }
  else {
    return 'task';
  }
}
//Sets the tasks class based on the value of highlightes
var checkHl = function(highlighted) {
  if(highlighted === "true") {
    return 'highlighted';
  }
  else {
    return '';
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
