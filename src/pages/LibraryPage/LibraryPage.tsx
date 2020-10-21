import React from "react";
import styles from "./libraryScreen.module.css";
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button';

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
        <span style={{marginLeft:'20px'}}><Button className="p-button-rounded"><strong>New</strong></Button></span>
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

  return (
    <div>
      <span style={{alignContent:'center'}}><div style={{alignSelf:'center'}} className={styles.userDetailsDisplayCard}> User Details</div></span>
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