import Button from './Button.jsx';
import PropTypes from 'prop-types';


/**
 *
 * @param {{changePage: function }} props
 * @returns
 */
export default function Header ({changePage}) {
    return (
        <header>
            <Button>Home</Button>
            <Button>All tweets</Button>
            <Button>Create tweet</Button>
        </header>
    )
}


Header.propTypes = {
    changePage: PropTypes.func,
}
