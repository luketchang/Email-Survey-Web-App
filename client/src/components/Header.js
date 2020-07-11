import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component{
  renderContent() {
    switch(this.props.auth){
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key="2" style={{margin: '0 15px'}}>Credits: {this.props.auth.credits}</li>,
          <li key="3"><a href="/api/logout">Logout</a></li>
        ];
    }
  }

  render() {
    return(
      <nav>
        <div className="nav-wrapper cyan lighten-1">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
            style={{paddingLeft: '10px'}}
          >
            Emaily
            <i className="material-icons right white-title" style={{fontSize: '50px'}}>email</i>
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }){
  return {
    auth: auth
  }
}

export default connect(mapStateToProps)(Header);
