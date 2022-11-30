import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Switch from "@mui/material/Switch";
import { useEffect, useState } from 'react';
import ComponentOne from './components/ComponentOne';
import ComponentTwo from './components/ComponentTwo';

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Home() {
  const [mobile, setMobile] = useState(false);
  // const [apiData, setApiData] = useState([]);
  const handleToggle = () => {
    setMobile(!mobile);
  }
  useEffect(() => { 
    // callAPI(); console.log("Hello jeee_0")
   }, []);
  // const callAPI = async () => {
  //   console.error("Hello jeee");
  //   try {
  //     const URl = "https://catalogue-ms.cloud.altbalaji.com/v1/v1/section/list/S1_Lock_Upp-Preview_Carousal?domain=IN&limit=10"
  //     const res = await fetch(URl);
  //     const data = await res.json();
  //     setTimeout(() => {
  //       setApiData(data.content);        
  //     }, 100);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <div>
      <Head>
        <title>Sample Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
      <main className={styles.main}>      
        <Switch {...label} onClick={handleToggle}/>
        {
          mobile ? <ComponentOne /> : <ComponentTwo />
        }
      </main>
    </div>
  )
}
