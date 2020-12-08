import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Icon extends Component {
    render() {
        const {iconType} = this.props;

        switch (iconType) {
        default: return (<i className={classNames('icon', this.props.iconName, this.props.className)}/>);
        }
    }
}

Icon.defaultProps = {
    iconName: 'fontawesome'
};

Icon.propTypes = {
    iconType: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default Icon;
