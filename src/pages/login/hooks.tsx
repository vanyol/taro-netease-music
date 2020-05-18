import { View, Image, Input } from '@tarojs/components'
import { AtIcon, AtMessage } from 'taro-ui'
import './index.scss'
import { useState } from '@tarojs/taro'


function login(phone, password) {
  if (!phone) {
    Taro.atMessage({
      'message': '请输入手机号',
      'type': "error",
    })
    return
  }
  if (!password) {
    Taro.atMessage({
      'message': '请输入密码',
      'type': "error",
    })
    return
  }
  Taro.request({
    url: 'http://localhost:3000/login/cellphone',
    method: 'POST',
    data: {
      phone,
      password
    },
    header: {
      'content-type': 'application/json'
    }
  })
    .then(res => {
      if (res.data.code === 200) {
        Taro.setStorageSync('cookie', res.data.token)
        Taro.navigateTo({
          url: '/pages/index/hooks'
        })
      } else {
        Taro.atMessage({
          'message': res.data.message,
          'type': "error",
        })
      }
    })
}

export default function Login() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View className='login'>
      <AtMessage />
      <View className='content'>
        <Image src={require('../../assets/images/logo.png')} className='logo' />
        <View className='form'>
          <View className='phone'>
            <AtIcon value='phone' size='20' color='#ffffff'></AtIcon>
            <Input type='text' placeholder='手机号' placeholderStyle='color:#eee' className='num' onInput={e => setPhone(e.detail.value)} />
          </View>
          <View className='pwd'>
            <AtIcon value='lock' size='20' color='#ffffff' ></AtIcon>
            <Input type='text' password placeholder='密码' placeholderStyle='color:#eee' className='password' onInput={e => setPassword(e.detail.value)} />
          </View>
        </View>
        <View className='btn-login' onClick={() => login(phone, password)}>立即登录</View>
      </View>
    </View >
  )
}

Login.config = {
  navigationBarTitleText: '登录',
  navigationBarBackgroundColor: '#C20C0C',
  navigationBarTextStyle: 'white'
}