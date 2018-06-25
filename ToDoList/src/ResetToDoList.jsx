import React, { Component as C } from 'react';

class ResetToDo extends C {
    constructor() {
        super();
        this.state={
            "status":""
        };
        fetch('http://localhost:4321/reset')
        .then(response => response.json())
        .then(data => this.setState({"status":"ToDoList успешно сброшен!"}))
        .catch(function() {
                this.setState({"status":"ToDoList не сброшен, ошибка сервера. Проверьте работает ли json-server."})
        });
      }


    render() {
        return (
            <div class="green">
                 {this.state.status}
             </div>

            );
      }
}

export default ResetToDo;
