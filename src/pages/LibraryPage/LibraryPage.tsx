import React from "react";
import styles from "./libraryScreen.module.css";
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import coin from '../../Images/coin.png'
import user from '../../Images/undraw_male_avatar_323b.svg'

const tabs = ["All", "By Me", "By Others"];
const tabsYour = ["All", "Entered", "Following", "Ended"];

function LibraryPage() {
  const headerBrowser = (
    <div>
      <span className={styles.title}>My Library</span>
      <span style={{marginLeft:'50px'}}>
        {tabs.map((t) => (
          <span className={styles.tabTitle}>{t}</span>
        ))}
      </span>
      <div style={{padding:'10px'}}>
        <span><input style={{width:'250px', height:'40px'}} placeholder="Search" type="text" /></span>
        <span style={{marginLeft:'20px'}}>
          <Button className="p-button-rounded" style={{backgroundColor:'#ffff64'}}>
            <strong>New</strong>
          </Button>
        </span>
      </div>    
    </div>
  );

  const mixtapes = []

  for (let i = 0; i < 12; i++) {
      mixtapes.push(
          <div className={styles.mixtapeCard}></div>
      );
  }

  const mixtapesBrowser = (
    <div className={styles.mixtapeBrowser}>{mixtapes}</div>
  );

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
        <span className="p-badge">2</span>
      </span>
    </div>
  );

// <span style={{alignContent:'center'}}><div style={{alignSelf:'center'}} className={styles.userDetailsDisplayCard}> User Details</div></span>
// {/* <div className={styles.userDetailsDisplayCard}>Hello</div>  */}
  return (
    <div>
        {UserDetailsCard}
      <div className={styles.container}>
        <div>
          {headerBrowser}
          {mixtapesBrowser}
        </div>
        <div className={styles.usertournamentBrowser}>
        </div>
      </div>
    </div>
  );
}

export default LibraryPage;

// <div className="p-grid">
//       <div className="p-row">
//         <div className="p-col">1</div>
//         <div className="p-col">2</div>
//         <div className="p-col">3</div>
//       </div>
//     </div>

// <div>
//       <div className={styles.container}>
//         <div>
//           {headerBrowser}
//           {tournamentBrowser}
//         </div>
//         <div className={styles.usertournamentBrowser}>
//           <h2>Your Tournaments</h2>
//           {tabsYour.map((t) => (
//             <span className={styles.tabTitle}>{t}</span>
//           ))}
//           <hr />
//           <div className={styles.yourtournamentBrowser}>{yourtournaments}</div>
//         </div>
//       </div>
//     </div>