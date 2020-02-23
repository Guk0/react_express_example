import React from 'react';
import PropTypes from 'prop-types';

export default class ContactCreate extends React.Component {

  constructor(props) {
    super(props); // parent의 컴포넌트를 super로 받아오지 않으면 오류가 뜸.
    this.state = {
      name: '',
      phone: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;  //nextState[e.target.name] 여기서 name이 가리키는 것은 input의 name

    console.log(nextState);
    this.setState(nextState);
  }

  handleClick(e) {
    const contact = {
      name: this.state.name,
      phone: this.state.phone
    }
    this.props.onCreate(contact);

    this.setState({
      name: '',
      phone: ''
    })

    this.nameInput.focus(); //ref를 이용하여 tag에 직접 접근하는 방법. selector을 사용하지않고.
    // 컴포넌트에도 ref를 사용할 수 있다. 하지만 render메써드 내부나 contructor내부에는 ref를 사용할 수 없음.
  }

  handleKeyPress(e) { //enter만 눌러도 create 되게.
    if(e.charCode === 13) { //charCode 13은 enter
      this.handleClick();
    }
  }


  render(){
    return(
      <div>
        <h2>Create Contact</h2>
        <p>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
            ref={(ref) => {this.nameInput = ref }}
          />
          <input
            type="text"
            name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </p>
        <button onClick={this.handleClick}>Create</button>
      </div>
    )
  }
}



ContactCreate.propTypes = {
  onCreate: PropTypes.func
};

ContactCreate.defaultProps = {
  onCreate: () => {console.error("onCreate not defined")}
};
