import React, { Component } from 'react'

export default class SidebarNewWatchlistComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        e.preventDefault();
        this.setState({
            [e.currentTarget.getAttribute('name')]: e.currentTarget.value,
        })
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.createWatchlist(this.state);
    }
    render() {
        return (
            <div className="add-new-watchlist" id="add-new-watchlist">
                <form onSubmit={this.handleSubmit}>
                    <div className="two-col top">
                        <i class="fas fa-lightbulb"></i>
                        <input onChange={this.handleChange} value={this.state.title} type="text" name="title" placeholder="Watchlist Title" />
                    </div>
                    <div className="two-col bottom">
                        <button className="cancel">Cancel</button>
                        <button className="create-watchlist generic" type="submit">Create Watchlist</button>
                    </div>
                </form>
            </div>
        )
    }
}
