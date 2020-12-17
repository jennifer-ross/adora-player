import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from "./Icon";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {setPlayerState} from "../Actions/playerActions";
import {getTrackObject} from "../Actions/apiActions";

class Player extends Component {

    constructor(props) {
        super(props);

        this.state = {
            seek: false,
        };

        this.playerRef = React.createRef();
        this.timeBeforeRef = React.createRef();
        this.timeAfterRef = React.createRef();
        this.progressBarRef = React.createRef();
        this.volumeBarRef = React.createRef();
    }

    timeUpdateHandler = e => {
        const {playerTrack, playerState, setPlayerState} = this.props;
        const player = this.playerRef.current;

        this.setTimeBefore(player.currentTime * 1000);

        const progress = (player.currentTime / player.duration).toFixed(6);
        setPlayerState(Object.assign(playerState, {progress, currentTime: player.currentTime}));
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {playerTrack, playerState} = this.props;
        const player = this.playerRef.current;

        if (prevProps.playerTrack.trackid !== playerTrack.trackid) {
            this.changedTrack();
        }else {
            if (prevProps.playerTrack !== playerState.isPaused) {
                if (playerState.isPaused === false) {
                    this.resumePlayer();
                }else {
                    this.stopPlayer();
                }
            }
        }

        if (!prevProps.playerState.track.hasOwnProperty('downloadUrl') && playerState.track.hasOwnProperty('downloadUrl')) {
            if (player) {
                player.currentTime = playerState.currentTime || 0;
                player.src = playerState.track.downloadUrl || undefined;
                player.volume = Number(playerState.volume);
                player.muted = playerState.muted || false;
            }

            this.setTimeBefore(playerState.currentTime);
        }
    }

    stopPlayer = () => {
        const {playerState, setPlayerState} = this.props;
        const player = this.playerRef.current;

        if (player) {
            if (player.paused === false) {
                try {
                    player.pause();
                }catch (e) {
                }
            }
        }
    };

    resumePlayer = () => {
        const {playerTrack, setPlayerState, playerState} = this.props;
        const player = this.playerRef.current;

        if (player) {
            if (player.paused === true) {
                try {
                    player.play().catch(err => {});
                }catch (e) {
                }
            }
        }
    };

    changedTrack = () => {
        const {playerTrack, setPlayerState, playerState} = this.props;
        const player = this.playerRef.current;

        player.src = playerTrack.downloadUrl;
        this.resumePlayer();
        this.setNextPrev();

        setPlayerState(Object.assign(playerState, {isPaused: false, track: playerTrack}));
    };

    setNextPrev = () => {
        const {playerTrack, setPlayerState, playerState} = this.props;

        const next = {};
        const prev = {};

        if (playerState.playlist.length > 1) {
            const currentIndex = playerState.playlist.findIndex((value => Number(value.id) === Number(playerTrack.trackid)));

            if (currentIndex !== false) {
                if (currentIndex >= 1) {
                    Object.assign(prev, playerState.playlist[currentIndex-1]);
                }

                if (currentIndex+1 <= playerState.playlist.length) {
                    Object.assign(next, playerState.playlist[currentIndex+1]);
                }
            }
        }

        setPlayerState(Object.assign(playerState, {next, prev}));
    };

    nextTrackHandler = () => {
        const {getTrackObject, playerState, setPlayerState} = this.props;

        if (playerState.next?.id) {
            getTrackObject(`${playerState.next.id}:${playerState.next.albums[0].id}`);
            setPlayerState(Object.assign(playerState, {isPaused: false}));
        }else {
            if (playerState.repeat === true) {
                getTrackObject(`${playerState.playlist[0].id}:${playerState.playlist[0].albums[0].id}`);
                setPlayerState(Object.assign(playerState, {isPaused: false}));
            }
        }
    };

    prevTrackHandler = () => {
        const {getTrackObject, playerState, setPlayerState} = this.props;

        if (playerState.prev?.id) {
            getTrackObject(`${playerState.prev.id}:${playerState.prev.albums[0].id}`);
            setPlayerState(Object.assign(playerState, {isPaused: false}));
        }
    };

    loadedHandler = () => {
        this.setTimeAfter();
    };

    trackEndedHandler = () => {
        const {playerTrack, setPlayerState, playerState} = this.props;

        setPlayerState(Object.assign(playerState, {isPaused: true}));
        this.nextTrackHandler();
    };

    setTimeAfter= () => {
        const timeAfter = this.timeAfterRef.current;
        const player = this.playerRef.current;

        if (timeAfter && player) {
            timeAfter.innerHTML = this.millisToTime(player.duration*1000);
        }
    };

    setTimeBefore = timeStamp => {
        const timeBefore = this.timeBeforeRef.current;

        if (timeBefore) {
            timeBefore.innerHTML = this.millisToTime(timeStamp);
        }
    };

    millisToTime = duration => {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);

        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    renderArtists = () => {
        const {playerState} = this.props;

        if (playerState.track.hasOwnProperty('trackInfo')) {
            return playerState.track.trackInfo.track.artists.map((artist, k) => {
                return (
                    <Link key={k} to=''>{artist.name}</Link>
                );
            });
        }
    };

    mouseDownProgressHandler = e => {
        this.setState({seek: true}, () => this.progressSeek(e));
    };

    mouseUpProgressHandler = e => {
        this.setState({seek: false});
    };

    mouseMoveProgressHandler = e => {
        const {seek} = this.state;

        if (seek) {
            this.progressSeek(e);
        }
    };

    progressSeek = e => {
        const {playerState} = this.props;
        const progressBar = this.progressBarRef.current;
        const player = this.playerRef.current;

        if (progressBar && player) {
            const {width, left} = progressBar.getBoundingClientRect();
            const progress = player.duration * ((e.clientX - left) / width).toFixed(6);

            player.currentTime = progress;
            setPlayerState(Object.assign(playerState, {progress}));
        }
    };

    mouseDownVolumeHandler = e => {
        this.setState({seek: true}, () => this.volumeSeek(e));
    };

    mouseUpVolumeHandler = e => {
        this.setState({seek: false});
    };

    mouseMoveVolumeHandler = e => {
        const {seek} = this.state;

        if (seek) {
            this.volumeSeek(e);
        }
    };

    volumeSeek = e => {
        const {playerState, setPlayerState} = this.props;
        const volumeBar = this.volumeBarRef.current;
        const player = this.playerRef.current;

        if (volumeBar && player) {
            const {width, left} = volumeBar.getBoundingClientRect();
            const volume = ((e.clientX - left) / width).toFixed(6);

            player.volume = volume;
            setPlayerState(Object.assign(playerState, {volume}));
        }
    };

    playClickHandler = () => {
        const {playerState, setPlayerState} = this.props;

        setPlayerState(Object.assign(playerState, {isPaused: !playerState.isPaused}));
    };

    muteClickHandler = () => {
        const {playerState, setPlayerState} = this.props;
        const player = this.playerRef.current;

        if (player) {
            const muted = !playerState.muted;

            player.muted = muted;
            setPlayerState(Object.assign(playerState, {muted}));
        }
    };

    render() {
        const {playerTrack, playerState} = this.props;

        return (
            <div className='player'>
                <div className="container-fluid">
                    <div className="player__track progress">
                        <div className="progress-bar" ref={this.progressBarRef} onMouseLeave={this.mouseUpProgressHandler} onMouseUp={this.mouseUpProgressHandler} onMouseMove={this.mouseMoveProgressHandler} onMouseDown={this.mouseDownProgressHandler}>
                            <div className="progress-bar__bg"/>
                            <div className="progress-bar__progress-muted">
                                <div className="progress__line-muted" style={{transform: `scaleX(${playerState.progress})`}}/>
                            </div>
                            <div className="progress-bar__progress">
                                <div className="progress__line" style={{transform: `scaleX(${playerState.progress})`}}/>
                            </div>
                        </div>
                        <audio ref={this.playerRef} onLoadedData={this.loadedHandler} onEnded={this.trackEndedHandler} onTimeUpdate={this.timeUpdateHandler}/>
                    </div>
                    <div className="player__user-actions user-actions">
                        <div className="user-actions__art actions-art">
                            <img className='actions-art__image' src={`https://${playerState.track.hasOwnProperty('trackInfo') ? playerState.track.trackInfo.track.coverUri.replace('%%', '50x50') : null}`}/>
                            <div className='actions-art__container'>
                                <span className="actions-art__title">
                                    {playerState.track.hasOwnProperty('trackInfo') ? playerState.track.trackInfo.track.title : null}
                                </span>
                                <span className="actions-art__subtitle">
                                    {
                                        this.renderArtists()
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="user-actions__center-control center-control">
                            <div className="user-actions__time actions-time">
                                <span className='actions-time-left' ref={this.timeBeforeRef}>0:00</span>
                                <span className='actions-time-divider'/>
                                <span className='actions-time-right' ref={this.timeAfterRef}>0:00</span>
                            </div>
                            <div className="user-actions__control-buttons control-buttons">
                                <button className="button control-buttons__random"><Icon iconName='far fa-random'/></button>
                                <button className="button control-buttons__prev" onClick={this.prevTrackHandler}><Icon iconName='fas fa-fast-backward'/></button>
                                <button className="button control-buttons__play" onClick={this.playClickHandler}>{playerState.isPaused ? <Icon iconName='fas fa-play'/> : <Icon className='pause' iconName='fas fa-pause'/>}</button>
                                <button className="button control-buttons__next" onClick={this.nextTrackHandler}><Icon iconName='fas fa-fast-forward'/></button>
                                <button className={classNames('button control-buttons__repeat', playerState.repeat !== true || 'active')}><Icon iconName='far fa-redo-alt'/></button>
                            </div>
                        </div>
                        <div className="user-actions__right-control right-control">
                            <div className="user-actions__sound-buttons sound-buttons">
                                <button className="button sound-buttons__like"><Icon iconName='fas fa-heart'/></button>
                                <button className="button sound-buttons__add-paylist"><Icon iconName='far fa-list-music'/></button>
                                <button className="button sound-buttons__mute" onClick={this.muteClickHandler}>{playerState.muted ? <Icon iconName='far fa-volume-mute'/> : <Icon iconName='far fa-volume-up'/>}</button>
                                <div className="sound-track progress" ref={this.volumeBarRef} onMouseLeave={this.mouseUpVolumeHandler} onMouseUp={this.mouseUpVolumeHandler} onMouseMove={this.mouseMoveVolumeHandler} onMouseDown={this.mouseDownVolumeHandler}>
                                    <div className="progress-bar">
                                        <div className="progress-bar__bg"/>
                                        <div className="progress-bar__progress-muted">
                                            <div className="progress__line-muted" style={{transform: `scaleX(${playerState.volume})`}}/>
                                        </div>
                                        <div className="progress-bar__progress">
                                            <div className="progress__line" style={{transform: `scaleX(${playerState.volume})`}}/>
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

const mapStateToProps = state => ({
    playerTrack: state.playerTrack,
    playerState: state.playerState,
});

const mapDispatchToProps = dispatch => ({
    setPlayerState: (p) => dispatch(setPlayerState(p)),
    getTrackObject: (trackkey) => dispatch(getTrackObject(trackkey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(Player)));
