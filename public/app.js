/* global $ */

$(document).ready(function(){
    //doesnt work in slim
    $.getJSON("/api/todos")
    .then(addTodos);
    $("#todoInput").keypress(function(event){
      if(event.which === 13){
        //create
        createTodo();
      }
    });
});

$('.list').on('click', 'li', function(){
  updateTodo($(this));
  
})

$('.list').on('click', "span", function(event){
    event.stopPropagation();
    removeTodo($(this).parent());
    
});

function addTodos(todos){
    //add todo to page
    todos.forEach(function(todo){
        addTodo(todo);
    });
}   

function createTodo(){
  //send request
  //post to /api/todo
  var userInput = $("#todoInput").val();
  $.post('/api/todos', {name: userInput})
  .then(function(newTodo){
    $("#todoInput").val("");
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err);
  })
}

function addTodo(todo){
      var newTodo = $('<li class="task" >' + todo.name + '<span>X</span></li>');
      newTodo.data("id", todo._id);
      newTodo.data('completed', todo.completed);
      if(todo.completed){
        newTodo.addClass("done");
      }
      $('.list').append(newTodo);
}

function removeTodo(todo){
      
    var clickedID = todo.data('id');
    var deleteUrl = 'api/todos/' + clickedID;
    $.ajax({
      method: 'DELETE',
      url: deleteUrl
    })
    .then(function(data){
      todo.remove();
    })
}

function updateTodo(todo){
      var UpdateUrl = 'api/todos/' + todo.data('id');
      var isDone = !todo.data('completed');
      var updateData = {completed: isDone};
      $.ajax({
        method: 'PUT',
        url: UpdateUrl,
        data: updateData
      })
      .then(function(updatedtodo){
        todo.toggleClass("done");
        todo.data('completed', isDone);
      })
}