import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Section extends Component {
    render() {
        const {className, children, container} = this.props;

        return (
            <section className={classNames('section', className)}>
                <div className={container}>
                    {
                        children
                    }
                </div>
            </section>
        );
    }
}

Section.defaultProps = {
    container: 'container'
};

Section.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    container: PropTypes.oneOf(['container', 'container-fluid']),
};

export default Section;
