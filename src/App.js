import { useState } from "react";

function App() {
    const [idCounter, setIdCounter] = useState(0);
    const [todos, setTodo] = useState([]);

    const handlerSubmit = (e) => {
        e.preventDefault();
        const inputText = e.target["task"].value;
        const nextid = idCounter + 1;
        setIdCounter(nextid);
        setTodo([...todos, { id: nextid, task: inputText, checked: false }]);
    };

    const handlerClickDeleteButton = (id) => {
        setTodo(todos.filter((todo) => todo.id !== id));
    };

    const handlerChangeCheckBox = (id) => {
        const changedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, checked: !todo.checked };
            }
            return todo;
        });
        setTodo(changedTodos);
    };

    return (
        <div className="App">
            <form onSubmit={handlerSubmit}>
                <input name="task" />
                <button>Submit</button>
            </form>
            <div>
                {todos.map((todo) => (
                    <div key={todo.id} className={todo.checked ? "checked" : ""}>
                        <input type="checkbox" onChange={() => handlerChangeCheckBox(todo.id)} />
                        {todo.task}
                        <button onClick={() => handlerClickDeleteButton(todo.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
