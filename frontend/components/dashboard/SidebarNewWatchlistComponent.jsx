import React, { Component } from 'react'
import {} from '../../actions/watchlistActions'

export default class SidebarNewWatchlistComponent extends Component {
    constructor(props){
        super(props)
        // debugger
        this.state = {
            watchlistName: "",
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
        // need to create api to add watchlsit, then call it here
    }
    render() {
        return (
            <div className="add-new-watchlist">
                <form onSubmit={this.handleSubmit}>
                    <div className="two-col top">
                        <i class="fas fa-lightbulb"></i>
                        <input onChange={this.handleChange} value={this.state.watchlistName} type="text" name="watchlistName" placeholder="Watchlist Name" />
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
