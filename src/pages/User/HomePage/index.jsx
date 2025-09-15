import SugesstedSong from "../../../components/User/SugesstedSong";
import Banner from "./banner";
import SuggestedPlaylist from "./suggestedPlaylist";

function HomePage() {
  document.title = 'Home Page | Music Project';

  return (
    <>
      <Banner />

      <h2>Recommended for you</h2>
      <SugesstedSong />

      <h2>This is shared for you</h2>
      <SuggestedPlaylist />
    </>
  )
}

export default HomePage