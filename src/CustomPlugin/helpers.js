export default {
    isEmptyObject(object) {
        for (let key in object) {
            return false;
        }
        return true; // Empty
    }
};