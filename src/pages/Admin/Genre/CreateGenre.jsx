import { memo, useState } from 'react';
import { useTheme } from '@/components/theme/theme-provider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import GenreForm from '@/components/Admin/GenreForm';
import { showToast } from '@/helpers';

function CreateGenre(props) {
  const { onReload } = props;
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const receiveResponse = (response) => {
    if (response.type === "success") {
      showToast(response.message, 'success', theme);
      onReload();
      setIsOpen(false);
    } else {
      showToast(response.message, 'error', theme);
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="text-lg text-secondary py-5 flex items-center">
            <Plus className='size-lg' />
            <span>New Genre</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Create a new song</DialogTitle>
          </DialogHeader>
          <GenreForm sendResponseToParent={receiveResponse}/>
        </DialogContent>

      </Dialog>


    </>
  );
}

export default memo(CreateGenre)