import React from 'react';

export default class ContactInfo extends React.Component {
    render() {
        return (
            <div onClick={this.props.onClick}>{this.props.contact.name}</div>
        );
    }
}

//export를 따로 하지 않아도 됨.
