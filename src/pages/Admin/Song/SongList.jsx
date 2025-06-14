import Actions from "@/components/ui/actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { resizeImage } from "@/helpers";
import { memo, useState } from "react";
import DeleteSong from "./DeleteSong";
import UpdateSong from "./UpdateSong";

function SongList({data, onReload}) {
  const songList = data;
  const [updateSong, setUpdateSong] = useState(null);
  const [deleteSongId, setDeleteSongId] = useState(null);

  if (!songList || songList.length === 0) {
    return <div className="text-center">No songs available</div>;
  }

  return (
    <>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[500px]">Song</TableHead>
            <TableHead>Album</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='w-auto'></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {songList.map((song) => (
            <TableRow key={song._id}>
              <TableCell>
                <div className="flex gap-4">
                  <div className="inner-image">
                    <img
                      src={resizeImage(song.thumbnail, 80)}
                      alt="thumbnail"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{song.title}</span>
                    <span className="text-sm text-muted-foreground">Artist 1</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">Album 1</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">Genre 1</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{song.status}</span>
              </TableCell>
              <TableCell className="text-center px-1 w-[1%]">
                <Actions 
                  vertical
                  song={song}
                  setDeleteSongId={setDeleteSongId}
                  setUpdateSong={setUpdateSong}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <DeleteSong
        songId={deleteSongId}
        setSongId={setDeleteSongId}
        onReload={onReload}
      />
      <UpdateSong 
        song={updateSong}
        setSong={setUpdateSong}
        onReload={onReload}
      />
    </>
  );
}

export default memo(SongList)