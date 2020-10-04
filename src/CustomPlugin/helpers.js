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
    }
};