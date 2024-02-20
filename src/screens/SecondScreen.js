import React from 'react'

import MultiselectList from '../components/MultiselectList';

export default class SecondScreen extends React.Component {

    render() {
        return (
            <div className="screen">
                <div id='container-ingredients'>
                    <MultiselectList />
                </div>
            </div>
        )

    }
}