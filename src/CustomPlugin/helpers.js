const axios = require("axios").default;

export default {
    isEmptyObject(object) {
        for (let key in object) {
            return false;
        }
        return true; // Empty
    },
    toggleDocumentScroll() {
        let doc = document.getElementsByTagName("html")[0];
        doc.classList.toggle("unscrollable");
    },
    getCurrentVehicleType(vehiclesSettings, route) {
        return vehiclesSettings.filter((vehicle) => {
            return vehicle.route == route;
        });
    },
    getVehicleSettings() {
        return new Promise((resolve, reject) => {
            axios
                .get("public/vehicles/types")
                .then((response) => {
                    return resolve(response.data.result);
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    }
};