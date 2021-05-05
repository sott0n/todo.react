import React from 'react';
import ReactDOM from "react-dom";

class TodoBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {"id": "00001", "task": "Hello, World!!", "done": "false"},
            ]
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    genId() {
        return Math.floor(Math.random() * 90000) + 10000;
    }

    handleRemove(id) {
        var data = this.state.data;
        data = data.filter(function (el) {
            return el.id !== id;
        });
        this.setState({data});
        return;
    }

    handleSubmit(task) {
        var data = this.state.data;
        var id = this.genId().toString();
        var done = "false";
        data = data.concat([{id, task, done}]);
        this.setState({data});
    }

    handleDone(id) {
        var data = this.state.data;
        for (var i in data) {
            if (data[i].id === id) {
                data[i].done = data[i].done === 'true' ? 'false' : 'true';
                break;
            }
        }
        this.setState({data});
        return;
    }

    render() {
        return (
            <div>
                This is a ToDo list, written by React App 😎
                <TodoList data={this.state.data} removeTask={this.handleRemove} doneTask={this.handleDone} />
                <TodoForm onTaskSubmit={this.handleSubmit} />
            </div>
        );
    }
};

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.removeTask = this.removeTask.bind(this);
        this.doneTask = this.doneTask.bind(this);
    }

    removeTask(id) {
        this.props.removeTask(id);
        return;
    }

    doneTask(id) {
        this.props.doneTask(id);
        return;
    }

    render() {
        var listTasks = this.props.data.map(function(listTask){
            return (
                <TodoItem key={listTask.id} taskId={listTask.id} task={listTask.task} done={listTask.done} removeTask={this.removeTask} doneTask={this.doneTask} />
            );
        }, this);
        return (
            <ul className="list-group">
                {listTasks}
            </ul>
        );
    }
};

class TodoItem extends React.Component{
    constructor(props) {
        super(props);
        this.removeTask = this.removeTask.bind(this);
        this.doneTask = this.doneTask.bind(this);
    }

    removeTask(e) {
        e.preventDefault();
        this.props.removeTask(this.props.taskId);
        return;
    }

    doneTask(e) {
        e.preventDefault();
        this.props.doneTask(this.props.taskId);
        return;
    }

    // TODO: implement update task.
    updateTask() {
    }

    render() {
        var classes = "list-group-item clearfix";
        if (this.props.done === "true") {
            classes = classes + " list-group-item-success";
        }
        return (
            <li className={classes}>
                {this.props.task}
                <div className="float-right" role="group">
                    <button type="button" className="btn btn-xs btn-success img-circle" onClick={this.doneTask}>&#x2713;</button> <button type="button" className="btn btn-xs btn-danger img-circle" onClick={this.removeTask}>&#xff38;</button>
                </div>
            </li>
        );
    }
};

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.doSubmit = this.doSubmit.bind(this);
    }

    doSubmit(e) {
        e.preventDefault();
        const task = e.target["task"].value;
        if (!task) {
            return;
        }
        this.props.onTaskSubmit(task);
        ReactDOM.findDOMNode(e.target["task"]).value = '';
        return;
    }

    render() {
        return (
            <div className="commentForm vert-offset-top-2">
                <hr />
                <form className="todoForm" onSubmit={this.doSubmit}>
                    <input type="text" id="task" className="form-control" placeholder="What do you need to do?" />
                    <button type="submit" className="btn btn-info btn-block img-circle">Submit</button>
                </form>
            </div>
        );
    }
};

export default TodoBox;
