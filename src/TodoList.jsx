/* eslint-disable react/prop-types */
import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TodoActions } from "./store/ducks/todos";

class TodoList extends Component {
  handleSubmit = (e) => {
    const { addTodo } = this.props;
    e.preventDefault();
    addTodo(this.input.value);
    this.input.value = "";
  };

  render() {
    const { todos, toggleTodo, removeTodo } = this.props;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="mt-5">
          <h3>Add Todos</h3>
          <div className="row">
            <div className="form-group col-sm-9">
              <input
                type="text"
                ref={(el) => {
                  this.input = el;
                }}
                className="form-control"
                tabIndex="0"
              />
            </div>
            <div className="form-group col-sm-3">
              <button type="submit" className="btn btn-primary">
                Novo Todo
              </button>
            </div>
          </div>
        </form>

        <ul className="list-group">
          {todos.map(todo => (
            <li key={todo.id} className="list-group-item">
              {todo.isCompleted ? <s>{todo.text}</s> : todo.text}
              <div>
                <button
                  className="btn btn-info btn-sm"
                  type="button"
                  onClick={() => toggleTodo(todo.id)}
                >
                  Toggle
                </button>
                <button
                  className="btn btn-danger btn-sm ml-3"
                  type="button"
                  onClick={() => removeTodo(todo.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({ todos: state.todos });

const mapDispatchToProps = dispatch => bindActionCreators(TodoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);
