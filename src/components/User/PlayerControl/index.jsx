import { useSelector } from "react-redux";

function PlayerControl() {
  const song = useSelector(state => state.playerControl.song);

  return song ? (
    <>
      <div className="player-control">
        <img src={song.thumbnail} alt={song.title}></img>
        <audio src={song.audio} controls></audio>
      </div>
    </>
  ) : (
    <>No player audio</>
  );
}

export default PlayerControl