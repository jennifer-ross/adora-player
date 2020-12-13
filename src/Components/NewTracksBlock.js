import React, {Component} from 'react';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {Link, withRouter} from "react-router-dom";
import {getAlbumsInfo, getNewReleases, getNewReleasesState} from "../Actions/apiActions";
import Section from "./Section";
import LoadingFull from "./LoadingFull";

class NewTracksBlock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tracks: [],
            countTracks: 6,
        };
    }

    componentDidMount() {
        this.getTracksInfo();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {newReleases} = this.props;
        const {tracks} = this.state;

        if (prevProps.newReleases.data.length !== newReleases.data.length && tracks.length <= 0) {
            this.getTracksInfo();
        }
    }

    getTracksInfo = () => {
        const {newReleases} = this.props;
        const {countTracks} = this.state;

        if (newReleases.data.length > 0) {
            const tracks = getAlbumsInfo(newReleases.data.slice(0, countTracks));

            tracks.then(value => {
                this.setState({
                    tracks: value,
                });
            });
        }
    };

    renderTracks = () => {
        const {tracks} = this.state;

        return tracks.map((track, k) => {
            return (
                <div className="new-tracks__track track" key={k}>
                    <Link to='#'>
                        <div className="track__image">
                            <img src={`https://${track.coverUri.replace('%%', '200x200')}`}/>
                        </div>
                    </Link>
                    <div className="track__title">
                        <Link to='#'>
                            {
                                track.title
                            }
                        </Link>
                    </div>
                    <div className="track__genre">
                        <Link to='#'>
                            {
                                track.hasOwnProperty('genre') ? track.genre : null
                            }
                        </Link>
                    </div>
                </div>
            );
        });
    };

    render() {
        const {account, newReleases, getNewReleases} = this.props;
        const {tracks} = this.state;

        if (newReleases.data.length <=0) {
            getNewReleases();
            return (<LoadingFull/>);
        }

        return (
            <Section
                className='new-tracks-block-section'
                container={"container-fluid"}
                sectionTop={
                    <>
                        <h3 className="section__title">Новинки этой недели</h3>
                        <div className="section__top-container">
                            <Link to='/new-releases'>
                                <button className="button btn-watch-all">Смотреть все</button>
                            </Link>
                        </div>
                    </>
                }
            >
                <div className="new-tracks">
                    {
                        this.renderTracks()
                    }
                </div>
            </Section>
        );
    }
}

const mapStateToProps = state => ({
    account: state.account,
    newReleases: state.newReleases
});

const mapDispatchToProps = dispatch => ({
    getNewReleases: () => dispatch(getNewReleases()),
    getNewReleasesState: () => dispatch(getNewReleasesState())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(NewTracksBlock)));