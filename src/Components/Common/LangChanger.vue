<template>
    <div class="locale-changer">
        <select @change="changeLanguage($event)">
            <option v-for="(lang) in langs" :key="lang.locale" :value="lang.locale">{{ lang.name }}</option>
        </select>
    </div>
</template>

<script>
const axios = require("axios").default;
import { loadLanguageAsync } from "@/localization";

export default {
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
    data() {
        return {
            langs: null,
        };
    },
    methods: {
        changeLanguage(e) {
            loadLanguageAsync(e.target.value).then(() => {
                console.log("Language loaded!"); // TODO: добавить прелоадер
            });
        },
    },
};
</script>
