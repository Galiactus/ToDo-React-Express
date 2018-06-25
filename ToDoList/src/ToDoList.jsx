import React, { Component as C } from 'react';
import {render} from 'react-dom';
import moment from 'moment';

const ToDo = (props) => (
	<div>
		<br/>
		<div class="orange">
		<input type="checkbox" className="cheki" id={"check"+props.id} />{props.str}
		</div>
	</div>
);

class ToDoList extends C {
    constructor() {
        super();
        this.state={
            "todo":[]
        };

        fetch('http://localhost:4321/getlist')
        .then(response => response.json())
        .then(data => {
            this.setState(data);
            this.refs.tester.setState(data);
        });
      }

    addNew (){
        let id=1;
        const length=this.state.todo.length
        if (length>0){
            id=this.state.todo[length-1].id+1;
        }
        const task={
            id: id,
            title: this.refs.newTask.value,
            time: moment().format('DD/MM/YYYY h:mm')
        }
        this.state.todo.push(task);
        this.refs.newTask.value="";
        fetch('http://localhost:4321/update?body='+JSON.stringify(this.state))
        .then(response => response.json())
        .then(data => this.setState(data));
    }
    DeleteTasks()
    {
        let newindex=1;
        let newmas=[];
        for (let index = 0; index < this.state.todo.length; index++) {
            const element = this.state.todo[index];
            if (document.getElementById("check"+element.id).checked==false){
                const task={
                    id: newindex,
                    title: element.title,
                    time: element.time
                }
                newmas.push(task);
                newindex++;
            }
            document.getElementById("check"+element.id).checked=false;
        }
        this.state.todo=newmas;
        fetch('http://localhost:4321/update?body='+JSON.stringify(this.state))
        .then(response => response.json())
        .then(data => this.setState(data));
    }
    render() {
        return (
					<div class="container">
            <div class="row">
						    <div class="col-xl-5 typ1">
                <input type="text" id="newTask" ref="newTask"/>
								</div>
								<div class="col-xl-4 typ2">
                 <button class="btn btn-success" onClick={() => this.addNew()}>Добавить</button>
                 <button class="btn btn-danger" onClick={() => this.DeleteTasks()}>Удалить</button>
						    </div>
								<div class="col"></div>

             </div>

						 {this.state.todo.map(task => <ToDo str={task.title} id={task.id} ref={"check"+task.id}/>)}

             </div>
            );
      }
}

export default ToDoList;
