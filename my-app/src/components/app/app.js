import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'John C.', salary: 800, increase: false, rise: true, id: 1 },
        { name: 'Alex M.', salary: 3000, increase: false, rise: false, id: 2 },
        { name: 'Carl W.', salary: 25000, increase: true, rise: false, id: 3 },
      ],
      term: '',
      filter: ''
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

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
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

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  filterEmp = (items , filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
        default:
          return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }

  changeSalary = (newSalary, name) => {
    this.setState(({data}) => ({
      data: data.map(person => {
        if (person.name === name) {
          return {...person, salary: newSalary}
        }
        return person
      })
    }))
  }

  render() {
    const { data, term, filter } = this.state;
    const emlpoyers = data.length;
    const increased = data.filter((item) => item.increase).length;
    const visibleData = this.filterEmp(this.searchEmp(data, term), filter)

    return (
      <div className="app">
        <AppInfo emlpoyers={emlpoyers} increased={increased} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployersList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          changeSalary={this.changeSalary}
        />
        <EmployersAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
