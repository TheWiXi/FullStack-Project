const {ObjectId} = require('mongodb')

module.exports = class salasDto {
    
    templateSuccesfullSearch(arg) {
        return {
            status: 200,
            data: arg
        }
    }

    formatObjectId(arg) {
        return ObjectId.createFromHexString(arg)
    }

}