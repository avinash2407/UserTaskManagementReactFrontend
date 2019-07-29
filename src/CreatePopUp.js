import React, { Component } from 'react';
import Popup from 'reactjs-popup';

export default class CreatePopUp extends Component {
	render() {
		return (
			<Popup trigger={<button> Update Status</button>} position="right center">
				<div>Popup content here !!</div>
			</Popup>
		);
	}
}
