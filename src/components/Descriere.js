import React from 'react';
import axios from 'axios';

export default class Descriere extends React.Component {

    state = {
        details: {},
        ingredients: [],
        measuremets: [],
    }

    componentDidMount() {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.props.id}`)
            .then(res => {
                this.setState({ details: res.data.drinks[0] });
                var ingredients = [];
                var measuremets = [];
                for (let i = 0; i < 15; i++) {
                    ingredients[i] = this.state.details[`strIngredient${i + 1}`]
                    measuremets[i] = this.state.details[`strMeasure${i + 1}`]
                }
                this.setState({ ingredients: ingredients })
                this.setState({ measuremets: measuremets })
            })
    }

    showIngredientsAndMeasumerts(props) {
        var element = ``
        for (let i = 0; i < 15; i++) {
            if (props.ingredients[i] !== null)
                element += ` ${props.ingredients[i]}`
            if (props.measuremets[i] !== null)
                element += `(${props.measuremets[i]})`

        }
        return element;
    }


    render() {
        return (
            <div className="details">
                <div className="image">
                    <img id="cocktail-image"
                        alt=''
                        src={this.state.details.strDrinkThumb}
                    >
                    </img>
                </div>
                <div className="details-text">
                    <div className="Instructions">
                        <p>Instructions:</p>
                        <ul>
                            <li>
                                <h>
                                    {this.state.details.strInstructions}
                                </h>
                            </li>
                        </ul>
                    </div>
                    <div className="Ingredients">
                        <p>Ingredients:</p>
                        <ul>
                            <li>
                                <h>
                                    <this.showIngredientsAndMeasumerts ingredients={this.state.ingredients} measuremets={this.state.measuremets} />
                                </h>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}