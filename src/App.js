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
      amount: 0,
      runningbalance: 3,
      description: "Please Enter Desc",
      selectValue: "debit",
      transactiondata: [],
    }
  }

  componentDidMount() {
    this.callTransactiondata();
  }

  callTransactiondata = () => {
    axios.get('http://localhost:8000/tasks')
      .then((response) => {
        // handle success
        this.setState({
          transactiondata: response.data
        })
      })
      .catch((error) => {
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
    let dataPost = {
      description: this.state.description
    }

    if(this.state.selectValue === "credit") {
      dataPost.credit = this.state.amount;
       dataPost.debit = 0;
    } else {
      dataPost.credit = 0;
      dataPost.debit = this.state.amount;
    }

    axios.post('http://localhost:8000/tasks', dataPost)
      .then((response) => {
        console.log(response);
        this.hideModal();
        this.callTransactiondata();

      })
      .catch((error) => {
        console.log(error);
        this.hideModal();
        this.callTransactiondata();
      });
  }

  handleChangeAmount = (event) => {
    this.setState({ amount: event.target.value });
  }

  handleChangeDesc = (event) => {
    this.setState({ description: event.target.value });
  }

  handleChange = (event) => {
    this.setState({ selectValue: event.target.value });
  }

  render() {
    return (
      <div className="transactions-container">
        <Modal show={this.state.show}>
          <div> New Transaction </div>
          <div className='add-bill-container'>
            
            <div>
              <label htmlFor="userfill"> Transaction Type </label>
              <select id="userfill" value={this.state.selectValue} onChange={this.handleChange}>
                <option value="credit"> Credit </option>
                <option value="debit"> Debit </option>
              </select>
            </div>

            <div>
              <label htmlFor="amount"> Amount </label>
              <input id="amount" className='add-bill-form-control form-control'
                placeholder='Enter Amount' defaultValue={this.state.amount} onChange={this.handleChangeAmount}
                type='number'></input>
            </div>

            <div>
              <label htmlFor="description"> Description </label>
              <input id="description" className='add-bill-form-control form-control'
                placeholder='Enter Description' defaultValue={this.state.description} onChange={this.handleChangeDesc}
                type='string'></input>
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
            {this.state.transactiondata.map((listValue, index) => {
              return (
                <tr key={index}>
                  <td>{listValue.Created_date}</td>
                  <td>{listValue.description}</td>
                  <td>{listValue.credit}</td>
                  <td>{listValue.debit}</td>
                  <td> {listValue.totalAmount}</td>
                  {/* <td>{listValue.debit -listValue.credit - }</td> */}
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
