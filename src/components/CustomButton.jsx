import "../css/customButton.css";
import PropTypes from "prop-types";

const CustomButton = ({ text, onClick }) => {
  return (
    <div className="button-container">
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 9 0"
          ></feColorMatrix>
        </filter>
        <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq2">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 3 0"
          ></feColorMatrix>
        </filter>
        <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq3">
          <feColorMatrix
            values="1 0 0 0.2 0 
                    0 1 0 0.2 0 
                    0 0 1 0.2 0 
                    0 0 0 2 0"
          ></feColorMatrix>
        </filter>
      </svg>
      <button className="real-button" onClick={onClick}></button>
      <div className="backdrop"></div>
      <div className="button-border">
        <div className="spin spin-blur"></div>
        <div className="spin spin-intense"></div>
        <div className="spin spin-inside"></div>
        <div className="button">{text}</div>
      </div>
    </div>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CustomButton;
