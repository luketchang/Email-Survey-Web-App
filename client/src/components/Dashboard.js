import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SurveyList from './surveys/SurveyList';

class Dashboard extends Component {

  hasCredits() {
    if(this.props.auth.credits <= 0) {
      return (
        <div className="fixed-action-btn">
          <a class="btn-floating btn-large blue" onClick={() => alert('Please add credits.')}>
            <i className="large material-icons cyan darken-3">add</i>
          </a>
        </div>
      );
    }

    return (
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large blue">
          <i className="large material-icons cyan darken-3">add</i>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        <SurveyList />
        {this.props.auth ? this.hasCredits() : <div>Fetching data...</div>}
      </div>
    );
  }
};

function mapStateToProps({ auth }){
  return { auth: auth };
}

export default connect(mapStateToProps)(Dashboard);
