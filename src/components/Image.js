import {Suspense} from 'react'
import {useImage} from 'react-image'
import LoadingBlock from '@/components/LoadingBlock'
 
export default function Image(props) {
  function MyImageComponent() {
    const {src} = useImage({
      srcList: props.src,
    })
    return <img {...props} src={src} alt={props.alt} />
  }
  return (
    <Suspense fallback={<LoadingBlock/>}>
      <MyImageComponent />
    </Suspense>
  )
}
