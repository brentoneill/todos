var templates = {};

templates.task = [
  "<div data-taskid='<%= _id %>' class='<% print(checkComplete(complete)) %>'>",
    "<i class='fa <% print(checkIcon(complete)) %>'></i>",
    "<input type='text' name='taskname' value='<%= name %>' disabled>",
    "<i class='fa fa-close'></i>",
  "</div>"
].join("");
