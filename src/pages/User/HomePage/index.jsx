import SugesstedSong from "../../../components/User/SugesstedSong";

function HomePage() {
  document.title = 'Home Page | Music Project';

  return (
    <>
      HomePage User
      <h3>Recommended for youuu</h3>
      <SugesstedSong/>
    </>
  )
}

export default HomePage