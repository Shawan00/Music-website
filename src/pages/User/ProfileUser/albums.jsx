import AlbumCard from "@/components/User/AlbumCard";

function Albums({ albums }) {

  if (albums.length === 0) return (
    <p className="text-center text-muted-foreground">No albums found</p>
  )

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>
    </>
  )

}

export default Albums;