<template>
    <div class="loading-container">
        <div class="circle circle_spinner"></div>
        <p class="circle_caption" v-if="loadingData">{{ $t(loadingData.textKey) }}</p>
    </div>
</template>

<script>
export default {
    computed: {
        loadingData() {
            return this.$store.state.loadingData;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.loading-container {
    align-items: center;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: fixed;
    width: 100%;
    z-index: 10;

    .circle {
        border: 10px solid rgba($button-primary-background-color, 0.5);
        border-right: 10px solid $button-primary-background-color;
        border-radius: 50%;
        height: 10em;
        width: 10em;

        &.circle_spinner {
            animation: rotation 1s linear infinite;
        }
    }

    .circle_caption {
        font-weight: 400;
        margin-top: 0.5em;
    }
}

@keyframes rotation {
    100% {
        transform: rotate(360deg);
    }
}
</style>