import React, { Component } from "react";
import "./Style.css";

class Btns extends Component {
  state = {
    zero: true,
    firstInput: false,
    secInput: false,
    operator: "",
    gotOperator: false,
    first: "",
    sec: "",
    showing: "0",
    done: false,
    spare: "",
  };

  clear = () => {
    this.setState((prev) => {
      return {
        firstInput: false,
        secInput: false,
        operator: "",
        gotOperator: false,
        first: "",
        sec: "",
        showing: "0",
        done: false,
        spare: "",
        zero: true,
      };
    });
  };

  opposite = () => {
    const {
      firstInput,
      secInput,
      gotOperator,
      first,
      sec,
      done,
      showing,
    } = this.state;

    if (
      firstInput === false &&
      secInput === false &&
      gotOperator === false &&
      done === false
    ) {
      //   console.log("hello");
      if (!first.includes("-")) {
        this.setState((prev) => {
          return {
            first: prev.first ? "-" + prev.first : "",
            showing: prev.first ? "-" + prev.first : "0",
          };
        });
      } else {
        this.setState((prev) => {
          return {
            first: prev.first.substring(1),
            showing: prev.first.substring(1),
          };
        });
      }
    } else if (
      firstInput === true &&
      secInput === false &&
      gotOperator === false &&
      done === false
    ) {
      //   console.log("hello");
      if (!sec.includes("-")) {
        this.setState((prev) => {
          return {
            sec: prev.sec ? "-" + prev.sec : "",
            showing: prev.first + prev.operator + "-" + prev.sec,
          };
        });
      } else {
        this.setState((prev) => {
          return {
            sec: prev.sec.substring(1),
            showing: prev.first + prev.operator + prev.sec.substring(1),
          };
        });
      }
    } else if (
      firstInput === false &&
      secInput === false &&
      gotOperator === false &&
      done === true
    ) {
      //   console.log("hello");
      if (!showing.includes("-")) {
        this.setState((prev) => {
          return {
            first: prev.showing ? "-" + prev.showing : "",
            showing: prev.showing ? "-" + prev.showing : "0",
          };
        });
      } else {
        this.setState((prev) => {
          return {
            first: prev.showing.substring(1),
            showing: prev.showing.substring(1),
          };
        });
      }
    }
  };

  percentage = () => {
    const { firstInput, secInput, gotOperator, done, zero } = this.state;

    if (
      firstInput === false &&
      secInput === false &&
      gotOperator === false &&
      done === false &&
      zero === false
    ) {
      //   console.log("hello");

      this.setState((prev) => {
        return {
          first: prev.first / 100,
          showing: prev.first / 100,
        };
      });
    } else if (
      firstInput === true &&
      secInput === false &&
      gotOperator === false &&
      done === false
    ) {
      //   console.log("hello");
      this.setState((prev) => {
        return {
          sec: prev.sec / 100,
          showing: prev.first + prev.operator + prev.sec / 100,
        };
      });
    } else if (
      firstInput === false &&
      secInput === false &&
      gotOperator === false &&
      done === true
    ) {
      //   console.log("done");
      this.setState((prev) => {
        return {
          first: prev.showing / 100,
          showing: prev.showing / 100,
        };
      });
    }
  };

  numbers = (e) => {
    const { name } = e.target;
    // console.log(name);
    const { firstInput, secInput } = this.state;

    if (firstInput === false) {
      this.setState((prev) => {
        return {
          first: prev.first + name,
          showing: prev.first + name,
          done: false,
          gotOperator: false,
          zero: false,
        };
      });
    } else if (secInput === false) {
      this.setState((prev) => {
        return {
          sec: prev.sec + name,
          showing: prev.first + prev.operator + prev.sec + name,
          done: false,
          gotOperator: false,
        };
      });
    }
  };

  operations = (e) => {
    const { name } = e.target;
    const { firstInput, secInput, done, gotOperator } = this.state;
    if (firstInput === false && done === false && gotOperator === false) {
      this.setState((prev) => {
        return {
          operator: name,
          first: prev.first ? prev.first : "0",
          showing: prev.first ? prev.first + name : "0" + name,
          firstInput: true,
          gotOperator: true,
        };
      });
    } else if (firstInput === false && done === true && gotOperator === false) {
      this.setState((prev) => {
        return {
          operator: name,
          first: prev.showing,
          showing: prev.showing + name,
          firstInput: true,
          gotOperator: true,
          done: false,
        };
      });
    } else if (secInput === false && done === false && gotOperator === false) {
      this.calc();
      //   console.log("done");
      this.setState((prev) => {
        return {
          operator: name,
          first: prev.showing,
          showing: prev.showing + name,
          firstInput: true,
          gotOperator: true,
          done: false,
        };
      });
    } else if (firstInput === true && done === false && gotOperator === true) {
      //   console.log("yoo i m here");
      this.setState((prev) => {
        return {
          operator: name,
          showing: prev.first + name || "0" + name,
          firstInput: true,
          gotOperator: true,
        };
      });
    }
  };

  calc = () => {
    const { first, sec, operator, spare } = this.state;
    const op1 = parseFloat(first);
    const op2 = parseFloat(sec);
    const alt = parseFloat(spare);

    let answer = 0;
    if (operator === "+") {
      answer = op1 + op2;
    } else if (operator === "-") {
      answer = op1 - op2;
    } else if (operator === "×") {
      answer = op1 * op2;
    } else if (operator === "÷") {
      answer = op1 / op2;
    } else {
      answer = op1;
    }

    if (!op2) {
      answer = op1 || alt;
      answer = answer || 0;
    }

    this.setState((prev) => {
      return {
        showing: "" + answer,
        secInput: false,
        firstInput: false,
        operator: "",
        sec: "",
        first: "",
        done: true,
        gotOperator: false,
        spare: answer,
      };
    });
  };

  render() {
    const { showing } = this.state;
    return (
      <div className="main">
        <h1 className="showing">{showing}</h1>
        <div className="row">
          <button name="ac" onClick={this.clear} className="btnFirstRow">
            AC
          </button>
          <button name="+/-" onClick={this.opposite} className="btnFirstRow">
            +/-
          </button>
          <button name="%" onClick={this.percentage} className="btnFirstRow">
            %
          </button>
          <button name="÷" onClick={this.operations} className="btnFirstRow">
            ÷
          </button>
        </div>

        <div className="row">
          <button name="7" onClick={this.numbers} className="btn">
            7
          </button>
          <button name="8" onClick={this.numbers} className="btn">
            8
          </button>
          <button name="9" onClick={this.numbers} className="btn">
            9
          </button>
          <button name="×" onClick={this.operations} className="btn">
            ×
          </button>
        </div>

        <div className="row">
          <button name="4" onClick={this.numbers} className="btn">
            4
          </button>
          <button name="5" onClick={this.numbers} className="btn">
            5
          </button>
          <button name="6" onClick={this.numbers} className="btn">
            6
          </button>
          <button name="-" onClick={this.operations} className="btn">
            -
          </button>
        </div>

        <div className="row">
          <button name="1" onClick={this.numbers} className="btn">
            1
          </button>
          <button name="2" onClick={this.numbers} className="btn">
            2
          </button>
          <button name="3" onClick={this.numbers} className="btn">
            3
          </button>
          <button name="+" onClick={this.operations} className="btn">
            +
          </button>
        </div>

        <div className="row">
          <button name="0" onClick={this.numbers} className="btn zero">
            0
          </button>
          <button name="." onClick={this.numbers} className="btn">
            .
          </button>
          <button name="=" onClick={this.calc} className="btn">
            =
          </button>
        </div>
      </div>
    );
  }
}

export default Btns;
