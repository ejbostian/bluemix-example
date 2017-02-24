'use strict';

const express = require('express');
const path = require('path');
const cfenv = require('cfenv').getAppEnv();
const bodyParser = require('body-parser');
const adaro = require('adaro');
const watson = require('watson-developer-cloud');

const app = express();

const urlParser = bodyParser.urlencoded({
  extended: false
});

const TONE_USERNAME = (cfenv.isLocal) ? process.env.TONE_USERNAME : cfenv.services.tone_analyzer.username;
const TONE_PASSWORD = (cfenv.isLocal) ? process.env.TONE_PASSWORD : cfenv.services.tone_analyzer.password;

const tone_analyzer = watson.tone_analyzer({
  username: TONE_USERNAME,
  password: TONE_PASSWORD,
  version: 'v3',
  version_date: '2016-05-19'
});

/*******************/
/* engine and routes */
/*******************/
app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/result', urlParser, (req, res) => {
  tone_analyzer.tone({ text: req.body.response },
		function(err, tone) {
			if (err)
				console.log(err);
			else {
				console.log("*** tone data ***" + JSON.stringify(tone, null, 2));
        const emotionToneGroup = tone.document_tone.tone_categories[0];
        const anger = emotionToneGroup.tones[0];
        const disgust = emotionToneGroup.tones[1];
        const fear = emotionToneGroup.tones[2];
        const joy = emotionToneGroup.tones[3];
        const sadness = emotionToneGroup.tones[4];

        res.render('result', {tone: JSON.stringify(tone, null, 2),
          angerScore: anger.score,
          disgustScore: disgust.score,
          fearScore: fear.score,
          joyScore: joy.score,
          sadnessScore: sadness.score});
			}
	});
});

app.listen(cfenv.port, () => {
  console.log(`Server starting on ${cfenv.url}`);
});
