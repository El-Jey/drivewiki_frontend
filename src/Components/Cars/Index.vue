<template>
    <div class="content-container">
        <div v-if="!carInfo" class="info-container">
            <div class="main-info empty-info">
                <h5 v-if="!isEmptyCarInfo">
                    <p class="arrow-left-notice">
                        <img :src="imagesFolder.icons + 'arrow-left.png'" alt />
                        <span>{{ $t( 'main_content.choose_from_list', {vehicle: $t('common.car')} ) }}</span>
                    </p>
                </h5>
                <h5 v-else="isEmptyCarInfo">
                    <p>{{ $t( 'main_content.empty_details_info') }}</p>
                    <p class="arrow-left-notice">
                        <img :src="imagesFolder.icons + 'arrow-left.png'" alt />
                        <span>{{ $t( 'main_content.choose_from_list', {vehicle: $t('common.car')} ) }}</span>
                    </p>
                    <p>
                        <span>{{ $t( 'main_content.report_about_problem') }}</span>
                    </p>
                </h5>
            </div>
        </div>
        <div v-else="carInfo" class="info-container">
            <div class="main-info info">
                <p
                    v-if="carInfo.totalInfo.description"
                    v-html="carInfo.totalInfo.description"
                >{{ carInfo.totalInfo.description }}</p>

                <div v-for="(paragraph, index) in carInfo.paragraphs" :key="index">
                    <h3>{{ paragraph.title }}</h3>
                    <p v-html="paragraph.description">{{ paragraph.description }}</p>
                </div>
            </div>

            <div class="common-info">
                <img
                    v-if="carInfo.totalInfo.main_image"
                    :src="imagesFolder.cars + carInfo.totalInfo.main_image"
                    :alt="carInfo.totalInfo.brand"
                />
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">Общие данные</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="carInfo.totalInfo.manufacturer">
                            <td>
                                <strong>Производитель</strong>
                            </td>
                            <td>{{ carInfo.totalInfo.manufacturer }}</td>
                        </tr>

                        <tr v-if="carInfo.totalInfo.years">
                            <td>
                                <strong>Годы производства</strong>
                            </td>
                            <td v-html="carInfo.totalInfo.years">{{ carInfo.totalInfo.years }}</td>
                        </tr>

                        <tr v-if="carInfo.totalInfo.class">
                            <td>
                                <strong>Класс</strong>
                            </td>
                            <td v-html="carInfo.totalInfo.class">{{ carInfo.totalInfo.class }}</td>
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
import { VEHICLES_LIST } from "../../store/mutation-types";

const axios = require("axios").default;

export default {
    components: { AppFooter },
    data() {
        return {
            imagesFolder: {
                cars: config.app.images_folder.cars,
                icons: config.app.images_folder.icons
            }
        };
    },
    mounted() {
        axios
            .get("/public/cars/list")
            .then(response => {
                this.$store.commit(VEHICLES_LIST, response.data.result);
                return;
            })
            .catch(error => {
                console.log(error);
                this.$store.commit(VEHICLES_LIST, null);
                return;
            });
    },
    computed: {
        carInfo() {
            return this.$store.state.carModelDetails;
        },
        isEmptyCarInfo() {
            return this.$store.state.isEmptyCarModelDetails;
        }
    }
};
</script>
