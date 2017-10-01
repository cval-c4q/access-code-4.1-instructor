var readline = require('readline')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f')
}


function forEachEle(arr, callback){
  for (var i = 0; i < arr.length; i++){
    callback(arr[i], i)
  }
}

function arrIncludes(arr, ele){
  return arr.indexOf(ele) !== -1;
}

var visibilityOptions = ["all", "active", "completed"]

/**
 * @typedef {Object} Task
 * @property {string} description
 * @property {boolean} completed
 * @property {function} toggle
 */

/**
 * @function createTask
 * @param  {string} description 
 * @param  {boolean} completed 
 * @return {Task}
 */
function createTask(description, completed){
  return {
    description: description,
    completed: completed,
    toggle:   function() {
      this.completed = !this.completed      
    }
  }
}


var taskList = {
  tasks: [],
  show: 'all',
  addTask: function(description){
    var newTask = createTask(description, false)
    this.tasks.push(newTask)
  },
  toggleTask: function(id){
    if (this.tasks[id] === undefined){
      console.log('invalid id')
    } else {
      this.tasks[id].toggle()
    }
  },
  logActive: function(){
    forEachEle(this.tasks, function(task, i){
      if (!task.completed){
        console.log(`${i}. ${task.description}. Completed: ${task.completed}`)
      }
    })
  },
  logCompleted: function(){
    forEachEle(this.tasks, function(task, i){
      if (task.completed){
        console.log(`${i}. ${task.description}. Completed: ${task.completed}`)
      }
    })
  },
  logAll: function(){ 
    forEachEle(this.tasks, function(task, i){
        console.log(`${i}. ${task.description}. Completed: ${task.completed}`)
    })
  },
  logTasks: function(){
    if (this.show === 'completed'){
      this.logCompleted();
    } else if (this.show === 'active'){
      this.logActive();
    } else {
      this.logAll();
    }
  }
} 


function logInstructions(){
  console.log('\nAdd task: add [description]')
  console.log('Toggle completed status: toggle [id]')
  console.log('show all / active / completed')
}

/**
 * @function doAction
 * @param  {string} action
 * @param  {string} input 
 */
function doAction(action, input){
  if (action === 'add'){
    var description = input
    taskList.addTask(description)
  } else if (action === 'toggle'){
    var id = Number(input)
    taskList.toggleTask(id)
  } else if (action === 'show' && arrIncludes(visibilityOptions, input)){
    taskList.show = input      
  }
}

rl.on('line', function (input) {
  clear()
  var inputArr = input.split(' ')
  var action = inputArr[0].toLowerCase()
  var restOfInput = inputArr.slice(1).join(' ')
  doAction(action, restOfInput)

  taskList.logTasks()
  logInstructions()
})

clear()
logInstructions()