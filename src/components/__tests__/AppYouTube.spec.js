import { mount } from '@vue/test-utils'
import AppYoutube from './../AppYoutube.vue'

describe('AppYoutube', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(AppYoutube, {
            propsData: {
                src: "VXwy_zbpGck"
            }
        })
        expect(wrapper.find('iframe').attributes().src).toContain('https://www.youtube.com/embed/VXwy_zbpGck?rel=0')
    })
})