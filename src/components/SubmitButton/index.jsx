import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

function SubmitButton({className}) {
  const {pending} = useFormStatus()

  return (
    <>
      <Button type="submit" disabled={pending} 
        className={`${className} text-white dark:text-gray-900 text-base p-5
          bg-[var(--green-bg)] hover:bg-[var(--green-hover)]`}>
        {pending ? (
          <>
            <Loader2 className='animate-spin'/>
            Please wait
          </>
        ) : (
          <>Submit</>
        )}
      </Button>
    </>
  )
}

export default SubmitButton