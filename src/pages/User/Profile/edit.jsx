import SubmitButton from "@/components/SubmitButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAvatarFallback, showToast } from "@/helpers";
import { countryNames } from "@/helpers/mockData";
import { uploadFile } from "@/services/Admin/uploadFileService";
import { updateProfile } from "@/services/Client/userArtistService";
import { ChevronsUpDown, Edit } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile({ profile, toVerify = false }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    avatar: profile.avatar,
    phone: profile.phone,
    gender: profile.gender,
    country: profile.country,
    bio: profile.bio,
    dateOfBirth: "16/09/2003",
    verifyArtist: toVerify ? true : profile.verifyArtist,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "avatar") {
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleFileUpload = async (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const res = await uploadFile(files[0]);
      if (res.status === 200) {
        setFormData({ ...formData, avatar: res.data.secure_url });
      } else {
        showToast("Failed to upload image", "error");
      }
    }
  }

  const handleSubmit = async () => {
    const res = await updateProfile(formData)
    if (res.status !== 200) {
      if (res.status === 401) {
        showToast("Please login to update profile", "error");
      } else {
        showToast("Failed to update profile", "error");
      }
    } else {
      showToast(toVerify ? "Your account is verified" : "Profile updated successfully", "success");
      localStorage.setItem("userInfo", JSON.stringify(res.data.user))
      navigate(0)
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {toVerify ? (
            <Button className={"mt-3"}>
              Verify Artist
            </Button>
          ) : (
            <Button variant="outline" className="flex ml-auto">
              <Edit /> <span>Edit</span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form action={handleSubmit}
            className="w-full max-h-[75vh] overflow-auto flex flex-col gap-3 items-center"
          >
            <label className="size-fit relative group cursor-pointer">
              <Avatar className="size-24 group-hover:brightness-65">
                <AvatarImage src={formData.avatar || ""} />
                <AvatarFallback>{getAvatarFallback(formData.fullName)}</AvatarFallback>
              </Avatar>
              <input
                type="file"
                name="avatar"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                bg-muted text-muted-foreground">
                <Edit className="size-5" />
              </div>
            </label>
            <label className="w-full">
              <span>Full Name</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>
            <label className="w-full">
              <span>Phone</span>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                required
              />
            </label>
            <label className="w-full">
              <span>Gender</span>
              <Select value={["male", "female", "other"].includes(formData.gender) ? formData.gender : ""}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger className="w-full border border-primary-foreground rounded-lg text-base">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </label>

            <label className="w-full">
              <span>Country</span>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger>
                  <div className="flex items-center justify-between px-3 py-1.5 border border-primary-foreground rounded-lg text-base">
                    {formData.country || "Select country"}
                    <ChevronsUpDown className="size-4 opacity-50" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Command className="rounded-sm border-none hover:bg-transparent">
                    <CommandInput placeholder="Search country..." className="h-9" />
                    <CommandList>
                      {countryNames.map((country) => (
                        <CommandItem key={country} value={country}
                          onSelect={() => {
                            setFormData({ ...formData, country });
                            setDropdownOpen(false);
                          }}
                        >
                          {country}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </DropdownMenuContent>
              </DropdownMenu>
            </label>

            <label className="w-full">
              <span>Biography</span>
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                rows={5}
              />
            </label>
            <DialogFooter className="w-full">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <SubmitButton title={toVerify ? "Verify Artist" : "Save changes"} />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog >
    </>
  )
}

export default EditProfile