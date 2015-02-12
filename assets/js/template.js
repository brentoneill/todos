var templates = {};

templates.task = [
  "<div data-taskid='<%= _id %>' sortid ='<%= sortId %>' class='<% print(checkComplete(complete)) %> <% print(checkHl(highlighted)) %>' >",
    "<i class='fa <% print(checkIcon(complete)) %>'></i>",
    "<input type='text' name='taskname' value='<%= name %>' disabled>",
    "<i class='fa fa-bookmark'></i>",
    "<i class='handle fa fa-arrows'></i>",
    "<i class='fa fa-close'></i>",
  "</div>"
].join("");
