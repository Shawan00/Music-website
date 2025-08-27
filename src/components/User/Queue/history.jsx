import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { playFromHistory } from "@/features/playerControl/playerControlSlice"
import { resizeImage } from "@/helpers"
import { Ellipsis } from "lucide-react"
import { useDispatch } from "react-redux"

function History({ playedHistory }) {
  const dispatch = useDispatch()

  return (
    <>
      <Accordion
        type='single'
        collapsible
        className="w-full"
      >
        <AccordionItem value='history'>
          <AccordionTrigger className='py-0'>
            <h4 className="font-bold px-2">History</h4>
          </AccordionTrigger>
          <AccordionContent>
            {playedHistory.length === 0 ? (
              <p className="italic px-2">No songs are played</p>
            ) : (
              <>
                {playedHistory.map((item, index) => (
                  <div key={index}
                    className="song-item p-2"
                    onClick={() => dispatch(playFromHistory(index))}
                  >
                    <div className='image'>
                      <img src={resizeImage(item.thumbnail, 60)} alt="thumbnail"></img>
                    </div>
                    <div className='info'>
                      <span className='title'>{item.title}</span>
                      <span className='artist'>artist</span>
                    </div>
                    <div>
                      <Ellipsis strokeWidth={1.5} size={20} />
                    </div>
                  </div>
                ))}
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default History