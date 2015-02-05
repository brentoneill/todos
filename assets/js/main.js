///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
////       ToDo List application for the Iron Yard     ////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////
////  ToDo List object w/ AJAX (GET, POST, PUT, DELETE) ///
///////////////////////////////////////////////////////////
var tdl = {
  //Basic API config
  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/brentoneill'
  },
  //
  init: function() {
    tdl.initStyling();
    tdl.initEvents();
  },
  initStyling: function() {
    tdl.renderAllTasks();
  },


  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  ///////       BEGIN EVENT INITIALIZATION!     ///////////
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////


  initEvents: function() {
    ///////////////////////////////////////////////////////
    //Adds new task when enter key is pressed!
    ///////////////////////////////////////////////////////
    $('div.todolist-top').bind('keypress', function(e) {
      if(e.keyCode==13){
      // Enter pressed...do something cool
        var newTask = {
          name: $('.new-todo-item').find('input[name="new-todo"]').val(),
          complete: false
        }
        if(newTask.name=="") {
          //do nothing
        }
        else {tdl.createTask(newTask);
          $('.new-todo-item').find('input[name="new-todo"]').val("");
        }
      }
    });
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////
    //Deletes task when X button is clicked
    ///////////////////////////////////////////////////////
    $('section').on('click', '.fa-close', function(e){
      e.preventDefault();
      var taskId = $(this).closest('.task').data('taskid');
      tdl.deleteTask(taskId);
    });
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////
    //Enabling edit on double click of input
    ///////////////////////////////////////////////////////
    $('section').on('dblclick', 'div.task', function(e){
      e.preventDefault();
      $('div.task input').prop('disabled', true); //Only allows edit of one task at a time
      $('div.task input').removeClass('inedit');  //Only allows edit of one task at a time
      if(!($(this).hasClass('complete'))) {
        $(this).find('input').removeAttr('disabled').addClass('inedit');
      }
    });
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////
    //Edits task on enter press
    ///////////////////////////////////////////////////////
    $('div.todolist-mid').bind('keypress', function(e) {
      if(e.keyCode==13){
        revisedTask = $('div.todolist-mid input:not([disabled])');
        var taskId = $(revisedTask).closest('.task').data('taskid');
        var editedTask = {
          name: $(revisedTask).val(),
          complete:false
        }
        if(editedTask.name=="") {
          //do nothing
        }
        else {
          tdl.editTask(taskId, editedTask);
        }
      }
    });
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    //Toggle Complete
    $('section').on('click', 'div.task i.fa-circle-o', function(e){
      e.preventDefault();
      var taskId = $(this).closest('.task').data('taskid');
      var completedTask = {
        name: $(this).find('input[name="taskname"]').val(),
        complete: true
      }
      tdl.editTask(taskId, completedTask);
    });
    //UnComplete
    $('section').on('click', 'div.task i.fa-check', function(e){
      e.preventDefault();
      var taskId = $(this).closest('.task').data('taskid');
      var completedTask = {
        name: $(this).find('input[name="taskname"]').val(),
        complete: false
      }
      tdl.editTask(taskId, completedTask);
    });
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////
    //Toggle all Complete
    ///////////////////////////////////////////////////////
    $('div.todolist-top').on('click', '#complete-all', function(e){
      e.preventDefault();
      var listLength = $('.task').length;
      console.log(listLength);
      for( var i = 0; i < listLength; i++ ) {
        var thisTask = $('.task').eq(i)
        var taskId = thisTask.data('taskid');
        var completedTask = {
          name: thisTask.find('input[name="taskname"]').val(),
          complete: true
        }
        tdl.editTask(taskId, completedTask);
      };
    });
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////
    //Clear completed tasks
    ///////////////////////////////////////////////////////
    $('.todo-controls').on('click', '#clear-complete', function(e){
      e.preventDefault();
      //clear items marked as complete
      var listLength = $('.complete').length;
      for( var i = 0; i < listLength; i++ ) {
        var thisTask = $('.complete').eq(i);
        console.log(thisTask);
        tdl.deleteTask(thisTask.data('taskid'));
        console.log('task deleted');
        tdl.renderAllTasks();
      }
    });
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////
    //Display control event bidings for All, Active, Complete
    ///////////////////////////////////////////////////////
    ////Active
    $('.todo-controls').on('click', '#toggle-active', function(e){
      e.preventDefault();
      $('*').removeClass('control-active');
      $(this).addClass('control-active');
      $('.task').removeClass('hidden');
      $('.complete').addClass('hidden');
    });
    ////Complete
    $('.todo-controls').on('click', '#toggle-compl', function(e){
      e.preventDefault();
      $('*').removeClass('control-active');
      $(this).addClass('control-active');
      $('.task').addClass('hidden');
      $('.complete').removeClass('hidden');
    });
    ////All
    $('.todo-controls').on('click', '#toggle-all', function(e){
      e.preventDefault();
      $('*').removeClass('control-active');
      $(this).addClass('control-active');
      $('.task').removeClass('hidden');
      $('.complete').removeClass('hidden');
    });
    //End Eevent bindings for All, Active, Complete
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
  },


  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  ///////         END EVENT INITIALIZATION!     ///////////
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////




  ///////////////////////////////////////////////////////
  //Function to render all tasks...called every time an AJAX reques is done
  ///////////////////////////////////////////////////////
  renderAllTasks: function(){
    $.ajax({
      url: tdl.config.url,
      type: 'GET',
      success: function(tasks) {
        var compiled = _.template(templates.task);
        var markup = "";
        tasks.forEach(function(item, idx, array){
          markup += compiled(item);
        });
        $('section').html(markup);
        var completedTasks = _.where(tasks, {complete:"false"});
        $('.count').text(completedTasks.length + " items left");
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////




  ///////////////////////////////////////////////////////
  //Function to create an individual task
  ///////////////////////////////////////////////////////
  createTask: function(task){
    $.ajax({
      url: tdl.config.url,
      data:task,
      type: 'POST',
      success: function(data) {
        tdl.renderAllTasks();
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////




  ///////////////////////////////////////////////////////
  //Delete function for tasks
  ///////////////////////////////////////////////////////
  deleteTask: function(id){
    $.ajax({
      url: tdl.config.url + '/' + id,
      type: 'DELETE',
      success: function(data) {
        tdl.renderAllTasks();
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////




  ///////////////////////////////////////////////////////
  //Edit function for tasks
  ///////////////////////////////////////////////////////
  editTask: function(id, task){
    $.ajax({
      url: tdl.config.url + '/' + id,
      data: task,
      type: 'PUT',
      success: function(data) {
        tdl.renderAllTasks(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////
};






$(document).ready(function(){
  //do something once the DOM loads
  tdl.init();
});
