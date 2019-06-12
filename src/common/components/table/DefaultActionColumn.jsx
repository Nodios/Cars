import React from 'react';

class DefaultActionColumn extends React.Component {
    render() {
        return(
            <React.Fragment>
                <button type="button" title="Edit">✎</button>
                <button type="button" title="Delete">✖</button>
            </React.Fragment>
        )
    }
}

export default DefaultActionColumn;