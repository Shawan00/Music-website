import { Button } from "@/components/ui/button";
import SugesstedSong from "../../../components/User/SugesstedSong";

function HomePage() {
  document.title = 'Home Page | Music Project';

  return (
    <>
      <Button 
        variant="link"
        className="p-0 h-fit"
      >
        <h2>Recommended for you</h2>
      </Button>
      <SugesstedSong />
    </>
  )
}

export default HomePage