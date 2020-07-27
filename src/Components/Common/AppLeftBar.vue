<template>
    <div id="left_sidebar">
        <div class="sidebar-home-link">
            <a href="/">
                <span>{{ $t('main_content.home_link') }}</span>
            </a>
        </div>

        <ul class="sidebar-list">
            <li
                v-for="(vehicle) in vehicles"
                class="sidebar-dropdown"
                :class="vehicle.brand != selectedBrand ? '' : 'dropdown-active'"
                :key="vehicle.brand"
            >
                <button @click="toggleLeftSideDropList(vehicle.brand, $event)">
                    <font-awesome-icon
                        v-if="vehicle.brand != selectedBrand"
                        class="caret-icon"
                        :icon="['fas', 'caret-right']"
                    />
                    <font-awesome-icon v-else class="caret-icon" :icon="['fas', 'caret-down']" />

                    <span>{{ vehicle.brand }}</span>
                </button>
                <transition name="leftside-dropdown">
                    <ul v-if="vehicle.brand == selectedBrand">
                        <li v-for="(model) in vehicle.models" class="dropdown-item" :key="model">
                            <router-link
                                :to="{ query: {brand: `${vehicle.brand}`, model: `${model}`}}"
                                append
                            >{{ model }}</router-link>
                        </li>
                    </ul>
                </transition>
            </li>
        </ul>
    </div>
</template>

<script>
import {
    SELECTED_BRAND,
    CAR_DETAILS,
    IS_EMPTY_CAR_DETAILS,
} from "../../store/mutation-types";

const axios = require("axios").default;

export default {
    data() {
        return {
            // selectedBrand: "",
            // selectedModel: "",
            vehicleTypes: null,
        };
    },
    created() {
        axios
            .get("public/vehicles/types")
            .then((response) => {
                console.log(response.data);
                return;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    computed: {
        vehicles() {
            return this.$store.state.vehicles;
        },
        selectedBrand() {
            return this.$store.state.selectedBrand;
        },
    },
    methods: {
        toggleLeftSideDropList(brand, e) {
            return this.$store.commit(SELECTED_BRAND, brand);
        }
    }
}
</script>
