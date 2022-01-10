


function getCallData()
{
    var url = 'https://api.mypurecloud.com.au/api/v2/conversations?communicationType=call';
    var targetToken = document.getElementById("token").innerHTML;
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify({}),
        beforeSend: function(xhr){xhr.setRequestHeader("Authorization", "bearer " + targetToken);},
        success: function(res) 
        {
        
            console.log( 'convs: '  + JSON.stringify( res ))
            const entities = res.entities
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

        }
    })
}


