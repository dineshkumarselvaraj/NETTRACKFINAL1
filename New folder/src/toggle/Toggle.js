import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {calltoggle,callIncrement,callDecrement} from './toggleAction'

const Toggle = ({message,count, calltoggle,callIncrement,callDecrement}) =>(
    <div>
        {message && 
        <p>Show me</p>}
        <button onClick={calltoggle}>Toggle</button>

        <br />

        <button onClick={callIncrement}>Increment</button>

        <br />

        <button onClick={callDecrement}>Decrement</button>

    </div>
)
const mapStateToProps = state => ({
    message : state.mess.message,
    count : state.mess.count
})

const mapDispatchToProps = dispatch => bindActionCreators ({
    calltoggle,
    callIncrement,
    callDecrement
},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(Toggle)