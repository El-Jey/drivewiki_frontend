<template>
    <header class="site-topbar">
        <div class="site-container">
            <div v-if="$route.name == 'Home' ? false : true" class="topbar-left">
                <router-link to="/" class="topbar-brand">
                    <img :src="appIcon" alt />
                    <span>{{ appName }}</span>
                </router-link>
                <button @click="toggleLeftBar" type="button" class="leftbar-toggle-btn">
                    <font-awesome-icon :icon="['fas', 'bars']" />
                </button>
            </div>

            <nav class="topbar-nav" :class="$route.name == 'Home' ? 'p-l-1' : ''">
                <ul>
                    <li>
                        <router-link to="/cars">{{ $t('header.cars') }}</router-link>
                    </li>
                    <li>
                        <router-link to="/motorcycles">{{ $t('header.motorcycles') }}</router-link>
                    </li>
                </ul>

                <div>
                    <div class="nav-search-container">
                        <div class="search-n-settings" :class="!isSearchOpened ? '' : 'open'">
                            <div class="search-input-container">
                                <input
                                    id="global_search"
                                    v-model="searchQuery"
                                    @focus="setCursorOnTail($event)"
                                    @input="searchVehicles()"
                                    type="text"
                                    placeholder="Поиск по сайту"
                                />
                                <transition name="fade-clear-search">
                                    <div
                                        v-show="isSearchOpened && searchQuery != ''"
                                        class="clear-search"
                                        @click="clearSearchField"
                                    >
                                        <font-awesome-icon :icon="['fas', 'times']" />
                                    </div>
                                </transition>
                            </div>
                            <button class="settings-btn">
                                <font-awesome-icon :icon="['fas', 'sliders-h']" />
                            </button>
                            <div class="search-results-container">
                                <ul v-if="searchResults && searchResults.cars.length">
                                    <h3>{{ $t('header.cars') }}</h3>
                                    <li
                                        v-for="(manufacturer, index) in searchResults.cars"
                                        class="brands-dropdown"
                                        :key="index"
                                    >
                                        <button
                                            @click="toggleBrandList(manufacturer.brand, manufacturer.brand)"
                                        >
                                            <font-awesome-icon
                                                v-if="manufacturer.brand != selectedBrand"
                                                :icon="['fas', 'caret-right']"
                                            />
                                            <font-awesome-icon
                                                v-else
                                                :icon="['fas', 'caret-down']"
                                            />
                                            {{ manufacturer.brand }}
                                        </button>
                                        <transition-group
                                            tag="ul"
                                            v-if="manufacturer.brand == selectedBrand"
                                            name="search-brand-dropdown"
                                            class="dropdown-models"
                                        >
                                            <li
                                                v-for="(model) in manufacturer.models"
                                                :key="model"
                                            >
                                                <a
                                                    :href="'?brand=' + manufacturer.brand + '&model=' + model"
                                                    :target="_self"
                                                >{{ model }}</a>
                                            </li>
                                        </transition-group>
                                    </li>
                                </ul>

                                <ul v-if="searchResults && searchResults.motorcycles.length">
                                    <h3>{{ $t('header.motorcycles') }}</h3>
                                    <li
                                        v-for="(manufacturer, index) in searchResults.motorcycles"
                                        class="brands-dropdown"
                                        :key="index"
                                    >
                                        <button
                                            @click="toggleBrandList(manufacturer.brand, manufacturer.type)"
                                        >
                                            <font-awesome-icon :icon="['fas', 'caret-right']" />
                                            {{ manufacturer.brand }}
                                        </button>
                                        <transition-group
                                            tag="ul"
                                            v-if="manufacturer.brand == selectedBrand"
                                            name="search-brand-dropdown"
                                            class="dropdown-models"
                                        >
                                            <li
                                                v-for="(model) in manufacturer.models"
                                                :key="model"
                                            >
                                                <router-link
                                                    :to="'?brand=' + manufacturer.brand + '&model=' + model"
                                                >{{ model }}</router-link>
                                            </li>
                                        </transition-group>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <button class="toggle-search-btn" @click="toggleSearchField">
                            <transition-group name="rotate-search-icon">
                                <font-awesome-icon
                                    v-show="!isSearchOpened"
                                    :icon="['fas', 'search']"
                                    key="1"
                                />
                                <font-awesome-icon
                                    v-show="isSearchOpened"
                                    :icon="['fas', 'ban']"
                                    key="2"
                                />
                            </transition-group>
                        </button>
                    </div>

                    <lang-changer></lang-changer>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
import LangChanger from "./LangChanger";
import { TOGGLE_SITE_SEARCH } from "../../store/mutation-types";

const axios = require("axios").default;
const config = require("../../config");

export default {
    components: {
        LangChanger
    },
    data() {
        return {
            appName: config.app.name,
            appIcon: config.app.icon,
            searchQuery: "",
            searchResults: null,
            selectedBrand: null
        };
    },
    computed: {
        cars() {
            return this.$store.state.cars;
        },
        isSearchOpened() {
            return this.$store.getters.isSearchOpened;
        }
    },
    methods: {
        searchVehicles() {
            if (this.searchQuery != "") {
                axios
                    .post("/public/vehicles/search", {
                        search: this.searchQuery
                    })
                    .then(response => {
                        if (!response.data.status) {
                            console.log(response.data);
                            return (this.searchResults = null);
                        }

                        console.log(response.data.result);
                        return (this.searchResults = response.data.result);
                    })
                    .catch(error => {
                        console.log(error.response.data);
                        return (this.searchResults = null);
                    });
            }
        },
        toggleLeftBar() {
            document.getElementById("left_sidebar").classList.toggle("open");
        },
        toggleSearchField() {
            this.$store.commit(TOGGLE_SITE_SEARCH);
            if (this.isSearchOpened) {
                document.getElementById("global_search").focus();
            }
        },
        setCursorOnTail(e) {
            e.target.selectionStart = e.target.selectionEnd =
                e.target.value.length;
        },
        clearSearchField() {
            this.searchQuery = "";
            document.getElementById("global_search").focus();
        },
        toggleBrandList(brand, vehicleType) {
            return (this.selectedBrand =
                this.selectedBrand == brand ? "" : brand);
        }
    }
};
</script>
