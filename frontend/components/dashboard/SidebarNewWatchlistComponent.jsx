import React, { Component } from 'react'
import Loader2 from '../other/loader2'

export default class SidebarNewWatchlistComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hide = this.hide.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if (Object.keys(prevProps.watchlists).length !== Object.keys(this.props.watchlists).length){
            document.querySelector('#add-new-watchlist').style.display = "none";
            this.setState({
                title: "",
            });        
        }
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
    hide(){
        document.querySelector('#add-new-watchlist').style.display = "none";
        this.props.clearWatchlistErrors();
    }
    render() {
        const {errors, watchlistLoading} = this.props;

        let submitButton;
        if (watchlistLoading === true){
            submitButton = ( <Loader2 /> )
        } else {
            submitButton = ( <button className="create-watchlist generic" type="submit">Create Watchlist</button> )
        }
        

        return (
            <div className="add-new-watchlist" id="add-new-watchlist">
                <form onSubmit={this.handleSubmit}>
                    <div className="two-col top">
                        <i class="fas fa-lightbulb"></i>
                        <input onChange={this.handleChange} value={this.state.title} type="text" name="title" placeholder="Watchlist Title" />
                    </div>
                    <div className="two-col bottom">
                        <button type="button" onClick={this.hide} className="cancel">Cancel</button>
                        <button className="create-watchlist generic" type="submit">Create Watchlist</button>
                    </div>
                    <ul className="new-watchlist-errors">
                        {(Object.values(errors).length) ? Object.values(errors).map(error => <li>{error}</li>) : ""}
                    </ul>
                </form>
            </div>
        )
    }
}
