import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from "./Icon";

class Player extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isPause: true,
        };
    }


    timeUpdateHandler = e => {

    };

    render() {
        const {src} = this.props;

        return (
            <div className='player'>
                <div className="container-fluid">
                    <div className="player__track progress">
                        <div className="progress-bar">
                            <div className="progress-bar__bg"/>
                            <div className="progress-bar__progress-muted">
                                <div className="progress__line-muted"/>
                            </div>
                            <div className="progress-bar__progress">
                                <div className="progress__line"/>
                            </div>
                        </div>
                        <audio src={src} onTimeUpdate={this.timeUpdateHandler}/>
                    </div>
                    <div className="player__user-actions user-actions">
                        <div className="user-actions__art actions-art">
                            <img className='actions-art__image' src="https://avatars.yandex.net/get-music-content/175191/0ec97b3a.a.4829106-1/50x50"/>
                            <div className='actions-art__container'>
                                <span className="actions-art__title">
                                    This Girl
                                </span>
                                <span className="actions-art__subtitle">
                                    Kungs
                                </span>
                            </div>
                        </div>
                        <div className="user-actions__center-control center-control">
                            <div className="user-actions__time actions-time">
                                <span className='actions-time-left'>0:00</span>
                                <span className='actions-time-divider'/>
                                <span className='actions-time-right'>3:15</span>
                            </div>
                            <div className="user-actions__control-buttons control-buttons">
                                <button className="button control-buttons__random"><Icon iconName='far fa-random'/></button>
                                <button className="button control-buttons__prev"><Icon iconName='fas fa-fast-backward'/></button>
                                <button className="button control-buttons__play"><Icon iconName='fas fa-play'/></button>
                                <button className="button control-buttons__next"><Icon iconName='fas fa-fast-forward'/></button>
                                <button className="button control-buttons__repeat"><Icon iconName='far fa-redo-alt'/></button>
                            </div>
                        </div>
                        <div className="user-actions__right-control right-control">
                            <div className="user-actions__sound-buttons sound-buttons">
                                <button className="button sound-buttons__like"><Icon iconName='fas fa-heart'/></button>
                                <button className="button sound-buttons__add-paylist"><Icon iconName='far fa-list-music'/></button>
                                <button className="button sound-buttons__mute"><Icon iconName='far fa-volume-up'/></button>
                                <div className="sound-track progress">
                                    <div className="progress-bar">
                                        <div className="progress-bar__bg"/>
                                        <div className="progress-bar__progress-muted">
                                            <div className="progress__line-muted"/>
                                        </div>
                                        <div className="progress-bar__progress">
                                            <div className="progress__line"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Player.propTypes = {
    src: PropTypes.any.isRequired,
};

export default Player;
