import SugesstedSong from "../../../components/User/SugesstedSong";
import Banner from "./banner";
import SuggesstedArtist from "./suggesstedArtist";
import SuggestedAlbum from "./suggestedAlbum";
import SuggestedPlaylist from "./suggestedPlaylist";
import Trending from "./trending";

function HomePage() {
  document.title = 'Home Page | Music Project';

  return (
    <>
      <Banner />

      <h2>Recommended for you</h2>
      <SugesstedSong />

      <h2>Best of artist</h2>
      <SuggesstedArtist />

      <Trending />

      <SuggestedPlaylist />

      <SuggestedAlbum />
    </>
  )
}

export default HomePage