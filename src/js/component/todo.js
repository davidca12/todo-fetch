import React, { Component } from "react";
import List from "./list.js";

export class Todo extends React.Component {
	constructor() {
		super();
		this.state = {
			lista: []
		};
	}

	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/davidca12")
			.then(response => response.json(), console.log("succes"))
			.then(data => {
				console.log(data);
				for (let i in data) {
					console.log(data[i]);
					this.setState({ lista: [...this.state.lista, data[i]] });
				}
			});
	}
	componentDidUpdate() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/davidca12", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(this.state.lista)
		});
	}

	addToList = e => {
		if (e.key === "Enter") {
			console.log(e.target.value.length);
			if (e.target.value.length > 0) {
				this.setState({ lista: [...this.state.lista, { label: e.target.value, done: true }] });
			}
			e.target.value = "";
		}
	};

	deleteFromList = index => {
		this.setState({
			lista: this.state.lista.filter((item, i) => {
				console.log(item, i);
				return i !== index;
			})
		});
	};

	taskCounter = len => {
		console.log(len);
		if (len === 0) {
			return <li className="taskCounter text-muted">No tasks, add a task</li>;
		} else if (len >= 1) {
			return <li className="taskCounter text-muted">{len} items left</li>;
		}
	};
	render() {
		return (
			<div className="main">
				<h1>todos</h1>
				<input type="text" placeholder="Qué necesitas" onKeyPress={this.addToList} />
				<List
					lista={this.state.lista}
					counter={this.taskCounter(this.state.lista.length)}
					onDeleteClicked={this.deleteFromList}
				/>
			</div>
		);
	}
}
