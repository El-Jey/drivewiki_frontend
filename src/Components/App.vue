<template>
    <div>
        <loading-circle v-if="loadingCircle"></loading-circle>
        <app-header></app-header>

        <main class="site-main h-100">
            <div class="site-container h-100">
                <app-left-bar v-if="$route.name == 'Home' ? false : true"></app-left-bar>

                <transition name="sideShift">
                    <router-view></router-view>
                </transition>
            </div>
        </main>
    </div>
</template>

<script>
import AppHeader from "./Common/AppHeader";
import AppLeftBar from "./Common/AppLeftBar";
import LoadingCircle from "./Common/LoadingCircle";
import { TOGGLE_SITE_SEARCH } from "../store/mutation-types";

export default {
    components: {
        AppHeader,
        AppLeftBar,
        LoadingCircle,
    },
    computed: {
        isSearchOpened() {
            return this.$store.getters.isSearchOpened;
        },
        loadingCircle() {
            let loading = this.$store.state.loadingCircle;
            return loading;
        },
    },
    mounted() {
        document.body.addEventListener("click", (e) => {
            if (e.target.closest(".top-search-container")) {
                return;
            }
            if (!this.isSearchOpened) {
                return;
            }
            this.$store.commit(TOGGLE_SITE_SEARCH);
        });

        let touchStartX = 0,
            touchEndX = 0;
        document.body.addEventListener("touchstart", (e) => {
            if (e.changedTouches[0].clientY <= 50) {
                // Don`t handle on header
                return;
            }
            touchStartX = e.changedTouches[0].clientX;
        });

        document.body.addEventListener("touchend", (e) => {
            if (e.changedTouches[0].clientY <= 50) {
                // Don`t handle on header
                return;
            }

            touchEndX = e.changedTouches[0].clientX;
            let leftSidebar = document.getElementById("left_sidebar"),
                diffX = touchStartX - touchEndX;
            if (touchStartX <= 250) {
                // Swipe right
                if (diffX < 0 && !leftSidebar.classList.contains("open")) {
                    leftSidebar.classList.add("open");
                }
                // Swipe left
                else if (diffX > 0 && leftSidebar.classList.contains("open")) {
                    leftSidebar.classList.remove("open");
                }
            }
        });
    },
};
</script>
