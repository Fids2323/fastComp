const displayPublishedDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const now = Date.now();
    const timePassed = (now - parseInt(timestamp)) / 1000 / 60;

    if (timePassed === 0) {
        return "сейчас";
    }
    if (timePassed <= 1) {
        return "1 минуту назад";
    }
    if (timePassed > 1 && timePassed <= 5) {
        return "5 минут назад";
    }
    if (timePassed > 5 && timePassed <= 10) {
        return "10 минут назад";
    }
    if (timePassed > 10 && timePassed <= 30) {
        return "30 минут назад";
    }
    if (timePassed > 30 && timePassed <= 60 * 24) {
        return date.getHours() + ":" + date.getMinutes();
    }
    if (timePassed > 60 * 24 && timePassed <= 60 * 24 * 30 * 12) {
        return date.toLocaleString("default", {
            month: "long",
            day: "numeric"
        });
    }
    if (timePassed > 60 * 24 * 30 * 12) {
        return (
            date.getDate() +
            "." +
            (date.getMonth() + 1) +
            "." +
            date.getFullYear()
        );
    }
};

export default displayPublishedDate;
