import React from 'react';
import { render } from 'react-dom';
import {App} from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './StoreCreator/store';
import { history } from './BrowseHistory';
import { BrowserRouter as Router } from 'react-router-dom';

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
