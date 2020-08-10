import React, { Component } from 'react';
import Header from 'components/Header';
import Navigator from 'components/Navigator';
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as updateActions from 'modules/TrialVideo';

class TrialVideoView extends Component {
    componentWillMount(){
        const { UpdateActions } = this.props;
        UpdateActions.updateVideoHistory();
    }
    render() {
        const width220 = { width : '220px' };
        const videoIndex = this.props.match.params.index-1;
        const videoList = ['https://player.vimeo.com/video/430648265','https://player.vimeo.com/video/430650570','https://player.vimeo.com/video/430651294'];
        const marginTop = { marginTop : 0};
        return (
            <div className="wrap">
                <div className="container">
                    <Header></Header>
                    <div className="contents _02_02">
                        <Navigator></Navigator>
                        <div className="movie_box">
                            <iframe src={videoList[videoIndex]} title="video1" width="960" height="476" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                        </div>
                        <div className="btn_wrap" style={marginTop}>
                            <NavLink to="/trialVideo">
                                <button style={width220}>목록</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(
    (state) => ({
        value : state.input
    }),
    (dispatch) => ({
        UpdateActions : bindActionCreators(updateActions,dispatch)
    })
)(TrialVideoView);
