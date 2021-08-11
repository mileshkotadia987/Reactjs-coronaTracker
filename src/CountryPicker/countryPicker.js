import React,{useState,useEffect} from 'react';
import {NativeSelect,FormControl} from '@material-ui/core';
import styles from './countryPicker.module.css';
import {fetchCountries} from '../api';

const CountryPicker = ({handleCountryChange}) => {
    const [countries,setCountries]=useState([]);
    useEffect(() => {
        const fetchContent= async() => {
            setCountries(await fetchCountries());
        }
        fetchContent();
    },[setCountries]);
    
    return(
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange={(e)=>handleCountryChange(e.target.value)}>
                <option value='global'>Global</option>
                {countries.map((name,index)=> <option value={name} id={index}>{name}</option> )}
            </NativeSelect>
        </FormControl>
    );
}
export default CountryPicker;