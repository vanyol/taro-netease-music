import { View, Image } from '@tarojs/components'
import './recommend.scss'
import { useState, useCallback, useEffect } from '@tarojs/taro'

type MV = {
  id: number;
  cover: string;
  name: string;
  artistName: string;
}
export default function Recommend() {

  const [mvList, setMvlist] = useState<Array<MV>>([])
  const getMvList = useCallback(() => {
    Taro.request({
      url: 'http://localhost:3000/mv/exclusive/rcmd?limit=10',
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        setMvlist(res.data.data)
      })
  }, [])

  useEffect(() => {
    getMvList()
  }, [])
  return (
    <View className='recommend'>
      {
        mvList.map(mv => {
          return <View className='item' key={mv.id}>
            <View className='cover' style={{ backgroundImage: `url(${mv.cover})` }}>
              <View className='btn-play'>
                <Image src={require('../../../assets/images/ajf.png')} className='play' />
              </View>
            </View>
            <View className='title'>{mv.name}</View>
          </View>
        })
      }
    </View >
  )
}