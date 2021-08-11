import axios from 'axios';

const url= 'https://covid19.mathdro.id/api';

export const fetchContent = async (country) => {
    let changeUrl=url;
    if(country){
        changeUrl=`${url}/countries/${country}`;
    }
    try {
        const {data}=await axios.get(changeUrl);
        const modifiedData={
            confirmed:data.confirmed,
            deaths:data.deaths,
            recovered:data.recovered,
            lastUpdate:data.lastUpdate
        }
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async() => {
    try {
        const {data}=await axios.get(`${url}/daily`);
        // console.log(data);
        const modifiedDailyData=data.map((daily)=>({
            confirmed:daily.confirmed.total,
            deaths:daily.deaths.total,
            date:daily.reportDate
        }));
        return modifiedDailyData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async() => {
    try {
        const {data:{countries}}=await axios.get(`${url}/countries`);
        return(countries.map((country) => country.name));
    } catch (error) {
        console.log(error);
    }
}