import React from 'react';

class Box extends React.Component {
  constructor(props) {
    super(props);

    //This is the actual size of the box including the margins.
    let totalBoxSize = this.props.boxSize + (this.props.boxMargin * 2);

    this.state = {
      top: this.props.boxContainerMargin,
      left: this.props.boxContainerMargin,
      backgroundColor: "white",
      minLeft  : this.props.boxContainerMargin,
      minTop   : this.props.boxContainerMargin,
      maxRight : this.props.boxContainerWidth - totalBoxSize + this.props.boxContainerMargin,
      maxBotton: this.props.boxContainerHeight - totalBoxSize + this.props.boxContainerMargin,
    }

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus   = this.onFocus.bind(this);
    this.onBlur    = this.onBlur.bind(this);
  }

  //updates the background color of the box when focused/selected
  onFocus(event) {
    this.setState({
      backgroundColor: "lightgray"
    });
  }

  //updates the background color of the box when deselected
  onBlur(event) {
    this.setState({
      backgroundColor: "white"
    });
  }

  //Event handler when any key is pressed.
  //moves the box position based on the pressed key.
  onKeyDown(event) {
    let top  = this.state.top;
    let left = this.state.left;

    switch (event.which){
      case 37:    //left arrow key
      case 65:    //a key
        left -= 1
        break;
      case 38:    //up arrow key
      case 87:    //w key
        top -= 1
        break;
      case 39:    //right arrow key
      case 68:    //d key
        left += 1
        break;
      case 40:    //bottom arrow key
      case 83:    //s key
        top += 1
        break;
    }

    //Conditions to keep the box inside the box container
    if (
           top  >= this.state.minTop 
        && top  <= this.state.maxBotton 
        && left >= this.state.minLeft
        && left <= this.state.maxRight) {
      this.setState({
        top: top,
        left: left
      });
    }
  }

  render() {
    return (
      <div
        className='box'
        style = {
          {
            top: this.state.top,
            left: this.state.left,
            backgroundColor: this.state.backgroundColor,
            zIndex: this.props.boxNumber,
            height: this.props.boxSize,
            width: this.props.boxSize
          }
        }
        onKeyDown = {this.props.activateEvents ? this.onKeyDown : null}
        onKeyUp   = {this.props.activateEvents ? this.props.onDelete : null}
        onFocus   = {this.onFocus}
        onBlur    = {this.onBlur}
        tabIndex  = {0}
      >
        <p> {this.props.boxNumber} </p>
      </div>
    );
  }  
}

export default Box;
