import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import UploadButton from "@/components/ui/uploadButton";
import { AuthContext } from "@/context/auth.context";
import { showToast } from "@/helpers";
import { genres } from "@/helpers/mockData";
import { uploadFile } from "@/services/Admin/uploadFileService";
import { getMyAlbums } from "@/services/Client/albumService";
import { createSong, updateSong } from "@/services/Client/songService";
import { getAllArtists } from "@/services/Client/userArtistService";
import { Check, ChevronDown, Edit, Loader2, Plus, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SongForm({ song = null, setSongs }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [open, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: song?.title || "",
    audio: song?.audio || null,
    lyrics: song?.lyrics || undefined,
    thumbnail: song?.thumbnail || undefined,
    background: song?.background || undefined,
    genreId: song?.genreId || undefined,
    albumId: song?.albumId || undefined,
    collaborationArtistIds: song?.collaborationArtistIds || [],
    description: song?.description || "",
  })
  const [albums, setAlbums] = useState(null);
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await getMyAlbums();
      if (res.status === 200) {
        setAlbums(res.data.albums);
      } else {
        setAlbums([]);
      }
    }
    const fetchArtists = async () => {
      const res = await getAllArtists();
      if (res.status === 200) {
        setArtists(res.data.artists.filter(artist => artist._id !== user.userInfo._id));
      } else {
        setArtists([]);
      }
    }
    fetchAlbums();
    fetchArtists();
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleFileUpload = async (e) => {
    const { name, files } = e.target;
    if (!files[0]) return;

    setUploading(true);
    setFormData(prev => ({
      ...prev,
      [name]: "uploading"
    }))
    const prevState = formData[name];

    const res = await uploadFile(files[0]);
    if (res.status === 200) {
      setFormData(prev => ({
        ...prev,
        [name]: res.data.secure_url
      }))
    } else {
      showToast("Failed to upload file", "error");
      setFormData(prev => ({
        ...prev,
        [name]: prevState
      }))
    }
    setUploading(false);
  }

  const handleSubmit = async () => {
    const res = song ? await updateSong(song._id, formData) : await createSong(formData);
    console.log(res);
    if (res.status === 200) {
      showToast(res.data.message, "success");
      if (song) {
        setSongs(prev => prev.map(s => s._id === song._id ? res.data.updatedSong : s))
        setIsOpen(false);
      } else {
        navigate(0);
      }
    } else {
      showToast(res.data.message, "error");
    }
  }

  const handleCollaborationArtistChange = (artistId) => {
    if (formData.collaborationArtistIds.includes(artistId)) {
      setFormData({ ...formData, collaborationArtistIds: formData.collaborationArtistIds.filter(id => id !== artistId) })
    } else {
      setFormData({ ...formData, collaborationArtistIds: [...formData.collaborationArtistIds, artistId] })
    }
  }

  const selectedArtists = () => {
    if (formData.collaborationArtistIds.length === 0) return [];
    return artists.filter(artist => formData.collaborationArtistIds.includes(artist._id));
  }

  if (!albums || !artists) return (
    <div className="space-y-3">
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {song ? (
          <Edit className="size-5 cursor-pointer" />
        ) : (
          <Button>
            <Plus /> New Song
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{song ? "Edit Song" : "New Song"}</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-2 max-h-[60vh] overflow-y-auto">
          <label className="w-full">
            <span>Song Title</span>
            <input
              type="text"
              name="title"
              defaultValue={formData.title}
              onBlur={handleChange}
              placeholder="Enter song title"
              required
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4">
            <label className="w-fit">
              <span>Song Audio</span>
              <div className="flex gap-2 items-center">
                <UploadButton />
                {formData.audio === "uploading" ? (
                  <Loader2 className="animate-spin" />
                ) : formData.audio && (<Check color="var(--green-highlight)" />)}
              </div>
              <input
                type="file"
                name="audio"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <label className="w-fit">
              <span>Song Lyrics (.lrc file)</span>
              <div className="flex gap-2 items-center">
                <UploadButton />
                {formData.lyrics === "uploading" ? (
                  <Loader2 className="animate-spin" />
                ) : formData.lyrics && (<Check color="var(--green-highlight)" />)}
              </div>
              <input
                type="file"
                name="lyrics"
                accept=".lrc"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4">
            <label className="w-full">
              <span>Cover photo</span>
              <UploadButton />
              {formData.thumbnail === "uploading" ? (
                <div className="flex justify-center items-center size-35 border border-border rounded-sm mt-1">
                  <Loader2 className="animate-spin" />
                </div>
              ) : formData.thumbnail && (
                <div className="size-35 border border-border rounded-sm overflow-hidden flex justify-center items-center mt-1">
                  <img
                    src={formData.thumbnail}
                    alt="thumbnail"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              )}
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <label className="w-full">
              <span>Background photo</span>
              <UploadButton />
              {formData.background === "uploading" ? (
                <div className="flex justify-center items-center size-35 border border-border rounded-sm mt-1">
                  <Loader2 className="animate-spin" />
                </div>
              ) : formData.background && (
                <div className="size-35 border border-border rounded-sm overflow-hidden flex justify-center items-center mt-1">
                  <img
                    src={formData.background}
                    alt="background"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              )}
              <input
                type="file"
                name="background"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <label className="w-full">
            <span>Genre</span>
            <Select value={formData.genreId} onValueChange={(value) => setFormData({ ...formData, genreId: value })}>
              <SelectTrigger className="w-full border border-primary-foreground rounded-lg text-base">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre._id} value={genre._id}>
                    {genre.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <label className="w-full">
            <span>Album</span>
            <Select value={formData.albumId} onValueChange={(value) => setFormData({ ...formData, albumId: value })}>
              <SelectTrigger className="w-full border border-primary-foreground rounded-lg text-base">
                <SelectValue placeholder="Select album" />
              </SelectTrigger>
              <SelectContent>
                {albums ? albums.map((album) => (
                  <SelectItem key={album._id} value={album._id}>
                    {album.title}
                  </SelectItem>
                )) : (
                  <p className="text-sm text-muted-foreground">No albums found</p>
                )}
              </SelectContent>
            </Select>
          </label>
          <label className="w-full">
            <span>Collaboration Artists</span>
            <DropdownMenu className="w-full">
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full border border-primary-foreground rounded-lg text-base !text-muted-foreground justify-between"
                >
                  {formData.collaborationArtistIds.length > 0 ? (
                    <span>Selected {formData.collaborationArtistIds.length} {formData.collaborationArtistIds.length > 1 ? "artists" : "artist"}</span>
                  ) : (
                    <span>Select artists</span>
                  )}
                  <ChevronDown className="opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="!w-full p-0" align="start">
                <Command className="border-none rounded-xs w-full hover:bg-transparent">
                  <CommandInput placeholder="Search artists..." />
                  <CommandList>
                    <CommandEmpty>No artist found.</CommandEmpty>
                    <CommandGroup>
                      {artists.map((artist) => (
                        <CommandItem key={artist._id} value={artist.name}
                          onSelect={() => handleCollaborationArtistChange(artist._id)}
                        >
                          <Checkbox
                            checked={formData.collaborationArtistIds.includes(artist._id)}
                          />
                          {artist.fullName}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex flex-wrap gap-2">
              {selectedArtists().map(artist => (
                <div key={artist._id} className="bg-muted px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {artist.fullName}
                  <X className="h-4 w-4 cursor-pointer pt-1" 
                    onClick={() => handleCollaborationArtistChange(artist._id)}
                  />
                </div>
              ))}
            </div>
          </label>
          <label className="w-full">
            <span>Description</span>
            <textarea
              name="description"
              defaultValue={formData.description}
              onBlur={handleChange}
              placeholder="Enter song description"
              rows={6}
            />
          </label>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <SubmitButton
              title={song ? "Save changes" : "Create"}
              isDisabled={uploading}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SongForm;