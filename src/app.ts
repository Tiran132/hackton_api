// import * as telegramWorks from "./telegramWorks/telebotWorks"
// import * as apiWorks from "./apiWorks/apiWorks"
// import * as dbWorks from "./dbWorks/dbWorks"
// import * as messageLoop from "./apiWorks/messagesLoop"
import * as api from "./express"

const init = async () => {
    try{
        await api.init()

        console.log(`✅✅✅ Initialization COMPLETE!`)
    }
    catch (err) {
        console.log(`❌❌❌ Initialization FAILED!`, err)
    }
} 

init()
// asd