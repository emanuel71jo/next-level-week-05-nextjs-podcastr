import { Header } from "../components/Header";
import "../styles/global.scss";
import styles from "../styles/app.module.scss";
import { PlayerProvider } from "../providers/PlayerProvider";
import { Player } from "../components/Player";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerProvider>
  );
}

export default MyApp;
