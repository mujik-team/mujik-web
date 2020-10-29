import React from "react";
import styles from "./HomePage.module.css";
import FeaturedMixtapes from "./components/FeaturedMixtapes";
import MixtapeCharts from "./components/MixtapeCharts";
import TournamentCharts from "./components/TournamentCharts";

function HomePage() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.featuredMixtapesContainer}>
          <FeaturedMixtapes />
          {/* <hr style={{ margin: "0 30px", marginBottom: "20px" }} /> */}
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.mixtapeChartsContainer}>
            <div className={styles.mixtapesTitle}>Mixtapes</div>

            <MixtapeCharts />
          </div>
          <div>
            <div className={styles.featuredTournamentsContainer}>
              <div className={styles.tournamentsTitle}>Tournaments</div>
              <TournamentCharts />
            </div>
          </div>
          <div>
            <div className={styles.feedContainer}>
              <div className={styles.feedTitle}>Feed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
