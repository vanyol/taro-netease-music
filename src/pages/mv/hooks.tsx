import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Footer from '../../components/Footer'
import './index.scss'
import Recommend from "./recommend/Recommend"
import { useState } from '@tarojs/taro'

export default function MV() {
  const [current, setCurrent] = useState<number>(0)

  return (
    <View className='video'>
      <AtTabs
        current={current}
        scroll
        tabList={[
          { title: '推荐' },
          { title: 'LOOK直播' },
          { title: '音乐的力量' },
          { title: '现场' },
          { title: '翻唱' },
          { title: '广场' },
          { title: '生活' },
          { title: '游戏' }
        ]}
        onClick={setCurrent}
      >
        <AtTabsPane current={current} index={0}>
          <View className='recommend'>
            <Recommend />
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style='font-size:18px;text-align:center;height:100px;'>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View style='font-size:18px;text-align:center;height:100px;'>标签页三的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          <View style='font-size:18px;text-align:center;height:100px;'>标签页四的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={4}>
          <View style='font-size:18px;text-align:center;height:100px;'>标签页五的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={5}>
          <View style='font-size:18px;text-align:center;height:100px;'>标签页六的内容</View>
        </AtTabsPane>
      </AtTabs>
      {/* footer */}
      <Footer />
    </View>
  )

}
MV.config = {
  navigationBarTitleText: 'MV'
}