import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {callIncrementNew} from './toggleAction'

class Increment extends Component {
    render() { 
      const  {callIncrementNew}= this.props
        return ( 
            <button onClick={callIncrementNew}>Increment New</button>
         );
    }
}
 
const mapStateToProps = state => ({
    message : state.mess.message,
    count : state.mess.count
})

const mapDispatchToProps = dispatch => bindActionCreators ({
    callIncrementNew
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Increment)