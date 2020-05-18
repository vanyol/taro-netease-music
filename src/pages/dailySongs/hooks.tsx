import { useState, useCallback, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Footer from "../../components/Footer"
import './index.scss'

function play(id: number) {
  Taro.navigateTo({
    url: '/pages/play/hooks?id=' + id
  })
}

type Album = {
  id: number;
  name: string;
  picUrl: string;
}

type Artists = [{
  name: string;
}]

interface Song {
  id: number;
  album: Album;
  artists: Artists;
}

export default function Daily() {
  const [songsList, setSongsList] = useState<Song[]>([])
  const getDailySongs = useCallback(() => {
    Taro.request({
      url: 'http://localhost:3000/recommend/songs',
      header: {
        'content-type': 'application/json',
        'Cookie': "MUSIC_U =" + Taro.getStorageSync('cookie')
      }
    })
      .then(res => setSongsList(res.data.data.dailySongs))
  }, [setSongsList])
  // 获取每日推荐歌曲
  useEffect(() => getDailySongs(), [getDailySongs])

  return (
    <View className='dailySongs'>
      <View className='cover' style="background-image: url('http://p1.music.126.net/-eq6sZ43t_Kqu6v4Avt-cA==/109951164233269298.jpg')">
        <View className='time'>
          <Text className='month'>09</Text>
          <Text className='day'> / 01</Text>
        </View>
        <View className='des'>根据你的音乐口味，为你推荐好音乐、好朋友</View>
      </View>
      <View className='songList'>
        <View className='btns'>
          <View className='play'>
            <View className='icon-paly-all'></View>
            <Text>播放全部</Text>
          </View>
          <View className='select'>
            <View className='icon-select-more'></View>
            <Text>多选</Text>
          </View>
        </View>
        <View className='list'>
          {songsList.map(song => {
            return <View className='item' key={song.album.id}>
              <View className='item-left'>
                <View className='pic'>
                  <Image src={song.album.picUrl} className='pic-image' />
                </View>
                <View className='info'>
                  <View className='name'>{song.album.name}</View>
                  <View className='singer'>{song.artists[0].name} - {song.album.name}</View>
                </View>
              </View>
              <View className='item-right'>
                <View className='btn-play' onClick={() => { play(song.id) }}></View>
                <View className='btn-more'></View>
              </View>
            </View>
          })}
        </View>
      </View>
      <View className='footer'>
        <Footer />
      </View>
    </View>
  )
}
Daily.config = {
  navigationBarTitleText: '每日推荐'
}