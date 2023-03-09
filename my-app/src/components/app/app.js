import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "John C.", salary: 800, increase: false, rise: true, id: 1 },
        { name: "Alex M.", salary: 3000, increase: false, rise: false, id: 2 },
        { name: "Carl W.", salary: 25000, increase: true, rise: false, id: 3 },
      ],
    };
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const newData = data.filter((item) => item.id !== id);

      return {
        data: newData,
      };
    });
  };

  onToggleIncrease = (id) => {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id)

      const oldItem = data[index];
      const newItem = {...oldItem, increase: !oldItem.increase};
      const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

      return {
        data: newData
      }
    })
  };

  onToggleRise = (id) => {
    console.log(`Rise is ${id}`);
  };

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      const newData = [...data, newItem];

      return {
        data: newData,
      };
    });
  };

  render() {
    const { data } = this.state;

    return (
      <div className="app">
        <AppInfo />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployersList 
            data={data} 
            onDelete={this.deleteItem}
            onToggleIncrease={this.onToggleIncrease} 
            onToggleRise={this.onToggleRise}/>
        <EmployersAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
