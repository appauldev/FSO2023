import PropTypes from 'prop-types'

Person.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
}

function Person({name, number}) {
    return <>
        <div className='flex-row'>
            <p><b>{name}</b> {number}</p>
        </div>
    </>
}

export default Person