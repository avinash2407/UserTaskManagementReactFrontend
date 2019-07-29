import { combineReducers } from 'redux';
import { auth } from './auth';
import { register } from './register';
import { users } from './listing';
import { deletecheck } from './deletecheck';
import { pagenumber } from './pagenumber';
import { taskpagenumber } from './taskpagenumber';
import { tasks } from './tasks';
import { owntasks } from './owntasks';
import { piestats } from './piestats';
import { barstats } from './barstats';
import { task } from './task';
import { statustask } from './statustask';
import { assigneeuser } from './assigneeuser';
import { loader } from './loader';

export const baseReducer = combineReducers({
	auth,
	register,
	users,
	deletecheck,
	taskpagenumber,
	pagenumber,
	tasks,
	owntasks,
	piestats,
	barstats,
	task,
	statustask,
	assigneeuser,
	loader
});
export default baseReducer;
