import React from 'react';
import PropTypes from 'prop-types';

export default class ContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      name: '',
      phone: ''
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;  //nextState[e.target.name] 여기서 name이 가리키는 것은 input의 name

    console.log(nextState);
    this.setState(nextState);
  }

  handleToggle(){
    if (!this.state.isEdit) {
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone
      })
    } else {
      this.handleEdit();
    }
    this.setState({
      isEdit: !this.state.isEdit
    });
    console.log(this.state.isEdit); // 이렇게 실행하면 true가 나와야 하지만 this.setState가 비동기로 실행돼서 false로 나옴. 알아두면 좋음.
  }

  handleEdit(){
    this.props.onEdit(this.state.name, this.state.phone)
  }

  handleKeyPress(e) {
    if(e.charCode === 13)
      this.handleToggle();
  }

  render(){
    const details = (
      <div>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.phone}</p>
      </div>
    );

    const edit = (
      <div>
        <p>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </p>
        <p>
          <input
            type="text"
            name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </p>
      </div>
    )

    const view = this.state.isEdit ? edit : details;

    const blank = (<div>not selected</div>);

    return(
      <div>
        <h2>Details</h2>
        {this.props.isSelected ? view : blank}
        <p>
          <button onClick={this.handleToggle}>
            {this.state.isEdit ? "OK" : "Edit"}
          </button>
          <button onClick={this.props.onRemove}>Remove</button>
        </p>
      </div>
    );
  }
}

//선택하지 않았을때 오류 안나게 하기 위해 디폴트 값을 설정함.
ContactDetails.defaultProps = {
  contact: {
    name: '',
    phone: ''
  },
  onRemove: () => { console.error('onRemove not defined');},
  onEdit: () => { console.error('onEdit not defined');}
  //상위 컴포넌트에서 props로 받은 것들에 대한 디폴트 값을 설정해줌.
}

ContactDetails.defaultProps = {
  contact: PropTypes.object,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func
}
