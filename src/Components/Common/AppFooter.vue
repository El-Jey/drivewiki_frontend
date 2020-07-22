<template>
    <footer class="site-footer">
        <div>
            <span>{{ appName }}&copy; {{ year }}</span>
        </div>
    </footer>
</template>

<script>
const config = require("../../config");

export default {
    data() {
        return {
            appName: config.app.name,
            year: new Date().getFullYear()
        };
    }
};
</script>
