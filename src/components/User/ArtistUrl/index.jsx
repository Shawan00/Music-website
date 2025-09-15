import { Link } from "react-router-dom";

function ArtistUrl({ artistId, collaborationArtistIds }) {

  if (!artistId) {
    return (<p className="text-muted-foreground text-sm">Unknow</p>)
  }

  return (
    <div className="w-fit flex items-center text-sm truncate"
      onClick={(e) => e.stopPropagation()}
    >
      <Link to={`/profile/${artistId._id}`}
        className="text-muted-foreground hover:text-primary hover:underline transition-all duration-300 ease-in-out"
      >
        {artistId.fullName}
      </Link>
      {collaborationArtistIds && collaborationArtistIds.map((item) => (
        <div key={item._id}>
          <span>, </span>
          <Link to={`/profile/${item._id}`}
            className="text-muted-foreground hover:text-primary hover:underline transition-all duration-300 ease-in-out"
          >{item.fullName}</Link>
        </div>
      ))}
    </div>
  )
}

export default ArtistUrl;