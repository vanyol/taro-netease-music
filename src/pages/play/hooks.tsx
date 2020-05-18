import { View, Image, Audio } from '@tarojs/components'
import { AtSlider } from 'taro-ui'
import './index.scss'
import { useState, useEffect, useRouter, useCallback } from '@tarojs/taro'

interface State {
  id: number;
  audioCtx: any;
  playBg: string;
  playing: string;
  isCanPlay: boolean;
  songsDetail: {
    name: string;
    picUrl: string;
  };
}

export default function SongsList() {
  const initState = {
    id: 0,
    audioCtx: undefined,
    isCanPlay: true,
    playing: '',
    playBg: require('../../assets/images/song/ajf.png'),
    songsDetail: {
      name: '',
      picUrl: ''
    }
  }
  const [state, setState] = useState<State>(initState)
  const router = useRouter()
  const getSongDetail = useCallback((id) => {
    Taro.request({
      url: 'http://localhost:3000/song/detail?ids=' + id,
      header: {
        'content-type': 'application/json',
        'Cookie': "MUSIC_U =" + Taro.getStorageSync('cookie')
      }
    })
      .then(res => {

        setState({
          ...state,
          id,
          songsDetail: res.data.songs[0].al
        })
      })
  }, [setState])
  const audioReStart = () => {
    state.audioCtx.seek(0)
  }
  const audioPause = () => {
    setState({
      ...state,
      playBg: require('../../assets/images/song/ajf.png')
    })
    state.audioCtx.pause()
  }
  const audioPlay = () => {
    if (state.isCanPlay) {
      setState({
        ...state,
        isCanPlay: false,
        playBg: require('../../assets/images/song/ajd.png'),
        playing: 'playing'
      })
      state.audioCtx.play()
    } else {
      setState({
        ...state,
        isCanPlay: true,
        playing: ''
      })
      audioPause()
    }
  }
  useEffect(() => {
    getSongDetail(Number(router.params.id))
  }, [])

  return (
    <View className='play' >
      <Image src={state.songsDetail.picUrl} className='bg-img' />
      <View className='content'>
        {/* <View className="title">{state.songsDetail.name}</View> */}
        <View className='graph'>
          <View className={`cover ${state.isCanPlay ? '' : 'circle'}`}>
            <Image src={state.songsDetail.picUrl} className='cover-img' />
          </View>
        </View>
        <View className={`play-hand ${state.playing}}`}></View>
        <View className='slider'>
          <AtSlider activeColor='#fff' backgroundColor='#dddddd'></AtSlider>
        </View>
        <View className='audio'>
          <Audio
            src={'https://music.163.com/song/media/outer/url?id=' + state.id}
            id='audio'
          />
        </View>
        <View className='operat'>
          <View className='btn-replay' onClick={audioReStart}></View>
          <View className='btn-pre'></View>
          <View className='btn-play' style={{ backgroundImage: `url(${state.playBg})` }} onClick={audioPlay}></View>
          <View className='btn-next'></View>
          <View className='btn-more'></View>
        </View>
      </View>
    </View >
  )
}

SongsList.config = {
  navigationBarTitleText: '播放'
}