import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
        super();

    this.state = {
      title: 'Full Stack App',
      companies: []
    }
  }
componentDidMount(){
  let that = this;
//console.log('has mounted');
fetch('http://localhost:3000/api/companies')
.then(function (response){
  response.json()
  .then(function(data){
that.setState({
  companies: data
})
  })
})
}
addCompany(event){
  var that = this;
  event.preventDefault();
let companyData = {
  company_name: this.refs.company_name.value,
  customer_address: this.refs.customer_address.value,
  ordered_item: this.refs.ordered_item.value,
  order_id: Math.random().toFixed(4)
};

let request = new Request('http://localhost:3000/api/new-company',{
  method:'POST',
  headers: new Headers({'Content-Type': 'application/json'}),
  body: JSON.stringify(companyData)
})

 let companies = that.state.companies;
  companies.push(companyData);
  that.setState({
    companies: companies
  })

fetch(request)
.then(function(response) {
  response.json()
  .then(function(data){
   console.log(data)
 
  })
})
.catch(function(err){
  console.log(err)
})
}

  render() {
    let title = this.state.title;
    let companies = this.state.companies;
    return (
      <div className="App">
      <h1>{title}</h1>
      <form ref="opsForm">
        <input type="text" ref="company_name" placeholder="Company Name"/>
        <input type="text" ref="customer_address" placeholder="Customer Address"/>
        <input type="text" ref="ordered_item" placeholder="Ordered Item"/>
        <button onClick={this.addCompany.bind(this)}>Add company</button>
      </form>
<ul>
  {companies.map(company => 
  <li key={company.order_id}>{company.company_name} {company.customer_address} {company.ordered_item}</li>)}
</ul>
      </div>
    );
  }
}

export default App;
