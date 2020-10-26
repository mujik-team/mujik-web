import React from 'react'
import styles from "../MixtapeDetailsScreen.module.css"

function songCard(props: any){
    return (
        <div className="p-grid" id={styles.songCard} style={{marginLeft:'20px', marginRight:'20px'}}>
            <div className="p-col-fixed" style={{ width: '50px'}}></div>
            <div className="p-col">{props.title}</div>
            <div className="p-col">{props.artist}</div>
            <div className="p-col">{props.album}</div>
            <div className="p-col">{props.duration}</div>
        </div>
    )
}

export default songCard
