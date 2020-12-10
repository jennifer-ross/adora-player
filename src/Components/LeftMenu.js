import React, {Component} from 'react';
import Section from "./Section";
import Profile from "./Profile";
import Menu from "./Menu";

class LeftMenu extends Component {
    render() {
        return (
            <Section className='left-menu'>
                <div className="adora-title">
                    Adora Player
                </div>
                <Profile/>
                <Menu/>
            </Section>
        );
    }
}

export default LeftMenu;