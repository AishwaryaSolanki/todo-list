var express = require("express");
var router = express.Router();
var db = require("../models/index");
var helpers=  require("../helper/todos");

router.route("/")
.get(helpers.getTodos)
.post(helpers.createTodo)

router.route("/:todoId")
.get(helpers.showTodo)
.put(helpers.updateTodo)
.delete(helpers.deleteTodo)

module.exports = router;

