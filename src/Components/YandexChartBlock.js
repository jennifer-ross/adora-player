import React, {Component} from 'react';
import Section from "./Section";
import {Link, withRouter} from "react-router-dom";
import {getYandexChart} from "../Actions/apiActions";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import Icon from "./Icon";

class YandexChartBlock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countTracks: 7,
        };
    }


    componentDidMount() {
        this.props.getYandexChart();
    }

    renderTracks = () => {
        const {yandexChart} = this.props;
        const {countTracks} = this.state;

        if (yandexChart && yandexChart.hasOwnProperty('chart') && yandexChart.chart.hasOwnProperty('tracks')) {
            return yandexChart.chart.tracks.slice(0, countTracks).map((track, k) => {
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
                            #{k+1}
                        </div>
                        <div className="track__actions">
                            <button className="button btn-play"><Icon iconName='fas fa-play'/></button>
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
    yandexChart: state.yandexChart
});

const mapDispatchToProps = dispatch => ({
    getYandexChart: () => dispatch(getYandexChart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(YandexChartBlock)));