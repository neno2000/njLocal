# njLocal
NodeJs Local server to improve development productivity,
Functionality:

1 . Avoid CSRF problems by making external services available in the localdomain.

2.- Fix SSO authentication using a Rest Client.

3.- Display the available services in a User interface.

4.- User interaface for the SAP JSON adapter created using React. https://github.com/cesar-sap/abap_fm_json.



Installation:

--- git clone https://github.com/neno2000/njLocal.git  or download the repo.

Set up Server.

1.- cd to njLocal
2.- npm install

create a config folder directly in in nj Local.
use a configuration file per enviroment as follow, example in case you have a sap system with system-id UC1
you need a file named.
uc1.json with the below content.

{

  "conf": {
  
    "endpoint": {
      "server": {
        "portHost": "http://<SAML provider>",
        "portPort": "<????>",
        "portAuth": "/<OSSloginResource>/index.jsp",
        "abapHost": "http://<sap.nw.server>",
        "abapPort": "<?????>",
        "abapClient" : "???",
        "debugUser": "<user>",
        "debugPassword": "<password>"
      }
    }

  }
}

3.- expose the available services via a json file.

{
	"conf": {

		"resourcesLookup": {
			"<sap abap service to call>": {
				"host": "abapHost",
				"port": "abapPort"
			},
			"<sap java service to call>": {
				"host": "portHost",
				"port": "portPort",
				"description": "does this and that",
				"method": "GET",
				"params": {
					"inbound": []
				}
			}
		}
	}
}

The name are not the best and may be modified but then code changes are needed!!!!
the app work behind the firewall therefore HTTPS is not supported

Client set up.

1. create a file in njLocal->client->src->config.js

const config = {
    rfcJsonAdapter: "place where the rfc adapter is specified in SICF",
    targetClient: "defaul-sap-client"
};

2.- build the client application.

move to njLocal->client

npm run-script build. after build you are ready to use the application.

START the server

set NODE_ENV=uc1                the sap server id in the configuration file
set REACT_APP_SAP_CLIENT=100

npm start

The server is listening i port 5000.












