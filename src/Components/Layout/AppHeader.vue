<template>
    <header class="site-topbar">
        <div class="site-container">
            <div
                v-if="$route.name == 'Home' ? false : true"
                class="topbar-left"
            >
                <router-link
                    to="/"
                    class="topbar-brand"
                >
                    <img
                        :src="appIcon"
                        alt
                    />
                    <span>{{ appName }}</span>
                </router-link>
                <button
                    @click="toggleLeftBar"
                    type="button"
                    class="leftbar-toggle-btn"
                >
                    <font-awesome-icon :icon="['fas', 'bars']" />
                </button>
            </div>

            <div class="topbar-right">
                <div class="vehicles-nav_container">
                    <button
                        class="vehicles-nav_toggle"
                        @click="vehiclesNavListToggle()"
                    >
                        <div>
                            <span v-if="currentVehicleType">{{ $t("header." + currentVehicleType.translate_key) }}</span>

                            <span v-else>{{ $t("header.vehicle") }}</span>
                            <font-awesome-icon :icon="['fas', 'chevron-down']" />
                        </div>
                    </button>
                    <ul
                        v-if="vehiclesSettings"
                        class="vehicles-nav_list"
                        id="vehiclesNavList"
                    >
                        <li
                            v-for="vehicleData in vehiclesSettings"
                            :key="vehicleData.route"
                        >
                            <router-link :to="vehicleData.route">{{ $t("header." + vehicleData.translate_key) }}</router-link>
                        </li>
                    </ul>

                    <ul
                        v-else
                        class="vehicles-nav_list"
                        id="vehiclesNavList"
                    >
                        <li>
                            <span>{{ $t("header.vehiclesError") }}</span>
                        </li>
                    </ul>
                </div>

                <div
                    class="utils-nav_container"
                    :class="!isSearchOpened ? '' : 'extended'"
                >
                    <div class="topbar-search-container">
                        <div class="search-n-settings">
                            <div class="search-input-container">
                                <input
                                    id="global_search"
                                    v-model="search.query"
                                    @focus="setCursorOnTail()"
                                    @input="searchVehicles()"
                                    type="text"
                                    placeholder="Поиск по сайту"
                                    autocomplete="off"
                                />
                                <transition name="fade-clear-search">
                                    <div
                                        v-show="isSearchOpened && search.query != ''"
                                        class="clear-search"
                                        @click="clearSearch()"
                                    >
                                        <font-awesome-icon :icon="['fas', 'times']" />
                                    </div>
                                </transition>
                            </div>
                            <button
                                class="settings-btn"
                                @click="toggleFilters()"
                            >
                                <font-awesome-icon :icon="['fas', 'sliders-h']" />
                            </button>
                            <div
                                class="search-settings__container"
                                ref="globalSearchFilters"
                            >
                                <div
                                    class="search-settings"
                                    v-if="isSearchOpened && vehiclesSettings"
                                >
                                    <h3 class="header">Фильтры</h3>
                                    <div class="setting setting-types">
                                        <p class="header">{{ $t("header.vehicle") }}</p>
                                        <div class="body">
                                            <label class="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    v-model="checkmarkAllTypes"
                                                >
                                                {{ $t("header.search_settings.all") }}
                                            </label>
                                            <label
                                                class="checkbox-label"
                                                v-for="vehicle in vehiclesSettings"
                                                :key="vehicle.id"
                                            >
                                                <input
                                                    type="checkbox"
                                                    :value="vehicle.id"
                                                    v-model="checkedVehicles"
                                                >
                                                {{ $t("header.search_settings." + vehicle.translate_key) }}
                                            </label>
                                        </div>
                                        <p class="footer">Выберите транспортное средство</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="search-results__container"
                                v-if="search.query != ''"
                            >
                                <div class="search-results">
                                    <div
                                        v-if="!search.results.data"
                                        class="empty-results"
                                    >
                                        <h3>
                                            {{ $t("header.empty_search_results") }}
                                        </h3>
                                    </div>

                                    <div v-else>
                                        <ul v-if="search.results.data.cars.length">
                                            <h3>{{ $t("header.cars") }}</h3>
                                            <li
                                                v-for="(manufacturer,
                                                index) in search.results.data.cars"
                                                class="brands-dropdown"
                                                :key="index"
                                            >
                                                <button @click="toggleBrandList(manufacturer.brand, manufacturer.type)">
                                                    <font-awesome-icon
                                                        v-if="manufacturer.brand === search.results.selected.brand && manufacturer.type === search.results.selected.type"
                                                        :icon="['fas', 'caret-down']"
                                                    />
                                                    <font-awesome-icon
                                                        v-else
                                                        :icon="['fas', 'caret-right']"
                                                    />
                                                    <span>{{ manufacturer.brand }}</span>
                                                </button>
                                                <transition-group
                                                    tag="ul"
                                                    v-if="manufacturer.brand === search.results.selected.brand && manufacturer.type === search.results.selected.type"
                                                    name="search-brand-dropdown"
                                                    class="dropdown-models"
                                                >
                                            <li
                                                v-for="model in manufacturer.models"
                                                :key="model"
                                            >
                                                <a :href="'/cars?brand=' + manufacturer.brand + '&model=' + model">{{ model }}</a>
                                            </li>
                                            </transition-group>
                                            </li>
                                        </ul>

                                        <ul v-if="search.results.data.motorcycles.length">
                                            <h3>{{ $t("header.motorcycles") }}</h3>
                                            <li
                                                v-for="(manufacturer,
                                                index) in search.results.data.motorcycles"
                                                class="brands-dropdown"
                                                :key="index"
                                            >
                                                <button @click="toggleBrandList(manufacturer.brand, manufacturer.type)">
                                                    <font-awesome-icon
                                                        v-if="manufacturer.brand === search.results.selected.brand && manufacturer.type === search.results.selected.type"
                                                        :icon="['fas', 'caret-down']"
                                                    />
                                                    <font-awesome-icon
                                                        v-else
                                                        :icon="['fas', 'caret-right']"
                                                    />
                                                    <span>{{ manufacturer.brand }}</span>
                                                </button>
                                                <transition-group
                                                    tag="ul"
                                                    v-if="manufacturer.brand === search.results.selected.brand && manufacturer.type === search.results.selected.type"
                                                    name="search-brand-dropdown"
                                                    class="dropdown-models"
                                                >
                                            <li
                                                v-for="model in manufacturer.models"
                                                :key="model"
                                            >
                                                <router-link :to="'/motorcycles?brand=' +  manufacturer.brand + '&model=' + model">{{ model }}</router-link>
                                            </li>
                                            </transition-group>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            class="toggle-search-btn"
                            @click="toggleSearchField"
                        >
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
            </div>
        </div>
    </header>
</template>

<script>
import LangChanger from "@/Components/LangChanger";
import { TOGGLE_SITE_SEARCH } from "@/store/mutation-types";
import { bus } from "@/bus";
import config from "@/config";

const axios = require("axios").default;

export default {
    components: {
        LangChanger,
    },
    data() {
        return {
            appName: config.app.name,
            appIcon: config.app.icon,
            checkedVehicles: [],
            search: {
                query: "",
                results: {
                    data: null,
                    selected: {
                        brand: "",
                        type: "",
                    },
                },
            },
        };
    },
    computed: {
        cars() {
            return this.$store.state.cars;
        },
        currentVehicleType() {
            return this.$store.state.currentVehicleType;
        },
        isSearchOpened() {
            return this.$store.getters.isSiteSearchOpened;
        },
        vehiclesSettings() {
            return this.$store.state.vehiclesSettings;
        },
        checkmarkAllTypes: {
            get: function () {
                return this.vehiclesSettings
                    ? this.vehiclesSettings.length ==
                          this.checkedVehicles.length
                    : false;
            },
            set: function (value) {
                if (value) {
                    let checked = [];
                    this.vehiclesSettings.forEach((vehicle) => {
                        checked.push(vehicle.id);
                    });
                    this.checkedVehicles = checked;
                } else {
                    this.checkedVehicles = [];
                }
            },
        },
    },
    created() {
        bus.$on("clearVehiclesSearch", this.clearSearch);
    },
    methods: {
        clearSearch() {
            this.search.query = "";
            this.search.results.data = null;

            if (this.isSearchOpened) {
                document.getElementById("global_search").focus();
            }
        },
        searchVehicles() {
            if (this.search.query != "") {
                document
                    .querySelectorAll(".search-settings .footer")
                    .forEach((element) => {
                        if (element.classList.contains("visible")) {
                            element.classList.remove("visible");
                        }
                    });

                if (this.validateSearchFilters()) {
                    axios
                        .post("/public/vehicles/search", {
                            searchString: this.search.query,
                            filters: {
                                vehicles: this.checkedVehicles,
                            },
                        })
                        .then((response) => {
                            if (!response.data.status) {
                                return (this.search.results.data = null);
                            }

                            return (this.search.results.data =
                                response.data.result);
                        })
                        .catch((error) => {
                            return (this.search.results.data = null);
                        });
                } else {
                    if (
                        !this.$refs.globalSearchFilters.classList.contains(
                            "visible"
                        )
                    ) {
                        this.toggleFilters();
                    }
                }
            }
        },
        setCursorOnTail() {
            event.target.selectionStart = event.target.selectionEnd =
                event.target.value.length;
        },
        toggleBrandList(brand, vehicleType) {
            let selected = this.search.results.selected;

            if (selected.brand === brand && selected.type === vehicleType) {
                selected.brand = "";
                selected.type = "";
                return;
            }

            selected.brand = brand;
            selected.type = vehicleType;
        },
        toggleFilters() {
            this.$refs.globalSearchFilters.classList.toggle("visible");
        },
        toggleLeftBar() {
            document.getElementById("left_sidebar").classList.toggle("open");
        },
        toggleSearchField() {
            this.$store.commit(TOGGLE_SITE_SEARCH);
            if (this.isSearchOpened) {
                document.getElementById("global_search").focus();
            } else {
                this.clearSearch();
            }
        },
        validateSearchFilters() {
            let valid = true;

            if (!this.checkedVehicles.length) {
                document
                    .querySelector(".setting-types .footer")
                    .classList.add("visible");
                valid = false;
            }

            return valid;
        },
        vehiclesNavListToggle() {
            document.getElementById("vehiclesNavList").classList.toggle("open");
        },
    },
    watch: {
        vehiclesSettings(value) {
            if (!Array.isArray(value)) {
                return;
            }
            this.checkmarkAllTypes = value;
        },
    },
};
</script>
