import { mount } from "@vue/test-utils"
import DeYoutube from "./DeYoutube.vue"

describe("DeYoutube", () => {
    test("It renders a iframe element with youtube video.", () => {
        const wrapper = mount(DeYoutube, {
            propsData: {
                src: "VXwy_zbpGck",
            },
        })
        expect(wrapper.find("iframe").attributes().src).toContain(
            "https://www.youtube.com/embed/VXwy_zbpGck?rel=0"
        )
    })
})
