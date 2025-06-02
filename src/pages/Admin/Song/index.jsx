import { useCallback, useEffect, useState } from "react";
import { getSong } from "../../../services/Admin/songService";
import { useSearchParams } from "react-router-dom";
import SongList from "./SongList";
import CreateSong from "./CreateSong";
import UpdateSong from "./UpdateSong";
import Pagination from "@/components/Admin/Pagination";

function Song() {
	const [songData, setSongData] = useState({});
	const songList = songData.data;
	const [searchParams] = useSearchParams();
	const page = parseInt(searchParams.get("page")) || 1;
	const pageSize = parseInt(searchParams.get("pageSize")) || 8;
	const [reload, setReload] = useState(false);

	useEffect(() => {
		document.title = "Manage song | Music project";
		const getData = async () => {
			const res = await getSong(page, pageSize, "createdAt", "desc");
			setSongData(res.data);
		}
		getData();
	}, [page, pageSize, reload]);

	const handleReload = useCallback(() => { // Hàm này sẽ được gọi khi tạo mới hoặc cập nhật bài hát
		setReload(!reload);
	}, []);

	return songList ? (
		<>
			<div className="flex items-center justify-between mb-4">
				<h1>List Song</h1>
				<CreateSong onReload={handleReload} />
			</div>
			<SongList data={songData.data} />
			{/* <Pagination objectPagination={songData.objectPagination}/> */}
			<UpdateSong />
		</>
	) : (
		<>
			Loading...
		</>
	);
}

export default Song