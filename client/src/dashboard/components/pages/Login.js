import React, {Component} from 'react'
import { withRouter } from "react-router-dom"
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { loginUser } from '../../../redux/actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

class Login extends Component {

    state = {
        email: '',
        password: '',
        errors:{}
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = () => {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/admin/dashboard')
        }
    }

    componentWillReceiveProps = (nextProps) =>{

        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/admin/dashboard')
        }

        if(nextProps.errors){
            this.setState({ errors: nextProps.errors })
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData, this.props.history)
    }

    render(){

        const { errors } = this.state;

        return(
            <main id="login">
                <h1 className="lg-heading">
                    Log<span className="text-secondary"><strong>in</strong></span>
                </h1>

                <form className="wrapper" onSubmit={this.onSubmit}>

                    <TextFieldGroup 
                        type="email"
                        name="email"
                        placeholder="Enter an email"
                        value={this.state.email}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        type="password"
                        placeholder="Enter the password"
                        name="password"   
                        value={this.state.password} 
                        onChange={this.onChange}
                    />

                    <button type="submit">Submit</button>
                </form>

            </main>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})((withRouter(Login)))