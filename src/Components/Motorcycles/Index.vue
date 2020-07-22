<template>
    <div class="content-container">
        <div v-if="!motorcycleInfo" class="info-container">
            <div class="main-info empty-info">
                <h5 v-if="!isEmptyMotorcycleInfo">
                    <p class="arrow-left-notice">
                        <img :src="imagesFolder.icons + 'arrow-left.png'" alt />
                        <span>{{ $t( 'main_content.choose_from_list', {vehicle: $t('common.motorcycle')} ) }}</span>
                    </p>
                </h5>
                <h5 v-else="isEmptyMotorcycleInfo">
                    <p>{{ $t( 'main_content.empty_details_info') }}</p>
                    <p class="arrow-left-notice">
                        <img :src="imagesFolder.icons + 'arrow-left.png'" alt />
                        <span>{{ $t( 'main_content.choose_from_list', {vehicle: $t('common.motorcycle')} ) }}</span>
                    </p>
                    <p>
                        <span>{{ $t( 'main_content.report_about_problem') }}</span>
                    </p>
                </h5>
            </div>
        </div>
        <div v-else="motorcycleInfo" class="info-container">
            <div class="main-info info">
                <p
                    v-if="motorcycleInfo.totalInfo.description"
                    v-html="motorcycleInfo.totalInfo.description"
                >{{ motorcycleInfo.totalInfo.description }}</p>

                <div v-for="(paragraph) in motorcycleInfo.paragraphs">
                    <h3 v-if="paragraph.title">{{ paragraph.title }}</h3>
                    <p v-html="paragraph.description">{{ paragraph.description }}</p>
                </div>
            </div>

            <div class="common-info">
                <img
                    v-if="motorcycleInfo.totalInfo.main_image"
                    :src="imagesFolder.motorcycles + motorcycleInfo.totalInfo.main_image"
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
                            <td
                                v-html="motorcycleInfo.totalInfo.years"
                            >{{ motorcycleInfo.totalInfo.years }}</td>
                        </tr>

                        <tr v-if="motorcycleInfo.totalInfo.class">
                            <td>
                                <strong>Класс</strong>
                            </td>
                            <td
                                v-html="motorcycleInfo.totalInfo.class"
                            >{{ motorcycleInfo.totalInfo.class }}</td>
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
                motorcycles: config.app.images_folder.motorcycles,
                icons: config.app.images_folder.icons
            }
        };
    },
    mounted() {
        axios
            .get("/public/motorcycles/list")
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
        motorcycleInfo() {
            return this.$store.state.motorcycleModelDetails;
        },
        isEmptyMotorcycleInfo() {
            return this.$store.state.isEmptyMotorcycleModelDetails;
        }
    }
};
</script>
