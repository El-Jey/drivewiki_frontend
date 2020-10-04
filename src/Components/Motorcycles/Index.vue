<template>
    <div class="content-container">
        <div v-if="!motorcycleInfo" class="info-container">
            <div class="main-info empty-info">
                <h5 v-if="!isEmptyMotorcycleInfo">
                    <p class="arrow-left-notice">
                        <img :src="imagesFolder.icons + 'arrow-left.png'" alt />
                        <span>{{
                            $t("main_content.choose_from_list", {
                                vehicle: $t("common.motorcycle"),
                            })
                        }}</span>
                    </p>
                </h5>
                <h5 v-else>
                    <p>{{ $t("main_content.empty_details_info") }}</p>
                    <p class="arrow-left-notice">
                        <img :src="imagesFolder.icons + 'arrow-left.png'" alt />
                        <span>{{
                            $t("main_content.choose_from_list", {
                                vehicle: $t("common.motorcycle"),
                            })
                        }}</span>
                    </p>
                    <p>
                        <span>{{
                            $t("main_content.report_about_problem")
                        }}</span>
                    </p>
                </h5>
            </div>
        </div>
        <div v-else class="info-container">
            <div class="main-info info">
                <p
                    v-if="motorcycleInfo.totalInfo.description"
                    v-html="motorcycleInfo.totalInfo.description"
                >
                    {{ motorcycleInfo.totalInfo.description }}
                </p>

                <div
                    v-for="(paragraph, index) in motorcycleInfo.paragraphs"
                    :key="index"
                >
                    <h3 v-if="paragraph.title">{{ paragraph.title }}</h3>
                    <p v-html="paragraph.description">
                        {{ paragraph.description }}
                    </p>
                </div>
            </div>

            <div class="common-info">
                <img
                    v-if="motorcycleInfo.totalInfo.main_image"
                    :src="
                        imagesFolder.motorcycles +
                        motorcycleInfo.totalInfo.main_image
                    "
                    :alt="motorcycleInfo.totalInfo.brand"
                />
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">Общие данные</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="motorcycleInfo.totalInfo.manufacturer">
                            <td>
                                <strong>Производитель</strong>
                            </td>
                            <td>{{ motorcycleInfo.totalInfo.manufacturer }}</td>
                        </tr>

                        <tr v-if="motorcycleInfo.totalInfo.years">
                            <td>
                                <strong>Годы производства</strong>
                            </td>
                            <td v-html="motorcycleInfo.totalInfo.years">
                                {{ motorcycleInfo.totalInfo.years }}
                            </td>
                        </tr>

                        <tr v-if="motorcycleInfo.totalInfo.class">
                            <td>
                                <strong>Класс</strong>
                            </td>
                            <td v-html="motorcycleInfo.totalInfo.class">
                                {{ motorcycleInfo.totalInfo.class }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <app-footer></app-footer>
    </div>
</template>

<script>
import AppFooter from "./../Common/AppFooter";
import config from "../../config";
import {
    IS_EMPTY_MOTORCYCLE_DETAILS,
    MOTORCYCLE_DETAILS,
    SELECTED_BRAND,
    SET_CURRENT_VEHICLE_TYPE,
    VEHICLES_MODELS_LIST,
    VEHICLES_SETTINGS,
} from "../../store/mutation-types";

const axios = require("axios").default;

export default {
    components: { AppFooter },
    data() {
        return {
            imagesFolder: {
                motorcycles: config.app.images_folder.motorcycles,
                icons: config.app.images_folder.icons,
            },
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if (from.name) {
                // The route was changed, but the page was not updated
                document
                    .getElementById("vehiclesNavList")
                    .classList.toggle("open");
            }

            if (!vm.$helpers.isEmptyObject(vm.$route.query)) {
                vm.$store.commit(SELECTED_BRAND, to.query.brand);
                vm.getModelDetails(to.query.brand, to.query.model);
            }
        });
    },
    beforeRouteUpdate(to, from, next) {
        if (!this.$helpers.isEmptyObject(to.query)) {
            this.getModelDetails(to.query.brand, to.query.model);
            next();
        }
    },
    mounted() {
        axios
            .get("/public/motorcycles/list")
            .then((response) => {
                this.$store.commit(VEHICLES_MODELS_LIST, response.data.result);
                return;
            })
            .catch((error) => {
                console.log(error);
                this.$store.commit(VEHICLES_MODELS_LIST, null);
                return;
            });
    },
    computed: {
        isEmptyMotorcycleInfo() {
            return this.$store.state.isEmptyMotorcycleModelDetails;
        },
        motorcycleInfo() {
            return this.$store.state.motorcycleModelDetails;
        },
    },
    methods: {
        getModelDetails(brand, model) {
            if (this.selectedModel == model) {
                return;
            }

            this.selectedModel = model;

            axios
                .get("/public/motorcycles/model", {
                    params: { brand: brand, model: model },
                })
                .then((response) => {
                    if (!response.data.status) {
                        console.log(
                            "Error in retrieving data: \r\n",
                            response.data
                        ); // TODO: обработка всех ошибок
                        this.$store.commit(MOTORCYCLE_DETAILS, null);
                        this.$store.commit(IS_EMPTY_MOTORCYCLE_DETAILS, true);
                        return;
                    }

                    this.$store.commit(
                        MOTORCYCLE_DETAILS,
                        response.data.result
                    );
                    this.$store.commit(IS_EMPTY_MOTORCYCLE_DETAILS, false);
                    document
                        .getElementById("left_sidebar")
                        .classList.remove("open");
                    return;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
