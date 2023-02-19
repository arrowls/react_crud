import React from "react";

export default class Notes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [],
			input: '',
		}
		this.inputHandler = this.inputHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}

	componentDidMount() {
		this.getNotes();
	}

	inputHandler(e) {
		this.setState(prev => ({...prev, input: e.target.value}))
	}

	submitHandler() {
		this.setState(prev => ({...prev, input: ''}))
		fetch(process.env.REACT_APP_SERVER_URL, {
			method: 'POST',
			body: JSON.stringify({
				content: this.state.input,
			})
		});
		this.getNotes();
	}

	deleteHandler(id) {
		fetch(process.env.REACT_APP_SERVER_URL + `/${id}`, {
			method: 'delete',
		}).then(() => this.getNotes());
	}

	getNotes() {
		fetch(process.env.REACT_APP_SERVER_URL)
				.then(res => res.json())
				.then(res => this.setState(prev => ({...prev, notes: res})));
	}

	render() {
		return (
				<div className="s-notes">
					<h1 className="s-notes__header">Notes</h1>
					<div className="s-notes__wrapper">
						<button className="s-notes__update" onClick={() => this.getNotes()} />
						{this.state.notes.map(note => {
							return (
									<div className="s-notes__note">
										<button className="s-notes__delete" onClick={() => this.deleteHandler(note.id)}>x</button>
										{note.content}
									</div>
							)
						})}
					</div>

					<div className="s-notes__input">
						<h3 className="s-notes__input-subheader">
							New Note
						</h3>
						<input type="text" className="s-notes__input-el" value={this.state.input} onInput={this.inputHandler}/>
						<button className="s-notes__input-submit" onClick={this.submitHandler}>OK</button>
					</div>
				</div>
		)
	}
}
