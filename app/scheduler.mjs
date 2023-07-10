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

        if(scheduleList[siteHash] == null || scheduleList[siteHash] == undefined) {
            scheduleList[siteHash] = [];
        }

        if(currentInQueue[siteHash] == null || currentInQueue[siteHash] == undefined) {
            currentInQueue[siteHash] = 0;
        }

        //here need to add database insert 

        scheduleList[siteHash].push(taskData);
        
    }

    async runTask(siteHash){
        let taskData = null;
        let result = null;

        //for manage 3 sec delay queue
        currentInQueue[siteHash] +=1;

        try {
            taskData  = JSON.parse(JSON.stringify(scheduleList[siteHash][0])) ;
            scheduleList[siteHash].shift()
        } catch(e){
            return;
        }

        if(taskData.type == "GET") {
            result = await this.makeGET(taskData.url);
        }

        if(taskData.type == "POST") {
            result = await this.makePOST(taskData.url, taskData.body);
        }

        //update databse here
        console.log(result)
        
        //call to clear task
    }

    clearTask(siteHash){
        try{
            //delete schedule list
            delete scheduleList[siteHash];
        } catch(e){

        }
        try{
            currentInQueue[siteHash] -=1;
        } catch(e){

        }
    }

    async makePOST(url, body){
        console.log(url, body)
        const result =  await axios.post(url, body.prompt, { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ siteSettings.tnlTokens
        } );

        return result.data;
    }

    async makeGET(url){
        const result = await axios.get(url)
    }

    sheculeExecute(){
        setInterval(function(){

            //check are there any process to run when schedule list is 0
            let currentSiteHash = null;
            for(let siteHash of Object.keys(scheduleList)){
                currentSiteHash = siteHash
                if(scheduleList[siteHash].length > 0 && currentInQueue[siteHash] < this.taskCap) {
                    this.runTask(siteHash);
                }
            }

        }.bind(this), 10);

        setInterval(function() {
            let currentSiteHash = null;
            for(let siteHash of Object.keys(scheduleList)){
                console.log(siteHash, scheduleList[siteHash])
            }
        }.bind(this), 2000);
    }
}

export default scheduleTask = new scheduleTask();