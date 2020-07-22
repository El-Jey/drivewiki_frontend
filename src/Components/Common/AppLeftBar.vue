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
                <a @click="toggleLeftSideDropList(vehicle.brand, $event)">
                    <font-awesome-icon
                        v-if="vehicle.brand != selectedBrand"
                        class="caret-icon"
                        :icon="['fas', 'caret-right']"
                    />
                    <font-awesome-icon
                        v-else
                        class="caret-icon"
                        :icon="['fas', 'caret-down']"
                    />

                    <span>{{ vehicle.brand }}</span>
                </a>
                <transition name="leftside-dropdown">
                    <ul v-if="vehicle.brand == selectedBrand">
                        <li
                            v-for="(model) in vehicle.models"
                            class="dropdown-item"
                            :key="model"
                        >
                            <router-link
                            :to="{ query: {brand: `${vehicle.brand}`, model: `${model}`}}" append
                            >{{ model }}</router-link>
                        </li>
                    </ul>
                </transition>
            </li>
        </ul>
    </div>
</template>

<script>
import { CAR_DETAILS, IS_EMPTY_CAR_DETAILS } from "../../store/mutation-types";

const axios = require("axios").default;

export default {
    data() {
        return {
            selectedBrand: "",
            // selectedModel: "",
            vehicleTypes: null
        };
    },
    created() {
        axios
            .get("/public/vehicles/types")
            .then(response => {
                console.log(response.data);
                return;
            })
            .catch(error => {
                console.log(error);
            });
    },
    computed: {
        vehicles() {
            return this.$store.state.vehicles;
        }
    },
    methods: {
        // getModelDetails(brand, model, e) {
        //     if (e) {
        //         e.preventDefault();
        //     }

        //     if (this.selectedModel == model) {
        //         return;
        //     }

        //     this.selectedModel = model;

        //     axios
        //         .get("/public/cars/model", { params: { brand, model } })
        //         .then(response => {
        //             if (!response.data.status) {
        //                 console.log(
        //                     "Error in retrieving data: \r\n",
        //                     response.data
        //                 ); // TODO: обработка всех ошибок
        //                 this.$store.commit(CAR_DETAILS, null);
        //                 this.$store.commit(IS_EMPTY_CAR_DETAILS, true);
        //                 return;
        //             }

        //             this.$store.commit(CAR_DETAILS, response.data.result);
        //             this.$store.commit(IS_EMPTY_CAR_DETAILS, false);
        //             document
        //                 .getElementById("left_sidebar")
        //                 .classList.toggle("open");
        //             return;
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // },
        toggleLeftSideDropList(brand, e) {
            if (e) {
                e.preventDefault();
            }
            return this.selectedBrand = this.selectedBrand == brand ? "" : brand;
        }
    }
};
</script>
