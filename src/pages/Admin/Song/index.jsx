import { useEffect, useState } from "react";
import { getSong } from "../../../services/Admin/songService";
import { useSearchParams } from "react-router-dom";
// import Pagination from "../../../components/Admin/Pagination";
import SongList from "./SongList";
import CreateSong from "./CreateSong";
import UpdateSong from "./UpdateSong";

function Song() {
	const [songData, setSongData] = useState({});
	const songList = songData.data;
	const [searchParams] = useSearchParams();
	const page = parseInt(searchParams.get("page")) || 1;
	const pageSize = parseInt(searchParams.get("pageSize")) || 8;
	const [reload, setReload] = useState(0);

	useEffect(() => {
		document.title = "Manage song | Music project";
		const getData = async () => {
			const res = await getSong(page, pageSize, "createdAt", "desc");
			setSongData(res.data);
		}
		getData();
	}, [page, pageSize, reload]);

	const handleReload = () => {
		setReload(prev => !prev);
	}

	return songList ? (
		<>
			<CreateSong onReload={handleReload}/>
			{/* <Pagination objectPagination={songData.objectPagination}/> */}
			<SongList data={songList}/>
			<UpdateSong/>
		</>
	) : (
		<>
			Loading...
		</>
	);
}

export default Song