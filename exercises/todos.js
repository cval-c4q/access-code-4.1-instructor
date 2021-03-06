
/**
 * @function createTodo
 * @param  {string} description 
 * @param  {boolean} completed 
 * @return {type} {description}
 */
function createTodo(description, completed){
  var todo = {
    description: description,
    completed: completed
  }

  return todo
}

function logTodo(todo, i){
  console.log(i + '. ' + todo.description + '. Completed: ' + todo.completed)
}

function forEachArr(arr, callback){
  for (var i = 0; i < arr.length; i++){
    callback(arr[i], i)
  }
}

var todoArr = []
var buyMilk = createTodo('buy milk', false)
todoArr.push(buyMilk)

var cleanHouse = createTodo('clean the house', false)
todoArr.push(cleanHouse)


forEachArr(todoArr, logTodo)
