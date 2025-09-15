import SongTable from "@/components/User/SongTable";

function Songs({songs}) {

  if (songs.length === 0) return (
    <p className="text-center text-gray-500">No songs found</p>
  )

  return (
    <>
      <SongTable songs={songs} />
    </>
  )
}

export default Songs;