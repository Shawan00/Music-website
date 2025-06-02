import { memo } from "react";
import { formatDate, resizeImage } from "../../../helpers";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, BadgeX, Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

function GenreList(props) {
  const genreList = props.data;

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        {genreList.map((genre, index) => (
          <Card className="w-full" key={index}>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-40 sm:h-45 flex-1 flex flex-col gap-3 justify-between overflow-hidden">
                  {genre.status === "active" ? (
                    <Badge variant="secondary" className="bg-green-500 text-white">
                      <BadgeCheck />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-red-500 text-white">
                      <BadgeX />
                      Inactive
                    </Badge>
                  )}

                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">{genre.title}</p>
                    <p className="text-sm md:text-base text-muted-foreground line-clamp-3">{genre.description || "No description"}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="rounded-full p-1 transition-all duration-300 hover:bg-muted">
                          <Ellipsis />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent 
                        className='w-50'
                        align="end"
                        sideOffset={5}
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className='text-destructive'>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                  </div>
                </div>
                <div className="size-30 sm:size-40 flex items-center justify-center overflow-hidden rounded-sm border">
                  <img
                    src={resizeImage(genre.thumbnail, 160)}
                    alt="Genre Thumbnail"
                    className="w-full object-cover aspect-square"
                  ></img>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default memo(GenreList)