import Vue from 'vue'
import './iconfont'
import SvgIcon from '@/components/SvgIcon'// svg component

Vue.component('svg-icon', SvgIcon)

const svgFiles = require.context('./svg', true, /\.svg$/)
svgFiles.keys().map(item => svgFiles(item))
