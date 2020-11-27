<template>
    <footer class="site-footer">
        <div>
            <span>{{ appName }}&copy; {{ year }}</span>
        </div>
    </footer>
</template>

<script>
import config from "@/config";

export default {
    data() {
        return {
            appName: config.app.name,
            year: new Date().getFullYear()
        };
    }
};
</script>
