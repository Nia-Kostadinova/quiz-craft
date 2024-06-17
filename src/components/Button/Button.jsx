import PropTypes from 'prop-types';

/**
 *
 * @param {{children: any, onClick: function }} props
 * @returns
 */
export default function Button({children = null, onClick = () => {}, className = ''}) {

    return(
        <button onClick={onClick} className={className}>{children}</button>
    );
}


Button.propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func,
    className: PropTypes.string,
}
