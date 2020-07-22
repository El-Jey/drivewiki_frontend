export default {
    isEmptyObject(object) {
        for (let key in object) {
            // если тело цикла начнет выполняться - значит в объекте есть свойства
            return false;
        }
        return true;
    }
};