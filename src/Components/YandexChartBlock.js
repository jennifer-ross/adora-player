import React, {Component} from 'react';
import Section from "./Section";
import {Link, withRouter} from "react-router-dom";
import {getTrackObject, getYandexChart,} from "../Actions/apiActions";
import {setPlayerState} from "../Actions/playerActions";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import Icon from "./Icon";

class YandexChartBlock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countTracks: 7,
            playlist: [],
        };
    }

    componentDidMount() {
        this.props.getYandexChart();
    }

    trackPlayClickHandler = e => {
        e.preventDefault();
        const {currentTarget} = e;
        const {trackkey} = currentTarget.dataset;
        const {getTrackObject, setPlayerState, playerState} = this.props;
        const {playlist} = this.state;

        if (playerState.isPaused === false && trackkey.split(':')[0] === playerState.trackid) {
            setPlayerState(Object.assign(playerState, {isPaused: true}));
        }else {
            setPlayerState(Object.assign(playerState, {isPaused:  !playerState.isPaused, playlist}));
            getTrackObject(trackkey);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {yandexChart} = this.props;
        const {countTracks} = this.state;

        if (prevProps.yandexChart !== yandexChart) {
            const playlist = [];

            if (yandexChart && yandexChart?.charts && yandexChart.charts.length > 0) {
                yandexChart.charts[0].entities.slice(0, countTracks).map((chart, k) => {
                    const track = chart.data.track;

                    playlist.push(track);
                });
            }

            this.setState({playlist});
        }
    }

    renderTracks = () => {
        const {yandexChart, playerTrack, playerState} = this.props;
        const {countTracks} = this.state;

        if (yandexChart && yandexChart?.charts && yandexChart.charts.length > 0) {
            return yandexChart.charts[0].entities.slice(0, countTracks).map((chart, k) => {
                const track = chart.data.track;
                const len = track.artists.length;
                let i = 0;

                return (
                    <div className="new-tracks__track track" key={k}>
                        <Link to='#'>
                            <div className="track__image">
                                <img src={`https://${track.coverUri.replace('%%', '50x50')}`}/>
                            </div>
                        </Link>
                        <div className="track__content">
                            <div className="track__title" title={track.title}>
                                <Link to='#'>
                                    {
                                        track.title
                                    }
                                </Link>
                            </div>
                            <div className="track__artist">
                                {
                                    track.artists.map((artist, key) => {
                                        i++;
                                        return (<Link key={key} title={artist.name} to='#'>{artist.name}{i === len || ', '}</Link>);
                                    })
                                }
                            </div>
                        </div>
                        <div className="track__top">
                            #{chart.data.chartPosition.position}
                        </div>
                        <div className="track__actions">
                            <button className="button btn-play" data-trackkey={`${track.id}:${track.albums[0].id}`} onClick={this.trackPlayClickHandler}>{playerState.track?.trackid && track.id === playerState.track.trackid && playerState.isPaused === false ? <Icon className='pause' iconName='fas fa-pause'/> : <Icon iconName='fas fa-play'/>}</button>
                        </div>
                    </div>
                );
            });
        }
    };

    render() {
        return (
            <Section
                className='yandex-chart-block-section'
                container={"container-fluid"}
                sectionTop={
                    <>
                        <h3 className="section__title">Яндекс Чарт</h3>
                        <div className="section__top-container">
                            <Link to='/yandex-chart'>
                                <button className="button btn-watch-all">Смотреть все</button>
                            </Link>
                        </div>
                    </>
                }
            >
                <div className="tracks">
                    {
                        this.renderTracks()
                    }
                </div>
            </Section>
        );
    }
}

const mapStateToProps = state => ({
    yandexChart: state.yandexChart,
    playerTrack: state.playerTrack,
    playerState: state.playerState,
});

const mapDispatchToProps = dispatch => ({
    getYandexChart: () => dispatch(getYandexChart()),
    getTrackObject: (trackkey) => dispatch(getTrackObject(trackkey)),
    setPlayerState: (p) => dispatch(setPlayerState(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(YandexChartBlock)));