import React from 'react';
import Box from './Box';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxList: [],
      uniqueBoxNumber: 0,
      activateEvents: true
    };

    this.onAddBtnClick  = this.onAddBtnClick.bind(this);
    this.onToggleEvents = this.onToggleEvents.bind(this);
  }

  //Event handler for "Add Box" button
  //Updates the boxList state by adding the new box number which we'll add the Box component inside the container.
  onAddBtnClick(event) {
    let copyBoxList   = Object.assign([], this.state.boxList);
    let prevBoxNumber = this.state.uniqueBoxNumber;
    this.setState({
        boxList: copyBoxList.concat(prevBoxNumber + 1),
        uniqueBoxNumber: prevBoxNumber + 1
    });
  }

  //Event handler when delete button is pressed
  //removes the entry of the focused box from the boxList and removes the box from the container.
  onDelete(boxIndex, event) {
    if (event.which === 46) {    //Delete Button
      let copyBoxList = Object.assign([], this.state.boxList);
      copyBoxList.splice(boxIndex, 1);
      this.setState({
        boxList: copyBoxList
      });
    }
  }

  //Event handler for disabling/enabling the keyboard events of the Box Component.
  onToggleEvents(event) {
    let prevState = this.state;
    this.setState({
      activateEvents: !prevState.activateEvents
    })
  }

  render() {
    let toggleEventsButtonLabel = (
      this.state.activateEvents 
        ? "Disable Keyboard Controls" 
        : "Enable Keyboard Controls"
    );

    //This information is used by the Box component to set the initial position of the box
    //and also to keep the box inside the container.
    let boxContainerWidth  = 1000;
    let boxContainerHeight = 500;
    let boxContainerMargin = 10;
    let boxContainerStyle  = {
      margin: boxContainerMargin,
      height: boxContainerHeight,
      width : boxContainerWidth,
    }

    let boxSize = 50;
    let boxMargin = 5;

    return (
      <div>
          <div
            className='boxContainer'
            style={boxContainerStyle}
          >
            {
              this.state.boxList.map((box, boxIndex) => {
                return (
                  <Box 
                    key={box}
                    boxNumber={box}
                    boxContainerWidth={boxContainerWidth}
                    boxContainerHeight={boxContainerHeight}
                    boxContainerMargin={boxContainerMargin}
                    boxSize={boxSize}
                    boxMargin={boxMargin}
                    activateEvents={this.state.activateEvents}
                    onDelete={this.onDelete.bind(this, boxIndex)}
                  />
                )
              })
            }
          </div>

          <div className='actionButtons'>
            <button onClick={this.onAddBtnClick}>Add Box</button>
            <button onClick={this.onToggleEvents}>{toggleEventsButtonLabel}</button>
          </div>

      </div>
    );
  }
}

export default App;
