import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Form extends Component {

    submitHandler = e => {
        const {onSubmit} = this.props;

        e.preventDefault();

        onSubmit(true);
    };

    render() {
        const {className, children, submitText} = this.props;

        return (
            <div className='form-container'>
                <form className={classNames(className, 'form')} onSubmit={this.submitHandler}>
                    {
                        children
                    }
                    <div className="form__actions">
                        <input className='button btn-accent' type="submit" value={submitText || 'Отправить'}/>
                    </div>
                </form>
            </div>
        );
    }
}

Form.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    submitText: PropTypes.string,
};

export default Form;
