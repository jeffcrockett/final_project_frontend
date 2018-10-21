import React from 'react'

class Sorter extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <select class="ui dropdown">
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
            </select>
        )
    }
}

export default Sorter