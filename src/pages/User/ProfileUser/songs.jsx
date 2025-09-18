import SongTable from "@/components/User/SongTable";

function Songs({songs}) {

  if (songs.length === 0) return (
    <p className="text-center text-muted-foreground">No songs found</p>
  )

  return (
    <>
      <SongTable songs={songs} />
    </>
  )
}

export default Songs;