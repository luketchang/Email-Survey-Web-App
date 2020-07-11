import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(({ _id, title, body, dateSent, yes, no }) => {
            return(
                <div className="col s12 m6" key={_id}>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">{title}</span>
                            <p>{body}</p>
                            <p className="right">
                                Sent On: {new Date(dateSent).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <div className="card-action">
                                <a>Yes: {yes}</a>
                                <a>No: {no}</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="row" style={{padding: 0, margin: 0}}>
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps({ surveys }) {
    return { surveys: surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);