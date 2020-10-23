import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import { mixtapes } from "./data";
import styles from "./MixtapeDetailsScreen.module.css";
import { ProgressBar } from 'primereact/progressbar';
import coin from '../../Images/coin.png'
import user from '../../Images/undraw_male_avatar_323b.svg'
import weeknd from '../../Images/weeknd.png'
import { ToggleButton } from 'primereact/togglebutton';
import Button from '../../components/Button';
import { Fieldset } from 'primereact/fieldset';

import {Button as PrimeButton} from 'primereact/button'


function MixtapeDetailsScreen(){

    const { mixtapeId } = useParams() as any;
    const mixtape = mixtapes[mixtapeId as number];
    // console.log(mixtapeId)

    const UserDetailsCard = (
        <div style={{display: 'flex', justifyContent: 'flex-end', margin:'20px'}}>
          <div className={styles.userDetailsDisplayCard}>
              <span className={styles.userDetailsText}>LEVEL 3</span>
              <span className={styles.progressBar}>
                <ProgressBar style={{backgroundColor:'#282c34', height:'7px'}} 
                    showValue={false} 
                    value={50} 
                    color="#ffff64"/>
              </span>
              <span style={{marginLeft:'10px'}}><img src={coin} width='20px'></img></span>
              <span className={styles.coinsText}>
                30000
              </span>
          </div>
          <span className="p-overlay-badge" style={{marginTop:'0px'}}>
            <img src={user} width='45px'></img>
            <span className="p-badge">3</span>
          </span>
        </div>
      );


    const customBadge = (tag: String) => {
        return (
            <span className="p-tag p-tag-rounded" 
              style={{paddingLeft: '20px',paddingRight: '20px',backgroundColor:'#21242a',color:"white"}}>
                {tag}
              </span>
        )
    }

    const details = [mixtape.createdBy,mixtape.num_songs + " songs", mixtape.duration + " minutes",  mixtape.followers + " Followers"]

    const [playState, setPlayState] = useState(true)
    const [followState, setFollowState] = useState(true)

    // const [ButtonStyle , setButtonStyle] = useState({backgroundColor: 'yellow', color:'black'})
    const title = (<span className={styles.title}>{mixtape.title}</span>)

    const badges = (
        <div style={{marginTop:'0px', display:'flex', justifyContent:'flex-start'}}>
        <img src={user} style={{width:'40px', height:'40px'}}></img>
            {   
                details.map((detail)=> {
                    return <span style={{marginRight:'5px', marginTop:'5px'}}>
                        {customBadge(detail + "")}
                    </span>
                })
            }
        </div>
    )

    const description = (
        <div className="p-d-inline" style={{color:'#777777', marginTop:'5px'}}>{mixtape.description}</div>
    )

    const buttons = (
        <div style={{display:'flex'}}>
            <Button className={styles.ButtonStyling} onClick={() => setPlayState(!playState)}
                style={{width:'100px', height: '40px', borderRadius:'5px', fontSize:'15px', alignSelf:'flex-end', marginRight: '20px'}}>
                {playState ? 'Play': 'Pause'}
            </Button>
            {
                mixtape.private ? null : <Button className={styles.ButtonStyling} 
                    onClick={() => setFollowState(!followState)}
                    style={{width:'100px', height: '40px', borderRadius:'5px', fontSize:'15px', alignSelf:'flex-end', marginRight: '20px'}}>
                    {followState ? 'Follow': 'Following'}
                    </Button>
            }
            <PrimeButton icon="pi pi-bookmark" className="p-button-rounded" 
                style={{alignSelf:'flex-end', backgroundColor:'#21242a'
                , borderColor:'#21242a', color:'white'}}>+</PrimeButton>
            <PrimeButton icon="fas fa-ellipsis-h" className="p-button-rounded" 
                style={{alignSelf:'flex-end', marginLeft:'20px', backgroundColor:'#21242a'
                , borderColor:'#21242a', color:'white', textAlign:'center'}}>...</PrimeButton>
        </div>
    )

    const mixapeDetails = (
        <div style={{display:'grid', marginLeft:'0px'}}>
            {title}
            {badges}
            {description}
            {buttons}
        </div>
    )

    return (
        <div>
            {UserDetailsCard}
            <div className={styles.container}>
                <img src={weeknd} className={styles.mixtapeImage}></img>
                {mixapeDetails}
            </div>
        </div>
    )
}

export default MixtapeDetailsScreen;

