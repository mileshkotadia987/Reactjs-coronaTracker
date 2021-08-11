import React from 'react';
import './App.css';
import Cards from './Cards/cards';
import {fetchContent} from './api';
import Charts from './Charts/charts';
import CountryPicker from './CountryPicker/countryPicker';

class App extends React.Component{
  state={
    data:{},
    country:''
  }
  async componentDidMount(){
    const fetchData=await fetchContent();
    // console.log(fetchData);
    this.setState({data:fetchData});
  }
  handleCountryChange=async (countryname) => {
    if(countryname!=='global'){
      const fetchData=await fetchContent(countryname);
      this.setState({data:fetchData,country:countryname});
    }
    else{
      this.componentDidMount();
    }
  }
  
  render(){
    const {data,country}=this.state;
    return(
      <div className='app'>
      <Cards data={data} />
      <CountryPicker handleCountryChange={this.handleCountryChange} />
      {country==="global" ?
      <Charts data={data} />
      : <Charts data={data}  country={country} />
      }
      </div>
    );
  }
}
export default App;
