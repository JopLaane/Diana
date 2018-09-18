const funcs = {
    getDateAndTime: () => {
        let today = new Date();
        let day = (today.getDate()<10?'0':'') + today.getDate();
        let dayForArray = today.getDay();
        let month = today.getMonth() + 1;
        let monthForArray = today.getMonth();
        let monthList = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
        let year = today.getFullYear();
        let daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
        let hours = (today.getHours()<10?'0':'') + today.getHours();
        let mins = (today.getMinutes()<10?'0':'') + today.getMinutes();
        let secs = (today.getSeconds()<10?'0':'') + today.getSeconds();
        return `\`${daylist[dayForArray]} ${day} ${monthList[monthForArray]} [${day}/${(month<10?'0':'')+month}/${year}] - ${hours}:${mins}:${secs} CEST\``;
    },

    getDayFromUnixTimeStamp: (UNIX_timestamp) => {
        let today = new Date(UNIX_timestamp);
        let day = (today.getDate()<10?'0':'') + today.getDate();
        let dayForArray = today.getDay();
        let month = today.getMonth() + 1;
        let monthForArray = today.getMonth();
        let monthList = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
        let year = today.getFullYear();
        let daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
        let hours = (today.getHours()<10?'0':'') + today.getHours();
        let mins = (today.getMinutes()<10?'0':'') + today.getMinutes();
        let secs = (today.getSeconds()<10?'0':'') + today.getSeconds();
        return `\`${daylist[dayForArray]} ${day} ${monthList[monthForArray]} [${day}/${(month<10?'0':'')+month}/${year}] - ${hours}:${mins}:${secs} CEST\``;
    },

    getTime: () => {
        let d = new Date();
        let hours = (d.getHours()<10?'0':'') + d.getHours();
        let mins = (d.getMinutes()<10?'0':'') + d.getMinutes();
        let secs = (d.getSeconds()<10?'0':'') + d.getSeconds();
        return `[${hours}:${mins}:${secs}]`;
    }
}

module.exports = funcs;
