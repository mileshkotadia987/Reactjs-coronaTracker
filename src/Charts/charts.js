import React,{useState,useEffect} from 'react';
import styles from './charts.module.css';
import {fetchDailyData} from '../api';
import {Line,Bar} from 'react-chartjs-2';

const Charts = ({data,country}) => {
    const [dailyData,setDailyData]=useState([]);
    useEffect(()=>{
        const fetchData =async() => {
            setDailyData(await fetchDailyData());
        }
        // console.log(dailyData);
        fetchData();
    },[]);

    const lineChart=(
        dailyData.length ?
        <Line 
            data={{
                labels:dailyData.map(({date})=> date),
                datasets:[{
                    data:dailyData.map(({confirmed})=>confirmed),
                    label:'infected',
                    borderColor:'#3333ff',
                    fill:true
                },{
                    data:dailyData.map(({deaths})=>deaths),
                    label:'Deaths',
                    borderColor:'red',
                    fill:true
                }]
            }}
        /> : null
    );
    // console.log(data);
    const barChart=(
        data.confirmed
        ?
            <Bar 
                data={{
                    labels:['Infected','Recovered','Deaths'],
                    datasets:[{
                        label:'People',
                        backgroundColor:['blue','green','red'],
                        data:[data.confirmed.value,data.recovered.value,data.deaths.value]
                    }]
                }}
                options={{
                    legend:{display:false},
                    title:{display:true,text:`current state in ${country}`}
                }}
            />
        :null
    );
    return(
        <div className={styles.container}>
            {country!=="" ? barChart : lineChart}
        </div>
    );
}

export default Charts;