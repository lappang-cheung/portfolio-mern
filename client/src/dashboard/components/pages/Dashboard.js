import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCurrentProfile } from '../../../redux/actions/profileActions'

class Dashboard extends Component{


    componentDidMount(){
        this.props.getCurrentProfile()
    }

    render(){

        const { user } = this.props.auth
        const { profile, loading } = this.props.profile

        let dashboardContent

        if(profile === null || loading){
            dashboardContent = <h1 className="lg-heading">
                Load<span className="text-secondary"><strong>ing...</strong></span>
                </h1>
        }else{
            dashboardContent = <h1 className="lg-heading">
                Dash<span className="text-secondary"><strong>board</strong></span>
            </h1>
        }

        return(
            <main id="dashboard">
                {dashboardContent}
            </main>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>( {
    profile: state.profile,
    auth: state.auth,
})

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard)