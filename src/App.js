import React, { Component } from 'react';

import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      grid: {
        width: 40,
        height: 40,
      },
      selectedGrids: {
        
      }
    };
  }

  componentDidMount = () => {
    const { grid } = this.state;
    const {
       width: gridWidth, 
       height: gridHeight
    } = grid;
    const windowWidth = window.innerWidth;
    const windowHeigth = window.innerHeight;
    const rowsArray = new Array(Math.floor(windowWidth / gridWidth)).fill(grid);
    const coloumnsArray = new Array(Math.floor(windowHeigth / gridHeight)).fill(grid);
    this.setState({
      rowsArray,
      coloumnsArray,
      loading: false
    });
  };

  onClickGrid = (rowIndexString, coloumnIndexString) => {
    let { selectedGrids } = this.state;
    if (selectedGrids.hasOwnProperty(rowIndexString)) {
       selectedGrids = {
         ...selectedGrids,
         [rowIndexString]: [...selectedGrids[rowIndexString], coloumnIndexString],
       };
    } else {
      selectedGrids = {
        ...selectedGrids,
        [rowIndexString]: [coloumnIndexString],
      }
    }
    this.setState({
      selectedGrids
    });
  };

  getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  getRandomClass = () => {
    const randomNumber = Math.floor(Math.random() * (4 - 1) + 1);
    switch(randomNumber.toString()) {
      case "1":
        return "first";
      case "1":
        return "first";
      default: 
        return "third"
    } 
  };

  render() {
    const { loading, rowsArray, coloumnsArray, selectedGrids } = this.state;
    if (loading) {
      return (
        <div>loading...</div>
      )
    }
    return (
      <div style={{'display': 'flex'}}>
        {
          rowsArray.map((coloumn, rowIndex) => {
            const rowIndexString = rowIndex.toString();
            let hasSelectedIndexes = false;
            let selectedIndexes = []
            if (selectedGrids.hasOwnProperty(rowIndexString)) {
              hasSelectedIndexes = true;
              selectedIndexes = selectedGrids[rowIndexString];
            }
            return (
              <div key={rowIndexString} >
                {
                  coloumnsArray.map((grid, coloumnIndex) => {
                    const { width, height } = grid; 
                    const coloumnIndexString = coloumnIndex.toString();
                    const isSelected = hasSelectedIndexes && selectedIndexes.includes(coloumnIndexString);
                    return (
                      <div 
                        onClick={() => this.onClickGrid(rowIndexString, coloumnIndexString)}
                        key={coloumnIndexString} 
                        className={isSelected && this.getRandomClass()}
                        style={{ 
                          width, 
                          height, 
                          'border': '1px solid',
                          'borderColor': isSelected ? this.getRandomColor() : '#000',
                          'backgroundColor': isSelected ? this.getRandomColor() : '#FFF',
                          'transform': 'scale(1.5, 1.5)',
                          'transition': '3s all',
                        }} 
                      />
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default App;