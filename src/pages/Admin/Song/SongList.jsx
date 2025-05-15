import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { resizeImage } from "@/helpers";
import { memo } from "react";

function SongList(props) {
  const songList = props.data;

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
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {songList.map((song) => (
            <TableRow key={song.id}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default memo(SongList)