import axios from "axios";
import siteSettings from "../config.mjs";

const scheduleList = {};
const currentInQueue = {};

class scheduleTask {
    taskCap = 3;
    constructor() {
        this.sheculeExecute()
        console.log("in the schedular")
    }

    addTask(url, siteHash, type, body, callback) {
        const taskData = {};
        taskData.url = url;
        taskData.siteHash = siteHash;
        taskData.type = type;
        taskData.body = body;
        taskData.callback = callback;

        if (scheduleList[siteHash] == null || scheduleList[siteHash] == undefined) {
            scheduleList[siteHash] = [];
        }

        if (currentInQueue[siteHash] == null || currentInQueue[siteHash] == undefined) {
            currentInQueue[siteHash] = 0;
        }

        //here need to add database insert 

        scheduleList[siteHash].push(taskData);

    }

    async runTask(siteHash) {
        let taskData = null;
        let result = null;

        //for manage 3 sec delay queue
        currentInQueue[siteHash] += 1;

        try {
            taskData = JSON.parse(JSON.stringify(scheduleList[siteHash][0]));
            scheduleList[siteHash].shift()
        } catch (e) {
            return;
        }

        if (taskData.type == "GET") {
            result = await this.makeGET(taskData.url);
        }

        if (taskData.type == "POST") {
            result = await this.makePOST(taskData.url, taskData.body);
        }

        //update databse here
        console.log("reustl goes here");
        console.log("taskData", taskData)
        console.log("result.data", result.data)

        //call to clear task
    }

    clearTask(siteHash) {
        try {
            //delete schedule list
            delete scheduleList[siteHash];
        } catch (e) {

        }
        try {
            currentInQueue[siteHash] -= 1;
        } catch (e) {

        }
    }

    async makePOST(url, body) {
        let result = null;
        console.log(body)
        console.log(siteSettings.tnlTokens)

        const reqBody = {};
        reqBody.msg = body.prompt;
        reqBody.ref = body.uniqueRquestHash;
        reqBody.webhook = ""

        console.log(reqBody)
        try {
            result = await axios.post(url, reqBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + siteSettings.tnlTokens
                }
            });

        } catch (e) {
            return { data: e };
        }

        return result;
    }

    async makeGET(url) {
        const result = await axios.get(url)
    }

    sheculeExecute() {
        setInterval(function () {

            //check are there any process to run when schedule list is 0
            let currentSiteHash = null;
            for (let siteHash of Object.keys(scheduleList)) {
                currentSiteHash = siteHash
                if (scheduleList[siteHash].length > 0 && currentInQueue[siteHash] < this.taskCap) {
                    this.runTask(siteHash);
                }
            }

        }.bind(this), 10);
    }
}

export default scheduleTask = new scheduleTask();