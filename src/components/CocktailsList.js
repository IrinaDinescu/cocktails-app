import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'


import Descriere from './Descriere';


export default class CocktailsList extends React.Component {

    state = {
        drinks: [],
        display: false,
    }

    componentDidMount() {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.props.str}`)
            .then(res => {
                this.setState({ drinks: res.data.drinks })
                if (this.props.filter !== "none") {
                    const filteredDrinks = res.data.drinks.filter(drink => drink.strAlcoholic === this.props.filter);
                    this.setState({ drinks: filteredDrinks });
                }
                if (this.state.drinks) {
                    if (this.state.drinks.length === 1) {
                        this.setState({ display: true });
                        ReactDOM.render(<Descriere id={this.state.drinks[0].idDrink} />, document.getElementById('div-descriere'))
                    }
                }

            })
    }

    render() {
        if (this.state.drinks && this.state.drinks.length > 0) {
            return (
                <div className="container-cocktail-list">
                    <div className="cocktail-list">
                        <ul>
                            {this.state.drinks.map(drink =>
                                <li
                                    onClick={() => {
                                        this.setState({ display: `${<Descriere id={drink.idDrink} />}` })
                                        ReactDOM.unmountComponentAtNode(document.getElementById('div-descriere'));
                                        ReactDOM.render(<Descriere id={drink.idDrink} />, document.getElementById('div-descriere'))
                                    }
                                    }
                                    key={drink.idDrink}>{drink.strDrink}
                                </li>)}
                        </ul>
                    </div>
                    <div id="div-descriere">
                    </div>
                </div>
            )
        } else {
            return (
                <div>Nu exista niciun astfel de cocktail!</div>
            )
        }
    }
}