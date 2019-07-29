import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ValidateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			((Cookies.get('tokencookie')!==undefined) && (Cookies.get('role')!==undefined) && (Cookies.get('userid')!==undefined)) ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
			)
		}
	/>
);
