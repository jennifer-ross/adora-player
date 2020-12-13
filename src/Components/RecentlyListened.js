import React, {Component} from 'react';
import Section from "./Section";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {Link, withRouter} from "react-router-dom";
import {getAlbumsInfo, getUserHistory} from "../Actions/apiActions";

class RecentlyListened extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countTracks: 4,
        };
    }

    componentDidMount() {
        this.props.getUserHistory();
    }

    renderTracks = () => {
        const {countTracks} = this.state;

        return this.props.userHistory.tracks.slice(0, countTracks).map((track, k) => {
            const len = track.artists.length;
            let i = 0;

            return (
                <div className="new-tracks__track track" key={k}>
                    <Link to='#'>
                        <div className="track__image">
                            <img src={`https://${track.coverUri.replace('%%', '200x200')}`}/>
                        </div>
                    </Link>
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
                                return (<Link key={key} to='#' title={artist.name}>{artist.name}{i === len || ', '}</Link>);
                            })
                        }
                    </div>
                </div>
            );
        });
    };

    render() {
        return (
            <Section
                className='recently-listened-block-section'
                container={"container-fluid"}
                sectionTop={
                    <>
                        <h3 className="section__title">Недавно прослушанные</h3>
                        <div className="section__top-container">
                            <Link to='/history'>
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
    userHistory: state.userHistory,
});

const mapDispatchToProps = dispatch => ({
    getUserHistory: () => dispatch(getUserHistory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(RecentlyListened)));