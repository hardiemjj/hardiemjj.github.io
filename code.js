
var platformClient = require( 'purecloud-platform-client-v2/dist/node/purecloud-platform-client-v2.js' )
const client = platformClient.ApiClient.instance;
client.setEnvironment(platformClient.PureCloudRegionHosts.ap_southeast_2)





function getCallData()
{
    platformClient.ApiClient.instance.authentications['PureCloud OAuth'].accessToken = document.getElementById("token").innerHTML;
    var conversationApi = new platformClient.ConversationsApi();

    conversationApi.getConversations()
    .then(( res ) => {
        console.log( 'convs: '  + JSON.stringify( res ))
        const entities = res.body.entities
        if(  entities.length === 0 )
        {
            return
        }

        var party1 = undefined
        for( var x = 0; x < entities[0].participants.length; x++)
        {
        //	console.log( entities[0].participants[x] )
            var part = entities[0].participants[x]
            if( part.attributes.callerType !== undefined && part.attributes.callerType === 'party1')
            {
                party1 = x
            }
        }

        if( party1 === undefined )
        {
            console.log( 'party1 not found')
            return
        }

        console.log( 'party1: ' + party1 + JSON.stringify(entities[0].participants[party1].attributes))
        var part = entities[0].participants[party1]


        if( part.attributes.genderPreference)
        {
            this.setState({ genderPreference: part.attributes.genderPreference })
        }
        
        if( part.attributes.language)
        {
            console.log(part.attributes.language )
            this.setState({ language: part.attributes.language })
        }

        if( part.attributes.callType)
        {
            console.log(part.attributes.callType )
            this.setState({ callType: part.attributes.callType })
        }

    })
    .catch(( err ) => {
        console.log( 'get conv err: ', err )
    })
}
