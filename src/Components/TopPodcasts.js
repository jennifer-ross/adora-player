import React, {Component} from 'react';
import {} from "../Actions/apiActions";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import Section from "./Section";
import {Link, withRouter} from "react-router-dom";
import {getNonMusicBlocks} from "../Actions/apiActions";

class TopPodcasts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countTracks: 6,
        };
    }

    componentDidMount() {
        this.props.getNonMusicBlocks();
    }

    renderTracks = () => {
        const {countTracks} = this.state;
        const {nonMusicBlocks} = this.props;

        if (nonMusicBlocks && nonMusicBlocks?.chartPositions && nonMusicBlocks.chartPositions.length > 0) {

            return nonMusicBlocks.chartPositions.slice(0, countTracks).map((value, k) => {
                const entity = value.album;

                return (
                    <div className="new-tracks__track track" key={k}>
                        <Link to='#'>
                            <div className="track__image">
                                <img src={`https://${entity.coverUri.replace('%%', '100x100')}`}/>
                            </div>
                        </Link>
                        <div className="track__content">
                            <div className="track__title" title={entity.title}>
                                <Link to='#'>
                                    {
                                        entity.title
                                    }
                                </Link>
                            </div>
                            <div className="track__subtitle" title={entity.shortDescription}>
                                {
                                    entity.shortDescription
                                }
                            </div>
                        </div>
                    </div>
                );
            });
        }
    };

    render() {
        return (
            <Section
                className='top-podcasts-block-section'
                container={"container-fluid"}
                sectionTop={
                    <>
                        <h3 className="section__title">Топ подкастов</h3>
                        <div className="section__top-container">
                            <Link to='/'>
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
    nonMusicBlocks: state.nonMusicBlocks
});

const mapDispatchToProps = dispatch => ({
    getNonMusicBlocks: () => dispatch(getNonMusicBlocks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(TopPodcasts)));