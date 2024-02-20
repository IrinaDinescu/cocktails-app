import React from 'react';
import { Multiselect } from 'multiselect-react-dropdown'
import axios from 'axios';
import ReactDOM from 'react-dom'



export default class MultiselectList extends React.Component {

    state = {
        ingredients: [],
        selectedIngredients: [],
        excludedIngredients: [],
        drinks: [],
        possibleDrinks: [],
        selectedDrinks: [],
    }

    componentDidMount() {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
            .then(res => {
                this.setState({ ingredients: res.data.drinks })
            })
    }

    searchCocktail(selectedIngredients, excludedIngredients) {

        if (excludedIngredients.length > 0) {
            var excludedDrinks = new Array(excludedIngredients.length);
            for (let i = 0; i < excludedIngredients.length; i++) {
                axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${excludedIngredients[i].strIngredient1}`)
                    .then(res => {
                        res.data.drinks.forEach(drink => {
                            if (!excludedDrinks.includes(drink.strDrink)) {
                                excludedDrinks.push(drink.strDrink);
                            }
                        });
                    })
            }
        }

        if (selectedIngredients.length > 0) {
            let possibleDrinks = new Array(selectedIngredients.length);
            for (let i = 0; i < selectedIngredients.length; i++) {
                axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedIngredients[i].strIngredient1}`)
                    .then(res => {
                        this.setState({ drinks: res.data.drinks })
                        possibleDrinks[i] = this.state.drinks.map(function (drink) {
                            return drink.strDrink
                        });

                    })
            }

            setTimeout(function () {
                var minSize = possibleDrinks[0].length
                var indexOfMinSize = 0;

                for (let i = 1; i < possibleDrinks.length; i++) {
                    if (minSize > possibleDrinks[i].length) {
                        minSize = possibleDrinks[i].length;
                        indexOfMinSize = i;
                    }
                }
                let bauturi = [];
                for (let i = 0; i < possibleDrinks[indexOfMinSize].length; i++) {
                    let hasAllIngredients = true;
                    for (let j = 0; j < possibleDrinks.length; j++) {
                        if (!possibleDrinks[j].includes(possibleDrinks[indexOfMinSize][i])) {
                            hasAllIngredients = false;

                        }
                    }
                    if (hasAllIngredients === true) {
                        if (!excludedDrinks) {
                            bauturi.push(possibleDrinks[indexOfMinSize][i])
                        } else {
                            if (!excludedDrinks.includes(possibleDrinks[indexOfMinSize][i])) {
                                bauturi.push(possibleDrinks[indexOfMinSize][i])
                            }
                        }
                    }
                }

                if (bauturi.length > 0) {
                    let count = 0;
                    ReactDOM.unmountComponentAtNode(document.getElementById('lista-bauturi'));
                    ReactDOM.render(<ul>
                        {bauturi.map(bautura => <li key={count++} >{bautura}</li>)}
                    </ul>, document.getElementById('lista-bauturi'))

                } else {
                    ReactDOM.unmountComponentAtNode(document.getElementById('lista-bauturi'));
                    ReactDOM.render(<p>Nu exista nicio bautura cu aceste ingrediente!</p>,
                        document.getElementById('lista-bauturi'))
                }

            }, 1000)
        }


    }


    render() {

        const customStyle = {
            option: {
                background: `#ffffff`,
                color: `#000000`
            },
            chips: {
                background: `#51000b`
            },
            searchBox: {
                background: `#ffffff`, border: `none`, width: `100%`
            },

        }

        return (
            <div>
                <div style={{ width: "90%", justifyContent: "center", display: "flex", }}>
                    <div className="List">
                        <ul>
                            <li>
                                <label>Ingredients to include:</label>
                                <Multiselect
                                    style={customStyle}
                                    options={this.state.ingredients}
                                    displayValue="strIngredient1"
                                    onSelect={(event) => {
                                        this.setState({ selectedIngredients: event })
                                    }}
                                    onRemove={(event) => {
                                        this.setState({ selectedIngredients: event })
                                    }}
                                />
                            </li>
                            <li>
                                <label>Ingredients to exclude:</label>
                                <Multiselect
                                    style={customStyle}
                                    options={this.state.ingredients}
                                    displayValue="strIngredient1"
                                    onSelect={(event) => {
                                        this.setState({ excludedIngredients: event })

                                    }}
                                    onRemove={(event) => {
                                        this.setState({ excludedIngredients: event })

                                    }}
                                />
                            </li>
                        </ul>


                    </div>
                    <button
                        id="btn-search-by-ingredients"
                        onClick={() => this.searchCocktail(this.state.selectedIngredients, this.state.excludedIngredients)}>Search
                    </button>
                </div>
                <div className="ingredients-container" id="lista-bauturi">
                </div>
            </div>

        )
    }
}
