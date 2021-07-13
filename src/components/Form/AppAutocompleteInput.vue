<template>
    <div
        class="form__autocomplete"
        role="combobox"
        aria-haspopup="listbox"
        :aria-owns="`form__autocomplete-items-${id}`"
        :aria-expanded="isExpanded"
    >
        <label
            v-if="label"
            class="form__label"
            :id="`form__label-${id}`"
            :for="`form__autocomplete-${id}`"
        >
            {{ label }}
        </label>

        <input
            :id="`form__autocomplete-${id}`"
            ref="input"
            v-bind="$attrs"
            class="form__input"
            type="text"
            :value="value"
            @input="changeValue($event.target.value)"
            @blur="blur"
            @keydown.enter.prevent="keyEnter"
            @keydown.esc="blur"
            @keydown.up="keyUp"
            @keydown.down="keyDown"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            :aria-labelledby="`form__label-${id}`"
            :aria-activedescendant="activeDescendant"
        />
        <div
            v-if="loading"
            class="form__autocomplete--loading spinner spinner--gray"
        ></div>

        <div v-show="results.length" class="form__autocomplete-results">
            <ul
                class="form__autocomplete-items"
                :id="`form__autocomplete-items-${id}`"
                role="listbox"
            >
                <template v-for="(result, index) in results">
                    <slot name="result" :result="result">
                        <li
                            class="form__autocomplete-item"
                            :ref="`option-${index}`"
                            :key="index"
                            :id="`form__autocomplete--${id}-${index}`"
                            :class="{
                                'form__autocomplete-item--active':
                                    index === selectedIndex,
                            }"
                            @mouseover="selectedIndex = index"
                            @click="setValue(result)"
                            role="option"
                            :aria-selected="activeDescendant"
                        >
                            {{ result[display] }}
                        </li>
                    </slot>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import {debounce} from "lodash"

export default {
    name: "AppAutocompleteInput",
    inheritAttrs: false,
    props: {
        id: {
            type: String,
            default() {
                return `${this._uid}`
            },
        },
        value: String,
        label: String,
        query: Function,
        display: {
            type: String,
            required: false,
            default: "display",
        },
        queryConfig: {
            type: Object,
            required: false,
            default: () => {
                return {}
            },
        },
        exactMatch: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    data() {
        return {
            selectedIndex: -1,
            results: [],
            result: null,
            loading: false,
            error: null,
        }
    },
    methods: {
        doSearch: debounce(async function (value) {
            if (value.length < 2) return
            try {
                this.loading = true
                const {data} = await this.query.get(value, this.queryConfig)
                this.results = data || []
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }, 200),
        changeValue(value) {
            this.$emit("input", value)
            this.selectedIndex = -1
            this.doSearch(value)
        },
        blur(event) {
            this.$emit("input", event.target.value)
            setTimeout(() => (this.results = []), 200)
        },
        setValue(result) {
            let value = result[this.display]

            if (this.exactMatch) {
                value = `"${value}"`
            }

            if (Object.prototype.hasOwnProperty.call(result, "value")) {
                value = result.value
            }
            this.$emit("input", value)
            this.result = result
            this.$emit("setResult", result)
        },
        keyEnter() {
            if (this.selectedIndex !== -1) {
                this.setValue(this.results[this.selectedIndex])
                this.results = []
                this.selectedIndex = -1
            } else {
                this.$emit("input", event.target.value)
                this.results = []
                this.$emit("setResult", null)
            }
        },
        keyUp() {
            if (this.selectedIndex > -1) {
                this.selectedIndex--
            }
            if (this.selectedIndex == -1) {
                this.selectedIndex = this.results.length
            }
            this.scroll()
        },
        keyDown() {
            if (this.selectedIndex <= this.results.length) {
                this.selectedIndex++
            }
            if (this.selectedIndex >= this.results.length) {
                this.selectedIndex = 0
            }
            this.scroll()
        },
        scroll() {
            const option = this.$refs[`option-${this.selectedIndex}`]
            if (option) {
                option[0].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "start",
                })
            }
        },
    },
    computed: {
        isExpanded() {
            return this.results.length ? "true" : "false"
        },
        activeDescendant() {
            return this.selectedIndex > -1
                ? `form__autocomplete--${this.id}-${this.selectedIndex}`
                : ""
        },
    },
}
</script>
