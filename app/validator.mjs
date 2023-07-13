class validator {
    notFalsy (data) {
        if (data == null || data == undefined) {
            return false;
        }
        return true;
    }

    isFalsy(data) {
        if (data == null || data == undefined) {
            return true;
        }
        return false;
    }

    isArray (data) {
        if (Array.isArray(data)){
            return true;
        }
        return false;
    }

    isObject(data){
        if(typeof(data) === "object"){
            return true;
        }
        return false;
    }
}

export default validator = new validator();