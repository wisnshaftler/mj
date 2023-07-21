import axios from "axios";
import siteSettings from "../config.mjs";
import dbconnection from "./dbconnection.mjs";

const scheduleList = {};
const currentInQueue = {};

class scheduleTask {
    taskCap = 3;
    rateLimit = 3; //in seconds

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

        console.log("task added");

        //here need to add database insert
        let query = `insert into jobs (uniqueRequestHash, customerId, siteHash, prompt, progress ) values ( '${body.uniqueRequestHash}', '${body.customerId}', '${siteHash}', '${body.prompt}', '0' )`;
        dbconnection.query(query );
        
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
        let query = `update jobs set tnlMessageId = ? where uniqueRequestHash = ?`;
        dbconnection.query(query, [ result.data.messageId, taskData.body.uniqueRequestHash ]);
    }

    clearTask(siteHash, ref) {
        console.log("task cleared", siteHash);
        console.log(JSON.stringify(scheduleList));
        try {
            //delete schedule list
            scheduleList[siteHash] =scheduleList[siteHash].filter(task => task.uniqueRequestHash!= ref);
        } catch (e) {

        }
        try {
            currentInQueue[siteHash] -= 1;
            console.log("currentLog in queue" ,currentInQueue[siteHash])
            console.log(currentInQueue)
        } catch (e) {

        }
    }

    async makePOST(url, body) {
        let result = null;

        const reqBody = {};
        reqBody.msg = body.prompt;
        reqBody.ref = body.uniqueRequestHash;
        reqBody.webhook = body.webhook

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
        const result = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ siteSettings.tnlTokens
            }
        })
        return result,data;
    }

    sheculeExecute() {

        const nextExecuteIsIN = {};

        setInterval(function () {

            //check are there any process to run when schedule list is 0
            let currentSiteHash = null;
            for (let siteHash of Object.keys(scheduleList)) {
                currentSiteHash = siteHash;

                if (nextExecuteIsIN[siteHash] == null || nextExecuteIsIN == undefined) {
                    nextExecuteIsIN[siteHash] = 0;
                }

                if (scheduleList[siteHash].length > 0 && currentInQueue[siteHash] < this.taskCap) {
                    const currentTime = Date.now();

                    if (nextExecuteIsIN[siteHash] > currentTime) { //check 3 seconds delay
                        continue;
                    }

                    nextExecuteIsIN[siteHash] = currentTime + this.rateLimit * 3000;

                    this.runTask(siteHash);
                }
            }

        }.bind(this), 10);

    }

    //get from DB and check if it is completed 
    async checkCompleted(uniqueRequestHash) {
        let query = `select * from jobs where progress = 0`;
        const dbdata = await dbconnection.query(query);

        console.log(dbdata); 
        for (let i = 0; i < dbdata.length; i++) {
            const currentInQueue = dbdata[i];
            //get tnlMessageId
            const tnlMessageId = currentInQueue['tnlMessageId'];
            //check with tnl
            const result = await this.makeGET(siteSettings.tnlStatus + tnlMessageId);
            
            console.log(result);
            return
            if (result.status == 200 && result.data.status == "completed") {
                //update database
                let query = `update jobs set progress = 1 where uniqueRequestHash =?`;
                dbconnection.query(query, [ currentInQueue['uniqueRequestHash'] ]);
            }
            
        }

        await new Promise(resolve => setTimeout(resolve, 5000)); // 3 sec
    }
}

export default scheduleTask = new scheduleTask();