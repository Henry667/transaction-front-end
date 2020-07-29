import React from 'react';
import Modal from './Modal.js';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <Transactions></Transactions>
  );
}

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      debit: 1,
      credit: 2,
      runningbalance: 3,
      description: "enter to know",
      selectValue: "debit",
      transactiondata: [],
    }
  }

  componentDidMount() {
    this.callTransactiondata();
  }

  callTransactiondata = () => {
    axios.get('http://localhost:3000/tasks')
    .then( (response) => {
      // handle success
      this.setState({
        transactiondata: response.data
      })
    })
    .catch( (error) => {
      // handle error
      console.log(error);
    });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleSubmit = () => {
    axios.post('http://localhost:3000/tasks', {
      credit: this.state.credit,
      debit: this.state.debit,
      runningbalance: this.state.runningbalance,
      description: this.state.description,
    })
    .then( (response) => {
      console.log(response);
      this.hideModal();
      this.callTransactiondata();

    })
    .catch((error)  => {
      console.log(error);
      this.hideModal();
      this.callTransactiondata();
    });
    
  }

  handleChangeDebit = (event) => {
    this.setState({debit: event.target.value});
  }

  handleChangeCredit = (event) => {
    this.setState({credit: event.target.value});
  }

  handleChangeDesc = (event) => {
    this.setState({description: event.target.value});
  }

  render() {
    return (
      <div className="transactions-container">
        <Modal show={this.state.show}>
          <div> New Transaction </div>
          <div className='add-bill-container'>
            <div>
              <label htmlFor="userfill"> Transaction Type </label>

              <select id="userfill">
                <option value="credit"> Credit </option>
                <option defaultValue={this.state.selectValue}> Debit </option>
              </select>
            </div>

            <div>
              <label htmlFor="debit"> Debit </label>
              <input className='add-bill-form-control form-control'
                placeholder='Enter Amount' defaultValue={this.state.debit} onChange={this.handleChangeDebit}
                type='number'></input>
            </div>

            <div>
              <label htmlFor="credit"> Credit </label>
              <input className='add-bill-form-control form-control'
                placeholder='Enter Amount' defaultValue={this.state.credit} onChange={this.handleChangeCredit}
                type='number'></input>
            </div>

            <div>
              <label htmlFor="description"> Description </label>
              <input className='add-bill-form-control form-control'
                placeholder='Enter Description' defaultValue={this.state.description} onChange={this.handleChangeDesc}
                type='string'></input>
            </div>

            <div>
              <label htmlFor="credit"> Running Balance </label>
              <input className='add-bill-form-control form-control'
                placeholder='Enter Running Balance' defaultValue={this.state.runningbalance} onChange={this.handleChangeCredit}
                type='number'></input>
            </div>
            <button onClick={this.handleSubmit}>
              Send Data
            </button>
            <button onClick={this.hideModal}>close</button>
          </div>

        </Modal>

        <table>
          <tbody>
            <tr>
              <th> Office Transactions </th>
              <th> </th>
              <th> </th>
              <th> </th>
              <th onClick={this.showModal}> + Add Transaction</th>
            </tr>
            <tr>
              <th>  </th>
              <th>  </th>
              <th>  </th>
              <th>  </th>
              <th>  </th>
            </tr>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Credit</th>
              <th>Debit</th>
              <th>Running Balance</th>
            </tr>

            <tr>
              <th> - </th>
              <th> - </th>
              <th> - </th>
              <th> - </th>
              <th> - </th>
            </tr>
            <tr>
              <th> - </th>
              <th> - </th>
              <th> - </th>
              <th> - </th>
              <th> - </th>
            </tr>
            <tr>
              <th> - </th>
              <th> - </th>
              <th> - </th>
              <th> - </th>
              <th> - </th>
            </tr>
            {this.state.transactiondata.map(( listValue, index ) => {
            return (
              <tr key={index}>
                <td>{listValue.Created_date}</td>
                <td>{listValue.credit}</td>
                <td>{listValue.debit}</td>
                <td>{listValue.description}</td>
                <td>{listValue.runningbalance}</td>
              </tr>
            );
          })}
            
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
