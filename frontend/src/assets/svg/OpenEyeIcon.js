import * as React from 'react';
import PropTypes from 'prop-types';

const OpenEyeIcon = ({className, width, height}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={className || ''}>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.1077 8.53537C10.1077 9.69937 9.16367 10.6427 7.99967 10.6427C6.83567 10.6427 5.89233 9.69937 5.89233 8.53537C5.89233 7.3707 6.83567 6.42737 7.99967 6.42737C9.16367 6.42737 10.1077 7.3707 10.1077 8.53537Z" stroke="#8993A4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.99859 13.4032C10.5373 13.4032 12.8593 11.5779 14.1666 8.53524C12.8593 5.49257 10.5373 3.66724 7.99859 3.66724H8.00125C5.46259 3.66724 3.14059 5.49257 1.83325 8.53524C3.14059 11.5779 5.46259 13.4032 8.00125 13.4032H7.99859Z" stroke="#8993A4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

OpenEyeIcon.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string
};

export default OpenEyeIcon;
