import React, { useState } from "react";
import "./Matrix.css";

const Matrix = () => {
  // Initial state: 3x3 matrix filled with 'white'
  const initialMatrix = Array.from({ length: 3 }, () => Array(3).fill("white"));
  const [matrix, setMatrix] = useState(initialMatrix); // State to store the current colors of the matrix
  const [clickOrder, setClickOrder] = useState([]); // State to track the order of clicks
  const [changingColors, setChangingColors] = useState(false); // Flag to prevent clicks during color change

  // Handler for box clicks
  const handleClick = (row, col) => {
    if (changingColors) return; // Prevent any new clicks while changing colors

    // If the box is white and there are less than 8 clicks, change color to green
    if (matrix[row][col] === "white" && clickOrder.length < 8) {
      const newMatrix = matrix.map((r, rowIndex) =>
        r.map((color, colIndex) =>
          rowIndex === row && colIndex === col ? "green" : color
        )
      );
      setMatrix(newMatrix); // Update the matrix with the new color
      setClickOrder([...clickOrder, { row, col }]); // Record the click position
    } else if (row === 2 && col === 2 && clickOrder.length === 8) {
      // When the last box (2, 2) is clicked and all 8 boxes are clicked, update it to green
      const newMatrix = matrix.map((r, rowIndex) =>
        r.map((color, colIndex) =>
          rowIndex === row && colIndex === col ? "green" : color
        )
      );
      setMatrix(newMatrix); // Update the matrix with the last box in green
      const newClickOrder = [...clickOrder, { row, col }];
      setClickOrder(newClickOrder); // Record the last click position

      // Prevent further clicks and start changing colors to orange
      setChangingColors(true); // Set flag to prevent further clicks

      // Start the sequence of changing colors to orange after 500ms
      setTimeout(() => {
        newClickOrder.forEach((pos, index) => {
          setTimeout(() => {
            setMatrix((prevMatrix) => {
              // Update the color of each box to orange in sequence
              const updatedMatrix = prevMatrix.map((r, rowIndex) =>
                r.map((color, colIndex) =>
                  rowIndex === pos.row && colIndex === pos.col
                    ? "orange"
                    : color
                )
              );
              return updatedMatrix;
            });
          }, index * 500); // Delay each update by 500ms multiplied by the index
        });

        // Reset the changingColors flag after the last color change
        setTimeout(() => {
          setChangingColors(false);
        }, (newClickOrder.length + 1) * 500); // +1 to account for the final delay
      }, 500); // Initial delay before starting the sequence
    }
  };

  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((color, colIndex) => (
            <div
              className="box"
              key={colIndex}
              style={{ backgroundColor: color }} // Set the background color based on the matrix state
              onClick={() => handleClick(rowIndex, colIndex)} // Handle click events
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Matrix;
