import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import Footer from "../../components/Footer"
import './index.scss'
import { useState, useCallback, useDidShow } from '@tarojs/taro'

type Banner = {
  pic: string;
  bannerId: string;
}

type Song = {
  name: string;
  id: number;
  coverImgUrl: string;
}

export default function Index() {

  const [bannerList, setBannerList] = useState<Array<Banner>>([])
  const [songLists, setSongLists] = useState<Array<Song>>([])
  // 获取轮播
  const getBanner = useCallback(() => {
    Taro.request({
      url: 'http://localhost:3000/banner?type=2',
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        setBannerList(res.data.banners)
      })
  }, [])
  // 获取热门歌单
  const getHotSongs = useCallback(() => {
    Taro.request({
      url: 'http://localhost:3000/top/playlist?limit=9',
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        setSongLists(res.data.playlists)
      })
  }, [])

  // 跳转
  const navigateTo = useCallback((type: string) => {
    switch (type) {
      case 'songs':
        if (Taro.getStorageSync('cookie') === '') {
          Taro.atMessage({
            'message': '请先登录',
            'type': "error",
          })
          return
        }
        Taro.navigateTo({
          url: '/pages/dailySongs/hooks'
        })
        break;

      default:
        break;
    }
  }, [])

  useDidShow(() => {
    getBanner()
    getHotSongs()
  })

  return (
    <View className='index'>
      <AtMessage />
      <View className='top'>
        {/* 轮播 */}
        <View className='banner'>
          <Swiper
            className='banner_list'
            indicatorColor='#999'
            indicatorActiveColor='#d43c33'
            circular
            indicatorDots
            autoplay
          >
            {
              bannerList.map(item =>
                <SwiperItem key={item.bannerId} className='banner_list__item'>
                  <Image src={item.pic} className='banner_img' />
                </SwiperItem>
              )
            }
          </Swiper>
        </View>
        {/* 标签 */}
        <View className='tags'>
          <View className='item' onClick={(): void => navigateTo('songs')}>
            <View className='icon'>
              <Image src={require('../../assets/images/temp/zhibo-white.png')} className='img' />
            </View>
            <Text>每日推荐</Text>
          </View>
          <View className='item'>
            <View className='icon'>
              <Image src={require('../../assets/images/temp/zhibo-white.png')} className='img' />
            </View>
            <Text>歌单</Text>
          </View>
          <View className='item'>
            <View className='icon'>
              <Image src={require('../../assets/images/temp/zhibo-white.png')} className='img' />
            </View>
            <Text>排行榜</Text>
          </View>
          <View className='item'>
            <View className='icon'>
              <Image src={require('../../assets/images/temp/zhibo-white.png')} className='img' />
            </View>
            <Text>电台</Text>
          </View>
          <View className='item'>
            <View className='icon'>
              <Image src={require('../../assets/images/temp/zhibo-white.png')} className='img' />
            </View>
            <Text>直播</Text>
          </View>
        </View>
      </View>
      {/* 分割线 */}
      <View className='line'></View>
      {/* 推荐歌单 */}
      <View className='songs'>
        <View className='title'>
          <View className='big-title'>推荐歌单</View>
          <View className='sub-title'>歌单广场</View>
        </View>
        <View className='card-list'>
          {
            songLists.map(v => {
              return <View className='card' key={v.id}>
                <Image src={v.coverImgUrl} className='cover' />
                <Text className='name'>{v.name}</Text>
              </View>
            })
          }
        </View>
      </View>
      {/* footer */}
      <View className='footer'>
        <Footer />
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页'
}