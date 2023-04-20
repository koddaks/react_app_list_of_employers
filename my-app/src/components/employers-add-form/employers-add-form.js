import "./employers-add-form.css";

import { Component } from "react";

class EmployersAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      salary: "",
      error: false
    };
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, salary } = this.state;

    if (name.length > 3 && salary.length !== 0) {
      this.props.onAdd(name, salary);
      this.setState({
        name: "",
        salary: "",
        error: false,
      });
    } else {
      this.setState({        
        error: true,
      });
    }
  };

  render() {
    const { name, salary, error } = this.state;
    let inputClassNames = "form-control new-post-label";

    if (error) {
      inputClassNames += ' error';
    } else {
      inputClassNames = "form-control new-post-label";
    }

    return (
      <div className="app-add-form">
        <h3>Добавьте нового сотрудника</h3>
        <form className="add-form d-flex" onSubmit={this.onSubmit}>
          {/* {error && <span>Not valid lengh</span>} */}
          <input
            type="text"
            className={inputClassNames}
            placeholder="Как его зовут?"
            name="name"
            value={name}
            onChange={this.onValueChange}
          />
          <input
            type="number"
            className={inputClassNames}
            placeholder="З/П в $?"
            name="salary"
            value={salary}
            onChange={this.onValueChange}
          />

          <button type="submit" className="btn btn-outline-light">
            Добавить
          </button>
        </form>
      </div>
    );
  }
}

export default EmployersAddForm;
