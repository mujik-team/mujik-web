import React from "react";
import styles from "./HomePage.module.css";
import FeaturedMixtapes from "./components/FeaturedMixtapes";
import MixtapeCharts from "./components/MixtapeCharts";
import FeaturedTournaments from "./components/FeaturedTournaments";
import Feed from "./components/Feed";

function HomePage() {
  return (
    <div>
      <div  className={styles.container}>
        <div className={styles.searchBar}>
          <input placeholder="Search" type="text" />
        </div>
        <div className={styles.featuredMixtapesContainer}>
          <FeaturedMixtapes/>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.mixtapeChartsContainer}>
            <div className={styles.mixtapesTitle}>Mixtapes</div>
            <MixtapeCharts />
          </div>
          <div>
            <div className={styles.featuredTournamentsContainer}>
              <div className={styles.tournamentsTitle}>Tournaments</div>
              <FeaturedTournaments />
            </div>
          </div>
          <div>
            <div className={styles.feedContainer}>
              <div className={styles.feedTitle}>Feed</div>
            </div>
            <Feed />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
