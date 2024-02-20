import React from 'react'
import ReactDOM from 'react-dom'

import CocktailsList from '../components/CocktailsList';


export default class FirstScreen extends React.Component {

    state = {
        isCocktailsListVisible: false,
        str: '',
        alcoholicFilter: false,
        nonAlcoholicFilter: false,
    }

    search() {
        const str = document.getElementById('search-input').value;

        let filter = "none";
        if (this.state.alcoholicFilter && !this.state.nonAlcoholicFilter) filter = "Alcoholic";
        if (!this.state.alcoholicFilter && !this.state.alcoholicFilter) filter = "Non alcoholic";
        if (this.state.alcoholicFilter && this.state.nonAlcoholicFilter) filter = "none";
        if (!this.state.alcoholicFilter && !this.state.nonAlcoholicFilter) filter = "none";

        if (str !== '') {
            this.setState({ isCocktailsListVisible: true })
            this.setState({ str: str })
            ReactDOM.unmountComponentAtNode(document.getElementById('cocktails-list'));
            ReactDOM.render(<CocktailsList str={str} filter={filter} />, document.getElementById('cocktails-list'))
        } else {
            this.setState({ isCocktailsListVisible: false })
            ReactDOM.unmountComponentAtNode(document.getElementById('cocktails-list'));

        }
    }

    manageAlcoholicFilter() {
        this.setState({ alcoholicFilter: !this.state.alcoholicFilter })
    }

    manageNonAlcoholicFilter() {
        this.setState({ nonAlcoholicFilter: !this.state.nonAlcoholicFilter })
    }

    render() {
        return (
            <div className="screen">
                <div className="container-search">
                    <input id="search-input" type="text"></input>
                    <button className="btn-search" id='search-btn' onClick={this.search.bind(this)} >Search</button>
                </div>
                <div className="fieldest-container">
                    <fieldset className="fieldest">
                        <legend>Choose your type of cocktail</legend>
                        <div>
                            <input type="checkbox" id="alcoholic" value="alcoholic"
                                onClick={this.manageAlcoholicFilter.bind(this)}
                            />
                            <label htmlFor="alcoholic">Alcoholic</label>
                        </div>
                        <div>
                            <input type="checkbox" id="non-alcoholic" value="non-alcoholic"
                                onClick={this.manageNonAlcoholicFilter.bind(this)}

                            />
                            <label htmlFor="non-alcoholic">Non alcoholic</label>
                        </div>
                    </fieldset>
                </div>
                <div
                    id="cocktails-list">
                </div>
            </div>
        )
    }
}