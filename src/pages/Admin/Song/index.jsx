import { useCallback, useEffect, useState } from "react";
import { getSong } from "../../../services/Admin/songService";
import { useSearchParams } from "react-router-dom";
import SongList from "./SongList";
import CreateSong from "./CreateSong";
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
	}, [])

	useEffect(() => {
		const getData = async () => {
			const res = await getSong(page, pageSize, "createdAt", "desc");
			setSongData(res.data);
		}
		getData();
	}, [page, pageSize, reload]);

	const handleReload = () => { // Hàm này sẽ được gọi khi tạo mới hoặc cập nhật bài hát
		setReload(!reload);
	};

	return (
		<>
			<div className="flex items-center justify-between mb-4">
				<h1>List Song</h1>
				<CreateSong onReload={handleReload} />
			</div>
			{songList ? (
				<>
					<SongList data={songData.data} onReload={handleReload} />
					{/* <Pagination objectPagination={songData.objectPagination}/> */}
				</>
			) : (
				<>Loading</>
			)}
		</>
	)
}

export default Song