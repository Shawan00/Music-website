import { memo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SongForm from '@/components/Admin/SongForm';
import { showToast } from '@/helpers';

function CreateSong(props) {
  const { onReload } = props;
  const [isOpen, setIsOpen] = useState(false);
  
  const handleResponse = (type, message) => {
    if (type === 'success') {
      showToast('Song created successfully!', type);
      onReload();
      setIsOpen(false);
    } else {
      showToast(message || 'Failed to create song.', type);
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="text-lg text-secondary py-5 flex items-center">
            <Plus className='size-lg' />
            <span>New Song</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Create a new song</DialogTitle>
          </DialogHeader>
          <SongForm sendResponseToParent={handleResponse}/>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default memo(CreateSong)