import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom"
import classnames from 'classnames'
import { connect } from 'react-redux'

import { registerUser } from '../../../redux/actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component {

    state = {
        firstName: '',
        secondName: '',
        email: '',
        avatar: '',
        password: '',
        password2: '',
        errors: {}
    }

    componentDidMount = () => {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/admin/dashboard')
        }
    }


    componentWillReceiveProps = (nextProps) => {
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            avatar: this.state.avatar,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history)
    }

    render(){

        const { errors } = this.state

        return(
            <main id="register">
                <h1 className="lg-heading">
                    Regis<span className="text-secondary"><strong>ter</strong></span>
                </h1>

                <form className="wrapper" onSubmit={this.onSubmit}>

                    <TextFieldGroup
                        type="text"
                        placeholder="Enter first name"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        type="text"
                        placeholder="Enter last name"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        type="email"
                        placeholder="Enter an email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        type="text"
                        placeholder="Enter an avatar url"
                        name="avatar"
                        value={this.state.avatar}
                        onChange={this.onChange}
                    />
                    
                    <TextFieldGroup
                        type="password"
                        placeholder="Enter a password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        type="password"
                        placeholder="Confirm your password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                    />

                    <button type="submit">Submit</button>
                </form>

            </main>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register))