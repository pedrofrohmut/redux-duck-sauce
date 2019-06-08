import { createActions, createReducer } from "reduxsauce";

/**
 * Creating Action Types & Action Creators
 */
export const { Types, Creators } = createActions({
  addTodo: ["text"],
  toggleTodo: ["id"],
  removeTodo: ["id"],
});

const INITIAL_STATE = [];

/**
 * Reducer Functions
 */
const add = (state = INITIAL_STATE, action) => [
  ...state,
  { id: Math.random(), text: action.text, isCompleted: false },
];

const toggle = (state = INITIAL_STATE, action) => state.reduce(
  (acc, curr) => acc.concat(
    curr.id === action.id
      ? { ...curr, isCompleted: !curr.isCompleted }
      : curr,
  ),
  [],
);

const remove = (state = INITIAL_STATE, action) => state.filter(todo => todo.id !== action.id);

/**
 * Create the reducer with functions + Initial State
 */
export default createReducer(INITIAL_STATE, {
  [Types.ADD_TODO]: add,
  [Types.TOGGLE_TODO]: toggle,
  [Types.REMOVE_TODO]: remove,
});
