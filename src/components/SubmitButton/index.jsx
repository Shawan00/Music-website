import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { memo } from 'react'

function SubmitButton({className, isDisabled, title = "Submit"}) {
  const {pending} = useFormStatus()

  return (
    <>
      <Button type="submit" disabled={pending || isDisabled} 
        className={`text-white dark:text-gray-900 text-base p-5
          bg-[var(--green-bg)] hover:bg-[var(--green-hover)] ${className}`}>
        {pending ? (
          <>
            <Loader2 className='animate-spin'/>
            Please wait
          </>
        ) : (
          <>{title}</>
        )}
      </Button>
    </>
  )
}

export default memo(SubmitButton)