<template>
    <div class="locale-changer">
        <select @change="changeLanguage()">
            <option
                v-for="lang in langs"
                :key="lang.locale"
                :value="lang.locale"
                :selected="lang.locale === $i18n.locale"
            >
                {{ lang.name }}
            </option>
        </select>
    </div>
</template>

<script>
import { loadLanguageAsync } from "@/localization";
import { IS_LOADING, SET_LOADING_DATA } from "@/store/mutation-types";

const axios = require("axios").default;

export default {
    data() {
        return {
            langs: null,
        };
    },
    created() {
        axios
            .get("public/localization/list")
            .then((response) => {
                return (this.langs = response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        changeLanguage() {
            this.$store.commit(IS_LOADING, {
                name: "loadingCircle",
                value: true,
            });
            this.$store.commit(SET_LOADING_DATA, {
                textKey: "loading.language",
            });
            this.$helpers.toggleDocumentScroll();

            loadLanguageAsync(event.target.value).then(() => {
                this.$store.commit(IS_LOADING, {
                    name: "loadingCircle",
                    value: false,
                });
                this.$store.commit(SET_LOADING_DATA, null);
                this.$helpers.toggleDocumentScroll();
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.locale-changer {
    float: right;
    height: 30px;
    margin-left: 3px;

    select {
        background-color: $button-primary-background-color;
        color: $button-primary-light-text-color;
        cursor: pointer;
        height: inherit;
    }
}
</style>
