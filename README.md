# bluemix-example
This is a simple node.js project that utilizes the Watson Tone Analyzer and is 
set up as a Bluemix app.

Step 1: Create an account on Bluemix

Step 2: Set up an app on Bluemix
	- Create a Cloud Foundry app with the Node.js SDK.
	- Give it a unique name or you will run into namespace conflicts

Step 3: Install the Bluemix CLI (if you don't already have it)


Step 4: Set up the Tone Analyzer Service
	- On the Connections tab, click 'Connect New'
	- Under the Watson tab of the Services section, select 'Tone Analyzer'
	- On the left-hand sidebar, double check that 'Connect to' is set to the name
		of your new application and click 'Create'
	- When prompted, Restage your application

Step 5: Update the manifest.yml file
	- Replace the `{APP_NAME_HERE}` with the name of your newly created app on
		Bluemix:
		```
		applications:
		- path: .
		  memory: 256M
		  instances: 1
		  domain: mybluemix.net
		  name: {APP_NAME_HERE}
		  host: {APP_NAME_HERE}
		  disk_quota: 1024M
		```

Step 6: Set up a start script
	- Create a `start.sh` file with the following contents:

	```
	export TONE_USERNAME='yourvaluehere'
	export TONE_PASSWORD='yourvaluehere'

	npm start
	```
	- Replace `yourvaluehere` with the username and password for Tone Analyzer
		- You can find these in your Tone Analyzer service on Bluemix underneath
			the credentials tab

Step 7: Run the app locally
	- Run `npm install` to download the dependencies
	- Run `sh start.sh`
	- The site will be available at the listed localhost address in the terminal

Step 7: Push the app to Bluemix
	- In the terminal, run `cf push {appname}`, replacing the `{appname}` with
		the name of your app
	- This will push the code of your app to Bluemix
