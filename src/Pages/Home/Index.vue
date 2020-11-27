<template>
    <div class="home content-container">
        <div class="info-container">
            <h1>{{ $t('main_content.home_welcome') }}</h1>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import AppFooter from "@/Components/Layout/AppFooter";

export default {
    name: "app",
    components: {
        AppFooter,
    },
};
</script>
