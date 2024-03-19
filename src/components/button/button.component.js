import React from 'react';
import './button.styles.scss';
/*
* What buttons do we need??:

1.  default
2.  inverted
3.  google sign in button

Let's create a variable
*/

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}
const Button = ({children, buttonType, ...otherProps}) => {
    return(
        <button
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            { children }
        </button>
    );
};

export default Button;